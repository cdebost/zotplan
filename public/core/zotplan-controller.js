/**
 * @module core/zotplan-controller
 */
var Target = require("montage/core/target").Target,
    PlanService = require("core/service/plan-service").PlanService,
    UserService = require("core/service/user-service").UserService,
    ZotplanAuthService = require("core/service/zotplan-auth-service").ZotplanAuthService;

/**
 * @class ZotplanController
 * @extends Target
 */
exports.ZotplanController = Target.specialize({

    isAppReady: {
        value: false
    },

    constructor: {
        value: function ZotplanController() {
            this._zotplanAuthService = new ZotplanAuthService();
            this._planService = new PlanService();
            this._userService = new UserService();
        }
    },

    signIn: {
        value: function (email, password) {
            var self = this;
            return this._zotplanAuthService.signIn(email, password)
                .then(function (user) {
                    self.application.config.user = user;
                })
        }
    },

    signInWithGoogle: {
        value: function (googleServerToken) {
            var self = this;
            return this._zotplanAuthService.signInWithGoogle(googleServerToken)
                .then(function (user) {
                    self.application.config.user = user;
                })
        }
    },

    fetchOwnUser: {
        value: function () {
            var self = this;
            return this._userService.getOwnUser()
                .then(function (user) {
                    self.application.config.user = user;
                }, function (err) {
                    self.application.config.user = null;
                })
        }
    },

    fetchPlans: {
        value: function () {
            var self = this;
            return this._userService.getPlansForUser(this.application.config.user)
                .then(function (plans) {
                    self.application.config.plans = plans;
                });
        }
    },

    createPlan: {
        value: function () {
            return this._planService.createNew({
                name: "New Plan",
                startYear: 2014
            });
        }
    },

    willFinishLoading: {
        value: function (app) {
            var self = this,
                loadingPromises;

            this.application = app;
            this.application.config = {
                appName: "Zotplan",
                isSignedIn: false,
                apiBaseUrl: "/api/",
                user: null
            };

            loadingPromises = [
                Promise.delay(2000), // Loader shows for a minimum of 2s
                this._loadGoogleAPI(),
                this.fetchOwnUser()
            ];
            Promise.all(loadingPromises)
                .then(function () {
                    self.isAppReady = true;
                });
        }
    },

    _loadGoogleAPI: {
        value: function () {
            return new Promise(function (resolve, reject) {
                var script = document.createElement("script");
                script.src = "https://apis.google.com/js/platform.js"
                script.onload = resolve();
                document.head.appendChild(script);
            }).timeout(10000).catch(function () {
                throw new Error("Unable to load Google APIs");
            })
        }
    }
});


/**
 * @module core/zotplan-controller
 */
var Target = require("montage/core/target").Target,
    ZotplanAuthService = require("core/service/zotplan-auth-service").ZotplanAuthService;

/**
 * @class ZotplanController
 * @extends Target
 */
exports.ZotplanController = Target.specialize({

    isAppReady: {
        value: false
    },

    _zotplanAuthService: {
        get: function () {
            if (!this.__zotplanAuthService) {
                this.__zotplanAuthService = new ZotplanAuthService();
            }
            return this.__zotplanAuthService;
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
    
    willFinishLoading: {
        value: function (app) {
            var self = this;

            this.application = app;
            app.config = {
                appName: "Zotplan",
                isSignedIn: false,
                apiBaseUrl: "/api/",
                user: null
            };

            Promise.delay(2000)
                .then(this._loadGoogleAPI.bind(this))
                .timeout(10000)
                .catch(function () {
                    throw new Error("Unable to load Google APIs");
                })
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
            });
        }
    }
});


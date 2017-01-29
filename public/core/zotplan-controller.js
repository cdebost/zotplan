/**
 * @module core/zotplan-controller
 */
var Target = require("montage/core/target").Target;

/**
 * @class ZotplanController
 * @extends Target
 */
exports.ZotplanController = Target.specialize({

    isAppReady: {
        value: false
    },

    sessionToken: {
        get: function () {
            return null;
        }
    },
    
    willFinishLoading: {
        value: function (app) {
            var self = this;

            app.config = {
                apiBaseUrl: "/api/"
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


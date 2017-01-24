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
            Promise.delay(2000)
                .then(function () {
                    self.isAppReady = true;
                });
        }
    }
});


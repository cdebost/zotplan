/**
 * @module ui/loader.reel
 */
var MontageLoader = require("montage/ui/loader.reel").Loader;

/**
 * @class Loader
 * @extends Loader
 */
exports.Loader = MontageLoader.specialize(/** @lends Loader# */ {

    hasTemplate: {
        value: true
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.handleAppReady = this.handleAppReady.bind(this);
                this.application.delegate.addOwnPropertyChangeListener(
                    "isAppReady", this.handleAppReady
                );
            }
        }
    },

    handleAppReady: {
        value: function (isAppReady) {
            if (isAppReady) {
                MontageLoader.prototype.enterDocument.call(this);
                this.application.delegate.removeOwnPropertyChangeListener(
                    "isAppReady", this.handleAppReady
                );
            }
        }
    }

});

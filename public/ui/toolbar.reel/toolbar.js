/**
 * @module ui/toolbar.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Toolbar
 * @extends Component
 */
exports.Toolbar = Component.specialize(/** @lends Toolbar# */ {

    handleHamburgerButtonAction: {
        value: function () {
            this.dispatchEventNamed("hamburgerPressed", false, true);
        }
    }
});
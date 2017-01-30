/**
 * @module ui/app-container.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class AppContainer
 * @extends Component
 */
exports.AppContainer = Component.specialize(/** @lends AppContainer# */ {

    handleHamburgerPressed: {
        value: function () {
            this.menu.isExpanded = !this.menu.isExpanded;
        }
    }
});

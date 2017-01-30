/**
 * @module ui/menu.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Menu
 * @extends Component
 */
exports.Menu = Component.specialize(/** @lends Menu# */ {

    isExpanded: {
        value: false
    },

    templateDidLoad: {
        value: function () {
            window.addEventListener("mousedown", this);
        }
    },

    handleMousedown: {
        value: function (ev) {
            if (!this.isExpanded) {
                return;
            }
            var target = ev.target;
            do {
                if (target === this.element) {
                    return;
                }
            } while (target = target.parentNode);
            ev.stopPropagation();
            ev.preventDefault();
            this.isExpanded = false;
        }
    }
});

/**
 * @module public/ui/navbar.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Navbar
 * @extends Component
 */
exports.Navbar = Component.specialize(/** @lends Navbar# */ {

    buttons: {
        value: [
            {
                label: "Home",
                iconSrc: "/assets/icons/home.svg"
            }, {
                label: "My Plans",
                iconSrc: "/assets/icons/calendar.svg"
            }, {
                label: "Search",
                iconSrc: "/assets/icons/magnify.svg"
            }
        ]
    },

    templateDidLoad: {
        value: function () {
            // Need this hack before avoidsEmptySelection isn't working
            this.buttonsController.select(this.buttonsController.content[0]);

            this.buttonsController.addRangeAtPathChangeListener("selection", this, "handleButtonSelectionChange");
        }
    },

    handleButtonSelectionChange: {
        value: function (plus, minus) {
            if (plus.length) {
                this.application.config.page = plus[0].label;
            }
        }
    }
});

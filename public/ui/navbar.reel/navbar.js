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
    }
});

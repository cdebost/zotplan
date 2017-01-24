/**
 * @module ui/base/button.reel
 */
var AbstractButton = require("montage/ui/base/abstract-button").AbstractButton;

/**
 * @class Button
 * @extends AbstractButton
 */
exports.Button = AbstractButton.specialize(/** @lends Button# */ {

    skin: {
        get: function () {
            return this._skin;
        },
        set: function (skin) {
            if (skin && this._skin !== skin) {
                if (this._skin) {
                    this.classList.remove("Button--" + this._skin);
                }
                this._skin = skin;
                this.classList.add("Button--" + skin);
            }
        }
    },

    templateDidLoad: {
        value: function () {
            this.skin = this.skin || "gray";
        }
    }
});

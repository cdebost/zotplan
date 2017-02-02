/**
 * @module public/ui/base/image.reel
 */
var AbstractImage = require("montage/ui/base/abstract-image").AbstractImage;

/**
 * @class Image
 * @extends Component
 */
exports.Image = AbstractImage.specialize(/** @lends Image# */ {

    hasTemplate: {
        value: true
    }

});

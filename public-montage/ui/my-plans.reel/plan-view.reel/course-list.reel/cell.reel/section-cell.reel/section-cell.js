/**
 * @module ui/my-plans.reel/plan-view.reel/course-list.reel/section-cell.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class SectionCell
 * @extends Component
 */
exports.SectionCell = Component.specialize(/** @lends SectionCell# */ {

    handleExpandButtonAction: {
        value: function () {
            this.data.isExpanded = !this.data.isExpanded;
        }
    }
});

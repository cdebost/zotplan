/**
 * @module public/ui/my-plans.reel/plan-view.reel/course-list.reel/quarter.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Quarter
 * @extends Component
 */
exports.Quarter = Component.specialize(/** @lends Quarter# */ {

    isExpanded: {
        value: true
    },

    handleExpandButtonAction: {
        value: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.isExpanded = !this.isExpanded;
        }
    },

    handleAddCourseButtonAction: {
        value: function () {
            this.dispatchEventNamed('requestAddCourse', true, false, { quarter: this.quarter });
        }
    }
});

/**
 * @module public/ui/my-plans.reel/plan-view.reel/course-list.reel/year.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Year
 * @extends Component
 */
exports.Year = Component.specialize(/** @lends Year# */ {

    isExpanded: {
        value: true
    },

    handleExpandButtonAction: {
        value: function () {
            this.isExpanded = !this.isExpanded;
        }
    },

    handleQuarterRequestAddCourse: {
        value: function (e) {
            console.log("Add course on", this.year, e.detail.quarter);
        }
    }
});

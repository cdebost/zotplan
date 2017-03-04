/**
 * @module ui/my-plans.reel/plan-view.reel/course-list.reel
 */
var Component = require("montage/ui/component").Component;

function groupArray(arr, size) {
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i+size));
    }
    return result;
}

/**
 * @class CourseList
 * @extends Component
 */
exports.CourseList = Component.specialize(/** @lends CourseList# */ {

    plan: {
        get: function () {
            return this._plan;
        },
        set: function (plan) {
            if (plan === this._plan) return;
            this._plan = plan;
            this.dispatchOwnPropertyChange("plan", plan);
            this.years = groupArray(plan.courses, 24)
                .map(year => groupArray(year, 6))
        }
    }
});

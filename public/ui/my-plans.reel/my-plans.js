/**
 * @module public/ui/my-plans.reel
 */
var Component = require("montage/ui/component").Component;

/**
 * @class MyPlans
 * @extends Component
 */
exports.MyPlans = Component.specialize(/** @lends MyPlans# */ {

    enterDocument: {
        value: function () {
            this.application.delegate.fetchPlans();
        }
    },

    exitDocument: {
        value: function () {
            this.contentSubstitution.selection = [];
        }
    },

    handleAddPlanButtonAction: {
        value: function () {
            this.application.delegate.createPlan()
                .then(function (plan) {
                    console.log("created plan", plan)
                }, function (err) {
                    console.error(err)
                });
        }
    }
});

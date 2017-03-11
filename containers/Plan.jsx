import React from 'react';
import { connect } from 'react-redux';

import PlanGroup from '../components/plan-view/PlanGroup.jsx';
import Course from '../components/plan-view/Course.jsx';

const mapStateToProps = store => ({
    user: store.user.user
});

class Plan extends React.Component {

    totalQuarterUnits(quarter) {
        return quarter.courses.reduce((sum, course) => sum + Number(course.units), 0);
    }

    totalYearUnits(year) {
        return year.quarters.reduce((sum, quarter) => sum + this.totalQuarterUnits(quarter), 0);
    }

    render() {
        const { user, params } = this.props;
        const plan = user.plans.filter(plan => plan._id === params.planId)[0];
        const quarterNames = ['Fall', 'Winter', 'Spring', 'Summer'];
        return (
            <div>
                <h2>{plan.name}</h2>
                { plan.years.map((year, yearNumber) =>
                    <PlanGroup key={yearNumber}
                               label={String(plan.startYear + yearNumber)}
                               totalUnits={this.totalYearUnits(year)}
                    >
                        { year.quarters.map((quarter, quarterNumber) =>
                            <PlanGroup key={yearNumber * 100 + quarterNumber}
                                       label={quarterNames[quarterNumber]}
                                       totalUnits={this.totalQuarterUnits(quarter)}
                                       backgroundColor={['#F7DFC3', '#D8DAD6', '#EDEDCD'][quarterNumber]}
                            >
                                { quarter.courses.map(course =>
                                    <Course key={String(year)+quarter+course._id} course={course} />
                                )}
                            </PlanGroup>
                        )}
                    </PlanGroup>
                )}
            </div>
        );
    }
}
export default connect(mapStateToProps, null)(Plan);
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
    plan: store.user.selectedPlan
});

class Plan extends React.Component {

    render() {
        const {
            plan
        } = this.props;
        return (
            <h2>{plan.name}</h2>
        );
    }
}
export default connect(mapStateToProps, null)(Plan);
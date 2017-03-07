import React from 'react';

export default class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <div id="app-view">
                <h1>ZotPlan</h1>

                <hr />

                {this.props.children}
            </div>
        );
    }
}
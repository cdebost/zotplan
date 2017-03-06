import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        user: PropTypes.object
    };

    render() {
        const { user } = this.props;

        return (
            <div>
                This some real shit
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
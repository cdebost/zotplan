import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header.jsx';
import Menu from '../Menu.jsx';
import { toggleMenu, closeMenu } from '../../actions/menu-actions.js';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    onHamburgerClick: () => {
        dispatch(toggleMenu());
    }
});

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.object.isRequired
    };

    render() {
        return (
            <div id="app-view">
                <Header onHamburgerClick={this.props.onHamburgerClick} />
                <Menu />
                <div style={{position: 'relative', top: '56px'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
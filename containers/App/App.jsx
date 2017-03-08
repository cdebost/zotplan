import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header.jsx';
import Menu from '../../components/Menu.jsx';
import { toggleMenu, closeMenu } from '../../actions/menu-actions.js';

const mapStateToProps = state => ({
    isVisible: state.menu.isVisible
});

const mapDispatchToProps = dispatch => ({
    onHamburgerClick: () => {
        dispatch(toggleMenu());
    },
    closeMenu: () => {
        dispatch(closeMenu());
    }
});

class App extends React.Component {
    static propTypes = {
        children: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        store: React.PropTypes.object
    };

    render() {
        return (
            <div id="app-view">
                <Header onHamburgerClick={this.props.onHamburgerClick} />
                <Menu isVisible={this.props.isVisible} closeMenu={this.props.closeMenu} />

                <div style={{position: 'relative', top: '56px'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
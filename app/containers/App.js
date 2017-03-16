import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Menu from './Menu';
import { toggleMenu } from '../actions';

const mapDispatchToProps = dispatch => ({
  onHamburgerClick: () => {
    dispatch(toggleMenu());
  },
});

const App = ({ onHamburgerClick, children }) => (
  <div id="app-view">
    <AppBar title="ZotPlan" onLeftIconButtonTouchTap={onHamburgerClick} />
    <Menu />
    <div>
      {children}
    </div>
  </div>
);

App.propTypes = {
  onHamburgerClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
};

App.defaultProps = {
  modal: null,
};

export default connect(null, mapDispatchToProps)(App);

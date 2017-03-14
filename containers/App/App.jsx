import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header.jsx';
import Menu from '../Menu.jsx';
import { toggleMenu } from '../../actions';

const mapDispatchToProps = dispatch => ({
  onHamburgerClick: () => {
    dispatch(toggleMenu());
  },
});

const App = ({ onHamburgerClick, children }) => (
  <div id="app-view">
    <Header onHamburgerClick={onHamburgerClick} />
    <Menu />
    <div style={{ position: 'relative', top: '56px' }}>
      {children}
    </div>
  </div>
);

App.propTypes = {
  onHamburgerClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
};

export default connect(null, mapDispatchToProps)(App);

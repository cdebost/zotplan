import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Menu from './Menu';
import Modal from '../components/Modal';
import { closeModal, toggleMenu } from '../actions';

const mapStateToProps = state => ({
  modal: state.modal.modals[0],
});

const mapDispatchToProps = dispatch => ({
  onHamburgerClick: () => {
    dispatch(toggleMenu());
  },
  onModalCancel: () => {
    dispatch(closeModal());
  },
});

const App = ({ onHamburgerClick, children, modal, onModalCancel }) => (
  <div id="app-view">
    { modal &&
      <Modal
        title={modal.title}
        content={modal.content}
        acceptButtonLabel={modal.acceptButtonLabel}
        canCancel={modal.canCancel}
        cancelButtonLabel={modal.cancelButtonLabel}
        canDismiss={modal.canDismiss}
        cb={modal.cb}
        hide={onModalCancel}
      />
    }
    <Header onHamburgerClick={onHamburgerClick} />
    <Menu />
    <div style={{ position: 'relative', top: '56px' }}>
      {children}
    </div>
  </div>
);

App.propTypes = {
  modal: React.PropTypes.object,
  onHamburgerClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
  onModalCancel: React.PropTypes.func.isRequired,
};

App.defaultProps = {
  modal: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './Menu.css';
import UserMenuHeader from '../components/MenuUserHeader';
import {
  closeMenu,
  toggleUserHeaderExpanded,
  togglePlansExpanded,
  signOut,
  createNewPlan,
  openModal,
} from '../actions';
import MenuListItem from '../components/MenuListItem';
import PropTypes from '../validators';

const mapStateToProps = state => ({
  isVisible: state.menu.isVisible,
  isUserHeaderExpanded: state.menu.isUserHeaderExpanded,
  isPlansExpanded: state.menu.isPlansExpanded,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  dispatchCloseMenu: () => {
    dispatch(closeMenu());
  },
  onClickExpandUser: () => {
    dispatch(toggleUserHeaderExpanded());
  },
  onClickSignOut: () => {
    dispatch(toggleUserHeaderExpanded());
    dispatch(closeMenu());
    dispatch(openModal({
      title: 'Sign Out',
      content: <div>Are you sure you want to sign out?</div>,
      acceptButtonLabel: 'Yes',
      canDismiss: false,
      cb: (result) => {
        if (result) {
          dispatch(signOut());
          dispatch(push('/login'));
        }
      },
    }));
  },
  onClickHome: () => {
    dispatch(push('/'));
    dispatch(closeMenu());
  },
  onClickMyPlans: () => {
    dispatch(togglePlansExpanded());
  },
  onClickPlan: (user, plan) => {
    dispatch(push(`/user/${user._id}/plan/${plan._id}`));
    dispatch(closeMenu());
  },
  onClickCreateNewPlan: (userId, name, startYear) => {
    dispatch(createNewPlan(userId, name, startYear));
  },
  onClickSettings: () => {
    dispatch(push('/settings'));
    dispatch(closeMenu());
  },
});

const Menu = ({
  dispatchCloseMenu, isVisible, isPlansExpanded, user, isUserHeaderExpanded, onClickExpandUser,
  onClickSignOut, onClickHome, onClickMyPlans, onClickPlan, onClickCreateNewPlan, onClickSettings,
}) => (
  <div>
    <button
      onClick={dispatchCloseMenu}
      className={`transparentButton ${styles.background}
        ${isVisible ? styles.visibleBackground : ''}`
      }
    />
    <aside
      className={styles.container}
      style={{ transform: `translateX(${isVisible ? 0 : '-101%'})` }}
    >
      <UserMenuHeader
        user={user}
        isExpanded={isUserHeaderExpanded}
        onClickExpand={onClickExpandUser}
        onClickSignOut={onClickSignOut}
      />

      <MenuListItem label="Home" iconName="home" onClick={onClickHome} />
      <MenuListItem
        label="My Plans"
        iconName="view_list"
        onClick={onClickMyPlans}
        extraContent={
          <div
            className={`material-icons ${styles.myPlansExpandIcon}`}
            style={{ transform: `rotate(${isPlansExpanded ? '180deg' : 0})` }}
          >expand_more</div>
        }
      />
      { isPlansExpanded &&
        <div>
          { user.plans.map(plan =>
            <MenuListItem
              key={plan._id}
              label={plan.name}
              indents={1}
              onClick={onClickPlan}
              onClickArgs={[user, plan]}
            />,
          )}
          <MenuListItem
            label="Create a New Plan"
            iconName="add"
            indents={1}
            onClick={onClickCreateNewPlan}
            onClickArgs={[user._id, 'New Plan', 2014]}
          />
        </div>
      }

      <div className={styles.divider} />

      <MenuListItem label="Settings" iconName="settings" onClick={onClickSettings} />
    </aside>
  </div>
);

Menu.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  dispatchCloseMenu: React.PropTypes.func.isRequired,
  isUserHeaderExpanded: React.PropTypes.bool.isRequired,
  onClickExpandUser: React.PropTypes.func.isRequired,
  onClickSignOut: React.PropTypes.func.isRequired,
  isPlansExpanded: React.PropTypes.bool.isRequired,
  user: PropTypes.user.isRequired,
  onClickHome: React.PropTypes.func.isRequired,
  onClickMyPlans: React.PropTypes.func.isRequired,
  onClickPlan: React.PropTypes.func.isRequired,
  onClickCreateNewPlan: React.PropTypes.func.isRequired,
  onClickSettings: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

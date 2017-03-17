import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import {
  closeMenu,
  signOut,
  createNewPlan,
  openSignOutDialog,
  closeSignOutDialog,
  openCreateNewPlanDialog,
  closeCreateNewPlanDialog,
} from '../actions';
import PropTypes from '../validators';
import CreateNewPlanDialog from '../components/CreateNewPlanDialog';

const mapStateToProps = state => ({
  isVisible: state.menu.isVisible,
  isSignOutDialogVisible: state.menu.isSignOutDialogVisible,
  isCreateNewPlanDialogVisible: state.menu.isCreateNewPlanDialogVisible,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  handleCloseMenu: () => {
    dispatch(closeMenu());
  },
  handleTapSignOut: () => {
    dispatch(closeMenu());
    dispatch(openSignOutDialog());
  },
  handleSignOutCancel: () => {
    dispatch(closeSignOutDialog());
  },
  handleSignOutConfirm: () => {
    window.setTimeout(() => {
      dispatch(closeSignOutDialog());
      dispatch(push('/login'));
      dispatch(signOut());
    }, 200);
  },
  handleTapHome: () => {
    dispatch(closeMenu());
    dispatch(push('/'));
  },
  handleTapPlan: (user, plan) => {
    dispatch(closeMenu());
    dispatch(push(`/user/${user._id}/plan/${plan._id}`));
  },
  handleTapCreateNewPlan: () => {
    dispatch(openCreateNewPlanDialog());
  },
  handleCreateNewPlanCancel: () => {
    dispatch(closeCreateNewPlanDialog());
  },
  handleCreateNewPlanConfirm: (user, planName, startYear) => {
    dispatch(createNewPlan(user._id, planName, startYear));
    dispatch(closeCreateNewPlanDialog());
  },
  handleTapSettings: () => {
    dispatch(closeMenu());
    dispatch(push('/settings'));
  },
});

class Menu extends React.Component {

  static menuIcon(name) {
    return (
      <FontIcon className="material-icons" color="#757575">{name}</FontIcon>
    );
  }

  constructor(props) {
    super(props);
    this.handleDrawerRequestChange = this.handleDrawerRequestChange.bind(this);
  }

  handleDrawerRequestChange(open) {
    if (!open) {
      this.props.handleCloseMenu();
    }
  }

  render() {
    const {
      user, handleTapPlan, handleTapCreateNewPlan,
    } = this.props;
    return (
      <Drawer
        docked={false} open={this.props.isVisible} onRequestChange={this.handleDrawerRequestChange}
      >
        <List style={{ padding: '0 0 8px 0' }}>
          <div style={{ backgroundColor: 'var(--uci-yellow)' }}>
            <Avatar size={64} style={{ margin: '24px 16px 0 16px' }}>{user.name[0]}</Avatar>
            <div style={{ fontWeight: 700, margin: 16, marginBottom: 0 }}>{user.name}</div>
            <ListItem
              primaryText={user.email}
              disabled
              nestedItems={[
                <ListItem
                  key="signout" primaryText="Sign Out" leftIcon={Menu.menuIcon('exit_to_app')}
                  onTouchTap={this.props.handleTapSignOut}
                />,
                <Dialog
                  key="dialog"
                  title="Sign Out"
                  modal
                  open={this.props.isSignOutDialogVisible}
                  actions={[
                    <FlatButton
                      label="Cancel"
                      primary
                      onTouchTap={this.props.handleSignOutCancel}
                    />,
                    <FlatButton
                      label="Sign Out"
                      labelPosition="before"
                      secondary
                      icon={Menu.menuIcon('exit_to_app')}
                      onTouchTap={this.props.handleSignOutConfirm}
                    />,
                  ]}
                >
                  Are you sure you want to sign out?
                </Dialog>,
              ]}
            />
          </div>

          <Divider />

          <ListItem
            primaryText="Home"
            leftIcon={Menu.menuIcon('home')}
            onTouchTap={this.props.handleTapHome}
          />
          <ListItem
            primaryText="My Plans"
            leftIcon={Menu.menuIcon('view_list')}
            nestedItems={
              user.plans.map(plan =>
                <ListItem
                  key={plan._id}
                  primaryText={plan.name}
                  insetChildren
                  onTouchTap={() => handleTapPlan(user, plan)}
                />,
              ).concat([
                <ListItem
                  key="new"
                  primaryText="Create a New Plan"
                  leftIcon={Menu.menuIcon('add')}
                  onTouchTap={() => handleTapCreateNewPlan(user._id, 'New Plan', 2014)}
                />,
                <CreateNewPlanDialog
                  key="createnewplandialog"
                  isVisible={this.props.isCreateNewPlanDialogVisible}
                  onCancel={this.props.handleCreateNewPlanCancel}
                  onConfirm={(planName, startYear) =>
                    this.props.handleCreateNewPlanConfirm(user, planName, startYear)
                  }
                />,
              ])
            }
          />

          <Divider />

          <ListItem
            primaryText="Settings"
            leftIcon={Menu.menuIcon('settings')}
            onTouchTap={this.props.handleTapSettings}
          />
        </List>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  handleCloseMenu: React.PropTypes.func.isRequired,
  isSignOutDialogVisible: React.PropTypes.bool.isRequired,
  handleTapSignOut: React.PropTypes.func.isRequired,
  handleSignOutCancel: React.PropTypes.func.isRequired,
  handleSignOutConfirm: React.PropTypes.func.isRequired,
  user: PropTypes.user.isRequired,
  handleTapHome: React.PropTypes.func.isRequired,
  handleTapPlan: React.PropTypes.func.isRequired,
  isCreateNewPlanDialogVisible: React.PropTypes.bool.isRequired,
  handleTapCreateNewPlan: React.PropTypes.func.isRequired,
  handleCreateNewPlanCancel: React.PropTypes.func.isRequired,
  handleCreateNewPlanConfirm: React.PropTypes.func.isRequired,
  handleTapSettings: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

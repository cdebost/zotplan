import React from 'react';
import { connect } from 'react-redux';
import styles from './Menu.css';
import UserMenuHeader from '../components/MenuUserHeader.jsx';
import { closeMenu, togglePlansExpanded, createNewPlan, selectPlan } from '../actions';
import { push } from 'react-router-redux';
import MenuListItem from '../components/MenuListItem.jsx';

const mapStateToProps = state => ({
    isVisible: state.menu.isVisible,
    isPlansExpanded: state.menu.isPlansExpanded,
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    closeMenu: () => {
        dispatch(closeMenu());
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
    }
});

class Menu extends React.Component {
    static propTypes = {
        isVisible: React.PropTypes.bool.isRequired,
        closeMenu: React.PropTypes.func.isRequired,
        isPlansExpanded: React.PropTypes.bool.isRequired,
        user: React.PropTypes.object
    };

    render() {
        const {
            closeMenu, isVisible, isPlansExpanded, user,
            onClickHome, onClickMyPlans, onClickPlan, onClickCreateNewPlan,
            onClickSettings
        } = this.props;
        return (
            <div>
                <div onClick={closeMenu} className={styles.background + ' ' + (isVisible ? styles.visibleBackground : '')} />
                <aside className={styles.container} style={{ transform: `translateX(${isVisible ? 0 : '-101%'})` }}>
                    <UserMenuHeader user={user} />

                    <MenuListItem label="Home" iconName="home" onClick={onClickHome} />
                    <MenuListItem label="My Plans" iconName="view_list" extraContent={
                        <div className={styles.myPlansExpandIcon} style={{ transform: `rotate(${isPlansExpanded ? '180deg' : 0})`}}>
                            <i className="material-icons">expand_more</i>
                        </div>
                    } onClick={onClickMyPlans} />
                    { isPlansExpanded &&
                        <div>
                        { user.plans.map(plan => (<MenuListItem key={plan._id} label={plan.name} indents={1} onClick={onClickPlan.bind(null, user, plan)} />)) }
                        <MenuListItem label="Create a New Plan" iconName="add" indents={1}
                            onClick={onClickCreateNewPlan.bind(null, user._id, 'New Plan', 2014)} />
                        </div>
                    }

                    <div className={styles.divider} />

                    <MenuListItem label="Settings" iconName="settings" onClick={onClickSettings} />
                </aside>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
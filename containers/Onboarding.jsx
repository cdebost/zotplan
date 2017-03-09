import React from 'react';
import { connect } from 'react-redux';
import styles from './Onboarding.css';
import { signIn } from '../actions/auth-actions';

const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage
});

const mapDispatchToProps = dispatch => ({
    signIn: (email, password) => {
        dispatch(signIn(email, password));
    }
});

class Onboarding extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object.isRequired,
        router: React.PropTypes.object.isRequired
    };

    componentDidMount() {
        const { store, router } = this.context;
        const unsubscribe = store.subscribe(()=> {
            if (store.getState().auth.user) {
                unsubscribe();
                router.replace('/');
            }
        });
    }

    trySignIn(event) {
        event.preventDefault();
        const [ email, password ] = Object.values(this.refs).map(r => r.value);
        this.props.signIn(email, password);
    }

    render() {
        return (
            <div className={styles.background}>
                <div className="card" style={{ margin: '50px 30px', padding: 16 }}>
                    <h1>ZotPlan</h1>
                    <form onSubmit={this.trySignIn.bind(this)}>
                        <input ref="email" type="email" placeholder="Email" className={styles.field} />
                        <input ref="password" type="password" placeholder="Password" className={styles.field} />
                        <p style={{ color: 'red' }}>{this.props.errorMessage}</p>
                        <button className={styles.submit}>Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
import React from 'react';
import { connect } from 'react-redux';
import styles from './Onboarding.css';
import { signIn } from '../actions';

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => {
    dispatch(signIn(email, password));
  },
});

class Onboarding extends React.Component {
  static propTypes = {
    errorMessage: React.PropTypes.string,
    signIn: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    errorMessage: '',
  };

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.trySignIn = this.trySignIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    const { store, router } = this.context;
    const unsubscribe = store.subscribe(() => {
      if (store.getState().user.user) {
        unsubscribe();
        router.replace('/');
      }
    });
  }

  trySignIn(event) {
    event.preventDefault();
    this.props.signIn(this.email, this.password);
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePasswordChange(event) {
    this.password = event.target.value;
  }

  render() {
    return (
      <div className={styles.background}>
        <div className="card" style={{ margin: '50px 30px', padding: 16 }}>
          <h1>ZotPlan</h1>
          <form onSubmit={this.trySignIn}>
            <input
              type="email"
              onChange={this.handleEmailChange}
              placeholder="Email"
              className={styles.field}
            />
            <input
              type="password"
              onChange={this.handlePasswordChange}
              placeholder="Password"
              className={styles.field}
            />
            <p style={{ color: 'red' }}>{this.props.errorMessage}</p>
            <button className={styles.submit}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

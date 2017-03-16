import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
    const isEmailError = this.props.errorMessage &&
      this.props.errorMessage.toLowerCase().includes('email');
    return (
      <div className={styles.background}>
        <Paper zDepth={2} className={styles.container}>
          <h1>Sign In to ZotPlan</h1>
          <TextField
            type="email"
            onChange={this.handleEmailChange}
            hintText="Email"
            style={{ width: '100%', margin: '16px 0' }}
            errorText={isEmailError && this.props.errorMessage}
          />
          <TextField
            type="password"
            onChange={this.handlePasswordChange}
            hintText="Password"
            style={{ width: '100%', marginBottom: 16 }}
            errorText={!isEmailError && this.props.errorMessage}
          />
          <RaisedButton
            primary
            label="Sign In"
            onTouchTap={this.trySignIn}
            style={{ width: '100%' }}
          />
        </Paper>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

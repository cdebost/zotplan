import React from 'react';
import styles from './Modal.css';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onAccept() {
    this.props.cb(true);
    this.props.hide();
  }

  onCancel() {
    this.props.cb(false);
    this.props.hide();
  }

  render() {
    const {
      acceptButtonLabel, canCancel, cancelButtonLabel, canDismiss, title, content,
    } = this.props;
    return (
      <div
        onClick={canDismiss && this.onCancel}
        className={`transparentButton ${styles.background}`}
      >
        <div className={styles.dialog}>
          <h2>{title}</h2>
          { content }
          <div className={styles.footer}>
            <button
              onClick={this.onAccept}
              className={styles.acceptButton}
            >{acceptButtonLabel}</button>
            { canCancel &&
              <button
                onClick={this.onCancel}
                className={styles.cancelButton}
              >{cancelButtonLabel}</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  acceptButtonLabel: React.PropTypes.string,
  canCancel: React.PropTypes.bool,
  cancelButtonLabel: React.PropTypes.string,
  canDismiss: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.element.isRequired,
  cb: React.PropTypes.func,
  hide: React.PropTypes.func.isRequired,
};

Modal.defaultProps = {
  acceptButtonLabel: 'Ok',
  canCancel: true,
  cancelButtonLabel: 'Cancel',
  canDismiss: true,
  cb: Function.noop,
};

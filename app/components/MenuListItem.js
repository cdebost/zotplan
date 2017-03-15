import React from 'react';
import styles from './MenuListItem.css';

export default class MenuListItem extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(...this.props.onClickArgs);
  }

  render() {
    const { label, iconName, extraContent, indents, isFlipped } = this.props;
    return (
      <button
        onClick={this.onClick}
        className={`transparentButton ${styles.container} ${isFlipped ? styles.flipped : ''}`}
        style={{ marginLeft: indents * 50 }}
      >
        <i className={`material-icons ${styles.icon}`}>{iconName}</i>
        <span className={styles.label}>{label}</span>
        { extraContent }
      </button>
    );
  }
}

MenuListItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  iconName: React.PropTypes.string,
  extraContent: React.PropTypes.element,
  indents: React.PropTypes.number,
  onClick: React.PropTypes.func,
  onClickArgs: React.PropTypes.arrayOf(React.PropTypes.any),
  isFlipped: React.PropTypes.bool,
};

MenuListItem.defaultProps = {
  iconName: '',
  extraContent: null,
  indents: 0,
  onClick: Function.noop,
  onClickArgs: [],
  isFlipped: false,
};

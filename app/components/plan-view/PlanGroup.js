import React from 'react';
import styles from './PlanGroup.css';

export default class PlanGroup extends React.Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.arrayOf(React.PropTypes.element),
    totalUnits: React.PropTypes.number.isRequired,
    backgroundColor: React.PropTypes.string,
  };

  static defaultProps = {
    children: [],
    backgroundColor: 'white',
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
    };
    this.onToggleExpanded = this.onToggleExpanded.bind(this);
  }

  onToggleExpanded() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const { label, children, totalUnits, backgroundColor } = this.props;
    const { isExpanded } = this.state;
    return (
      <section className={styles.container} style={{ backgroundColor }}>
        <header className={styles.header}>
          <button
            onClick={this.onToggleExpanded}
            className={`transparentButton ${styles.expandButton}`}
          >{isExpanded ? '-' : '+'}</button>
          <span className={styles.label}>{ label }</span>
          <span>{ totalUnits } units</span>
        </header>
        <div style={{ marginLeft: 20 }}>
          { isExpanded && children }
        </div>
      </section>
    );
  }
}

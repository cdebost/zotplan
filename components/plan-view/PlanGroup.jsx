import React from 'react';
import styles from './PlanGroup.css';

export default class PlanGroup extends React.Component {
    static propTypes = {
        label: React.PropTypes.string.isRequired,
        children: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            isExpanded: true
        };
    }

    onToggleExpanded() {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const { label, children, totalUnits, backgroundColor } = this.props;
        const { isExpanded } = this.state;
        return (
            <section className={styles.container} style={{ backgroundColor: backgroundColor || 'white' }}>
                <header className={styles.header}>
                    <span onClick={this.onToggleExpanded.bind(this)} className={styles.expandButton}>
                        {isExpanded ? '-' : '+'}
                    </span>
                    <span className={styles.label}>{ label }</span>
                    <span>{ totalUnits } units</span>
                </header>
                { isExpanded &&
                    <div style={{ marginLeft: 20 }}>
                        { children }
                    </div>
                }
            </section>
        );
    }
}
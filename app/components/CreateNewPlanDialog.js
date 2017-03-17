import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

export default class CreateNewPlanDialog extends React.Component {

  static propTypes = {
    isVisible: React.PropTypes.bool.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onConfirm: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStartYearChange = this.handleStartYearChange.bind(this);
    this.state = {
      name: '',
      startYear: 2014,
    };
  }

  handleNameChange = event => this.setState({ name: event.target.value });
  handleStartYearChange = (event, i, value) => this.setState({ startYear: value });

  render() {
    return (
      <Dialog
        title="Create a New Plan"
        open={this.props.isVisible}
        actions={[
          <FlatButton
            label="Cancel"
            primary
            onTouchTap={this.props.onCancel}
          />,
          <FlatButton
            label="Create"
            secondary
            onTouchTap={() => this.props.onConfirm(this.state.name, this.state.startYear)}
          />,
        ]}
      >
        <TextField
          type="text"
          hintText="Plan Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          style={{ width: '100%' }}
        />
        <SelectField
          floatingLabelText="Starting Year"
          value={this.state.startYear}
          onChange={this.handleStartYearChange}
          style={{ width: '100%' }}
        >
          <MenuItem value={2010} primaryText="2010-2011" />
          <MenuItem value={2011} primaryText="2011-2012" />
          <MenuItem value={2012} primaryText="2012-2013" />
          <MenuItem value={2013} primaryText="2013-2014" />
          <MenuItem value={2014} primaryText="2014-2015" />
          <MenuItem value={2015} primaryText="2015-2016" />
          <MenuItem value={2016} primaryText="2016-2017" />
          <MenuItem value={2017} primaryText="2017-2018" />
          <MenuItem value={2018} primaryText="2018-2019" />
        </SelectField>
      </Dialog>
    );
  }
}

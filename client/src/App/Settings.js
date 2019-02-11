import React, { Component } from 'react';

class Settings extends Component {

  render() {
    return (
      <div className="container">
        <div>
          <label>Interval in minutes</label>
          <input type="number"></input>
        </div>
        <div>
          <label>Task list</label>
          <textarea onChange={(e) => this.props.defaultInterval=e.target.value} value={this.props.defaultInterval}></textarea>
        </div>
        <div>
          <label>Stop reasons</label>
          <textarea></textarea>
        </div>
      </div>
    );
  }

}

export default Settings;

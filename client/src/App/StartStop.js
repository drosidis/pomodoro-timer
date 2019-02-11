import React, { Component } from 'react';
import axios from 'axios';

import './StartStop.css';
import countdownTimeLeft from './countdownTimeLeft';

class StartStop extends Component {

  state = {
    loading: true,
    preferences: {
      defaultInterval: 25 * 60 * 1000,
      availableTasks: [],
      stopReasons: [],
    },
    currentTask: null,
  };

  componentDidMount = () => {
    axios.get('/user/me')
      .then(response => {
        this.interval = setInterval(() => this.tick(), 1000);
        this.setState({
          loading: false,
          preferences: response.data.preferences,
          currentTask: response.data.currentTask,
        });
      });
  }

  componentWillUnmount() {
    document.title = 'Timer';
    clearInterval(this.interval);
  }

  tick() {
    document.title = countdownTimeLeft(this.state.currentTask, this.state.defaultInterval);
    this.forceUpdate();
  }

  startTaskHandler = (category, name) => {
    axios.post('/tasks/current/start', { category, name })
      .then(response => this.setState({
        currentTask:  response.data
      }));
  }

  stopTaskHandler = ( stopReason ) => {
    axios.post('/tasks/current/stop', { stopReason })
      .then(() => this.setState({
        currentTask: null
      }));
  }

  render() {
    if (this.state.loading) {
      return <div className="container">Loading...</div>;
    }

    const {
      currentTask,
      preferences: {
        defaultInterval,
        availableTasks,
        stopReasons,
      }
    } = this.state;

    const timeLeft = countdownTimeLeft(currentTask, defaultInterval);
    const expired = timeLeft.startsWith('-');

    const tasks = availableTasks.map((group, index) => (
      <div key={index}>
        <div>{group.category}</div>
        <div className="names">
          {group.names.map((name, index) => (
            <span
              key={index}
              onClick={() => this.startTaskHandler(group.category, name)}
              className="like-link">
                {name}
            </span>
          ))}
        </div>
      </div>
    ));

    const reasons = stopReasons.map((reason, index) => (
      <span
        key={index}
        onClick={() => this.stopTaskHandler(reason)}
        className="like-link">
          {reason}
      </span>
    ));

    return (
      <div className="container">
        <div className={'countdown' + (expired ? ' expired' : '')}>{timeLeft}</div>
        <div className="tasks">
          {
            currentTask
              ? reasons
              : tasks
          }
        </div>
      </div>
    );
  }
}

export default StartStop;

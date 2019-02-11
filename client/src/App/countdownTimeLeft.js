// Converts miliseconds to human readable format
export function msToTime(millisec) {

  let seconds = (millisec / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours = "";
  if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      hours = (hours >= 10) ? hours : "0" + hours;
      minutes = minutes - (hours * 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if (hours !== "") {
      return hours + ":" + minutes + ":" + seconds;
  }
  return minutes + ":" + seconds;
}

// Human readable time interval, between "since" and when interval will end
function countdownTimeLeft(task, interval) {
  const ms = task
    ? interval - (new Date() - new Date(task.tmStart))
    : interval;
  return (ms < 0 ? '-' : '') + msToTime(Math.abs(ms));
}

export default countdownTimeLeft;
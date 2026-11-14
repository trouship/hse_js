class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.intervalId = null;
  }

  addClock(time, callback) {
    if ((time === null) || (typeof callback != 'function')) {
      throw new Error('Отсутствуют обязательные аргументы');
    }
    
    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }

    let alarm = {
      callback: callback,
      time: time,
      canCall: true
    };

    this.alarmCollection.push(alarm);
  }

  removeClock(time) {
    if (time === null) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time != time);
  }

  getCurrentFormattedTime() {
    return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }

  start() {
    if (this.intervalId != null) {
      return;
    }

    const checkAlarms = () => {
      this.alarmCollection.forEach(alarm => {
        if (alarm.canCall && (alarm.time == this.getCurrentFormattedTime())) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    };

    this.intervalId = setInterval(checkAlarms);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  resetAllCalls() {
    this.alarmCollection.forEach(alarm => alarm.canCall = true);
  }

  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}
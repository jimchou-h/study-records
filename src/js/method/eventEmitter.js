// ES5

function EventEmitter() {
  this.observers = {};
}

EventEmitter.prototype = {
  on(observe, callback) {
    if (!this.observers[observe]) {
      this.observers[observe] = []
    }
    this.observers[observe].push(callback);
    return this;
  },
  emit(observe, msg) {
    let aim = this.observers[observe];
    if (aim) {
      for (let i = 0, len = aim.length; i < len; i++) {
        aim[i](msg);
      };
      return this;
    }
    return this;
  }
}

var eventEmitter = new EventEmitter();

eventEmitter.on('click', (data) => {
  console.log(data)
});

eventEmitter.on('click', (data) => {
  console.log('2' + data)
});

eventEmitter.emit('click', '你好');

// ES6

class EventEmitter {
  constructor() {
    this.observers = [];
  }
  on(observe, callback) {
    if (!this.observers[observe]) {
      this.observers[observe] = []
    }
    this.observers[observe].push(callback);
    return this;
  }
  emit(observe, msg) {
    let aim = this.observers[observe];
    if (aim) {
      for (let i = 0, len = aim.length; i < len; i++) {
        aim[i](msg);
      };
      return this;
    }
    return this;
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('click', (data) => {
  console.log(data)
});

eventEmitter.on('click', (data) => {
  console.log('2' + data)
});

eventEmitter.emit('click', '你好');
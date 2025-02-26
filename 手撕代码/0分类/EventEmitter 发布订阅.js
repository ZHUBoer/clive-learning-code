// 实现一个 EventEmitter的发布订阅功能
class EventEmitter {
  // 存放注册的事件和对应的回调，需要维护一个大对象
  constructor() {
    this._event = {};
  }
  // 注册对应事件的回调函数
  on(eventName, callback) {
    const callbacks = this._event[eventName] || []
    callbacks.push(callback);
    this._event[eventName] = callbacks;
  }
  // 取消对应事件的回调函数
  off(eventName, callback) {
    const callbacks = this._event[eventName] || []
    const curCallbacks = callbacks.filter((callbackItem) => (callbackItem !== callback));
    this._event[eventName] = curCallbacks;
  }

  // emit,发布订阅，依次执行对应事件的回调函数
  emit(eventName, ...args) {
    const callBacks = this._event[eventName] || [];
    callBacks.forEach(item => {
      item(...args);
    }); // 逐个执行
  }

  // 单次订阅, 先注册，事件执行后就取消；
  once(eventName, callback) {
    function one(...argument) {
      callback(...argument);
      this.off(eventName, one);
    }
    this.on(eventName, one);
  }
}

// 优化之后的代码
class EventEmitterPro {
  constructor() {
    this._events = {};
  }

  on(eventName, callback) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string');
    }
    const callbacks = (this._events[eventName] || []).slice();
    callbacks.forEach((element) => {
      element(...args);
    });
  }

  off(eventName, callback) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string');
    }
    const callbacks = this._events[eventName] || [];
    const newCallbacks = callbacks.filter((item) => item !== callback);
    if (newCallbacks.length === 0) {
      delete this._events[eventName];
    } else {
      this._events[eventName] = newCallbacks;
    }
  }

  once(eventName, callback) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }
    const one = (...args) => {
      callback(...args);
      this.off(eventName, one);
    };
    this.on(eventName, one);
  }
}

// 使用 map数据结构作为 events的存储
// 发布订阅
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, handler) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(handler);
  }

  emit(eventName, ...args) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).forEach((handler) => {
        handler(...args);
      });
    }
  }

  off(eventName, handler) {
    if (this.events.has(eventName)) {
      // 删除指定事件的所有回调
      this.events.set(eventName, this.events.get(eventName).filter((h) => h !== handler));
    }
  }

  once(eventName, handler) {
    // 监听事件，并且只触发一次
    const onceHandler = (...args) => {
      handler(...args);
      this.off(eventName, onceHandler);
    };
    this.on(eventName, onceHandler);
  }
}

class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    // 当状态改变时，通知所有观察者
    this.observerNotice();
  }
  observerNotice() {
    for (let i = 0, len = this.observers.length; i < len; i++) {
      this.observers[i].update();
    }
  }
  join(observer) {
    this.observers.push(observer)
  }
}

class Observer {
  constructor(name, Subject) {
    this.name = name;
    this.subject = Subject;
    this.subject.join(this);
  }
  update() {
    console.log(`${this.name} update, state number is ${this.subject.getState()}`)
  }
}

const s1 = new Subject();

const o1 = new Observer('o1', s1);
const o2 = new Observer('o2', s1);
const o3 = new Observer('o3', s1);

s1.setState(100);
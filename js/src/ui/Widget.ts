module ui {

  export class Widget {

    private _element: HTMLElement;
    private _parent: Container;
    private _events: { [s: string]: Array<(Event) =>  any> };

    constructor(parent:Container=null) {
      this._element = this.createElement();
      this._parent = parent;
      this.addElementParent();
      this.classList.add('ui');
      this.classList.add(this.className);
      this._events = {};
    }

    get id(): string {
      return this.element.id;
    }

    set id(value: string) {
      this.element.id = value;
    }

    get parent() {
      return this._parent;
    }

    protected createElement(): HTMLElement {
      return null;
    }

    protected get className(): string {
      return '';
    }

    get element(): HTMLElement {
      return this._element;
    }

    protected addElementParent() {
      if (this._parent) {
        this._parent.addChild(this);
      } else {
        document.getElementById('app').appendChild(this.element);
      }
    }

    protected removeElementParent() {
      document.getElementById('app').removeChild(this.element);
    }

    get classList() {
      if (!this.element) {
        return null;
      }
      return this.element.classList;
    }

    set classList(value) {
      if (!this.element) {
        return;
      }
      this.element.classList = value;
    }

    get style() {
      if (!this.element) {
        return null;
      }
      return this.element.style;
    }

    set style(value) {
      if (!this.element) {
        return;
      }
      this.element.style = value;
    }

    on(name: string, callback: (Event) => any ) {
      if (!this._events[name]) {
        this._events[name] = [];
      }
      this._events[name].push(callback);
    }

    fire(name: string, event: Event) {
      let events = this._events[name];
      if (events) {
        events.forEach( (i) => i(event) );
      }
    }

    off(name: string, callback: (Event) => any = null) {
      if (callback !== null && this._events[name]) {
        let i = this._events[name].indexOf(callback);
        while ( i !== -1) {
          this._events[name].splice(i, 1);
          i = this._events[name].indexOf(callback);
        }
        return;
      }
      this._events[name] = [];
    }

  }

}

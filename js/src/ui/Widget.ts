/*
 * Copyright 2015 Ramiro Rojo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *    http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
      this._setupCommonEvents();
    }

    protected _setupCommonEvents() {
      this.element.addEventListener('focus', this._onFocus.bind(this));
      this.element.addEventListener('blur', this._onBlur.bind(this));
      this.element.addEventListener('keydown', this._onKeydown.bind(this));
      this.element.addEventListener('keyup', this._onKeyup.bind(this));
    }

    protected _onFocus(event:Event) {
      this.fire('focus', event);
    }

    protected _onBlur(event:Event) {
      this.fire('blur', event);
    }

    protected _onKeydown(event:Event) {
      this.fire('keydown', event);
    }

    protected _onKeyup(event:Event) {
      this.fire('keyup', event);
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

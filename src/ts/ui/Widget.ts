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
/// <reference path="./EventManager.ts"/>

module ui {

  export class Widget extends EventManager {

    private _element: HTMLElement;
    private _parent: Container;


    constructor(parent:Container=null) {
      super();
      this._element = this.createElement();
      this._parent = parent;
      this.addElementParent();
      this.classList.add('ui');
      this.classList.add(this.className);
      this._setupCommonEvents();
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

    protected _setupCommonEvents() {
      this.element.addEventListener('focus', this._onFocus.bind(this));
      this.element.addEventListener('blur', this._onBlur.bind(this));
      this.element.addEventListener('keydown', this._onKeydown.bind(this));
      this.element.addEventListener('keyup', this._onKeyup.bind(this));
      this.element.addEventListener('click', this._onClick.bind(this));
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

    protected _onClick(event:Event) {
      this.fire('click', event);
    }

    get tooltip(): string {
      return this.element.getAttribute('data-tooltip');
    }

    set tooltip(value:string) {
      this.element.setAttribute('data-tooltip', value);
    }

    get tooltipPosition() {
      if (this.classList.contains('ui-tooltip-top')) {
        return 'top';
      }
      if (this.classList.contains('ui-tooltip-left')) {
        return 'left';
      }
      if (this.classList.contains('ui-tooltip-right')) {
        return 'right';
      }
      if (this.classList.contains('ui-tooltip-bottom')) {
        return 'bottom';
      }
      return null;
    }

    set tooltipPosition(pos:string) {
      if (['top', 'left', 'right', 'bottom'].indexOf(pos) !== -1) {
        this.classList.remove('ui-tooltip-top');
        this.classList.remove('ui-tooltip-left');
        this.classList.remove('ui-tooltip-right');
        this.classList.remove('ui-tooltip-bottom');
        this.classList.add('ui-tooltip-' + pos);   
      }
    }

  }

}

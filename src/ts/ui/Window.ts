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
/// <reference path="./Container.ts" />
module ui {

  export class Window extends Container {

    private _body: HTMLElement;
    private _closeBtn: HTMLButtonElement;
    private _title: HTMLElement;
    private _titleText: Text;

    constructor(title:string='', closeButton:boolean=true) {
      super(null);
      this._body = this.createBody();
      this.id = ui.randomId();
      this._title = this.createTitle(title);
      this._closeBtn = closeButton ? this.createCloseButton() : null;
      let cf = document.createElement('div');
      cf.classList.add('clear');
      this.body.appendChild(cf);
    }

    protected get body() {
      return this._body;
    }

    protected createBody() {
      var element = document.createElement('div');
      element.classList.add('body');
      this.element.appendChild(element);
      element.addEventListener('click', this._onBodyClick.bind(this))
      return element;
    }

    protected get className() {
      return 'ui-window';
    }

    protected appendElement(element: HTMLElement) {
      this.body.appendChild(element);
    }

    protected removeElement(element: HTMLElement) {
      this.body.removeChild(element);
    }

    protected addText(text:string) {
      this.body.appendChild(document.createTextNode(text));
    }

    get visible() {
      return this.style.visibility == "visible";
    }

    set visible(value:boolean) {
      this.style.visibility = value ? "visible" : "hidden";
      if (this.visible) {
        this.classList.add('visible');
      } else {
        this.classList.remove('visible');
      }
    }

    get hidden() {
      return !this.visible;
    }

    set hidden(value:boolean) {
      this.visible = !value;
    }

    show() {
      this.visible = true;
    }

    hide() {
      this.visible = false;
    }

    toggle() {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    }

    close() {
      this.hide();
    }

    protected createCloseButton(): HTMLButtonElement {
      let btn = document.createElement('button');
      btn.classList.add('ui-close');
      btn.addEventListener('click', this._onClick.bind(this));
      btn.appendChild(document.createTextNode('X'));
      this.body.appendChild(btn);
      return btn;
    }

    protected createTitle(title:string) {
      let e = document.createElement('h3');
      this._titleText = document.createTextNode(title);
      e.appendChild(this._titleText);
      this.body.appendChild(e);
      return e;
    }

    protected _onClick(event:Event) {
      super._onClick(event);
      if (!event.defaultPrevented) {
        this.close();
      }
    }

    protected _onBodyClick(event:Event) {
      if (event.stopPropagation) {
        event.stopPropagation();   // W3C model
      } else {
        event.cancelBubble = true; // IE model
      }
    }

    get title():string {
      return this._titleText.nodeValue;
    }

    set title(value:string) {
      this._titleText.nodeValue = value;
    }


  }

}

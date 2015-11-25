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
/// <reference path="./Widget.ts" />

module ui {

  export class Switch extends Widget {


        private _input: HTMLInputElement;
        private _label: HTMLLabelElement;
        private _inner: HTMLElement;
        private _before: HTMLElement;
        private _after: HTMLElement;
        private _switch: HTMLElement;
        private _uniqId: string;
        private _beforeTxt: Text;
        private _afterTxt: Text;

        constructor(parent:Container, name:string, onTxt:string='', offTxt:string='') {
          super(parent);
          this._uniqId = ui.randomId();
          this._input = this._createInput(name);
          this._label = this._createLabel(name);
          this._inner = this._createInner();
          this._switch = this._createSwitch();
          this._before = this._createBefore();
          this._after  = this._createAfter();
          this._generateText(onTxt, offTxt);
          this.input.name = name;
        }

        get name() {
          return this.input.name;
        }

        get input() {
          return this._input;
        }

        get onText(): string {
          return this._beforeTxt.nodeValue;
        }

        set onText(value:string) {
          this._beforeTxt.nodeValue = value;
        }

        get offText(): string {
          return this._afterTxt.nodeValue;
        }

        set offText(value:string) {
          this._afterTxt.nodeValue = value;
        }

        _generateText(onTxt:string, offTxt:string) {
          this._beforeTxt = document.createTextNode(onTxt);
          this._afterTxt = document.createTextNode(offTxt);
          this._before.appendChild(this._beforeTxt);
          this._after.appendChild(this._afterTxt);
        }

        _createInner() {
          var e = document.createElement('span');
          e.classList.add('ui-switch-inner');
          this._label.appendChild(e);
          return e;
        }

        _createBefore() {
          var before = document.createElement('span');
          before.classList.add('before');
          this._inner.appendChild(before);
          return before;
        }

        _createAfter() {
          var after = document.createElement('span');
          after.classList.add('after');
          this._inner.appendChild(after);
          return after;
        }

        _createSwitch() {
          var e = document.createElement('span');
          e.classList.add('ui-switch-switch');
          this._label.appendChild(e);
          return e;
        }

        get type(): string {
          return 'checkbox';
        }

        protected createElement(): HTMLElement {
          var element = document.createElement('div');
          return element;
        }

        protected _createLabel(name:string) {
          var l = document.createElement('label');
          l.htmlFor = this._uniqId;
          this.element.appendChild(l);
          return l;
        }

        protected _createInput(name:string) {
          var input = document.createElement('input');
          input.type = this.type;
          input.id = this._uniqId;
          input.name = name;
          this.element.appendChild(input);
          return input;
        }

        protected get className() {
          return 'ui-switch';
        }

        get checked() {
          return this.input.checked;
        }

        set checked(value:boolean) {
          this.input.checked = value;
        }

  }
}

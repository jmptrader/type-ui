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

  export class Checkbox extends Widget {

    private _input: HTMLInputElement;
    private _label: HTMLLabelElement;
    private _text: Text;
    private _uniqId: string;

    constructor(parent:Container, name:string, text:string) {
      super(parent);
      this._uniqId = ui.randomId();
      this._input = this._createInput(name);
      this._label = this._createLabel(name);
      this._text  = this._createText(text);
      this.input.name = name;
    }

    get name() {
      return this.input.name;
    }

    get input() {
      return this._input;
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

    protected _createText(text) {
      var txt = document.createTextNode(text);
      this._label.appendChild(txt);
      return txt;
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
      return 'ui-checkbox';
    }

    get text() {
      return this._text.textContent;
    }

    set text(value: string) {
      this._text.textContent  = value;
    }

    get label() {
      return this.text;
    }

    set label(value:string) {
      this.text = value;
    }

    get checked() {
      return this.input.checked;
    }

    set checked(value:boolean) {
      this.input.checked = value;
    }

  }

}

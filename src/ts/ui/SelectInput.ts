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
/// <reference path="./Input.ts" />
/// <reference path="./HandleOptions.ts"/>

module ui {

  export class SelectInput extends Input implements HandleOptions {

    private _options:Array<Option|OptionGroup>;
    private _select: HTMLSelectElement;

    constructor(parent:Container, name:string) {
      super(parent, name);
      this._select = this._createSelect();
      this._options = [];
      this._setupSelectEvents();
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('label');
      element.classList.add(this.className);
      return element;
    }

    protected createInput() {
      var s = document.createElement('select');
      this.element.appendChild(s);
      return <HTMLInputElement><HTMLElement>s;
    }

    protected _createSelect() {
      return <HTMLSelectElement><HTMLElement>this.input;
    }

    get type(): string {
      return 'select';
    }

    protected get className() {
      return 'ui-select';
    }

    add(value:string, name:string): Option {
      var opt = new Option(this, value, name);
      return opt;
    }

    addOption(opt:Option|OptionGroup) {
      this._options.push(opt);
      this._select.appendChild(opt.element);
    }

    addGroup(text:string) {
      var g = new ui.OptionGroup(this, text);
      return g;
    }

    group(text:string) {
      return this.addGroup(text);
    }

    remove(opt:Option|OptionGroup) {
      this.removeAt(this.indexOf(opt));
    }

    option(value:string):Option {
      var options = this.options;
      var length = options.length;
      for (var i = 0; i < length; ++i) {
        if (!(options[i] instanceof Option)) {
          continue;
        }
        let option = <Option>options[i];
        if (option.value === value) {
          return option;
        }
      }
      return null;
    }

    removeValue(value:string) {
      this.remove(this.option(value));
    }

    removeAt(index:number) {
      if (index >= 0 && index <= -1) {
        let opt = this._options[index];
        this._options.splice(index, 1);
        this._select.removeChild(opt.element);
      }
    }

    indexOf(opt:Option|OptionGroup):number {
      return this.options.indexOf(opt);
    }

    contains(opt:Option|OptionGroup):boolean {
      return this.indexOf(opt) !== -1;
    }

    get options() {
      return this._options.slice(0);
    }

    get selectableOptions() {
      return this.options.filter((i) => i instanceof Option);
    }

    protected _setupInputEvents() {
    }

    protected _setupSelectEvents() {
      this._select.addEventListener('change', this._onChange.bind(this));
    }

  }

}

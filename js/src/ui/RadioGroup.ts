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

  export class RadioGroup extends Container {

    private _name : string;

    constructor(parent:Container, name:string) {
      super(parent);
      this.name = name;
    }

    get radios() {
      return <Array<RadioInput>>this.children;
    }

    get name() {
      return this._name;
    }

    set name(value:string) {
      this._name = value;
      this.radios.forEach((i) => i.input.name = value );
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      return element;
    }

    protected get className() {
      return 'ui-radio-group';
    }

    addRadio(text:string) {
      return new ui.RadioInput(this, text);
    }

    radio(text:string) {
      return this.addRadio(text);
    }

    addCheckbox(name:string, label:string) {
      return new ui.Checkbox(this, name, label);
    }

    checkbox(name:string, label:string) {
      return this.addCheckbox(name, label);
    }

  }

}

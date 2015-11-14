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

  export class Input extends Widget {

    constructor(parent:Container, name:string) {
      super(parent);
      this.name = name;
      this.classList.add('ui-cell-sm-8');
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('input');
      element.type = this.type;
      element.classList.add(`ui-input-${this.type}`);
      return element;
    }

    get input(): HTMLInputElement {
      return <HTMLInputElement>this.element;
    }

    get type(): string {
      return null;
    }

    protected get className() {
      return 'ui-input';
    }

    get name() {
      return this.input.name;
    }

    set name(value: string) {
      this.input.name = value;
    }

    get value() {
      return this.input.value;
    }

    set value(value: string) {
      this.input.value = value;
    }

  }

}

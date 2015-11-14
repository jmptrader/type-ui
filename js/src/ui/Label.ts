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
/// <reference path="./Form.ts" />

module ui {

  export class Label extends Widget {

    constructor(parent:Container, forInput:string, text:string) {
      super(parent);
      this.text = text;
      this.htmlFor = forInput;
      this.classList.add('ui-cell-sm-4');
    }

    get label() {
      return <HTMLLabelElement>this.element;
    }

    protected createElement(): HTMLElement {
      let label = document.createElement('label');
      return label;
    }

    protected get className() {
      return 'ui-label';
    }

    get text() {
      return this.label.textContent;
    }

    set text(value: string) {
      this.label.textContent  = value;
    }

    get htmlFor() {
      return this.label.htmlFor;
    }

    set htmlFor(value: string) {
      this.label.htmlFor = value;
    }

  }

}

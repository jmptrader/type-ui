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
/// <reference path="./HandleOptions.ts"/>
module ui {

  export class Option {

    private _element: HTMLOptionElement;
    private _parent: HandleOptions;

    constructor(parent:HandleOptions, value:string, text:string) {
      this._element = this._createElement(value, text);
      parent.addOption(this);
      this._parent = parent;
    }

    get value():string {
      return this.element.value;
    }

    get text():string {
      return this.element.text;
    }

    set text(value:string) {
      this.element.text = value;
    }

    get element() {
      return this._element;
    }

    get parent() {
      return this._parent;
    }

    protected _createElement(value:string, text:string) {
      var e = document.createElement('option');
      e.value = value;
      e.text  = text;
      return e;
    }

    select() {
      this.parent.value = this.value;
    }

  }

}

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
/// <reference path="./FontAwesomeWidget.ts" />

module ui {

  export class FontAwesomeIcon extends FontAwesomeWidget {

    private _icon : string;

    constructor(parent:Container, icon:string) {
      super(parent);
      this.classList.add('fa-' + icon);
      this._icon = icon;
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('i');
      return element;
    }

    protected get className() {
      return 'fa';
    }

    get icon() {
      return this._icon;
    }

    set icon(value:string) {
      if (value && value !== this.icon) {
        this.classList.remove('fa-' + this.icon);
        this.classList.add('fa-' + value);
        this._icon = value;
      }
    }

  }

}

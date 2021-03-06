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

  export class Toolbar extends Container {

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      return element;
    }

    protected get className() {
      return 'ui-toolbar';
    }

    icon(name:string): ToolbarIcon {
      var btn = new ToolbarIcon(this);
      var icon = new FontAwesomeIcon(btn, name);
      return btn;
    }

    separator() {
      var sep = new ToolbarSeparator(this);
      return sep;
    }

  }

}

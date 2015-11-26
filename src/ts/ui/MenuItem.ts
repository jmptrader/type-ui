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
/// <reference path="./EventManager.ts"/>
/// <reference path="./HandleSubMenu.ts"/>

module ui {

  export class MenuItem extends EventManager {

    protected _menu: HandleSubMenu;
    protected _element: HTMLLIElement;
    protected _link: HTMLAnchorElement;
    protected _text : Text;
    protected _icon : HTMLElement;
    protected _iconName : string;

    constructor(menu:HandleSubMenu, text:string='') {
      super();
      this._menu = menu;
      this._element = this._createListItem();
      this._link = this._createLink(text);
      menu.addElement(this);
      this._setupCommonEvents();
      this.icon = null;
    }

    get menu() {
      return this._menu;
    }

    get element() {
      return this._element;
    }

    get icon() {
      return this._iconName;
    }

    set icon(value:string) {
      this._iconName = value;
      if (!value) {
        if (this.menu instanceof SubMenu) {
          this._icon.className = 'fa fa-fw';
        } else {
          this._icon.className = '';
        }
        return;
      }
      this._icon.className = 'fa fa-fw fa-' + value;
    }

    protected get link() {
      return this._link;
    }

    _createListItem() {
      var li = document.createElement('li');
      return li;
    }

    _createLink(text:string):HTMLAnchorElement {
      var a = document.createElement('a');
      var icon = document.createElement('i');
      var txt = document.createTextNode(text);
      a.appendChild(icon);
      a.appendChild(txt);
      a.href = '#';
      this._icon = icon;
      this._text = txt;
      this.element.appendChild(a);
      return a;
    }

    get text(): string {
      return this._text.nodeValue;
    }

    set text(value:string) {
      this._text.nodeValue = value;
    }

    protected _setupCommonEvents() {
      this._setupElementEvents();
      this._setupLinkEvents();
    }

    protected _setupElementEvents() {
      this.element.addEventListener('focus', this._onFocus.bind(this));
      this.element.addEventListener('blur', this._onBlur.bind(this));
      this.element.addEventListener('keydown', this._onKeydown.bind(this));
      this.element.addEventListener('keyup', this._onKeyup.bind(this));
    }

    protected _setupLinkEvents() {
      this.link.addEventListener('click', this._onClick.bind(this));
    }

    protected _onFocus(event:Event) {
      this.fire('focus', event);
    }

    protected _onBlur(event:Event) {
      this.fire('blur', event);
    }

    protected _onKeydown(event:Event) {
      this.fire('keydown', event);
    }

    protected _onKeyup(event:Event) {
      this.fire('keyup', event);
    }

    protected _onClick(event:Event) {
      this.fire('click', event);
    }

  }

}

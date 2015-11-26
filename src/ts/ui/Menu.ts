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
/// <reference path="./EventManager.ts"/>
/// <reference path="./HandleSubMenu.ts"/>
/// <reference path="./MenuItem.ts"/>
/// <reference path="./SubMenu.ts"/>

module ui {

  export class Menu extends Widget implements HandleSubMenu {

    protected _wrapper: HTMLDivElement;
    protected _list: HTMLUListElement;
    protected _items: Array<MenuItem>;
    protected _toggle: HTMLAnchorElement;

    constructor(parent:Container) {
      super(parent);
      this._wrapper = this._createWrapper();
      this._list = this._createList();
      this._toggle = this._createToggle();
      this._items = [];
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('nav');
      return element;
    }

    protected get className() {
      return 'ui-menu';
    }

    protected get wrapper() {
      return this._wrapper;
    }

    public get list():HTMLUListElement {
      return this._list;
    }

    protected _createWrapper(): HTMLDivElement {
      var div = document.createElement('div');
      this.element.appendChild(div);
      div.classList.add('wrapper');
      return div;
    }

    protected _createList(): HTMLUListElement {
      var ul = document.createElement('ul');
      this.wrapper.appendChild(ul);
      return ul;
    }

    protected _createToggle():HTMLAnchorElement {
      var a = document.createElement('a');
      a.href = '#';
      this.parent.element.appendChild(a);
      a.classList.add('ui-menu-toggle');
      a.addEventListener('click', this.toggle.bind(this));
      return a;
    }

    get open() {
      return this.classList.contains('ui-menu-show');
    }

    get closed() {
      return !this.open;
    }

    show() {
      if (this.closed) {
        var event = new Event('show');
        this.fire('show', event);
        if (!event.defaultPrevented) {
          this.classList.add('ui-menu-show');
        }
      }
    }

    hide() {
      if (this.open) {
        var event = new Event('hide');
        this.fire('hide', event);
        if (!event.defaultPrevented) {
          this.classList.remove('ui-menu-show');
        }
      }
    }

    toggle() {
      var event = new Event('toggle');
      this.fire('toggle', event);
      if (!event.defaultPrevented) {
        if (this.open) {
          this.hide();
          return;
        }
        this.show();
      }
    }

    get items() {
      return this._items.slice(0);
    }

    get length() {
      return this.items.length;
    }

    addElement(item: MenuItem) {
      if (!this.contains(item)){
        this.list.appendChild(item.element);
        this._items.push(item);
      }
    }

    contains(item: MenuItem):boolean {
      return this.indexOf(item) !== -1;
    }

    indexOf(item: MenuItem) {
      return this.items.indexOf(item);
    }

    remove(item: MenuItem) {
      var index = this.indexOf(item);
      if (index >= 0) {
        this.removeAt(index);
      }
    }

    removeAt(index:number) {
      if (index >= 0 && index <= this.length) {
        let item = this.items[index];
        this.element.removeChild(item.element);
        this._items.splice(index, 1);
      }
    }

    addItem(text:string): MenuItem {
      var item = new ui.MenuItem(this, text);
      return item;
    }

    item(text:string): MenuItem {
      return this.addItem(text);
    }

    addSubMenu(text:string): SubMenu {
      var item = new ui.SubMenu(this, text);
      return item;
    }

    subMenu(text:string): SubMenu {
      return this.addSubMenu(text);
    }

    addSeparator(): MenuSeparator {
      var item = new ui.MenuSeparator(this);
      return item;
    }

    separator(): MenuSeparator {
      return this.addSeparator();
    }

  }

}

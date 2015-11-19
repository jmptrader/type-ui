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
/// <reference path="./HandleSubMenu.ts"/>
/// <reference path="./MenuItem.ts"/>

module ui {

  export class SubMenu extends MenuItem implements HandleSubMenu {

    private _items: Array<MenuItem>;
    private _list: HTMLUListElement;

    constructor(menu:HandleSubMenu, text:string='') {
      super(menu, text);
      this._items = [];
      this._list = this._createList();
      this._addCaret();
    }

    protected _createList(): HTMLUListElement {
      var ul = document.createElement('ul');
      this.element.appendChild(ul);
      return ul;
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

    public get list():HTMLUListElement {
      return this._list;
    }

    get items() {
      return this._items.slice(0);
    }

    get length() {
      return this.items.length;
    }

    addSeparator(): MenuSeparator {
      var item = new ui.MenuSeparator(this);
      return item;
    }

    separator(): MenuSeparator {
      return this.addSeparator();
    }

    protected _addCaret() {
      var caret = document.createElement('span');
      var c = this.menu instanceof SubMenu ? 'ui-arrow-right' : 'ui-arrow-down';
      caret.style.marginLeft = '10px';
      caret.classList.add(c);
      this.link.appendChild(caret);
    }

  }

}

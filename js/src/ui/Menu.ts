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

module ui {

  export class MenuItem extends EventManager {

    private _menu: Menu;
    private _element: HTMLLIElement;
    private _link: HTMLAnchorElement;
    private _text : Text;

    constructor(menu:Menu, text:string='') {
      super();
      this._menu = menu;
      this._element = this._createListItem();
      this._link = this._createLink(text);
      menu.addElement(this);
      this._setupCommonEvents();
    }

    get menu() {
      return this._menu;
    }

    get element() {
      return this._element;
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
      var txt = document.createTextNode(text);
      a.appendChild(txt);
      a.href = '#';
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

  export class SubMenu extends MenuItem {

    constructor(menu:Menu, text:string='') {
      super(menu, text);
    }

  }

  export class Menu extends Widget {

    private _wrapper: HTMLDivElement;
    private _list: HTMLUListElement;
    private _items: Array<MenuItem>;
    private _toggle: HTMLAnchorElement;
    private _open: boolean;

    constructor(parent:Container) {
      super(parent);
      this._wrapper = this._createWrapper();
      this._list = this._createList();
      this._toggle = this._createToggle();
      this._items = [];
      this._open = false;
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
      a.addEventListener('click', this.toggle.bind(this));
      return a;
    }

    get open() {
      return this._open;
    }

    get closed() {
      return !this.open;
    }

    show() {
      if (this.closed) {
        var event = document.createEvent('show');
        this.fire('show', event);
        if (!event.defaultPrevented) {
          document.body.classList.add('ui-menu-show');
        }
      }
    }

    hide() {
      if (this.open) {
        var event = document.createEvent('hide');
        this.fire('hide', event);
        if (!event.defaultPrevented) {
          document.body.classList.remove('ui-menu-show');
        }
      }
    }

    toggle() {
      var event = document.createEvent('toggle');
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

    sumMenu(text:string): SubMenu {
      return this.addSubMenu(text);
    }

  }

}

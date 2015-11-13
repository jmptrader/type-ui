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

  class TabHeader extends Container {

    constructor(parent: Container) {
      super(parent);
    }

    get tab() {
      return <Tab>this.parent;
    }

    protected createElement(): HTMLElement {
      return document.createElement('ul');
    }

    protected get className(): string {
      return 'ui-tab-header';
    }

    get pages(): Array<TabPage> {
      return <Array<TabPage>>this.children;
    }

    addPage(name:string,closeButton:boolean=false): TabPage {
      var tab  = <Tab>this.parent;
      var head = this._createHead(name, closeButton);
      var page = this._createPage(head);
      return page;
    }

    private _createHead(name:string, closeButton:boolean): TabHead{
      var head = new Tab.Head(this, name, closeButton);
      this.addChild(head);
      return head;
    }

    private _createPage(head: TabHead): TabPage {
      var page = new Tab.Page(this.tab.body, head);
      return page;
    }

    removePage(page:TabPage) {
      this.removeChild(page.head);
      this.tab.body.removeChild(page);
    }

    select(page:TabPage) {
      this.tab.selectPage(page);
    }

  }

  class TabHead extends Widget {

    private _anchor: HTMLAnchorElement;
    private _text: Text;
    private _closeButton: HTMLButtonElement;
    private _page: TabPage;

    constructor(parent:Container, text:string, closeButton:boolean) {
      super(parent);
      this._text = this.createText(text);
      this._anchor = this.createAnchor();
      this._closeButton = null;
      this._page = null;
      this.element.appendChild(this._anchor);
      this._anchor.appendChild(this._text);
      if (closeButton) {
        this._closeButton = this.createCloseButton();
      }
    }

    get header() {
      return <TabHeader>this.parent;
    }

    get tab() {
      return this.header.tab;
    }

    protected createText(text): Text {
      let txt = document.createTextNode(text);
      return txt;
    }

    protected createAnchor(): HTMLAnchorElement {
      var a = document.createElement('a');
      a.href="#";
      a.addEventListener('click', this._onAnchorClick.bind(this));
      return a;
    }

    protected createCloseButton(): HTMLButtonElement {
      let btn = document.createElement('button');
      btn.classList.add('ui-close');
      btn.addEventListener('click', this._onCloseButton.bind(this));
      btn.appendChild(document.createTextNode('X'));
      this.element.appendChild(btn);
      return btn;
    }

    get page() {
      return this._page;
    }

    get text(): string {
      return this._text.nodeValue;
    }

    get active(): boolean {
      return this.classList.contains('active');
    }

    set active(value: boolean) {
      if (value) {
        this.deselect();
      } else {
        this.select();
      }
    }

    set text(value:string) {
      this._text.nodeValue = value;
    }

    protected createElement(): HTMLElement {
      return document.createElement('li');
    }

    protected get className(): string {
      return 'ui-tab-head';
    }

    protected _onAnchorClick(event: MouseEvent) {
      this.fire('click', event);
      if (!event.defaultPrevented) {
        this.select();
      }
      event.preventDefault();
    }

    protected _onCloseButton(event: MouseEvent) {
      this.fire('close', event);
      if (!event.defaultPrevented) {
        this.close();
      }
      event.preventDefault();
    }

    close() {
      this.deselect();
      this.tab.removePage(this.page);
    }

    select() {
      if (this.index !== this.tab.index && this.enabled) {
        this.tab.selectPage(this.page);
      }
    }

    deselect() {
      if (this.index === this.tab.index) {
        this.tab.index = -1;
      }
    }

    setPage(page:TabPage) {
      this._page = page;
    }

    get index() {
      return this.header.indexOf(this);
    }

    setIndex(value:number) {
      let index = Math.min(Math.max(value, 0), this.header.length);
      this.header.removeChild(this);
      this.header.addChildAt(this, index);
    }


    enable() {
      if (this.disabled) {
          this.classList.remove('disabled');
      }
      if (this.page.disabled) {
        this.page.enable();
      }
    }

    disable() {
      if (this.enabled) {
          this.classList.add('disabled');
      }
      if (this.page.enabled) {
        this.page.disable();
      }
      this.deselect();
    }

    get disabled():boolean {
      return this.classList.contains('disabled');
    }

    get enabled():boolean {
      return !this.disabled;
    }

    set disabled(value: boolean) {
      if (value) {
        this.disable();
      } else {
        this.enable();
      }
    }

    set enabled(value: boolean) {
      this.disabled = !value;
    }

  }

  class TabBody extends Container {

    constructor(parent: Container) {
      super(parent);
    }

    protected createElement(): HTMLElement {
      return document.createElement('ul');
    }

    protected get className(): string {
      return 'ui-tab-body';
    }

    get tab() {
      return <Tab>this.parent;
    }

  }

  class TabPage extends Container {

    private _head: TabHead;


    constructor(parent: Container, head: TabHead) {
      super(parent);
      this._head = head;
      head.setPage(this);
    }

    protected createElement(): HTMLElement {
      return document.createElement('li');
    }

    protected get className(): string {
      return 'ui-tab-page';
    }

    get head() {
      return this._head;
    }

    get body() {
      return <TabBody>this.parent;
    }

    get tab() {
      return this.body.tab;
    }

    get index() {
      return this.body.indexOf(this);
    }

    select() {
      if (this.index !== this.tab.index && this.enabled) {
        this.tab.selectPage(this);
      }
    }

    deselect() {
      if (this.active) {
        this.tab.index = -1;
      }
    }

    get active(): boolean {
      return this.classList.contains('active');
    }

    set active(value: boolean) {
      if (value) {
        this.deselect();
      } else {
        this.select();
      }
    }

    enable() {
      if (this.disabled) {
          this.classList.remove('disabled');
      }
      if (this.head.disabled) {
        this.head.enable();
      }
    }

    disable() {
      if (this.enabled) {
          this.classList.add('disabled');
      }
      if (this.head.enabled) {
        this.head.disable();
      }
      this.deselect();
    }

    get disabled():boolean {
      return this.classList.contains('disabled');
    }

    get enabled():boolean {
      return !this.disabled;
    }

    set disabled(value: boolean) {
      if (value) {
        this.disable();
      } else {
        this.enable();
      }
    }

    set enabled(value: boolean) {
      this.disabled = !value;
    }

    close() {
      this.deselect();
      this.tab.removePage(this);
    }

  }

  export class Tab extends Container {


    public static Header = TabHeader;
    public static Body   = TabBody;
    public static Head   = TabHead;
    public static Page   = TabPage;


    private _header: TabHeader;
    private _body:   TabBody;
    private _index:  number;
    private _disabled: Array<boolean>;

    constructor(parent:Container) {
      super(parent);
      let element = this.element;
      this._header = new TabHeader(this);
      this._body   = new TabBody(this);
      this._disabled = [];
      this._index  = -1;
    }

    get header() {
      return this._header;
    }

    get body() {
      return this._body;
    }

    get pages(): Array<TabPage> {
      return this._header.pages;
    }

    protected createElement(): HTMLElement {
      return document.createElement('div');
    }

    protected get className(): string {
      return 'ui-tab';
    }

    addPage(text:string, closeButton:boolean=false): TabPage {
      let page = this.header.addPage(text, closeButton);
      return page;
    }

    removePage(page: TabPage) {
      return this.header.removePage(page);
    }

    selectPage(page:TabPage) {
      let index = this.body.indexOf(page);
      this.index = index;
    }

    get index() {
      return this._index;
    }

    set index(index:number) {
      if (this.index >= 0) {
        if (this.body.children[this.index]) {
          this.body.children[this.index].classList.remove('active');
          this.header.children[this.index].classList.remove('active');
        }
      }
      if (index >= 0 && index < this.body.length && this.isEnabled(index)) {
        this._index = index;
        this.body.children[this.index].classList.add('active');
        this.header.children[this.index].classList.add('active');
      }
    }

    get currentTabHeader() {
      let index = this.index;
      return index < 0 ? null : this.header[index];
    }

    get currentPage() {
      let index = this.index;
      return index < 0 ? null : this.pages[index];
    }

    get firstTabHeader() {
      return this.header.length <= 0 ? null : this.header[0];
    }

    get firstPage() {
      return this.pages.length <= 0 ? null : this.pages[0];
    }

    get lastTabHeader() {
      let length = this.header.length;
      return length <= 0 ? null : this.header[length];
    }

    get lastPage() {
      let length = this.pages.length;
      return length <= 0 ? null : this.pages[length];
    }

    enable(index:number) {
      if (index >= 0 && index < this.pages.length) {
        this._disabled[index] = false;
        this.pages[index].disable();
      }
    }

    disable(index:number) {
      this._disabled[index] = true;
      this.pages[index].enable();
    }

    isEnabled(index:number): boolean {
      return !this.isDisabled(index);
    }

    isDisabled(index:number): boolean {
      return !!this._disabled[index];
    }

  }

}

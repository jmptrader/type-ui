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

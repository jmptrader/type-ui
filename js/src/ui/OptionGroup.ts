module ui {

  export class OptionGroup implements HandleOptions {

    private _options:Array<Option>;
    private _element: HTMLOptGroupElement;
    private _parent: SelectInput;

    constructor(parent:SelectInput, text:string) {
      this._options = [];
      this._element = this.createElement(text);
      parent.addOption(this);
      this._parent = parent;
    }

    get parent() {
      return this._parent;
    }

    protected createElement(text:string) {
      var element = document.createElement('optgroup');
      element.label = text;
      return element;
    }

    get element() {
      return this._element;
    }

    get type(): string {
      return 'select';
    }

    protected get className() {
      return 'ui-select';
    }

    add(value:string, name:string): Option {
      var opt = new Option(this, value, name);
      return opt;
    }

    addOption(opt:Option) {
      this._options.push(opt);
      this.element.appendChild(opt.element);
    }

    remove(opt:Option) {
      this.removeAt(this.indexOf(opt));
    }

    option(value:string):Option {
      var options = this.options;
      var length = options.length;
      for (var i = 0; i < length; ++i) {
        if (options[i].value === value) {
          return options[i];
        }
      }
      return null;
    }

    removeValue(value:string) {
      this.remove(this.option(value));
    }

    removeAt(index:number) {
      if (index >= 0 && index <= -1) {
        this._options.splice(index, 1);
      }
    }

    indexOf(opt:Option):number {
      return this.options.indexOf(opt);
    }

    contains(opt:Option):boolean {
      return this.indexOf(opt) !== -1;
    }

    get options() {
      return this._options.slice(0);
    }

    get text():string {
      return this.element.label;
    }

    set text(value:string) {
      this.element.label = value;
    }

    get label():string {
      return this.text;
    }

    set label(value:string) {
      this.text = value;
    }

    get value() {
      return this.parent.value;
    }

    set value(value:string) {
      this.parent.value = value;
    }

  }

}

/// <reference path="./Container.ts" />
/// <reference path="./Label.ts" />
/// <reference path="./FormGroup.ts" />
/// <reference path="./Fieldset.ts" />

module ui {

  export class Form extends Container {

    public static Group = FormGroup;

    protected createElement(): HTMLElement {
      let form = document.createElement('form');
      form.addEventListener('submit', this._onFormSubmit.bind(this));
      return form;
    }

    get form() {
      return <HTMLFormElement>this.element;
    }

    protected get className() {
      return 'ui-form';
    }

    protected _onFormSubmit(event: Event) {
      this.fire('submit', event);
    }

    addGroup() {
      return new FormGroup(this);
    }

    group() {
      return this.addGroup();
    }

    addFieldset(legend:string='') {
      return new ui.Fieldset(this, legend);
    }

    fieldset(legend:string='') {
      return this.addFieldset(legend);
    }

  }


}

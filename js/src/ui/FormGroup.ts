module ui {

  export class FormGroup extends Container {

    protected createElement(): HTMLElement {
      let group = document.createElement('div');
      return group;
    }

    protected get className() {
      return 'ui-form-group';
    }

    addLabel(forInput:string, text:string) {
      let label = new Label(this, forInput, text);
      return label;
    }

    label(forInput:string, text:string) {
      return this.addLabel(forInput, text);
    }

  }

}

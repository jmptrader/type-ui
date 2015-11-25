/// <reference path="./Container.ts" />
module ui {

  class HResizePanel extends Container {
    constructor(parent:Container) {
      super(parent);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      return element;
    }

    protected get className() {
      return 'ui-h-resize-panel';
    }

  }

  class VResizePanel extends Container {
    constructor(parent:Container) {
      super(parent);
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      return element;
    }

    protected get className() {
      return 'ui-v-resize-panel';
    }

  }

  export class SplitPane extends Container {

    static HORIZONTAL = 'h';
    static VERTICAL   = 'v';

    private _leftPanel: Container;
    private _rightPanel: Container;

    constructor(parent:Container,direction:string='h') {
      super(parent);
      this._leftPanel = this._createLeftPanel(direction);
      this._rightPanel = this._createRightPanel(direction);
    }

    _createLeftPanel(d:string): Container {
      var panel = d === SplitPane.HORIZONTAL ?
        new HResizePanel(this) :
        new VResizePanel(this);
      return panel;
    }

    _createRightPanel(d:string): Container {
      var panel = d === SplitPane.HORIZONTAL ?
        new HResizePanel(this) :
        new VResizePanel(this);
      return panel;
    }

    protected createElement(): HTMLElement {
      var element = document.createElement('div');
      return element;
    }

    protected get className() {
      return 'ui-split-pane';
    }

    get panel1() {
      return this._leftPanel;
    }

    get panel2() {
      return this._rightPanel;
    }

  }

}

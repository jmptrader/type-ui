/// <reference path="./ListItem.ts" />
/// <reference path="./Widget.ts" />

module ui {

  export class List extends Container {

    constructor(parent:Container) {
      super(parent);
    }


    addItem(): ListItem {
      var li = new ListItem(this);
      return li;
    }

    item() {
      return this.addItem();
    }

    removeItem(item:ListItem) {
      this.removeChild(item);
    }

    get items(): Array<ListItem> {
      return <Array<ListItem>>this.children;
    }

  }

}

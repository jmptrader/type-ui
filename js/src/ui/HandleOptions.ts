module ui {

  export interface HandleOptions {

    value:string;

    add(value:string, name:string): Option;

    addOption(opt:Option);

    remove(opt:Option);

    removeValue(value:string);

    removeAt(index:number);

    indexOf(opt:Option):number;

    contains(opt:Option):boolean;

    option(value:string):Option;

  }

}

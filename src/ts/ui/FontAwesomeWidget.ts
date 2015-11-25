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
/// <reference path="./FontAwesomeTransform.ts" />
/// <reference path="./FontAwesomeSize.ts" />

module ui {

  export class FontAwesomeWidget extends Container implements Icon {

    get fixedWidth():boolean {
      return this.classList.contains('fa-fw');
    }

    set fixedWidth(value:boolean) {
      if (value !== this.spin) {
        if (value) {
          this.classList.add('fa-fw');
        } else {
          this.classList.remove('fa-fw');
        }
      }
    }

    get border():boolean {
      return this.classList.contains('fa-border');
    }

    set border(value:boolean) {
      if (value !== this.spin) {
        if (value) {
          this.classList.add('fa-border');
        } else {
          this.classList.remove('fa-border');
        }
      }
    }

    get inverse():boolean {
      return this.classList.contains('fa-inverse');
    }

    set inverse(value:boolean) {
      if (value !== this.spin) {
        if (value) {
          this.classList.add('fa-inverse');
        } else {
          this.classList.remove('fa-inverse');
        }
      }
    }

    get spin():boolean {
      return this.classList.contains('fa-spin');
    }

    set spin(value:boolean) {
      if (value !== this.spin) {
        if (value) {
          this.classList.remove('fa-pulse');
          this.classList.add('fa-spin');
        } else {
          this.classList.remove('fa-spin');
        }
      }
    }

    get pulse():boolean {
      return this.classList.contains('fa-pulse');
    }

    set pulse(value:boolean) {
      if (value !== this.pulse) {
        if (value) {
          this.classList.remove('fa-spin');
          this.classList.add('fa-pulse');
        } else {
          this.classList.remove('fa-pulse');
        }
      }
    }

    get transform():FontAwesomeTransform {
      if (this.classList.contains('fa-rotate-90')) {
        return FontAwesomeTransform.ROTATE90;
      }
      if (this.classList.contains('fa-rotate-180')) {
        return FontAwesomeTransform.ROTATE180;
      }
      if (this.classList.contains('fa-rotate-270')) {
        return FontAwesomeTransform.ROTATE270;
      }
      if (this.classList.contains('fa-flip-horizontal')) {
        return FontAwesomeTransform.FLIP_HORIZONTAL;
      }
      if (this.classList.contains('fa-flip-vertical')) {
        return FontAwesomeTransform.FLIP_VERTICAL;
      }
      return FontAwesomeTransform.NONE;
    }

    set transform(type:FontAwesomeTransform) {
      this._removeTransform();
      switch (type) {
        case FontAwesomeTransform.ROTATE90:
          this.classList.add('fa-rotate-90');
          break;
        case FontAwesomeTransform.ROTATE180:
          this.classList.add('fa-rotate-180');
          break;
        case FontAwesomeTransform.ROTATE270:
          this.classList.add('fa-rotate-270');
          break;
        case FontAwesomeTransform.FLIP_HORIZONTAL:
          this.classList.add('fa-flip-horizontal');
          break;
        case FontAwesomeTransform.FLIP_VERTICAL:
          this.classList.add('fa-flip-vertical');
          break;
        default:
          break;
      }
    }

    get size():FontAwesomeSize {
      if (this.classList.contains('fa-lg')) {
        return FontAwesomeSize.LARGE;
      }
      if (this.classList.contains('fa-2x')) {
        return FontAwesomeSize.X2;
      }
      if (this.classList.contains('fa-3x')) {
        return FontAwesomeSize.X3;
      }
      if (this.classList.contains('fa-4x')) {
        return FontAwesomeSize.X4;
      }
      if (this.classList.contains('fa-5x')) {
        return FontAwesomeSize.X5;
      }
      return FontAwesomeSize.NORMAL;
    }

    set size(value:FontAwesomeSize) {
      this._removeSize();
      switch (value) {
        case FontAwesomeSize.LARGE:
          this.classList.add('fa-lg');
          break;
        case FontAwesomeSize.X2:
          this.classList.add('fa-2x');
          break;
        case FontAwesomeSize.X3:
          this.classList.add('fa-3x');
          break;
        case FontAwesomeSize.X4:
          this.classList.add('fa-4x');
          break;
        case FontAwesomeSize.X5:
          this.classList.add('fa-5x');
          break;
        default:
          break;
      }
    }

    private _removeTransform() {
      this.classList.remove('fa-rotate-90');
      this.classList.remove('fa-rotate-180');
      this.classList.remove('fa-rotate-270');
      this.classList.remove('fa-rotate-180');
      this.classList.remove('fa-flip-horizontal');
      this.classList.remove('fa-flip-vertical');
    }

    private _removeSize() {
      this.classList.remove('fa-lg');
      this.classList.remove('fa-2x');
      this.classList.remove('fa-3x');
      this.classList.remove('fa-4x');
      this.classList.remove('fa-5x');
    }

  }


}

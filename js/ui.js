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
var ui;
(function (ui) {
    var Widget = (function () {
        function Widget(parent) {
            if (parent === void 0) { parent = null; }
            this._element = this.createElement();
            this._parent = parent;
            this.addElementParent();
            this.classList.add('ui');
            this.classList.add(this.className);
            this._events = {};
        }
        Object.defineProperty(Widget.prototype, "id", {
            get: function () {
                return this.element.id;
            },
            set: function (value) {
                this.element.id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.createElement = function () {
            return null;
        };
        Object.defineProperty(Widget.prototype, "className", {
            get: function () {
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.addElementParent = function () {
            if (this._parent) {
                this._parent.addChild(this);
            }
            else {
                document.getElementById('app').appendChild(this.element);
            }
        };
        Widget.prototype.removeElementParent = function () {
            document.getElementById('app').removeChild(this.element);
        };
        Object.defineProperty(Widget.prototype, "classList", {
            get: function () {
                if (!this.element) {
                    return null;
                }
                return this.element.classList;
            },
            set: function (value) {
                if (!this.element) {
                    return;
                }
                this.element.classList = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Widget.prototype, "style", {
            get: function () {
                if (!this.element) {
                    return null;
                }
                return this.element.style;
            },
            set: function (value) {
                if (!this.element) {
                    return;
                }
                this.element.style = value;
            },
            enumerable: true,
            configurable: true
        });
        Widget.prototype.on = function (name, callback) {
            if (!this._events[name]) {
                this._events[name] = [];
            }
            this._events[name].push(callback);
        };
        Widget.prototype.fire = function (name, event) {
            var events = this._events[name];
            if (events) {
                events.forEach(function (i) { return i(event); });
            }
        };
        Widget.prototype.off = function (name, callback) {
            if (callback === void 0) { callback = null; }
            if (callback !== null && this._events[name]) {
                var i = this._events[name].indexOf(callback);
                while (i !== -1) {
                    this._events[name].splice(i, 1);
                    i = this._events[name].indexOf(callback);
                }
                return;
            }
            this._events[name] = [];
        };
        return Widget;
    })();
    ui.Widget = Widget;
})(ui || (ui = {}));
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(parent) {
            if (parent === void 0) { parent = null; }
            _super.call(this, parent);
            this._children = [];
        }
        Container.prototype.addChild = function (child) {
            if (!this.hasChild(child)) {
                this._children.push(child);
                this.appendElement(child.element);
            }
        };
        Container.prototype.removeChild = function (child) {
            var index = this.indexOf(child);
            if (index !== -1) {
                this._children.splice(index, 1);
                this.removeElement(child.element);
            }
        };
        Container.prototype.hasChild = function (child) {
            return this.indexOf(child) !== -1;
        };
        Container.prototype.addChildAt = function (child, index) {
            var i = Math.min(this.length, Math.max(0, index));
            this._children.splice(i, 0, child);
        };
        Container.prototype.indexOf = function (child) {
            return this._children.indexOf(child);
        };
        Object.defineProperty(Container.prototype, "children", {
            get: function () {
                return this._children.slice(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "length", {
            get: function () {
                return this.children.length;
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.appendElement = function (element) {
            this.element.appendChild(element);
        };
        Container.prototype.removeElement = function (element) {
            this.element.removeChild(element);
        };
        Container.prototype.addText = function (text) {
            this.element.appendChild(document.createTextNode(text));
        };
        Container.prototype.addGrid = function () {
            return new ui.Grid(this);
        };
        Container.prototype.grid = function () {
            return this.addGrid();
        };
        return Container;
    })(ui.Widget);
    ui.Container = Container;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            _super.call(this, null);
            this.create();
        }
        Application.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(Application.prototype, "className", {
            get: function () {
                return 'ui-app';
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.create = function () {
        };
        return Application;
    })(ui.Container);
    ui.Application = Application;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var BaseHeader = (function (_super) {
        __extends(BaseHeader, _super);
        function BaseHeader(parent, text) {
            if (text === void 0) { text = ''; }
            _super.call(this, parent);
            this.classList.add("ui-h" + this.size);
            this._text = this._createTextNode(text);
            this.element.appendChild(this._text);
        }
        BaseHeader.prototype.createElement = function () {
            var element = document.createElement("h" + this.size);
            return element;
        };
        Object.defineProperty(BaseHeader.prototype, "className", {
            get: function () {
                return 'ui-hx';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseHeader.prototype, "size", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        BaseHeader.prototype._createTextNode = function (text) {
            var textInput = document.createTextNode(text);
            return textInput;
        };
        Object.defineProperty(BaseHeader.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return BaseHeader;
    })(ui.Widget);
    ui.BaseHeader = BaseHeader;
    var H1 = (function (_super) {
        __extends(H1, _super);
        function H1() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H1.prototype, "size", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        return H1;
    })(BaseHeader);
    ui.H1 = H1;
    ;
    var H2 = (function (_super) {
        __extends(H2, _super);
        function H2() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H2.prototype, "size", {
            get: function () { return 2; },
            enumerable: true,
            configurable: true
        });
        return H2;
    })(BaseHeader);
    ui.H2 = H2;
    ;
    var H3 = (function (_super) {
        __extends(H3, _super);
        function H3() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H3.prototype, "size", {
            get: function () { return 3; },
            enumerable: true,
            configurable: true
        });
        return H3;
    })(BaseHeader);
    ui.H3 = H3;
    ;
    var H4 = (function (_super) {
        __extends(H4, _super);
        function H4() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H4.prototype, "size", {
            get: function () { return 4; },
            enumerable: true,
            configurable: true
        });
        return H4;
    })(BaseHeader);
    ui.H4 = H4;
    ;
    var H5 = (function (_super) {
        __extends(H5, _super);
        function H5() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H5.prototype, "size", {
            get: function () { return 5; },
            enumerable: true,
            configurable: true
        });
        return H5;
    })(BaseHeader);
    ui.H5 = H5;
    ;
    var H6 = (function (_super) {
        __extends(H6, _super);
        function H6() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(H6.prototype, "size", {
            get: function () { return 6; },
            enumerable: true,
            configurable: true
        });
        return H6;
    })(BaseHeader);
    ui.H6 = H6;
    ;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Blockquote = (function (_super) {
        __extends(Blockquote, _super);
        function Blockquote(parent, quote, footer) {
            if (quote === void 0) { quote = ''; }
            if (footer === void 0) { footer = ''; }
            _super.call(this, parent);
            this._paragraph = this._createParagraph();
            this._paragraphText = this._createParagraphText(this._paragraph, quote);
            this._footer = this._createFooter();
            this._footerText = this._createFooterText(this._footer, footer);
        }
        Blockquote.prototype.createElement = function () {
            var element = document.createElement('blockquote');
            return element;
        };
        Object.defineProperty(Blockquote.prototype, "className", {
            get: function () {
                return 'ui-blockquote';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Blockquote.prototype, "text", {
            get: function () {
                return this.quote;
            },
            set: function (value) {
                this.quote = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Blockquote.prototype, "quote", {
            get: function () {
                return this._paragraphText.nodeValue;
            },
            set: function (value) {
                this._paragraphText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Blockquote.prototype, "footer", {
            get: function () {
                return this._footerText.nodeValue;
            },
            set: function (value) {
                this._footerText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Blockquote.prototype._createParagraph = function () {
            var p = document.createElement('p');
            this.element.appendChild(p);
            return p;
        };
        Blockquote.prototype._createFooter = function () {
            var p = document.createElement('footer');
            this.element.appendChild(p);
            return p;
        };
        Blockquote.prototype._createParagraphText = function (p, text) {
            var t = document.createTextNode(text);
            p.appendChild(t);
            return t;
        };
        Blockquote.prototype._createFooterText = function (f, text) {
            var t = document.createTextNode(text);
            f.appendChild(t);
            return t;
        };
        return Blockquote;
    })(ui.Widget);
    ui.Blockquote = Blockquote;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(parent, text, iconName) {
            if (iconName === void 0) { iconName = null; }
            _super.call(this, parent);
            this._icon = this.createIcon(iconName);
            this._text = this.createText(text);
        }
        Object.defineProperty(Button.prototype, "className", {
            get: function () {
                return 'ui-button';
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.createElement = function () {
            var element = document.createElement('button');
            element.addEventListener('click', this._onElementClick.bind(this));
            return element;
        };
        Object.defineProperty(Button.prototype, "button", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.createText = function (value) {
            var text = document.createTextNode(value);
            this.element.appendChild(text);
            return text;
        };
        Button.prototype.createIcon = function (iconName) {
            return null;
        };
        Object.defineProperty(Button.prototype, "type", {
            get: function () {
                return this.button.type;
            },
            set: function (value) {
                this.button.type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype._onElementClick = function (event) {
            this.fire('click', event);
        };
        return Button;
    })(ui.Widget);
    ui.Button = Button;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Canvas = (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this.element.width;
            },
            set: function (value) {
                this.element.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this.element.height;
            },
            set: function (value) {
                this.element.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.resize = function (width, height) {
            this.width = width;
            this.height = height;
        };
        Canvas.prototype.createElement = function () {
            var element = document.createElement('canvas');
            return element;
        };
        Object.defineProperty(Canvas.prototype, "className", {
            get: function () {
                return 'ui-canvas';
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.getContext = function (type) {
            return this.element.getContext(type);
        };
        return Canvas;
    })(ui.Widget);
    ui.Canvas = Canvas;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Input = (function (_super) {
        __extends(Input, _super);
        function Input(parent, name) {
            _super.call(this, parent);
            this.name = name;
            this.classList.add('ui-cell-sm-8');
        }
        Input.prototype.createElement = function () {
            var element = document.createElement('input');
            element.type = this.type;
            element.classList.add("ui-input-" + this.type);
            return element;
        };
        Object.defineProperty(Input.prototype, "input", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "type", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "className", {
            get: function () {
                return 'ui-input';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "name", {
            get: function () {
                return this.input.name;
            },
            set: function (value) {
                this.input.name = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "value", {
            get: function () {
                return this.input.value;
            },
            set: function (value) {
                this.input.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return Input;
    })(ui.Widget);
    ui.Input = Input;
})(ui || (ui = {}));
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
/// <reference path="./Input.ts" />
var ui;
(function (ui) {
    var ColorInput = (function (_super) {
        __extends(ColorInput, _super);
        function ColorInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(ColorInput.prototype, "type", {
            get: function () {
                return 'color';
            },
            enumerable: true,
            configurable: true
        });
        return ColorInput;
    })(ui.Input);
    ui.ColorInput = ColorInput;
})(ui || (ui = {}));
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
/// <reference path="./Input.ts" />
var ui;
(function (ui) {
    var DateInput = (function (_super) {
        __extends(DateInput, _super);
        function DateInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(DateInput.prototype, "type", {
            get: function () {
                return 'date';
            },
            enumerable: true,
            configurable: true
        });
        return DateInput;
    })(ui.Input);
    ui.DateInput = DateInput;
})(ui || (ui = {}));
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
/// <reference path="./Form.ts" />
var ui;
(function (ui) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(parent, forInput, text) {
            _super.call(this, parent);
            this.text = text;
            this.htmlFor = forInput;
            this.classList.add('ui-cell-sm-4');
        }
        Object.defineProperty(Label.prototype, "label", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype.createElement = function () {
            var label = document.createElement('label');
            return label;
        };
        Object.defineProperty(Label.prototype, "className", {
            get: function () {
                return 'ui-label';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this.label.textContent;
            },
            set: function (value) {
                this.label.textContent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "htmlFor", {
            get: function () {
                return this.label.htmlFor;
            },
            set: function (value) {
                this.label.htmlFor = value;
            },
            enumerable: true,
            configurable: true
        });
        return Label;
    })(ui.Widget);
    ui.Label = Label;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var FormDummy = (function (_super) {
        __extends(FormDummy, _super);
        function FormDummy() {
            _super.apply(this, arguments);
        }
        FormDummy.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(FormDummy.prototype, "className", {
            get: function () {
                return 'ui-cell-sm-4';
            },
            enumerable: true,
            configurable: true
        });
        return FormDummy;
    })(ui.Container);
    var FormButtonGroup = (function (_super) {
        __extends(FormButtonGroup, _super);
        function FormButtonGroup() {
            _super.apply(this, arguments);
        }
        FormButtonGroup.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(FormButtonGroup.prototype, "className", {
            get: function () {
                return 'ui-cell-sm-8';
            },
            enumerable: true,
            configurable: true
        });
        return FormButtonGroup;
    })(ui.Container);
    var InputContainer = (function (_super) {
        __extends(InputContainer, _super);
        function InputContainer() {
            _super.apply(this, arguments);
        }
        InputContainer.prototype.addLabel = function (forInput, text) {
            var label = new ui.Label(this, forInput, text);
            return label;
        };
        InputContainer.prototype.label = function (forInput, text) {
            return this.addLabel(forInput, text);
        };
        InputContainer.prototype.addInput = function (name, type) {
            if (type === void 0) { type = 'text'; }
            switch (type) {
                case 'date': return new ui.DateInput(this, name);
                case 'color': return new ui.ColorInput(this, name);
                case 'number': return new ui.NumberInput(this, name);
                case 'text': return new ui.TextInput(this, name);
                default: return new ui.TextInput(this, name);
            }
        };
        InputContainer.prototype.input = function (name, type) {
            if (type === void 0) { type = 'text'; }
            return this.addInput(name, type);
        };
        InputContainer.prototype.addPair = function (name, label, type) {
            if (type === void 0) { type = 'text'; }
            this.addLabel(name, label);
            return this.addInput(name, type);
        };
        InputContainer.prototype.pair = function (name, label, type) {
            if (type === void 0) { type = 'text'; }
            return this.addPair(name, label, type);
        };
        InputContainer.prototype.text = function (name, label) {
            return this.addPair(name, label, 'text');
        };
        InputContainer.prototype.number = function (name, label) {
            return this.addPair(name, label, 'number');
        };
        InputContainer.prototype.date = function (name, label) {
            return this.addPair(name, label, 'date');
        };
        InputContainer.prototype.color = function (name, label) {
            return this.addPair(name, label, 'color');
        };
        InputContainer.prototype.submit = function (submit, reset) {
            if (reset === void 0) { reset = null; }
            var d = new FormDummy(this);
            var g = new FormButtonGroup(this);
            var btn = new ui.Button(g, submit);
            btn.type = 'submit';
            if (reset !== null) {
                var rst = new ui.Button(g, reset);
                rst.type = 'reset';
            }
            return btn;
        };
        return InputContainer;
    })(ui.Container);
    ui.InputContainer = InputContainer;
})(ui || (ui = {}));
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
/// <reference path="./InputContainer.ts" />
var ui;
(function (ui) {
    var FormGroup = (function (_super) {
        __extends(FormGroup, _super);
        function FormGroup() {
            _super.apply(this, arguments);
        }
        FormGroup.prototype.createElement = function () {
            var group = document.createElement('div');
            group.classList.add('ui-row');
            return group;
        };
        Object.defineProperty(FormGroup.prototype, "className", {
            get: function () {
                return 'ui-form-group';
            },
            enumerable: true,
            configurable: true
        });
        return FormGroup;
    })(ui.InputContainer);
    ui.FormGroup = FormGroup;
})(ui || (ui = {}));
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
/// <reference path="./Label.ts" />
/// <reference path="./FormGroup.ts" />
/// <reference path="./Fieldset.ts" />
var ui;
(function (ui) {
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form() {
            _super.apply(this, arguments);
        }
        Form.prototype.createElement = function () {
            var form = document.createElement('form');
            form.addEventListener('submit', this._onFormSubmit.bind(this));
            return form;
        };
        Object.defineProperty(Form.prototype, "form", {
            get: function () {
                return this.element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "className", {
            get: function () {
                return 'ui-form';
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype._onFormSubmit = function (event) {
            this.fire('submit', event);
        };
        Form.prototype.addGroup = function () {
            return new ui.FormGroup(this);
        };
        Form.prototype.group = function () {
            return this.addGroup();
        };
        Form.prototype.addFieldset = function (legend) {
            if (legend === void 0) { legend = ''; }
            return new ui.Fieldset(this, legend);
        };
        Form.prototype.fieldset = function (legend) {
            if (legend === void 0) { legend = ''; }
            return this.addFieldset(legend);
        };
        Form.Group = ui.FormGroup;
        return Form;
    })(ui.Container);
    ui.Form = Form;
})(ui || (ui = {}));
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
/// <reference path="./Form.ts" />
/// <reference path="./FormGroup.ts" />
var ui;
(function (ui) {
    var Fieldset = (function (_super) {
        __extends(Fieldset, _super);
        function Fieldset(parent, legend) {
            if (legend === void 0) { legend = ''; }
            _super.call(this, parent);
            this._legend = this._createLegend(legend);
        }
        Fieldset.prototype.createElement = function () {
            var element = document.createElement('fieldset');
            return element;
        };
        Object.defineProperty(Fieldset.prototype, "className", {
            get: function () {
                return 'ui-fieldset';
            },
            enumerable: true,
            configurable: true
        });
        Fieldset.prototype._createLegend = function (legend) {
            var l = document.createElement('legend');
            this._legendText = document.createTextNode(legend);
            l.appendChild(this._legendText);
            this.element.appendChild(l);
            return l;
        };
        Object.defineProperty(Fieldset.prototype, "legend", {
            get: function () {
                return this._legendText.nodeValue;
            },
            set: function (value) {
                this._legendText.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Fieldset.prototype.addGroup = function () {
            return new ui.FormGroup(this);
        };
        Fieldset.prototype.group = function () {
            return this.addGroup();
        };
        return Fieldset;
    })(ui.Container);
    ui.Fieldset = Fieldset;
})(ui || (ui = {}));
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
/// <reference path="./SizeSet.ts" />
var ui;
(function (ui) {
    var Row = (function (_super) {
        __extends(Row, _super);
        function Row() {
            _super.apply(this, arguments);
        }
        Row.prototype.addCell = function (sizes) {
            if (sizes === void 0) { sizes = { md: 6 }; }
            var cell = new Cell(this, sizes);
            return cell;
        };
        Row.prototype.cell = function (sizes) {
            if (sizes === void 0) { sizes = { md: 6 }; }
            return this.addCell(sizes);
        };
        Object.defineProperty(Row.prototype, "className", {
            get: function () {
                return 'ui-row';
            },
            enumerable: true,
            configurable: true
        });
        Row.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        return Row;
    })(ui.Container);
    var Cell = (function (_super) {
        __extends(Cell, _super);
        function Cell(parent, sizes) {
            _super.call(this, parent);
            this._sizes = sizes;
            this._setupSizes();
        }
        Cell.prototype._setupSizes = function () {
            for (var s in this._sizes) {
                var v = this._sizes[s];
                if (v) {
                    this.classList.add("ui-cell-" + s + "-" + v);
                }
            }
        };
        Cell.prototype.addRow = function () {
            var grid = new Grid(this);
            return new Row(grid);
        };
        Cell.prototype.row = function () {
            return this.addRow();
        };
        Object.defineProperty(Cell.prototype, "className", {
            get: function () {
                return 'ui-cell';
            },
            enumerable: true,
            configurable: true
        });
        Cell.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        return Cell;
    })(ui.Container);
    var Grid = (function (_super) {
        __extends(Grid, _super);
        function Grid(parent) {
            _super.call(this, parent);
        }
        Grid.prototype.addRow = function () {
            return new Row(this);
        };
        Grid.prototype.row = function () {
            return this.addRow();
        };
        Object.defineProperty(Grid.prototype, "className", {
            get: function () {
                return 'ui-grid';
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Grid.Row = Row;
        Grid.Cell = Cell;
        return Grid;
    })(ui.Container);
    ui.Grid = Grid;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var HorizontalRule = (function (_super) {
        __extends(HorizontalRule, _super);
        function HorizontalRule() {
            _super.apply(this, arguments);
        }
        HorizontalRule.prototype.createElement = function () {
            var element = document.createElement('hr');
            return element;
        };
        Object.defineProperty(HorizontalRule.prototype, "className", {
            get: function () {
                return 'ui-hr';
            },
            enumerable: true,
            configurable: true
        });
        return HorizontalRule;
    })(ui.Widget);
    ui.HorizontalRule = HorizontalRule;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            _super.apply(this, arguments);
        }
        ListItem.prototype.createElement = function () {
            var element = document.createElement('li');
            return element;
        };
        Object.defineProperty(ListItem.prototype, "className", {
            get: function () {
                return 'ui-li';
            },
            enumerable: true,
            configurable: true
        });
        return ListItem;
    })(ui.Container);
    ui.ListItem = ListItem;
})(ui || (ui = {}));
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
/// <reference path="./ListItem.ts" />
/// <reference path="./Widget.ts" />
var ui;
(function (ui) {
    var List = (function (_super) {
        __extends(List, _super);
        function List(parent) {
            _super.call(this, parent);
        }
        List.prototype.addItem = function () {
            var li = new ui.ListItem(this);
            return li;
        };
        List.prototype.item = function () {
            return this.addItem();
        };
        List.prototype.removeItem = function (item) {
            this.removeChild(item);
        };
        Object.defineProperty(List.prototype, "items", {
            get: function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        return List;
    })(ui.Container);
    ui.List = List;
})(ui || (ui = {}));
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
/// <reference path="./Input.ts" />
var ui;
(function (ui) {
    var NumberInput = (function (_super) {
        __extends(NumberInput, _super);
        function NumberInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(NumberInput.prototype, "type", {
            get: function () {
                return 'number';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInput.prototype, "max", {
            get: function () {
                return this.input.max;
            },
            set: function (value) {
                this.input.max = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInput.prototype, "min", {
            get: function () {
                return this.input.min;
            },
            set: function (value) {
                this.input.min = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NumberInput.prototype, "step", {
            get: function () {
                return this.input.step;
            },
            set: function (value) {
                this.input.step = value;
            },
            enumerable: true,
            configurable: true
        });
        return NumberInput;
    })(ui.Input);
    ui.NumberInput = NumberInput;
})(ui || (ui = {}));
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
/// <reference path="./List.ts" />
var ui;
(function (ui) {
    var OrderedList = (function (_super) {
        __extends(OrderedList, _super);
        function OrderedList(parent) {
            _super.call(this, parent);
        }
        OrderedList.prototype.createElement = function () {
            var element = document.createElement('ol');
            return element;
        };
        Object.defineProperty(OrderedList.prototype, "className", {
            get: function () {
                return 'ui-ol';
            },
            enumerable: true,
            configurable: true
        });
        return OrderedList;
    })(ui.List);
    ui.OrderedList = OrderedList;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel(parent) {
            _super.call(this, parent);
        }
        Object.defineProperty(Panel.prototype, "className", {
            get: function () {
                return 'ui-panel';
            },
            enumerable: true,
            configurable: true
        });
        Panel.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        return Panel;
    })(ui.Container);
    ui.Panel = Panel;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var Paragraph = (function (_super) {
        __extends(Paragraph, _super);
        function Paragraph(parent, text) {
            if (text === void 0) { text = ''; }
            _super.call(this, parent);
            this._text = this._createTextNode(text);
            this.element.appendChild(this._text);
        }
        Paragraph.prototype.createElement = function () {
            var element = document.createElement('span');
            return element;
        };
        Object.defineProperty(Paragraph.prototype, "className", {
            get: function () {
                return 'ui-paragraph';
            },
            enumerable: true,
            configurable: true
        });
        Paragraph.prototype._createTextNode = function (text) {
            var textInput = document.createTextNode(text);
            return textInput;
        };
        Object.defineProperty(Paragraph.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return Paragraph;
    })(ui.Widget);
    ui.Paragraph = Paragraph;
})(ui || (ui = {}));
/// <reference path="./Container.ts" />
var ui;
(function (ui) {
    var HResizePanel = (function (_super) {
        __extends(HResizePanel, _super);
        function HResizePanel(parent) {
            _super.call(this, parent);
        }
        HResizePanel.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(HResizePanel.prototype, "className", {
            get: function () {
                return 'ui-h-resize-panel';
            },
            enumerable: true,
            configurable: true
        });
        return HResizePanel;
    })(ui.Container);
    var VResizePanel = (function (_super) {
        __extends(VResizePanel, _super);
        function VResizePanel(parent) {
            _super.call(this, parent);
        }
        VResizePanel.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(VResizePanel.prototype, "className", {
            get: function () {
                return 'ui-v-resize-panel';
            },
            enumerable: true,
            configurable: true
        });
        return VResizePanel;
    })(ui.Container);
    var SplitPane = (function (_super) {
        __extends(SplitPane, _super);
        function SplitPane(parent, direction) {
            if (direction === void 0) { direction = 'h'; }
            _super.call(this, parent);
            this._leftPanel = this._createLeftPanel(direction);
            this._rightPanel = this._createRightPanel(direction);
        }
        SplitPane.prototype._createLeftPanel = function (d) {
            var panel = d === SplitPane.HORIZONTAL ?
                new HResizePanel(this) :
                new VResizePanel(this);
            return panel;
        };
        SplitPane.prototype._createRightPanel = function (d) {
            var panel = d === SplitPane.HORIZONTAL ?
                new HResizePanel(this) :
                new VResizePanel(this);
            return panel;
        };
        SplitPane.prototype.createElement = function () {
            var element = document.createElement('div');
            return element;
        };
        Object.defineProperty(SplitPane.prototype, "className", {
            get: function () {
                return 'ui-split-pane';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitPane.prototype, "panel1", {
            get: function () {
                return this._leftPanel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SplitPane.prototype, "panel2", {
            get: function () {
                return this._rightPanel;
            },
            enumerable: true,
            configurable: true
        });
        SplitPane.HORIZONTAL = 'h';
        SplitPane.VERTICAL = 'v';
        return SplitPane;
    })(ui.Container);
    ui.SplitPane = SplitPane;
})(ui || (ui = {}));
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
var ui;
(function (ui) {
    var TabHeader = (function (_super) {
        __extends(TabHeader, _super);
        function TabHeader(parent) {
            _super.call(this, parent);
        }
        Object.defineProperty(TabHeader.prototype, "tab", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        TabHeader.prototype.createElement = function () {
            return document.createElement('ul');
        };
        Object.defineProperty(TabHeader.prototype, "className", {
            get: function () {
                return 'ui-tab-header';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHeader.prototype, "pages", {
            get: function () {
                return this.children;
            },
            enumerable: true,
            configurable: true
        });
        TabHeader.prototype.addPage = function (name, closeButton) {
            if (closeButton === void 0) { closeButton = false; }
            var tab = this.parent;
            var head = this._createHead(name, closeButton);
            var page = this._createPage(head);
            return page;
        };
        TabHeader.prototype._createHead = function (name, closeButton) {
            var head = new Tab.Head(this, name, closeButton);
            this.addChild(head);
            return head;
        };
        TabHeader.prototype._createPage = function (head) {
            var page = new Tab.Page(this.tab.body, head);
            return page;
        };
        TabHeader.prototype.removePage = function (page) {
            this.removeChild(page.head);
            this.tab.body.removeChild(page);
        };
        TabHeader.prototype.select = function (page) {
            this.tab.selectPage(page);
        };
        return TabHeader;
    })(ui.Container);
    var TabHead = (function (_super) {
        __extends(TabHead, _super);
        function TabHead(parent, text, closeButton) {
            _super.call(this, parent);
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
        Object.defineProperty(TabHead.prototype, "header", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "tab", {
            get: function () {
                return this.header.tab;
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype.createText = function (text) {
            var txt = document.createTextNode(text);
            return txt;
        };
        TabHead.prototype.createAnchor = function () {
            var a = document.createElement('a');
            a.href = "#";
            a.addEventListener('click', this._onAnchorClick.bind(this));
            return a;
        };
        TabHead.prototype.createCloseButton = function () {
            var btn = document.createElement('button');
            btn.classList.add('ui-close');
            btn.addEventListener('click', this._onCloseButton.bind(this));
            btn.appendChild(document.createTextNode('X'));
            this.element.appendChild(btn);
            return btn;
        };
        Object.defineProperty(TabHead.prototype, "page", {
            get: function () {
                return this._page;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "text", {
            get: function () {
                return this._text.nodeValue;
            },
            set: function (value) {
                this._text.nodeValue = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "active", {
            get: function () {
                return this.classList.contains('active');
            },
            set: function (value) {
                if (value) {
                    this.deselect();
                }
                else {
                    this.select();
                }
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype.createElement = function () {
            return document.createElement('li');
        };
        Object.defineProperty(TabHead.prototype, "className", {
            get: function () {
                return 'ui-tab-head';
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype._onAnchorClick = function (event) {
            this.fire('click', event);
            if (!event.defaultPrevented) {
                this.select();
            }
            event.preventDefault();
        };
        TabHead.prototype._onCloseButton = function (event) {
            this.fire('close', event);
            if (!event.defaultPrevented) {
                this.close();
            }
            event.preventDefault();
        };
        TabHead.prototype.close = function () {
            this.deselect();
            this.tab.removePage(this.page);
        };
        TabHead.prototype.select = function () {
            if (this.index !== this.tab.index && this.enabled) {
                this.tab.selectPage(this.page);
            }
        };
        TabHead.prototype.deselect = function () {
            if (this.index === this.tab.index) {
                this.tab.index = -1;
            }
        };
        TabHead.prototype.setPage = function (page) {
            this._page = page;
        };
        Object.defineProperty(TabHead.prototype, "index", {
            get: function () {
                return this.header.indexOf(this);
            },
            enumerable: true,
            configurable: true
        });
        TabHead.prototype.setIndex = function (value) {
            var index = Math.min(Math.max(value, 0), this.header.length);
            this.header.removeChild(this);
            this.header.addChildAt(this, index);
        };
        TabHead.prototype.enable = function () {
            if (this.disabled) {
                this.classList.remove('disabled');
            }
            if (this.page.disabled) {
                this.page.enable();
            }
        };
        TabHead.prototype.disable = function () {
            if (this.enabled) {
                this.classList.add('disabled');
            }
            if (this.page.enabled) {
                this.page.disable();
            }
            this.deselect();
        };
        Object.defineProperty(TabHead.prototype, "disabled", {
            get: function () {
                return this.classList.contains('disabled');
            },
            set: function (value) {
                if (value) {
                    this.disable();
                }
                else {
                    this.enable();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabHead.prototype, "enabled", {
            get: function () {
                return !this.disabled;
            },
            set: function (value) {
                this.disabled = !value;
            },
            enumerable: true,
            configurable: true
        });
        return TabHead;
    })(ui.Widget);
    var TabBody = (function (_super) {
        __extends(TabBody, _super);
        function TabBody(parent) {
            _super.call(this, parent);
        }
        TabBody.prototype.createElement = function () {
            return document.createElement('ul');
        };
        Object.defineProperty(TabBody.prototype, "className", {
            get: function () {
                return 'ui-tab-body';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabBody.prototype, "tab", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        return TabBody;
    })(ui.Container);
    var TabPage = (function (_super) {
        __extends(TabPage, _super);
        function TabPage(parent, head) {
            _super.call(this, parent);
            this._head = head;
            head.setPage(this);
        }
        TabPage.prototype.createElement = function () {
            return document.createElement('li');
        };
        Object.defineProperty(TabPage.prototype, "className", {
            get: function () {
                return 'ui-tab-page';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "head", {
            get: function () {
                return this._head;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "body", {
            get: function () {
                return this.parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "tab", {
            get: function () {
                return this.body.tab;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "index", {
            get: function () {
                return this.body.indexOf(this);
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.select = function () {
            if (this.index !== this.tab.index && this.enabled) {
                this.tab.selectPage(this);
            }
        };
        TabPage.prototype.deselect = function () {
            if (this.active) {
                this.tab.index = -1;
            }
        };
        Object.defineProperty(TabPage.prototype, "active", {
            get: function () {
                return this.classList.contains('active');
            },
            set: function (value) {
                if (value) {
                    this.deselect();
                }
                else {
                    this.select();
                }
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.enable = function () {
            if (this.disabled) {
                this.classList.remove('disabled');
            }
            if (this.head.disabled) {
                this.head.enable();
            }
        };
        TabPage.prototype.disable = function () {
            if (this.enabled) {
                this.classList.add('disabled');
            }
            if (this.head.enabled) {
                this.head.disable();
            }
            this.deselect();
        };
        Object.defineProperty(TabPage.prototype, "disabled", {
            get: function () {
                return this.classList.contains('disabled');
            },
            set: function (value) {
                if (value) {
                    this.disable();
                }
                else {
                    this.enable();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPage.prototype, "enabled", {
            get: function () {
                return !this.disabled;
            },
            set: function (value) {
                this.disabled = !value;
            },
            enumerable: true,
            configurable: true
        });
        TabPage.prototype.close = function () {
            this.deselect();
            this.tab.removePage(this);
        };
        return TabPage;
    })(ui.Container);
    var Tab = (function (_super) {
        __extends(Tab, _super);
        function Tab(parent) {
            _super.call(this, parent);
            var element = this.element;
            this._header = new TabHeader(this);
            this._body = new TabBody(this);
            this._disabled = [];
            this._index = -1;
        }
        Object.defineProperty(Tab.prototype, "header", {
            get: function () {
                return this._header;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "body", {
            get: function () {
                return this._body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "pages", {
            get: function () {
                return this._header.pages;
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.createElement = function () {
            return document.createElement('div');
        };
        Object.defineProperty(Tab.prototype, "className", {
            get: function () {
                return 'ui-tab';
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.addPage = function (text, closeButton) {
            if (closeButton === void 0) { closeButton = false; }
            var page = this.header.addPage(text, closeButton);
            return page;
        };
        Tab.prototype.removePage = function (page) {
            return this.header.removePage(page);
        };
        Tab.prototype.selectPage = function (page) {
            var index = this.body.indexOf(page);
            this.index = index;
        };
        Object.defineProperty(Tab.prototype, "index", {
            get: function () {
                return this._index;
            },
            set: function (index) {
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "currentTabHeader", {
            get: function () {
                var index = this.index;
                return index < 0 ? null : this.header[index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "currentPage", {
            get: function () {
                var index = this.index;
                return index < 0 ? null : this.pages[index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "firstTabHeader", {
            get: function () {
                return this.header.length <= 0 ? null : this.header[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "firstPage", {
            get: function () {
                return this.pages.length <= 0 ? null : this.pages[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "lastTabHeader", {
            get: function () {
                var length = this.header.length;
                return length <= 0 ? null : this.header[length];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "lastPage", {
            get: function () {
                var length = this.pages.length;
                return length <= 0 ? null : this.pages[length];
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.enable = function (index) {
            if (index >= 0 && index < this.pages.length) {
                this._disabled[index] = false;
                this.pages[index].disable();
            }
        };
        Tab.prototype.disable = function (index) {
            this._disabled[index] = true;
            this.pages[index].enable();
        };
        Tab.prototype.isEnabled = function (index) {
            return !this.isDisabled(index);
        };
        Tab.prototype.isDisabled = function (index) {
            return !!this._disabled[index];
        };
        Tab.Header = TabHeader;
        Tab.Body = TabBody;
        Tab.Head = TabHead;
        Tab.Page = TabPage;
        return Tab;
    })(ui.Container);
    ui.Tab = Tab;
})(ui || (ui = {}));
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
/// <reference path="./Input.ts" />
var ui;
(function (ui) {
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(TextInput.prototype, "type", {
            get: function () {
                return 'text';
            },
            enumerable: true,
            configurable: true
        });
        return TextInput;
    })(ui.Input);
    ui.TextInput = TextInput;
})(ui || (ui = {}));
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
/// <reference path="./List.ts" />
var ui;
(function (ui) {
    var UnorderedList = (function (_super) {
        __extends(UnorderedList, _super);
        function UnorderedList(parent) {
            _super.call(this, parent);
        }
        UnorderedList.prototype.createElement = function () {
            var element = document.createElement('ul');
            return element;
        };
        Object.defineProperty(UnorderedList.prototype, "className", {
            get: function () {
                return 'ui-ul';
            },
            enumerable: true,
            configurable: true
        });
        return UnorderedList;
    })(ui.List);
    ui.UnorderedList = UnorderedList;
})(ui || (ui = {}));
//# sourceMappingURL=ui.js.map
var app = new ui.Application();

var menu = new ui.Menu(app);
  var i1 = menu.item('Item 1');
  var i2 = menu.subMenu('Menu 1');
    i2.item('Sub Item 1');
  var i3 = menu.item('Item 2');
  menu.separator();
  var i4 = menu.subMenu('Menu 2');
    i4.item('Sub Item 1');
    i4.separator();
    i4.item('Sub Item 2');
    var sm1 = i4.subMenu('Sub Menu');
      sm1.item('Sub Item 1');
      sm1.item('Sub Item 2');

var toolbar = new ui.Toolbar(app);
var i = toolbar.icon('user');
i.tooltip = 'This is a tooltip!';
i.tooltipPosition = 'right';
toolbar.separator();
toolbar.icon('delete');

var $CON = new ui.Container(app);

var r1  = $CON.grid().row();
var cx1 = r1.cell({md: 3});
var cx2 = r1.cell({md: 6});
var cx3 = r1.cell({md: 3});

new ui.H1(cx1, 'Header 1');
new ui.H2(cx1, 'Header 2');
new ui.H3(cx1, 'Header 3');
new ui.H4(cx1, 'Header 4');
new ui.H5(cx1, 'Header 5');
new ui.H6(cx1, 'Header 6');

var tab = new ui.Tab(cx2);

var page1 = tab.addPage("First Tab");
var page2 = tab.addPage("Second Tab");
var page3 = tab.addPage("Disabled Tab");

page1.element.appendChild(document.createTextNode('Hello world'));
page3.disable();

tab.addPage("Closeable tab", true);

tab.index = 0;

var sp1 = new ui.SplitPane($CON, ui.SplitPane.HORIZONTAL);
var sp2 = new ui.SplitPane($CON, ui.SplitPane.VERTICAL);

sp1.panel1.addText("Split 1-A");
sp1.panel2.addText("Split 1-B");

sp2.panel1.addText("Split 2-A");
sp2.panel2.addText("Split 2-B");

new ui.HorizontalRule($CON);

var formGrid = new ui.Grid($CON);

var formRow = formGrid.row();
  formRow.cell({md: 3});
  var formCell = formRow.cell({md: 6});

var formPanel = new ui.Panel(formCell);

var form = new ui.Form(formPanel);

var fieldset = form.fieldset('Inputs');

var group = fieldset.group();
  var t = group.text('text', 'Text Input');
  t.icon = 'user';
  group = fieldset.group();
    group.text('text', 'Disabled Text Input').disabled = true;
group = fieldset.group();
  t = group.number('number', 'Number Input');
  t.rightText = '%';
  t.icon = 'user';
group = fieldset.group();
  t = group.color('color', 'Color Input');
  t.icon = 'user';
  t.tooltip = 'Can colors?';
  var $color = t;
  group = fieldset.group();
    group.color('color', 'Color Input 2');
group = fieldset.group();
  t = group.date('date', 'Date Input');
  t.icon = 'user';
  t.tooltip = 'This is a date input';
group = fieldset.group();
    var sel = group.select('select', 'A selection');
      sel.icon = 'user';
      sel.add('s1', 'This <Is a selection>');
      sel.add('s2', 'Selection 2');
      var sg1 = sel.group('Grouping 1');
        sg1.add('s3', 'Selection Group 1');
        sg1.add('s4', 'Selection Group 2');
group = fieldset.group();
  group.checkbox('check', 'Do something cool');
group = fieldset.group();
  group.switch('switchie', 'Super awesome', 'YES', 'NO');
group = fieldset.group('radio');
  var rg = group.radioGroup('radio', 'Do something cool');
    var r1 = rg.radio('Yes'); r1.checked = true;
    var r2 = rg.radio('No');
group = fieldset.group();
  rg = group.radioGroup('opts', 'Options');
  var ch1 = rg.checkbox('o1', 'An option'); ch1.checked = true;
  rg.checkbox('o2', 'Another option');


group = fieldset.group();
    group.submit('Submit');

new ui.HorizontalRule($CON);

var grid = new ui.Grid($CON);
var row = grid.row();
  var cell1 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell1.addText('cell-1');
  var cell2 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell2.addText('cell-2');
  var cell3 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell3.addText('cell-3');
  var cell4 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell4.addText('cell-4');

new ui.HorizontalRule($CON);

var p = new ui.Paragraph($CON, "This is a paragraph.");

new ui.HorizontalRule($CON);

var quote = new ui.Blockquote($CON);
quote.quote = 'This is a blockquote';
quote.footer = 'It was made by me';

var quote2 = new ui.Blockquote($CON);
quote2.quote = 'This is another blockquote, but it doesn\'t have a footer';

new ui.HorizontalRule($CON);

var ol = new ui.OrderedList($CON);
  ol.item().addText("Item 1");
  ol.item().addText("Item 2");
  ol.item().addText("Item 3");

var ul = new ui.UnorderedList($CON);
  ul.item().addText("Item 1");
  ul.item().addText("Item 2");
  ul.item().addText("Item 3");

var datalist = new ui.DataList($CON);
    datalist.item().addText("Item 1");
    datalist.item().addText("Item 2");
    datalist.item().addText("Item 3");

var editor = new ui.AceEditor($CON, 'editor');
editor.value = 'function test() {}';

var icon1 = new ui.FontAwesomeIcon($CON, 'spinner');
  icon1.spin = true;
  icon1.size = ui.FontAwesomeSize.X5;
var icon2 = new ui.FontAwesomeIcon($CON, 'spinner');
  icon2.pulse = true;
  icon2.size  = ui.FontAwesomeSize.LARGE;
var icon3 = new ui.FontAwesomeStack($CON, 'circle', 'flag', ui.FontAwesomeStackOrder.INVERSE);
icon3.upper.inverse = true;
var icon4 = new ui.FontAwesomeStack($CON, 'twitter', 'square-o');
  icon4.size = ui.FontAwesomeSize.LARGE;

var sw1 = new ui.Switch($CON, 'switch1', 'ON', 'OFF');

new ui.HorizontalRule($CON);

function PropertyField(name, tag) {

  this.name = name;
  this.sortable = true;

  this.format = function (o) {
    return document.createTextNode(o[name]);
  }

  this.sort = function (a, b) {
    return a[name] > b[name] ? 1 : (a[name] < b[name] ? -1 : 0);
  }

  this.header = function () {
    return document.createTextNode(tag);
  }

}

var btn = new ui.Button($CON, 'With icon and text', 'user');

new ui.Button($CON, '', 'user');

new ui.Button($CON, 'Without icon');

var tm = new ui.TableModel([{name: 'Name 1', desc: 'Desc 1'}, {name: 'Name 2', desc: 'Desc 2'}]);
var pf = new PropertyField('desc', 'Description');
pf.sortable = false;
tm.fields = [new PropertyField('name', 'Name'), pf ];
var table = new ui.Table($CON, tm);

new ui.HorizontalRule($CON);

new ui.HorizontalRule($CON);

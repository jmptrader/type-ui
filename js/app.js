var app = new ui.Application();

var tab = new ui.Tab(app);

var page1 = tab.addPage("First Tab");
var page2 = tab.addPage("Second Tab");
var page3 = tab.addPage("Disabled Tab");

page1.element.appendChild(document.createTextNode('Hello world'));
page3.disable();

tab.addPage("Closeable tab", true);

tab.index = 0;

new ui.HorizontalRule(app);

var panel = new ui.Panel(app);

var btn1 = new ui.Button(panel, "Click me!");
btn1.on('click', function () { alert('How you date to click me!'); });

new ui.HorizontalRule(app);

var formGrid = new ui.Grid(app);

var formRow = formGrid.row();
  formRow.cell({md: 3});
  var formCell = formRow.cell({md: 6});

var formPanel = new ui.Panel(formCell);

var form = new ui.Form(formPanel);

var fieldset = form.fieldset('Inputs');

var group = fieldset.group();
group.label('', 'Label');

new ui.HorizontalRule(app);

var grid = new ui.Grid(app);
var row = grid.row();
  var cell1 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell1.addText('cell-1');
  var cell2 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell2.addText('cell-2');
  var cell3 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell3.addText('cell-3');
  var cell4 = row.cell({xs: 12, sm: 6, md: 4, lg: 3});
    cell4.addText('cell-4');

new ui.HorizontalRule(app);

var p = new ui.Paragraph(app, "This is a paragraph.");

new ui.HorizontalRule(app);

var quote = new ui.Blockquote(app);
quote.quote = 'This is a blockquote';
quote.footer = 'It was made by me';

var quote2 = new ui.Blockquote(app);
quote2.quote = 'This is another blockquote, but it doesn\'t have a footer';

new ui.HorizontalRule(app);

var ol = new ui.OrderedList();
  ol.item().addText("Item 1");
  ol.item().addText("Item 2");
  ol.item().addText("Item 3");

var ul = new ui.UnorderedList();
  ul.item().addText("Item 1");
  ul.item().addText("Item 2");
  ul.item().addText("Item 3");

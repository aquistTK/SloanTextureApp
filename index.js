async function process() {
  let image = await IJS.Image.load(document.getElementById('color').src);

  var w = image.width;
  var l = image.height;

  var shortest = Math.min(w, l);
  var longest = Math.max(w, l);

  var isSquare = (l === w);

  var transformX = 0;
  var transformY = 0;

  var originalText = document.getElementById('originalImageLabel');
  var resultText = document.getElementById('resultImageLabel');

  if (!isSquare) {
    if (longest == w) {
      transformX = Math.floor((w * .5) - (shortest * .5));
    } else {
      transformY = Math.floor((l * .5) - (shortest * .5));
    }

    originalText.innerHTML = "&#9940; Not square";

    var result = image.crop({ width: shortest, height: shortest, x: transformX, y: transformY });

    document.getElementById('result').src = result.toDataURL();

    resultText.innerHTML = "Use this cropped version:";
  } else {
    originalText.innerHTML = "&#9989; Image is square";
    resultText.innerHTML = "";
    document.getElementById('result').src = "";
  }



}

window.myNameValues = { "category": "Corian", "name": "(name)", "size": "5", "roughness": "50" };

window.myNameValues["itemID"] = "ITEM_ID";
window.myNameValues["fileID"] = "FILE_ID";

function setProperty(item, propertyName) {
  window.myNameValues[propertyName] = item.options[item.selectedIndex].value;
  updateName();
}

function setBasicProperty(item, propertyName) {
  window.myNameValues[propertyName] = item.value;
  updateName();
}

function updateName() {
  if (window.myNameValues.name != "" && window.myNameValues.name != " ") {
    const nameVal = window.myNameValues;
    var nameDisplay = document.getElementById('propertyString');
    nameDisplay.innerHTML = `${nameVal["category"]}_${nameVal["name"]}_${nameVal["size"]}_${nameVal["roughness"]}`;
  }

  updateTables();
}


function copyNameStr() {
  var nameDisplay = document.getElementById('propertyString');
  navigator.clipboard.writeText(nameDisplay.innerHTML);
}

//   documentation: https://github.com/image-js/image-js#examples-in-the-browser

async function handleFiles(res) {
  console.log(res);

  var preview = document.getElementById('color');
  var file = res[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    process();
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }

  return;
}

function getSinkTable(){
  return  [
    ["displayValue (color name)", `${window.myNameValues["name"]}`],
    ["helpText (usually N/A)", ""],
    ["daAttribute", "ZZ_MATERIAL_COLOR"],
    ["daValue (color name, uppercase)", `${window.myNameValues["name"].toUpperCase()}`],
    ["imageUrl (File ID before /content)", `https://preview.threekit.com/api/files/${window.myNameValues["fileID"]}/content`],
    ["materialTag (lower-case, dash-seperated color category)", `${window.myNameValues["category"].replace(/\s+/g, '-').toLowerCase()}`],
    ["priceTag(between 1 and 5 dollar signs)", "$$$$$"],
    ["colorTag", "(Use one of the existing options)"],
    ["catalogId (item ID)", `${window.myNameValues["itemID"]}`],
    ["materialAttVal (color category)", `${window.myNameValues["category"]}`],
    ["catalogIdDataTypeId (Item ID)", `${window.myNameValues["itemID"]}`]
  ];
}

function getCabinetTable(){
  return  [
    ["displayValue (color name)", `${window.myNameValues["name"]}`],
    ["helpText (usually N/A)", ""],
    ["daAttribute", "ZZ_LAMINATE_COLOR"],
    ["daValue (color name, uppercase)", `${window.myNameValues["name"].toUpperCase()}`],
    ["imageUrl (File ID + url)", `https://preview.threekit.com/api/files/${window.myNameValues["fileID"]}/content`],
    ["materialTag (color category)", "wilsonart"],
    ["priceTag (usually N/A)", ""],
    ["colorTag", "(Use one of the existing options)"],
    ["catalogId (item ID)", `${window.myNameValues["itemID"]}`],
  ];
}

var tableDataCabinet = [];
const SINK_TABLE_ID = "sinkTable";
const CABINET_TABLE_ID = "cabinetTable";


function makeTable(tableName, tableData){
  var table = document.getElementById(tableName);
  table.innerHTML="";
  for (var i = 0; i < tableData.length; i++) {
    columnContent = {
      name: tableData[i][0],
      myValue: `${tableData[i][1]}`
    };
    
    var row = table.insertRow(i);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
  
    cell1.innerHTML = columnContent.name,
    cell2.innerHTML = columnContent.myValue;
  }
}

function updateTables(){
  var tableDataSink = getSinkTable();
  var tableDataCabinet = getCabinetTable();

  makeTable(SINK_TABLE_ID, tableDataSink);
  makeTable(CABINET_TABLE_ID, tableDataCabinet);
}

updateTables();


function copySinkToClipboard() {
  var myData = getSinkTable();

  const data = Array.from(myData).map(element => element[1]).join('\t');
  const blob = new Blob([data], {type: 'text/plain'});
  const clipboardItem = new ClipboardItem({'text/plain': blob});

  navigator.clipboard.write([clipboardItem]);
}

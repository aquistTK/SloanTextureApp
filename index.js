async function process() {
    let image = await IJS.Image.load(document.getElementById('color').src);

    var w = image.width;
    var l = image.height;

    var shortest = Math.min(w,l);
    var longest = Math.max(w,l);

    var isSquare = (l === w);

    var transformX = 0;
    var transformY = 0;

    var originalText = document.getElementById('originalImageLabel');
    var resultText = document.getElementById('resultImageLabel');

    if(!isSquare){
      if(longest == w){
        transformX = Math.floor((w * .5) - (shortest * .5));
      }else{
        transformY = Math.floor((l * .5) - (shortest * .5));
      }

      originalText.innerHTML = "&#9940; Not square";

      var result = image.crop({width:shortest, height:shortest, x:transformX, y:transformY});
      
      document.getElementById('result').src = result.toDataURL();

      resultText.innerHTML = "Use this cropped version:";
    }else{
      originalText.innerHTML = "&#9989; Image is square";
      resultText.innerHTML = "";
      document.getElementById('result').src = "";
    }



  }

window.myNameValues = {"category": "corian", "name": "", "size": "5", "roughness":"50"};

window.myNameValues["itemID"]="ITEM_ID";
window.myNameValues["fileID"]="FILE_ID";

function setProperty(item, propertyName){
  window.myNameValues[propertyName] = item.options[item.selectedIndex].value;
  updateName();
}

function setBasicProperty(item, propertyName){
  window.myNameValues[propertyName] = item.value;
  updateName();
}

function updateName(){
  if(window.myNameValues.name != "" && window.myNameValues.name != " "){
    const nameVal = window.myNameValues;
    var nameDisplay = document.getElementById('propertyString');
    nameDisplay.innerHTML = `${nameVal["category"]}_${nameVal["name"]}_${nameVal["size"]}_${nameVal["roughness"]}`;
  }
}


function copyNameStr() {
  var nameDisplay = document.getElementById('propertyString');
  navigator.clipboard.writeText(nameDisplay.innerHTML);
}

//   documentation: https://github.com/image-js/image-js#examples-in-the-browser

async function handleFiles(res){
    console.log(res);

    var preview = document.getElementById('color');
    var file = res[0];
    var reader  = new FileReader();

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
async function process() {
    let image = await IJS.Image.load(document.getElementById('color').src);

    let grey = image.crop({width:image.height, height:image.height});

    document.getElementById('result').src = grey.toDataURL();
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
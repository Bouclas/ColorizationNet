async function init(){
    
    const model = await tf.loadModel("./model/model.json",false);
    console.log('model loaded from storage');
	
	play(model);
	

}    

function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
}


function preprocess(img)
{
	console.log('Preprocessing image')
    
   let imgElement = document.getElementById("blah");
    //Grab the image
    let src = cv.imread(imgElement);
    
    // convert the color image into the Lab space
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
    
    // Resize it to 224 by 224
    let dsize = new cv.Size(224, 224);
    let src1 = new cv.Mat();

    // You can try more different parameters
    cv.resize(src, src1, dsize, 0, 0, cv.INTER_AREA);
    
    // Normalize image
    let kernel = new cv.Mat();
    src1.convertTo(kernel, cv.CV_32F, 1.0 / 255,0);

    let dst = new cv.Mat();
    cv.cvtColor(kernel, dst, cv.COLOR_RGB2Lab);
    
    // extract the Lightness channel
    let labPlanes = new cv.MatVector();
    // split the Mat
    cv.split(dst, labPlanes);

    // get L channel
    let L1 = labPlanes.get(0);
   
    const Temp = L1.data32F

    const Ready = [];
    var  cur = 0;
    
    // Loop to initilize 2D array elements. 
    for (var i = 0; i < 224; i++) { 
      Ready[i]=[]
        for (var j = 0; j < 224; j++) { 
          
            Ready[i][j]=parseInt(Temp[cur]);
            
            cur++;
        } 
    } 

    let tensor1 = tf.tensor2d(Ready)


    const batched = tensor1.expandDims(2);
    const batched1 = batched.expandDims(0);

    return batched1;

}

function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#blah')
                        .attr('src', e.target.result)
                        .width(224)
                        .height(224);
                };

                reader.readAsDataURL(input.files[0]);
				init();
            }
			
        }

function play(model){
	photo = document.getElementById('blah')
	
	var image = new Image();
		image.id = "pic"
		image.src =photo.src;
	
	predit(model, image);

}


function predit(model,image){


// predict move
var Luminance = preprocess(image);


var prediction = model.predict(Luminance);

var Red = (prediction[0].dataSync());
var Green = (prediction[1].dataSync());
var Blue = (prediction[2].dataSync());

var Reda = new Array;
var Greena = new Array;
var Bluea = new Array;

for (var i = 0; i < 50176; i+=1) {
    Reda.push( parseInt(((Red[i] +1)/2)*255));
   
    Greena.push( parseInt(((Green[i]+1 )/2)*255));

    Bluea.push( parseInt(((Blue[i] +1)/2)*255));

  }



// create an offscreen canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// get the imageData and pixel array from the canvas
var imgData = ctx.createImageData(224, 224);   /// create a canvas buffer (RGBA)

var data = imgData.data;

var cur =0;


for (var i = 0; i < imgData.data.length; i+=4) {
  
 imgData.data[i] = Reda[cur];
 imgData.data[i + 1] = Greena[cur];
 imgData.data[i + 2] = Bluea[cur];
 imgData.data[i + 3] = 255;
 cur++;
  
}

// put the modified pixels back on the canvas
ctx.putImageData(imgData, 0, 0);

}


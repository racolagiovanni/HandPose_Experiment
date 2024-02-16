//Handpose code by the ml5.js team.  Visit https://ml5js.org/
// Drawing code by Steve's Makerspace; Video: https://youtu.be/96sWFP9CCkQ
let handpose;
let video;
let predictions = [];
let canvas2;
let prevtop = null;
let prevleft = null;
let leftArr = [];
let topArr = [];
let leftAvg, topAvg;
let colr = 0;
let colb = 255;
let colg = 0;
let pointerX, pointerY, knuckle, ring;

console.log('ml5 version:', ml5.version);

function setup(){
	createCanvas(400, 400);
	background(150, 220, 200)
    canvas2 = createGraphics(width, height);
  makesquares();
  video = createCapture(VIDEO);
  video.size(width, height);
  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });
  // Hide the video element, and just show the canvas
    video.hide();
image(video, 0, 0, width, height);
  image(canvas2, 0, 0);
    // Hide the video element, and just show the canvas
    video.hide();	
   background(150, 220, 200);
    strokeWeight(0);
    translate(width, 0);
    scale(-1, 1);
  //  background(0);

 
}

function modelReady() {
  console.log("Model ready!");
}

function draw(){
   //
  const c = color(255, 240, 20);
  fill(c);
  ellipse(100, 50, 45);
  
  rectMode(CENTER);
  fill(250, 120, 200);
  square(250, 250, 200);
  rect(120, 250, 50, 200);
  rect(80, 250, 15, 200);
  
  quad(120, 130, 180, 130, 180, 70, 20, 70);
  triangle(360, 75, 358, 20, 286, 75);

  strokeWeight(5);
  noFill();
  square(-30, 250, 200);
  
  fill(255, 240, 20);
  strokeWeight(10);
  line(0, 0, 300, 360);
  line(10,420,900,100);
  line(250,0,500,600);

  ellipse(320, 300, 300, 250);
  strokeWeight(0);
  fill(250, 100, 100);
  ellipse(170, 290, 120, 50);
  ellipse(350, 320, 150, 100);
  ellipse(90, 200, 90, 40);
  ellipse(150, 120, 70, 35);

  ellipseMode(RADIUS);
  fill(255, 240, 20);
  ellipse(300, 100, 60, 30);
  ellipseMode(CENTER);
  fill(250, 100, 100);
  ellipse(250, 100, 60, 30);

  strokeWeight(10);
  fill(150, 220, 200);
  circle(350, 320, 50);
  strokeWeight(0);
  square(575, 20, 55);
  
  strokeWeight(15);
  point(150,50);
  point(100,50);
  
    // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints(20);
  fill(250,120,200);
  
  
}
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    canvas2.strokeWeight(10);
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      //   ellipse(keypoint[0], keypoint[1], 10, 10);
      if (j == 8) {
        pointerX = keypoint[0];
        pointerY = keypoint[1];
        //print(keypoint);
      } else
      if (j == 14) {
        knuckle = keypoint[1];
      } else
      if (j == 16) {
        ring = keypoint[1];
      }
    }
    //If the ring finger is not extended then draw a line or pick a color
    if (knuckle < ring) {
      fill(0);
      ellipse(pointerX, pointerY, 10, 10);
      if (pointerX < width - 70) {
        getaverages();

        canvas2.stroke(colr, colg, colb);
        if (leftArr.length > 2 && prevleft>0) {
          canvas2.line(prevleft, prevtop, leftAvg, topAvg);
          if (prevleft > 0) {
          prevleft = leftAvg;
          prevtop = topAvg;}
          else{
            prevleft = pointerX;
            prevtop = pointerY;
          }
        }
      } else {
        if (pointerY < 70) {
          colr = 255;
          colg = 240;
          colb = 20;
        }
        
        if (pointerY > 70 && pointerY < 140) {
          colr = 250;
          colg = 255;
          colb = 200;
        }
        if (pointerY > 140 && pointerY < 210) {
          colr = 0;
          colg = 0;
          colb = 255;
        }
        if (pointerY > 210 && pointerY < 280) {
          makesquares();
        }
      }
    } else {
      //If the hand is extended, then just mark where it is and clear the arrays
      fill(255);
      ellipse(pointerX, pointerY, 10, 10);
      leftArr.length = 0;
      topArr.length = 0;
      leftAvg = 0;
      topAvg = 0;
      prevleft = pointerX;
      prevtop = pointerY;
    }
  }
}

function getaverages() {
  if (leftArr.length > 5) {
    leftArr.splice(0, 1);
    topArr.splice(0, 1);
  }
  if (pointerX > 0 ) {
  leftArr.push(pointerX);
  topArr.push(pointerY);
  }
  let leftSum = 0;
  let topSum = 0;
  for (i = 0; i < leftArr.length; i++) {
    leftSum = leftSum + leftArr[i];
    topSum = topSum + topArr[i];
  }
  leftAvg = leftSum / leftArr.length;
  topAvg = topSum / topArr.length;
  
}

function makesquares() {
  canvas2.background(255);
  canvas2.clear();
  //background(255);
  //clear();
  canvas2.fill(255, 240, 20);
  canvas2.ellipse(width, 30, -70, 70);
  canvas2.fill(250, 120, 200);
  canvas2.ellipse(width, 100, -70, 70);
  canvas2.fill(250, 100, 100);
  canvas2.ellipse(width, 170, -70, 70);
  canvas2.fill(0, 0, 0);
  canvas2.rect(width, 210, -70, 70);
  canvas2.stroke(0, 0, 0);
  canvas2.strokeWeight(10);
  canvas2.line(width - 5, 215, width - 65, 275);
}
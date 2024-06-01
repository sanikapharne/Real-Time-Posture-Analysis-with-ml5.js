let capture;
let posenet;
let singlePose;
let skeleton;
let actor_img;

function setup(){
    createCanvas(800,500);
    capture=createCapture(VIDEO)
    capture.hide();
    posenet=ml5.poseNet(capture,modelLoaded);//object of model
    posenet.on('pose',receivedPoses);//event listener
    actor_img=loadImage('Images/shaharukh.jpg')
}
function receivedPoses(poses){
    console.log(poses);
    if(poses.length>0){
        singlePose=poses[0].pose;
        skeleton=poses[0].skeleton;
    } 
}
function modelLoaded(){//callback function
    console.log("Model has been loaded!")
}
function draw(){
    
    image(capture,0,0);
    fill(255,0,0);
    
    if(singlePose){
        for(let i=0;i<singlePose.keypoints.length;i++){
            ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y,20);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0;j<skeleton.length;j++){
            line(skeleton[j][0].position.x,skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y)
        }
        image(actor_img,singlePose.nose.x-80,singlePose.nose.y-80,230,230);
        
    }
}
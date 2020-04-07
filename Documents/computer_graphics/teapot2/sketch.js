var teapot;
var count;
var startZ;
var range;
var posOffset;
var spinSpeed;
var zOffset;
var helixScale;

var centerTeaY;
var centerTeaZ;
var centerTeaScale;

function preload(){
	teapot = loadModel('assets/teapot.obj');
}

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 255);

	count = 40;
	startZ = 200;
	zOffset = -200;
	range = 600;
	posOffset = 50;
	spinSpeed = 10;
	helixScale = 10;

	centerTeaY = 50;
	centerTeaZ = -4000;
	centerTeaScale = 20;
}

function draw(){
	background(0);
	lights();

	for(let swirls = 0; swirls < 2; ++swirls){//runs a loop twice for each set of teapots
		for(let i = 0; i < count; ++i){
			push();
				translate((swirls == 1 ? -1 : 1) *  cos(frameCount/spinSpeed + i*posOffset)*range, 
					  (swirls == 1 ? -1 : 1) * -sin(frameCount/spinSpeed + i*posOffset)*range,
					   i*zOffset + startZ);

				rotateX(radians(90));
				rotateZ(frameCount/spinSpeed);

				scale(helixScale);
				normalMaterial();
				fill((frameCount*5 + i*posOffset*10)%255, 255, 255);
				model(teapot);
			pop();
		}
	}

	push();//draws the teapot in the center of the helix
		translate(0, centerTeaY, centerTeaZ)

		rotateX(radians(90));
		rotateZ(frameCount/spinSpeed);

		scale(centerTeaScale);
		normalMaterial();
		fill(frameCount%255, 255, 255);
		model(teapot);
	pop();
}

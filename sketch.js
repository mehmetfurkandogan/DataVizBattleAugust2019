var table;
function preload(){
	table = loadTable('https://raw.githubusercontent.com/zonination/datasets/master/file.csv','csv','header');
}
function setup(){
	createCanvas(800,700);
}
function setupGraph(strx,stry,maxx,maxy){
	fill(200);
	// Origin
	noStroke();
	ellipse(100,500,10,10);
	translate(100,500);
	stroke(200);
	line(0,0,0,-400);	// y
	line(0,0,580,0);	// x
	//max heart rate 450 bpm
	//max longetivity 80 years
	// x arow
	line(580,0,580-15,-7);
	line(580,0,580-15,7);
	let txtsize = 15;
	textSize(txtsize);
	textAlign(CENTER,CENTER);
	push();
	noStroke();
	text(strx,600+40,0);
	pop();
	// y arrow
	line(0,-400,-7,-400+15);
	line(0,-400,7,-400+15);
	push();
	noStroke();
	text(stry,0,-400-15);
	pop();

	let maxpx = 560;
	for(let x=0;x<=maxx;x+=20){
		let px = map(x,0,maxx,0,maxpx);
		line(px,7,px,-7);
		push();
		noStroke();
		textSize(10);
		text(x,px,15);
		pop();
	}

	let maxpy = -360;
	for(let y=0;y<=maxy;y+=10){
		let py = map(y,0,maxy,0,maxpy);
		line(7,py,-7,py);
		push();
		noStroke();
		textSize(10);
		text(y,-15,py);
		pop();
	}
	let pmillis = 0;
	for(r=0;r<table.getRowCount();r++){
		let name = table.get(r,0);
		let hr = table.get(r,2);	//	bpm
		let l = table.get(r,3);		//	years
		let m = table.get(r,1);		//	grams
		let phr = map(hr,0,maxx,0,maxpx);
		let pl = map(l,0,maxy,0,maxpy);
		let d = sqrt(sqrt(m));
		noStroke();
		if(millis()%(60000/hr)<(60000/hr)){
			push();
			let alpha = map(millis()%(60000/hr),0,(60000/hr),200,40);
			fill(255,0,255,alpha);
			ellipse(phr,pl,d,d);
			pop();
		}
		pmillis = floor(millis());
		
		fill(255,0,255);
		ellipse(phr,pl,1,1);
		push();
		noStroke();
		fill(200,200);
		textSize(/*sqrt(d)*3*/10);
		text(name,phr,pl-5);
		pop();
	}

}
function draw(){
	background(51);
	setupGraph('Heart rate (bpm)','Longetivity (years)',450,80);
}
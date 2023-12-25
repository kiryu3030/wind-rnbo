let w = new WeatherData(['大溪永福','大溪','八德']);
let data = w.GetData();
const p5Container = document.querySelector('#p5-container');
let canvasW = window.innerWidth;
let canvasH = window.innerHeight;

function SoundBox(p1, p2, color){
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;
    this.strokeWeight = 15;
};
SoundBox.prototype.DrawBox = function(){
    push();
        // stroke(this.color,78,100);
        // strokeWeight(this.strokeWeight);
        // line(this.p1.x,this.p1.y,this.p2.x,this.p2.y);

        fill(this.color,78,100);
        rect(this.p1.x,this.p1.y,(this.p2.x-this.p1.x),this.strokeWeight,40);
    pop();
};
SoundBox.prototype.Trigger = function(p){
    let trigger = false;
    let px = p.x, py = p.y;
    let p3 = createVector(this.p1.x, this.p1.y), p4 = createVector(this.p2.x, this.p2.y)
    let temV = [this.p1, this.p2, p4.add(0,this.strokeWeight), p3.add(0,this.strokeWeight)];
    let j = temV.length-1;
    // console.log(temV);
    for(let i=0;i<temV.length;i++){
        let vi = temV[i],vj = temV[j];
        if (vi.y < py && vj.y >= py || vj.y < py && vi.y >= py) {
            if (vi.x + (py - vi.y) / (vj.y - vi.y) * (vj.x - vi.x) < px) {
                trigger = !trigger;
            }
        }
        j = i;
    }
    return trigger;
};

function Clamp(num, min, max){
    return Math.min(Math.max(num, min), max);
};

function Kite(p, vmax, a, m){
    this.p = p;
    this.pr = this.p.add(this.v);;
    this.v = createVector(0, 0);
    this.vmax = vmax;
    this.a = a;
    this.m = m;
    this.r = sqrt(this.m)*2;
    this.angle = 0;
    this.isLive = true;
    this.deadTime = 1;
    // this.tem = createVector(0, 0);
};
Kite.prototype.DrawKite = function(){
    
    // this.v.set(1, 0);
    // this.a.set(8, 0.5);
    this.angle = frameCount/10+this.a.x*2+ noise(frameCount/100)*PI*2;
    // this.v = p5.Vector.fromAngle(this.angle);
    // this.tem = createVector(cos(this.angle),sin(this.angle)).mult(this.a.y*0.05);

    // this.v.add(this.a);
    // if(this.v.x<this.vmax.x) this.v.x += this.a.x;
    // else this.v.x = this.vmax.x;
    // if(this.v.y<this.vmax.y) this.v.y += this.a.y;
    // else this.v.y = this.vmax.y;
    this.v.x += this.a.x;
    this.v.y += this.a.y;
    this.v.x = constrain(this.v.x, -abs(this.vmax.x), abs(this.vmax.x));
    this.v.y = constrain(this.v.y, -abs(this.vmax.y), abs(this.vmax.y));

    this.p.add(this.v);
    
    if (this.p.x<canvasW*0.1) {this.v.x = 0;this.vmax.x= abs(this.vmax.x);this.a.x= abs(this.a.x);}
    if (this.p.x>canvasW/2+10) {this.v.x = 0;this.vmax.x = -abs(this.vmax.x);this.a.x = -abs(this.a.x);}
    if (this.p.y<100) {this.v.y = 0;this.vmax.y= abs(this.vmax.y);this.a.y= abs(this.a.y);}
    if (this.p.y>canvasH*0.55) {this.v.y = 0;this.vmax.y = -abs(this.vmax.y);this.a.y = -abs(this.a.y);}
    
    push();
        stroke(1,0,100);
        strokeWeight(3);
        fill(1,0,100);
        translate(this.p.x, this.p.y);
        let tem = createVector(0,0);
        image(kiteImg, 0, 0);
    pop();
};
function Line(p, offset, c){
    this.p = p;
    this.offset = offset;
    this.c = c;
};
Line.prototype.DrawLine = function(){
push();
    // stroke(1,0,100);
    stroke(this.c);
    strokeWeight(3);
    // fill(1,0,100);
    fill(this.c);
    translate(this.p.x+100+this.offset.x, this.p.y+25+this.offset.y);
    rotate(PI / 6.5);
    // beginShape();
    // vertex(0, 0);
    // ellipse(0,0, 10);
    ellipse(5,0, 10);
    ellipse(10,0, 10);
    ellipse(15,0, 10);
    // let freq =  100;
    // let top1 = 200;
    let freq =  100;
    // 80
    // let top1 = 110;
    let top1 = 200;
    // 90
    // for(var x=15;x<150;x+=2){
    //     // let freq =  map(x, 0, 155, 90, 100);
    //     let y=sin(x/freq+frameCount/10)*height/top1
    //     ellipse(x,y, 10)
    //     freq -= 5;
    //     top1 -= 5;
    //     if(freq<=20) freq += 5;
    //     if(top1<=100) top1 += 5;
    //     // vertex(x, y)
    // }
    for(var x=15;x<130;x+=2){
        // let freq =  map(x, 0, 155, 90, 100);
        let y=sin(x/freq+frameCount/10)*height/top1;
        // rotate(10);
        ellipse(x,y, 10);
        freq -= 1;
        top1 -= 1;
        if(freq<=10) freq += 1;
        if(top1<=10) top1 += 1;
        // rotate(-10);
        // if(x<=20) freq = 100;
        // else freq = 20;
        // if(x<=20) top1 = 200;
        // else top1 = 50;
    }
    // for(var x=15;x<150;x+=2){
    //     // let freq =  map(x, 0, 155, 90, 100);
    //     let y=sin(x/freq+frameCount/10)*height/top1
    //     ellipse(x,y, 10)
    //     freq -= 2;
    //     top1 -= 2;
    //     if(freq<=20) freq += 2;
    //     if(top1<=100) top1 += 2;
    //     if(x<=20) freq = 100;
    //     // else freq = 20;
    //     if(x<=20) top1 = 200;
    //     // else top1 = 50;
    // }
    // for(var x=15;x<150;x+=2){
    //     let y=sin(x/freq+frameCount/10)*height/top1
    //     ellipse(x,y, 10)
    //     freq -= 5;
    //     top1 -= 5;
    //     if(freq<=20) freq += 5;
    //     if(top1<=100) top1 += 5;
    // }
    // vertex(100, 0);
    // endShape();
pop();
};

let soundBoxs = [];
let kites = [];
let lines = [];
let box1;
let kiteImg;

function GetRandomX(){
    // let temX=0;
    // if(random()>0.5) temX = random(-50, 20);
    // else temX = random(canvasW-20, canvasW+50);
    // return temX;
    return random(canvasW*0.2, canvasW/2);
}
function GetRandomY(){
    return random(canvasH/2, canvasH-300);
}

function setupSketch(){
    // 
    soundBoxs = [];
    kites = [];
    lines = [];
    let offset=0;
    for(let i=0;i<12;i++){
        soundBoxs.push(new SoundBox(createVector(canvasW/2-65,100+offset), createVector(canvasW/2+65,100+offset),random(0, 360)));
        offset += 40;
    }
    // soundBoxs[0].Trigger(createVector(1,0));
    for(let i=0;i<1;i++){
        kites.push(
            new Kite(createVector(GetRandomX(), canvasH/2-200),
                createVector(random(-1,1), random(-1,1)),
                createVector(random(-0.1,0.1), random(-0.1,0.1)),
                random(2, 6),
        ));
    }
    // for(let i=0;i<1;i++){
    //     lines.push(new Line(kites[0].p, createVector(0, 0)));
    // }
    lines.push(new Line(kites[0].p, createVector(0, 0), color(333, 53, 87)));
    lines.push(new Line(kites[0].p, createVector(90, 120), color(51, 64, 91)));
    lines.push(new Line(kites[0].p, createVector(0, 250), color(333, 53, 87)));
    console.log(soundBoxs);
    console.log(kites);
}

function preload(){
    kiteImg = loadImage('static/img/kite.png')
}

function setup() {
    let canvas;
    if(canvasW>canvasH){
      canvasH = canvasW;
    }
    canvas = createCanvas(canvasW, canvasH);
    canvas.parent(p5Container);
    canvas.id('p5-canvas');
    canvas.style('position', 'absolute');
    canvas.style('inset', 0);
    canvas.style('z-index', -1);
    colorMode(HSB,360,100,100);
    frameRate(30);
    // angleMode(DEGREES);

    setupSketch();
}

function updateUI(data){
    $('#wind-speed-text').text(`${data['WindSpeed'].toFixed(1)}m/s`);
    $('#humidity-text').text(`${Math.round(data['RelativeHumidity'])}%`);
}
function updateParam(data){
    windSpeedRnbo.val(data['WindSpeed'].toFixed(1));
    // windSpeedRnbo.val(8.5);
    windSpeedRnbo.get(0).dispatchEvent(event33);
    humidityRnbo.val(data['RelativeHumidity'].toFixed(1));
    humidityRnbo.get(0).dispatchEvent(event33);
    temperatureRnbo.val(data['AirTemperature'].toFixed(1));
    temperatureRnbo.get(0).dispatchEvent(event33);
}

let s = Date.now();
let sr = Date.now();
let diff = 0;
let diffRnbo = 0;
let waitData = true;
let humidityRnbo;
let temperatureRnbo;
let windSpeedRnbo;
let event33 = new Event('change');
function draw() {
    clear();
    // background(215,60,60);
    diff = Date.now() - s;
    if($('#layer-load').is(":hidden")){
        if(waitData && diff/1000>2){
            waitData = false;
            s = Date.now();
            data = w.GetData();
            console.log(data);
            updateUI(data);
            humidityRnbo = $('#humidity');
            temperatureRnbo = $('#temperature');
            windSpeedRnbo = $('#wind_speed');
            updateParam(data);
        }
        if(diff/1000>10){
            s = Date.now();
            data = w.GetData();
            console.log(data);
            updateUI(data);
            updateParam(data);
        }
    }
    for(let i=0;i<lines.length;i++){
        lines[i].DrawLine();
    }
    for(let i=0;i<kites.length;i++){
        kites[i].DrawKite();
    }
}

function windowResized() {
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    if(canvasW>canvasH){
        canvasH = canvasW;
    }
    resizeCanvas(canvasW, canvasH);
    setupSketch();
}
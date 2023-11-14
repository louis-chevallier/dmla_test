

function date() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    return dateTime
}    

function debug(...txt) {

    return;

    
    var thisline = new Error().lineNumber;
    stack = new Error().stack;
    stack = stack.split(/\r?\n/);
    var e0 = stack[1];
    var [fct, cc] = e0.split("@");
    var c1 = cc.split(":");
    var [ln, x] = c1.slice(-2);
    var fname = c1.slice(0, c1.length - 2).join("");
    
    tj = txt.join(" ");
    let t = document.getElementById("debug").innerHTML;
    t = t + "<br>" + date() + ":" + fname + ":" + ln + ":" + tj;
    t = t.slice(-500);
    //const result = t.split(/\r?\n/);
    //var f10 = result.slice(0, 10);
    //f10 = f10.join("\n")
    document.getElementById("debug").innerHTML  =  t;
}


function drawCircle(obj) {
    obj.ctx.beginPath();
    obj.ctx.arc(obj.x, obj.y, obj.radius, 0, 2 * Math.PI, false);
    if (obj.fill) {
	obj.ctx.fillStyle = obj.fill;
	obj.ctx.fill();
    }
    if (obj.stroke) {
	obj.ctx.lineWidth = obj.strokeWidth;
	obj.ctx.strokeStyle = obj.stroke;
	obj.ctx.stroke();
    }
}

function drawPolygon() {
    ctx.fillStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(100,50);
    ctx.lineTo(50, 100);
    ctx.lineTo(0, 90);
    ctx.closePath();
    ctx.fill();
}

var cvalue = 0;


function drawEllipse1(a, y, x) {
    debug("a", a);
    k = a / 10 + 1;
    debug("k", k);
    var radiusX = 300/10;
    var radiusY = Math.round(radiusX / k); 
    var rotation = 0;
    debug("rxy", radiusX, radiusY);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    document.getElementById("value").innerHTML  =  "<big>" + a + "</big>";
    cvalue = a;
}

function drawEllipse(a) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    S=70;
    for (x = 100; x < 600; x += S) { 
	for (y = 200; y < 600; y += S) { 
	    drawEllipse1(a, y, x);
	}
    }
}


const canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

const slider = document.getElementById('myRange');
slider.oninput = function() {
    drawEllipse(this.value/20);
}

function send() {
    debug(cvalue);
}

function onHeadingChange(event) {
    var orientation = event.beta;
    
    if (typeof orientation !== "undefined" && orientation !== null) { 
	positionCurrent = orientation;
	debug(orientation);
	drawCircle({
	    ctx: ctx,
	    x: 100,
	    y: 100,
	    radius: 20,
	    fill: "green",
	});	
    } 
    else {
	debug("No Orientation");
    }
}


//window.addEventListener("deviceorientation", onHeadingChange);



debug("ok");

function draw() {
    drawEllipse(2);
    /*
    drawCircle({
	ctx: ctx,
	x: 100,
	y: 100,
	radius: 20,
	fill: "green",
	});
    */
}


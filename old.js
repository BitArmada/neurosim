var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');

canv.width = window.innerWidth;
canv.height = window.innerHeight;

var num = 0;

var nuerons = {};

class Connection{
	constructor(n){
		this.nueron = n;
		this.weight = Math.random();
		this.speed = 0; // for later
	}
}

class Nueron{
	constructor(){
		this.id = num;
		this.connections = {};
		num++;
		this.charge = 0;
		this.ncharge = 0;
		this.activation = 0.2;
	}
	propogate(){
		if(this.charge > this.activation){
			for(const id in this.connections){
				var c = this.connections[id];
				c.nueron.ncharge += this.charge * c.weight;
			}
			this.charge *= 0.1;
		}else if(this.ncharge > 0){
			this.charge = this.ncharge;
			this.ncharge = 0;
		}else{
			this.charge *= 0.1;
		}
	}
	connect(n){
		this.connections[n.id] = new Connection(n);
	}
}

initNuerons();

setInterval(update, 1000/10);

nuerons['0'].charge = 1;

function update(){
	
	for(const id in nuerons){
		var n = nuerons[id];
		n.propogate();
	}
	
	drawNuerons();
}

function initNuerons(){
	
	for(var i = 0; i < 100; i++){
		var nueron = new Nueron();
		nuerons[nueron.id] = nueron;
	}

	// connect
	for(var i = 0; i < 300; i++){
		var n = nuerons[Math.trunc(Math.random()*num)];
		n.connect(nuerons[Math.trunc(Math.random()*num)])
	}
}

function drawNuerons(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canv.width, canv.height);
	for(const id in nuerons){
		var n = nuerons[id];

		const x = parseInt(id) % 10 * 50;
		const y = Math.trunc(parseInt(id) / 10) * 50;

		for(const cid in n.connections){
			const n2 = n.connections[cid].nueron;
			
			const x2 = parseInt(n2.id) % 10 * 50;
			const y2 = Math.trunc(parseInt(n2.id) / 10) * 50;
			// draw connections
			ctx.strokeStyle = 'rgba(255,0,0,'+n.charge+')';
			ctx.beginPath();
			ctx.moveTo(x+5, y+5);
			ctx.lineTo(x2+5, y2+5);
			ctx.stroke();
		}

		if(n.charge > n.activation){
			ctx.fillStyle = 'blue';
		}else{
			ctx.fillStyle = 'white';
		}
		ctx.fillRect(x, y, 10, 10);
	}
}
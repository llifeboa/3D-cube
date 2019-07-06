const canvas = document.getElementById('scene');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.offsetWidth; // Width of the scene
const height = canvas.offsetHeight; // Height of the scene
const size = Math.max(width, height); // go to square

const ctx = canvas.getContext('2d');

const centerX = width / 2;
const centerY = height / 2;
const STEP = 0.1;

class Dot{
	constructor(x, y, z, radius = 1){
		this.x = x;
		this.y = y;
		this.z = z;
		this.radius = radius;
		this.scale = 1000;
		
	}

	projection()
	{
		return [centerX + (this.x / (this.z + 5)) * this.scale,
				centerY + (this.y / (this.z + 5)) * this.scale];
	}
	
	render(){
		const newPos = this.projection();
		ctx.beginPath();
		let b = ((this.y + 1.0) / 2.0 * 255);
		b = Math.floor(b);
		ctx.arc(newPos[0], newPos[1], this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 0, ' + b + ', 1)';
		ctx.fill();
	}
}

function rotateY(point, theta)
{
	let x = point.x;
	let z = point.z;
	point.x = Math.cos(theta) * x - Math.sin(theta) * z;
	point.z = Math.sin(theta) * x + Math.cos(theta) * z;
}
function rotateX(point, theta)
{
	let y = point.y - 2;
	let z = point.z - 2;
	point.y = Math.cos(theta) * y - Math.sin(theta) * z + 2;
	point.z = Math.sin(theta) * y + Math.cos(theta) * z + 2;
}

let dots = [];

for(let x = -1; x <= 1; x += STEP){
	for(let y = -1; y <= 1; y += STEP){
		for(let z = -1; z <= 1; z += STEP){
			if((z.toFixed(4) == 1 || z == -1) || (y == -1 || y.toFixed(4) == 1) || (x.toFixed(4) == 1 || x == -1))
				dots.push(new Dot(x, y, z, 1));
			
		}
	}
}

let lastX = 0;
window.dtheta = 0;
canvas.addEventListener('mousemove', (event)=>{
	if (lastX - event.clientX > 0)
		window.dtheta = -0.02;
	else if (lastX - event.clientX < 0)
		window.dtheta = 0.02;
	else
		window.theta = 0
	lastX = event.clientX;

});

function main() {
	ctx.rect(0, 0, width, height);
	ctx.fillStyle ='black';
	ctx.fill();
	dots.forEach((dot)=>{
		rotateY(dot, window.dtheta);
		dot.render();

	});
	
  window.requestAnimationFrame(main);
}




main();
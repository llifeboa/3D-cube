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
		this.scale = 1500;
		this.b = Math.floor((this.y + 1.0) / 2.0 * 255);
		this.r = Math.floor(100 + ((this.x + 1.0) / 2.0 * 155));
		this.g = Math.floor((this.z + 1.0) / 2.0 * 100);
		
	}
	//Rotation

	rotateY(theta){
		const x = this.x;
		const z = this.z;
		this.x = Math.cos(theta) * x - Math.sin(theta) * z;
		this.z = Math.sin(theta) * x + Math.cos(theta) * z;
	}

	rotateX(theta)
	{
		const y = this.y;
		const z = this.z;
		this.y = Math.cos(theta) * y - Math.sin(theta) * z;
		this.z = Math.sin(theta) * y + Math.cos(theta) * z;
	}

	//END - Rotation

	projection()
	{
		return [centerX + (this.x / (this.z + 5)) * this.scale,
				centerY + (this.y / (this.z + 5)) * this.scale];
	}
	
	render(){
		let a = ((-this.z + 1) / 2).toFixed(1);
		const newPos = this.projection();
		ctx.beginPath();
		ctx.arc(newPos[0], newPos[1], this.radius * 8, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + a / 20 + ')';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(newPos[0], newPos[1], this.radius * 4, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + a / 10 + ')';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(newPos[0], newPos[1], this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + a + ')';
		ctx.fill();
	}
}



let dots = [];

for(let x = -1; x <= 1; x += STEP){
	for(let y = -1; y <= 1; y += STEP){
		for(let z = -1; z <= 1; z += STEP){
			if((z.toFixed(4) == 1 || z == -1) || (y == -1 || y.toFixed(4) == 1) || (x.toFixed(4) == 1 || x == -1))
			//if(z > 0 || x < 0 || y > 0)
			//if (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) < 1.1 && Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2) > 0.9)
				dots.push(new Dot(x, y, z, 2));
			
		}
	}
}

let lastX = 0;
let lastY = 0;

const dtheta = 0.001;
canvas.addEventListener('mousemove', (event)=>{
	const dx = lastX - event.clientX;
	const dy = lastY - event.clientY;
	let x_theta = - dy * dtheta;
	let y_theta = - dx * dtheta;
	if (x_theta != 0 || y_theta != 0)
		dots.forEach((dot)=>{
			if (x_theta != 0 )
				dot.rotateX(x_theta);
			if (y_theta != 0 )
				dot.rotateY(y_theta);
		})
	lastX = event.clientX;
	lastY = event.clientY;

});

(function main() {
	ctx.rect(0, 0, width, height);
	ctx.fillStyle ='#111';
	ctx.fill();
	dots.forEach((dot)=>{
		// rotateY(dot, window.dtheta);
		// rotateX(dot, -window.dtheta / 2);
		dot.render();

	});
	
  window.requestAnimationFrame(main);
})();
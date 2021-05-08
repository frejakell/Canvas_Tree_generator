const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const generator=document.getElementById('generator');
const random_generator=document.getElementById('My_random_generator');
const My_forest = document.getElementById('My_forest_generator')
const random_forest = document.getElementById('My_Random_forest_generator')

const gui = new dat.GUI()
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
function random_rgba() {
    var o = Math.round, r = Math.random, s = 220;
    return 'rgba(' + o(r()*s +10) + ',' + o(r()*s +10) + ',' + o(r()*s +10) + ',' + r().toFixed(1) + ')';
}

const TreeStructure = {
    length: 120,
    branchWidth: 1,
    angleOffset:2.5,
	leafSize: 10
	
}

const LeafColor = { r:50, g:50,  b:50, a:1  }
const TreeColor = {   r:0, g:0,  b:0, a:1  }
const TreeStructureFolder = gui.addFolder('TreeStructure')


TreeStructureFolder.add(TreeStructure,'length',0,150)
TreeStructureFolder.add(TreeStructure,'branchWidth',0.75,5)
TreeStructureFolder.add(TreeStructure,'angleOffset',-5,5)
TreeStructureFolder.add(TreeStructure,'leafSize',0,40)


const TreeColorFolder = gui.addFolder('TreeColor')
TreeColorFolder.add(TreeColor,'r',0,255)
TreeColorFolder.add(TreeColor,'g',0,255)
TreeColorFolder.add(TreeColor,'b',0,255)
TreeColorFolder.add(TreeColor,'a',0,1)

const LeafColorFolder = gui.addFolder('LeafColor')
LeafColorFolder.add(LeafColor,'r',0,255)
LeafColorFolder.add(LeafColor,'g',0,255)
LeafColorFolder.add(LeafColor,'b',0,255)
LeafColorFolder.add(LeafColor,'a',0,1)




function  drawTree(startX, startY, len, angle,angle_offset, branchWidth, Color1, Color2, leafSize){
	ctx.beginPath();
	ctx.save();
	var TreeColoring=Color1
	var LeafColoring=Color2
	ctx.strokeStyle=TreeColoring;
	ctx.fillStyle=LeafColoring;
	ctx.lineWidth=branchWidth;
	ctx.translate(startX,startY);
	ctx.rotate(angle*Math.PI/30);
	ctx.moveTo(0,0);
	ctx.lineTo(0,-len);
	//ctx.bezierCurveTo(1, -len/2,1,-len/2,0,-len);
	ctx.stroke();
	
	if(len < 5)
	{
		ctx.beginPath();
		ctx.arc(0,-len,Math.random()*leafSize,0,Math.PI/2);
		ctx.fill();
		ctx.restore();
		return;
		
	}
	randomL = Math.floor((Math.random() * ((2+ 1) - 1)) + 1);
	randomR = Math.floor((Math.random() * ((2+ 1) - 1)) + 1);
	
	drawTree(0,-len, len*Math.random()*0.95+0.1, angle+Math.random()*angle_offset,angle_offset ,branchWidth*0.85, Color1, Color2, leafSize);
	drawTree(0,-len, len*Math.random()*0.95+0.1, angle+Math.random()*angle_offset,angle_offset, branchWidth*0.85, Color1, Color2, leafSize);
	drawTree(0,-len, len*Math.random()*0.95+0.1, angle-Math.random()*angle_offset,angle_offset, branchWidth*0.85, Color1, Color2, leafSize);
	drawTree(0,-len, len*Math.random()*0.95+0.1, angle-Math.random()*angle_offset, angle_offset,branchWidth*0.85, Color1, Color2, leafSize);
	ctx.restore();
}

drawTree(canvas.width/2,canvas.height-100, 150, 0,2.5,Math.random()*5 , "rgba(0, 0, 0, 1)"," rgba(0, 0, 0, 1)", 10);


function generateMyTree(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	var tree_len = TreeStructure.length;
	var leaf_size = TreeStructure.leafSize;
	var branch_width = TreeStructure.branchWidth;
	var angle_offset = TreeStructure.angleOffset;
	var TreeColoring=`rgba(${TreeColor.r},${TreeColor.g},${TreeColor.b},${TreeColor.a})`
	var LeafColoring=`rgba(${LeafColor.r},${LeafColor.g},${LeafColor.b},${LeafColor.a})`

	var angle=0;
	drawTree(canvas.width/2,canvas.height-80, tree_len, angle, angle_offset,branch_width, TreeColoring, LeafColoring, leaf_size);

}

function generateMyForest(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	var tree_len = TreeStructure.length;
	var leaf_size = TreeStructure.leafSize;
	var branch_width = TreeStructure.branchWidth;
	var angle_offset = TreeStructure.angleOffset;
	var angle=0;
	var TreeColoring=`rgba(${TreeColor.r},${TreeColor.g},${TreeColor.b},${TreeColor.a})`
	var LeafColoring=`rgba(${LeafColor.r},${LeafColor.g},${LeafColor.b},${LeafColor.a})`

	var location = 0;
	var i;
	for (i = 0; i < 5; i++) {
		 location = location + 0.15 ;
		drawTree(canvas.width*location,canvas.height-80, tree_len, angle, angle_offset,branch_width, TreeColoring, LeafColoring, leaf_size);
	} 

}

function generateRandomForest(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	var angle=0;
	var location = 0;
	var i;
	for (i = 0; i < 5; i++) {
		 location = location + 0.15 ;
		 var tree_len = Math.random()*200;
		 var leaf_size = Math.random()*30;
		 var branch_width = Math.random()*5;
		 var angle_offset = Math.random()*10-5;
		drawTree(canvas.width*location,canvas.height-80, tree_len, angle, angle_offset,branch_width, random_rgba(),random_rgba(), leaf_size);
	} 

	

}


function generateRandomTree(){
	ctx.clearRect(0,0,canvas.width, canvas.height);
	var tree_len = Math.random()*200;
	var leaf_size = Math.random()*30;
	var branch_width = Math.random()*5;
	var angle_offset = Math.random()*10-5;
	var angle=0;
	drawTree(canvas.width/2,canvas.height-80, tree_len, angle, angle_offset,branch_width, random_rgba(),random_rgba(), leaf_size);
}

window.addEventListener('resize',  function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	
});

generator.addEventListener('click', generateMyTree);
random_generator.addEventListener('click', generateRandomTree);
random_forest.addEventListener('click', generateRandomForest )
My_forest.addEventListener('click', generateMyForest);
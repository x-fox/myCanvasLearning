
var ctxDrawFlag = false; //v1-绘制起始标识  v2-mousedown起始,mouseup结束
var drawNum = 1;

function drawLineBegin(){
	// myCanvasDraw.addEventListener("mousedown",dodrawLine,false);
	dodrawLine();
	document.getElementById("drawLBBtn").style.display = "none";
	document.getElementById("drawLEBtn").style.display = "block";
}

function drawLineEnd(){
	// myCanvasDraw.removeEventListener("mousedown",dodrawLine,false);
	document.getElementById("drawLBBtn").style.display = "block";
	document.getElementById("drawLEBtn").style.display = "none";
}

// 方法一 兼容Firefox,chrome,IE浏览器
/*function dodrawLine(e){
	var startX = e.pageX;
	console.log("相对文档x坐标"+startX);
	// console.log(e.offsetX);
	var startY = e.pageY;
	console.log("相对文档y坐标"+startY);
	// console.log(e.offsetY);
	startX = getPointOnCanvas(myCanvas,startX,startY).x;
	console.log("相对画布x坐标"+startX);
	startY = getPointOnCanvas(myCanvas,startX,startY).y;
	console.log("相对画布y坐标"+startY);
}

//返回鼠标相对画布对象的x,y坐标值
function getPointOnCanvas(canvas, x, y) {
    var bbox =canvas.getBoundingClientRect();
    // var yy = window.pageYOffset;
    return { x: x - (bbox.left+window.pageXOffset)*(canvas.width / bbox.width),     //window.pageXOffset表示滚动条向右滚动的像素
             y: y - (bbox.top+window.pageYOffset)*(canvas.height / bbox.height)     //window.pageYOffset表示滚动条向下滚动的像素
            };

}*/

// 方法二 兼容IE,chrome,opera浏览器,Firefox不支持(新版本已支持)

function dodrawLine(){
	var myCanvasDraw = document.createElement("canvas");
	myCanvasDraw.setAttribute("id","myCanvasDraw"+drawNum);
	myCanvasDraw.style.ZIndex = 99;
	// canvas本身拥有width、height属性，与通过style设置的width、height属性不同，若使用style设置width、height则宽高会被拉伸！
	myCanvasDraw.width = 400;  
	myCanvasDraw.height = 300;  
	// myCanvasDraw.style.border = "1px solid blue";
	var ctxDraw = myCanvasDraw.getContext("2d");
	ctxDraw.strokeStyle = "#f00";
	ctxDraw.lineWidth = 3;

	ctxDraw.moveTo(0,0);
	ctxDraw.lineTo(200,200);
	ctxDraw.stroke();

	var oX,oY,eX,eY;
	document.body.appendChild(myCanvasDraw);  //每新增一条画线 新增一个画布
	// document.getElementById("canvasWrap").appendChild(myCanvasDraw);  //每新增一条画线 新增一个画布
	myCanvasDraw.onmousedown = function(e){
		if (!ctxDrawFlag) {
			oX = e.offsetX; //起始点坐标
			oY = e.offsetY;
		}else{
			eX = e.offsetX;  //结束点坐标
			eY = e.offsetY;
			drawNum = drawNum + 1;
		}
		ctxDrawFlag = !ctxDrawFlag;
	}
	

	myCanvasDraw.onmousemove = function(e){ // 跟随鼠标移动画直线
		var ctxDraw = myCanvasDraw.getContext("2d");
		ctxDraw.strokeStyle = "#f00";
		ctxDraw.lineWidth = 3;
		if (ctxDrawFlag) {
			ctxDraw.beginPath();
			ctxDraw.clearRect(0,0,400,300);  // 每次移动清除画线，只画一次
			ctxDraw.moveTo(oX,oY);
			ctxDraw.lineTo(e.offsetX,e.offsetY);
			ctxDraw.closePath();
			ctxDraw.stroke();
		}
	}
}


/*event.screenX、event.screenY
鼠标相对于用户显示器屏幕左上角的X,Y坐标。标准事件和IE事件都定义了这2个属性

event.clientX、event.clientY
鼠标相对于浏览器可视区域的X,Y坐标（将参照点改成了浏览器内容区域的左上角），可视区域不包括工具栏和滚动条。IE事件和标准事件都定义了这2个属性

event.pageX、event.pageY
类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。这2个属性不是标准属性，但得到了广泛支持。IE事件中没有这2个属性。

event.offsetX、event.offsetY
这两个属性是IE特有的(实测chrome也支持)，鼠标相对于“触发事件的元素”的位置（鼠标想对于事件源元素的X,Y坐标）。

window.pageXOffset
整数只读属性，表示X轴滚动条向右滚动过的像素数（表示文档向右滚动过的像素数）。IE不支持该属性，使用body元素的scrollLeft属性替代。

window.pageYoffset
整数只读属性，表示Y轴滚动条向下滚动过的像素数（表示文档向下滚动过的像素数）。IE不支持该属性，使用body元素的scrollTop属性替代。*/
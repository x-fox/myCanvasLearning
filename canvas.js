
var ctxDrawFlag = false; //v1-绘制起始标识  v2-mousedown起始,mouseup结束
var drawNum = 1;
window.addEventListener("load",function(){
			// alert("页面加载完成！");
			var myVideo = document.getElementById("myVideo");
			var myCanvas = document.getElementById("myCanvas");
			var ctx = myCanvas.getContext("2d");

			// 取消timeupdate事件调用,直接通过timer定时刷新绘制图像,定时参数小于视频帧率,视频渲染流畅
			setInterval(function(){
				ctx.drawImage(myVideo,0,0,400,300);
			},20);


			for(var i = 1; i <= 4; i++){
				document.getElementById("drawLBBtn_"+i).disabled = true;
			}
		},true);

function enableLine(num){
	var flag = document.getElementById("checkLine"+num).checked;
	// alert(flag);
	if (flag) {
		document.getElementById("drawLBBtn_"+num).disabled = false;
	}else {
		document.getElementById("drawLBBtn_"+num).disabled = true;
	}
}

function drawLineBegin(num){
	// myCanvasDraw.addEventListener("mousedown",dodrawLine,false);
	dodrawLine(num);
	document.getElementById("drawLBBtn_"+num).style.display = "none";
	document.getElementById("checkLine"+num).disabled = true;
	document.getElementById("drawLEBtn_"+num).style.display = "block";
}

function drawLineEnd(num){
	// myCanvasDraw.removeEventListener("mousedown",dodrawLine,false);
	var myCanvasDraw = document.getElementById("myCanvasDraw_"+num);
	myCanvasDraw.onmousedown = null;
	document.getElementById("checkLine"+num).disabled = false;
	document.getElementById("drawLBBtn_"+num).style.display = "block";
	document.getElementById("drawLEBtn_"+num).style.display = "none";
}


function dodrawLine(num){
	// canvas本身拥有width、height属性，与通过style设置的width、height属性不同，若使用style设置width、height则宽高会被拉伸！
	
	var myCanvasDraw = document.getElementById("myCanvasDraw_"+num);
	for(var i = 1; i < 4; i++){
		document.getElementById("myCanvasDraw_"+i).style.zIndex = 0;
	}
	myCanvasDraw.style.zIndex = 99;

	var oX,oY,eX,eY;
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
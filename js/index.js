window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');

	var bird={x:140,y:100,w:40,h:40};
	var guandao=[
			{x:300,y:0,w:80,h:200,},
			{x:300,y:350,w:80,h:400,},
			{x:550,y:0,w:80,h:250,},
			{x:550,y:400,w:80,h:400,}
	];
	var a=1;
	var draw=function(){
		ctx.clearRect(0,0,320,528);
		//画小鸟
		a+=0.03;
		bird.y+=a*a;
		var img=new Image();
		img.src='./image/bird.png';
		img.onload=function(){
			ctx.drawImage(img,bird.x,bird.y);
		}
		//画管道
		var vs;
		for(var i=0;i<guandao.length;i++){
			var d=guandao[i];
			d.x-=3;
			var m;
			if(d.x<=-d.w){
				d.x=420;
				if(d.y==0){
					d.h=Math.random()*100+150;
					m=d.h;
				}
				else{
					d.y=m+150;
					d.h=528-m-150;
				}
			}
			//存放管道图片
			var img1=new Image();
			if(d.y==0){
				img1.src='./image/guandao1.png';
			}
			else{
				img1.src='./image/guandao2.png';	
			}
			img1.onload=function(){
				ctx.drawImage(img1,d.x,d.y,d.w,d.h);
			}
			ctx.drawImage(img1,d.x,d.y,d.w,d.h);
		
			//通过柱子判断
			if(recvsrec(bird,d)){
				vs = true;
			}
		}
		if(vs==true){
			over.style.display="block";
			again.style.display="block";
			return;
		}
		//边界判断
		if(bird.y>=528-40){
			ctx.fillRect(140,528,bird.w,bird.h); 
		}
		else if(bird.y<=0){
			ctx.fillRect(140,0,bird.w,bird.h);
		}
		else{
			window.requestAnimationFrame(draw);
		}
		ctx.drawImage(img,bird.x,bird.y);
	}
	canvas.onclick=function(){
		bird.y-=50;
		a=1;
	}
	var start=document.querySelector('#start');
	start.onclick=function(){
		start.style.display="none";
		requestAnimationFrame(draw);
	}
	var over=document.querySelector('#over');
	var again=document.querySelector('#again');
	again.onclick=function(){
		location.reload();
	}
	// 检测矩形之间的碰撞
	var recvsrec =  function(rect0,rect1){
	    if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
	      return false;
	    } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
	      return false;
	    } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
	      return false;
	    } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
	      return false;
	    }
	    return true;
	};
}
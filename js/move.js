//运动函数的封装
function move(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for(var attr in json) {
			var current = 0;
			//获取当前样式的值
			if(attr == 'opacity') {
				current = Math.round(parseInt(getStyle(obj, attr) * 100));
			} else {
				current = parseInt(getStyle(obj, attr));
			}
			
			//获取步数
			var step = (json[attr]-current)/10;
			//进行取整
			step = step > 0?Math.ceil(step):Math.floor(step);
			if(attr == 'opacity'){
				if('opacity' in obj.style ){
					obj.style.opacity = (current+step)/100;
				}else{
					obj.style.filter = 'alpha(opacity='+(current+step)+')';
				}
			}else if(attr == 'zIndex'){
				obj.style.zIndex = json[attr];
			}else{
				obj.style[attr] = (current +step)+'px';
			}
            //必须所有的属性值都完成了，才可以停止运动
			if(current != json[attr]) {
				flag = false;
			}
		}
        //停止运动，并执行最后的方法
		if(flag) {
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}, 30);
}

function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return window.getComputedStyle(obj, null)[attr];
	}
}
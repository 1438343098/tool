var Validation = function(form,el,reg,msgOk){
	this.form = form;  //form数据
	this.el = el;   //点击节点
	this.reg = reg;  //正则数组
	this.msgOk = msgOk;  //是否用默认弹出方式
}

//数据处理
Validation.prototype.outData = function (){
//		获取form数据
		var form = $(this.form).serializeArray()
//		格式化数据
		var formateData = formate(form,this.reg,this)
//		验证数据
		return regExpData(formateData)
}

//click事件
Validation.prototype.click = function(callback){
	$(this.el).on("click",function(){ 
//		报错显示 如果有报错显示
		if(that.msgOk){
			errMsg(that.outData())
		}
		callback(that.outData())
	})
}
//change 事件
Validation.prototype.change = function(callback,type){
	var that = this
	$("input").on("keyup",function(ev){
		var ev=ev||window.event
		var elAttr = $(ev.target).attr("name")
		if(type){
			callback(that.outData())
		}else{
			that.outData().forEach(function(item){
				if(!item.result && item.name == elAttr){
					callback(that.outData())
					throw new Error(item.msg)
				}
			})
		}
		
	})
}
//input 失去焦点事件
Validation.prototype.blur = function(callback){
	var that = this
	$("input").on("blur",function(ev){
		var ev=ev||window.event
		var elAttr = $(ev.target).attr("name")
		that.outData().forEach(function(item){
			if(!item.result && item.name == elAttr){
				callback(item)
				throw new Error(item.msg)
			}
		})
		
		
	})
}


//报错显示
function errMsg(data){
	data.forEach(function(item){
		if(!item.result){
			$(top.document.body).append(createMsg(item.msg))
			$(".msgbox-validation").stop().fadeIn(1200,function(){
				$(".msgbox-validation").stop().fadeOut(2000,function(){
					$(".msgbox-validation").remove()
				})
			})
			throw new Error(item.msg)
		}
	})

}

//创建报错提示
function createMsg(text){
	return "<style type='text/css'>"+
"		.msgbox-validation{"+
"			display: none;"+
"			width: 300px;"+
"			height: 40px;"+
"			color: #fff;"+
"			background: rgba(255,64,113,0.5);"+
"			text-align: center;"+
"			line-height: 40px;"+
"			position: fixed;"+
"			z-index: 9999;"+
"			top: 40px;"+
"			left: 50%;"+
"			transform: translateX(-50%);"+
"			pointer-events: none;"+
"			border: 1px solid #ff1818;"+
"			border-radius: 5px;"+
"		}"+
"	</style>"+
"	<div class='msgbox-validation'>"+text+"</div>"
}


//验证格式化后的数据
function regExpData(data){
	var resultData = []
	for(var key in data){
		var reg;
		if(data[key]["1"].type == 'len'){
			reg = eval("/^[\\s\\S]{"+data[key]["1"].reg +"}$/img")
		}else if(data[key]["1"].type == 'reg'){
			reg = eval(data[key]["1"].reg)
		}else{
			reg = new RegExp(data[key]["1"].reg,"img")
		}
		resultData.push({name:data[key]["0"].name,result:reg.test(data[key]["0"].value),value:data[key]["0"].value,reg:reg,msg:data[key]["1"].msg})
	}
	return resultData
}


//处理传入的数据 格式化
function formate(arr,arr2,that){
	var outObj = {}
	arr.forEach(function(item){
		arr2.forEach(function(items){
			if(items.name == item.name ){
				if(items.type == 'val'){
					items['reg'] = $("[name="+items.typeName+"]").val()
					outObj[item.name] =  [item,items]
				}else{
					outObj[item.name] = [item,items]
				}
			}
		
		})
	})
	return outObj
}

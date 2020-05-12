###基于jq的表单验证插件

```javascript
//		验证规则对象
//		格式 {
//			name:input的name值,
// 			type：(len长度 ， reg正则表达式 ， val某个输入框的值[需配合 typeName使用]),
//	  		reg：规则，typeName:type为val时设置 值为对应的name,
//			msg：放回的错误信息
//		}
		var reg = [{
			name:"name",
			type:"len",
			reg:"0,9",
			msg:"最多9个字母"
		}];
		
//		传入的参数  
//		1 form节点   id class 标签都可以
//		2 点击触发节点  
//		3 验证规则  
//		4 是否显示错误信息  true/false  默认false
		var Valid = new Validation(".forms","#sub",reg,true)
			
//		方法 第一个为回调函数 第二个为配置  
//		返回数据格式  [{name: 验证的名字, result: 对应验证的结果, value: 验证的值, reg: 所生成的正则, msg: 错误提示返回}]

//		方法click 点击时进行验证  返回所有 错误对象
		valid.click(function (data){
			console.log(data,"方法click") 
		})
		
//		方法change 键盘抬起时验证 不会弹出错误信息  传入 true时 以数组的形式返回所有的验证结果   否则返回当前输入框验证对象 默认false
		valid.change(function (data){
			console.log(data,"方法change")
		},false)
		
//		方法blur 失去焦点时验证 不会弹出错误信息   返回错误信息
		valid.blur(function (data){
			console.log(data,"方法blur")
		})

```
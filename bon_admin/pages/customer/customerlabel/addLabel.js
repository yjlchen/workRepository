var customerId=getUrlParam("customerId");
$(function(){
	
	initEvent();
	

	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/customerlabel/queryLabels.action',
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(result){
			 if(result){
				 var data=result.data;
				 for(var i=0;i<data.length;i++){
  	            	 var gindex=data[i];
  	            	 var id=gindex.id;
  	            	 var name=gindex.name;
  	            	 $("#label_id").append("<option value='"+id+"'>"+name+"</option>"); 
  	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#label_id").chosen();
	        	fillValue();
			 }
		}
	});

})
/**
 * 初始事件
 */
function initEvent(){
	//添加标签确定按钮
	$('#submitBtn').click(function(){
		subForm();
	});
	
	//添加标签取消按钮
	$('#closeBtn').click(function(){
		parent.layer.closeAll();
	});
}
/**
 * 初始数据
 */
function initdata(){
	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/customerlabel/queryLabels.action',
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(result){
			 if(result){
				 var data=result.data;
				 for(var i=0;i<data.length;i++){
  	            	 var gindex=data[i];
  	            	 var id=gindex.id;
  	            	 var name=gindex.name;
  	            	 $("#label_id").append("<option value='"+id+"'>"+name+"</option>"); 
  	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#label_id").chosen();
	        	fillValue();
			 }
		}
	});
};
//填充下拉值
function fillValue(){
	//填充值
	$.ajax({
		url : getRootPath()+ '/customerlabel/queryCustomerLabel.action',
		type : 'POST',
		dataType : 'json',
		data:{
			"customerId":customerId
		},
		success : function(result){
			 if(result){
				 var data=result.data; 
				 if(!isNotEmpty(data) || data.length==0){return;}
				 //var groupArr=[];
				 $.each(data,function(i,n){
					 //groupArr.push(n.group_id);
					 $("#label_id" + " option[value='" + n.label_id + "']").attr('selected', 'selected');
				 });
				 //这样可以解决同一select不断动态加载的问题。
				 $("#label_id").trigger("liszt:updated");
				 //重新调用chosen插件方法
				 $("#label_id").chosen();
			 }
		}
	});
}

//进行提交操作
function subForm(){
	if(!valid()){return false;}
	disable_submit(true,'commit');
	 // 标签集合
  var jsonlabels='[';
	    var c_label=$("#label_id").val();
	    if(c_label!=null&&c_label.length>0){
	    	
	        for(var index in c_label){  
	        	var label_id=c_label[index];  
	        	 var tbody='{';
	    			tbody+='"id":"'+uuid();                      //主键
	    			tbody+='","customer_id":"'+customerId;    
	    			tbody+='","label_id":"'+label_id;  
	    			tbody+='","label_name":"'+$("#label_id option[value=" + label_id + "]").text();  
	    			tbody+='"}'; 
	    			if(jsonlabels.length>2){
	    				jsonlabels+=','+tbody;
	    			}else{
	    				jsonlabels+=tbody;
	    			}
	        }  
	    }
	jsonlabels+=']';
	$.ajax({
		url : getRootPath()+ '/customerlabel/updateCustomerLabel.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {
			"infoJsonStr":jsonlabels,
			"customerId":customerId
		},
		success : function(result){
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						//只刷新第一个tab页下的列表
						var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
						console.log(parent.document.getElementById(data_pjax));
						parent.document.getElementById(data_pjax).contentWindow.searchPage();
						parent.layer.closeAll();
				});
			}else{
				parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
				});
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
			});
			disable_submit(false,'commit');
		}
	});
}	
function valid(){
	//验证标签
	var label=$("#label_id").val();
	if(!label || label==null || label=="" || label.length==0){
			alert_mess('请选择客户标签');
			return false;
	}else if(label.length>20){
		alert_mess('标签最多只能选择20个');
		return false;
	} 
	 return true;
}

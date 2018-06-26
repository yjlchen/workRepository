var functionId = getUrlParam('functionId');
$(function(){
	//添加标签确定按钮
	$('#submitBtn').click(function(){
		subForm();
	});
	//添加标签取消按钮
	$('#closeBtn').click(function(){
		parent.layer.closeAll();
	});
	
	initData();
	//填充值
	$.ajax({
		url : getRootPath()+ '/fullReduce/queryFullReduceLabel.action',
		type : 'POST',
		dataType : 'json',
		data:{
			"functionId":functionId
		},
		success : function(result){ 
			var list=result.labelList;
			
		/**功能标签select回显**/
		 $.each(list,function(i,n){
			 $("#label_id option[value='"+n.label_id+"']").attr("selected", "selected");
		 })
		 console.log("初始化dwdwdwdw");
		 //这样可以解决同一select不断动态加载的问题。
		 $("#label_id").trigger("liszt:updated");
		 //重新调用chosen插件方法
		 $("#label_id").chosen();
		}
	});
});


layui.use(['form','layer','laydate'],function(){
	var form = layui.form();
	var layer = layui.layer;
});

//数据初始化
function initData(){ 
	
	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/commodity/queryCommodityLabelList.action',
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
    			tbody+='"id":"'+"";                      //主键
    			tbody+='","full_reduce_id":"'+functionId;    
    			tbody+='","label_id":"'+label_id;  
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
		url : getRootPath()+ '/fullReduce/updatefullReduceLabel.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {
			"labelJsonStr":jsonlabels,
			"functionId":functionId
		},
		success : function(result){
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						disable_submit(false,'commit');
						location.reload();
						parent.layer.closeAll();
				});
			}else{
				parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
				});
				disable_submit(false,'commit');
				location.reload();
				parent.layer.closeAll();
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
			});
			disable_submit(false,'commit');
			location.reload();
			parent.layer.closeAll();
		}
	});
}
function valid(){
	//验证标签
	var label=$("#label_id").val();
	if(!label || label==null || label=="" || label.length==0){
			alert_mess('请选择商品标签');
			return false;
	} 
	 return true;
}
/**
 * 取消自定义下拉框的值
 * @param id  下拉框的id
 */
function noSelectAll(id)
{
	var c_label=$("#"+id).val();
    if(c_label!=null&&c_label.length>0){
        for(var index in c_label){ 
        	var label_id=c_label[index];   
        	 $("#" +id+ " option[value='" + label_id + "']").attr('selected', false);
        }  
    }
    $("#"+id+"_chzn .chzn-choices .search-field").siblings().remove();
}
$(function(){
	lodingorderset();
	
	layui.use('form', function(){
		var form = layui.form();
		form.verify({  
			auto_cancel_min: function(value){ 
				value=toTrim(value);
				if(isNaN(value)){
					return("必须是是数字");
					}
	          if(value <20 || value>1440){  
	            return '订单取消时间必须在20-1440分钟之间。';  
	          }  
	        }, auto_sure_day: function(value){ 
	        	value=toTrim(value);
	        	if(isNaN(value)){
					return("必须是是数字");
					}
	          if(value <7 ||value > 30){  
	            return '自动确认收货时间必须在7-30天之间';  
	          }  
	        },
	        auto_remind_pay: function(value){ 
				value=toTrim(value);
				var auto_cancel_min=$("#auto_cancel_min").val();
			
				if(value==""||null==value){
					return("请输入提醒时间");
				}
				if(isNaN(value)){
					return("必须是是数字");
					}
				if(parseInt(value)>parseInt(auto_cancel_min)){
					return("提醒时间应设置为小于订单取消时间");
				}
	        },	        
	        auto_sure_adress: function(value){ 
				value=toTrim(value);
				if(value==""||null==value){
					return("请输入退货地址");
				}
					
	        },	        
	        
		});
		//监听提交
		form.on('submit(formdm)', function(data){
			var ordersetinfo = $('#orderSetForm').serializeObject();
			var updateStr=JSON.stringify(ordersetinfo);//将表单中的数据转成json
			$.ajax({
				url: getRootPath()+ '/orderset/updateOrderSet.action',
				type : 'POST',
				dataType :'TEXT',
				async:false,
				data : {updateJsonStr:updateStr},
				success:function(result){
					if("success"==result){
						parent.layer.msg('修改成功', {
							  icon: 1,
							  time: 800 //（如果不配置，默认是3秒）
						});
						var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
						parent.document.getElementById(data_pjax).contentWindow.lodingtable();
					}else{
						parent.layer.msg('修改失败，请稍后重试', {
							  icon: 1,
							  time: 1000 //（如果不配置，默认是3秒）
						});
					}
				},
				error:function(){
					parent.layer.msg('修改失败，请稍后重试', {
						  icon: 1,
						  time: 1000 //（如果不配置，默认是3秒）
					});
				}
			});
		});
	});
});
function lodingorderset(){
	$.ajax({
		type:"post",
		url:getRootPath()+"/orderset/queryOrderSet.action",
		success:function(data){
			$("#auto_cancel_min").val(data.auto_cancel_min);
			$("#auto_sure_day").val(data.auto_sure_day);
			$("#auto_unpaid_remain").val(data.auto_unpaid_remain);
			$("#refund_address").val(data.refund_address);
			
		}
	});
}

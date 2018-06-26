var ordernum=getUrlParam("order_num");

$(function(){
	$.ajax({
		url : getRootPath()+ '/order/queryRemark.action',
		type : 'POST',
		dataType : 'json',
		data : {order_num:ordernum},
		success : function(result){
			if(result!=null){
				$("#textarea1").val(result.remark);
			}
		}
	});
	
	layui.use('form', function(){
		var form = layui.form();
		form.verify({  
			remark: function(value){  
				value=toTrim(value);
				if(value.length==0){
					return '不能为空';
				}else if(value.length > 1000){  
	            return '备注不能超过1000个字';  
	          }  
	        }
	  });
	//监听提交
		form.on('submit(submitform)', function(data){
			disable_submit(true,'commit');
			var RemarkInfo = $('#addRemarkForm').serializeObject();
			var addJsonStr=JSON.stringify(RemarkInfo);//将表单中的数据转成json
			$.ajax({
				url : getRootPath()+ '/order/addRemark.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {queryJsonStr:addJsonStr,order_num:ordernum},
				success : function(result){
					
					if("success"==result){
						layer.msg('添加成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								
								parent.layer.closeAll();
								
							});
					}
					else{
						layer.msg('添加失败，请重试', {
							  icon: 1,
							  time: 1000 //（如果不配置，默认是3秒）
							});
						disable_submit(false,'commit');
					}
				},
				error:function(){
					layer.msg('添加失败，请重试', {
						  icon: 1,
						  time: 1000 //（如果不配置，默认是3秒）
						});
					disable_submit(false,'commit');
				}
			});
			
		});
	});
})

	

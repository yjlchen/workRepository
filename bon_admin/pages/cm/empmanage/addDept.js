$(function(){
	layui.use('form', function(){
		var form = layui.form();
		form.verify({  
			team_name: function(value){  
				value=toTrim(value);
				if(value.length==0){
					return '不能为空';
				}else if(value.length > 9){  
					return '部门名称不能超过9个字';  
		        }  
	        }
		})
	//监听提交
		form.on('submit(formdm)', function(data){
			disable_submit(true,'commit');
			var empInfo = $('#addDeptForm').serializeObject();
			var addJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
			$.ajax({
				url : getRootPath()+ '/empmanage/addDept.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {signupForm:addJsonStr},
				success : function(result){
					
					if("success"==result){
						parent.layer.msg('添加成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								disable_submit(false,'commit');
								var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
								parent.document.getElementById(data_pjax).contentWindow.lodingtable();
								parent.layer.closeAll();
								
							});
					}
					else{
						parent.layer.msg('添加失败，请重试', {
							  icon: 1,
							  time: 1000 //（如果不配置，默认是3秒）
							});
						disable_submit(false,'commit');
					}
				},
				error:function(){
					parent.layer.msg('添加失败，请重试', {
						  icon: 1,
						  time: 1000 //（如果不配置，默认是3秒）
						});
					disable_submit(false,'commit');
				}
			});
			return false; 
			
			
		});
	});
})

	

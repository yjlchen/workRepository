var empid=getUrlParam("id");

$(function(){
	initdata();
	layui.use('form', function(){
		var form = layui.form();
		form.verify({  
			emp_name: function(value){  
				value=toTrim(value);
				if(value.length==0){
					return '不能为空';
				}else if(value.length > 5){  
	            return '名字不能超过五个字';  
	          }  
	        }, login_user: function(value){  
	        	value=toTrim(value);
	        	if(value.length==0){
					return '不能为空';
				}else if(value.length > 20){  
	            return '用户名不能超过20个字符';  
	          }  
	        }
	  });
	//监听提交
		form.on('submit(formDemo)', function(data){
			disable_submit(true,'commit');
			var empInfo = $('#addOrUpdateForm').serializeObject();
			var addJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
			if(empid==null || ""==empid){  //添加员工
				$.ajax({
					url : getRootPath()+ '/empmanage/addEmp.action',
					type : 'POST',
					dataType : 'TEXT',
					data : {signupForm:addJsonStr},
					success : function(result){
						
						if("success"==result){
							layer.msg('添加成功', {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									//只刷新第一个tab页下的列表
									var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
									parent.document.getElementById(data_pjax).contentWindow.lodingtable();
									parent.layer.closeAll();
									
								});
						}else if("both"==result){
							layer.msg("用户名和电话号码重复，请重新填写",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}else if("login_user_repeat"==result){
							layer.msg("用户名重复，请重新填写",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}else if("tel_repeat"==result){
							layer.msg("电话号码重复，请重新填写",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}
						else{
							layer.msg("添加失败，请重试或联系管理员",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}
					},
					error:function(){
						parent.layer.alert("添加失败");
						disable_submit(false,'commit');
					}
				});
			}else{  //修改员工信息
				$.ajax({
					url : getRootPath()+ '/empmanage/updateEmp.action',
					type : 'POST',
					dataType : 'TEXT',
					data : {signupForm:addJsonStr,id:empid},
					success : function(result){
						
						if("success"==result){
							layer.msg('修改成功', {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									//只刷新第一个tab页下的列表
									var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
									parent.document.getElementById(data_pjax).contentWindow.lodingtable();
									parent.layer.closeAll();
									
								});
						}else if("both"==result){
							layer.msg("用户名和电话号码重复，请重新填写",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}else if("login_user_repeat"==result){
							layer.msg("用户名重复，请重新填写",{
								icon:1,
								time:2000
							})
						}else if("tel_repeat"==result){
							layer.msg("电话号码重复，请重新填写",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}
						else{
							layer.msg("修改失败，请重试",{
								icon:1,
								time:2000
							})
							disable_submit(false,'commit');
						}
					},
					error:function(){
						parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
						disable_submit(false,'commit');
					}
				});
			}
			return false; 
			
			
		});
	});
})

function initdata(){
	$.ajax({
	    url : getRootPath()+"/empmanage/queryDeptList.action",
	    type : "post",
	    async: false,//同步
	    "dataType":"json",
	    success : function (gdata) {
	    	if(gdata!=null){
	    		 var glist=gdata.data;
	             for(var i=0;i<glist.length;i++){
	            	 var gindex=glist[i];
	            	 var id=gindex.id;
	            	 var teamname=gindex.team_name;
	            	 $("#team_id").append("<option value='"+id+"'>"+teamname+"</option>"); 
	             }
	    	}
	    }
	});
	
	if(empid!=null && ""!=empid){
		$.ajax({
		    url : getRootPath()+"/empmanage/queryEmpById.action",
		    type : "post",
		    data:{"id":empid},
		    async: false,//同步
		    "dataType":"json",
		    success : function (gdata) {
		    	//console.log(gdata);
		    	if(gdata!=null){
		    		$("#addOrUpdateForm").setForm(gdata);
		    	}
		    }
		});
	}
	
};

	

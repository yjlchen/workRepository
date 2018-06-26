layui.use(['form','layer'], function(){
		var form = layui.form();
		var id = getUrlParam("id");
		var pageUrl;
		
		//表单验证
		form.verify({
			group_name:function(value){
				//去掉两端空格验证长度
				value = toTrim(value);
				if(value.length < 1){
					return "请输入分类名"
				}else if(value.length > 16){
					return "您输入的分类名太长"
				}
			}
		});
		
		if(id!=null){
			pageUrl = getRootPath()+ '/webstore/pageinfo/updatePageinfoType.action';
		}else{
			pageUrl = getRootPath()+ '/webstore/pageinfo/addPageinfoType.action';
			}
		//修改
		if(id!=null){
			//修改时加载数据
			$.ajax({
			    url : getRootPath()+"/webstore/pageinfo/queryPageinfoTypeById.action",
			    type : "post",
			    data:{"id":id},
			    async: false,//同步
			    dataType:"json",
			    success : function (gdata) {
			    	if(gdata!=null){
			    		 //form表单自动绑定js
			    		 $("#editForm").setForm(gdata);
			    		 //渲染
			    		 form.render();
			    		
			    	}
			    }
			});
			
		}
		
		//保存
		form.on('submit(save)', function(data){
			var addJsonStr = JSON.stringify(data.field);
			disable_submit(true,'save');
			$.ajax({
				url : pageUrl,
				type : 'POST',
				data : {signupForm:addJsonStr},
				dataType : 'TEXT',
				success : function(result){
					if("success"==result){
						layer.msg("操作成功", {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								//只刷新第一个tab页下的列表
								var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
								parent.document.getElementById(data_pjax).contentWindow.searchPage();
								parent.layer.closeAll();
								
							});
					}
					else{
						disable_submit(false,'save');
						parent.layer.alert("操作失败");
					}
				},
				error:function(){
					disable_submit(false,'save');
					parent.layer.alert("操作失败");
				}
			});
			return false; 
			});
		
	})


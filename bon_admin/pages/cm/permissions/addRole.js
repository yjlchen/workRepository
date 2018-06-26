var role_id=getUrlParam("id");  //角色id
$(function(){
	initdata();
	initEvent();
})
function initEvent(){
	$("#reset").click(function(){
		parent.layer.closeAll();
	})
}
layui.use('form', function(){
		var form = layui.form();
		form.verify({  
			name: function(value){  
				value=toTrim(value);
				if(value.length==0){
					return '不能为空';
				}else if(value.length > 15){  
	            return '角色名称不能超过15个字';  
	          }  
	        }, remark: function(value){  
	        	value=toTrim(value);
	        	if(value.length==0){
					return '不能为空';
				}else if(value.length > 100){  
	            return '角色说明不能超过120个字符';  
	          }  
	        }
	  });
	//监听提交
		form.on('submit(formDemo)', function(data){
			var zTree = $.fn.zTree.getZTreeObj("dataTree");
			var checkNodes=zTree.getCheckedNodes(true); //获取被选中的节点
			if(checkNodes.length==0){
				parent.layer.alert("请选择角色对应的菜单");
				return false;
			}
			disable_submit(true,'commit');
			var menu_ids="";  //菜单id集合
			var menu_names="";//菜单名称集合
			$.each(checkNodes,function(i,n){
				var m_id=n.id;     //菜单id
				var m_name=n.name; //菜单名称
				if(menu_ids==""){
					menu_ids=m_id;
					menu_names=m_name;
				}else{
					menu_ids+=","+m_id;
					menu_names+=","+m_name;
				}
			})
			$("#menu_ids").val(menu_ids);$("#menu_names").val(menu_names);//获取菜单集合
			changeUser();
			if( role_id==undefined || role_id=="undefined" || ""==role_id ){  //添加角色
				var empInfo = $('#addOrUpdateForm').serializeObject();
				var addJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
				$.ajax({
					url : getRootPath()+ '/role/saveRole.action',
					type : 'POST',
					dataType : 'TEXT',
					data : {roleJsonForm:addJsonStr},
					success : function(result){
						if("success"==result){
							layer.msg('添加成功', {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
									parent.document.getElementById(data_pjax).contentWindow.lodingtable();
									parent.layer.closeAll();
								
								});
						}else{
							parent.layer.alert("添加失败");
							disable_submit(false,'commit');
						}
					},
					error:function(){
						parent.layer.alert("添加失败");
						disable_submit(false,'commit');
					}
				});
			}else{  //修改角色
				var empInfo = $('#addOrUpdateForm').serializeObject();
				var addJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
				$.ajax({
					url : getRootPath()+ '/role/saveRole.action',
					type : 'POST',
					dataType : 'TEXT',
					data : {roleJsonForm:addJsonStr},
					success : function(result){
						if("success"==result){
							layer.msg('修改成功', {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
									parent.document.getElementById(data_pjax).contentWindow.lodingtable();
									parent.layer.closeAll();
								});
						}else{
							parent.layer.alert("修改失败");
							disable_submit(false,'commit');
						}
					},
					error:function(){
						parent.layer.alert("修改失败，请关闭浏览器重试或联系管理员！");
						disable_submit(false,'commit');
					}
				});
			}
			return false; 
		});
	});
function initdata(){
	if(role_id!=null || ""!=role_id){  //编辑角色
		$.ajax({
		    url : getRootPath()+"/role/queryRoleMapById.action",
		    type : "post",
		    data:{"id":role_id},
		    async: false,//同步
		    "dataType":"json",
		    success : function (gdata) {
		    	if(gdata!=null){
		    		$("#addOrUpdateForm").setForm(gdata);
		    	}
		    }
		});
		
	}
	initMenu();
}
//初始化菜单数据	
function initMenu(){
	//获取菜单数据，用ztree组装
	var zTreeNodes;
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		},  
        check: {    
            enable: true  
        }
	};
	var datas;
	$.ajax({
	    url : getRootPath()+"/menu/queryMenuList.action",
	    type : "post",
	    async: false,//同步
	    "dataType":"json",
	    success : function (gdata) {
	    	//console.log(gdata);
	    	if(gdata!=null){
	    		datas=gdata;
	    		var menu_ids=$("#menu_ids").val();
	    		if(menu_ids!=""){
	    			menu_ids=","+menu_ids+",";
	    			$.each(datas,function(i,n){
	    				var m_id=n.id;  //菜单id
	    				if(menu_ids.indexOf(","+m_id+",")>=0){  //判断是否已经选中
	    					datas[i].checked=true;
	    				}
	    			})
	    		}
	    	}
	    }
	});
	//初始化列表
	zTreeNodes = datas;
	//初始化树
	$.fn.zTree.init($("#dataTree"), setting, zTreeNodes);
}
//控制 父子关联关系：
function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("dataTree"),
	type = { "Y":"ps", "N":"ps"};
	zTree.setting.check.chkboxType = type;
}
//实时记录创建人，修改人信息
function changeUser(){
	if($("#create_user_id").val()==""){
		$("#create_user_id").val($("#user_id").val());
		$("#create_time").val($("#user_time").val());
		$("#update_user_id").val($("#user_id").val());
		$("#last_update_time").val($("#user_time").val());
	}else{
		$("#update_user_id").val($("#user_id").val());
		$("#last_update_time").val($("#user_time").val());
	}
}

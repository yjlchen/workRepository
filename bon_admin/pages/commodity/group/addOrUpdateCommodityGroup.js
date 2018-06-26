
var type = getUrlParam("type");
var id = getUrlParam("id");

layui.use(['form','layer'], function(){
		var form = layui.form();
		var id = getUrlParam("id");
		var pageUrl;
		
		//表单验证
		form.verify({
			commodity_group_name:function(value){				
				//去掉两端空格验证长度
				value = toTrim(value);
				if(value.length < 1){
					return "请输入分组名称"
				}else if(value.length > 64){
					return "您输入的分组名称太长"
				}
				if(id!=null){
				   if(queryGroupName(value,id)>0){
					   return "该分组已存在";
				   }
				}else if(queryGroupName(value,id)>0){
					return "该分组已存在";
				}
				
			},
			tariff_rate:function(value){
				//去掉两端空格验证长度
				value = toTrim(value);
				if(value.length < 1){
					return "请填写关税";
				}else if(isNaN(value)){
					return "请填写数字";
				}else if(value<0.0001 || value>0.9999){					
				    return "关税范围为:0.0001~0.9999";	
				}else if(value.indexOf(".")>0){
					if(value.split(".")[1].length>4){
						return "小数位请保留4位小数";	
					}
				}
			},
			enlistment_amount:function(value){
				//去掉两端空格验证长度
				value = toTrim(value);
				if(value==null || value==""){
				   return "请填写关税启征金额";
				}else if(value<0){
					return "请填写大于或等于0的数字";
				}else if(isNaN(value)){
					return "请填写数字";
				}else if(value.indexOf(".")>0){
					if(value.split(".")[1].length>2){					
						  return "小数位请保留2位小数";	
					 }
				}
			}
			
		});
		
		if(id!=null){
			pageUrl = getRootPath()+ '/group/updateCommodityGroup.action';
		}else{
			pageUrl = getRootPath()+ '/group/addCommodityGroup.action';
			}
		//修改
		if(id!=null){
			//修改时加载数据			
			$.ajax({
			    url : getRootPath()+"/group/queryCommodityGroupById.action",
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
		//点击取消
		 $('#cancel').click(function(){
			 var index = parent.layer.getFrameIndex(window.name);
			 parent.layer.close(index);
		 })
})
/**
 * 查询商品分组名称
 */
function queryGroupName(nameString,id){
	var outcome;
	$.ajax({
		url : getRootPath()+"/group/queryGroupName.action",
		type : 'POST',
		async: false,//同步
	    dataType:"json",
		data:{
			"nameString":nameString,
			"idString":id
		},
		success : function(result){
			if(result>0){
				outcome=1;
			}else{
				outcome=0;
			}
		}		
	});
	return outcome;
	
}


	//initdata();
	layui.use(['form','layer'], function(){
		var form = layui.form();
		var layer = layui.layer;
		var id=getUrlParam("id");
		var pageUrl,formalUrl,draftUrl;
		if(id!=null){
			//pageUrl = getRootPath()+ '/webstore/updatePageinfo.action';
			formalUrl = getRootPath()+ '/document/updatePageinfo.action';
			draftUrl = getRootPath()+ '/document/addPageinfoDraft.action'; 
		}else{
			//pageUrl = getRootPath()+ '/webstore/addPageinfo.action';
			formalUrl = getRootPath()+ '/document/addPageinfoFormal.action';  
			draftUrl = getRootPath()+ '/document/addPageinfoDraft.action'; 
		};
		//修改
		if(id!=null){
			//修改时加载数据
			$.ajax({
			    url : getRootPath()+"/document/queryPageinfoById.action",
			    type : "post",
			    data:{"id":id},
			    async: false,//同步
			    dataType:"json",
			    success : function (gdata) {
			    	if(gdata!=null){
			    		 //form表单自动绑定js
			    		 $("#addForm").setForm(gdata);
			    		 //渲染
			    		 form.render();
			    		
			    	}
			    }
			});
			
		};
		
	});	

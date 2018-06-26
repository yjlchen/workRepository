var id=getUrlParam("id");      //菜单id
var type=getUrlParam("type");  //类型  add:增加，   update:编辑
var parentID=getUrlParam("parentID"); //父id


$(function(){
	initData();

	if(type=="add"){
		$('#lable1').show();
		$("#parent_id").val(id); //父节点
	}
	else if(type=="update")
		{
		if( parentID!=0)
		{$('#lable1').show();}
		$("#parent_id").val(parentID);
		// 查出来 标签赋值
		//填充值		
		}
	
	initEvent();
	initLabelData();
})
var layer;
var form;
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
})

function initEvent(){
	$("#commit").click(function(){
		subForm();
	});
	$("#imgc").click(function(){
		addpho("setImgUrl",1);
	})
	$("#reset").click(function(){
		window.location.href=getRootPath()+"/pages/homepage/classification/classification.jsp";
	})
	if(id=="0"){ //只有一级菜单可以设置图标
		$("#menuimg").show();
	}
}


//添加下拉标签的
function initLabelData(){ 
	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/banner/queryLabels.action',
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
  	            	 $("#label").append("<option value='"+id+"'>"+name+"</option>"); 
  	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#label").chosen();
			 }
		}
	});
}
function initData(){ 
	//初始化具体功能
	$.ajax({
		url : getRootPath()+ '/classification/queryWarrantList.action?id='+id,
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(data){
		   if(data ){
				 for(var i=0;i<data.length;i++){
	            	 var gindex=data[i];
	            	 var id=gindex.id;
	            	 var name=gindex.name;
	            	 $("#warrant").append("<option value='"+id+"'>"+name+"</option>"); 
	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#warrant").chosen();
		   }
			
		}
	});
	if(type=="update"){ //对菜单进行编辑
	
		//初始化菜单内容
		$.ajax({
			url : getRootPath()+ '/classification/queryMenuMapById.action?id='+id,
			type : 'POST',
			dataType : 'json',
			success : function(data){
				$("#label_form").setForm(data);
				if(data.lMap){
					 var result=data.lMap;
					 if(!isNotEmpty(result) || result.length==0){return;}
					 //var groupArr=[];
					 $.each(result,function(i,n){
						 //groupArr.push(n.group_id);
						 $("#label" + " option[value='" + n.id + "']").attr('selected', 'selected');
					 });
					 //这样可以解决同一select不断动态加载的问题。
					 $("#label").trigger("liszt:updated");
					 //重新调用chosen插件方法
					 $("#label").chosen();
				 }
/*				$.ajax({
					url : getRootPath()+ '/banner/queryBannerLabel.action',
					type : 'POST',
					dataType : 'json',
					data:{
						"bannerId":bannerId
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
				});*/
				
			}
		});
	}
	
}

function subForm(){
	
	disable_submit(true,'commit');
	var warrant=$("#warrant").val();  //处理具体功能选项  
    if(warrant!=null&&warrant.length>0){
    	var warrantIds="";
    	var warrantNames="";
        for(var index in warrant){  
        	if(warrantIds==""){
        		warrantIds=warrant[index]; 
        		warrantNames=$("#warrant option[value=" + warrant[index] + "]").text(); 
        	}else{
        		warrantIds+=","+warrant[index];
        		warrantNames+=","+$("#warrant option[value=" + warrant[index] + "]").text(); 
        	}
        }  
        $("#menu_warrant").val(warrantIds);
        $("#menu_warrant_name").val(warrantNames);
    }
   
	if(!check()){
		
		disable_submit(false,'commit');
		return ;
	}
	
	changeUser(); //记录创建人，修改人信息
	var empInfo = $('#label_form').serializeObject();
	var jsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
	
	$.ajax({
		url : getRootPath()+ '/classification/saveMenu.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {menuJsonForm:jsonStr},
		async:false,
		success : function(result){
			
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						window.location.href=getRootPath()+"/pages/homepage/classification/classification.jsp";
					});
			}
			else{
				parent.layer.msg('操作失败，请重试', {
					  icon: 2,
					  time: 1000 //（如果不配置，默认是3秒）
					});
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 2,
				  time: 1000 //（如果不配置，默认是3秒）
				});
			disable_submit(false,'commit');
		}
	});
}

/**
 * 检查form表单填写是否错误
 */
function check(){
	
	var name = $("#name").val();
	if(name.length>7){
		parent.layer.msg('最多可填写7个字符', {icon: 2,time: 2000});
		return false;
	}
	if(!isNotEmpty(name)){
		parent.layer.msg('请填写名称', {icon: 2,time: 2000});
		return false;
	}
	var serial_num = $("#serial_num").val();
	if(!isNotEmpty(serial_num)){
		parent.layer.msg('请填写排序', {icon: 2,time: 2000});
		return false;
	}
	var label = $("#label").val();
   if(parentID!=0){
	 if(!isNotEmpty(label)){
			parent.layer.msg('请添加标签', {icon: 2,time: 2000});
			return false;
		}
	}
	

	var final_node = $('input:radio[name="final_node"]:checked').val();  //0非最终节点    1 最终节点
	
		
		
		if(!(serial_num%1 === 0)||serial_num<1||serial_num>serial_num){
			parent.layer.msg('排序请输入1-10000之间的整数', {icon: 2,time: 2000});
			return false;
		}
		return true;
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


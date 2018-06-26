var id=getUrlParam("id");                  //菜单id
var type=getUrlParam("type");              //类型  add:增加，   update:编辑
var parentID=getUrlParam("parentID");      //父id
var final_node=getUrlParam("final_node");  //0 非最终子节点  1 最终子节点
var haschild=getUrlParam("haschild");      //0 无子节点  1 有子节点
//alert("id:"+id+"_type="+type+"_parentID="+parentID+"_final_node"+final_node);
$(function(){
	initData();
	if(type=="add" || type=="first"){
		$("#parent_id").val(id); //父节点
	}
	initEvent();
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
		window.location.href=getRootPath()+"/pages/cm/permissions/menuManage.jsp";
	})
	if(parentID=="0" ||type=="first"){ //只有一级菜单可以设置图标
		$("#imgc-none").show();
		if(type=="add"){
			$("#node-none").show();  //是否最终菜单的选择
		}
	}else{
		$("#node-none").show();  //是否最终菜单的选择
		if(final_node=="1"){;    //最终节点
		  $("#menu-none").show();     //菜单链接
		  $("#warrant-none").show();  //功能
		}
	}
	$(":radio").click(function(){
		 if($(this).val()==1){ //最终节点
			 if(haschild==1){  //有子节点 不允许改为最终节点
				 if(0!=parentID){ //第一级无需弹窗口
				 parent.layer.msg('请先删除子节点才能改为最终节点', {icon: 2,time: 2000});
				 }
				 
				 var oRadio = document.getElementsByName("final_node");
			     for(var i=0;i<oRadio.length;i++)
			     {
			          if(oRadio[i].value ==0)
			          {    
			             oRadio[i].checked = true;
			          }
			     }
			  }else{
				  $("#menu-none").show();     //菜单链接
				  $("#warrant-none").show();  //功能
			  }
		}else{ //非最终节点
				 $("#menu-none").hide();     //菜单链接
				 $("#warrant-none").hide();  //功能
		}
	});
}

function initData(){ 
	//初始化具体功能
	$.ajax({
		url : getRootPath()+ '/menu/queryWarrantList.action?id='+id,
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
			url : getRootPath()+ '/menu/queryMenuMapById.action?id='+id,
			type : 'POST',
			dataType : 'json',
			success : function(data){
				$("#label_form").setForm(data);
				if(isNotEmpty(data.img_url)){
					$("#imgc").attr("src",data.img_url);
					$("#imgc-none").show();
					if(parentID!="0" &&type=="first"){ //只有一级菜单可以设置图标
							$("#node-none").show();  //是否最终菜单的选择
					}
				}
				$.each(data.menu_warrant.split(","),function(i,n){
					$("#warrant" + " option[value='" + n + "']").attr('selected', 'selected');
				})
				//这样可以解决同一select不断动态加载的问题。
				$("#warrant").trigger("liszt:updated");
				//重新调用chosen插件方法
				$("#warrant").chosen();
			}
		});
	}
	
}
//选择图片
function addpho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}
//设置图片
function setImgUrl(imgUrl){
	if( imgUrl.length>0){
		var url=imgUrl[0];
		$("#imgc").attr("src",url);
		$("#img_url").val(url);
	}
}
function subForm(){
	disable_submit(true,'commit');
	var warrant=$("#warrant").val();  //处理具体功能选项  
    if(warrant!=null&&warrant.length>0 && $('input:radio[name="final_node"]:checked').val()==1){ //最终节点
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
    }else{
    	$("#menu_warrant").val("");
        $("#menu_warrant_name").val("");
    }
	if(!check()){
		disable_submit(false,'commit');
		return ;
	}
	changeUser(); //记录创建人，修改人信息
	var empInfo = $('#label_form').serializeObject();
	var jsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
	$.ajax({
		url : getRootPath()+ '/menu/saveMenu.action',
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
						window.location.href=getRootPath()+"/pages/cm/permissions/menuManage.jsp";
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
	if(!isNotEmpty(name)){
		parent.layer.msg('请填写菜单名称', {icon: 2,time: 2000});
		return false;
	}
	var serial_num = $("#serial_num").val();
	if(!isNotEmpty(serial_num)){
		parent.layer.msg('请填写排序', {icon: 2,time: 2000});
		return false;
	}
	if(parentID=="0" || type=="first"){
		var img_url = $("#img_url").val();
		if(!isNotEmpty(img_url)){
			parent.layer.msg('请选择菜单图标', {icon: 2,time: 2000});
			return false;
		}
	}
		var final_node = $('input:radio[name="final_node"]:checked').val();  //0非最终节点    1 最终节点
		if(final_node==1){
			var menu_url = $("#menu_url").val();
			if(!isNotEmpty(menu_url)){
				parent.layer.msg('请填写菜单链接', {icon: 2,time: 2000});
				return false;
			}
//			var menu_warrant = $("#menu_warrant").val();
//			if(!isNotEmpty(menu_warrant)){
//				parent.layer.msg('请选择具体功能', {icon: 2,time: 2000});
//				return false;
//			}
			
			if(!(serial_num%1 === 0)||serial_num<1||serial_num>serial_num){
				parent.layer.msg('排序请输入1-10000之间的整数', {icon: 2,time: 2000});
				return false;
			}
		}else{
			$("#menu_url").val("");
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


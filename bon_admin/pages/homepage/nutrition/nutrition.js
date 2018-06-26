$(function(){
	initData();
	initEvent();
})
//数据初始化
function initData(){ 
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
	//填充值
	$.ajax({
		url : getRootPath()+ '/nutrition/queryNutrition.action',
		type : 'POST',
		dataType : 'json',
		async: false,
		success : function(result){
			 if(result){
				 $("#name").val(result.title);
				 if(result.title==""){
					 $("#isnew").val(1); //新增
				 }else{
					 $("#isnew").val(0); //修改
				 }
				 datas=result.data;
			 }
		}
	});
	//初始化列表
	zTreeNodes = datas;
	//初始化树
	$.fn.zTree.init($("#dataTree"), setting, zTreeNodes);
	setCheck();
}
//事件初始化
function initEvent(){
	$("#commit").click(function(){
		subForm();
	});
}
//进行提交操作
function subForm(){
	if(!valid()){return false;}
	disable_submit(true,'commit');
	 // 标签集合
	$.ajax({
		url : getRootPath()+ '/nutrition/updateNutrition.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {"infoJsonStr":JSON.stringify($.fn.zTree.getZTreeObj("dataTree").getCheckedNodes(true)),"name":$("#name").val(),"isnew": $("#isnew").val()},
		success : function(result){
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						disable_submit(false,'commit');
					});
			}
			else{
				parent.layer.msg('操作失败，请重试', {
					  icon: 1,
					  time: 1000 //（如果不配置，默认是3秒）
					});
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
				});
			disable_submit(false,'commit');
		}
	});
}
function valid(){
	//验证标签
	 var label=$("#label_id").val();
	 var zTree = $.fn.zTree.getZTreeObj("dataTree");
	 var checkNodes=zTree.getCheckedNodes(true); //获取被选中的节点
	//验证标题
	 var name=$("#name").val();
	 if(!name || name==null || name=="" ){
		alert_mess('请填写标题');
		return false;
	}else if(checkNodes.length==0){
		alert_mess("请设置标签");
		return false;
	}
	 return true;
}
//控制 父子关联关系：
function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("dataTree"),
	type = { "Y":"ps", "N":"ps"};
	zTree.setting.check.chkboxType = type;
}

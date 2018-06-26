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
	
	debugger 
	var datas;
	//填充值
	$.ajax({
		url : getRootPath()+ '/companyLabel/listCompanyLabel.action',
		type : 'POST',
		dataType : 'json',
		async: false,
		success : function(result){
			 if(result){
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
	disable_submit(true,'commit');
	
	//获取选中节点
     var treeObj=$.fn.zTree.getZTreeObj("dataTree"),  
     nodes=treeObj.getCheckedNodes(true),
     v="";  
     if (nodes.length == 0 ){
    	 alert("请选择菜单信息");
    	 return ;
     }
     for(var i=0;i<nodes.length;i++){ 
        //if (nodes[i].pId != null)
        v+=nodes[i].id + ",";  
     }
	 // 标签集合
	var menu = JSON.stringify(v);
	//console.log(menu);
	$.ajax({
		url : getRootPath()+ '/companyLabel/saveCompanyLabel.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {"addJsonStr":menu},
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

//控制 父子关联关系：
function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("dataTree"),
	type = { "Y":"ps", "N":"ps"};
	zTree.setting.check.chkboxType = type;
}

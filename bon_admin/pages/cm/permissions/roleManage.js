var layer;
var openEdit; //弹出的角色编辑层
$(function(){
	lodingtable();
	layui.use(['form','element','layer'], function(){
		   layer = layui.layer;
	});	
	initEvent();
});
//初始化事件
function initEvent(){
	 $("#addRole").click(function(){
		 updateRole();
	});
}
//加载数据
function lodingtable(){
	featuresFilter("/pages/cm/permissions/roleManage.jsp"); //禁用非授权按钮
	$('#roletable').DataTable({
		"processing": true,
        "serverSide": true,
        "stateSave":false,
        "autoWidth":false,
        "ordering": true,
        "paging": false,
        "info": false,
        "bDestroy": true,
        "searching": false,
	     "sDom":'<"info-toolbar">rtilp',
	     "columns" : [   
	         { "data" : "name"},
	         { "data" : "remark"},
	         { "data" : "menu_names","sDefaultContent" : ""},
	         { "data" : "create_time"},
	         { "data" : "id","sDefaultContent" : ""}
	            
	     ],
	     "createdRow": function ( row, data, index ) {
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	     "columnDefs": [
	                       		
	                   {
                	   	"targets": [2],
                	   	"data":"menu_names",
                	   	"render": function(data, type, full) {
	                	   			return showColumnValue(data,50);
                	   			  }
	                   },
                   
					    {
					    "targets": [4],
					    "data":"id",
					    "render": function(data, type, full) {
					    	return "<a href='#' class='update' onclick='updateRole(\""+data+"\")'> 菜单授权</a>| "+ "<a href='#' class='auth'  onclick='authorized(\""+data+"\")'>功能授权</a>";
					      }
					  }
                	

             ],
             "ajax": {
            	 "type":"post",
                 "url": getRootPath()+"/role/queryRoleList.action",
                 "dataType":"json"
             },
             "language": {
            	 "lengthMenu": "每页显示 _MENU_ 条记录",
                 "zeroRecords": "暂无数据",
                 "info": " _PAGE_ / _PAGES_",
                 "infoEmpty": "没有数据",
                 "infoFiltered": "(filtered from _MAX_ total records)",
                 "emptyTable":     "没有数据",
                 "info":           "当前显示第 _START_ 到第 _END_ 条,共 _TOTAL_ 条记录",
                 "infoEmpty":      "显示第 0 到第 0 条（总 0 条）",
                 "infoFiltered":   "(来自 _MAX_ 条的过滤数据)",
                 "infoPostFix":    "",
                 "thousands":      ",",
                 "loadingRecords": "载入中...",
                 "processing":     "处理中...",
                 "search":         "搜索：",
                 "zeroRecords":    "无相关数据",
                 "paginate": {
                     "first":      "首页",
                     "last":       "尾页",
                     "next":       "下一页",
                     "previous":   "上一页"
                 }, 
                 "aria": {
                     "sortAscending":  ": 升序排列",
                     "sortDescending": ": 降序排列"
                 }
             
             }
	    });
	 
}
/*
 * 添加或修改角色
 * @param data   本条记录json对象
 */
function updateRole(id){
	parent.layer.open({
		  title:"编辑角色信息",
		  type:2,
		  area: ['500px', '530px'],
		  content:getRootPath()+'/pages/cm/permissions/addRole.jsp?id='+id
	  });
}
 
/**
 * 删除角色
 * @param id   角色id
 */
function deleteRole(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/role/deleteRole.action",
		        type : "post",
		        data : {id : id},
		        async: false,
		        datatype : "text",
		        success : function (data) {
		        	if(data=="success"){
			        	parent.layer.msg('删除成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								lodingtable();
								parent.layer.closeAll();
							});
		        	}else if(data=="hasBind"){
		        		parent.layer.msg("有用户绑定了此角色，无法删除！", {icon: 2,time: 2000});
		        		return false;
		        	}else{
		        		parent.layer.msg("删除失败", {icon: 2,time: 2000});
		        		return false;
		        	}
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			layer.closeAll('dialog');
		});
}
//对角色进行具体功能授权
function authorized(id){
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
	layer.open({
		 title:'角色授权',
		 type: 1,
		 content: $('#authorized'),
		 area: ['400px', '530px']
	});
	//填充值
	$.ajax({
		url : getRootPath()+ '/role/queryRoleAuthorizedList.action',
		type : 'POST',
		dataType : 'json',
		async: false,//同步
		data:{"roleID":id},
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
}
//控制 父子关联关系：
function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("dataTree"),
	type = { "Y":"ps", "N":"ps"};
	zTree.setting.check.chkboxType = type;
}
//角色授权具体功能确定进行提交
function updateAuthor(){
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
	var checkNodes=zTree.getCheckedNodes(true); //获取被选中的节点
//	if(checkNodes.length==0){
//		parent.layer.alert("请授权菜单具体功能");
//		return false;
//	}
	disable_submit(true,'submitBtn');
	$.ajax({
		url : getRootPath()+ '/role/updateRoleAuthorizedList.action',
		type : 'POST',
		dataType : 'text',
		data:{"checkNodesJson":JSON.stringify(checkNodes)},
		success : function(result){
			 if(result=="success"){
				 parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						disable_submit(false,'submitBtn');
						lodingtable();
						layer.closeAll();
				});
			 }else{
				 parent.layer.msg('操作失败', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						disable_submit(false,'submitBtn');
				});
			 }
		}
	});
	
}
//取消角色授权具体功能
function cancelAuthor(){
	layer.closeAll();
}
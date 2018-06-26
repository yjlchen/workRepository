$(function(){
	lodingtable();
	//填充值角色下拉框
	$.ajax({
		url : getRootPath()+ '/role/queryRoleList.action',
		type : 'POST',
		dataType : 'json',
		success : function(result){
			 if(result){
				 var data=result.data;
				 for(var i=0;i<data.length;i++){
  	            	 var gindex=data[i];
  	            	 var id=gindex.id;
  	            	 var name=gindex.name;
  	            	 $("#role_id").append("<option value='"+id+"'>"+name+"</option>"); 
  	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	 //重新调用chosen插件方法
				 $("#role_id").chosen();
			 }
		}
	});
});

layui.use(['form','element','layer'], function(){
	  var layer = layui.layer;
	  $("#addDept").on("click",function(){
		  parent.layer.open({
			  title:"添加团队",
			  type: 2,
			  area: ['500px', '200px'],
			  content: getRootPath()+'/pages/cm/empmanage/addDept.jsp' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
		  });
	  });
	  
	  $("#addEmp").click(function(){
		  parent.layer.open({
			  title:"添加员工",
			  type: 2,
			  id:100,
			  area: ['400px', '530px'],
			  content: getRootPath()+'/pages/cm/empmanage/addEmp.jsp' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
		  });
	});
})	

function lodingtable(){
	$('#emptable').DataTable({
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
	         { "data" : "login_user"},
	         { "data" : "emp_name"},
	         { "data" : "team_name","sDefaultContent" : ""},
	         { "data" : "emp_tel","sDefaultContent" : ""},
	         { "data" : "role_names"},
	         { "data" : "create_time","sDefaultContent" : ""}
	            
	     ],
	     "createdRow": function ( row, data, index ) {
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	     "columnDefs": [
	                       		
                   
					{
					    "targets": [6],
					    "data":"id",
					    "render": function(data, type, full) {
					    	 
					    	return "<a href='#' onclick='updateEmp(\""+data+"\")'> 编辑</a>| "+ "<a href='#' onclick='deleteEmp(\""+full.customer_id+"\",\""+data+"\")'> 删除</a>| "+ "<a href='#' onclick='authRole(\""+full.role_ids+"\",\""+data+"\")'>角色管理</a>";
					      }
					  }
                	

             ],
             "ajax": {
            	 "type":"post",
                 "url": getRootPath()+"/empmanage/queryEmpList.action",
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

function updateEmp(id){
	layui.use('layer', function(){
		  var layer = layui.layer;
		  parent.layer.open({
			  title:"修改员工信息",
			  type: 2,
			  area: ['400px', '500px'],
			  content: getRootPath()+'/pages/cm/empmanage/addEmp.jsp?id='+id ,
			  data:{"id":id}
		  });
	});
}
 
/**
 * 删除用户信息
 * customer_id   账号对应的用户表id
 * id            账号表id
 */
function deleteEmp(customer_id,id){

	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/empmanage/deleteEmp.action",
		        type : "post",
		        data : {
		            id : id,
		            customer_id:customer_id
		        },
		        datatype : "text",
		        success : function (data) {
		        	parent.layer.msg('删除成功', {
						  icon: 1,
						  time: 500 //（如果不配置，默认是3秒）
						}, function(){
							var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
							parent.document.getElementById(data_pjax).contentWindow.lodingtable();
							parent.layer.closeAll();
							
						});
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			layer.closeAll('dialog');
		});
}
var userID=""; //授权的用户id
/**
 *  授权操作
 * ids   授权的角色ids 逗号分隔
 * id    用户id
 */
function authRole(ids,id){
	userID=id;
	layer.open({
		 title:'角色授权',
		 type: 1,
		 content: $('#addLabelContent'),
		 area: ['400px', '350px']
	});
	 if(ids!=undefined && ids!=""){
		 $.each(ids.split(","),function(i,n){
			 //groupArr.push(n.group_id);
			 $("#role_id" + " option[value='" + n + "']").attr('selected', 'selected');
		 });
		 //这样可以解决同一select不断动态加载的问题。
		 $("#role_id").trigger("liszt:updated");
	 }
}
function tusub(){
	if(!valid()){return false;}
	disable_submit(true,'submitBtn');
	 // 标签集合
    var jsonlabels='[';
	    var c_label=$("#role_id").val();
	    if(c_label!=null&&c_label.length>0){
	        for(var index in c_label){  
	        	var label_id=c_label[index];  
	        	 var tbody='{';
	    			tbody+='"id":"'+uuid();                      //主键
	    			tbody+='","employee_id":"'+userID;    
	    			tbody+='","role_id":"'+label_id;  
	    			tbody+='"}'; 
	    			if(jsonlabels.length>2){
	    				jsonlabels+=','+tbody;
	    			}else{
	    				jsonlabels+=tbody;
	    			}
	        }  
	    }
	jsonlabels+=']';
	
	$.ajax({
		url : getRootPath()+ '/role/updateUserRole.action',
		type : 'POST',
		dataType : 'text',
		data : {"infoJsonStr":jsonlabels,"userID":userID},
		success : function(result){
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						location.reload();
				});
			}else{
				parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
				});
				disable_submit(false,'submitBtn');
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 1,
				  time: 1000 //（如果不配置，默认是3秒）
			});
			disable_submit(false,'submitBtn');
		}
	});
}
function valid(){
	//验证标签
	var label=$("#role_id").val();
	if(!label || label==null || label=="" || label.length==0){
			alert_mess('请选择用户角色');
			return false;
	} 
	 return true;
}
function tuclose(){
//	location.reload();
	layer.closeAll();
}
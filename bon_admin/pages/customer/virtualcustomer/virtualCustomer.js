var form;
layui.use(['form','layer'],function(){
	 form = layui.form;
})
$(function() {
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据	
	$.ajax({
		 url:getRootPath()+'/virtualCustomer/queryAllEmpHaveVC.action',
		 type:'post',
		 dataType:'json',
		 async:false,
		 success:function(result){
			 var str = "<option value=''>所属人员</option>";
			 $.each(result,function(index,item){
				 str += "<option value=\"" + item.id + "\" >" + item.emp_name + "</option>";
			 });
			 $('#emp_id').html(str);
		 }
	 });
	$("#save").click(function(){
		window.location.href="addOrUpdateVirtualCustomer.jsp";
	});
	$("#commit").click(function(){
		searchPage();
	})
});


/**
* 加载表格
*/
function searchPage() {
	var queryCond = $('#queryform').serializeObject();
	var queryJsonStr = JSON.stringify(queryCond);
	console.log(queryJsonStr)
	$('#vTable').DataTable(
				{
					"processing" : true,
					"serverSide" : true,
					"paging" : true,
					"stateSave" : false,
					"autoWidth" : false,
					"ordering" : false,
					"info" : true,
					"bLengthChange" : true,
					"bPaginate" : true,
					"bDestroy" : true,
					"pageLength" : 20,
					"aLengthMenu" : [ [ 20 ,30 ,40 ], [ 20 ,30 ,40 ] ],
					"createdRow" : function(row, data, index) {
						$(row).children('td').attr('style','text-align:center;');
						if (index % 2 == 1) {
							$(row).css("background", "#F4F4F4");
						}
					},
					"searching" : false,
					"sDom" : '<"info-toolbar">rtilp',
					"columns" : [
					              { "data" : "head_img_url",
					 	        	"render": function (data, type, full, meta) {
				 	        			 return '<img src="'+data+'" style="width:50px;height:50px">';
					 	        	 }
					              },
					              { "data" : "wx_name" },
					              { "data" : "status",
					            	  "render": function (data, type, full, meta) {
					            		  if(data==3){
					            			  return "后台人员";
					            		  }else if(data==4){
					            			  return "商城粉丝";
					            		  }else{
					            			  return "";
					            		  }
					            	  }
					              },
					              { "data" : "emp_name" },
					              { "data" : "add_time" },
					              { 
					 	        	 "data" : "id",
					 	        	 "render": function (data, type, full, meta) {
				 	        			 return "<a style='cursor: pointer;'  onclick='updateVC(\""+full.id+"\");'> 修改</a>";
//				 	        			 +"<a style='cursor: pointer;'  onclick='deleteVC(\""+full.id+"\");'> 删除</a>";
					 	        	 }
					 	         }
					],
					"columnDefs" : [
					],
					"ajax" : {
						"type" : "post",
						"url" : getRootPath()+"/virtualCustomer/virtualCustomer.action",
						"dataType" : "json",
						"data":{queryJsonStr:queryJsonStr}
					},
			
					
					"language" : {
						"lengthMenu" : "每页显示 _MENU_ 条记录",
						"zeroRecords" : "暂无数据",
						"info" : " _PAGE_ / _PAGES_",
						"infoEmpty" : "没有数据",
						"infoFiltered" : "(filtered from _MAX_ total records)",
						"emptyTable" : "没有数据",
						"info" : "当前显示第 _START_ 到第 _END_ 条,共 _TOTAL_ 条记录",
						"infoEmpty" : "显示第 0 到第 0 条（总 0 条）",
						"infoFiltered" : "(来自 _MAX_ 条的过滤数据)",
						"infoPostFix" : "",
						"thousands" : ",",
						"loadingRecords" : "载入中...",
						"processing" : "处理中...",
						"search" : "搜索：",
						"zeroRecords" : "无相关数据",
						"paginate" : {
							"first" : "首页",
							"last" : "尾页",
							"next" : "下一页",
							"previous" : "上一页"
						},
						"aria" : {
							"sortAscending" : ": 升序排列",
							"sortDescending" : ": 降序排列"
						}

					}
				});
	
}

/**
 * 编辑
 * @param id
 */
function updateVC(id){
	window.location.href="addOrUpdateVirtualCustomer.jsp?id="+id;
}

/**
 * 删除
 * @param id
 */
function deleteaudio(id){
	parent.layer.confirm('确定要删除该用户吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"//deleteById.action",
		        type : "post",
		        data : {
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
		        	if(data=="success"){
		        		parent.layer.msg('删除成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								searchPage();
								parent.layer.closeAll();
						});
		        	}else{
		        		parent.layer.msg('删除失败，请刷新页面重试', {
							  icon: 2,
							  time: 1000
						}, function(){
							parent.layer.closeAll();
						});
		        	}
		        },
		        error:function(){
		        	parent.layer.msg('删除失败，请刷新页面重试', {
						  icon: 2,
						  time: 1000
					}, function(){
						parent.layer.closeAll();
					});
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			layer.closeAll('dialog');
		}
	);
}

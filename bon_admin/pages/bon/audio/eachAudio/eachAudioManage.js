$(function() {
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据	
	layui.use(['form','layer','laydate'],function(){
		var layer = layui.layer;
		var form = layui.form;
		var laydate = layui.laydate;
		laydate.render({
			elem: '#start_time' //指定元素
		});
		laydate.render({
			elem: '#end_time' //指定元素
		});
//	 form.render();
	});
	$('#queryRecordInfo').click(function(){//查询数据
		searchPage();
	});
	
	$("#save").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/eachAudio/addOrUpdateAudioManage.jsp?status="+status+"&audio_id="+audio_id+"&ispay="+ispay;
	});
	
	$("#goback").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp?flag=2";
	});
	
});




/**
* 加载表格
*/
function searchPage() {
	var queryCond = $('#queryform').serializeObject();
	queryCond.status=status;
	queryCond.audio_id=audio_id;
	var queryJsonStr = JSON.stringify(queryCond);
	$('#eaTable').DataTable(
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
					              { "data" : "title"},
					              { "data" : "main_title" },
					              { "data" : "add_time" },
					              { "data" : "real_play_amount" },
					              { "data" : "unreal_play_amount" },
					              { "data" : "real_evaluate_amount" },
					              { "data" : "unreal_evaluate_amount"},
					              { "data" : "time_length" },
					              { "data" : "audio_num" },
					              { 
					 	        	 "data" : "status",
					 	        	 "render": function (data, type, full, meta) {
					 	        		 if(data==0){
					 	        			 return "<a href='"+getRootPath()+"/pages/bon/audio/eachAudio/addOrUpdateAudioManage.jsp?status="
					 	        			 		+status+"&audio_id="+audio_id+"&id="+full.id+"&ispay="+ispay+"'> 编辑</a>"
					 	        			 	   +"<a style='cursor: pointer;'  onclick='examine(\""+full.id+"\");'> 提交</a>"
					 	        			 	   +"<a style='cursor: pointer;'  onclick='deleteaudio(\""+full.id+"\");'> 删除</a>"
					 	        			 	 +"<a style='cursor: pointer;'  onclick='preview(\""+full.id+"\")'> 预览</a>"
					 	        			 	+"<a style='cursor: pointer;' onclick='unrealEvaluate(\""+full.id+"\",\""+full.title+"\",\""+full.emp_id+"\")'> 虚拟评论</a>";
					 	        		 }else if(data==1){
					 	        			 //return "审核中";
					 	        			 return "<a style='cursor: pointer;'  onclick='preview(\""+full.id+"\");'> 预览</a>"
					 	        			+"<a style='cursor: pointer;' onclick='unrealEvaluate(\""+full.id+"\",\""+full.title+"\",\""+full.emp_id+"\")'> 虚拟评论</a>";
					 	        		 }else if(data==2){
					 	        			return "<a href='"+getRootPath()+"/pages/bon/audio/eachAudio/addOrUpdateAudioManage.jsp?status="
					 	        			 	+status+"&audio_id="+audio_id+"&id="+full.id+"&ispay="+ispay+"'> 编辑</a>"
					 	        			 	+"<a style='cursor: pointer;'  onclick='deleteaudio(\""+full.id+"\");'> 删除</a>"
					 	        			 	+"<a style='cursor: pointer;'  onclick='preview(\""+full.id+"\");'> 预览</a>"
					 	        			 	+"<a style='cursor: pointer;' onclick='unrealEvaluate(\""+full.id+"\",\""+full.title+"\",\""+full.emp_id+"\")'> 虚拟评论</a>";
					 	        		 }else if(data==3){
					 	        			 return '<a href="#" onclick=showReason(\"'+full.id+'\") >查看驳回原因</a>'
					 	        			 	   +"<a href='"+getRootPath()+"/pages/bon/audio/eachAudio/addOrUpdateAudioManage.jsp?status="
							 	        		   +status+"&audio_id="+audio_id+"&id="+full.id+"&ispay="+ispay+"'> 编辑</a>"
							 	        		   +"<a style='cursor: pointer;'  onclick='deleteaudio(\""+full.id+"\");'> 删除</a>";
					 	        		 }
					 	        	 }
					 	         }
					],
					"columnDefs" : [
						{
							"targets": [5],
							"data":"real_evaluate_amount",
							"render": function(data, type, full,meta) { 
								return "<a style='cursor: pointer;'  onclick='preview(\""+full.id+"\")'> "+data+"</a>";
						    }
						},
						{
							"targets": [6],
							"data":"unreal_evaluate_amount",
							"render": function(data, type, full,meta) { 
								return "<a style='cursor: pointer;'  onclick='preview(\""+full.id+"\")'> "+data+"</a>";
						    }
						}
					],
					"ajax" : {
						"type" : "post",
						"url" : getRootPath()+"/eachAudio/queryList.action",
						"dataType" : "json",
						'data' : {
							queryJson : queryJsonStr
						}
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


//编辑虚拟评论
function unrealEvaluate(id,title,emp_id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src =
		getRootPath()+"/pages/cm/virtualevaluate/ivaeVirtualEvaluate.jsp?resource_id="+id+"&title="+title+"&belong_id="+emp_id+"&type=3"
		+"&page=/pages/bon/audio/eachAudio/eachAudioManageTab.jsp"+"&status="+status+"&audio_id="+audio_id+"&ispay="+ispay
}

//预览
function preview(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=
		getRootPath()+"/pages/bon/audio/eachAudio/eachAudioPreview.jsp?id="+id+"&flag="+status+"&audio_id="+audio_id+"&ispay="+ispay
}

/**
 * 删除
 * @param id
 */
function deleteaudio(id){
	parent.layer.confirm('确定要删除这条音频吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/eachAudio/deleteById.action",
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

/**
 * 提交审核
 * @param id
 */
function examine(id){
	parent.layer.confirm('确定要提交这条音频吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/eachAudio/examine.action",
		        type : "post",
		        data : {
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
		        	if(data=="success"){
		        		parent.layer.msg('提交成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								searchPage();
								parent.layer.closeAll();
						});
		        	}else{
		        		parent.layer.msg('提交失败，请刷新页面重试', {
							  icon: 2,
							  time: 1000
						}, function(){
							parent.layer.closeAll();
						});
		        	}
		        },
		        error:function(){
		        	parent.layer.msg('提交失败，请刷新页面重试', {
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

function showReason(id){
	  parent.layer.open({
		  title:"驳回原因",
		  text:"ff",
		  type: 2,
		  area: ['500px', '300px'],
		  content: getRootPath()+"/pages/bon/audio/eachAudio/showReason.jsp?id="+id
	  });
}
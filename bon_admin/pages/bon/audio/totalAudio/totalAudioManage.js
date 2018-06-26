/**
 * 音频合辑总集列表页js
 */
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("flag");

if(flag==null){
	flag = 0;
}
$(function(){  
	 jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	 /**从其他页面返回该页面时，进行判断显示哪个选项卡**/
	 if(flag=="0"){//未提交
		 searchPage();
	 }
	 //待审核
	 else if(flag=="1"){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(1)").addClass("layui-this");
			$("#flag").val(flag);
			searchPage();	
		}
	 //已发布（审核通过）
	 else if(flag=="2"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(2)").addClass("layui-this");
	 		$("#flag").val(flag);
	 		searchPage();	
		}
	//驳回
	 else if(flag=="3"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(3)").addClass("layui-this");
	 		$("#flag").val(flag);
	 		searchPage();	
		}
	  //新建
	  $("#to_create_totalAudio").click(function(){
			 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
			 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioEdit.jsp?flag="+flag
	  });
});  
layui.use(['form','element'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
})

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(totalAudioTab)', function(data){
		  var index = data.index ; // index对应不同的状态
		  $("#flag").val(index);
		  flag = index;
		  if(index != 0){//除了未提交，其余选项卡隐藏新建按钮
			  $("#to_create_totalAudio").hide();
		  }else{
			  $("#to_create_totalAudio").show();
		  }
		  searchPage();	
		});
}

function searchPage(){
	 var queryCond = $('#queryform').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 group = $('#group_list').DataTable({
		 	"processing": true,
	        "serverSide": true,
	        "paging":   true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": false,
	        "info":     true,
	        "bLengthChange":   true,
	        "bPaginate":true,
	        "bDestroy": true,
	        "pageLength": 20,
	        "aLengthMenu": [[20, 30, 40], [20, 30, 40]],
	        fixedColumns: { //固定列的配置项
                leftColumns: 1 //固定左边第一列
            },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [
				{ "data" : "title"},
				{ "data" : "add_time"},
				//音频封面图
				{ "data" : "audio_img_url"},
				//收费金额
				{ "data" : "now_bon_point"},
				//是否完结
				//{ "data" : "","sDefaultContent" : "否"},
				{ "data" : "real_play_amount"},
				{ "data" : "unreal_play_amount"},
				{ "data" : "real_collect_amount"},
				{ "data" : "unreal_collect_amount"},
				//操作
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [2],
								"data":"audio_img_url",
								"render": function(data, type, full,meta) { 
									return '<img src="'+data+'" width="50px;height=50px;">';
							    }
							},
							{
							    "targets": [3],
							    "data":"now_bon_point",
							    "render": function(data, type, full) {
							    	var str = "";
							    	if(data==0){
							    		str = "免费";
							    	}else{
							    		str = data;
							    	}
							    	return str;
							      }
							},
							/*{
							    "targets": [4],
							    "data":"is_over",
							    "render": function(data, type, full) {
							    	var str = "";
							    	if(data==0){
							    		str = "否";
							    	}else{
							    		str = "是";
							    	}
							    	return str;
							      }
							},*/
							{
								"targets": [8],
								"data":"id",
								"render": function(data, type, full, meta) {
									//操作显示的内容，也要根据判断显示
									return  totalAudioAction(full);
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, index) {
	                    	 if(index % 2 == 1){
		         	        	$(row).css("background","#F4F4F4");
		         	         }
	                    	 $(row).children('td').attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/totalAudio/queryTotalAudioPageList.action",
	                         "dataType":"json",
	                         // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
	                         'data' : {queryJsonStr:queryJsonStr}
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
	 fixHead('group_list','group_header');
}



//组装操作列
function totalAudioAction(full){
		var str = "";
		if(full.status==0){//草稿状态
		    str = '<a href="#" onclick=update(\"'+full.id+'\") >编辑</a>'
	        +'-<a href="#" onclick=del(\"'+full.id+'\",\"'+full.status+'\") >删除</a>'
	        +'-<a href="#" onclick=commit(\"'+full.id+'\") ><span style="color:red;" class="manplus">提交</span></a>'
	        //+'-<a href="#" onclick=preview(\"'+full.id+'\") >预览</a>'
		    ;
		}else if(full.status==1){//待审核状态
			str = '不可操作'
			//str = '<a href="#" onclick=preview(\"'+full.id+'\") >预览</a>'
		}else if(full.status==2){//审核通过
			str = '<a href="#" onclick=update(\"'+full.id+'\") >编辑</a>'
	        +'-<a href="#" onclick=del(\"'+full.id+'\",\"'+full.status+'\") >删除</a>'
	        /*if(full.is_over==0){
	        	str+='-<a href="#" onclick=over(\"'+full.id+'\") ><span style="color:red;" class="manplus">完结</span></a>'
	        }else{
	        	str+='-<a href="#" onclick=over(\"'+full.id+'\") ><span style="color:red;" class="manplus">取消完结</span></a>'
	        }*/
	        //+'-<a href="#" onclick=over(\"'+full.id+'\") ><span style="color:red;" class="manplus">完结</span></a>'
	        str+='-<a href="#" onclick=manageChildren(\"'+full.id+'\",\"'+full.is_pay+'\") ><span style="color:red;" class="manplus">分集管理</span></a>'
	        +'-<a href="#" onclick=preview(\"'+full.id+'\") >预览</a>'
		    ;
		}else if(full.status==3){//驳回
			str = '<a href="#" onclick=showReason(\"'+full.id+'\") >查看驳回原因</a>'
			+'-<a href="#" onclick=update(\"'+full.id+'\") >编辑</a>'
	        +'-<a href="#" onclick=del(\"'+full.id+'\",\"'+full.status+'\") >删除</a>'
		    ;
		}
		return str;
}

//编辑
function update(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioEdit.jsp?id="+id+"&flag="+flag;
}

//预览
function preview(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioPreview.jsp?id="+id+"&flag="+flag;
}

//查看驳回原因
function showReason(id){
	  parent.layer.open({
		  title:"驳回原因",
		  text:"ff",
		  type: 2,
		  area: ['500px', '300px'],
		  content: getRootPath()+"/pages/bon/audio/totalAudio/showReason.jsp?id="+id
	  });
}

//提交
function commit(id){
	parent.layer.confirm('确定提交吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/totalAudio/commitById.action",
		        type : "post",
		        data : {
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
		        	if(data=="success"){
		        		layer.msg("提交成功", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        		searchPage();	
		        	}else{
		        		layer.msg("提交失败", {
			      			  icon: 5,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        	}
		        	parent.layer.closeAll();
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			layer.closeAll('dialog');
		});
}

//删除
function del(id,status){
	parent.layer.confirm('该合集下的分集也将全部删除，确定要删除这条音频合集吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/totalAudio/deleteById.action",
		        type : "post",
		        data : { 
		        	id : id,
		        	status : status
		        },
		        datatype : "text",
		        success : function (data) {
		        	if(data=="exists"){
		        		layer.msg("该总集下有审核中的分集，不能删除", {
			      			  icon: 5,
			      			  time: 2000 //（如果不配置，默认是3秒）
			      		});
		        	}
		        	else if(data=="success"){
		        		layer.msg("删除成功", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      		});
		        		searchPage();	
		        	}else{
		        		layer.msg("删除失败", {
			      			  icon: 5,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      		});
		        	}
		        	parent.layer.closeAll();
		        },
				error:function(){
					layer.msg("删除失败", {
		      			  icon: 5,
		      			  time: 1000 //（如果不配置，默认是3秒）
		      			});
					parent.layer.closeAll();
				}
		    })
		}, function(index){
		});
}

//完结
function over(id){
	parent.layer.confirm('确定要完结吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/totalAudio/checkOverById.action",
		        type : "post",
		        data : {
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
		        	if(data.val1==0){
		        		layer.msg("该总集下没有审核通过的分集，不能完结", {
			      			  icon: 5,
			      			  time: 2000 //（如果不配置，默认是3秒）
			      		});
		        	}else if(data.val2>0){
		        		layer.msg("该总集下有审核中的分集，不能完结", {
			      			  icon: 5,
			      			  time: 2000 //（如果不配置，默认是3秒）
			      		});
		        	}else{
		        		$.ajax({
		    		        url : getRootPath()+"/totalAudio/overById.action",//进行完结操作
		    		        type : "post",
		    		        data : {
		    		            id : id
		    		        },
		    		        datatype : "text",
		    		        success : function (result) {
		    		        	console.log(result)
		    		        	if(result=="success"){
					        		layer.msg("操作成功", {
						      			  icon: 6,
						      			  time: 1000 //（如果不配置，默认是3秒）
						      		});
					        		searchPage();	
					        	}else{
					        		layer.msg("操作失败", {
						      			  icon: 5,
						      			  time: 1000 //（如果不配置，默认是3秒）
						      		});
					        	}
		    		        }
		        		});  
		        	}
		        	parent.layer.closeAll();
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			layer.closeAll('dialog');
		});
}

//分集管理
function manageChildren(id,ispay){
	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/audio/eachAudio/eachAudioManageTab.jsp?audio_id="+id+"&ispay="+ispay
}


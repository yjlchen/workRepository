layer=layui.layer;
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据
	
	$('#queryMissionInfo').click(function(){
		searchPage();
	});
	//添加mission
	$('#addMission').click(function(){
		window.location.href=getRootPath()+"/pages/bon/mission/addOrUpdateMission.jsp";
	});
});


//查询方法
function searchPage(){
	 var queryCond = $('#missionForm').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 var cust = $('#mission_list').dataTable({
		 	"processing": true,
	        "serverSide": true,
	        "paging":   true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "info":     true,
	        "bLengthChange":   true,
	        "bPaginate":true,
	        "bDestroy": true,
	        "pageLength": 20,
	        "aLengthMenu": [[20, 30, 40], [20, 30, 40]],
	        "createdRow": function ( row, data, index ) {
	        	$(row).children('td').attr('style', 'text-align: center;');
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [   
	            { "data" : "number"},
	            { "data" : "type"},
	            { "data" : "score"},
	            { "data" : "everyday_valid_times"},
	        ],
	        "columnDefs": [
						
							{
							    "targets": [4],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return  Action(full);
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/mission/queryMissionList.action",
	                         "type":"post",
	                         "dataType":"json",
	                         'data' : {
	                        	 "queryJsonStr":queryJsonStr
	                         }
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

//组装操作列
function Action(full){
	var str = "";
		if(full.is_valid==0){
		    str = '<a href="#" onclick=editMission(\"'+full.id+'\") >编辑</a>'
	        +'-<a href="#" onclick=delMission(\"'+full.id+'\") style="color:red">删除</a>'
	        +'-<a href="#" onclick=setvalid(\"'+full.id+'\") >启用</a>'
		    ;
		}else{
			str = '<a href="#" onclick=editMission(\"'+full.id+'\") >编辑</a>'
		//	+'-<a href="#" onclick=delMission(\"'+full.id+'\") >删除</a>'
			+'-<a href="#" onclick=qxvalid(\"'+full.id+'\") style="color:red">禁用</a>'
			;
		}
	return str;
}
//禁用任务
function qxvalid(id){
	parent.layer.confirm('确定要禁用该任务吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/mission/cancelValid.action",
		        type : "post",
		        data : {
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
		        	//只刷新第一个tab页下的列表
		        	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
					parent.document.getElementById(data_pjax).contentWindow.searchPage();
					parent.layer.closeAll();
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			parent.layer.closeAll('dialog');
		});
}
//启用任务
function setvalid(id){
	parent.layer.confirm('确定启用该任务吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/mission/setValid.action",
		        type : "post",
		        data : {
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
		        	//只刷新第一个tab页下的列表
		        	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
					parent.document.getElementById(data_pjax).contentWindow.searchPage();
					parent.layer.closeAll();
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			parent.layer.closeAll('dialog');
		});
}


//删除mission
function delMission(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/mission/deleteMissionInfo.action",
		        type : "post",
		        data : {	
		            id : id
		        },
		        datatype : "text",
		        success : function (data) {
					//只刷新第一个tab页下的列表
		        	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
					parent.document.getElementById(data_pjax).contentWindow.searchPage();
		        	parent.layer.closeAll();
							
		        }
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			parent.layer.closeAll('dialog');
		});
}


//编辑
function editMission(id){	
	window.location.href=getRootPath()+"/pages/bon/mission/addOrUpdateMission.jsp?id="+id;
}

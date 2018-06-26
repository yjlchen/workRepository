$(function(){
	jQuery_dataTable_extend_FirstAndEnd();
	searchPage();
	//添加
	$('#addBon').click(function(){
		window.location.href=getRootPath()+"/pages/bon/moneyBonpoint/addOrUpdateBon.jsp";
	});
})


//查询方法
function searchPage(){
	// var queryCond = $('#missionForm').serializeObject();
   //  var queryJsonStr=JSON.stringify(queryCond);
	 var cust = $('#Bon_list').dataTable({
		 	"processing": true,
	        "serverSide": true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "paging":false,
	        // "paging":true,
	        //"info":true,
	        "info":false,
	        "bDestroy": true,
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	       // "bLengthChange":   true,
	       // "bPaginate":true,
	       // "pageLength": 20,
	      //  "aLengthMenu": [[20, 30, 40], [20, 30, 40]],
	        "createdRow": function ( row, data, index ) {
	        	$(row).children('td').attr('style', 'text-align: center;');
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "columns" : [   
	            { "data" : "money"},
	            { "data" : "bonpoint"},
	        ],
	        "columnDefs": [
						
							{
							    "targets": [2],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return  Action(full);
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/moneyBonpoint/queryBonList.action",
	                         "type":"post",
	                         "dataType":"json",
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
	        })
	 
	    
}
//组装操作列
function Action(full){
	var str = "";
		if(full.is_show==0){
		    str = '<a href="#" onclick=edit(\"'+full.id+'\") >编辑</a>'
	        +'-<a href="#" onclick=delBon(\"'+full.id+'\") style="color:red">删除</a>'
	        +'-<a href="#" onclick=setshow(\"'+full.id+'\") >启用</a>'
		    ;
		}else{
			str = '<a href="#" onclick=edit(\"'+full.id+'\") >编辑</a>'
			//+'-<a href="#" onclick=delBon(\"'+full.id+'\") >删除</a>'
			+'-<a href="#" onclick=qxshow(\"'+full.id+'\") style="color:red">禁用</a>'
			;
		}
	return str;
}
//禁用
function qxshow(id){
	parent.layer.confirm('确定要禁用吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/moneyBonpoint/cancelShow.action",
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
//设为启用
function setshow(id){
	parent.layer.confirm('确定启用吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/moneyBonpoint/setShow.action",
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


//删除
function delBon(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/moneyBonpoint/deleteBonInfo.action",
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
function edit(id){	
	window.location.href=getRootPath()+"/pages/bon/moneyBonpoint/addOrUpdateBon.jsp?id="+id;
}

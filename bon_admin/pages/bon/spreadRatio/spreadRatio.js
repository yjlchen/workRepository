//获得状态标志，用来判断用户从哪个选项卡返回来的
var backFlag = getUrlParam("backFlag");

$(function(){
	jQuery_dataTable_extend_FirstAndEnd();
		
	//初始化菜单栏
	if (backFlag != null)
		initBackTab();
	searchPage();
	
	  
	//添加
	$('#addSetting').click(function(){
		var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/spreadRatio/addOrUpdateSetting.jsp?backFlag="+$('#type').val();
	});
})
layui.use(['form','element','layer'],function(){
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
	
})

//初始化tab的样式，以及status的赋值
function initBackTab(){
	for (var i=0;i<4;i++){
		if (i == backFlag){
			$("#tab"+i).attr("class","layui-this");
		}else{
			$("#tab"+i).removeClass("layui-this");
		}
	}
	$("#type").val(backFlag);
}

/**
 *实现选项卡
 *@param element 
 * */
function fun_element(element){
	element.on('tab(Tab)', function(data){
		 var index = data.index +1 ; 
		 $("#type").val(index);
		 searchPage();
	});
}

//查询方法
function searchPage(){
	
	 var queryCond = $('#queryform').serializeObject();
	 //类型的参数比选项卡
	 var queryJsonStr=JSON.stringify(queryCond);
	 	
	 var cust = $('#spread_list').dataTable({
		 	"processing": true,
	        "serverSide": true,
	        "stateSave":false,
	        "autoWidth":false,
	        "ordering": true,
	        "paging":false,
	        "paging":true,
	        "info":true,
	        "info":false,
	        "bDestroy": true,
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "bLengthChange":   true,
	        "bPaginate":true,
	        "pageLength": 20,
	        "aLengthMenu": [[20, 30, 40], [20, 30, 40]],
	        "createdRow": function ( row, data, index ) {
	        	$(row).children('td').attr('style', 'text-align: center;');
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "columns" : [   
	            { "data" : "start_money"},
	            { "data" : "end_money"},
	            { "data" : "rate"},
	        ],
	        "columnDefs": [
							{
							    "targets": [3],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return "<a style='cursor: pointer;' onclick='editSetting(\""+data+"\")' >编辑</a> | "+
							  	           "<a style='cursor: pointer;' onclick='delSetting(\""+data+"\");'>删除</a> ";
							  
							      }
							  }
							],
	                     "ajax": {
	                         "url": getRootPath()+"/spreadRatio/querySettingList.action",
	                         "type":"post",
	                         "dataType":"json",
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
	        })
	    
}

//删除
function delSetting(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/spreadRatio/deleteSetting.action",
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
function editSetting(id){	
	window.location.href=getRootPath()+"/pages/bon/spreadRatio/addOrUpdateSetting.jsp?id="+id+"&backFlag="+$('#type').val();
}

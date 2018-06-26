/**
 * 微页面分类列表页js
 */
$(function(){  
	   jQuery_dataTable_extend_FirstAndEnd();    // 设置dataTabla首页和尾页
	   searchPage();	                         //初始数据
});  


layui.use('element', function(){ 
	  var  element = layui.element(),
	  layer = layui.layer;

	  //弹出新增页面
	  $("#addWebpage").click(function(){
		  parent.layer.open({
			  title:"新增页面分类",
			  type: 2,
			  area: ['800px', '300px'],
			  content: getRootPath()+'/pages/webstore/webpage/addOrUpdatePageinfoType.jsp' 
		  });
	  });

})


//加载微页面分类列表
function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	
	pageinfoType = $('#pageinfotype_list').DataTable({
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
	            { "data" : "group_name"},
	            { "data" : "weipage_num"},
	            { "data" : "create_time"}
	            
	        ],
	        "columnDefs": [
							{
							    "targets": [4],
							    "data":"is_default",
							    "visible": false 
							  },
							{
							    "targets": [3],
							    "data":"id",
							    "render": function(data, type, full) {
							    	var id = data;
							    	var operation;
							    	if(full.is_default==1){
								    	operation = "<a onclick='updatePageInfoType(\""+id+"\")' href='#'>编辑</a>"+
								    	"|<a href='#' onclick='deletePageInfoType(\""+id+"\")'>删除</a>"
								    	/*+"|<a href='#' onclick='showUrl(\""+id+"\",event)'>链接</a>"*/
							    	}
							    	else if(full.is_default==0){
							    		operation = "<a onclick='updatePageInfoType(\""+id+"\")' href='#'>编辑</a>"
								    	/*+"|<a href='#' onclick='showUrl(\""+id+"\",event)'>链接</a>"*/
							    	}
							    	return operation;  
							    }
							  }
							
	                     ],
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/webstore/pageinfo/queryPageInfoTypeList.action",
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
	    		});
	 
		}



/**
 * 修改页面分类
 */
function updatePageInfoType(id){
	layui.use('layer', function(){
		  var layer = layui.layer;
		  parent.layer.open({
			  title:"修改页面分类",
			  type: 2,
			  area: ['800px', '300px'],
			  content: getRootPath()+'/pages/webstore/webpage/addOrUpdatePageinfoType.jsp?id='+id ,
			  data:{"id":id}
		  });
	});
}


/**
 * 弹出链接
 * @param id
 */
function showUrl(id,e){
	var x=e.pageX;
	var y=e.pageY;
	var url = getRootPath()+'/pages/webstore/webpage/showUrl_pageInfoType.jsp?id='+id;
	layer.open({
		title: ''
        ,type: 2
        ,closeBtn: 0
        ,id: 'promotion' //防止重复弹出
        ,area:["430px","50px"]
        ,offset: [y-20,x-450]
        ,content:url
       //,shade: 0 //不显示遮罩
        ,shadeClose :true //是否点击遮罩关闭
        ,yes: function(){
          layer.closeAll();
        }
      });
}


/**
 * 删除页面分类
 */
function deletePageInfoType(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/webstore/pageinfo/deletePageInfoType.action",
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
			layer.closeAll('dialog');
		});
}


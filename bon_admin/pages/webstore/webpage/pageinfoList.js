/**
 * 微页面列表页（上架）js
 */

$(function(){  
	   initPageGroup();
	   jQuery_dataTable_extend_FirstAndEnd();    // 设置dataTabla首页和尾页
	   searchPage();	                         //初始数据
	   
});  


layui.use('element', function(){ 
	  var  element = layui.element(),
	  layer = layui.layer;
	      
	  //弹出新增页面
	  $("#addWebpage").click(function(){
		   var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		   parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/webstore/webpage/editPageinfo.jsp"
	  });

})



//加载微页面列表（上架）
function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	
	pageinfo = $('#pageinfo_list').DataTable({
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
	            { "data" : "micro_name"},
	            { "data" : "create_time"},
	            { "data" : "group_name"},
	            { "data" : "","sDefaultContent" : ""},
	            //{ "data" : "micro_main"}
	        ],
	        "columnDefs": [
							{
								"targets": [0],
							   	"data":"micro_name",
							   	"render": function(data, type, full) { 
							   		return "<a onclick=openOneWeipage('"+full.micro_url+"') href='#'>"+data+"</a>"
							   	}
							},
							/*{
							    "targets": [5],
							    "data":"micro_main",
							    "visible": false 
							 },*/
							//访问量
							{
								"targets": [3],
								"render": function(data, type, full, meta) {
									var access_count_pv = full.access_count_pv;
									if(access_count_pv==null){
										access_count_pv = 0;
									}
									var access_count_uv = full.access_count_uv;
									if(access_count_uv==null){
										access_count_uv = 0;
									}
									return access_count_uv+"/"+access_count_pv;
								}
							},
							{
							    "targets": [4],
							    "data":"id",
							    "render": function(data, type, full) {
							    	var id = data;
							    	var operation;
							    	if(full.micro_main==1){
								    	operation = "<a onclick='updatePageInfo(\""+id+"\")' href='#'>编辑</a>"+
								    	"|<a href='#' onclick='deletePageInfo(\""+id+"\")'>删除</a>"+
								    	"|<a href='#' onclick='setPageInfoIndex(\""+id+"\")'>设为主页</a>"+
								    	"|<a href='#' onclick=showUrl(event,'"+full.micro_url+"')>链接</a>"
							    	}else if(full.micro_main==0){
							    		operation = "<a onclick='updatePageInfo(\""+id+"\")' href='#'>编辑</a>"+
								    	"|店铺主页"+
								    	"|<a href='#' onclick=showUrl(event,'"+full.micro_url+"')>链接</a>"
							    	}
							    	return operation;  
							    }
							  }
	                     ],
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/webstore/pageinfo/queryPageInfoList.action",
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
 * 修改微页面
 */
function updatePageInfo(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/webstore/webpage/updatePageinfo.jsp?id="+id
}



/**
 * 在每一行的左侧弹出链接
 */
function showUrl(e,micro_url){
	var x=e.pageX;
	var y=e.pageY;
	var url = getRootPath()+'/pages/webstore/webpage/showUrl_pageInfo.jsp?micro_url='+micro_url;
	layer.open({
		title: ''
        ,type: 2
        ,closeBtn: 0
        ,id: 'promotion' //防止重复弹出
        ,area:["430px","50px"]
        ,offset: [y-20,x-450]
        ,content:url
       //,btnAlign: 'c' //按钮居中
       //,shade: 0 //不显示遮罩
        ,shadeClose :true //是否点击遮罩关闭
        ,yes: function(){
          layer.closeAll();
        }
      });
}


/**
 * 删除微页面
 */
function deletePageInfo(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/webstore/pageinfo/deletePageInfo.action",
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


/**
 * 设为主页
 */
function setPageInfoIndex(id){
	parent.layer.confirm('确定设置为主页吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/webstore/pageinfo/updatePageInfoIndex.action",
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


/**
 * 复制
 */
function copyPageInfo(id){
	parent.layer.confirm('确定复制吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/webstore/pageinfo/copyPageInfo.action",
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


/**
 * 初始化微页面分类下拉框内容
 */
function initPageGroup(){
		$.ajax({
	        url : getRootPath()+"/webstore/pageinfo/queryPageGroupList.action",
	        type : "post",
	        async: false,
	        "dataType":"json",
	        success : function (gdata) {
	        	if(gdata!=null){
	        		 var glist=gdata.data;
	        		 $("#group_id").append("<option value=''>全部分类</option>"); 
	  	             for(var i=0;i<glist.length;i++){
	  	            	 var gindex=glist[i];
	  	            	 var id=gindex.id;
	  	            	 var group_name=gindex.group_name;
	  	            	 $("#group_id").append("<option value='"+id+"'>"+group_name+"</option>"); 
	  	             }
	        	}
	        }
	    })
}


//弹出一个新窗口，展示一个微页面的详情，即微页面预览
function openOneWeipage(url){
	window.open(url);
}
layui.use(['layer'], function(){ 
	  layer = layui.layer;
});



$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据
	$('#queryCrawl').click(function(){
		searchPage();
	});
	//添加mission
	$('#callbackCrawl').click(function(){
		window.location.href=getRootPath()+"/pages/crawl/manager/index.jsp";
	});

});


//查询方法
function searchPage(){

    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    var bon_crawl_account_id = theRequest.id;
	 var queryCond = $('#crawlForm').serializeObject();
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
	     	    { "data" : "logo"},
	    	    { "data" : "title"},
	            { "data" : "wechat"},
    			{ "data" : "article_title"},
    			{ "data" : "img_url"},
    			{ "data" : "article_abstract"},
	        ],
	        "columnDefs": [
							{
							    "targets": [0],
							    "data":"logo",
							    "render": function(data, type, full) {
							    	return '<img src='+data+' width="50px;height=50px;">';
							      }
							},
							{
								"targets": [4],
								"data":"logo",
								"render": function(data, type, full) {
									return '<img src='+data+' width="50px;height=50px;">';
								}
							},
							{
							    "targets": [6],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return "<a style='cursor: pointer;' onclick='queryLabel(\""+data+"\")' >查看</a> | "+
                                        "<a style='cursor: pointer;' onclick='queryLabel(\""+data+"\")' >发布</a> | "+
                                        "<a style='cursor: pointer;' onclick='delArticle(\""+data+"\")' >删除</a>";
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/crawlArticle/articlePageList.action",
	                         "type":"post",
	                         "dataType":"json",
	                         'data' : {
	                        	 "queryJsonStr":queryJsonStr,
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


//删除crawl
function delArticle(id){
	layer.confirm('确定要删除这条信息吗？', {
		  btn: ['确定', '取消'] //可以无限个按钮
		}, function(index, layero){
			//按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/crawlArticle/deleteCrawlById.action",
				type:'post',
				dataType:'text',
				async:false,
				data:{
					"id":id
				},
				success:function(data){
					if (jQuery.parseJSON(data).msg=="success") {
						location.reload();
						layer.closeAll();
					} else {
						parent.layer.alert("删除失败,请稍后重试!");
					}
				}
			});
		}, function(index){
			layer.closeAll('dialog');
	});
}


//查看文章
function queryLabel(id){	
	//window.location.href=getRootPath()+"/pages/crawl/manager/addOrUpdateCrawl.jsp?id="+id;
	var width = $(window).width();
	var height = $(window).height();
	var showX = (width/2);
	window.open(getRootPath()+'/pages/crawl/articles/article.jsp?id='+id,'_blank','width=600,height='+height+',top=0px,left='+showX+'px')
}
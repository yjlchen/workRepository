layui.use(['layer'], function(){ 
	  layer = layui.layer;
});

var currPage;
var key;

$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据
	$('#queryCrawl').click(function(){
		searchPage();
	});
	//添加mission
	$('#addCrawl').click(function(){
		window.location.href=getRootPath()+"/pages/crawl/manager/addOrUpdateCrawl.jsp";
	});
});

//查询方法
function searchPage(){
	 key = queryJsonStr;
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
	     	    { "data" : "title"},
	    	    { "data" : "wechat"},
	            { "data" : "logo"},
	            { "data" : "qrcode"},
	            { "data" : "function_description"},
	            { "data" : "account_company"},
	        ],
	        "columnDefs": [
							{
							    "targets": [2],
							    "data":"logo",
							    "render": function(data, type, full) {
							    	return '<img src='+data+' width="50px;height=50px;">';
							      }
							},
							{
							    "targets": [3],
							    "data":"qrcode",
							    "render": function(data, type, full) {
							    	return '<img src='+data+' width="50px;height=50px;">';
							      }
							},
							{
							    "targets": [6],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return "<a style='cursor: pointer;' onclick='queryCrawl(\""+data+"\")' >查看</a> | "+
							    	"<a style='cursor: pointer;' onclick='stateCrawl(\""+data+"\",\""+full.state+"\");'>"+(full.state==1?"禁用":"启用")+"</a>";
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/crawl/queryCrawlPageList.action",
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

//删除crawl
function delCrawl(id){
	layer.confirm('确定要删除这条信息吗？', {
		  btn: ['确定', '取消'] //可以无限个按钮
		}, function(index, layero){
			//按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/crawl/deleteCrawlById.action",
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

function stateCrawl(id, state){
	if (state==1) {
        layer.confirm('确定要禁用这条信息吗？', {
            btn: ['确定', '取消'] //可以无限个按钮
        }, function(index, layero){
            //按钮【按钮一】的回调
            sensAction(id, 0);
        }, function(index){
            layer.closeAll('dialog');
        });
	} else {
        sensAction(id, 1);
	}
}

function sensAction(id, state) {
    $.ajax({
        url : getRootPath()+"/crawl/stateCrawlById.action",
        type:'post',
        dataType:'text',
        async:false,
        data:{
            "id":id,
            "state": state,
        },
        success:function(data){
            if (jQuery.parseJSON(data).msg=="success") {
                parent.layer.alert("操作成功!");
                location.reload();
                layer.closeAll();
            } else {
                parent.layer.alert("操作失败,请稍后重试!");
            }
        }
    });
}


//编辑
function queryCrawl(id){
	window.location.href=getRootPath()+"/pages/crawl/articles/index.jsp?id="+id;
}

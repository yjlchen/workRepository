var commId = getUrlParam("commId");  // 商品id

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页	
	searchPage();	                       //初始数据

	$("#to_return").click(function() {
		location.href = getRootPath() + "/pages/commodity/manage/j_commodity/j_commodityList.jsp";
	});
	$('#to_search').click(searchPage)
});

// 批次列表
function searchPage(){
	//表单
//	 var queryCond = $('#queryform').serializeObject();
	 var batch_num = $('#query_batch_num').val();

//	 queryCond.commodity_id = id;
	 var queryCond = {
		commodity_id: commId,
		batch_num:batch_num
	 }
	 group = $('#batch_list').DataTable({
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
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [   
				{ "data" : "batch_num"},
				{ "data" : "storage_time"},
				{ "data" : "production_date"},
				{ "data" : "expiration_date"},
				{ "data" : "cnt"}
	        ],
             //内容居中显示	 	                     
             "createdRow": function ( row, data, index ) {
 	        	 $(row).children('td').attr('style', 'text-align: center;');
 	        	 if(index % 2 == 1){
 	        		$(row).css("background","#F4F4F4");
 	        	 }
 	        },
             "ajax": {
            	 "type":"post",
                 "url": getRootPath()+"/commodityBatchInfo/queryPageList.action",
                 "dataType":"json",
               // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
                 'data' : {queryJsonStr:JSON.stringify(queryCond)}
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
	 fixHead('batch_list','batch_header');
}
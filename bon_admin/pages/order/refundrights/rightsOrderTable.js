layui.use(['form','layer'], function(){
		  var form = layui.form()
		  ,layer = layui.layer;  
	});
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	lodingOrderTable();
});

/**
 * 加载表
 */
function lodingOrderTable(){
	var queryCond = $('#queryOrderForm').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	$('#atable').DataTable({
		"processing" : true,
		"serverSide" : true,
		"paging" : true,
		"stateSave" : false,
		"autoWidth" : false,
		"ordering" : true,
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
	         { "data" : "id"},
	         { "data" : "handle_way"},
	         { "data" : "order_num"},
	         { "data" : "pay_mount"},
	         { "data" : "refund_money"},
	         { "data" : "apply_refund_time"},
	         { "data" : "commodity_refunds"}
	            
	     ],
	     "columnDefs": [
					{
					    "targets": [1],
					    "data":"order_num",
					    "render": function(data, type, full) {
					    	 if(data=="1"){
					    		 return "仅退款";
					    	 }else{
					    		 return "退货退款";
					    	 }
					    }
					    	
					},{
					    "targets": [2],
					    "data":"order_num",
					    "render": function(data, type, full) {
					    	 return "<a href='../orderdetail/orderDetail.jsp?order_num="+data+"'>"+data+"</a></br>"+full.commodity_name;
					    }
					    	
					},{
					    "targets": [3],
					    "data":"pay_mount",
					    "render": function(data, type, full) {
					    	if(!isNotEmpty(data)){
					    		return "-";
					    	}
					    	return "<font color='#f6a623'>"+data+"</font>";
					    }
					},{
					    "targets": [6],
					    "data":"commodity_refunds",
					    "render": function(data, type, full) {
					    	if(data==6){
					    		return "退款成功";
					    	}else if(data==7){
					    		return "退款失败";
					    	}else if(data==55){
					    		return "仓库已收货";
					    	}else {
					    		return "退款处理中";
					    	}
					    }
					},{
					    "targets": [7],
					    "data":"id",
					    "render": function(data, type, full) {
					    	 return "<a href='#' onclick='dealRefund(\""+data+"\");'>处理退款</a>";
					    }
					}
                	

         ],
         "ajax": {
        	 "type":"post",
             "url": getRootPath()+"/refundrights/queryRefundRightsPageList.action",
             async: false,
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
	        
	fixHead("atable","header");   
}


//点击处理退款按钮时触发
function dealRefund(id){
	window.location.href=getRootPath()+'/refundrights/getRefundRightsMapById.action?id='+id;
}

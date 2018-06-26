$(function() {
//	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据	
});




/**
* 加载表格
*/
function searchPage() {
	$('#eaTable').DataTable(
				{
					"processing" : true,
					"serverSide" : true,
					"paging" : true,
					"stateSave" : false,
					"autoWidth" : false,
					"ordering" : false,
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
					              { "data" : "id" },
					              { "data" : "commodity_name" },
					              { "data" : "returns_num" },
					              { "data" : "refund_money" },
					              { "data" : "buyer_refund_reason" },
					              { "data" : "buyer_return_goods_time" },
					              { 
					 	        	 "data" : "id",
					 	        	 "render": function (data, type, full, meta) {
					 	        			 return "<a style='cursor: pointer;'  onclick='solve(\""+data+"\");'>确定收货</a>"
					 	        	 }
					 	         }
					],
					"ajax" : {
						"type" : "post",
						"url" : getRootPath()+"/receiveGoods/queryList.action",
						"dataType" : "json",
						'data' : {
							
						}
					},
			
					
					"language" : {
						"lengthMenu" : "每页显示 _MENU_ 条记录",
						"zeroRecords" : "暂无数据",
						"info" : " _PAGE_ / _PAGES_",
						"infoEmpty" : "没有数据",
						"infoFiltered" : "(filtered from _MAX_ total records)",
						"emptyTable" : "没有数据",
						"info" : "当前显示第 _START_ 到第 _END_ 条,共 _TOTAL_ 条记录",
						"infoEmpty" : "显示第 0 到第 0 条（总 0 条）",
						"infoFiltered" : "(来自 _MAX_ 条的过滤数据)",
						"infoPostFix" : "",
						"thousands" : ",",
						"loadingRecords" : "载入中...",
						"processing" : "处理中...",
						"search" : "搜索：",
						"zeroRecords" : "无相关数据",
						"paginate" : {
							"first" : "首页",
							"last" : "尾页",
							"next" : "下一页",
							"previous" : "上一页"
						},
						"aria" : {
							"sortAscending" : ": 升序排列",
							"sortDescending" : ": 降序排列"
						}

					}
				});
	
}



/**
 * 确定收货
 * @param id
 */
function solve(id){
	location.href = getRootPath() + "/pages/bon/warehouse/toreceive.jsp?id="+id;
}
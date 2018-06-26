var type;//要更换的仓库  1：济南仓  2：香港仓
var order_num;
$(function() {
//	searchPage();//进入页面查询所有数据	
	
	$('#query').click(function(){//查询数据
		if(isNotEmpty($("#order_num").val())){
			$("#tableD").show();
			searchPage();
		}else{
			layui.use(['form','layer'], function(){
				var layer = layui.layer;
				layer.msg('订单号不能为空', {
					  icon: 2,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						layer.closeAll();
				});
			})
		}
	});
	
	$("#change").click(function(){
		parent.layer.confirm('确定要更换发货仓库吗？', {
			  btn: ['是', '否'] //可以无限个按钮
			}, function(index, layero){
			  //按钮【按钮一】的回调
				$.ajax({
			        url : getRootPath()+"/order/updateWarehouse.action",
			        type : "post",
			        data : {
			            order_num : order_num,
			            type:type
			        },
			        datatype : "text",
			        success : function (data) {
			        	if(data=="success"){
			        		parent.layer.msg('提交成功', {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									searchPage();
									parent.layer.closeAll();
							});
			        	}else{
			        		var text;
			        		if(type==1){
			        			text="济南仓库存不足，无法更换为济南仓发货"
			        		}else{
			        			text="香港仓库存不足，无法更换为香港仓发货"
			        		}
			        		parent.layer.msg(text, {
								  icon: 2,
								  time: 1000
							}, function(){
								parent.layer.closeAll();
							});
			        	}
			        },
			        error:function(){
			        	parent.layer.msg('提交失败，请刷新页面重试', {
							  icon: 2,
							  time: 1000
						}, function(){
							parent.layer.closeAll();
						});
			        }
			    })
			}, function(index){
			  //按钮【按钮二】的回调
				parent.layer.closeAll('dialog');
			}
		);
	})
});
/**
* 加载表格
*/
function searchPage() {
	var queryCond = {order_num:$("#order_num").val()}
	var queryJsonStr = JSON.stringify(queryCond);
	$('#eaTable').DataTable(
				{
					"processing" : true,
					"serverSide" : true,
					"paging" : false,
					"stateSave" : false,
					"autoWidth" : false,
					"ordering" : false,
					"info" : false,
					"bDestroy" : true,
					"createdRow" : function(row, data, index) {
						$(row).children('td').attr('style','text-align:center;');
						if (index % 2 == 1) {
							$(row).css("background", "#F4F4F4");
						}
					},
					"searching" : false,
					"sDom" : '<"info-toolbar">rtilp',
					"columns" : [
					              { 
					 	        	 "data" : "img_path_str",
					 	        	 "render": function (data, type, full, meta) {
					 	        		 return "<img width='80px' src='"+data+"'/>"
					 	        	 }
					 	          },
					              { "data" : "commodity_name" },
					              { "data" : "order_num" },
					              { "data" : "unit_price" },
					              { "data" : "amount" },
					              { "data" : "specifications_name" },
					              { "data" : "warehouse_type" }
					],
					"columnDefs" : [
						
					],
					"ajax" : {
						"type" : "post",
						"url" : getRootPath()+"/order/queryWarehouseList.action",
						"dataType" : "json",
						'data' : {
							queryJson : queryJsonStr
						},
						"complete":function(result){
							if(result.responseJSON.data.length>0){
								if(result.responseJSON.data[0].warehouse_type=='香港仓'){
									type="1";
								}else{
									type="2";
								}
								order_num=result.responseJSON.data[0].order_num;
								$("#change").show();
							}else{
								$("#change").hide();
							}
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

var brandId;;
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据
	$('#queryBrandInfo').click(function(){
		searchPage();
	});	
});

layui.use(['form','layer'],function(){
	var form = layui.form();
	var layer = layui.layer;

	//添加品牌
	$('#addBrand').click(function(){
		location.href = getRootPath()+"/pages/marketing/goodsbrand/addGoodsbrand.jsp"
	});

});

//查询方法
function searchPage(){
	//查询学生信息。先得到name的值
	 var queryCond = $('#brandForm').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 var cust = $('#brand_list').dataTable({
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
	            { "data" : "brand_country"},
	            { "data" : "brand_name"},
	            { "data" : "brand_icon_url"},
	            { "data" : "brand_back_img"},
	            { "data" : "create_time"},
	            { "data" : "brand_content"}
	        ],
	        "columnDefs": [
							{
							    "targets": [2],
							    "data":"brand_icon_url",
							    "render": function(data, type, full) {
							    	return "<td><img style='width：50px;height:50px;' src="+data+"></td>";
							      }
							},
							{
							    "targets": [3],
							    "data":"brand_back_img",
							    "render": function(data, type, full) {
							    	return "<td><img style='width：50px;height:50px;' src="+data+"></td>";
							      }
							},
							{
							    "targets": [6],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return "<a style='cursor: pointer;' onclick='editBrand(\""+data+"\")' >编辑</a> | "+
							    	"<a style='cursor: pointer;' onclick='delBrand(\""+data+"\");'>删除</a>";
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/goodsBrand/queryGoodsBrandPageList.action",
	                         "type":"post",
	                         "dataType":"json",
	                         // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
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

//编辑
function editBrand(id){
	location.href = getRootPath()+"/pages/marketing/goodsbrand/addGoodsbrand.jsp?id="+id;
}

//删除品牌
function delBrand(id){
	layer.confirm('确定要删除这条信息吗？', {
		  btn: ['确定', '取消'] //可以无限个按钮
		}, function(index, layero){
			//按钮【按钮一】的回调
			$.ajax({
				url:getRootPath()+'/goodsBrand/queryCommodityListByBrandId.action',
				type:'post',
				dataType:'text',
				async:false,
				data:{
					"brandId":id
				},
				success:function(result){
					if(result=="0"){
						$.ajax({
							url:getRootPath()+'/goodsBrand/deleteGoodsBrandInfo.action',
							type:'post',
							dataType:'text',
							async:false,
							data:{
								"id":id
							},
							success:function(data){
								location.reload();
								layer.closeAll();
							}
						});
					}else{
						layer.alert("该品牌有商品正在使用，不允许删除。");
					}
					
				}
			});
		}, function(index){
			layer.closeAll('dialog');
	});

}

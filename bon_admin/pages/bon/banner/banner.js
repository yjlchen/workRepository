var bannerId=null;
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据
	
	$('#queryBannerInfo').click(function(){
		searchPage();
	});
	//添加banner
	$('#addBanner').click(function(){
		window.location.href=getRootPath()+"/pages/bon/banner/addOrUpdateBanner.jsp";
	});
});




//查询方法
function searchPage(){
	//查询学生信息。先得到name的值
	 var queryCond = $('#bannerForm').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 var cust = $('#banner_list').dataTable({
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
	            { "data" : "banner_img_url"},
	            { "data" : "link_type"},
	            { "data" : "my_title"},
	            { "data" : "is_featured"},
	            { "data" : "last_update_time"}
	        ],
	        "columnDefs": [
							{
							    "targets": [1],
							    "data":"banner_img_url",
							    "render": function(data, type, full) {
							    	return '<img src='+data+' width="50px;height=50px;">';
							      }
							},
							{
							    "targets": [2],
							    "data":"link_type",
							    "render": function(data, type, full) {
							    	var typeStr = "";
							    	if(data=="1"){
							    		typeStr = "商品详情";
							    	}else if(data == "2"){
							    		typeStr = "咨询详情";
							    	}else if(data == "3"){
							    		typeStr = "音频总计";
							    	}else if(data == "4"){
							    		typeStr = "视频详情";
							    	}
							    	return '<span>'+typeStr+'</span>';
							      }
							},
							{
							    "targets": [4],
							    "data":"is_featured",
							    "render": function(data, type, full) {
							    	var isStr = "";
							    	if(data=="1"){
							    		isStr = "主推";
							    	}else{
							    		isStr = "非主推";
							    	}
							    	return '<span>'+isStr+'</span>';
							      }
							},
							{
							    "targets": [6],
							    "data":"id",
							    "render": function(data, type, full) {
							    	return "<a style='cursor: pointer;' onclick='editBanner(\""+data+"\")' >编辑</a> | "+
							    	"<a style='cursor: pointer;' onclick='delBanner(\""+data+"\");'>删除</a>";
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/homeBanner/queryBannerList.action",
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
layui.use(['layer','form','element'], function(){ 
		  layer = layui.layer;
})
//删除banner
function delBanner(id){
	layer.confirm('确定要删除这条信息吗？', {
		  btn: ['确定', '取消'] //可以无限个按钮
		}, function(index, layero){
			//按钮【按钮一】的回调
			$.ajax({
				url:getRootPath()+'/homeBanner/deleteBannerInfo.action',
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
		}, function(index){
			layer.closeAll('dialog');
	});
}

//编辑
function editBanner(id){
	window.location.href=getRootPath()+"/pages/bon/banner/addOrUpdateBanner.jsp?id="+id;
}

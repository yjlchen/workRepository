//商品分组列表js
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();	
});


layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
	      
		  //弹出新增页面
		  $("#addCommodityGroup").click(function(){
			  parent.layer.open({
				  title:"新建商品分组",
				  type: 2,
				  area: ['500px', '500px'],
				  content: getRootPath()+'/pages/commodity/group/addOrUpdateCommodityGroup.jsp' 
			  });
		});

})
//查询商品分组
function searchPage(){
	 var queryCond = $('#queryform').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 group = $('#group_list').DataTable({
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
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [   
	            { "data" : "commodity_group_name"},
	            { "data" : "commodity_num"},
	            { "data" : "tariff_rate"},
	            { "data" : "enlistment_amount"},
	            { "data" : "create_time"},
	            { "data" : "create_user"},
	            { "data" : "last_update_time"},
	            { "data" : "update_user"},
	        ],
	        "columnDefs": [
							{
							    "targets": [8],
							    "data":"commodity_group_id",
							    "render": function(data, type, full) {
							    	var operation = 
							    		"<a onclick='updateCommodityGroup(\""+data+"\")' href='#'>编辑</a>|" + 
								    	"<a href='#' onclick='deleteCommodityGroup(\""+data+"\",\""+full.commodity_num+"\")'>删除</a>"
							    	return operation;
							    }
							  }							
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                         $(row).children('td').eq(3).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(4).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(5).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(6).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(7).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(0).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(1).attr('style', 'text-align: center;')
	                         $(row).children('td').eq(2).attr('style', 'text-align: center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/group/queryGroupPageList.action",
	                         "dataType":"json",
	                       // 没有数据也要这种格式写，为保证后台分页工具接收分页参数
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
	 fixHead('group_list','group_header');
}
/**
 * 修改商品分组
 */
function updateCommodityGroup(id){
	layui.use('layer', function(){
		  var layer = layui.layer;
		  parent.layer.open({
			  title:"修改商品分组",
			  type: 2,
			  area: ['500px', '500px'],
			  content: getRootPath()+'/pages/commodity/group/addOrUpdateCommodityGroup.jsp?type=2&id='+id ,
			  data:{"id":id}
		  });
	});
}
/**
 * 删除商品分组
 */
function deleteCommodityGroup(id,commodity_num){
	if(commodity_num>0){
		layer.open({
			  title: '无法删除'
			  ,content: '该分组下已有商品！'
			});    
	}else{
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/group/deleteCommodityGroup.action",
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
}

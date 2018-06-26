/**
 * 满减送列表页js
 */
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("fullReduce_flag");
//alert(flag);

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	 searchPage();	                         //初始数据
});  
layui.use(['form','element'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
	  
	  $("#to_create_fullReduce").click(function(){
			 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
			 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/fullReduce/fullReduceEdit.jsp"
		});
})

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(couponTab)', function(data){
		  var index = data.index ; // index:0 所有;  1 未开始; 2进行中;  3已结束
		  $("#fullReduce_flag").val(index);
		  searchPage();	
		});
	 /**从其他页面返回该页面时，进行判断显示哪个选项卡**/
	 //未开始
	 if(flag=="1"){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(1)").addClass("layui-this");
			$("#fullReduce_flag").val(flag);
			searchPage();	
		}
	 //进行中
	 else if(flag=="2"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(2)").addClass("layui-this");
	 		$("#fullReduce_flag").val(flag);
	 		searchPage();	
		}
	//已结束
	 else if(flag=="3"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(3)").addClass("layui-this");
	 		$("#fullReduce_flag").val(flag);
	 		searchPage();	
		}
}

function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 group = $('#group_list').DataTable({
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
	        "createdRow": function ( row, data, index ) {
	        	if(index % 2 == 1){
	        		$(row).css("background","#F4F4F4");
	        	}
	        },
	        fixedColumns: { //固定列的配置项
                leftColumns: 1 //固定左边第一列
            },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [
	            //活动名称
				{ "data" : "full_reduce_name"},
				//有效时间
				{ "data" : "","sDefaultContent" : ""},
				//活动状态
				{ "data" : "full_reduce_flag"},
				//操作
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [1],
								"render": function(data, type, full,meta) { 
									return full.full_reduce_active_stime+"至"+full.full_reduce_active_etime;
							    }
							},
							{
								"targets": [3],
								"data":"id",
								"render": function(data, type, full, meta) {
									return  fullReduceAction(full);
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').eq(1).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(2).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(3).attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/fullReduce/queryFullReducePageList.action",
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





//组装操作列
function fullReduceAction(full){
	var str =  
		   '<a href="#" onclick=update_fullReduce(\"'+full.id+'\") >编辑</a>'
	       +'-<a href="#" onclick=del_fullReduce(\"'+full.id+'\") >删除</a>'
	       +'-<a href="#" onclick=add_label(\"'+full.id+'\") >标签设置</a>';
	return str;
}
//加标签
function add_label(id){
	parent.layer.open({
		 title:'标签设置',
		 type: 2,
		 content: getRootPath() + '/pages/marketing/fullReduce/addLabel.jsp?functionId='+id,
		 area: ['400px', '350px']
	});
}
//编辑折扣活动
function update_fullReduce(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/fullReduce/fullReduceEdit.jsp?id="+id+"&type=2";
}


//删除折扣活动
function del_fullReduce(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/fullReduce/deleteFullReduce.action",
		        type : "post",
		        data : { id : id},
		        datatype : "text",
		        success : function (data) {
		        	if(data=="success"){
		        		layer.msg("删除成功", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        		searchPage();	
		        	}else{
		        		layer.msg("删除失败", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        	}
		        	parent.layer.closeAll();
		        },
				error:function(){
					layer.msg("删除失败", {
		      			  icon: 6,
		      			  time: 1000 //（如果不配置，默认是3秒）
		      			});
					parent.layer.closeAll();
				}
		    })
		}, function(index){
		});
}



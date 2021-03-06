/**
 * 拼团列表页js
 */
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("groupon_flag");
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
	 
	  initEvent(form);
})
/**
 * 事件初始
 */
function initEvent(form){
	 $("#to_create_groupon").click(function(){
		 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/groupon/grouponEdit.jsp";
	});
}

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(couponTab)', function(data){
		  var index = data.index ; // index:0 所有;  1 未开始; 2进行中;  3已结束
		  $("#groupon_flag").val(index);
		  searchPage();	
		});
	 /**从其他页面返回该页面时，进行判断显示哪个选项卡**/
	 //未开始
	 if(flag=="1"){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(1)").addClass("layui-this");
			$("#groupon_flag").val(flag);
			searchPage();	
		}
	 //进行中
	 else if(flag=="2"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(2)").addClass("layui-this");
	 		$("#groupon_flag").val(flag);
	 		searchPage();	
		}
	//已结束
	 else if(flag=="3"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(3)").addClass("layui-this");
	 		$("#groupon_flag").val(flag);
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
				//{ "data" : "groupon_name"},
				{ "data" : "","sDefaultContent" : ""},
				//有效时间
				{ "data" : "","sDefaultContent" : ""},
				//活动状态
				{ "data" : "groupon_flag"},
				//操作
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [0],
								"render": function(data, type, full,meta) { 
									return '<a href="javascript:;" onclick=openNewWindow("'+full.commodity_url+'") >'+full.groupon_name+'</a>'
							    }
							},
							{
								"targets": [1],
								"render": function(data, type, full,meta) { 
									return full.groupon_active_stime+"至"+full.groupon_active_etime;
							    }
							},
							{
								"targets": [3],
								"data":"id",
								"render": function(data, type, full, meta) {
									//操作显示的内容，也要根据判断显示
									return  grouponAction(full);
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').eq(2).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(3).attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/groupon/queryGrouponPageList.action",
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
 * 推广
 */
function promotion(id,commodity_url,e){
	/*var x=e.pageX;
	var y=e.pageY;
	var url=getRootPath()+'/pages/commodity/manage/promotion.jsp?id='+id+'&commodity_url='+commodity_url;
	layer.open({
		title: ''
        ,type: 2
        ,closeBtn: 0
        ,offset:'r'
        ,id: 'promotion' //防止重复弹出
        ,area:["400px","320px"]
	    ,offset: [y-150,x-450]
        ,content:url
        ,btn: '关闭全部'
        ,btnAlign: 'c' //按钮居中
        ,shade: 0 //不显示遮罩
        ,yes: function(){
          layer.closeAll();
        }
      });*/
}

/**
 * 编辑拼团信息
 */
function upGroupon(id,groupon_flag){
	if(groupon_flag=="进行中"){
		var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/groupon/grouponUpdateGoing.jsp?id="+id
	}else if(groupon_flag=="未开始"){
		var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/groupon/grouponUpdateNotStarted.jsp?id="+id
	}
}


/**
 * 查看拼团信息
 */
function viewGroupon(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/groupon/grouponView.jsp?id="+id
}


//组装操作列
function grouponAction(full){
	var str = "";
	if(full.groupon_flag=="已结束"){
		str = '<a href="#" onclick=viewGroupon(\"'+full.id+'\") >查看</a>'
		+'-<a href="#" onclick=del_groupon(\"'+full.id+'\") >删除</a>';
	}else{
		str = '<a href="#" onclick=upGroupon(\"'+full.id+'\",\"'+full.groupon_flag+'\") >编辑</a>'
			//+'-<a href="#" onclick=viewGroupon(\"'+full.id+'\") >查看</a>'
		}
	return str;
}




//删除拼团
function del_groupon(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/groupon/deleteGroupon.action",
		        type : "post",
		        data : { id : id},
		        datatype : "text",
		        success : function (data) {
		        	if(data && data=="success"){
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


//弹出一个新窗口，展示商品详情，即商品详情页预览
function openNewWindow(url){
	window.open(url+"?toview=frompc");
}

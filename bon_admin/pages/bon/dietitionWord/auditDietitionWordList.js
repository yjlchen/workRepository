/**
 * 审核营养师说说列表页js
 */
//获得状态标志，用来展示其他页面选中的选项卡
var flag = getUrlParam("status_flag");
$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	 if(flag){//如果是从编辑或者新增页面跳转，同步相同的选项卡
		 var flagInt =parseInt(flag)-1;
			$("ul li").removeClass("layui-this");
			$("ul li:eq("+flagInt+")").addClass("layui-this");
			$("#status_flag").val(flag);
			flag=null;//跳转到当前页面后将跳转选项卡参数置空
		}
	 searchPage();	 //初始数据
});  
layui.use(['form','element','laydate'], function(){ 
	  var form = layui.form(),element = layui.element(),laydate = layui.laydate;
	 
	  
	  element.on('tab(couponTab)', function(data){
		  var index = data.index+1 ; // index:0 草稿;  1 已提交待审核	; 2审核通过;  3已驳回
		  $("#status_flag").val(index);
		  searchPage();	
		});
	  
})



function searchPage(){
     var queryCond = $('#queryform').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 group = $('#word_list').DataTable({
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
	            //说说内容
				{ "data" : "content"},
				//添加时间
				{ "data" : "add_time","" : ""},
				//提交人
				{ "data" : "wx_name","" : ""},
				//发布时间
				{ "data" : "publish_time"},
				//说说状态
				{ "data" : "status"},
				//操作
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
							    "targets": [4],
							    "data":"status",
							    "render": function(data, type, full) {
							    	var sta = "无";
							    	if(data==0){
							    		sta = "草稿";
							    	}else if (data==1){
							    		sta = "待审核";
							    	}else if (data==2){
							    		sta = "审核通过";
							    	}else if (data==3){
							    		sta = "已驳回";
							    	}
							    	return sta;
							      }
							},
							{
								"targets": [5],
								"data":"id",
								"render": function(data, type, full, meta) {
									//操作显示的内容，也要根据说说的状态判断显示
									return  discountAction(full);
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').eq(1).attr('style', 'text-align:center;');
	                    	 $(row).children('td').eq(2).attr('style', 'text-align:center;');
	                    	 $(row).children('td').eq(3).attr('style', 'text-align:center;');
	                    	 $(row).children('td').eq(4).attr('style', 'text-align:center;');
	                    	 $(row).children('td').eq(5).attr('style', 'text-align:center;');
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/dietitian/queryAuditDietitianWordPageList.action",
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
	 fixHead('word_list','word_header');
}



//组装操作列
function discountAction(full){
	var str= '<a href="#" onclick=query_word(\"'+full.id+'\",\"'+full.status+'\") >查看</a>';
	
	//说说是待审核状态时,可审核
	 if(full.status=="1"){
		str = '<a href="#" onclick=audit_word(\"'+full.id+'\",\"'+full.status+'\") >审核</a>';
	}
	
	return str;
}

function audit_word(id,status){
 var flag =  $("#status_flag").val();
 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
 parent.document.getElementById(data_pjax).src=getRootPath()+
 				"/pages/bon/dietitionWord/auditDietitionWord.jsp?id="+id+"&status="+status+"&flag="+flag ;
  
}

function query_word(id,status){
	 var flag =  $("#status_flag").val();
	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+
	 				"/pages/bon/dietitionWord/dietitionWord_readonly.jsp?id="+id+"&status="+status+"&flag="+flag ;
	  
	}




var flag=getUrlParam("flag");
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	 tabStatus()
	initevent();
});
layui.use(['form','element','layer','laydate'], function(){ 
	  var form = layui.form;
	  element = layui.element
	  ,layer = layui.layer;
	  fun_element(element);
	  laydate = layui.laydate;
	  laydate.render({
		  elem: '#start_time' //指定元素
	  });
	  laydate.render({
		  elem: '#end_time' //指定元素
	  });
})

function tabStatus(){
	if(flag==''){
		 searchPage();	
	}else {
		if(flag==1){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(1)").addClass("layui-this");
			$("#status").val(flag);
			searchPage();
		}else if(flag==2){	
			$("ul li").removeClass("layui-this");
			$("ul li:eq(2)").addClass("layui-this");
			$("#status").val(flag);
			searchPage();
			
		}else if(flag==3){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(3)").addClass("layui-this");
			$("#status").val(flag);
			searchPage();
		}
	}

	searchPage();
	
}
/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(commodityTab)', function(data){
		 //$("#chk_all").get(0).checked=false;
		  var index = data.index ; // index0:已保存；1：待审核；2：已发布（审核通过）； 3.  驳回
		 $("#status").val(index);
		 if(0==index){
		  searchPage();	
		  $("#addBtn").show();
		 }else if(1==index){
			 $("#addBtn").hide();
			 searchPage();	
		 }else if(2==index){
			 $("#addBtn").hide();
			 searchPage();	
		 }else if(3==index){
			 $("#addBtn").hide();
			 searchPage();	
		 }
		});
	   
}

//商品列表
var status="";
function searchPage(){
	
	var queryCond =$('#queryform').serializeObject();
	//审核标志
	queryCond.check_flag = 1;
	var queryJsonStr=JSON.stringify(queryCond);
	
	 group = $('#video_list').DataTable({
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
				{ "data" : "title"},
				{ "data" : "wx_name"},
				{ "data" : "add_time"},
				{ "data" : "is_pay"},
				{ "data" : "real_play_amount"},
				{ "data" : "unreal_play_amount"},
				{ "data" : "real_collect_amount"},
				{ "data" : "unreal_collect_amount"},
				{ "data" : "real_praise_amount"},
				{ "data" : "unreal_praise_amount"},
				{ "data" : "real_evaluate_amount"},
				{ "data" : "unreal_evaluate_amount"}
	        ],
	        "columnDefs": [	
							{
								"targets": [3],
								"data":"is_pay",
								"render": function(data, type, full, meta) {	
									if(data==1){
										return "收费"
									}else if(data==0){
										return "免费"
									}
								}
							},
							{
								"targets": [10],
								"data":"real_evaluate_amount",
								"render": function(data, type, full, meta) {	
									return '<a href="#" onclick=preview_video(\"'+full.id+'\")>'+full.real_evaluate_amount+'</a>'
								}
							},
							{
								"targets": [11],
								"data":"unreal_evaluate_amount",
								"render": function(data, type, full, meta) {	
									return '<a href="#" onclick=preview_video(\"'+full.id+'\")>'+full.unreal_evaluate_amount+'</a>'
								}
							},
							{
								"targets": [12],
								"data":"id",
								"render": function(data, type, full, meta) {
									 if(full.status==0){//baocun
											 return '&nbsp;<a href="#" onclick=update_video("'+full.id+'","'+full.status+'") >编辑</a>'
										       +'-<a href="#" style="color:red" onclick=commitVideoInfo("'+full.id+'") >提交</a>'
										       +'-<a href="#" onclick=del_video("'+full.id+'") >删除</a>'
										       +'-<a href="#" onclick=preview_video("'+full.id+'") >预览</a>'
										       +'-<a href="#" onclick=ivaeVirtualEvaluate("'+full.id+'","'+full.title+'","'+full.emp_id+'","'+full.status+'") >虚拟评论</a>';
										
									 }else if(full.status==1){
										 return  '<a href="#" onclick=preview_video("'+full.id+'") >预览</a>'
										 +'-<a href="#" onclick=ivaeVirtualEvaluate("'+full.id+'","'+full.title+'","'+full.emp_id+'","'+full.status+'") >虚拟评论</a>';
											
									 }else if(full.status==2){
										 return '&nbsp;<a href="#" onclick=update_video("'+full.id+'","'+full.status+'") >编辑</a>'
									       +'-<a href="#" onclick=del_video("'+full.id+'") >删除</a>'
									       +'-<a href="#" onclick=preview_video("'+full.id+'") >预览</a>'
									       +'-<a href="#" onclick=ivaeVirtualEvaluate("'+full.id+'","'+full.title+'","'+full.emp_id+'","'+full.status+'") >虚拟评论</a>';
											
									 }else if(full.status==3){
										 return '&nbsp;<a href="#" onclick=update_video("'+full.id+'","'+full.status+'") >编辑</a>'
									       +'-<a href="#" onclick=del_video("'+full.id+'") >删除</a>'
									       +'-<a href="#" style="color:red" onclick=showReason(\"'+full.id+'\") >原因查看 </a>'
									 }
						
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').attr('style', 'text-align: center;');
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/video/queryVideoPageList.action",
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
	
}

function initevent(){
	//点击添加
	$('#save').click(function(){
		 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/video/addVideo.jsp"
	});
$("#queryRecordInfo").click(function(){
	searchPage();
})
	
}

//编辑
function update_video(id,status){
	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+'/pages/bon/video/addVideo.jsp?id='+id+"&flag="+status;
}
function  del_video(id){
		parent.layer.confirm('您确定要删除么？', {icon: 3, title:'提示'}, function(index){
		$.ajax({
			url:getRootPath()+'/video/deleteVideoById.action',
			type:'post',
			dataType:'text',
			async:false,
			data:{
				"id":id
			},
			success:function(data){
				if("success"==data){
					searchPage();	
					parent.layer.close(index);
				}else{
					alertErrorMsg("删除失败");   
				}
			}
		});
	});
}
function showReason(id){
	  parent.layer.open({
		  title:"查看驳回原因",
		  text:"ff",
		  type: 2,
		  area: ['500px', '300px'],
		  content: getRootPath()+'/pages/bon/video/showReason.jsp?id='+id
	  });
}
function preview_video(id){
	var status =  $("#status").val();
	window.location.href=getRootPath()+"/pages/bon/video/videoPreview.jsp?id="+id+"&flag="+status;
}
function ivaeVirtualEvaluate(id,title,emp_id,status){
	window.location.href=getRootPath()+"/pages/cm/virtualevaluate/ivaeVirtualEvaluate.jsp?resource_id="+id+"&title="+title+"&belong_id="+emp_id+"&type=2&page=/pages/bon/video/videoManage.jsp?flag="+status;
}
function alertErrorMsg(msg) {
	layer.msg(msg,{
		icon:2,
		time:2000
	})
}
//提交视频
function commitVideoInfo(id){
	parent.layer.confirm('确定提交吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/video/commitVideo.action",
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



var flag=getUrlParam("flag");
$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	tabStatus();
	$("#queryRecordInfo").click(function(){
		searchPage();
	})
	
});
function tabStatus(){
	if(flag==''||flag==null){
		 searchPage();	
	}else {
		if(flag==1){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(0)").addClass("layui-this");
			$("#status").val(flag);
			searchPage();
		}else if(flag==2){	
			$("ul li").removeClass("layui-this");
			$("ul li:eq(1)").addClass("layui-this");
			$("#status").val(flag);
			searchPage();
			
		}else if(flag==3){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(2)").addClass("layui-this");
			$("#status").val(flag);
			searchPage();
		}
	}

	searchPage();
	
}
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
	  //initEvent(form);
	  //initgroup(form);
})

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(commodityTab)', function(data){
		 //$("#chk_all").get(0).checked=false;
		  var index = data.index ; // index0:已保存；1：待审核；2：已发布（审核通过）； 3.  驳回
		 if(0==index){
			 $("#status").val(1);
		 }else if(1==index){
			 $("#status").val(2);
		 }else if(2==index){
			 $("#status").val(3);
		 }
		 searchPage();	
		 
		});
	   
}

//商品列表
var status="";
function searchPage(){
	
	var queryCond =$('#queryform').serializeObject();
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
						"targets": [12],
						"data":"id",
						"render": function(data, type, full, meta) {
							 if(full.status==1){
									return '&nbsp;<a href="#" onclick=update_video("'+full.id+'","'+full.status+'") >审核</a>'
									      
								 }else if(full.status==3){
									return '<a href="#" onclick=update_video("'+full.id+'","'+full.status+'") >查看</a>';
								 }else{
									 return '<a href="#" onclick=update_video("'+full.id+'","'+full.status+'") >查看</a>-'
									 +'<a href="#" onclick=setFeaturedType("'+full.id+'") >主推设置</a>';
								 }}
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



//编辑
function update_video(id,flag){
	
	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+'/pages/bon/video/checkVideo.jsp?id='+id+"&flag="+flag;
}
function  del_video(id){
	parent.layer.confirm('您确定要删除么？', {icon: 3, title:'提示'}, function(index){
		//需要判断团队底下是否有小组
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
					   window.location.href=getRootPath()+"/pages/bon/video/videoManage.jsp";
					   parent.layer.close(index);
				   }
				
			}
		});
	});
}
function setFeaturedType(id){

	parent.layer.open({
		  title:"主推设置",
		  text:"ff",
		  type: 2,
		  area: ['500px', '300px'],
		  content: getRootPath()+"/pages/bon/video/featuredSetting.jsp?id="+id
	  });

	
}







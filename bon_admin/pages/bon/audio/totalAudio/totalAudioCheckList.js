/**
 * 音频合辑总集审核列表页js
 */
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("flag");

if(flag==null){
	flag = 1;
}
$(function(){  
	 jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	 /**从其他页面返回该页面时，进行判断显示哪个选项卡**/
	 //待审核
	 if(flag=="1"){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(0)").addClass("layui-this");
			$("#flag").val(flag);
			searchPage();	
		}
	 //已发布（审核通过）
	 else if(flag=="2"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(1)").addClass("layui-this");
	 		$("#flag").val(flag);
	 		searchPage();	
		}
	//驳回
	 else if(flag=="3"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(2)").addClass("layui-this");
	 		$("#flag").val(flag);
	 		searchPage();	
		}
});  
layui.use(['form','element'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
})

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(totalAudioTab)', function(data){
		  var index = data.index ; // index对应不同的状态
		  flag = index+1;
		  $("#flag").val(flag);
		  searchPage();	
		});
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
	        fixedColumns: { //固定列的配置项
                leftColumns: 1 //固定左边第一列
            },
	        "searching": false,
	        "sDom":'<"info-toolbar">rtilp',
	        "columns" : [
				{ "data" : "title"},
				{ "data" : "add_time"},
				//音频封面图
				{ "data" : "audio_img_url"},
				//收费金额
				{ "data" : "now_bon_point"},
				//是否完结
				//{ "data" : "","sDefaultContent" : "否"},
				{ "data" : "real_play_amount"},
				{ "data" : "unreal_play_amount"},
				{ "data" : "real_collect_amount"},
				{ "data" : "unreal_collect_amount"},
				//操作
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [2],
								"data":"audio_img_url",
								"render": function(data, type, full,meta) { 
									return '<img src="'+data+'" width="50px;height=50px;">';
							    }
							},
							{
							    "targets": [3],
							    "data":"now_bon_point",
							    "render": function(data, type, full) {
							    	var str = "";
							    	if(data==0){
							    		str = "免费";
							    	}else{
							    		str = data;
							    	}
							    	return str;
							      }
							},
							{
								"targets": [8],
								"data":"id",
								"render": function(data, type, full, meta) {
									//操作显示的内容，也要根据判断显示
									return  totalAudioAction(full);
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, index) {
	                    	 if(index % 2 == 1){
			         	        	$(row).css("background","#F4F4F4");
			         	     }
		                     $(row).children('td').attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/totalAudio/queryTotalAudioCheckPageList.action",
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
function totalAudioAction(full){
		var str = "";
		if(full.status==1){//待审核状态
			str = '<a href="#" onclick=check(\"'+full.id+'\") >审核</a>'
		    ;
		}else if(full.status==2){//审核通过
			str = '<a href="#" onclick=view(\"'+full.id+'\") >查看</a>'
			+'-<a href="#" onclick=featured(\"'+full.id+'\") >主推设置</a>'
		    ;
		}else if(full.status==3){//驳回
			str = '<a href="#" onclick=view(\"'+full.id+'\") >查看</a>'
		    ;
		}
		return str;
}

//审核
function check(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioCheck.jsp?id="+id+"&flag="+flag;
}

//查看
function view(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioView.jsp?id="+id+"&flag="+flag;
}

//主推设置
function featured(id){
	parent.layer.open({
		  title:"主推设置",
		  text:"ff",
		  type: 2,
		  area: ['500px', '300px'],
		  content: getRootPath()+"/pages/bon/audio/totalAudio/featuredSetting.jsp?id="+id
	  });
}

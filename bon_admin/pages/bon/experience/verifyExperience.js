/**
 * 心得管理js 孙荆阁
 */
//获得状态标志，用来判断选项卡选中哪个列表
var backFlag = getUrlParam("backFlag");
var columnShowLength = 40;//默认现实的字符串长度。请根据列宽自行调整。

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	
	//初始化菜单栏
	if (backFlag != null)
		initBackTab();
	
	searchPage();	                         //初始数据
	
});  

//初始化tab的样式，以及status的赋值
function initBackTab(){
	for (var i=1;i<4;i++){
		if (i == backFlag){
			$("#tab"+i).attr("class","layui-this");
		}else{
			$("#tab"+i).removeClass("layui-this");
		}
	}
	$("#status").val(backFlag);
}

layui.use(['form','element','layer','laydate'], function(){ 
	  var form = layui.form
	   ,element = layui.element
	   ,layer = layui.layer
	   ,laydate = layui.laydate;
	  
	  laydate.render({
		  elem: '#date'
	  });
	  laydate.render({
		  elem: '#date1'
	  });
	  
	  fun_element(element);
	  initEvent(form);
	  
	  $('#to_search').click(function(){
		  searchPage();
	  })
	  
})

function initEvent(form){
	 form.on('select(group)', function(data){
		 searchPage();	                         //下拉改变时检索数据
	}); 
}

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 	element.on('tab(commodityTab)', function(data){
		 var index = data.index +1 ; 
		 $("#status").val(index);
		 searchPage();
	});
}

//心得列表
function searchPage(){
	//表单
	 var queryCond = $('#queryform').serializeObject();
	 var queryJsonStr=JSON.stringify(queryCond);
	 group = $('#experience_list').DataTable({
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
				{ "data" : "wx_name"},
				{ "data" : "commodity_name"},
				{ "data" : "price"},
				{ "data" : "experience_content"},
				{ "data" : "score_star"},
				{ "data" : "real_collect_amount"},
				{ "data" : "unreal_collect_amount"},
				{ "data" : "real_praise_amount"},
				{ "data" : "unreal_praise_amount"},
				{ "data" : ""},
				{ "data" : ""},
				{ "data" : "add_time"},
				{ "data" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [1],
								"data":"commodity_name",
								"render": function(data, type, full,meta) { 
									return combin(full);
							    }
							},
							{
								"targets": [2],
								"data":"price",
								"render": function(data, type, full,meta) { 
									var resPri =  '<span style="color:red">￥'+full.price+'</span>';
									var resName =  full.commodity_name;
									return resName + "<br>" + resPri;
								}
							},
							{
								"targets": [3],
								"data":"experience_content",
								"render": function(data, type, full,meta) { 
									if (full.experience_content.length > columnShowLength) {
										return getPartialRemarksHtml(full.experience_content);//显示部分信息
									} else {
										return full.experience_content;//显示原始全部信息 
									}
								}
							},
							
							{
								"targets": [9],//真实评论
								"data":"real_evaluate_amount",
								"render": function(data, type, full,meta) { 
									//var res = '<a href="#" onclick=checkEvaluateAmount('+full.id+","+1+') >'+full.real_evaluate_amount+'</a>';
									//return res;
									return full.real_evaluate_amount
								}
							},
							{
								"targets": [10],//虚拟评论
								"data":"unreal_evaluate_amount",
								"render": function(data, type, full,meta) { 
									//var res = '<a href="#" onclick=checkEvaluateAmount('+full.id+","+2+') >'+full.unreal_evaluate_amount+'</a>';
									//return res;
									return full.unreal_evaluate_amount
								}
							},
	        	
							{
								"targets": [12],
								"data":"id",
								"render": function(data, type, full, meta) {
									//根据 tab进行更改显示
									var tabIndex =  $("#status").val();//0,1,2,3
									var saved = '<a href="#" onclick=verifyExperienceInfo("'+full.id+'") >审核</a>';
									if (tabIndex == 2){
										saved = '<a href="#" onclick=checkExperienceInfo("'+full.id+'")>查看</a>';
									}
									if (tabIndex == 3){
										saved = '<a href="#" onclick=rejectExperienceInfo("'+full.id+'")>驳回原因</a><br>' + '<a href="#" onclick=checkExperienceInfo("'+full.id+'")>查看</a>';
									}
									
									return saved 
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function ( row, data, index ) {
	         	        	$(row).children('td').attr('style', 'text-align: center;');
	         	        	if(index % 2 == 1){
	         	        		$(row).css("background","#F4F4F4");
	         	        	}
	         	        	if(data.experience_content.length > columnShowLength){//只有超长，才有td点击事件
	         	        		$(row).children('td').eq(3).attr('onclick','javascript:changeShowRemarks(this);');
	         	        	}
	         	        	$(row).children('td').eq(3).attr('content',data.experience_content);
	         	        },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/experience/listExperience.action",
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
	 fixHead('experience_list','experience_header');
}
/**
 * 根据id 修改心得
 */
function verifyExperienceInfo(id){
	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/experience/checkExperience.jsp?id="+id+"&checkFlag=1&backFlag="+$('#status').val();
}
/*
 * 显示商品图片
 */
function combin(full){

	var str='<div class="shanpin" style="height:30px">';
	str+='    <div class="shanpinimg">';
	str+='     <img src="'+full.img_path_str.split(",")[0]+'">';
	str+='   </div>';
	str+=' </div>';
	return str;
}

//查看发布的信息，仅供查看
function checkExperienceInfo(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/bon/experience/checkExperience.jsp?id="+id+"&backFlag="+$('#status').val();
}

function rejectExperienceInfo(id){
	parent.layer.open({
		title:"驳回原因",
		type: 2,
		id:100,
		area: ['400px', '530px'],
		content: getRootPath()+'/pages/bon/experience/rejectExperience.jsp?id='+id //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
	});
}
//查看评论的方法
function checkEvaluateAmount(id,flag){
	if (flag == 1){
		//真实
		alert("预留真实方法")
	}
	if (flag == 2){
		//虚拟
		alert("预留虚拟方法")
	}
	
}

function changeShowRemarks(obj){//obj是td
	   var content = $(obj).attr("content");
	   if(content != null && content != ''){
	      if($(obj).attr("isDetail") == 'true'){//当前显示的是详细备注，切换到显示部分
	         //$(obj).removeAttr('isDetail');//remove也可以
	         $(obj).attr('isDetail',false);
	         $(obj).html(getPartialRemarksHtml(content));
	      }else{//当前显示的是部分备注信息，切换到显示全部
	         $(obj).attr('isDetail',true);
	         $(obj).html(getTotalRemarksHtml(content));
	      }
	   }
	}

//部分备注信息
function getPartialRemarksHtml(remarks){
      return remarks.substr(0,columnShowLength) + '&nbsp;&nbsp;<a href="javascript:void(0);" ><b>...</b></a>';
}

//全部备注信息
function getTotalRemarksHtml(remarks){
      return remarks + '&nbsp;&nbsp;<a href="javascript:void(0);" >收起</a>';
}
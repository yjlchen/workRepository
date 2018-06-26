$(function(){
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();//进入页面查询所有数据
	initdata();
	
	$('#queryBannerInfo').click(function(){
		searchPage();
	});	
});

layui.use(['form','layer'],function(){
	var form = layui.form();
	var layer = layui.layer;
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
	        "bLengthChange":true,
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
	        "columns" : [   //和数据库的字段要一致
	            { "data" : "cust_name"},
	            { "data" : "sex"},
	            { "data" : "wx_name"},
	            { "data" : "phone"},
	            { "data" : "label_name"}
	        ],
	        "columnDefs": [
							{
							    "targets": [5],//从下标0开始的。从第5个是自定义的。
							    "data":"id",
							    "render": function(data, type, full) {
							    	return "<a style='cursor: pointer;' onclick='addLabel(\""+data+"\")' >加标签</a> ";
						
							      }
							  }
	                     ],
	                     "ajax": {
	                         "url": getRootPath()+"/customerlabel/queryCustomerLabelsList.action",
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

/**
 * 初始数据
 */
function initdata(){
	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/customerlabel/queryLabels.action',
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(result){
			 if(result){
				 var data=result.data;
				 for(var i=0;i<data.length;i++){
  	            	 var gindex=data[i];
  	            	 var id=gindex.id;
  	            	 var name=gindex.name;
  	            	 $("#label_id").append("<option value='"+id+"'>"+name+"</option>"); 
  	             }
				//原因是$.browser这个api从jQuery1.9开始就正式废除，js代码里只要用到$.browser就会报这个错
	        	//具体的解决方法：注意确保下面代码的加载顺序在jQuery文件之后，$.browser的代码之前。
	        	jQuery.browser={};
	        	(function(){jQuery.browser.msie=false; jQuery.browser.version=0;
	        		if(navigator.userAgent.match(/MSIE ([0-9]+)./))
	        		{ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
	        	//调用chosen插件方法
	        	$("#label_id").chosen();
			 }
		}
	});
};



//给banner添加标签，回显。
function addLabel(id){
	parent.layer.open({
		 title:'加标签',
		 type: 2,
		 content:  getRootPath()+'/pages/customer/customerlabel/addLabel.jsp?customerId='+id,
		 area: ['400px', '350px']
	});
	
}



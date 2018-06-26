$(function(){
	loadingTable();

	$("#add").click(function(){
		window.location.href=getRootPath()+"/pages/homepage/fixedlist/addOrUpdateFixedList.jsp";
	})
})

function loadingTable(){
	$('#fixedlist') .DataTable(
			{

			 	"processing": true,
		        "serverSide": true,
		        "paging":   false,
		        "stateSave":false,
		        "autoWidth":false,
		        "ordering": true,
		        "info":     false,
		        "bLengthChange":  false,
		        "bPaginate":false,
		        "bDestroy": true,
		        "searching": false,
		        "sDom":'<"info-toolbar">rtilp',
		        "columns" : [ 
		                     { "data" : "list_name" },
		                     { "data" : "img_url"},
		                     { "data" : "sort"}
				],
				"columnDefs" : [
					{
						"targets" : [ 1 ],
						"data" : "img_url",
						"render" : function(data, type, full) {
									return '<img style="width: 30px;" src="'+data+'">';
						}
					},
					{
						"targets" : [ 2 ],
						"data" : "sort",
						"render" : function(data, type, full) {
									return '<input type="text" data-id="'+full.id+'" value="'+data+'"/>';
						}
					},
					{
					"targets" : [ 3 ],
					"data" : "id",
					"render" : function(data, type, full) {
						if(full.list_name=="营养保健"||full.list_name=="积分商城"){
							return "<a href='#' onclick=\"updateList('"
							+ data + "')\">编辑</a>";
						}else{
							return "<a href='#' onclick=\"updateList('"
							+ data + "')\">编辑</a> | <a href='#' onclick='deleteList(\""
							+ data + "\")'>删除</a>";
						}
					}
				}],
				"ajax" : {
					"type" : "post",
					"url" : getRootPath()+"/fixedList/findFixedList.action",
					"dataType" : "json",
					'data' : {
                   	 "queryJsonStr":""
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
 * 更新或添加一个固定模块
 * @param id
 */
function updateList(id){
	 window.location.href=getRootPath()+"/pages/homepage/fixedlist/addOrUpdateFixedList.jsp?id="+id;
}

/**
 * 删除一个固定模块
 * @param id
 */
function deleteList(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
		        url : getRootPath()+"/fixedList/deleteFixedList/"+id+".action",
		        type : "post",
		        datatype : "text",
		        success : function (result) {
		        	if(result=="success"){
						parent.layer.msg('删除成功', {
							  icon: 1,
							  time: 1000 //（如果不配置，默认是3秒）
							}, function(){
								loadingTable();
								parent.layer.closeAll();
								
							});
					}else{
						parent.layer.msg('删除失败，请重试', {
							  icon: 2,
							  time: 1000 //（如果不配置，默认是3秒）
							});
					}
		        },
		        error:function(){
		        	parent.layer.msg('错误，请重试', {
						  icon: 2,
						  time: 1000 //（如果不配置，默认是3秒）
						});
		        }
		        
		    })
		}, function(index){
		  //按钮【按钮二】的回调
			parent.layer.closeAll('dialog');
		}
	);
}

/**
 * 确定固定模块显示顺序
 */
function confirm(){
	//有值的input数
	var count=0;
	var jsonArray=[];
	var inputs = $("input");
	var isTrue=true;
	inputs.each(function(){
	    var jsonInfo={};
	    if(isNotEmpty($(this).val())){
	    	count++
	    	if(!(0<$(this).val()&&$(this).val()<11)){
	    		isTrue=false;
	    		parent.layer.msg('排列顺序必须是1-10的数字', {
	    			icon: 2,
	    			time: 1000 //（如果不配置，默认是3秒）
	    		});
	    		return false;
	    	}else{
	    		jsonInfo["id"]=$(this).attr("data-id");
	    		jsonInfo["sort"]=$(this).val();
	    		jsonArray.push(jsonInfo);
	    	}
	    }
	});
	if(isTrue){
		console.log(count)
		if(count!=10&&count!=8&&count!=5&&count!=4){
			parent.layer.msg('设置显示顺序的必须是4、5、8、10个模块', {
				icon: 2,
				time: 2000 //（如果不配置，默认是3秒）
			});
			return false;
		}
		$.ajax({
	        url : getRootPath()+"/fixedList/updateFixedListOrder.action",
	        type : "post",
	        datatype : "text",
	        data:{jsonStr:JSON.stringify(jsonArray)},
	        success : function (data) {
	        	if("fail"==data){
	        		parent.layer.msg('操作失败，请刷新重试', {
						icon: 2,
						time: 1500 //（如果不配置，默认是3秒）
					});
	        	}else{
	        		parent.layer.msg('设置成功', {
						icon: 1,
						time: 1000 //（如果不配置，默认是3秒）
					});
		        	loadingTable();
	        	}
	        }
		})
	}
}
/**
 * 商品管理列表页js
 */
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("flag");
//获得库存数量
var store_count = getUrlParam("store_count");
//定义商品总销量变量，通过ajax获取
//var total_sell_count;
var warehouse_type = 0;   // 香港仓

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();	                         //初始数据
	
});  
layui.use(['form','element','layer'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
	  initEvent(form);
	  initgroup(form);
})
/**
 * 事件初始
 */
function initEvent(form){
	 $("#to_create").click(function(){
		 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/commodity/manage_hongkong/commodityCreate.jsp"
	});
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
		 $("#chk_all").get(0).checked=false;
		  var index = data.index ; // index:0 出售中;  1 已售罄; 2仓库中
		  $("#commodity_status").val(index);
		  searchPage();	
		  if(index==2){
			  $("#upoff").text("上架");
		  }else{
			  $("#upoff").text("下架");
		  }
		});
	   
	 //仓库中列表（下架）
	 if(flag=="2"){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(2)").addClass("layui-this");
			$("#commodity_status").val(flag);
			searchPage();	
		}
	 //判断上架列表
	 else if(flag=="0"){
		 	//库存为0时，显示已售罄列表
		 	if(store_count=="0"){
		 		$("ul li").removeClass("layui-this");
		 		$("ul li:eq(1)").addClass("layui-this");
		 		$("#commodity_status").val("1");
		 		searchPage();	
		 	}
		}
}

//商品列表
function searchPage(){
	var queryCond = $('#queryform').serializeObject();
	if(!warehouse_type && warehouse_type != null) {
		queryCond.warehouse_type = warehouse_type;
	}
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
				{ "data" : "","sDefaultContent" : ""},
				{ "data" : "commodity_name"},
				//{ "data" : "","sDefaultContent" : ""},
				{ "data" : "store_count"},
				//{ "data" : "total_sales"},
				{ "data" : "real_sales"},
				{ "data" : "unreal_total_sales"},
				{ "data" : "create_time"},
				{ "data" : "","sDefaultContent" : ""},
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [{
								"targets": [0],
								"data":"id",
								"render": function(data, type, full, meta) {
								  var cstr='<div class="layui-form" style="text-align:center;"><input name="ck_com" type="checkbox" value="'+full.id+'">';
								  	  cstr+='<div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div>';
								      cstr+="</div>";
								      return cstr;
							  }
							}, {
								"targets": [1],
								"data":"commodity_name",
								"render": function(data, type, full,meta) { 
									return combin(full);
							    }
							},
							//访客数/浏览量
							/*{
								"targets": [2],
								"render": function(data, type, full, meta) {
									var access_count_pv = full.access_count_pv;
									if(access_count_pv==null){
										access_count_pv = 0;
									}
									var access_count_uv = full.access_count_uv;
									if(access_count_uv==null){
										access_count_uv = 0;
									}
									return access_count_uv+"/"+access_count_pv;
								}
							},*/
							//总销量
							/*{
								"targets": [4],
								"render": function(data, type, full, meta) {
									return getTotalSellCount(full);
								}
							},*/
							//真实销量
							{
								"targets": [3],
								"render": function(data, type, full, meta) {
									var real_sales = full.real_sales;
									if(real_sales==null){
										real_sales = 0;
									}
									return real_sales;
								}
							},{

								"targets": [6],
								"data":"label_name",
								"render": function(data, type, full, meta) {
								 	return showColumnValue(full.label_name,10);
								}
							}, {
								"targets": [7],
								"data":"id",
								"render": function(data, type, full, meta) {
									var html = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick=upCommodityInfo("'+full.id+'") >编辑</a>'
								       +'-<a href="#" onclick=del_commodity("'+full.id+'") >删除</a>';
									if(iswareHouseManager == 1 
											&& full.label_name != null && full.label_name.length > 0) {
										html += '-<a href="#" onclick=batchManage(\"'+full.id+'\") >批次管理</a>';
									}
									return html;
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').eq(2).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(3).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(4).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(5).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(6).attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/commodity/queryCommodityPageList.action",
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
 * 初始化分组下拉框内容
 */
function initgroup(form){
		var html = "<option value=''>商品分组</option>";
		$.ajax({
	        url : getRootPath()+"/commodity/queryCommodityGroupList.action",
	        type : "post",
	        dataType:"json",
	        success : function (gdata) {
	        	if(gdata!=null){/*
	        		 var glist=gdata.commodityGroupList;
	        		 $("#group_id").append("<option value=''>所有分组</option>"); 
	  	             for(var i=0;i<glist.length;i++){
	  	            	 var gindex=glist[i];
	  	            	 var id=gindex.id;
	  	            	 var commodity_group_name=gindex.commodity_group_name;
	  	            	 $("#group_id").append("<option value='"+id+"'>"+commodity_group_name+"</option>"); 
	  	             }
	        	*/}
	        
	        	$.each(gdata.commodityGroupList,function(index,item){
					html += '<option value='+item.id+'>'+item.commodity_group_name+'</option>';
				});
	        	
				$("#group_id_select").html(html);
				form.render('select');
	        }
	    })
}
/**
 * 推广商品
 */
function promotion(id,commodity_url,e){
	var x=e.pageX;
	var y=e.pageY;
	var url=getRootPath()+'/pages/commodity/manage_hongkong/promotion.jsp?id='+id+'&commodity_url='+commodity_url;
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
      });
}

/**
 * 根据商品id 修改商品信息
 */
function upCommodityInfo(id){
	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/commodity/manage_hongkong/commodityCreate.jsp?id="+id
}

//组装商品名称
function combin(full){
	var str='<div class="shanpin" style="height:30px">';
	str+='    <div class="shanpinimg">';
	str+='     <img src="'+full.img_path_str.split(",")[0]+'">';
	str+='   </div>';
	str+='   <div>';
	str+='     <h5>'+full.commodity_name+'</h5>';
	/*str+='     <h5><a href="javascript:;" onclick=openNewWindow("'+full.commodity_url+'") >'+full.commodity_name+'</a></h5>';*/
	str+='     <span ><font color="red">￥'+full.price+'</font></span>';
	str+='   </div>';
	str+=' </div>';
	return str;
}

/*
//获得商品总销量（不再ajax调用）
function getTotalSellCount(commodity_id){
	$.ajax({
		url : getRootPath()+"/commodity/getTotalSellCount.action",
        type : "post",
        async:false,
        data : {commodity_id : commodity_id},
        datatype : "text",
        success : function (data) {
        	total_sell_count = data.total_sell_count;
        }
    })
    return total_sell_count;
}*/


//组合商品总销量
function getTotalSellCount(full){
	var total_sell_count = Number(full.total_sales)+Number(full.unreal_total_sales);
	return total_sell_count;
}

//删除商品
function del_commodity(id){
	parent.layer.confirm('商品删除后将无法恢复，确定删除？', {
		  btn: ['永久删除', '再想想'] //可以无限个按钮
		}, function(index, layero){
			id="('"+id+"')";
			  //按钮【按钮一】的回调
				$.ajax({
					url : getRootPath()+"/commodity/deleteCommodity.action",
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
			    })}, function(index){
		});
}
//批量checkbox操作
function to_check(obj){
	var ch=$("input[name='ck_com']");
	var checked=$(obj).prop("checked");
	if($("#chk_all").get(0).checked){
		for(var i=0;i<ch.length;i++)
		{
		 ch[i].checked=true;
		 $(ch[i]).next().addClass("layui-form-checked")
		}
	  }else{  
	  	for(var i=0;i<ch.length;i++)
	  	{
	  	 ch[i].checked=false;
	  	$(ch[i]).next().removeClass("layui-form-checked")
	  	}
	  }
}
//弹出一个新窗口，展示商品详情，即商品详情页预览
function openNewWindow(url){
	window.open(url+"?toview=frompc");
}
/**
 * 批量修改商品分组
 */
function to_upgroup(obj){
	var ids=to_querybatch();
	if(ids==""){
		return ;
	}else{
		//获取改分组的宽度
		var a_width=$(obj).width(); 
		//获取改分组的左偏移量
		var a_left=$(obj).offset().left;
		//获取显示元素的宽度
		var div_width=$("#popover").width();
		//设置显示元素据左边的位置
		var left=a_left;
		var top=$(obj).offset().top-400;
		$("#popover").show();
		$("#popover").css({"left":left,"z-index":1000,"top":top});
	}
}
//点击保存将显示项隐藏
function preserve(){	
	$("#popover").hide();
}
function cancel(){
	$("#popover").hide();
}
/**
 * 批量实现商品下架
 */
function to_upoff(){
	var ids=to_querybatch();
	if(ids==""){
		return ;
	}
	parent.layer.confirm('确定对选中的商品进行'+$("#upoff").text()+'操作吗？', {
		  btn: ['确定', '再想想'] //可以无限个按钮
		}, function(index, layero){
			disabled(1);
			var ifoff="2";            //商品下架
			if(  $("#upoff").text()=="上架"){
				ifoff="0"
			}
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/commodity/updateCommodityToOff.action",
		        type : "post",
		        data : { ids: ids,tag:ifoff},
		        datatype : "text",
		        success : function (data) {
		        	disabled(2);
		        	if(data && data=="success"){
		        		layer.msg($("#upoff").text()+"成功", {
		      			  icon: 6,
		      			  time: 1000 //（如果不配置，默认是3秒）
		      			});
		        		searchPage();	
		        	}else{
		        		layer.msg($("#upoff").text()+"失败", {
			      			  icon: 5,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        	}
		        	parent.layer.closeAll();
		        	
		        },
				error:function(){
					disabled(2);
					layer.msg($("#upoff").text()+"失败", {
		      			  icon: 5,
		      			  time: 1000 //（如果不配置，默认是3秒）
		      			});
					parent.layer.closeAll();
				}
		    })
		}, function(index){
		});
}
/**
 * 批量删除商品
 */
function to_updel(){
	var ids=to_querybatch();
	if(ids==""){
		return ;
	}
	parent.layer.confirm('商品删除后将无法恢复，确定删除？', {
		  btn: ['永久删除', '再想想'] //可以无限个按钮
		}, function(index, layero){
			disabled(1);
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/commodity/deleteCommodity.action",
		        type : "post",
		        data : { id : ids},
		        datatype : "text",
		        success : function (data) {
		        	disabled(2);
		        	if(data && data=="success"){
		        		layer.msg("删除成功", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        		searchPage();	
		        	}else{
		        		layer.msg("删除失败", {
			      			  icon: 5,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        	}
		        	parent.layer.closeAll();
		        },
				error:function(){
					disabled(2);
					layer.msg("删除失败", {
		      			  icon: 5,
		      			  time: 1000 //（如果不配置，默认是3秒）
		      			});
					parent.layer.closeAll();
				}
		    })
		}, function(index){
		});
}
/**
 * 获取选中的商品id集合
 */
function to_querybatch(){
	var idstr="";
	var ch=document.getElementsByName("ck_com");
	for(var i=0;i<ch.length;i++)
	{
	  if(ch[i].checked){
		  idstr+="'"+ch[i].value+"',";
	  }
	}
	if(idstr==""){  //未选中商品
		layer.msg('请先选则商品', {
			  icon: 2,
			  time: 1000 //（如果不配置，默认是3秒）
			});
		return "";
	}else{
		idstr=idstr.substring(0,idstr.length-1);
		//直接组合成where id in ('3232','53453')   删除条件的形式
		idstr="("+idstr+")";
		return idstr;
	}
}
//下拉框不可用  1  不可用   2可用
function disabled(tag){
	if(tag=="1"){
		$('#upgroup').attr("disabled","disabled");
		$("#upoff").attr("disabled","disabled");
		$("#updel").attr("disabled","disabled");
	}else{
		$("#upgroup").removeAttr("disabled");
		$("#upoff").removeAttr("disabled");
		$("#updel").removeAttr("disabled");
		
	}
}
/**
 * 复制商品内容
 * @param id
 */
//function toCopy(id){
//	parent.layer.confirm('确定要复制这条信息吗？', {
//		  btn: ['确定', '取消'] 
//		}, function(index, layero){
//			$.ajax({
//				url : getRootPath()+"/commodity/updateCopyCommodity.action",
//		        type : "post",
//		        data : { id : id},
//		        datatype : "text",
//		        success : function (data) {
//		        	if(data && data=="success"){
//		        		layer.msg("复制成功", {
//			      			  icon: 6,
//			      			  time: 1000 //（如果不配置，默认是3秒）
//			      			});
//		        		searchPage();	
//		        	}else{
//		        		layer.msg("复制失败", {
//			      			  icon: 6,
//			      			  time: 1000 //（如果不配置，默认是3秒）
//			      			});
//		        	}
//		        	parent.layer.closeAll();
//		        },
//				error:function(){
//					layer.msg("复制失败", {
//		      			  icon: 6,
//		      			  time: 1000 //（如果不配置，默认是3秒）
//		      			});
//					parent.layer.closeAll();
//				}
//		    })
//		}, function(index){
//		});
//}

// 批次管理
function batchManage (id) {
//	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
//	 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/commodity/manage/batchManage.jsp?commId="+id
	 location.href = getRootPath()+"/pages/commodity/manage_hongkong/batchManage.jsp?commId="+id
}

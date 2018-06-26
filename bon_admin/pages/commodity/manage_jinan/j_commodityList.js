/**
 * 商品管理列表页js
 */
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("flag");
//获得库存数量
var store_count = getUrlParam("store_count");
//定义商品总销量变量，通过ajax获取
//var total_sell_count;

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();	                         //初始数据
	
});  
layui.use(['form','element','layer'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
	 // initEvent(form);
	  initgroup(form);
})

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
	        "columnDefs": [
							{
								"targets": [0],
								"data":"id",
								"render": function(data, type, full, meta) {
								  var cstr='<div class="layui-form" style="text-align:center;"><input name="ck_com" type="checkbox" value="'+full.id+'">';
								  	  cstr+='<div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div>';
								      cstr+="</div>";
								      return cstr;
							  }
							},
							{
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
							
							},
							{
								"targets": [7],
								"data":"id",
								"render": function(data, type, full, meta) {
								return  '<a href="#" onclick=batchManage(\"'+full.id+'\") >批次管理</a>';
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
	                         $(row).children('td').eq(7).attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/commodity/queryjNCommodityPageList.action",
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

//点击保存将显示项隐藏
function preserve(){	
	$("#popover").hide();
}
function cancel(){
	$("#popover").hide();
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

// 批次管理
function batchManage (id) {
//	 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
//	 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/commodity/manage/batchManage.jsp?commId="+id
	 location.href = getRootPath()+"/pages/commodity/manage/j_commodity/j_batchManage.jsp?commId="+id
}

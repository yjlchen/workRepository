/**
 * 选择优惠券列表页js
 */

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();	
});  
layui.use(['form','element'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  //判断确定按钮的显示、隐藏
	 /* $("input[name='ck_com']").click(function(){
			if($("input[name='ck_com']:checked").length>0){
				$("#choose_coupons").css("display","inline");
			}else{
				$("#choose_coupons").css("display","none");
			}
		});*/
})


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
	        //不显示每页显示多少条的下拉列表，下面2项都设置为false
	        "bLengthChange": false,
	        "bPaginate":false,
	        
	        "bDestroy": true,
	        "pageLength": 8,
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
	            //多选框列         
	            { "data" : "","sDefaultContent" : ""},
	            //优惠券名称
				{ "data" : "name"},
				//价值
				{ "data" : "","sDefaultContent" : ""},
				//使用条件
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
	                        //多选框列
							{
								"targets": [0],
								"data":"id",
								"render": function(data, type, full, meta) {
								  var cstr="<div align=\"center\">";
								      cstr+=" <input type=\"checkbox\" name=\"ck_com\" value=\""+full.id+"\"  />";
								      cstr+="</div>";
								      return cstr;
							  }
							},
							//价值
							{
								"targets": [2],
								"render": function(data, type, full,meta) { 
									return couponValue(full);
							    }
							},
							//使用条件
							{
								"targets": [3],
								"render": function(data, type, full,meta) { 
									return couponUseCondition(full);
							    }
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').eq(2).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(3).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(0).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(1).attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/coupon/queryCouponPageList.action",
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




//组装价值列
function couponValue(full){
	var str = "";
	/*根据优惠形式字段，进行不同的显示 */
	//指定金额
	if(full.offer_type==1){
		//如果有结束金额
		if(full.offer_data_end!=""&&full.offer_data_end!=null){
			str = full.offer_data_start+"元~"+full.offer_data_end+"元";
		}else{
			str = full.offer_data_start+"元";
		}
	}
	//折扣
	else if(full.offer_type==2){
		str = full.offer_discount+"折";
	}
	return str;
}



//组装使用条件列
function couponUseCondition(full){
	var str = "";
	//判断是否有使用条件
	if(full.threshold==2){
		str = "满"+full.threshold_money+"元可用";
	}else{
		str = "无限制";
	}
	return str;
}



/**
 * 获取选中的优惠券id集合
 */
function to_querybatch(){
	var idstr="";
	var ch=document.getElementsByName("ck_com");
	for(var i=0;i<ch.length;i++)
	{
	  if(ch[i].checked){
		  idstr+=""+ch[i].value+",";
	  }
	}
	if(idstr==""){  
		layer.msg('请选择优惠券', {
			  icon: 2,
			  time: 2000 //（如果不配置，默认是3秒）
			});
		return "";
	}else{
		//去掉最后一个逗号
		idstr=idstr.substring(0,idstr.length-1);
		var idArr = idstr.split(",");
		return idArr
	}
}


//选择优惠券
function choose_coupons(obj){
	var ids=to_querybatch();
	if(ids==""){
		return ;
	}
	$(obj).removeAttr("onclick");
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	var parentPage = parent.document.getElementById(data_pjax).contentWindow;
	//获得索引值
	var ind = getUrlParam("ind");
	//调用父页面的获得优惠券的方法
	parentPage.query_coupons(ids,ind,coupon_li_for_count)
	parent.layer.closeAll();
}



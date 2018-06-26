/**
 * 优惠券列表页js
 */
var oTable; //记录数据datatable
//获得状态标志，用来判断选项卡选中哪个列表
var flag = getUrlParam("coupon_flag");

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	searchPage();	                         //初始数据
});  
layui.use(['form','element'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	  fun_element(element);
	  
	  initEvent(form);
})
/**
 * 事件初始
 */
function initEvent(form){
	 $("#to_create_coupon").click(function(){
		 var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
		 parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/coupon/couponEdit.jsp"
	});
}

/**
 * 实现选项卡
 * @param element
 */
function fun_element(element){
	 element.on('tab(couponTab)', function(data){
		  var index = data.index ; // index:0 所有优惠券;  1 未开始; 2进行中;  3已结束
		  $("#coupon_flag").val(index);
		  searchPage();	
		});
	 /**从其他页面返回该页面时，进行判断显示哪个选项卡**/
	 //未开始
	 if(flag=="1"){
			$("ul li").removeClass("layui-this");
			$("ul li:eq(1)").addClass("layui-this");
			$("#coupon_flag").val(flag);
			searchPage();	
		}
	 //进行中
	 else if(flag=="2"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(2)").addClass("layui-this");
	 		$("#coupon_flag").val(flag);
	 		searchPage();	
		}
	//已结束
	 else if(flag=="3"){
	 		$("ul li").removeClass("layui-this");
	 		$("ul li:eq(3)").addClass("layui-this");
	 		$("#coupon_flag").val(flag);
	 		searchPage();	
		}
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
				{ "data" : "name"},
				//优惠形式，需要根据每个优惠券的不同，进行判断展示（价值列）
				{ "data" : "","sDefaultContent" : ""},
				//领取数量限制
				{ "data" : "limit_num"},
				//有效期，需要根据选择的进行判断展示
				{ "data" : "","sDefaultContent" : ""},
				//领取人/次
				{ "data" :  "","sDefaultContent" : ""},
				//已使用
				{ "data" :  "","sDefaultContent" : ""},
				//操作
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [1],
								"render": function(data, type, full,meta) { 
									return couponValue(full);
							    }
							},
							{
								"targets": [2],
								"render": function(data, type, full,meta) { 
									return getLimitnum(full);
							    }
							},
							{
								"targets": [3],
								"render": function(data, type, full,meta) { 
									return getValidTime(full);
							    }
							},
							{
								"targets": [4],
								"data":"id",
								"render": function(data, type, full, meta) {
									//领取人次
									return  couponGetCount(full);
								}
							},
							{
								"targets": [5],
								"data":"id",
								"render": function(data, type, full, meta) {
									//已使用
									return  couponUseCount(full);
								}
							},
							{
								"targets": [6],
								"data":"id",
								"render": function(data, type, full, meta) {
									//操作显示的内容，也要根据判断显示
									return  couponAction(full);
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


/**
 * 推广
 */

function promotion(id,commodity_url,e){
	/*var x=e.pageX;
	var y=e.pageY;
	var url=getRootPath()+'/pages/commodity/manage/promotion.jsp?id='+id+'&commodity_url='+commodity_url;
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
      });*/
}

/**
 * 编辑优惠券信息
 */
function upCoupon(id){
	var data_pjax=$("#admui-siteConTabs ul>li.active>span",window.parent.document).attr("data-pjax");
	parent.document.getElementById(data_pjax).src=getRootPath()+"/pages/marketing/coupon/couponUpdate.jsp?id="+id
}

//组装领取人/次
function couponGetCount(full){
	var str = '<a href="#" onclick=toCouponGetList(\"'+full.id+'\",\"'+full.name+'\") >'+full.get_personCount+'</a>&nbsp;'
			+'/&nbsp;'+full.get_count
	return str;
}

//组装已使用
function couponUseCount(full){
	return '<a href="#" onclick=toCouponUseList(\"'+full.id+'\",\"'+full.name+'\") >'+full.use_count+'</a>'
}

//组装操作列
function couponAction(full){
	var str = "";
	//获得当前服务器时间
	var nowTime = queyNowTimeByServer();
	//没失效的情况下
	if(full.to_active=="1"){
		//优惠时间没结束的
		if(full.active_etime>=nowTime || full.valid_type!="1"){
			str = '<a href="#" onclick=upCoupon(\"'+full.id+'\") >编辑</a>'
			   //+'-<a href="#" onclick=update_coupon_unactive(\"'+full.id+'\") >使失效</a>'
		       //+'-<a href="#" onclick=promotion(\"'+full.id+'\",\"'+full.commodity_url+'\",event) >推广</a>'
		       ;
			//如果还没有人领，失效后可以删除
			if(full.get_personCount==0){
				str += '-<a href="#" onclick=update_coupon_unactive(\"'+full.id+'\") >使失效</a>';
			}
		}
		//结束了的
		else if(full.active_etime<nowTime){
			str = '<a href="#" onclick=upCoupon(\"'+full.id+'\") >编辑</a>'
			+'-<a href="#" onclick=del_coupon(\"'+full.id+'\") >删除</a>'
	        ;
		}
	}
	//已失效的情况下
	else if(full.to_active=="0"){
		/**有赞处理**/
		/*
		//优惠时间没结束的
		if(full.active_etime>=nowTime || full.valid_type!="1"){
			str = 
				' <span style="color: #999;">已失效</span>'
				;
		}
		//结束了的
		else if(full.active_etime<nowTime){
			str = 
				' <span style="color: #999;">已失效</span>'
				+'-<a href="#" onclick=del_coupon(\"'+full.id+'\") >删除</a>'
				;
		}*/
		/**实际处理**/
		str = 
			' <span style="color: #999;">已失效</span>'
			+'-<a href="#" onclick=del_coupon(\"'+full.id+'\") >删除</a>'
			;
	}
	return str;
}

//组装价值列
function couponValue(full){
	var str = "";
	/*根据优惠形式字段，进行不同的显示 */
	//指定金额
	if(full.offer_type==1){
		//如果有结束金额（指定金额但是价格随机（有开始结束价格区间））
		if(full.offer_data_end!=""&&full.offer_data_end!=null){
			str = full.offer_data_start+"~"+full.offer_data_end;
		}else{
			str = full.offer_data_start;
		}
	}
	//折扣
	else if(full.offer_type==2){
		str = full.offer_discount+"折";
	}
	
	//判断是否有最低消费，=2时，追加一行最低消费
	if(full.threshold==2){
		str += "<br><p style='color: #999;'>最低消费: ￥"+full.threshold_money+"</p>";
	}
	return str;
}

//组装领取限制列
function getLimitnum(full){
	var str = "";
	//如果不限张
	if(full.limit_num==0){
		str = "不限张数";
	}else{
		str = "一人"+full.limit_num+"张";
	}
	str += "<br><p style='color: #999;'>库存: "+full.release_num+"</p>";
	return str;
}


//组装有效期列
function getValidTime(full){
	var str = "";
	//固定日期
	if(full.valid_type==1){
		str = full.active_stime+"至<br>"+full.active_etime;
	}
	//领到券当日开始N天内有效
	else if(full.valid_type==2){
		str = "领到券当日开始"+full.active_now_days+"天内有效";
	}
	//领到券次日开始N天内有效
	else if(full.valid_type==3){
		str = "领到券次日开始"+full.active_next_days+"天内有效";
	}
	return str;
}



//删除优惠券
function del_coupon(id){
	parent.layer.confirm('确定要删除这条信息吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/coupon/deleteCoupon.action",
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
		    })
		}, function(index){
		});
}


//使优惠券失效
function update_coupon_unactive(id){
	parent.layer.confirm('确定要将此优惠券失效吗？', {
		  btn: ['是', '否'] //可以无限个按钮
		}, function(index, layero){
		  //按钮【按钮一】的回调
			$.ajax({
				url : getRootPath()+"/coupon/updateCouponToNotActive.action",
		        type : "post",
		        data : { id : id},
		        datatype : "text",
		        success : function (data) {
		        	if(data && data=="success"){
		        		layer.msg("操作成功", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        		searchPage();	
		        	}else{
		        		layer.msg("操作失败", {
			      			  icon: 6,
			      			  time: 1000 //（如果不配置，默认是3秒）
			      			});
		        	}
		        	parent.layer.closeAll();
		        },
				error:function(){
					layer.msg("操作失败", {
		      			  icon: 6,
		      			  time: 1000 //（如果不配置，默认是3秒）
		      			});
					parent.layer.closeAll();
				}
		    })
		}, function(index){
		});
}

//转向优惠券已使用列表
function toCouponUseList(id,couponName){
	location.href = "couponUseList.jsp?id="+id+"&couponName="+couponName;
}


//转向优惠券已领取列表
function toCouponGetList(id,couponName){
	location.href = "couponGetList.jsp?id="+id+"&couponName="+couponName;
}



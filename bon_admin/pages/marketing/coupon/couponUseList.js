/**
 * 优惠券列表页js
 */
var oTable; //记录数据datatable

$(function(){  
	jQuery_dataTable_extend_FirstAndEnd(); // 设置dataTabla首页和尾页
	 searchPage();	
});  
layui.use(['form','element'], function(){ 
	  var form = layui.form()
	  element = layui.element()
	  ,layer = layui.layer;
	                      
})


//列表
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
	            //客户
				{ "data" : "","sDefaultContent" : ""},
				//性别
				{ "data" : "sex"},
				//城市
				{ "data" : "city"},
				//领取时间
				{ "data" : "receive_time"},
				//价值
				{ "data" :  "","sDefaultContent" : ""},
				//使用时间
				{ "data" : "to_use_time"},
				//订单详情
				{ "data" : "","sDefaultContent" : ""},
				//状态
				{ "data" : "","sDefaultContent" : ""}
	        ],
	        "columnDefs": [
							{
								"targets": [0],
								"render": function(data, type, full,meta) { 
									return couponUserinfo(full);
							    }
							},
							{
								"targets": [4],
								"render": function(data, type, full, meta) {
									//价值
									return  couponValue(full);
								}
							},
							{
								"targets": [6],
								"render": function(data, type, full, meta) {
									//订单详情
									return  '<a href="javascript:;" >详情</a>';
								}
							},
							{
								"targets": [7],
								"render": function(data, type, full, meta) {
									//状态
									return  '已使用';
								}
							}
	                     ],
	                     //内容居中显示	 	                     
	                     "createdRow": function( row, data, dataIndex ) {
	                    	 $(row).children('td').eq(1).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(2).attr('style', 'text-align:center;')
	                    	 $(row).children('td').eq(3).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(4).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(5).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(6).attr('style', 'text-align:center;')
	                         $(row).children('td').eq(7).attr('style', 'text-align:center;')
	                     },
	                     "ajax": {
	                    	 "type":"post",
	                         "url": getRootPath()+"/coupon/queryCouponUsePageList.action",
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
 * 组装用户列
 */
function couponUserinfo(full){
	var str='<div class="shanpin" style="height:30px">';
	str+='    <div class="shanpinimg">';
	str+='     <img src="'+full.head_img_url+'">';
	str+='   </div>';
	str+='   <div>';
	str+='     <h5><a href="javascript:;"  >'+full.wx_name+'</a></h5>';
	str+='   </div>';
	str+=' </div>';
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




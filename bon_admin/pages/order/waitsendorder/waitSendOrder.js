var order_num;
layui.use(['form','layer'], function(){
		  var form = layui.form()
		  ,layer = layui.layer;  
	});
$(function(){
	lodingOrderTable();
});

function lodingOrderTable(pageinfo){
	if(!isNotEmpty(pageinfo)){
		currentPage=1
	}
	var length=20;
	var queryCond = {"order_state":"2","warehouse_type":1}
	var queryJsonStr=JSON.stringify(queryCond);
    $.ajax( {
    	"type":"post",
        "url": getRootPath()+"/order/queryOrderList.action",
        async: false,//同步
        "dataType":"json",
        'data' : {"queryJsonStr":queryJsonStr,"currentPage":currentPage,"length":length},
        'success' : function (data) {
        	append_table(data.datas);
        	up_page(data);
        },
        'error':function(){
        	errorfun();
        }
    });
}  
function errorfun(){
	var str="";
	str="<td colspan='8'><div style='height:100px;width:100%;padding-top: 50px;'><center>还没有相关数据</center></div></td>"
		$("#tbody").html(str);
}
function append_table(data){
	var str="";
	if(data==","){
		str="<td colspan='8'><div style='height:100px;width:100%;padding-top: 50px;'><center>还没有相关数据</center></div></td>"
		$("#tbody").html(str);
	}else{
		var List;
		var orderNumlist=data[0];
		var commodity=data[1];
		//循环订单号
    	for(var key in orderNumlist){
    		List=orderNumlist[key];
    		str+="<tr><td colspan='8' ></td></tr>";
    		str+="<tr style='background:#f2f2f2;'><td colspan='6'><div style='width:350px'><div style='display: inline;width:150px'>订单号:"+List.order_num+"</div>";
    		if(isNotEmpty(List.pay_type)){
    			str+="<div style='display: inline;width:100px'>&nbsp;&nbsp;";
    			if(List.pay_type==1){
    				str+="微信支付";
    			}
    			str+="</div>";
    		}
    		str+="</div>";
    		if(isNotEmpty(List.out_order_num)){
    			str+="<div><div style='margin-top:4px;margin-right:20px;display: inline;'>外部订单号:<span>"+List.out_order_num+"</span></div>";
    			if(List.pay_serial_number!=null||List.pay_serial_number!=""){
    				str+="<div style='margin-top:4px;display: inline;'>支付流水号:<span>"+List.pay_serial_number+"</span></div>";
        		}
    		}
    		str+="</div></td>";
    		str+="<td colspan='2'><div><a href='../orderdetail/orderDetail.jsp?order_num="+List.order_num+"'>查看详情</a>";
    		str+="</div></td></tr>";
    		//判断属于这个订单号的商品有几个
    		var count=0;
    		for(var key in commodity){
    			var commoditylist=commodity[key];
    			if(commoditylist.order_num==List.order_num){
    				count++;
    			}
			}
    		//循环几次加几行
    		var loopcount=0;
    		for(var key in commodity){
    			var commoditylist=commodity[key];
    			if(commoditylist.order_num==List.order_num){
    				loopcount++;
    				
    				if(loopcount==1){
    					str+="<tr><td style='width:60px'><img style='width:60px;height:60px;' src="+commoditylist.img_path_str+"></td>";
    						str+="<td style='width:41%'><p>"+commoditylist.commodity_name+"</p>";
    						if(isNotEmpty(commoditylist.specifications_name)){
    							str+="<p>"+commoditylist.specifications_name+"</p>"
    						}
    						str+="</td>";
    						str+="<td><p>"+commoditylist.unit_price+"</p>";
    						str+="<p>("+commoditylist.amount+"件)</p></td>";
    						str+="<td class='aftermarket-cell' style='text-align:center' rowspan="+count+">";
    						str+="</td>";
    						//str+="<td rowspan="+count+"><p>"+List.rights_protection_state+"</p></td>";
    						str+="<td style='text-align:center' rowspan="+count+"><p>"+List.wx_name+"</p>";
    						str+="<p>"+List.delivery_person_name+"</p>";
    						str+="<p>"+List.delivery_phone+"</p></td>";
    						str+="<td style='text-align:center' rowspan="+count+"><p>"+List.order_time+"</p></td>";
    						str+='<td style="text-align:center" rowspan='+count+'><div style="text-align:center" id="'+List.order_num+'">';
    						str+="等待商家发货</br>";
    						str+='<p><a href="javascript:;" class="fahuo button-click btn btn-small" data-ordernum="'+List.order_num+'">发&nbsp;&nbsp;货</a></p>'
    						str+="</div></td>";
    						str+='<td  rowspan="'+count+'" style="text-align:center"><p>'+parseFloat(List.orderPrice).toFixed(2)+'</p>'
    						str+='</td>';
    					str+="</tr>";
    				}
    				if(loopcount>1){
    					str+="<tr><td ><img style='width:60px;height:60px;' src="+commoditylist.img_path_str+"></td>";
    						str+="<td><p>"+commoditylist.commodity_name+"</p>";
    						if(isNotEmpty(commoditylist.specifications_name)){
    							str+="<p>"+commoditylist.specifications_name+"</p>"
    						}
    						str+="</td>";
    						str+="<td><p>"+commoditylist.unit_price+"</p>";
    						str+="<p>("+commoditylist.amount+"件)</p>";
    						
    					str+="</tr>";
    				}
    			}
			}
    		if(isNotEmpty(List.buy_remark)){
    			str+="<tr><td colspan=8>买家备注："+List.buy_remark+"</td></tr>";
    		}
    	}
    	$("#tbody").html(str);
    	//发货点击事件
    	var fahuoorder_num;
    	$(".fahuo").click(function(){
    		layui.use(['form','element','layer'], function(){
    			  var layer = layui.layer,
    			      form=layui.form();
    			//加载所有物流
	    		$.ajax({
					url : getRootPath() + "/order/queryAllLogistics.action",
					type : "post",
					dataType : "json",
					success : function(data) {
						var optionstring = "";
				        $.each(data, function(i,item){
					        optionstring += "<option value=\"" + item.logistics_name + "\" >" + item.logistics_name + "</option>";
				        });
				        $("#logistics_name").html(optionstring);
				        form.render('select'); //这个很重要
					}
				})
    		})
    		fahuoorder_num=$(this).attr("data-ordernum");
    		$.ajax({
    			url:getRootPath()+"/order/addressAndCommodityMessageByOrderNum.action",
    			type:"post",
    			dataType:"json",
    	        data : {order_num:fahuoorder_num},
    	        success : function (data) {
    	        	var str="";
    	        	$.each(data,function(index,value){
    	        		if(index==0){
    	        			$(".control-action").text(value.delivery_address+","+value.delivery_person_name+","+value.delivery_phone);
    	        		}
    	        		str+=	'<tr data-id='+value.id+'>';
//						str+=	'		<td class="text-right">';
//						str+='<input type="checkbox" class="js-check-item">';
//						str+=	'		</td>';
						str+=	'		<td>';
						str+=	'			<div>';
						str+=	'			'+value.commodity_name+'';
						str+=	'			</div>';
						str+=	'		</td>';
						str+=	'		<td>';
						str+=				value.amount;
						str+=	'		</td>';
						str+=	'		<td>';
						str+=	'		<td class="green">';
						str+=	'		</td>';
						str+=	'	</tr>';
    	        		$("#logistics-table").html(str);
    	        	})
    	        	$(".widget-order-express").css('display','block');
    	        	$(".zent-dialog-backdrop").css('display','block');
    	        },
    	        error:function(){
    	        	errorfun();
    	        }
    		})
    	})
    	$('.send-delivery').click(function(){
    		//改为针对订单发货，不在针对每个商品发货
    		if(check()){
    			var queryCond = $('#subfm').serializeObject();
    			var ids="";
    	        			for(i=0;i<$('.js-check-item:checked').parent().parent('tr').length;i++){
    	        				ids+=$('.js-check-item:checked').parent().parent('tr').eq(i).attr('data-id');
    	        				ids+=","
    	        			}
    	        			ids=ids.substring(0,ids.length-1);
    	        			queryCond["id"]=ids;
    			queryCond["order_num"]=fahuoorder_num;
    			var paramJsonStr = JSON.stringify(queryCond);
    			$.ajax( {
    				"type":"post",
    				"url": getRootPath()+"/order/deliverGoods.action",
    				async: false,//同步
    				"dataType":"text",
    				'data' : {paramJsonStr:paramJsonStr},
    				'success' : function (data) {
    					if("success"==data){
    						lodingOrderTable();
    						$('.zent-dialog-close').click();
    						$('.js-check-item:checked').prop('disabled','true');
    						$('.js-check-item:checked').removeAttr("checked");
    						$('#courier_number').val('');
    						layer.msg('发货成功', {
    							  icon: 1,
    							  time: 1500
    							});
    					}
    				},
    				'error':function(){
    					alert("错误");
    				}
    			});
    		}
    	})
    	$('.widget-order-express .zent-dialog-close').click(function(){
    		$('.zent-dialog-backdrop').hide();
    		$('.widget-order-express').hide();
    	})
    	
    	//确定修改物流
    	$('.change-logistics').click(function(){
			if($('.update-express-item-input').val()==''){
				layer.msg('运单编号不能为空', {
					  icon: 2,
					  time: 1500
					})
			}else{
				if($('#c_logistics_name').val()==$("#c_logistics_name").attr("data-logis")&&
							$('#c_courier_number').val()==$("#c_courier_number").attr("data-num")){
					layer.msg('未修改', {
						icon: 2,
						time: 1500
					})
				}else{
					var queryCond={}
					queryCond["order_num"]=order_num;
					queryCond.courier_number=$('#c_courier_number').val()
					queryCond.logistics_name=$('#c_logistics_name').val()
					var paramJsonStr = JSON.stringify(queryCond);
					$.ajax({
						url:getRootPath()+"/order/updateLogistics.action",
						type:"post",
						dataType:"text",
						data:{paramJsonStr:paramJsonStr},
						async:false,
						success:function(data){
							if("success"!=data){
								alert("失败");
							}else{
								$('.zent-dialog-backdrop').hide();
					        	$('.widget-express-update-dialog').hide();
								layer.msg('修改成功', {
				    				icon: 1,
				    				time: 1500
				    			});
							}
						},
						error:function(){
							alert("出错了！！");
						}
					})
	
				}
			}
		})
	}
}

/**
 * 修改物流
 * @param order_num
 */
function changeLogistics(ordernum){
	order_num=ordernum
	$.ajax( {
    	"type":"post",
        "url": getRootPath()+"/order/queryUpdateLogisticsMessage.action",
        async: false,//同步
        "dataType":"json",
        'data' : {order_num:order_num},
        'success' : function (data) {
        	$('.zent-dialog-backdrop').show();
        	$('.widget-express-update-dialog').show();
        	var logisticsStr="";
        	$.each(data.allLogisticsList,function(index,value){
        		logisticsStr+='<option value="'+value.logistics_name+'">'+value.logistics_name+'</option>';
        	})
        	var str="";
        	$.each(data.message,function(index,value){
        		str+='<div class="update-express-group clearfix" data-time="'+value.delivery_time+'">';
//				str+='	<div class="update-express-title">';
//				str+='		<span class="update-express-package-name">包裹'+(index+1)+' </span> 共'+value.count+'件商品';
//				str+='	</div>';
				str+='<div class="update-express-item-group clearfix">';
//				str+='		<label class="update-express-item-label pull-left">发货方式：</label>';
//				str+='		<div class="update-express-item-send-type-content">';
//				str+='			<label class="update-express-item-send-type-radio radio inline">';
//				str+='				<input type="radio" ';
//				str+='checked=""';
//				str+=' disabled="">需要物流';
//				str+='			</label>';
//				str+='			<label class="update-express-item-send-type-radio radio inline">';
//				str+='				<input type="radio"';
//				str+='disabled="">无需物流';
//				str+='			</label>';
//				str+='		</div>';
//				str+='	</div>';
				str+='	<div class="layui-inline" style="display: inline-block;">';
				str+='		<div class="layui-inline">';
				str+='			<label class="layui-form-label" style="width: 100px;margin-top: -4px">物流公司：</label>';
				str+='			<div class="layui-input-block"   >';
				str+='				<select name="logistics_name" class="logistics_name" lay-search="" style="width: 120px; margin-top: 1px;height: 26px"'
				str+='							id="c_logistics_name" data-count="'+value.count+'" data-logis="'+value.logistics_name+'">';
				str+=					logisticsStr.replace('value="'+value.logistics_name+'">','value="'+value.logistics_name+'" selected>');
		        str+='                </select>';
				str+='			</div>';
				str+='		</div>';
				str+='		<div class="layui-inline express" style="margin-left: 50px">';
				str+='			<label class="layui-form-label" style="width: 100px;margin-top: -6px">快递单号：</label>';
				str+='			<div class="layui-input-block"  >';
				str+='				<input type="text" maxlength="16" name="courier_number" class="courier_number" id="c_courier_number"';
				str+='				 class="layui-input" data-num="'+value.courier_number+'" value="'+value.courier_number+'"';
				str+='               style="border: 1px solid rgb(169, 169, 169);">';
				str+='			</div>';
				str+='		</div>';
				str+='		<div>';
				str+='			<p class="help-block error-message hide" style="margin-left: 396px;color: red">请填写快递单号</p>';
				str+='		</div>';
				str+='	</div>';
				str+='</div>';
        	})
        	$("#package-div").html(str);
        },
        'error':function(){
        	errorfun();
        }
    });
	
	

	$('.zent-dialog-close').click(function(){
		$('.zent-dialog-backdrop').hide();
		$(this).parent().parent().hide();
	})
	$('.js-close').click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.widget-express-update-dialog').hide();
	})
}

//验证
function check(){
	var goods=$('.goods').val();
	var js_number=$('#courier_number').val();
	if(js_number==''){//验证快递单号
		$('.help-block').removeClass('hide');
		return false;
	}
	else{
		$('.help-block').addClass('hide');
		$('.js-goods-tips').addClass('hide');
		return true;
	}
}
/*************以下与分页有关***************/
var start ;
var end ;
var currentPage=1;
var totalPage=1 ;
function selectPage(page){
	 if(page == 'first'){
		 currentPage = 1;
		 
	 }else if(page == 'pre'){
		 if(currentPage > 1){
			 currentPage -= 1;
		 }else{
			 currentPage = 1;
			
		 }
	 }else if(page == 'next'){
		 if(currentPage < totalPage){
			 currentPage += 1;
		 }else{
			 currentPage = totalPage;
			
		 }
	 }else if(page == 'end'){
		 currentPage = totalPage;
		
	 }else{
		 currentPage = page;
	 }
	 
	 //window.location.href = "paperTs.htm?currentPage="+currentPage;
	 lodingOrderTable("no");
}
function initPage(){
	if(currentPage == 1){
		 $("#li_first").addClass('disabled');
		 $("#li_pre").addClass('disabled');
		 $("#li_first > a").removeAttr('onclick');
		 $("#li_pre > a").removeAttr('onclick');
	 }else if(currentPage == totalPage){
		 $("#li_next").addClass('disabled');
		 $("#li_end").addClass('disabled');
		 $("#li_next > a").removeAttr('onclick');
		 $("#li_end > a").removeAttr('onclick');
	 }
}
//更新分页
function up_page(gdata){
	currentPage=gdata.currentPage;  
	totalPage=gdata.totalPage;
	var dataCount=gdata.dataCount;
	var start=parseInt(gdata.start);
	var end=parseInt(gdata.end);
	var str="";
	str+="<ul class='pagination ng-isolate-scope ng-valid'>";
	
	str+="<li class='ng-scope' id='li_first'><a href='javascript:;' onclick=selectPage('first') class='ng-binding'>|&lt;</a></li>";
	
	str+="<li	class='ng-scope' id='li_pre'><a href='javascript:;' onclick=selectPage('pre') class='ng-binding'>&lt;&lt;</a></li>";
	for(var i=start;i<=end;i++){
		var lstyle="";
		if(i==currentPage){
			lstyle="style='background-color:LightSkyBlue'";
		}
		str+="<li class='ng-scope'><a href='javascript:;' onclick=selectPage('"+i+"') class='ng-binding' "+lstyle+">"+i+"</a></li>";
	}
    str+="<li class='ng-scope' id='li_next'><a href='javascript:;' onclick=selectPage('next') class='ng-binding'>&gt;&gt;</a></li>";
	
	str+="<li class='ng-scope' id='li_end' onclick=selectPage('end')><a href='javascript:;'  class='ng-binding'>&gt;|</a></li>";
	
	str+="<li class='ng-scope' ><a href='javascript:;' style='height:32px' class='ng-binding'> 第"+currentPage+"页 | 共"+totalPage+"页 | "+dataCount+"条记录</a></li>";
	
	str+="</ul>";
	$("#page_index").html(str);
	initPage();
}

//打开商品链接
function openNewWindow(url){
	window.open(url+"?toview=frompc");
}
var waitSendCount=0;
layui.use(['form','layer'], function(){
		  var form = layui.form()
		  ,layer = layui.layer;  
	});
$(function(){
	lodingOrderTable();
	
	$(".delivery_refund_close").click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.cannotdelivery').hide();
	})
});

function lodingOrderTable(pageinfo){
	var queryCond = $('#queryOrderForm').serializeObject();
	var queryJsonStr=JSON.stringify(queryCond);
	if(!isNotEmpty(pageinfo)){
		currentPage=1
	}
	var length=20;
    $.ajax( {
    	"type":"post",
        "url": getRootPath()+"/order/queryTemporaryOrderList.action",
        async: false,//同步
        "dataType":"json",
        'data' : {"queryJsonStr":queryJsonStr,"currentPage":currentPage,"length":length,"isTemporary":0}, //临时订单
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
	str="<div style='height:200px;width:90%;margin-top:100px'><center>还没有相关数据</center></div>"
		$("#atable").html(str);
}
function append_table(data){
	var str="";
	if(data==","){
		str="<div style='height:200px;width:90%;margin-top:100px'><center>还没有相关数据</center></div>"
		$("#atable").html(str);
	}else{
		str+="<table class='layui-table' id='orderTable' style='border-collapse:collapse'>";
    	/*str+="<colgroup>";
    		str+="   <col width='150'>";
    		str+="   <col width='200'>";
    		str+="<col>";
    	str+="</colgroup>";*/		
		str+="<thead id='bar_head'>";
			str+="  <tr>";
				str+="<th colspan=2  style='text-align: center;width:40%'>商品</th>";
				str+="<th style='text-align: center;width:6%'>单价/数量</th>";
				str+="<th style='text-align: center;width:8%'>售后</th>";
				str+="<th style='text-align: center;width:10%'>买家</th>";
				str+="<th style='text-align: center;width:7%'>下单时间</th>";
				str+="<th style='text-align: center;width:14%'>订单状态</th>";
				str+="<th style='text-align: center;width:15%'>实付金额</th>";
			str+="</tr> ";
		str+="</thead>";
		str+="<tbody id='orderTablebody'>";
		var List;
		var orderNumlist=data[0];
		var commodity=data[1];
		//循环订单号
    	for(var key in orderNumlist){
    		//alert(orderNumlist[key].order_num);
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
    		str+="<td colspan='2'><div><a href='../orderdetail/orderDetail.jsp?order_num="+List.order_num+"'>查看详情</a>-<a href='javascript:void(0);'";
    		str+=" onclick=\"addRemark('"+List.order_num+"','"+List.remark+"')\">备注</a>";
    		str+="-<a onclick=\"copyUrl(event,'"+List.order_num+"')\" href='javascript:void(0);'>复制链接</a>";
    		//str+="<a href='../orderdetail/orderDetail.jsp?order_num="+List.order_num+"'>删除</a>";
    		str+="</div></td></tr>";
    		
    		//判断属于这个订单号的商品有几个
    		var count=0;
    		var needLogistics=0;
    		for(var key in commodity){
    			var commoditylist=commodity[key];
    			if(commoditylist.order_num==List.order_num){
    				count++;
    			}
    			if(commoditylist.is_need_logistics==1){
    				needLogistics++;
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
    						str+="<td style='width:35%'><p>"+commoditylist.commodity_name+"</p>";
    						if(isNotEmpty(commoditylist.specifications_name)){
    							str+="<p>"+commoditylist.specifications_name+"</p>"
    						}
    						str+="</td>";
    						str+="<td><p>"+commoditylist.unit_price+"</p>";
    						str+="<p>("+commoditylist.amount+"件)</p></td>";
    						str+="<td class='aftermarket-cell' style='text-align:center' rowspan="+count+">";
    						var canOrNotDelivery=1;//是否可以发货  1为可以   0为不可以
    						if(isNotEmpty(commoditylist.commodity_refunds)){
    							if(commoditylist.commodity_refunds==6){
    								str+='<a href="'+getRootPath()+'/refundrights/getRefundRightsMapById.action?id='+commoditylist.scr_id+'" class="new-window">维权结束</a>';
    								str+='<div class="botton-orange">';
    								//str+='    <a href="" target="_blank" class="the-money-to">钱款去向</a>';
    								str+='</div>';
    							}else if(commoditylist.commodity_refunds==7){
    								str+='<a href="'+getRootPath()+'/refundrights/getRefundRightsMapById.action?id='+commoditylist.scr_id+'" class="new-window">维权结束</a>';
    							}else{
    								str+='<a href="'+getRootPath()+'/refundrights/getRefundRightsMapById.action?id='+commoditylist.scr_id+'">买家发起维权</a>'
    								canOrNotDelivery=0;
    							}
    						}
    						str+="</td>";
    						//str+="<td rowspan="+count+"><p>"+List.rights_protection_state+"</p></td>";
    						str+="<td style='text-align:center' rowspan="+count+"><p>"+List.wx_name+"</p>";
    						str+="<p>"+List.delivery_person_name+"</p>";
    						str+="<p>"+List.delivery_phone+"</p></td>";
    						str+="<td style='text-align:center' rowspan="+count+"><p>"+List.order_time+"</p></td>";
    						str+='<td style="text-align:center" rowspan='+count+'><div style="text-align:center" id="'+List.order_num+'">';
    						if(List.order_state==1){
    							str+="等待买家付款";
    							str+='<p>';
                                str+='<a href="javascript:;" class="btn btn-small js-cancel-order button-click" data-ordernum="'+List.order_num+'">取消订单</a>';
                                str+='</p>'
    						}else if(List.order_state==2){
    							str+="等待商家发货</br>";
    							//str+='<p><input id="Button1" type="button" value="发&nbsp;&nbsp;货" onclick="aa()" style="height: 30;line-height: 20px"></p>'
    							str+='<p><a href="javascript:;" class="fahuo button-click btn btn-small" data-canOrNotDelivery='+canOrNotDelivery+' data-ordernum="'+List.order_num+'">发&nbsp;&nbsp;货</a></p>'
    						}else if(List.order_state==3){
    							str+='商家已发货</br>';
    							if(needLogistics>0){
    								str+='<p><a href="javascript:;" class=" button-click btn btn-small" onclick="changeLogistics(\''+List.order_num+'\')" style="height: 30;">修改物流</a></p>';
    							}
    						}else if(List.order_state==4){
    							str+="交易完成";
    						}else if(List.order_state==5){
    							str+="交易关闭";
    						}
    						str+="</div></td>";
    						var total_price=(List.total_price).toFixed(2);
    						if(!isNaN(Number(List.change_price))){
    							total_price=parseFloat(total_price)+parseFloat(List.change_price);
    						}
    						str+='<td  rowspan="'+count+'" style="text-align:center"><p>'+parseFloat(total_price).toFixed(2)+'</p>'
    						str+='<div style="text-align:center">';
    						if(List.order_state==1){
    							str+='<a href="javascript:;" class="change-price" data-num="'+List.order_num+'">修改价格</a>';
    						}
    						str+=' </div>';
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
    	str+="</tbody>		</table>";
    	$("#atable").html(str);
    	
    	//取消订单事件
    	$(".js-cancel-order").click(function(){
    		var order_num=$(this).attr("data-ordernum");
    		var document=$(this).parent().parent();
    		$(".zent-dialog-backdrop").show();
    		$(".widget-order-cancel").show();
    		$('.zent-dialog-close').click(function(){
        		$('.zent-dialog-backdrop').hide();
        		$('.widget-order-cancel').hide();
        	})
        	$(".js-cancel").click(function(){
        		$('.zent-dialog-backdrop').hide();
        		$('.widget-order-cancel').hide();
        	})
        	$(".cancel-order").click(function(){
        		var checkValue=$("#close_reason").val();
        		if(checkValue==0||checkValue==""){
        			layer.msg('请选择原因', {
						  icon: 2,
						  time: 1500
						});
        		}else{
        			$.ajax({
        				url : getRootPath() + "/order/cancelOrder.action",
        				type : "post",
        				data :{order_num:order_num,seller_cancel_reason:checkValue},
        				dataType : "text",
        				success : function(data) {
        					if("success"==data){
        						document.text("交易关闭");
        						$('.zent-dialog-backdrop').hide();
        						$('.widget-order-cancel').hide();
        					}
        				}
        			})
        		}
        	})
    	})
    	
    	//发货点击事件
    	$(".fahuo").click(function(){
    		if($(this).attr("data-canOrNotDelivery")==0){
    			$(".zent-dialog-backdrop").show();
    			$(".cannotdelivery").show();
    			return;
    		}
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
    		var order_num=$(this).attr("data-ordernum");
    		$.ajax({
    			url:getRootPath()+"/order/addressAndCommodityMessageByOrderNum.action",
    			type:"post",
    			dataType:"json",
    	        data : {order_num:order_num},
    	        success : function (data) {
    	        	var str="";
    	        	waitSendCount=0;
    	        	$.each(data,function(index,value){
    	        		if(index==0){
    	        			$(".control-action").text(value.delivery_address+","+value.delivery_person_name+","+value.delivery_phone);
    	        		}
    	        		str+=	'<tr data-id='+value.id+'>';
						str+=	'		<td class="text-right">';
						if(isNotEmpty(value.courier_number)){
							str+=	'			<input type="checkbox" class="js-check-item" disabled="">';
						}else{
							waitSendCount++;
							str+='<input type="checkbox" class="js-check-item">';
						}
						str+=	'		</td>';
						str+=	'		<td>';
						str+=	'			<div>';
						str+=	'				<a href="'+value.commodity_url+'" target="_blank">'+value.commodity_name;
						str+=	'				</a>';
						str+=	'			</div>';
						str+=	'		</td>';
						str+=	'		<td>';
						str+=				value.amount;
						str+=	'		</td>';
						str+=	'		<td>';
						if(isNotEmpty(value.courier_number)){
							str+=	'			<div>'+value.logistics_name+'</div>';
							str+=	'			<div>'+value.courier_number+'</div>';
							str+=	'		</td>';
							str+=	'		<td class="green">';
							str+=	'			已发货';
							str+=	'		</td>';
						}else{
							str+=	'		<td class="green">';
							str+=	'		</td>';
						}
						str+=	'	</tr>';
    	        		$("#logistics-table").html(str);
    	        	})
    	        	$(".widget-order-express").css('display','block');
    	        	$(".zent-dialog-backdrop").css('display','block');
    	        	$(".total-express").text("待发货 "+waitSendCount+"，已选 0");
    	        	var a=0;
    	        	$('.goods').val('');
    	        	//全选
    	        	$('.js-check-all').click(function(){
    	        		$('.goods').val('2');
    	        		var isChecked = $(this).prop("checked");
    	        		$('.js-check-item:enabled').prop("checked", isChecked);
    	        		a=$('.js-check-item:enabled:checked').length;
    	        		$('.total-express').text('待发货 '+waitSendCount+'，已选 '+a);
    	        	})
    	        	//选中以后已选变化，都选中后全选按钮也选中
    	        	$('.js-check-item:enabled').click(function(){
    	        		if($(this).prop("checked")){
    	        			$('.goods').val('1');//非全选赋值1
    	        			$('.js-goods-tips').addClass('hide');
    	        			a=$('.js-check-item:enabled:checked').length;
    	        			$('.total-express').text('待发货 '+waitSendCount+'，已选 '+a);
    	        		}else{
    	        			a=$('.js-check-item:enabled:checked').length;
    	        			$('.total-express').text('待发货 '+waitSendCount+'，已选 '+a);
    	        		}
    	        		if($('.js-check-item:enabled').length==$('.js-check-item:enabled:checked').length){
    	        			$('.js-check-all').prop("checked","true");
    	        			$('.goods').val('2');//全选赋值2
    	        		}else{
    	        			$('.js-check-all').removeAttr("checked"); 
    	        		}
    	        	})
    	        	//选择是否物流的判断
    	        	$('input:radio[name="is_need_logistics"]').click(function(){
    	        		var val=$('input:radio[name="is_need_logistics"]:checked').val();
    	        		if(val==1){
    	        			$('.js-express-info').show();
    	        		}else if(val==0){
    	        			$('.js-express-info').hide();
    	        		}
    	        	})
    	        	$('#courier_number').blur(function(){
    	        		if($('#courier_number').val==''){
    	        			$('.express').addClass('error');
    	        			$('.help-block').removeClass('hide');
    	        			return false;
    	        		}else{
    	        			$('.express').removeClass('error');
    	        			$('.help-block').addClass('hide');
    	        			return true;
    	        		}
    	        	})
    	        	//点击保存事件
    	        	$('.send-delivery').click(function(){			
    	        		if(check()){
    	        			var queryCond = $('#subfm').serializeObject();
    	        			var ids="";
    	        			for(i=0;i<$('.js-check-item:checked').parent().parent('tr').length;i++){
    	        				ids+=$('.js-check-item:checked').parent().parent('tr').eq(i).attr('data-id');
    	        				ids+=","
    	        			}
    	        			ids=ids.substring(0,ids.length-1);
    	        			queryCond["id"]=ids;
    	        			queryCond["order_num"]=order_num;
    	        			var paramJsonStr = JSON.stringify(queryCond);
    	        			$.ajax( {
    	        			    	"type":"post",
    	        			        "url": getRootPath()+"/order/deliverGoods.action",
    	        			        async: false,//同步
    	        			        "dataType":"text",
    	        			        'data' : {paramJsonStr:paramJsonStr},
    	        			        'success' : function (data) {
    	        			        	if("success"==data){
    	        			        		if($('.js-check-all').prop("checked")){
    	        			        			$('.zent-dialog-close').click();
    	        			        			$('#'+order_num).html('商家已发货</br><p><a class=" button-click btn btn-small" '
    	        			        					+'onclick="changeLogistics(\''+order_num+'\')">修改物流</a></p>');
    	        			        		}else{
	        			        				if($('input[name="is_need_logistics"]:checked').val()==1){
	        			        					$('.js-check-item:checked').prop('disabled','true');
    	        			        				$('.js-check-item:checked').parent('td').parent('tr').find('td').eq(3).append('<div>'+$('.select2-chosen').text()
    	        			        						+'</div><div>'+$('#courier_number').val()+'</div>')
    	        			        				$('.js-check-item:checked').parent('td').parent('tr').find('.green').text('已发货');
    	        			        				$('.js-check-item:checked').removeAttr("checked");
    	        			        				$('#courier_number').val('');
    	        			        			}else{
    	        			        				$('.js-check-item:checked').prop('disabled','true');
    	        			        				$('.js-check-item:checked').parent('td').parent('tr').find('td').eq(3).append('<div>无需物流</div>')
    	        			        				$('.js-check-item:checked').parent('td').parent('tr').find('.green').text('已发货');
    	        			        				$('.js-check-item:checked').removeAttr("checked");
    	        			        				$('#courier_number').val('');
    	        			        			}
    	        			        		}
    	        			        		
    	        			        	}
    	        			        },
    	        			        'error':function(){
    	        			        	alert("错误");
    	        			        }
    	        			    });
    	        			
    	        			$('.total-express').text('待发货 '+waitSendCount+'，已选 0');
    	        		}
    	        	})
    	        	$('.zent-dialog-close').click(function(){
    	        		$('.zent-dialog-backdrop').hide();
    	        		$('.widget-order-express').hide();
    	        	})
    	        },
    	        error:function(){
    	        	errorfun();
    	        }
    		})
    	})
    	//单击修改价格
    	$(".change-price").click(function(){
    		var orderPrice=0;
    		var p=$(this).parent().prev();
    		$('.zent-dialog-backdrop').show();
			$('.order-price').show();
    		var order_num=$(this).attr("data-num");
    		$.ajax({
		    	"type":"post",
		        "url": getRootPath()+"/order/queryMoneyForUpdatePrice.action",
		        async: false,//同步
		        "dataType":"json",
		        'data' : {order_num:order_num},
		        'success' : function (data) {
		        	var row=0;
		        	$.each(data,function(index,value){
		        		row++;
		        	})
		        	var str="";
		        	$.each(data,function(index,value){
		        		orderPrice=value.total_price;
		        		orderPrice=orderPrice.toFixed(2);
		        		if(index==0){
		        			if(isNotEmpty(value.coupon_price)){
		        				$("#order_price").text((parseFloat(orderPrice)+parseFloat(value.coupon_price)).toFixed(2));
		        			}else{
		        				$("#order_price").text(orderPrice);
		        			}
		        			$("#address").text("收货地址： "+value.delivery_address);
		        			var truepay="买家实付： ";
		        			truepay+=orderPrice;
		        			if(isNotEmpty(value.coupon_price)){
		        				var coupon_price=(value.coupon_price).toString();
		        				truepay+=" - "+coupon_price.substring(1,coupon_price.length);
		        			}
		        			truepay+=' + <span class="js-order-postage">0.00</span><span class="decrease-color change_price">';
		        			if(value.change_price==0){
		        				truepay+=' - '+(value.change_price).toFixed(2);
		        			}else{
		        				truepay+=" - "+(value.change_price).toString().substring(1,(value.change_price).length);
		        			}
		        			truepay+='</span> = <span class="price-color js-order-realpay">';
		        			var allPrice=0;
	        				if(isNotEmpty(value.coupon_price)){
	        					allPrice=(parseFloat(orderPrice)+parseFloat(value.coupon_price)+parseFloat(value.change_price)).toFixed(2);
	        				}else{
	        					allPrice=(parseFloat(orderPrice)+parseFloat(value.change_price)).toFixed(2);
	        				}
	        				truepay+=allPrice+'</span>';
	    		        	$("#true-pay").empty();
		        			$("#true-pay").append(truepay);
		        		}
		        		str+='<tr>';
		        		str+='	<td class="tb-name">';
		        		str+='		<a href="'+value.commodity_url+'" class="new-window" target="_blank">'+value.commodity_name+'</a>';
		        		str+='		<p>';
		        		str+='			<span class="c-gray">';
		        		str+='			</span>';
		        		str+='		</p>';
		        		str+='	</td>';
		        		str+='	<td class="tb-price">'+value.unit_price+'</td>';
		        		str+='	<td class="tb-num">'+value.amount+'</td>';
		        		str+='	<td class="tb-total" style="border-right: 1px solid #e4e4e4;">'+(value.unit_price*value.amount)+'</td>';
		        		if(index==0){
		        			str+='	<td class="tb-coupon" rowspan="'+row+'" style="border-right: 1px solid #e4e4e4;">';
		        			if(isNotEmpty(value.coupon_price)){
		        				str+=value.coupon_price;
		        			}
		        			str+='	</td>';
		        			str+='	<td class="tb-discount" rowspan="'+row+'" style="border-right: 1px solid #e4e4e4;">';
		        			str+='		<input type="text" class="input" name="change" value="'+(value.change_price).toFixed(2)+'" style="width:60px">';
		        			str+='	</td>';
		        			str+='	<td class="tb-postage" rowspan="'+row+'">';
		        			str+='		<input type="text" class="input" value="0.00" name="postage" readonly style="width:60px">';
		        			str+='		<p>';
		        			str+='			<a href="javascript:;" class="js-no-postage">直接免运费</a>';
		        			str+='		</p>';
		        			str+='	</td>';
		        			str+='</tr>';
		        		}else{
		        			str+="</tr>"
		        		}
		        	})
		        	$("#changePTB").html(str);
		        	$('.js-save-data').click(function(){
		        		var change_price=$('.tb-discount input').val();
		        		var n = Number(change_price);
						if(change_price>0){
							layer.msg('改价后的价格不能超过原价，请重试', {
								  icon: 2,
								  time: 1500
								});
						}else if (isNaN(n)){
							layer.msg('请输入正确数字形式', {
								  icon: 2,
								  time: 1500
								});
						}else if(orderPrice<=Math.abs(change_price)){
							layer.msg('改价的后的价格不能低于0，请重试', {
								  icon: 2,
								  time: 1500
								});
						}else{
							$.ajax( {
								"type":"post",
								"url": getRootPath()+"/order/changePrice.action",
								async: false,//同步
								"dataType":"text",
								'data' : {order_num:order_num,change_price:n},
								'success' : function (data) {
									var a=parseFloat($('.js-price-container').text()-Math.abs(n)).toFixed(2);
									p.text(a)
									$('.change_price').text(parseFloat(n).toFixed(2));
									$('.js-order-realpay').text(a);
									$('.close').click();
								}
							})
						}
					})
					$('.close').click(function(){
						$('.zent-dialog-backdrop').hide();
						$('.order-price').hide();
					})
		        }
    		})
    		
    	})
	}
	

}

/**
 * 修改物流
 * @param order_num
 */
function changeLogistics(order_num){
	var packagecount=0;//包裹数量
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
        		packagecount++;
        		str+='<div class="update-express-group clearfix" data-time="'+value.delivery_time+'">';
				str+='	<div class="update-express-title">';
				str+='		<span class="update-express-package-name">包裹'+(index+1)+' </span> 共'+value.count+'件商品';
				str+='	</div>';
				str+='<div class="update-express-item-group clearfix">';
				str+='		<label class="update-express-item-label pull-left">发货方式：</label>';
				str+='		<div class="update-express-item-send-type-content">';
				str+='			<label class="update-express-item-send-type-radio radio inline">';
				str+='				<input type="radio" ';
				if(value.is_need_logistics==1){
					str+='checked=""';
				}
				str+=' disabled="">需要物流';
				str+='			</label>';
				str+='			<label class="update-express-item-send-type-radio radio inline">';
				str+='				<input type="radio"';
				if(value.is_need_logistics==0){
					str+='checked=""';
				}
				str+='disabled="">无需物流';
				str+='			</label>';
				str+='		</div>';
				str+='	</div>';
				if(value.is_need_logistics==1){
					str+='	<div class="layui-inline" style="display: inline-block;">';
					str+='		<div class="layui-inline">';
					str+='			<label class="layui-form-label" style="width: 100px;margin-top: -4px">物流公司：</label>';
					str+='			<div class="layui-input-block"   >';
					str+='				<select name="logistics_name" class="logistics_name" lay-search="" style="width: 120px; margin-top: 1px;height: 26px"'
					str+='							id="lo'+index+'" data-count="'+value.count+'" data-logis="'+value.logistics_name+'">';
					str+=					logisticsStr.replace('value="'+value.logistics_name+'">','value="'+value.logistics_name+'" selected>');
			        str+='                </select>';
					str+='			</div>';
					str+='		</div>';
					str+='		<div class="layui-inline express" style="margin-left: 50px">';
					str+='			<label class="layui-form-label" style="width: 100px;margin-top: -6px">快递单号：</label>';
					str+='			<div class="layui-input-block"  >';
					str+='				<input type="text" maxlength="16" name="courier_number" class="courier_number" id="co'+index+'"';
					str+='				 class="layui-input" data-num="'+value.courier_number+'" value="'+value.courier_number+'"';
					str+='               style="border: 1px solid rgb(169, 169, 169);">';
					str+='			</div>';
					str+='		</div>';
					str+='		<div>';
					str+='			<p class="help-block error-message hide" style="margin-left: 396px;color: red">请填写快递单号</p>';
					str+='		</div>';
					str+='	</div>';
				}
				str+='</div>';
        	})
        	$("#package-div").html(str);
        },
        'error':function(){
        	errorfun();
        }
    });
	
	$('.change-logistics').click(function(){
		if($('.update-express-item-input').val()==''){
			layer.msg('运单编号不能为空', {
				  icon: 2,
				  time: 1500
				})
		}else{
			var isChange=false;
			var isChangePackage="";
			for(var i=0;i<packagecount;i++){
				if($('.logistics_name').eq(i).val()!=$("#lo"+i).attr("data-logis")||$('.courier_number').eq(i).val()!=$("#co"+i).attr("data-num")){
					isChange=true;
					isChangePackage+='<tr><td>包裹'+(i+1)+'</td><td>'+$("#lo"+i).attr("data-count")+'</td><td>物流发货</td>'
								+'<td>'+$('.logistics_name').eq(i).val()+'</td><td>'+$('.courier_number').eq(i).val()+'</td></tr>';
				}
			}
			if(!isChange){
				layer.msg('没有修改的包裹', {
					  icon: 2,
					  time: 1500
					})
			}else{
				$('.ui-table').find('tbody').html(isChangePackage);
				$('.express-confirm-dialog').show();
				$('.widget-express-update-dialog').hide();
			}
		}
	})
	$('.zent-dialog-close').click(function(){
		$('.zent-dialog-backdrop').hide();
		$(this).parent().parent().hide();
	})
	$('.js-close').click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.widget-express-update-dialog').hide();
	})
	$('.js-confirm').click(function(){
		var queryCond = $('#updateForm').serializeObject();
		var times="";
		for(i=0;i<$('.update-express-group').length;i++){
			times+=$('.update-express-group').eq(i).attr('data-time');
			times+=","
		}
		times=times.substring(0,times.length-1);
		queryCond["times"]=times;
		queryCond["order_num"]=order_num;
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
					$('.express-confirm-dialog').hide();
				}
			},
			error:function(){
				alert("出错了！！");
			}
		})
	})
	$('.js-cancel').click(function(){
		$('.express-confirm-dialog').hide();
		$('.widget-express-update-dialog').show();
	})
}

//验证
function check(){
	var goods=$('.goods').val();
	var js_number=$('#courier_number').val();
	var is_need_logistics=$('input[name="is_need_logistics"]:checked').val();
	if(goods==''&&is_need_logistics!=''){//验证选择商品
		$('.js-goods-tips').removeClass('hide');
		return false;
	}else if(js_number==''&&is_need_logistics==1){//验证快递单号
		$('.help-block').removeClass('hide');
		return false;
	}else if(js_number==''&&is_need_logistics==0){//无需物流验证
		return true;
	}else{
		
		$('.help-block').addClass('hide');
		$('.js-goods-tips').addClass('hide');
		return true;
	}
}
function addRemark(ordernum,oldremark){
	  parent.layer.open({
		  title:"添加备注",
		  text:oldremark,
		  type: 2,
		  area: ['500px', '300px'],
		  content: getRootPath()+'/pages/order/allorder/addRemark.jsp?order_num='+ordernum+'&oldremark='+unicode(oldremark)
	  });
}

//复制链接
function copyUrl(e,order_num){
	var x=e.pageX;
	var y=e.pageY;
	var url = getRootPath()+'/pages/order/temporaryOrder/showUrl_temporaryOrder.jsp?order_num='+(temporaryOrderPath+order_num);
	layer.open({
		title: ''
        ,type: 2
        ,closeBtn: 0
        ,id: 'promotion' //防止重复弹出
        ,area:["430px","50px"]
        ,offset: [y-20,x-450]
        ,content:url
       //,btnAlign: 'c' //按钮居中
       //,shade: 0 //不显示遮罩
        ,shadeClose :true //是否点击遮罩关闭
        ,yes: function(){
          layer.closeAll();
        }
      });
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
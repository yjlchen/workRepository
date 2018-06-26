var ordernum=getUrlParam("order_num");
$(function(){
	$.ajax({
		"type":"post",
        "url": getRootPath()+"/orderDetail/queryOrderDetail.action",
        async: false,//同步
        "dataType":"json",
        'data' : {"order_num":ordernum},
        'success' : function (data) {
        	assignment(data);
        	var html = "";
        	$.each(data.refundList,function(index,item){
        		html += '<li>'+item.create_name+'&nbsp;&nbsp;主动退款&nbsp;&nbsp;-'+item.refund_money+'</li>';
        	});
        	$('#createUl').html(html);
        },
        'error':function(){
        	alert("系统错误，请联系管理员");
        }
	});
	lodingtable();
	layui.use('layer', function(){
		  var layer = layui.layer;
	})	

	$("#orderdetailtable").on("mouseenter","tbody>tr",function(){
		var index=$(this).index();
		$("#refundsdiv"+index).show();
	});
	$("#orderdetailtable").on("mouseleave","tbody>tr",function(){
		var index=$(this).index()
		$("#refundsdiv"+index).hide();
	});
	
	//确定退款
	$('#confirmRefund').click(function(){
		var real_pay_mount = $('#real_pay_mount').val();//原来的实付金额，用于微信支付
		var value = $('#refundAmount').val();
		var orderGoodsId = $('#orderGoodsId').val();
		if(value.length > 0){
			var reg = /[^\d\.]/g;
			if(!reg.test(value)){
				$('#tip').hide();
				var ketuiAmount = $('#ketuiAmount').text();//可退金额
				if(parseFloat(value) > parseFloat(ketuiAmount)){//当退款金额大于可退金额时，给出提示
					$('#tip').show().text("超出可退款金额");
					$('#ketuiMoney').text("0.00");
					return;
				}else if(parseFloat(value) == 0){
					$('#tip').show().text("退款金额必须大于0");
					$('#ketuiMoney').text("0.00");
					return;
				}else{
					$('#tip').hide();
					$('#ketuiMoney').text(value);
					var payType = $('#payType').val();//退款方式
					var order_num_encrypt = $('#order_num_encrypt').val();
					if(payType == "1"){//微信支付
						//参数分别为 （加密的订单号，可退总金额，退款金额，退款原因）
						var result = toreturn(order_num_encrypt,real_pay_mount,value,"");
						if(result.result_code=="SUCCESS"){
							//执行确认方法
							$.ajax({
								url:getRootPath()+'/orderDetail/saveRefundInfo.action',
								type:'post',
								dataType:'text',
								async:false,
								data:{
									"orderGoodsId":orderGoodsId,
									"refundAmount":value,
									"create_ip":returnCitySN.cip
								},
								success:function(data){
									if(data=="success"){
										var resultMap = toreturnfund(order_num_encrypt);
										if(resultMap.result_code=="SUCCESS"){
											//成功之后需要修改到账时间和退款方式
											$.ajax({
												url:getRootPath()+'/orderDetail/updateTimeAndStyleByOrderListId.action',
												type:'post',
												dataType:'text',
												async:false,
												data:{
													"orderListId":orderGoodsId,
													"refund_style":resultMap.refund_recv_accout
												},
												success:function(data1){
													if(data1=="success"){
														layui.use('layer',function(){
															layer.closeAll();//关闭弹窗
															location.reload();
															layer.msg('退款成功', {icon: 6}); 
														});
													}else{
														alert("退款失败");
													}
												}
											});
										}
									}else{
										alert("退款失败");
									}
								}
							});
						}
					}else if(payType == "4" || payType == "5"){//信用卡或者储蓄卡
						layui.use('layer',function(){
							parent.layer.confirm("确定在易通支付后台已经退款了吗？",{icon: 3, title:'提示'}, function(index){
								//执行确认方法
								$.ajax({
									url:getRootPath()+'/orderDetail/saveRefundInfo.action',
									type:'post',
									dataType:'text',
									async:false,
									data:{
										"orderGoodsId":orderGoodsId,
										"refundAmount":value,
										"create_ip":returnCitySN.cip
									},
									success:function(data){
										var payStyle;
										if(payType == "4"){
											payStyle = "储蓄卡支付";
										}else if(payType == "5"){
											payStyle = "信用卡支付";
										}
										if(data=="success"){
											$.ajax({
												url:getRootPath()+'/orderDetail/updateTimeAndStyleByOrderListId.action',
												type:'post',
												dataType:'text',
												async:false,
												data:{
													"orderListId":orderGoodsId,
													"refund_style":payStyle
												},
												success:function(data1){
													if(data1=="success"){
														layui.use('layer',function(){
															layer.closeAll();//关闭弹窗
															parent.layer.close(index);
															parent.layer.msg('退款成功', {icon: 6});
															location.reload();
															
														});
													}else{
														alert("退款失败");
													}
												}
											});
										}else{
											alert("退款失败");
										}
									}
								});
							});
						});
					}
				}
			}else{
				$('#tip').show().text("金额格式错误");
				$('#ketuiMoney').text("0.00");
			}
		}else{
			$('#tip').show().text("请输入退款金额");
			$('#ketuiMoney').text("0.00");
		}
	});
	
	//keyup事件,验证金额的格式与大小
	$('#refundAmount').keyup(function(){
		var value = $(this).val();
		var reg = /[^\d\.]/g;
		if(!reg.test(value)){
			$('#tip').hide();
			var ketuiAmount = $('#ketuiAmount').text();//可退金额
			if(parseFloat(value) > parseFloat(ketuiAmount)){//当退款金额大于可退金额时，给出提示
				$('#tip').show().text("超出可退款金额");
				$('#ketuiMoney').text("0.00");
				return;
			}else if(parseFloat(value) == 0){
				$('#tip').show().text("退款金额必须大于0");
				$('#ketuiMoney').text("0.00");
				return;
			}else{
				$('#tip').hide();
				$('#ketuiMoney').text(value);
			}
		}else{
			$('#tip').show().text("金额格式错误");
			$('#ketuiMoney').text("0.00");
		}
	});

	$(".content-region").on("click",".addremark",function(){
		parent.layer.open({
			title:"添加",
			type: 2,
			area: ['500px', '300px'],
			content: getRootPath()+'/pages/order/allorder/addRemark.jsp?order_num='+ordernum
		});
	})
})

var commoditycount=0;
var index=-1;
function lodingtable(){
	$.ajax({
		url: getRootPath()+'/orderDetail/queryCommodityList.action',
		type : "post",
		data :{order_num:ordernum},
		dataType : "json",
		success : function(data) {
			var str="";
			$.each(data,function(index,value){
				commoditycount+=value.amount;
				if(index==0){
					$(".commoditymoney").text(parseFloat(value.total_price)-parseFloat(value.change_price));
					if(isNotEmpty(value.courier_number)){
						str+='<tr class="tr-express">';
//					str+='	<td>';
//					str+='		<strong>包裹 - '+(index+1)+'</strong>';
//					str+='	</td>';
						str+='	<td><span class="express-meta">'+value.logistics_name+'</span><span class="express-meta">运单号：'+value.courier_number+'</span></td>';
						str+='	<td colspan="5">';
						$.ajax({
							url : getRootPath() + "/orderDetail/queryWuLiuInfo.action",
							type : "post",
							async:false,
							data :{number:value.courier_number},
							dataType : "json",
							success : function(data) {
								var list=data.wuliuList;
								if(isNotEmpty(list)){
									var map=list[0];
									str+='		<span class="express-meta express-latest-news">';
									str+=map.time;
									if(data.issign==1){
										str+=' [签收] ';
									}
									str+=map.status;;
									str+='</span>';
									str+='		<a href="javascript:;" class="moreLogistics" data-express-no="'+value.courier_number+'">更多</a>';
								}
							}
						})
						str+='	</td>';
						str+='</tr>';
					}
				}
				str+='<tr class="test-item">';
				str+='	<td class="td-goods-image" rowspan="1">';
				str+='		<div class="ui-centered-image" src="" width="48px" height="48px" style="width: 48px; height: 48px;">';
				str+='			<img src="'+value.img_path_str+'" style="max-width: 48px; max-height: 48px;">';
				str+='		</div>';
				str+='	</td>';
				str+='	<td>';
				//str+='		<a href="javascript:;" onclick=openNewWindow("'+value.commodity_url+'") >'+value.commodity_name+'</a>';
				str+='	'+value.commodity_name+'';//去掉商品的链接
				if(isNotEmpty(value.specifications_name)){
					str+='		<p class="c-gray">规格:'+value.specifications_name+'</p><p class="c-gray"></p>';
				}
				str+='	</td>';
				str+='	<td>'+parseFloat(value.unit_price).toFixed(2)+'</td>';
				str+='	<td>'+value.amount+'</td>';
				//优惠
				if((parseFloat(value.unit_price)*parseInt(value.amount)).toFixed(2)==(parseFloat(value.price_of_total)).toFixed(2)){
					str+='	<td>-</td>';
				}else{
					str+='	<td>'
						+(parseFloat(value.unit_price)*parseInt(value.amount)-parseFloat(value.price_of_total)).toFixed(2)
						+'</td>'
				}
				console.log(str)
				str+='	<td><p>'+value.unit_price*value.amount+'</p>';
				index+=1;
    	   		if(isNotEmpty(value.active_refund_amount)){
    	   			str+='<div>';
    	   			str+='	<p>';
    	   			str+='		<span>有主动退款（-'+value.active_refund_amount+'）</span>';
    	   			str+='		<div class="zent-popover-wrapper zent-pop-wrapper" style="display: inline-block;">';
    	   			str+='			<span class="refund-record" style="cursor: pointer;color: orange;" onMouseOver="getCreateAndMoney(this);" onMouseOut="cancelShow();">记录</span>';
    	   			str+='		</div>';
    	   			str+='	</p>';
    	   		}
	   			if(value.order_state!=1&&value.order_state!=7&&value.order_state!=5&&value.active_refund_amount!=value.unit_price*value.amount){
	   				str+='	<a href="javascript:;" class="goods-online-refund-link" id="activeRefund" onclick="activeRefund(\''+value.id+'\',\''+ordernum+'\');" style="opacity: 0">主动退款</a>';
	   			}
    	   		if(isNotEmpty(value.active_refund_amount)){
		    	   	str+='</div>';
    	   		}
				str+='</td>';
				/*
				var status;
    	   		if(isNotEmpty(value.commodity_refunds)){
    	   			
    	   			if(value.commodity_refunds==6){
    	   				
    	   				status="退款成功";
					}else if(value.commodity_refunds==7){
						status="退款关闭";
					}else{
						status="退款中";
					}
    	   		}else{
    	   			if(value.commodity_status==1){
    	   				status="待付款";
    	   			}else if(value.commodity_status==2){
    	   				status="待发货";
    	   			}else if(value.commodity_status==3){
    	   				status="已发货";
    	   			}else if(value.commodity_status==4){
    	   				status="已完成";
    	   			}
    	   		}
				str+='	<td><span>'+status+'</span><br></td>';*/
				str+='</tr>';
				str+='<tr>';
				str+='	<td colspan="7"></td>';
				str+='</tr>';
			})
			$("#orderdetailtable>tbody").append(str);
			$("#commoditycount").text(commoditycount);
			$("#orderdetailtable").on("mouseenter","tbody tr",function(){
				$(this).find(".goods-online-refund-link").css("opacity","1");
			});
			$("#orderdetailtable").on("mouseleave","tbody tr",function(){
				$(this).find(".goods-online-refund-link").css("opacity","0");
			});
			$(".moreLogistics").click(function(){
				var number=$(this).attr("data-express-no");
					$.ajax({
					url : getRootPath() + "/orderDetail/queryWuLiuInfo.action",
					type : "post",
					data :{number:number},
					dataType : "json",
					success : function(data) {
						var str='';
						$.each(data.wuliuList,function(index,value){
							str+='<tr';
							if(index==0){
								str+='style="color: #390"';
							}
							str+=' >';
							str+='    <td>'+value.time+'</td>';
							str+='    <td>'+value.status+'</td>';
							if(index==0&&value.issign==1){
								str+='    <td>签收</td>';
							}else{
								str+='    <td>在途</td>';
							}
							str+='</tr>';
						})
						$(".logistics>tbody").html(str);
					}
				})
				$(".zent-dialog-backdrop").show();
				$(".logistics-div").show();
				$(".logistics-close").click(function(){
					$(".zent-dialog-backdrop").hide();
					$(".logistics-div").hide();
				})
			})
		}
	})
	/*var table=$('#orderdetailtable').DataTable({
	     
	     "columnDefs": [{
            	   	"targets": [4],
            	   	"data":"price",
            	   	"render": function(data, type, full) {
            	   		index+=1;
            	   		if(isNotEmpty(full.active_refund_amount)){
            	   			return data*full.amount+"</br>有主动退款（-"+full.active_refund_amount+"）<font color='red'>记录</font>";
            	   		}else if(full.order_state!=1&&full.order_state!=7&&full.order_state!=5){
            	   			return data*full.amount+"</br><div style='width:100px;height:20px'><div id='refundsdiv"+index
            	   			+"' style='display: none'><a href='javascript:' onclick='' >主动退款</a></div></div>";
            	   		}else{
            	   			return data*full.amount;
            	   		}
            	   	}
                }
         ]
    });*/
}

/**
 * 主动退款
 */
function activeRefund(orderGoodsId,orderNum){
	layui.use('layer',function(){
		layer.open({
			title:'商家主动退款',
			type: 1,
			content: $('#autoRefund'),
			area: ['682px', '320px']
		});
	});
	//查询订单商品信息
	$.ajax({
		url:getRootPath()+'/orderDetail/queryOrderGoodsInfoById.action',
		type:'post',
		dataType:'json',
		async:false,
		data:{
			"orderGoodsId":orderGoodsId,
			"orderNum":orderNum
		},
		success:function(data){
			$('#order_num_encrypt').val(data.commodityMap.order_num_encrypt);
			$('#orderGoodsId').val(data.commodityMap.orderGoodsId);
			$('#payType').val(data.commodityMap.pay_type);
			$('#goodsName').text(data.commodityMap.commodity_name);
			$('#ketuiAmount').text(data.commodityMap.pay_mount.toFixed(2));
			$('#real_pay_mount').val(data.commodityMap.real_pay_mount);
		}
	});
}
/**
 * 判断5种状态值，根据值修改订单进程显示
 * @param data
 */
function changeState(data){
	if(state==1){
		$("#ui-step li").eq(0).addClass("ui-step-done");
		$("#ui-step li").eq(0).find(".ui-step-meta").text(data.order_time);
	}else if(state==2){
		$("#ui-step li").eq(0).addClass("ui-step-done");
		$("#ui-step li").eq(1).addClass("ui-step-done");
		$("#ui-step li").eq(0).find(".ui-step-meta").text(data.order_time);
		$("#ui-step li").eq(1).find(".ui-step-meta").text(data.payment_time);
	}else if(state==3){
		$("#ui-step li").eq(0).addClass("ui-step-done");
		$("#ui-step li").eq(1).addClass("ui-step-done");
		$("#ui-step li").eq(2).addClass("ui-step-done");
		$("#ui-step li").eq(0).find(".ui-step-meta").text(data.order_time);
		$("#ui-step li").eq(1).find(".ui-step-meta").text(data.payment_time);
		$("#ui-step li").eq(2).find(".ui-step-meta").text(data.delivery_time);
	}else if(state==4){
		$("#ui-step li").eq(0).addClass("ui-step-done");
		$("#ui-step li").eq(1).addClass("ui-step-done");
		$("#ui-step li").eq(2).addClass("ui-step-done");
		$("#ui-step li").eq(3).addClass("ui-step-done");
		$("#ui-step li").eq(0).find(".ui-step-meta").text(data.order_time);
		$("#ui-step li").eq(1).find(".ui-step-meta").text(data.payment_time);
		$("#ui-step li").eq(2).find(".ui-step-meta").text(data.delivery_time);
		$("#ui-step li").eq(3).find(".ui-step-meta").text(data.completion_time);
	}else if(state==5){
		$("#head-div").hide();
	}	
}

/**
 * 订单详情的各个值赋值
 * @param data
 */
var refund_amount=0;//退款金额
var state;
var lefttime
function assignment(data){
	var orderset=data.ordersetmap;
	var datas=data.orderDetailList;
	var orderdetail;//订单详情
	var centerstate;//中间的订单状态是否显示订单部分退款中 1:退款未完成 
	
	if(jQuery.isArray(datas)){
		$.each(datas,function(index,value){
			if(value.refunds_completed==1||(value.commodity_refunds<6&&value.commodity_refunds>0)){
				centerstate=1;
			}
			refund_amount=tuikuan(refund_amount,value.refunds_money);
			refund_amount=tuikuan(refund_amount,value.active_refund_amount);
			orderdetail=value;
		})
	}else{
		orderdetail=datas;
		if(datas.refunds_completed==1||(datas.commodity_refunds<6&&value.commodity_refunds>0)){
			centerstate=1;
		}
		refund_amount=refund_amount+datas.refunds_money+datas.active_refund_amount;
	}
	var ordernum=nullTogang(orderdetail.order_num);
	var wxname=nullTogang(orderdetail.wx_name);
	var buyremark=nullTogang(orderdetail.buy_remark);
	$("#td_order_num").text(ordernum);
	$("#td_wx_name").text(wxname+orderdetail.phone);
	$("#p_delivery_info").text(orderdetail.delivery_address+","+orderdetail.delivery_person_name+","+orderdetail.delivery_phone);
	$("#td_buy_remark").text(buyremark);
	var pay_type="";//支付方式
	if(orderdetail.pay_type==1){
		pay_type="微信安全支付";
	}else if(orderdetail.pay_type==2){
		pay_type="微信代付";
	}else if(orderdetail.pay_type==3){
		pay_type="支付宝";
	}else if(orderdetail.pay_type==4){
		pay_type="储蓄卡";
	}else if(orderdetail.pay_type==5){
		pay_type="信用卡";
	}else if(orderdetail.pay_type==6){
		pay_type="找人代付";
	}else if(orderdetail.pay_type==7){
		pay_type="小程序";
	}
	
	$("#pay-type").text(pay_type)
	if(isNotEmpty(orderdetail.pay_mount)&&orderdetail.pay_mount!=0){
		$("#commoditymoney").text(orderdetail.pay_mount);
	}else{
		$("#commoditymoney").text((parseFloat(orderdetail.total_price)+parseFloat(orderdetail.change_price)).toFixed(2));
	}
	
	lefttime=7-diy_time(orderdetail.delivery_time);
	if(isNotEmpty(orderdetail.extended_delivery)){
		lefttime+=3;
	}

	//state=judgeState(datas);//订单商品表的商品状态
	state = datas[0].order_state;//订单状态

	changeState(orderdetail);
	var htmlcenter;
	if(state==1){
		htmlcenter="<h3 class='state-title'>";                        
		htmlcenter+="	<span class='icon info'>!</span>";                        
		htmlcenter+="	订单状态：商品已拍下，等待买家付款';";
		htmlcenter+="	</h3>";                        
		htmlcenter+="<div class='state-desc'> ";                        
		htmlcenter+="	如买家未在规定时间内付款，订单将按照设置逾期自动关闭。";                    
		htmlcenter+="	</div>";                        
		htmlcenter+="	<div class='state-action'> ";     
//		htmlcenter+='		<button class="zent-btn zent-btn-primary change-price">修改价格</button>';
		htmlcenter+='		<button class="zent-btn js-cancel-order">关闭订单</button>';
		htmlcenter+='		<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark">备注</a>';                        
		htmlcenter+="		</div>";                        
		htmlcenter+="		<div class='state-remind-region' style='left: 315px;'>";                        
		htmlcenter+="			<div class='dashed-line'></div>";                        
		htmlcenter+="			<div class='state-remind'>";                        
		htmlcenter+="				<h4>友情提醒：</h4>";                        
		htmlcenter+="				<ul>";                        
		htmlcenter+="					<li>请务必等待订单状态变更为“买家已付款，等待卖家发货”后再进行发货。</li>";                        
		htmlcenter+="				</ul>";                        
		htmlcenter+="			</div>";                        
		htmlcenter+="		</div>";                        
	}else if(state==2){
		htmlcenter="<h3 class='state-title'>";  
		htmlcenter+="	<span class='icon info'>!</span>";  
		htmlcenter+="	订单状态：";
		if(centerstate==1){
			htmlcenter+="订单部分退款中，请尽快处理";
		}else{
			htmlcenter+="买家已付款，等待商家发货";
		}		
		htmlcenter+="</h3>";  
		htmlcenter+="<div class='state-desc'>  ";  
		htmlcenter+="	<div>买家已付款，请尽快发货，否则买家有权申请退款。</div>  ";
		htmlcenter=orderAddUl(datas,htmlcenter);
		htmlcenter+="</div> ";  
		htmlcenter+="<div class='state-action'>  ";  
//		htmlcenter+="	<button class='zent-btn zent-btn-primary test-send-goods fahuo'  data-type='send'>发货</button>";  
		htmlcenter+='		<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark">备注</a>';  
		htmlcenter+="</div> "; 
		htmlcenter=saleremark(orderdetail.remark,htmlcenter);
		htmlcenter+="<div class='state-remind-region' style='left: 315px;'> ";  
		htmlcenter+="	<div class='dashed-line'></div> ";                                                                                    
		htmlcenter+="	<div class='state-remind'>  ";                                                                                        
		htmlcenter+="		<h4>提醒：</h4>";                                                                                                 
		htmlcenter+="		<ul>";
		htmlcenter+="			<li>如果无法发货，请及时与买家联系并说明情况后进行退款；</li>";
		htmlcenter+="			<li>买家申请退款后，须征得买家同意后再发货，否则买家有权拒收货物；</li>";
		htmlcenter+="			<li>买家付款后超过7天仍未发货，将有权申请有赞客服介入发起退款维权；</li>";
		htmlcenter+="		</ul>";
		htmlcenter+="	</div>";
		htmlcenter+="</div>";
	}else if(state==3){
		htmlcenter="<h3 class='state-title'> ";
		htmlcenter+="	<span class='icon info'>!</span> 订单状态： ";
		if(centerstate==1){
			htmlcenter+="订单部分退款中，请尽快处理";
		}else{
			htmlcenter+="商家已发货，等待交易成功 ";
		}
		htmlcenter+="</h3>";
		htmlcenter+="<div class='state-desc'>";
		htmlcenter+="	<div>";
		htmlcenter+="		买家如在 <em> "+lefttime+" 天内 </em> 没有申请退款，交易将自动完成；";
		htmlcenter+="	</div>";
		htmlcenter=orderAddUl(datas,htmlcenter);
		htmlcenter+="</div>";
		htmlcenter+="<div class='state-action'>";
//		htmlcenter+="	<button class='zent-btn zent-btn-primary test-send-goods change_logistics'>修改物流</button>";
		htmlcenter+="	<button class='zent-btn zent-btn-primary' onclick='extendedDelivery()'>延长收货</button>";
		if(isNotEmpty(orderdetail.extended_delivery)){
			htmlcenter+="<a href='javascript:;' class='ui-btn ui-btn-sub ui-btn-link' onclick='extendedDeliveryDetail()'>延长收货详情</a>";
		}
		htmlcenter+='<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark">备注</a>';
		htmlcenter+="</div>";
		htmlcenter=saleremark(orderdetail.remark,htmlcenter);
		htmlcenter+="<div class='state-remind-region' style='left: 315px;'>";
		htmlcenter+="	<div class='dashed-line'></div>";
		htmlcenter+="	<div class='state-remind'>";
		htmlcenter+="		<h4>提醒：</h4>";
		htmlcenter+="		<ul>";
		htmlcenter+="			<li>交易成功后，有赞将把货款结算至你的店铺账户余额，你可申请提现；</li>";
		htmlcenter+="			<li>请及时关注你发出的包裹状态，确保能配送至买家手中；</li>";
		htmlcenter+="			<li>如果买家表示未收到货或者货物有问题，请及时联系买家积极处理，友好协商；</li>";
		htmlcenter+="		</ul>";
		htmlcenter+="	</div>";
		htmlcenter+="</div>";
	}else if(state==4){
		htmlcenter="<h3 class='state-title'>";
		htmlcenter+="	<span class='icon info'>√</span>";
		htmlcenter+="	订单状态：";
		if(centerstate==1){
			htmlcenter+="订单部分退款中，请尽快处理";
		}else{
			htmlcenter+="交易完成";
		}
		htmlcenter+="</h3>                                                                               ";
		htmlcenter+="<div class='state-desc'>                                                            ";
		htmlcenter+="	钱款已到账户，请注意查收。          ";
		htmlcenter=orderAddUl(datas,htmlcenter);
		htmlcenter+="</div>                                                                              ";
		htmlcenter+="<div class='state-action'>                                                          ";
		htmlcenter+='	<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark">备注</a>';
		htmlcenter+="</div>                                                                              ";
		htmlcenter=saleremark(orderdetail.remark,htmlcenter);
		htmlcenter+="<div class='state-remind-region' style='left: 315px;'>                              ";
		htmlcenter+="	<div class='dashed-line'></div>                                                  ";
		htmlcenter+="	<div class='state-remind'>                                                       ";
		htmlcenter+="		<h4>提醒：</h4>                                                          ";
		htmlcenter+="		<ul>                                                                         ";
		htmlcenter+="			<li>交易已成功，如果买家提出售后要求，请积极与买家协商，做好售后服务。</li>";
		htmlcenter+="		</ul>                                                                        ";
		htmlcenter+="	</div>                                                                           ";
		htmlcenter+="</div>                                                                              ";
	}else{
		htmlcenter="<h3 class='state-title'>";
		htmlcenter+="	<span class='icon info'>!</span>";
		htmlcenter+="	订单状态：交易关闭";
		htmlcenter+="</h3> ";
		htmlcenter+="<div class='state-desc'>";
		if(isNotEmpty(orderdetail.order_cancel_reason)){
			htmlcenter+=ordercancelreason(orderdetail.order_cancel_reason);
		}
		if(refund_amount>0){
			htmlcenter+="	<ul>";
			htmlcenter+="		标记退款";
			htmlcenter+="		<li>订单退款金额："+refund_amount+"元";	
			htmlcenter+="	</ul>";
		}
		htmlcenter+="</div>";
		htmlcenter+="<div class='state-action'>";
		htmlcenter+='	<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark" >备注</a>';
		htmlcenter+="</div>";
		htmlcenter=saleremark(orderdetail.remark,htmlcenter);
		 
	}
	$("#centerdiv").html(htmlcenter);
	
	//关闭取消订单弹出页
	$(".cancelcloseorder").click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.widget-order-cancel').hide();
	})
	
	//点击取消订单
	$(".content-region").on("click",".js-cancel-order",function(){
		$(".zent-dialog-backdrop").show();
		$(".widget-order-cancel").show();
	})
	//确定取消订单
	$(".content-region").on("click",".cancel-order",function(){
		var checkValue=$("#close_reason").val();
		var checkValueText=$("#close_reason option:selected").text();
		if(checkValue==0||checkValue==""){
			layer.msg('请选择原因', {
				  icon: 2,
				  time: 1500
				});
		}else{
			$.ajax({
				url : getRootPath() + "/order/cancelOrder.action",
				type : "post",
				data :{order_num:ordernum,seller_cancel_reason:checkValue},
				dataType : "text",
				success : function(data) {
					if("success"==data){
						$("#head-div").hide();
						$('.zent-dialog-backdrop').hide();
						$('.widget-order-cancel').hide();
						var str="";
						str+='<h3 class="state-title"><span class="icon info">!</span>订单状态：交易关闭</h3>';
						str+='<div class="state-desc">'+checkValueText+'</div>';
						str+='<div class="state-action">';
						str+='	<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark">备注</a>';
						str+='</div>';
						$("#centerdiv").html(str);
					}
				}
			})
		}
	})
	//发货点击事件
	/*$(".fahuo").click(function(){
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
		$.ajax({
			url:getRootPath()+"/order/addressAndCommodityMessageByOrderNum.action",
			type:"post",
			dataType:"json",
	        data : {order_num:ordernum},
	        success : function (data) {
	        	var str="";
	        	//waitSendCount=0;//待发货数量
	        	$.each(data,function(index,value){
	        		if(index==0){
	        			$(".control-action").text(value.delivery_address+","+value.delivery_person_name+","+value.delivery_phone);
	        		}
	        		str+=	'<tr data-id='+value.id+'>';
					//str+=	'		<td class="text-right">';
					
					if(isNotEmpty(value.courier_number)){
						str+=	'			<input type="checkbox" class="js-check-item" disabled="">';
					}else{
						waitSendCount++;
						str+='<input type="checkbox" class="js-check-item">';
					}
					//str+=	'		</td>';
					str+=	'		<td>';
					str+=	'			<div>';
					str+=	'				<a href="javascript:;" onclick=openNewWindow("'+value.commodity_url+'") >'+value.commodity_name;
					str+=	'				</a>';
					str+=	'			'+value.commodity_name+'';
					str+=	'			</div>';
					str+=	'		</td>';
					str+=	'		<td>';
					str+=				value.amount;
					str+=	'		</td>';
					//str+=	'		<td>';
					
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
	        	//$(".total-express").text("待发货 "+waitSendCount+"，已选 0");
	        	//var a=0;
	        	//$('.goods').val('');
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
			queryCond["order_num"]=ordernum;
			var paramJsonStr = JSON.stringify(queryCond);
			$.ajax({
				"type":"post",
				"url": getRootPath()+"/order/deliverGoods.action",
				async: false,//同步
				"dataType":"text",
				'data' : {paramJsonStr:paramJsonStr},
				'success' : function (data) {
					if("success"==data){
						//if($('.js-check-all').prop("checked")){
						$('.zent-dialog-close').click();
						var str="";
						str+='<h3 class="state-title"><span class="icon info">!</span>订单状态：商家已发货，等待交易成功</h3>';
						str+='<div class="state-desc">';
						str+='	<div>买家如在 <em>7天内</em> 没有申请退款，交易将自动完成；</div>';
						str+='</div>';
						str+='<div class="state-action">';
						str+='	<button class="zent-btn zent-btn-primary test-send-goods change_logistics" data-type="modify">修改物流</button>';
						str+='	<button class="zent-btn zent-btn-primary" onclick="extendedDelivery()">延长收货</button>';
						str+='	<a href="javascript:;" class="ui-btn ui-btn-sub ui-btn-link addremark">备注</a>';
						str+='	<div class="ui-star">';
						str+='		<span title="去星" class="active"></span>';
						str+='		<span title="一星" class=""></span>';
						str+='		<span title="二星" class=""></span>';
						str+='		<span title="三星" class=""></span>';
						str+='		<span title="四星" class=""></span>';
						str+='		<span title="五星" class=""></span>';
						str+='	</div>';
						str+='</div>';
						$("#centerdiv").html(str);
						$("#ui-step li").eq(2).addClass("ui-step-done");
						$("#ui-step li").eq(2).find(".ui-step-meta").text(getNowTime());
						$(".status").text("已发货");
						//}else{
							var id=ids.split(",");
	        			        			for(var i=0;i<id.length;i++){
	        			        				$("span[data-id="+id[i]+"]").text("已发货");
	        			        			}
						//if($('input[name="is_need_logistics"]:checked').val()==1){
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
						
						//}
						
					}
				},
				'error':function(){
					alert("错误");
				}
			});
			
			//$('.total-express').text('待发货 '+waitSendCount+'，已选 0');
		}
	})
	//关闭发货页面
	$('.close-send-delivery').click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.widget-order-express').hide();
	})*/
	//单击修改价格
	var oldChange_price;//原修改的价格
	var orderPrice;
	$(".change-price").click(function(){
		$('.zent-dialog-backdrop').show();
		$('.order-price').show();
		$.ajax({
	    	"type":"post",
	        "url": getRootPath()+"/order/queryMoneyForUpdatePrice.action",
	        async: false,//同步
	        "dataType":"json",
	        'data' : {order_num:ordernum},
	        'success' : function (data) {
	        	var row=0;
	        	$.each(data,function(index,value){
	        		row++;
	        	})
	        	var str="";
	        	$.each(data,function(index,value){
	        		if(index==0){
	        			orderPrice=(parseFloat(value.orderPrice)-parseFloat(value.change_price)).toFixed(2)
	        			$("#order_price").text(orderPrice);
	        			$("#address").text("收货地址： "+value.delivery_address);
	        			var truepay="买家实付： ";
	        			truepay+=orderPrice+'<span class="decrease-color change_price">';
	        			//truepay+=' + <span class="js-order-postage">0.00</span>';
	        			oldChange_price=value.change_price;
	        			if(value.change_price==0){
	        				truepay+=' - 0.00';
	        			}else{
	        				truepay+=" - "+(value.change_price).toString().substring(1,(value.change_price).length);
	        			}
	        			truepay+='</span> = <span class="price-color js-order-realpay">';
        				truepay+=	parseFloat(value.orderPrice).toFixed(2)+'</span>';
    		        	$("#true-pay").empty();
	        			$("#true-pay").append(truepay);
	        		}
	        		str+='<tr>';
	        		str+='	<td class="tb-name">';
	        		str+='		<a href="javascript:;" onclick=openNewWindow("'+value.commodity_url+'") >'+value.commodity_name+'</a>';
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
//		        			str+='	<td class="tb-postage" rowspan="'+row+'">';
//		        			str+='		<input type="text" class="input" value="0.00" name="postage" readonly style="width:60px">';
//		        			str+='		<p>';
//		        			str+='			<a href="javascript:;" class="js-no-postage">直接免运费</a>';
//		        			str+='		</p>';
//		        			str+='	</td>';
	        			str+='</tr>';
	        		}else{
	        			str+="</tr>"
	        		}
	        	})
	        	$("#changePTB").html(str);
	        }
		})
	})
	$('.order-price .close').click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.order-price').hide();
	})
	$('.js-save-data').click(function(){
		var change_price=$('.tb-discount input').val();
		if(change_price>0){
			layer.msg('改价后的价格不能超过原价，请重试', {
				  icon: 2,
				  time: 1500
				});
		}else if (isNaN(Number(change_price))){
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
				'data' : {order_num:ordernum,change_price:change_price},
				'success' : function (data) {
					layer.msg('修改成功', {
						  icon: 1,
						  time: 1500
						});
					//修改后的价格
					var price=(orderPrice-Math.abs(change_price)).toFixed(2);
					$('.change_price').text(parseFloat(change_price).toFixed(2));
					$('.js-order-realpay').text(price);
					$("#commoditymoney").text(price)
					$('.order-price .close').click();
				}
			})
		}
	})					
	
	//修改物流事件
	/*$(".state-region").on("click",".change_logistics",function(){
		$.ajax( {
	    	"type":"post",
	        "url": getRootPath()+"/order/queryUpdateLogisticsMessage.action",
	        async: false,//同步
	        "dataType":"json",
	        'data' : {order_num:ordernum},
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
//					str+='	<div class="update-express-title">';
//					str+='		<span class="update-express-package-name">包裹'+(index+1)+' </span> 共'+value.count+'件商品';
//					str+='	</div>';
					str+='<div class="update-express-item-group clearfix">';
//					str+='		<label class="update-express-item-label pull-left">发货方式：</label>';
//					str+='		<div class="update-express-item-send-type-content">';
//					str+='			<label class="update-express-item-send-type-radio radio inline">';
//					str+='				<input type="radio" ';
//					str+='checked=""';
//					str+=' disabled="">需要物流';
//					str+='			</label>';
//					str+='			<label class="update-express-item-send-type-radio radio inline">';
//					str+='				<input type="radio"';
//					str+='disabled="">无需物流';
//					str+='			</label>';
//					str+='		</div>';
//					str+='	</div>';
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
	})
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
				queryCond["order_num"]=ordernum;
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
	//点击修改物流后的关闭
	$('.widget-express-update-dialog .lo-close').click(function(){
		$('.zent-dialog-backdrop').hide();
		$('.widget-express-update-dialog').hide();
	})
	
	$('.changeTo-logistics').click(function(){
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
	})*/
	
}


//验证
function check(){
	var goods=$('.goods').val();
	var js_number=$('#courier_number').val();
	/*if(goods==''&&is_need_logistics!=''){//验证选择商品
		$('.js-goods-tips').removeClass('hide');
		return false;
	}*/
	//else 
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


/**
 * 判断下单时间到现在过了几天
 * @param time1
 * @returns
 */
function diy_time(delivery_time){
    time = Date.parse(new Date(delivery_time));
    var now = Date.parse(new Date());
    return time2 = Math.abs(parseInt((now - time)/1000/3600/24));
}


/**
 * 判断订单状态显示
 * @param data
 * @returns
 */
function judgeState(data){
	var state;
	$.each(data,function(index,value){
		if(isNotEmpty(value.order_cancel_reason)||isNotEmpty(value.seller_cancel_reason)||value.order_state==5){
			state=5;
		}else if((!isNotEmpty(value.commodity_refunds)||value.commodity_refunds ==7)||(
				!isNotEmpty(value.active_refund_amount)||value.active_refund_amount!=value.unit_price*value.amount)){
			state=value.commodity_status;
		}else{
			state=5;
		}
	}); 
	return state;
}

/**
 * 若订单存在申请退款或退款金额，加ul显示
 * @param data
 * @param htmlcenter
 * @returns
 */
function orderAddUl(data,htmlcenter){
	
	if(jQuery.isArray(data)){
		$.each(data,function(index,value){
			if(value.commodity_refunds<6&&value.commodity_refunds>0){
				htmlcenter+="	<ul>";
				htmlcenter+="		<li>买家已经对 "+value.commodity_name+"申请了退款，请了解进度；";
				htmlcenter+="	<a href="+getRootPath()+"/refundrights/getRefundRightsMapById.action?id="+value.refund_id+">查看退款维权</a></li>";
				if(refund_amount>0){
					htmlcenter+="		<li>订单退款金额："+refund_amount+"元";	
				}
				htmlcenter+="	</ul>";
				return false;
			}else{
				if(refund_amount>0){
					htmlcenter+="	<ul>";
					htmlcenter+="		<li>订单退款金额："+refund_amount+"元";	
					htmlcenter+="	</ul>";
					return false;
				}
			}
		});
	}else{
		if(data.commodity_refunds<6&&data.commodity_refunds>0){
			htmlcenter+="	<ul>";
			htmlcenter+="		<li>买家已经对 "+data.commodity_name+"申请了退款，请了解进度；<a href='#'>查看退款维权</a></li>";
			if(refund_amount>0){
				htmlcenter+="		<li>订单退款金额："+refund_amount+"元";	
			}
			htmlcenter+="	</ul>";
		}else{
			if(refund_amount>0){
				htmlcenter+="	<ul>";
				htmlcenter+="		<li>订单退款金额："+refund_amount+"元";	
				htmlcenter+="	</ul>";
			}
		}
	}
	return htmlcenter;
}

/**
 * 如果有，再页面显示
 * @param remark
 * @param htmlcenter
 * @returns
 */
function saleremark(remark,htmlcenter){
	if(isNotEmpty(remark)){
		htmlcenter+="<div style='margin-top:20px'>";
		htmlcenter+="	<div class='dashed-line' style='margin-left: -23px'></div>";
		htmlcenter+="		<div class='state-remark' style='margin-top:20px'><font color='#999'>卖家："+remark+"</font></div>";
		htmlcenter+="	</div>";
	}
	return htmlcenter;
}

/**
 * 用户取消原因
 * @param a
 */
function ordercancelreason(a){
	var b;
	if(a==1){
		b="超时未付款"
	}else if(a==2){
		b="买家取消";
	}
	return b;
}

/**
 * 计算退款金额
 */
function tuikuan(refund_amount,a){
	if(isNotEmpty(a)){
		refund_amount+=a;
	}
	return refund_amount;
}

/**
 * 把null值转成-
 */
function nullTogang(a){
	if(a==null){
		return "-";
	}
	else return a;
}


/**
 * 复制功能
 */
function copy(){
	var Url2=document.getElementById("p_delivery_info");
	Url2.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	Url2.blur();
	
	layer.msg('复制成功', {
	  icon: 1,
	  time: 1000
	})
}

function extendedDelivery(){
	parent.layer.confirm("<div style='margin-bottom:10px'><font size='3'><B>确定延长收货时间</B></font></div>" +
			"延长收货时间可以让买家有更多时间确认收货，而不急于申请退款；</br>" +
			"延长本交易的\"确认收货\"期限为3天", {
		  btn: ['确认', '取消'] ,//可以无限个按钮
		  title:"延长收货时间",
		  area: ['500px','230px']
		}, function(index, layero){
		  //按钮【按钮一】的回调
			if(lefttime>3){
				parent.layer.msg('距离结束时间前三天才能申请哦。', {
					  icon: 2,
					  time: 1000 //（如果不配置，默认是3秒）
					}, function(){
						parent.layer.closeAll();
						
					});
			}else{
				$.ajax({
			        url : getRootPath()+"/orderDetail/updateExtendedDelivery.action",
			        type : "post",
			        data : {
			            order_num : ordernum,
			            num:"1"
			        },
			        success : function (data) {
			        	if(data=="success"){
			        		parent.layer.msg('延长成功', {
								  icon: 1,
								  time: 1000 //（如果不配置，默认是3秒）
								}, function(){
									parent.layer.closeAll();
									location.reload(); 
								});
			        	}else{
			        		parent.layer.msg('失败，请重试', {
								  icon: 2,
								  time: 1000 //（如果不配置，默认是3秒）
								}, function(){
									parent.layer.closeAll();
									
								});
			        	}
			        	
			        }
			    })
			}
		}, function(index){
			layer.closeAll('dialog');
		});
}

function extendedDeliveryDetail(){
	$.ajax({
        url : getRootPath()+"/orderDetail/queryExtendedDetail.action",
        type : "post",
        data : {
            order_num : ordernum,
        },
        success : function (data) {
        		var extendeddelivery=data.extended_delivery
        		if(data.extended_delivery==1){
        			extendeddelivery="卖家";
        		}else{
        			extendeddelivery="买家";
        		}
        		parent.layer.open({
        			type: 1,
        			title:"延长收货详情",
        			content:"</br></br>&nbsp&nbsp&nbsp&nbsp"+data.extended_delivery_time+" "+extendeddelivery+"延长收货3天", 
        			skin: 'layui-layer-rim', //加上边框
        			area: ['350px','150px']
        		})
        },
        error:function(){
        		parent.layer.msg('失败，请重试', {
					  icon: 2,
					  time: 1000 //（如果不配置，默认是3秒）
					}, function(){
						parent.layer.closeAll();
						
			});
        }
    })
}

//展示退款者及退款金额
function getCreateAndMoney(obj){
	var X = $(obj).offset().top; 
	var Y = $(obj).offset().left;
	var height=$("#createNameDiv").height();
	var width=$("#createNameDiv").width();
	$('#createNameDiv').css("left",Y-width+30).css("top",X-height-10).show();
}

//鼠标移开是隐藏信息
function cancelShow(){
	$('#createNameDiv').hide();
}

//打开商品链接
function openNewWindow(url){
	window.open(url+"?toview=frompc");
}

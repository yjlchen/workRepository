<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/css/chosen.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/css/orderDetails.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/css/pc.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/css/css.css">
<script type="text/javascript" src="${basePath}/pages/order/js/location.js"></script>
<script type="text/javascript" src="${basePath}/pages/order/refundrights/wxoperate.js"></script>

<title>维权订单详情</title>
<style>
	.waiting>img{
	    float: left;
	    left: 50%;
	    margin-top: 7%;
	    display:none;
	}
	.btn-change{
		background-color:darkgray;
		baorder-color:darkgray;
	}
	#agreehandle2:hover{
		background:#f1f1f1 !important;
	}
</style>	
</head>
<body class="theme theme--blue theme-new-ui show-help">
		<div id="app-container" class="container" style="margin-left:0px;">
			<div id="app-container-top"></div>
			<div class="app">
				<div class="app-inner clearfix">
					<div class="app-init-container">
						<div id="js-react-container" class="app__content">
							<div data-reactroot="" class="page-trade-order-detail">
								<div class="step-region">
									<c:choose>
										<c:when test="${refundManyInfo.refundMap.handle_way == 1}">
											<ul class="ui-step ui-step-3">
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.apply_refund_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">买家申请维权</div>
															<div class="ui-step-number">1</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.apply_refund_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">买家申请维权</div>
															<div class="ui-step-number">1</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
												
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.seller_handle_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">商家处理退款申请</div>
															<div class="ui-step-number">2</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.seller_handle_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">商家处理退款申请</div>
															<div class="ui-step-number">2</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
												
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.refund_end_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">退款完成</div>
															<div class="ui-step-number">3</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.refund_end_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">退款完成</div>
															<div class="ui-step-number">3</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
											</ul>
										</c:when>
										<c:otherwise>
											<ul class="ui-step ui-step-4">
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.apply_refund_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">买家申请维权</div>
															<div class="ui-step-number">1</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.apply_refund_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">买家申请维权</div>
															<div class="ui-step-number">1</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
												
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.seller_handle_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">商家处理退款申请</div>
															<div class="ui-step-number">2</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.seller_handle_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">商家处理退款申请</div>
															<div class="ui-step-number">2</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
												
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.buyer_return_goods_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">买家退货给商家</div>
															<div class="ui-step-number">3</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.buyer_return_goods_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">买家退货给商家</div>
															<div class="ui-step-number">3</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
												
												<c:choose>
													<c:when test="${!empty refundManyInfo.refundMap.refund_end_time }">
														<li class="ui-step-done">
															<div class="ui-step-title">退款完成</div>
															<div class="ui-step-number">3</div>
															<div class="ui-step-meta">${refundManyInfo.refundMap.refund_end_time }</div>
														</li>
													</c:when>
													<c:otherwise>
														<li class="">
															<div class="ui-step-title">退款完成</div>
															<div class="ui-step-number">3</div>
															<div class="ui-step-meta"></div>
														</li>
													</c:otherwise>
												</c:choose>
												
											</ul>
										</c:otherwise>
									</c:choose>
								</div>
								<!-- 售后维权模块 -->
								<div class="content-region clearfix">
									<div class="info-region" style="padding: 15px;">
										<h3>售后维权</h3>
										<div>
											<div class="info-goods">
												<div class="ui-centered-image" src="${refundManyInfo.refundMap.img_path_str }">
													<img src="${refundManyInfo.refundMap.img_path_str }">
												</div>
												<div class="info-goods-content">
													<div>${refundManyInfo.refundMap.commodity_name }</div>
												</div>
											</div>
											<div class="dashed-line"></div>
										</div>
										<table class="info-table">
											<tbody>
												<tr>
													<th>期望结果：</th>
													<c:choose>
														<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
															<td><span class="color-orange">仅退款</span></td>
														</c:when>
														<c:otherwise>
															<td><span class="color-orange">退货退款</span></td>
														</c:otherwise>
													</c:choose>
												</tr>
												<tr>
													<th>退款金额：</th>
													<td><span class="color-orange">${refundManyInfo.refundMap.refund_money }</span>
														元
														<!-- <span>(含运费0.00元)</span> -->
													</td>
												</tr>
												<tr>
													<th>维权原因：</th>
													<td>${refundManyInfo.refundMap.buyer_refund_reason }</td>
												</tr>
												<tr>
													<th>维权编号：</th>
													<td>${refundManyInfo.refundMap.id }</td>
												</tr>
											</tbody>
										</table>
										<div class="dashed-line"></div>
										<table class="info-table">
											<tbody>
												<tr>
													<th>订单编号：</th>
													<td>${refundManyInfo.refundMap.order_num }</td>
												</tr>
												<tr>
													<th>付款时间：</th>
													<td>${refundManyInfo.refundMap.payment_time }</td>
												</tr>
												<tr>
													<th>买 家：</th>
													<td>${refundManyInfo.refundMap.person }</td>
												</tr>
												<tr>
													<th>物流信息：</th>
													<td>${refundManyInfo.refundMap.logistics_name }  ${refundManyInfo.refundMap.courier_number }<!-- <a>查看</a> --></td>
												</tr>
												<!-- 
												<tr>
													<th>运 费：</th>
													<td>
														0.00元
													</td>
												</tr>
												<tr>
													<th>合计优惠：</th>
													<td>
														0.00元
													</td>
												</tr> -->
												<tr>
													<th>实收总计：</th>
													<td>
													<%-- <span class="color-orange">${refundManyInfo.refundMap.unit_price }</span>元 --%>
													<span class="color-orange">${refundManyInfo.refundMap.refund_money }</span>元
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									
									<c:choose>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 1 }">
											<c:choose>
												<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
													<!-- 等待申请退款 -->
													<div class="state-region">
														<div style="padding: 0px 0px 30px 40px;">
															<h3 class="state-title"><span class="icon info">!</span>等待商家处理退款申请</h3>
															<div class="state-desc">
																<div>
																	<div>
																		收到买家仅退款申请，请尽快处理。
																		<p>
																			请在
																			<span class="color-orange"><em id="color-orange" ></em></span>
																			内处理本次退款，如逾期未处理，将自动同意退款。
																		</p>
																	</div>
																</div>
															</div>
															<div class="state-action">
															<button id="agree1" class="zent-btn zent-btn-primary">同意买家退款</button>
															<button id="reject1" class="zent-btn jujue">拒绝退款申请</button></div>
															<div class="state-remind-region">
																<div class="dashed-line"></div>
																<!-- <div class="state-remind">
																	<h4>提醒：</h4>
																	<ul>
 																		<li>如通过“微信支付-代销”付款订单，退款3个工作日到账。</li>
 																		<li>如通过“微信支付-自有”付款订单，需要前往对应财付通帐号进行退款操作。</li>
 																		<li>如通过“百度钱包”、“联动U付”付款订单，退款1～15个工作日到账。</li>
																	</ul>
																</div> -->
															</div>
															</div>
														</div>
													</div>
												</c:when>
												<c:otherwise>
													<!-- 等待申请退款 -->
													<div class="state-region">
														<div style="padding: 0px 0px 30px 40px;">
															<h3 class="state-title"><span class="icon info">!</span>等待商家处理退款申请</h3>
															<div class="state-desc">
																<div>
																	<div>
																		收到买家退款并退货申请，请尽快处理。
																		<p>
																			请在
																			<span class="color-orange"><em id="color-orange" ></em></span>
																			内处理本次退款，如逾期未处理，将自动发送退货地址。
																		</p>
																	</div>
																</div>
															</div>
															<div class="state-action"><button id="agree2" class="zent-btn zent-btn-primary">同意退货，发送退货地址</button><button id="reject2" class="zent-btn jujue">拒绝退款申请</button></div>
															<div class="state-remind-region">
																<div class="dashed-line"></div>
																<div class="state-remind">
																	<h4>提醒：</h4>
																	<ul>
																		<li>如果同意申请，请发送正确退货地址给买家。</li>
																		<li>如果拒绝申请，买家有权要求客服介入处理。</li>
																		<li>如果你逾期未处理，视作同意买家申请，系统自动将你的默认退货地址发给买家。</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</c:otherwise>
											</c:choose>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 2 }">
											<div class="state-region">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>商家不同意退款申请</h3>
													<div class="state-desc">
														<div>
															<div>
																你已拒绝本次退款申请，买家修改退货申请后，需要你重新处理。
																<p>
																	买家在
																	<span class="color-orange"><em id="color-orange" ></em></span>
																	内未响应，退款申请将自动撤销。
																</p>
															</div>
														</div>
													</div>
													<div class="state-still-can">
														<span>你还可以：</span>
														<c:choose>
															<c:when test="${refundManyInfo.refundMap.handle_way == 1}">
																<a href="javascript:;" id="agree66"> 同意退款给买家</a>
															</c:when>
															<c:otherwise>
																<a href="javascript:;" id="agree11">同意退货，发送退货地址</a>
															</c:otherwise>
														</c:choose>
													</div>
													<div class="state-remind-region">
														<div class="dashed-line"></div>
														<div class="state-remind">
															<h4>提醒：</h4>
															<ul>
																<li>买家修改退款申请后，需要你重新处理。</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 3 }">
											<div class="state-region">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>商家已同意退款,请退货给商家</h3>
													<div class="state-desc">
														<div>
															<div>
																你已同意退款协议，请等待买家处理。
																<p>
																	买家在
																	<span class="color-orange"><em id="color-orange" ></em></span>
																	内未响应，退款申请将自动关闭。
																</p>
															</div>
														</div>
													</div>
													<div class="state-still-can">
														<span>你还可以：</span>
														<a href="javascript:;" id="agree22"> 已收到退货，同意退款</a>
													</div>
													<div class="state-remind-region">
														<div class="dashed-line"></div>
														<div class="state-remind">
															<h4>提醒：</h4>
															<ul>
																<li>收到买家退货时，请及时验货。</li>
																<li>如买家未提交物流信息，但实际你已收到退货，你可以直接同意退款。</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 4  }">
											<div class="state-region" id="">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>已退货，等待商家确认收货</h3>
													<div class="state-desc">
														<div>
															<div>
																买家已退货，物流公司：${refundManyInfo.recordList[0].logistics_name }，物流单号：${refundManyInfo.recordList[0].logistics_number }
																<p>
																	请在
																	<span class="color-orange"><em id="color-orange"></em></span>
																	内确认，如逾期未处理，将自动退款给买家。
																</p>
															</div>
														</div>
													</div>
													<div class="state-action"><button id="rejectRefund" class="zent-btn jujue">拒绝确认收货</button></div>
													<div class="state-remind-region">
														<div class="dashed-line"></div>
														<div class="state-remind">
															<h4>提醒：</h4>
															<ul>
																<li>收到买家退货时，请及时验货。</li>
																<li>如果拒绝申请，买家有权要求介入处理。</li>
																<li>如果你逾期未处理，将自动退款给买家。</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 55  }">
											<div class="state-region" id="">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>济南仓已确认收货</h3>
													<div class="state-desc">
														<div>
															<div>
																收货时间：${refundManyInfo.refundMap.receive_time }，收货人员：${refundManyInfo.refundMap.emp_name }
																<p>
																	收货商品描述:
																	<span class="color-orange">${refundManyInfo.refundMap.description }</span>
																</p>
																<p>
																	请在
																	<span class="color-orange"><em id="color-orange"></em></span>
																	内确认，如逾期未处理，将自动退款给买家。
																</p>
															</div>
														</div>
													</div>
													<div class="state-action"><button id="agreeRefund" class="zent-btn zent-btn-primary">同意收货退款</button>
<!-- 													<button id="rejectRefund" class="zent-btn jujue">拒绝确认收货</button> -->
													</div>
													<div class="state-remind-region">
														<div class="dashed-line"></div>
														<div class="state-remind">
															<h4>提醒：</h4>
															<ul>
																<li>收到买家退货时，请及时验货。</li>
																<li>如果拒绝申请，买家有权要求介入处理。</li>
																<li>如果你逾期未处理，将自动退款给买家。</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 5 }">
											<div class="state-region">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>商家未收到货，不同意退款申请</h3>
													<div class="state-desc">
														<div>
															<div>
																你已拒绝本次退款申请，买家修改退货申请后，需要你重新处理。
																<p>
																	买家在
																	<span class="color-orange"><em id="color-orange" ></em></span>
																	内未响应，退款申请将自动撤销。
																</p>
															</div>
														</div>
													</div>
													<div class="state-still-can">
														<span>你还可以：</span>
														<a href="javascript:;" id="agree33">同意退款给买家</a>
													</div>
													<div class="state-remind-region">
														<div class="dashed-line"></div>
														<div class="state-remind">
															<h4>提醒：</h4>
															<ul>
																<li>买家修改退款申请后，需要你重新处理。</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 6 }">
											<div class="state-region" id="applySuccess">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon success">√</span>退款成功</h3>
													<div class="state-desc">
														<div>
															<div>
																<p>	
																	<span>退款金额：${refundManyInfo.refundMap.refund_money }元</span>
																	<!-- <a href="" target="_blank">查看钱款去向</a> -->
																</p>
																<p>退款方式：<span id="refund_style">${refundManyInfo.refundMap.refund_style }</span></p>
																<%-- <p>
																	到账时间：
																	<span id="refund_time">${refundManyInfo.refundMap.accounting_time }</span>
																</p> --%>
															</div>
														</div>
													</div>
													<div class="state-action"></div>
													<div class="state-remind-region">
														<div class="dashed-line"></div>
														<!-- 
														<div class="state-remind">
															<h4>提醒：</h4>
															<ul>
																<li>如通过“微信支付-代销”付款订单，退款3个工作日到账。</li>
																<li>如通过“微信支付-自有”付款订单，需要前往对应财付通帐号进行退款操作。</li>
															</ul>
														</div> -->
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 7 }">
											<!-- 等待申请退款 -->
											<div class="state-region">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>退款关闭</h3>
													<div class="state-desc">
														<div>
															<div>
																本次退款已被撤销
															</div>
														</div>
													</div>
												</div>
											</div>
										</c:when>
										<c:when test="${refundManyInfo.refundMap.commodity_refunds == 8 }">
											<div class="state-region">
												<div style="padding: 0px 0px 30px 40px;">
													<h3 class="state-title"><span class="icon info">!</span>退款关闭</h3>
													<div class="state-desc">
														<div>
															<div>
																退款长期未处理，撤销申请
															</div>
														</div>
													</div>
												</div>
											</div>
										</c:when>
									</c:choose>
								</div>
								
								<!-- 协商记录模块 -->
								<div class="safeguard-log">
									<h3>协商记录</h3><span class="send-comments pull-right" style="display: none;">点击发表留言</span>
									<div class="form-horizontal reply-comments hide">
										<div class="control-group">
											<div class="controls message-editor">
												<div class="reply-dialog">
												<textarea class="transparent-txta" cols="30" rows="1" placeholder="你可以在这里给买家留言，为了保证你的权益，请尽可能详细的上传留言资料。"></textarea>
													<div class="inputer-actions"><span>大约还可输入<i>300</i>字</span></div>
													<div class="actions">
														<button class="zent-btn zent-btn-primary postComment" style="outline: 0px;">发表留言</button>
													</div>
													<div class="images">
														<div style="display: inline-block;"></div>
														<div class="image" style="display: inline-block;"><span class="add-image">+</span></div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<table>
										<tbody>
											<c:forEach items="${refundManyInfo.recordList }" var="recordInfo">
												<!-- 判断类型 -->
												<tr class="tr-title">
													<c:choose>
														<c:when test="${recordInfo.operate_people == 1}">
															<td>商家</td>
														</c:when>
														<c:when test="${recordInfo.operate_people == 2}">
															<td>买家</td>
														</c:when>
														<c:otherwise>
															<td>超时系统</td>
														</c:otherwise>
													</c:choose>
													<td class="td-time">${recordInfo.operate_time }</td>
												</tr>
												
												<c:choose>
													<c:when test="${recordInfo.commodity_refund_state == 1}">
														<tr>
															<td colspan="2">发起了退款申请,等待商家处理</td>
														</tr>
														<tr>
															<td class="td-meta">
																退款原因：
															</td>
															<td>${recordInfo.buyer_refund_reason }</td>
														</tr>
														<tr>
															<td class="td-meta">
																处理方式：
															</td>
															<c:choose>
																<c:when test="${recordInfo.handle_way == 1 }">
																	<td>仅退款</td>
																</c:when>
																<c:otherwise>
																	<td>退货退款</td>
																</c:otherwise>
															</c:choose>
														</tr>
														<tr>
															<td class="td-meta">
																退款金额：
															</td>
															<td>${recordInfo.refund_money }</td>
														</tr>
														<tr>
															<td class="td-meta">
																退款说明：
															</td>
															<td>${recordInfo.buyer_refund_explain }</td>
														</tr>
														<tr>
															<td class="td-meta">
																联系电话：
															</td>
															<td>${recordInfo.buyer_phone }</td>
														</tr>
 														<tr>
															<td></td>
															<td>
																<c:forEach items="${recordInfo.img_url_str }" var="imgUrl">
																	<div class="ui-centered-image" src="${imgUrl }">
																	<img  src="${imgUrl }"></div>
																</c:forEach>
															</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 2}">
														<tr>
															<td colspan="2">拒绝了本次退款申请,等待买家修改</td>
														</tr>
														<tr>
															<td class="td-meta">
																拒绝原因：
															</td>
															<td>${recordInfo.seller_refuse_refund_reason }</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 3}">
														<tr>
															<td colspan="2">已同意退款申请,等待买家退货</td>
														</tr>
														<tr>
															<td class="td-meta">
																退货地址：
															</td>
															<%-- <td>${recordInfo.seller_delivery_address }</td>  这一列没保存数据--%>
															<td>${recordInfo.seller_delivery_address}</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 4}">
														<tr>
															<td colspan="2">
																已退货，等待商家确认收货
															</td>
														</tr>
														<tr>
															<td class="td-meta">
																物流名称：
															</td>
															<td>${recordInfo.logistics_name }</td>
														</tr>
														<tr>
															<td class="td-meta">
																物流编号：
															</td>
															<td>${recordInfo.logistics_number }</td>
														</tr>
														<tr>
															<td class="td-meta">
																退款说明：
															</td>
															<td>${recordInfo.buyer_refund_explain }</td>
														</tr>
														<tr>
															<td class="td-meta">
																联系电话：
															</td>
															<td>${recordInfo.buyer_phone }</td>
														</tr>	
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 55}">
														<tr>
															<td colspan="2">
																济南仓已确认收货
															</td>
														</tr>
														<tr>
															<td class="td-meta">
																收货人员：
															</td>
															<td>${recordInfo.emp_name }</td>
														</tr>
														<tr>
															<td class="td-meta">
																收货时间：
															</td>
															<td>${recordInfo.receive_time }</td>
														</tr>
														<tr>
															<td class="td-meta">
																商品描述：
															</td>
															<td>${recordInfo.description }</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 5}">
														<tr>
															<td colspan="2">
																未收到退货，商家拒绝确认收货
															</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 6}">
														<tr>
															<td colspan="2">
																同意退款给买家，本次维权结束
															</td>
														</tr>
														<tr>
															<td class="td-meta">
																退款金额：
															</td>
															<td>${recordInfo.refund_money }</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 7}">
														<tr>
															<td colspan="2">
																主动撤销退款，退款关闭
															</td>
														</tr>
													</c:when>
													<c:when test="${recordInfo.commodity_refund_state == 8}">
														<tr>
															<td colspan="2">
																退款长期未处理，撤销申请
															</td>
														</tr>
													</c:when>
												</c:choose>
											</c:forEach>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="notify-bar js-notify animated hinge hide">
					</div>
				</div>
			</div>
		</div>
		<div class="widget-image-preview-backdrop"></div>
		<div class="widget-image-preview">
			<div class="ui-centered-image js-image-background">		
				<img class="js-image-0" src="">		
			</div>		
			<div class="preview-close js-close">×</div>		
		</div>
		
		<div class="widget-image-preview-backdrop"></div>
		<div class="modal in hide agree" aria-hidden="false" style="height: 280px;margin-top: -140px;top:50%;">
			<div class="modal-header">
			    <a class="close" data-dismiss="modal">×</a>
			    <h4 class="title">维权处理</h4>
			</div>
		    <div class="modal-body widget-order-refund">
		        <div class="alert">
		                                  该笔订单通过 “<span style="color: #f60;">微信安全支付－代销</span>” 付款，
			                        需您同意退款申请，买家才能退货给您；
			                        买家退货后您需再次确认收货后，退款将自动原路退回至买家付款账户；
			        <div class="waiting" >
			        	<img src="${basePath }/commons/images/publicPicture/loading.gif"></img>	
			        </div>
		        </div>
		        <div class="form-horizontal" style="margin: 0;">
		            <div class="control-group">
		                <div class="control-label">处理方式：</div>
		                <div class="controls">
		                    <c:choose>
		                		<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
		                			<div class="control-action">仅退款</div>
		                		</c:when>
		                		<c:otherwise>
		                			<div class="control-action">退货退款</div>
		                		</c:otherwise>
		                	</c:choose>
		                </div>
		            </div>
		            <div class="control-group">
		                <div class="control-label">退款金额：</div>
		                <div class="controls">
		                	<div class="control-action" style="color: #f60;">￥ ${refundManyInfo.refundMap.refund_money }</div>
		                </div>
		            </div>
		        </div>
		    </div>
		    <div class="modal-footer">
		        <div class="text-left" style="padding-left: 130px;">
		        	<button id="agreehandle1" class="ui-btn ui-btn-primary js-accept" style="width: 80px;">同意</button>
		        	<button id="agreehandle2" class="ui-btn ui-btn-primary js-accept" style="width: 80px;margin-left: 120px;background: transparent;color: #000;border-color: #ccc;">关闭</button>
		        </div>
		    </div>
		</div>
		<div class="modal in hide refuse" aria-hidden="false" style="height: 370px;margin-top: -140px;top:50%;">
			<div class="modal-header">
			    <a class="close" data-dismiss="modal">×</a>
			    <h3 class="title">维权处理</h3>
			</div>
		    <div class="modal-body widget-order-refund">
		        <div class="alert">
			                    建议您与买家协商后，再确定是否拒绝退款。如您拒绝退款后，买家可修改退款申请协议重新发起退款。
			                    也可直接发起维权申请，将会由客服介入处理。
		        </div>
		        <div class="form-horizontal" style="margin: 0;">
		            <div class="control-group">
		                <div class="control-label">处理方式：</div>
		                <div class="controls">
		                	<c:choose>
		                		<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
		                			<div class="control-action">仅退款</div>
		                		</c:when>
		                		<c:otherwise>
		                			<div class="control-action">退货退款</div>
		                		</c:otherwise>
		                	</c:choose>
		                </div>
		            </div>
		            <div class="control-group">
		                <div class="control-label">退款金额：</div>
		                <div class="controls">
		                	<div class="control-action" style="color: #f60;">￥ ${refundManyInfo.refundMap.refund_money }</div>
		                </div>
		            </div>
	                <div class="control-group">
	                    <div class="control-label">拒绝理由：</div>
	                    <div class="controls">
	                        <textarea name="reject_reason" class="span4" rows="3" style="width:300px;height:70px;" placeholder="请填写您的拒绝理由"></textarea>
	                    </div>
	                    <p class="help-block error-message hide" style="padding-left: 10px;">请填写拒绝理由</p>
	                </div>
		        </div>
		    </div>
		    <div class="modal-footer">
		        <div class="text-left" style="padding-left: 130px;">
		                <button class="ui-btn ui-btn-primary js-reject" style="width: 80px;">拒绝</button>
		        </div>
		    </div>
		</div>
		
		
		<div class="modal in hide refuse2" aria-hidden="false" style="height: 370px;margin-top: -140px;top:50%;">
			<div class="modal-header">
			    <a class="close" data-dismiss="modal">×</a>
			    <h3 class="title">维权处理</h3>
			</div>
		    <div class="modal-body widget-order-refund">
		        <div class="alert">
			                    建议您与买家协商后，再确定是否拒绝退款。如您拒绝退款后，买家可修改退款申请协议重新发起退款。
			                    也可直接发起维权申请，将会由客服介入处理。
		        </div>
		        <div class="form-horizontal" style="margin: 0;">
		            <div class="control-group">
		                <div class="control-label">处理方式：</div>
		                <div class="controls">
		                	<c:choose>
		                		<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
		                			<div class="control-action">仅退款</div>
		                		</c:when>
		                		<c:otherwise>
		                			<div class="control-action">退货退款</div>
		                		</c:otherwise>
		                	</c:choose>
		                </div>
		            </div>
		            <div class="control-group">
		                <div class="control-label">退款金额：</div>
		                <div class="controls">
		                	<div class="control-action" style="color: #f60;">￥ ${refundManyInfo.refundMap.refund_money }</div>
		                </div>
		            </div>
	                <div class="control-group">
	                    <div class="control-label">拒绝理由：</div>
	                    <div class="controls">
	                        <textarea name="reject_reason" class="span5" rows="3" style="width:300px;height:70px;" placeholder="请填写您的拒绝理由"></textarea>
	                    </div>
	                    <p class="help-block error-message hide" style="padding-left: 10px;">请填写拒绝理由</p>
	                </div>
		        </div>
		    </div>
		    <div class="modal-footer">
		        <div class="text-left" style="padding-left: 130px;">
		                <button id="rejectRefund2" class="ui-btn ui-btn-primary js-reject" style="width: 80px;">拒绝</button>
		        </div>
		    </div>
		</div>
		
		<div class="modal in control_add" aria-hidden="false" style="display: none;width:650px; margin-left: -325px;margin-top:-270px;height:540px;bottom:auto;">
			<div class="modal-header">
				<a class="close" data-dismiss="modal">×</a>
				<h3 class="title">维权处理</h3>
			</div>
			<div class="modal-body widget-order-refund">
				<div class="alert">
					该笔订单通过 “<span style="color: #f60;">微信安全支付－代销</span>” 付款， 需您同意退款申请，买家才能退货给您； 买家退货后您需再次确认收货后，退款将自动原路退回至买家付款账户；
				</div>
				<div class="form-horizontal" style="margin: 0;">
					<div class="control-group">
						<div class="control-label">处理方式：</div>
						<div class="controls">
							<c:choose>
								<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
									<div class="control-action">仅退款</div>
								</c:when>
								<c:otherwise>
									<div class="control-action">退货退款</div>
								</c:otherwise>
							</c:choose>
						</div>
					</div>
					<div class="control-group">
						<div class="control-label">退款金额：</div>
						<div class="controls">
							<div class="control-action" style="color: #f60;">￥ ${refundManyInfo.refundMap.refund_money }</div>
						</div>
					</div>
	
					<div class="control-group control-group-address">
						<div class="control-label">退货地址：
						</div>
						<!-- 
						<a class="address-control-a"  target="_blank">
							管理地址
						</a> -->
						<div class="controls">
							<div class="control-action" id="seller_address"></div>
						</div>
					</div>
				<%-- 	<ul class="address-list">
						<li class="address-list-i">
							<lable class="address-list-radio-lable js-select-address" data-id="85333">
								<input type="radio" class="address-list-radio-input" name="add">
								<div class="address-list-limit">
									<span>${refundManyInfo.refundMap.seller_delivery_address }</span>
								</div>
								<span class="address-list-default">默认地址</span>
							</lable>
						</li>
					</ul> --%>
					<!-- 
					<div class="address-add-new">
						<label class="address-add-new-label js-add-new-address">
	                        <input type="radio" class="js-address-add-new-input" name="add">
	                        <div class="address-add-new-text">
	                           		 使用新地址
	                        </div>
	                    </label>
						<div class="new-address-block hide">
                            
                            <div class="js-new-address-form">
                            	<div data-reactroot="" class="location-add">
									<form class="zent-form zent-form--horizontal location-add-form">
										<div class="zent-form__control-group "><label class="zent-form__control-label">react-text: 8联系人：/react-text</label>
											<div class="zent-form__controls">
												<div class="zent-input-wrapper"><input type="text" class="zent-input" name="contact_name" placeholder="请填写联系人姓名"></div>
												react-text: 12
												/react-text
											</div>
										</div>
										<div class="zent-form__control-group"><label class="zent-form__control-label">联系方式：</label>
											<div class="zent-form__controls">
												<div tabindex="0" class="zent-select areacode  ">
													<div class="zent-select-text">中国 +86</div>
												</div>
												<div class="zent-input-wrapper phone-num"><input type="text" class="zent-input phone" placeholder="请填写手机号"></div>
											</div>
										</div>
										<div class="zent-form__control-group "><label class="zent-form__control-label">react-text: 23联系地址：/react-text</label>
											<div class="zent-form__controls">
												<div>
													<div tabindex="0" class="zent-select areacode  ">
														<div class="zent-select-text">中国</div>
													</div>
													<div class="zent-region-select-wrap regions-select" style="float: left;">
														<div class="zent-popover-wrapper" style="display: block;">
															<div id="store-selector">
																<div class="zent-region-select__text text" style="width:246px;"><div></div><b></b></div>                   
																<div onclick="$('#store-selector').removeClass('hover')" class="close"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="zent-form__control-group "><label class="zent-form__control-label">react-text: 37详细地址：/react-text</label>
											<div class="zent-form__controls">
												<div class="zent-input-wrapper"><input type="text" class="zent-input" name="address" placeholder="请填写详细地址，如街道名称，门牌号等信息"></div>
												react-text: 41
												/react-text
											</div>
										</div>
										<div class="zent-form__form-actions"><button class="ui-btn ui-btn-primary" type="button">同意退货，发送退货地址</button></div>
									</form>
								</div>
                            </div>
                        </div>
	
					</div> -->
	
				</div>
			</div>
			<!-- 没有新地址时用这个 -->
			<div class="modal-footer" style="display: block;">
				<div class="text-left" style="padding-left: 130px;margin-top: 130px;">
					<button id="sendGoods" class="ui-btn ui-btn-primary js-accept" style="width: 140px;margin-left: 100px">同意退货，发送退货地址</button>
				</div>
			</div>
		</div>
		
		<div class="modal in agreeRefund" aria-hidden="false" style="height: 320px;bottom: 280px;">
			<div class="modal-header">
			    <a class="close" data-dismiss="modal">×</a>
			    <h3 class="title">维权处理</h3>
			</div>
		    <div class="modal-body widget-order-refund">
		        <div class="alert">
		                      该笔订单通过 “<span style="color: #f60;">微信安全支付－代销</span>” 付款，
		                        需您同意退款申请，买家才能退货给您；
		                        买家退货后您需再次确认收货后，退款将自动原路退回至买家付款账户；
		        </div>
		        <div class="form-horizontal" style="margin: 0;">
		            <div class="control-group">
		                <div class="control-label">处理方式：</div>
		                <div class="controls">
		                	<c:choose>
								<c:when test="${refundManyInfo.refundMap.handle_way == 1 }">
									<div class="control-action">仅退款</div>
								</c:when>
								<c:otherwise>
									<div class="control-action">退货退款</div>
								</c:otherwise>
							</c:choose>
		                </div>
		            </div>
		            <div class="control-group">
		                <div class="control-label">退款金额：</div>
		                <div class="controls">
		                	<div class="control-action" style="color: #f60;">￥ ${refundManyInfo.refundMap.refund_money }</div>
		                </div>
		            </div>
	                <div class="control-group">
	                    <div class="control-label">退货地址：</div>
	                    <div class="controls">
	                        <div name="address" class="control-action" style="width: 300px;">
	                           	  ${refundManyInfo.refundMap.seller_delivery_address }
	                        </div>
	                    </div>
	                </div>
		            
		        </div>
		    </div>
		    <div class="modal-footer">
		        <div class="text-left" style="padding-left: 130px;">
		        	<button class="ui-btn ui-btn-primary js-sign" id="confirmRefund">确认收到退货</button>
		        </div>
		    </div>
		</div>
		
		<script>
			$(function(){
				 
				//$('#refund_style').text(sessionStorage.getItem("refund_style"));
				//$('#refund_time').text(sessionStorage.getItem("refund_time"));
				
				$('.theme').attr("onload","timeCounter('color-orange')");
				$('td div.ui-centered-image').click(function(){
					var img_path = $(this).attr("src");
					$('.js-image-0').attr("src",img_path);
					$('.widget-image-preview-backdrop').show();
					$('.widget-image-preview').show();
					var w=window.innerWidth;
					var h=window.innerHeight;
					$('.js-image-background').css({'width':w,'height':h});
					$('.js-image-0').css({'max-width':w,'max-height':h});
					$('.preview-close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.widget-image-preview').hide();
					});
				});
				
				//点击同意退货，发送退货地址
				$('#agree2').click(function(){
					$.ajax({
						url : getRootPath()+ '/refundrights/queryRefund_adress.action',
						type : 'POST',
						dataType : 'json',					
						success : function(result){
							 if(result){
								 var address="<p>"+result.refund_address+"</p>";
								 $("#seller_address").text(result.refund_address);
			
							 }
						}
					});
					
					
					
					$('.widget-image-preview-backdrop').show();
					$('.control_add').show();
					var h=$('.control_add').height();
					$('.control_add').css({'position':'fixed','top':'35%'});
					$('.address-list-radio-input').prop('checked',true);
					$('.new-address-block').hide();
					$('.modal-footer').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.control_add').hide();
					})
					$(":radio").change(function(){
						if($('.address-list-radio-input').prop("checked")){
							$('.new-address-block').hide();
							$('.modal-footer').show();
						}else{
							$('.new-address-block').show();
							$('.modal-footer').hide();
						}
						
					});
				});
				
				$('#agree66').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.agree').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.agree').hide();
					});
				});
				
				//仅退款模式  点击同意
				$('#agreehandle1').click(function(){
					var refund_id = '${refundManyInfo.refundMap.id}';
					//同意退款申请之后需要调用退款接口
					var out_trade_no = '${refundManyInfo.refundMap.order_num}';//订单号
					var order_num_encrypt = '${refundManyInfo.refundMap.order_num_encrypt}';//加密后的订单号
					var total_fee = '${refundManyInfo.refundMap.pay_mount}';//实际付款金额
					var refund_fee = '${refundManyInfo.refundMap.refund_money}';//退款金额
					var refund_desc = '${refundManyInfo.refundMap.buyer_refund_explain}';//退款原因
					var result= toreturn(order_num_encrypt,total_fee,refund_fee,refund_desc);
					$('.waiting').show();
					$(this).attr('disabled',"true");//按钮禁用
					$(this).addClass('btn-change');//按钮后改变颜色==>提示已经同意过了
					if(result.result_code=="SUCCESS"){
						updStatusMethod("agree","6");
					}else{
						$('.close').click();
						alert(result.err_code_des);
						$('.waiting').hide();
					} 
				});
				//点击关闭按钮，关闭弹出框
				$("#agreehandle2").click(function(){
					$('.close').click();
				})
				//点击同意退货，发送退货地址
				$('#agree22').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.agreeRefund').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.agreeRefund').hide();
					});
				});
				
				//发送
				$('#sendGoods').click(function(){
					var refund_id = '${refundManyInfo.refundMap.id}';
					updStatusMethod("agree","3");
				});
				
				//仅退款模式 拒绝退款申请
				$('#reject2').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.refuse').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.refuse').hide();
					});
				});
				
				//仅退款模式 同意买家退款
				$('#agree1').click(function(){
					//点击同意退款后，需要判断是否为微信退款并且退款原因为拼团失败退款，此时不需要跳转其他的页面，只需要弹框提示即可
					var pay_type = '${refundManyInfo.refundMap.pay_type}';//支付方式
					var refund_renson = '${refundManyInfo.refundMap.buyer_refund_reason}';//退款原因
					var order_num = '${refundManyInfo.refundMap.order_num}';
					var refundsId = '${refundManyInfo.refundMap.id}';//退款表的id,因为需要根据这个id去修改退款状态
					$('.widget-image-preview-backdrop').show();
					$('.agree').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.agree').hide();
					});
					
						
				});
				
				//退货退款模式 同意买家退款
				$('#agree11').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.control_add').show();
					var h=$('.control_add').height();
					$('.control_add').css({'position':'fixed','top':'35%'});
					$('.address-list-radio-input').prop('checked',true);
					$('.new-address-block').hide();
					$('.modal-footer').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.control_add').hide();
					})
					$(":radio").change(function(){
						if($('.address-list-radio-input').prop("checked")){
							$('.new-address-block').hide();
							$('.modal-footer').show();
						}else{
							$('.new-address-block').show();
							$('.modal-footer').hide();
						}
					});
				});
				
				//仅退款模式 拒绝退款申请
				$('#reject1').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.refuse').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.refuse').hide();
					});
				});
				
				//仅退款模式 拒绝退款申请
				$('#rejectRefund').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.refuse2').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.refuse2').hide();
					});
				});
				
				$('#rejectRefund2').click(function(){
					var refund_id = '${refundManyInfo.refundMap.id}';
					var reson = $('.span5').val();
					if(reson == ""){
						$('.refuse div.control-group').eq(2).addClass('error');
						$('.help-block').text('请填写拒绝理由');
						$('.help-block').show();
						return false;
					}else{
						$('.refuse div.control-group').eq(2).removeClass('error');
						$('.help-block').hide();
						updStatusMethod("reject","5",reson);
						return true;
					}
				});
				
				//仅退款模式  点击拒绝退款申请
				$('.js-reject').click(function(){
					var refund_id = '${refundManyInfo.refundMap.id}';
					var reson = $('.span4').val();
					if(reson == ""){
						$('.refuse div.control-group').eq(2).addClass('error');
						$('.help-block').text('请填写拒绝理由');
						$('.help-block').show();
						return false;
					}else{
						$('.refuse div.control-group').eq(2).removeClass('error');
						$('.help-block').hide();
						updStatusMethod("reject","2",reson);
						return true;
					}
				});
				
				//统一退货退款
				$('#agreeRefund').click(function(){
					parent.layer.confirm('请确认技术人员已经对退货商品进行了后台处理?', {
						  btn: ['确认', '取消'] //可以无限个按钮
						}, function(index){  //点击是
							//点击同意退款后，需要判断是否为微信退款并且退款原因为拼团失败退款，此时不需要跳转其他的页面，只需要弹框提示即可
							var pay_type = '${refundManyInfo.refundMap.pay_type}';//支付方式
							var refund_renson = '${refundManyInfo.refundMap.buyer_refund_reason}';//退款原因
							var order_num = '${refundManyInfo.refundMap.order_num}';
							var refundsId = '${refundManyInfo.refundMap.id}';//退款表的id,因为需要根据这个id去修改退款状态
							$('.widget-image-preview-backdrop').show();
							$('.agreeRefund').show();
							$('.close').click(function(){
								$('.widget-image-preview-backdrop').hide();
								$('.agreeRefund').hide();
							});
							parent.layer.close(index);
						}, function(index){ //点击否
						
						})
				});
				
				$('#agree33').click(function(){
					$('.widget-image-preview-backdrop').show();
					$('.agreeRefund').show();
					$('.close').click(function(){
						$('.widget-image-preview-backdrop').hide();
						$('.agreeRefund').hide();
					});
				});
				
				//确认收到退货
				$('#confirmRefund').click(function(){
					$('.waiting').show();
					$(this).attr('disabled',"true");//按钮禁用
					$(this).addClass('btn-change');//按钮后改变颜色==>提示已经同意过了
					var refund_id = '${refundManyInfo.refundMap.id}';
					//同意退款申请之后需要调用退款接口
					var out_trade_no = '${refundManyInfo.refundMap.order_num}';//订单号
					var order_num_encrypt = '${refundManyInfo.refundMap.order_num_encrypt}';//加密后的订单号
					var total_fee = '${refundManyInfo.refundMap.pay_mount}';//实际付款金额
					var refund_fee = '${refundManyInfo.refundMap.refund_money}';//退款金额
					var refund_desc = '${refundManyInfo.refundMap.buyer_refund_explain}';//退款原因
					var result = toreturn(order_num_encrypt,total_fee,refund_fee,refund_desc);
					if(result.result_code=="SUCCESS"){
						updStatusMethod("agree","6");
					}else{
						$('.close').click();
						alert(result.err_code_des);
						$('.waiting').hide();
					}
				});
				
				//修改状态公共方法
				function updStatusMethod(type,commodity_refunds,reson){
					var refund_id = '${refundManyInfo.refundMap.id}';
					var seller_address = $("#seller_address").html();
					$.ajax({
						url:getRootPath()+'/refundrights/updateRefundStatusById.action',
						type:'post',
						dataType:'text',
						async:false,
						data:{
							"refundId":refund_id,
							"type":type,
							"commodity_refunds":commodity_refunds,
							"reson":reson,
							"seller_address":seller_address
						},
						success:function(data){
							if(data=="success"){
								if(type=="agree" && commodity_refunds == "6"){
									var order_num_encrypt = '${refundManyInfo.refundMap.order_num_encrypt}';//加密后的订单号
									var resultMap = toreturnfund(order_num_encrypt);
									if(resultMap.result_code=="SUCCESS"){
										//成功之后需要修改到账时间和退款方式
										$.ajax({
											url:getRootPath()+'/refundrights/updateTimeAndStyleById.action',
											type:'post',
											dataType:'text',
											async:false,
											data:{
												"refundId":refund_id,
												"refund_style":resultMap.refund_recv_accout,
												"accounting_time":resultMap.refund_success_time
											},
											success:function(data){
												//alert(data);
												$('.waiting').hide();
											}
										});
									}
								}
								$('.waiting').hide();
								$('.close').click();
								location.reload();
							}else{
								$('.waiting').hide();
								alert("操作失败！");
							}
						}
					});
				}
				
				//倒计时
				var apply_refund_time = '${refundManyInfo.refundMap.apply_refund_time}';//申请退款时间
				var date1=new Date(apply_refund_time).getTime()+604800000-new Date().getTime();
				var total = Math.round(date1/1000);
				timeCounter = (function() {
				 	var time;
				 	return function(elemID) {
				 		obj = document.getElementById(elemID);
				 		if(isNotEmpty(obj)){
					 		var d=(total/60/60/24)<10?('0'+parseInt(total/60/60/24)):parseInt(total/60/60/24);
					        var h=(total/60/60%24)<10?('0'+parseInt(total/60/60%24)):parseInt(total/60/60%24);
					 		var m = (total/60%60)<10?('0'+parseInt(total/60%60)):parseInt(total/60%60);
					 		var s = (total % 60) < 10 ? ('0' + total % 60) : total % 60;
					 		obj.innerHTML = d + ' 天 ' +h + ' 时 ' +m + ' 分 ' + s+'秒';
					 		total--;
					 		time = setTimeout("timeCounter('" + elemID + "')", 1000);
					 		if(total < 0) clearTimeout(int);
				 		}
				 	}
				})();
			});
		</script>
	</body>
</html>
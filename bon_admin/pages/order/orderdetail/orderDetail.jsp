<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet"href="${basePath}/pages/order/orderdetail/orderDetails.css"media="screen">
<link rel="stylesheet"href="${basePath}/pages/order/orderdetail/pc.css"media="screen">
<script type="text/javascript"src="${basePath}/pages/order/orderdetail/orderDetail.js"></script>
<script type="text/javascript" src="${basePath}/pages/order/refundrights/wxoperate.js"></script>
<script type="text/javascript" src="http://pv.sohu.com/cityjson"></script>
<style type="text/css">
.layui-table tr:hover, .layui-table[lay-even] tr:nth-child(even) {
    background-color: #ffffff;
}
.layui-table thead tr:hover{
    background-color: #f2f2f2;
}
.layui-table tr{
	border-left:1px
}
.botton-orange>a{
    padding: 3px 8px;
    margin-top: 5px;
    color: #f90;
    display: inline-block;
    border: 1px solid #f90;
    border-radius: 5px
}
.button-click{
	display: inline-block;
    padding: 3px;
    margin-top: 5px;
    background: #f8f8f8;
    color: #333;
    border: 1px solid #ddd
}
.tb-name{
    "width": "140px"
}
.tb-price{
    "width": "70px"
}
.tb-num {
    "width": "40px"
}
.tb-total {
    "width": "70px"
}
.tb-coupon {
    "width": "100px"
}
.tb-discount {
    "width": "40px"
}
.tb-postage {
    "width": "76px"
}
.express-meta{
	margin-right: 20px;
}


.logistics-div{
    position: fixed;
    top: 230px;
    left: 35%;
    width: 630px;
    margin: 0 auto;
    border-radius: 5px;
    z-index: 1500;
    background: #fff;
}
.logistics-header {
    padding: 9px 15px;
    border-bottom: 1px solid #eee;
}
.logistics-close {
    float: right;
    font-size: 20px;
    font-weight: 700;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    cursor: pointer;
}
.logistics-header .title{
    margin: 0;
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
}
.logistics-body{
    margin:15px;
}
.logistics{
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-bottom: 0;
    border-collapse: collapse;

    border: 1px solid #E5E5E5;
}
.logistics thead tr{
    background: #f8f8f8;
    font-weight: bold;
}
.logistics tr td,.logistics tr th{
    padding: 10px;
    border-bottom: 1px solid #E5E5E5;
    box-sizing: content-box;
    vertical-align: middle;
}
#shadeTier{
	width:100%;
           height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transition: none 0.2s ease;
            opacity: 1;
        }
.express-latest-news {
    color: #390;
}
.layui-btn-normal{
	background:#38f;
}
body,div,ul,p{
    margin: 0;
    padding: 0;
}
ul,ol{
    list-style: none;
}
.zent-pop {
    display: inline-block;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 6px rgba(0,0,0,0.4);
    box-shadow: 0 1px 6px rgba(0,0,0,0.4);
    background-color: #fff;
    z-index: 1050;
    font-size: 12px;
}
.zent-pop:after {
    content: "";
    display: block;
    position: absolute;
    width: 11px;
    height: 11px;
}
.zent-pop.zent-popover-position-top-right:after {
    bottom: -11px;
    width: 100%;
    left: 0;
}
.zent-pop .zent-pop-inner {
    position: relative;
    background: #fff;
    border-radius: 2px;
    padding: 10px 20px;
    z-index: 2;
    color: #333;
}
.zent-pop.zent-popover-position-top-right .zent-pop-arrow {
    -webkit-transform: translateY(50%) rotate(45deg);
    -moz-transform: translateY(50%) rotate(45deg);
    -ms-transform: translateY(50%) rotate(45deg);
    transform: translateY(50%) rotate(45deg);
    right: 14px;
}
.zent-pop.zent-popover-position-top-right .zent-pop-arrow {
    bottom: 0;
}
.zent-pop .zent-pop-arrow {
    position: absolute;
    z-index: 1;
    width: 6px;
    height: 6px;
    background: #fff;
    -webkit-box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    overflow: hidden;
}
</style>
<title>订单详情</title>
</head>
<body>

	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">订单详情</span>
  	</div>
	<div class="inner-page-main ">
		<div class="inner-page-main-container">
			<div class="app">
				<div class="clearfix">
					<div class="app-init-container">
						<div data-reactroot="" class="page-trade-order-detail">
							<div class="step-region" id="head-div">
								<ul id="ui-step" class="ui-step ui-step-4">
									<li class="">
										<div class="ui-step-title">买家下单</div>
										<div class="ui-step-number">1</div>
										<div class="ui-step-meta"></div>
									</li>
									<li class="">
										<div class="ui-step-title">买家付款</div>
										<div class="ui-step-number">2</div>
										<div class="ui-step-meta"></div>
									</li>
									<li class="">
										<div class="ui-step-title">商家发货</div>
										<div class="ui-step-number">3</div>
										<div class="ui-step-meta"></div>
									</li>
									<li class="">
										<div class="ui-step-title">交易完成</div>
										<div class="ui-step-number">4</div>
										<div class="ui-step-meta"></div>
									</li>
								</ul>
							</div>
							<div class="content-region clearfix">
								<div class="info-region"  style="width:320px">
									<h3>
										订单信息 <span class="secured-title">担保交易</span>
									</h3>
									<table class="info-table">
										<tbody>
											<tr>
												<th>订单编号：</th>
												<td id="td_order_num"><a href="">更多</a></td>
											</tr>
											<tr style="display: table-row;">
												<th>订单类型：</th>
												<td>普通订单&nbsp;&nbsp;</td>
											</tr>
											<tr style="display: none;">
												<th>团编号：</th>
												<td>-</td>
											</tr>
											<tr style="display: none;">
												<th>归属网点：</th>
												<td>-</td>
											</tr>
											<tr style="display: none;">
												<th>网点信息：</th>
												<td>-</td>
											</tr>
											<tr>
												<th>付款方式：</th>
												<td id="pay-type"></td>
											</tr>
											<tr>
												<th>买家：</th>
												<td id="td_wx_name"><a href="" class="new-window"
													target="_blank"></a></td>
											</tr>
										</tbody>
									</table>
									<div class="dashed-line"></div>
									<table class="info-table">
										<tbody>
											<tr>
												<th>配送方式：</th>
												<td>快递配送</td>
											</tr>
											<tr>
												<th>收货信息：</th>
												<td><textarea id="p_delivery_info" readonly="readonly" style="resize:none;overflow-y:hidden;
												BORDER-BOTTOM-STYLE:none;BORDER-LEFT-STYLE:none;BORDER-RIGHT-STYLE:none;BORDER-TOP-STYLE:none;"></textarea>
													<div>
														<a href="javascript:;" onclick="copy()">[复制]</a>
													</div></td>
											</tr>
											<tr>
												<th>买家留言：</th>
												<td id="td_buy_remark">-</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="state-region">
									<div style="padding: 0px 0px 30px 40px;" id="centerdiv" >
										
									</div>
								</div>
							</div>
							<div class="order-content"></div>
							<div>
								<table id="orderdetailtable" class='layui-table' lay-skin="line">
								 	<colgroup>
								       <col width="15%">
								       <col width="15%">
								       <col width="15%">
								       <col width="15%">
								       <col width="15%">
								       <col width="15%">
								       <%-- <col> --%>
						  		    </colgroup>
									<thead>
										<tr>
											<th></th>
											<th>商品</th>
											<th>价格(元)</th>
											<th>数量</th>
											<th>优惠(元)</th>
											<th>小计(元)</th>
											<!-- <th>状态</th> -->
										</tr>
									</thead>
									<tbody>
									</tbody>
									<tfoot>
							              <!--  <td colspan="6" style="padding-right: 30px;text-align: right">订单共<span id="commoditycount"></span>
							               		件商品，总计：￥<span id="commoditymoney"></span></td> -->
						               <tr>
											<td colspan="7" class="text-right">
												<span>订单共</span><span id="commoditycount"></span><span>件商品，总计：</span>
												<span class="c-red">￥</span>
												<span class="real-pay c-red" id="commoditymoney"></span>
												<!-- <span>（含运费 ￥0.00）</span> -->
											</td>
										</tr>
							        </tfoot>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="ui-popover bottom-center" style="top: 174px; left: 351px;">
				<div class="ui-popover-inner ">
					<div>123455</div>
					<div>4569855</div>
				</div>
				<div class="arrow"></div>
			</div> -->
		</div>
	</div>
	
	<div class="zent-dialog-backdrop" style="display:none"></div>
	
	<!-- 取消订单 -->
	<div class="zent-dialog widget-order-cancel" style="position:fixed;top: 40%;left:50%;display:none;width: 320px;" >
		<div class="zent-dialog-header">
	    	<div class="zent-dialog-title">取消订单</div>
		    <a href="javascript:;" class="zent-dialog-close cancelcloseorder">×</a>
		</div>
		<div class="zent-dialog-body">
		    <!--  <form onsubmit="return false;">
		        <div class="control-group">
		            <div class="controls">
		                <select name="close_reason" id="close_reason">
		                    <option value="0">请选择一个取消订单理由</option>
		                    <option value="1">无法联系上买家</option>
		                    <option value="2">买家误拍或重拍了</option>
		                    <option value="3">买家无诚意完成交易</option>
		                    <option value="4">已通过银行线下汇款</option>
		                    <option value="5">已通过同城见面交易</option>
		                    <option value="6">已通过货到付款交易</option>
		                    <option value="7">已通过网上银行直接汇款</option>
		                    <option value="8">已经缺货无法交易</option>
		                </select>
		            </div>
		        </div>
		    </form> -->
		    <div class="layui-form-item" style="display: inline-block">
				<label class="layui-form-label" style="width: 100px">订单状态：</label>
				<div class="layui-input-block" style="width: 120px">
					<select lay-filter="test"  id="close_reason" name="close_reason" style="height: 35px;margin-left: -15px;">
						<option value="">请选择一个取消订单理由</option>
	                    <option value="1">无法联系上买家</option>
	                    <option value="2">买家误拍或重拍了</option>
	                    <option value="3">买家无诚意完成交易</option>
	                    <option value="4">已通过银行线下汇款</option>
	                    <option value="5">已通过同城见面交易</option>
	                    <option value="6">已通过货到付款交易</option>
	                    <option value="7">已通过网上银行直接汇款</option>
	                    <option value="8">已经缺货无法交易</option>
					</select>
				 </div>
			</div>
		</div>
		<div class="zent-dialog-footer">
		    <button class="zent-btn zent-btn-primary js-save cancel-order">确定</button>
		    <button class="zent-btn zent-btn-primary-outline js-cancel cancelcloseorder">取消</button>
		</div>
	</div>
	
	<!-- 以下为发货 -->
	<div class="zent-dialog widget-order-express" style="position:fixed;top: 30%;left:50%;width:742px;display:none">
		<div class="zent-dialog-header ">
			<h3 class="zent-dialog-title"> 商品发货</h3>
			<a href="javascript:;" class="zent-dialog-close close-send-delivery">×</a>
		</div>
		<div class="zent-dialog-body">
			<div class="js-total-express total-express"></div>
			<div class="add-express-table-control">
				<div class="js-modal-table">
					<table class="ui-table">
						<thead>
							<tr>
								<!-- 
								<th class="text-right cell-5">
									<input type="checkbox" class="js-check-all">
								</th> -->
								<th class="cell-35">商品</th>
								<th class="cell-15">数量</th>
								<!-- 
								<th class="cell-30">物流 | 单号</th>
								<th class="cell-20">状态</th> -->
							</tr>
						</thead>
						<tbody id="logistics-table"></tbody>
					</table>
				</div>
				<p class="js-goods-tips hide error-goods-tips">请选择发货商品</p>
			</div>
			<form onsubmit="return false;" class="form-horizontal" id="subfm">
				<!-- <input type="hidden" name="isAll" class="goods"> -->
				<div class="control-group" style="margin-top: 20px">
					<label class="control-label" style="width:85px">收货地址：</label>
					<div class="controls" style="margin-left: 100px;">
						<div class="control-action">
						</div>
					</div>
				</div>
				<!-- 
				<div class="control-group">
					<label class="control-label">发货方式：</label>
					<div class="controls">
						<label class="radio inline">
	                    <input type="radio" name="is_need_logistics" value="1" checked="" data-validate="no">物流发货
	                </label>
	
						<label class="radio inline">
	                        <input type="radio" name="is_need_logistics" value="0" data-validate="no">无需物流
	                    </label>
					</div>
				</div> -->
				<div class="clearfix control-2-col js-express-info control-group">
					<div class="layui-inline" style="display: inline-block;">
						<div class="layui-inline">
							<label class="layui-form-label" style="width: 100px;margin-top: -4px">物流公司：</label>
							<div class="layui-input-block"   >
								<select name="logistics_name" id="logistics_name" lay-search=""  style="width: 120px; margin-top: 1px;height: 26px">
		                        </select>
							</div>
						</div>
						 
						<div class="layui-inline express" style="margin-left: 50px">
							<label class="layui-form-label" style="width: 100px;margin-top: -6px">快递单号：</label>
							<div class="layui-input-block"  >
								<input type="text" name="courier_number" id="courier_number" autocomplete="off" class="layui-input">
							</div>
							
						</div>
						<div>
							<p class="help-block error-message hide" style="margin-left: 396px;color: red">请填写快递单号</p>
						</div>
					</div>
					<div class="help-desc" style="clear: both;">
						*请仔细填写物流公司及快递单号，发货后24小时内仅支持做一次更正，逾期不可修改
					</div> 
				</div>
				
			</form>
		</div>
		<div class="zent-dialog-footer">
			<a class="zent-btn zent-btn-primary js-save send-delivery" onclick="check()">保存</a>
		</div>
	</div>
	
	
	
	<!-- 以下为修改物流 -->
	<div class="zent-dialog widget-express-update-dialog" style="position:fixed;top: 30%;left:50%;width:645px;display: none;" >
		<div class="zent-dialog-header ">
			<div class="zent-dialog-title">修改物流</div>
			<a href="javascript:;" class="zent-dialog-close lo-close">×</a>
		</div>
	
		<div class="zent-dialog-body" style="padding-bottom: 0;">
			<p class="update-express-tips">
				请仔细填写快递单号
			</p>
			<form onsubmit="return false;" class="js-express-form form-horizontal" style="margin-bottom: 0;" id="updateForm">
				<div id="package-div">
					
	
				</div>
			</form>
		</div>
	
		<div class="zent-dialog-footer" style="clear: both;">
			<button class="js-save zent-btn zent-btn-primary change-logistics">保存</button>
			<button class="js-close zent-btn zent-btn-primary-outline lo-close">取消</button>
		</div>
	
	</div>
	<!-- 修改价格 -->
	<div class="modal2 order-price in" aria-hidden="false" style="position:fixed;top: 40%;left:50%;width:655px;display:none">
		<div class="modal-header">
			<a class="close" data-dismiss="modal">×</a>
			<h3 class="title">订单原价(含运费)：<span class="js-price-container price-color" id="order_price"></span> 元</h3>
		</div>
		<div class="modal-body js-detail-container">
			<div>
				<form action="" class="form-inline">
					<table class="table order-price-table">
						<thead>
							<tr>
								<th class="tb-name">商品</th>
								<th class="tb-price">单价（元）</th>
								<th class="tb-num">数量</th>
								<th class="tb-total">小计（元）</th>
								<th class="tb-coupon">店铺优惠</th>
								<th class="tb-discount">涨价或减价</th>
								<!-- <th class="tb-postage">运费（元）</th> -->
							</tr>
						</thead>
						<tbody id="changePTB">
	
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="modal-footer clearfix">
			<a href="javascript:;" class="btn btn-primary pull-right js-save-data" data-loading-text="确 定...">确 定</a>
			<div class="final js-footer text-left pull-left">
				<div style="padding:10px 0">
					<p id="address"></p>
					<p id="true-pay">
						<!-- <p>买家实付：<span id="allprice">0.20</span>
						
						       <span id="coupon-symbol"> -</span><span> 0.02</span>
						    
						
						    运费
						    + <span class="js-order-postage">0.00</span>
						
						    减价
						    
						    <span class="decrease-color js-order-change"> - </span>
						    <span>0.01</span>
						
						    实际付款
						    = <span class="price-color js-order-realpay">0.17</span>
						</p> -->
					</p>
	
					<p class="help-block">买家实付 = 原价  + 涨价或减价
					</p>
				</div>
			</div>
		</div>
	</div>
	<div id="shadeTier" style="display: none;"></div>
	<div class="logistics-div" style="display: none;">
	    <div class="logistics-header">
	        <a class="logistics-close" data-dismiss="logistics">×</a>
	        <h3 class="title">物流详情</h3>
	    </div>
	    <div class="logistics-body">
	        <table class="logistics">
	            <thead>
	            <tr>
	                <th class="">时间</th>
	                <th class="">内容</th>
	                <th class="">状态</th>
	            </tr>
	            </thead>
	            <tbody>
	            <tr style="color: #390">
	                <td>2017-11-09 20:39:46</td>
	                <td>【济南转运中心】 已发出 下一站 【漯河转运中心】</td>
	                <td>在途</td>
	            </tr>
	            
	            </tbody>
	        </table>
	    </div>
	</div>
	
	<!-- 以下为主动退款 -->
	<div id="autoRefund" style="display:none;margin-top: 15px;">
		<p style="background-color: #FFF5CB;color: #333;border-color: #FDEEB2;border-radius: 0;padding: 12px 35px 12px 15px;margin-left: 15px;margin-right: 15px;margin-bottom: 15px;">
			商家主动退款功能是一个实验性的产品，仅作为退款维权业务的补充功能，请勿过度依赖和使用。
		</p>
		<table class="layui-table" lay-skin="line" style="width:640px; margin-left: 20px;"> 
			<colgroup>
		        <col width="200">
		        <col width="200">
		        <col>
	      </colgroup>
	      <thead>
	        <tr>
	          <th>商品</th>
	          <th>可退款金额（元）</th>
	          <th>退款金额（元）</th>
	        </tr> 
	      </thead>
	      <tbody>
	        <tr style="width: 60px;">
	          <td id="goodsName"></td>
	          <td id="ketuiAmount"></td>
	          <td>
	          	<input type="text" id="refundAmount" name="refundAmount" lay-verify="required|number" placeholder="请输入退款金额" autocomplete="off" class="layui-input" style="margin-top: 10px;">
			  	<p id="tip" style="font-size: 10px;color: red;display: none;"></p>
			  </td>
			  <td style="display: none;">
			  	<input id="orderGoodsId"/>
			  	<!-- 支付类型 -->
			  	<input id="payType"/>
			  	<!-- 加密后的订单号 -->
			  	<input id="order_num_encrypt"/>
			  	<!-- 原来的实付金额 -->
			  	<input id="real_pay_mount"/>
			  </td>
	        </tr>
	      </tbody>
		</table>
		<p style="margin-left: 20px;margin-top: 20px;font-size: 14px;">退款给买家/付款人：<font id="ketuiMoney" style="color: red;font-weight: bold;">0.00</font></p>
		<div style="margin-left: 617px;margin-top: -20px;">
			<a id="confirmRefund" class="layui-btn layui-btn-small layui-btn-normal">确定</a>
		</div>
	</div>
	
	<div id="createNameDiv" class="zent-pop zent-popover-position-top-right" style="position:absolute;display: none;">
	    <div data-reactroot="" class="zent-popover-content">
	        <div class="zent-pop-inner">
	            <ul id="createUl">
	            </ul>
	        </div>
	        <i class="zent-pop-arrow"></i>
	    </div>
	</div>
</body>
<script type="text/javascript">
$("#centerdiv").on(".addremark","click",function(){
	parent.layer.open({
		title:"添加",
		type: 2,
		area: ['500px', '300px'],
		content: getRootPath()+'/pages/order/allorder/addRemark.jsp?order_num='+ordernum
	});
})
</script>
</html>

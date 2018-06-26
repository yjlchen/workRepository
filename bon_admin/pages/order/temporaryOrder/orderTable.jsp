<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<script type="text/javascript" src="${basePath}/pages/order/temporaryOrder/orderTable.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/4a86166a.vendor.css">
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/9e24f281.app.css">
<link type="text/css" rel="stylesheet" href="${basePath}/commons/plugin/paging/font-awesome.min.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/allorder/pc.css">
<link type="text/css" rel="stylesheet" href="${basePath}/pages/order/allorder/orderDetails.css">
<style>
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
</style>
<body>
	<div id="atable">
	</div>
	<div class="margin-bottom-10">
		<div class="text-center" id="page_index">
		</div>
	</div>
	<div class="zent-dialog-backdrop" style="display:none"></div>
	
	<!-- 取消订单 -->
	<div class="zent-dialog widget-order-cancel" style="position:fixed;top: 40%;left:50%;display:none;width: 320px;" >
		<div class="zent-dialog-header">
	    	<div class="zent-dialog-title">取消订单</div>
		    <a href="javascript:;" class="zent-dialog-close">×</a>
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
		    <button class="zent-btn zent-btn-primary-outline js-cancel">取消</button>
		</div>
	</div>
	
	<!-- 以下为发货 -->
	<div class="zent-dialog widget-order-express" style="position:fixed;top: 30%;left:50%;width:742px;display:none">
		<div class="zent-dialog-header ">
			<h3 class="zent-dialog-title"> 商品发货</h3>
			<a href="javascript:;" class="zent-dialog-close">×</a>
		</div>
		<div class="zent-dialog-body">
			<div class="js-total-express total-express"></div>
			<div class="add-express-table-control">
				<div class="js-modal-table">
					<table class="ui-table">
						<thead>
							<tr>
								<th class="text-right cell-5">
									<input type="checkbox" class="js-check-all">
								</th>
								<th class="cell-35">商品</th>
								<th class="cell-15">数量</th>
								<th class="cell-30">物流 | 单号</th>
								<th class="cell-20">状态</th>
							</tr>
						</thead>
						<tbody id="logistics-table"></tbody>
					</table>
				</div>
				<p class="js-goods-tips hide error-goods-tips">请选择发货商品</p>
			</div>
			<form onsubmit="return false;" class="form-horizontal" id="subfm">
				<input type="hidden" name="isAll" class="goods">
				<div class="control-group" style="margin-top: 20px">
					<label class="control-label">收货地址：</label>
					<div class="controls">
						<div class="control-action">
						</div>
					</div>
				</div>
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
				</div>
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
	<!-- <div class="zent-dialog-backdrop" style="display: none;"></div> -->
	<div class="zent-dialog widget-express-update-dialog" style="position:fixed;top: 30%;left:50%;width:645px;display: none;" >
		<div class="zent-dialog-header ">
			<div class="zent-dialog-title">修改物流</div>
			<a href="javascript:;" class="zent-dialog-close">×</a>
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
			<button class="js-close zent-btn zent-btn-primary-outline">取消</button>
		</div>
	
	</div>
	<div class="zent-dialog express-confirm-dialog" style="position:fixed;top: 35%;left:50%; width:550px;display: none;">
		<div class="zent-dialog-header">
			<div class="zent-dialog-title">确认修改信息</div>
			<a href="javascript:;" class="zent-dialog-close">×</a>
		</div>
	
		<div class="zent-dialog-body">
			<div style="color: #666">
				<table class="ui-table">
					<thead>
						<tr>
							<th>包裹</th>
							<th>商品数量</th>
							<th>发货方式</th>
							<th>物流公司</th>
							<th>快递单号</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	
		<div class="zent-dialog-footer">
			<button class="zent-btn zent-btn-primary-outline js-cancel">返回修改</button>
			<button class="zent-btn zent-btn-primary js-confirm">确认修改</button>
		</div>
	</div>
	
	
	<!-- 修改价格 -->
	<div class="modal2 order-price in" aria-hidden="false" style="position:fixed;top: 40%;left:50%;width:655px;display:none">
		<div class="modal-header">
			<a class="close" data-dismiss="modal">×</a>
			<h3 class="title">订单原价(不含运费)：<span class="js-price-container price-color" id="order_price"></span> 元</h3>
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
								<th class="tb-postage">运费（元）</th>
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
	
					<p class="help-block">买家实付 = 原价 + 运费 + 涨价或减价
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="modal hide fade in cannotdelivery" aria-hidden="false" style="position:fixed;top: 40%;left:30%;
						width:655px;display:none; height: 200px;background-color: #fff;">
		<div class="modal-header">
		    <a class="close delivery_refund_close" data-dismiss="modal">×</a>
		    <h3 class="title">退款维权提醒</h3>
		</div>
		<div class="modal-body">
		    <p style="margin: 20px 0;">订单中的部分商品，买家已提交了退款申请。你需要先跟买家协商，买家撤销退款申请后，才能进行发货操作。</p>
		    <div style="text-align: center; margin: 40px 0 20px;">
		        <a href="javascript:;" class="ui-btn ui-btn-primary js-close delivery_refund_close" style="min-width: 120px;">我知道了</a>
		    </div>
		</div>
	</div>
</body>

<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>优惠券修改</title>
<link rel="stylesheet" href="${basePath}/tools/layui1.0.9/css/layui.css" media="all">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/jquery-ui.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">
<link rel="stylesheet" href="${basePath}/pages/marketing/coupon/pc_coupon_min.css">
<link rel="stylesheet" href="${basePath}/pages/marketing/coupon/coupon.css">
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">

<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/jquery-ui-timepicker-addon.min.js"></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/tools/layui1.0.9/layui.js"></script>
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/chosen.jquery.min.js"></script>

<style type="text/css">
	.input-small {
		width: 40px;
	}
	svg{
		display:none;
	}
	/* 设置店铺优惠券字体样式 */
	.page-tradeincard .ump-title {
	    line-height: 40px;
	    padding: 0 20px;
	    margin: 10px auto;
	    font-size: 14px;
	    background: #f2f2f2;
	}
	.inner-page-main {
	   	border: 1px solid #e5e5e5;
	    background-color: #F2F2F2;
	    height: auto;
	    overflow: hidden;
	}
	.inner-page-main-container{
		border: 1px solid #e5e5e5;
	    margin: 10px;
	    padding: 15px;
	    background-color: #fff;
	    height: auto;
	    overflow: hidden;
	}
</style>
</head>
<body>
<script type="text/javascript">
	var couponId = getUrlParam("id");
	$(function(){
		//点击选项卡跳转		
		$(".layui-tab-title li").click(function(){
			var index = $(".layui-tab-title li").index(this);
			location.href = "couponList.jsp?coupon_flag="+index;
		});
	})
</script>
<div class="inner-page-top layui-clear">
	  <div class="layui-tab layui-tab-brief" lay-filter="couponTab" style="margin:0;">
		  <ul class="layui-tab-title" style="margin-bottom:9px;border-bottom:none;">
		    <li class="layui-this">所有优惠券</li>
		    <li>未开始</li>
		    <li>进行中</li>
		    <li>已结束</li>
		  </ul>
		</div>      
	</div>
<div class="app inner-page-main">
    <div class="app-inner clearfix inner-page-main-container">
        <div class="app-init-container">
            <div class="app__content js-app-main app-design">
                <div class="app-design clearfix">
                    <div class="page-tradeincard">
                        <h2 class="ump-title">设置店铺优惠券</h2>
                        <div class="app-preview" id="coupon_left">
                        	<!-- 动态加载数据库字段 -->
       					 </div>
        <div class="app-sidebar" id="coupon_right" style="margin-top: 0px;">
            <div class="arrow"></div>
            <div class="app-sidebar-inner js-sidebar-region">
                <div>
                    <form class="form-horizontal" id="coupon_edit_form">
                        <h1 class="config-title">优惠券基础信息</h1>
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>优惠券名称：</label>
                            <div class="controls">
                                <input type="text" name="name"  maxlength="10"  placeholder="最多支持10个字" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>发放总量：</label>
                            <div class="controls">
                                <div class="input-append">
                                    <input type="text" name="release_num" class="input-small" />
                                    <span class="add-on">张</span>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>优惠形式：</label>
                            <div class="controls">
                                <label class="radio inline">
                                <input name="offer_type" type="radio" value="1" checked="checked"  disabled />指定金额
                                </label>
                                <div class="js-preferential_type" style="display: block">
                                	面值：
                                    <input type="number" name="offer_data_start" class="input-small" disabled/> 元
                                    <!-- 
                                     <label class="checkbox inline js-is-random is-random">
                                     <input type="checkbox" name="is_random" value="1" disabled/>随机 
                                     </label> -->
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <label class="radio inline">
                                    <input name="offer_type" type="radio" value="2" disabled/>折扣
                                </label>
                                <span class="js-preferential_type" style="display: none"> ：
                                <input type="number" min="1.0" max="9.9" step="0.1" name="offer_discount" 
                                	class="input-small"  disabled/>
                                <span>折</span> 
                                </span>
                                <p class="help-desc red">优惠券不能抵扣运费</p>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>使用门槛：</label>
                            <div class="controls">
                                <label class="radio inline"> 
                                	<input name="threshold" type="radio" value="1" disabled/> 不限制
                                 </label>
                                <p class="help-desc red" style="display:none;">请谨慎设置无门槛优惠券，避免资金损失</p>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <label class="radio inline">
                                    <input style="margin-top:6px;" name="threshold" type="radio" value="2" checked="checked" disabled/>满
                                    <input type="text" name="threshold_money" 
                                    	class="input-small js-price" disabled/> 元可使用
                                </label>
                                <p class="help-desc red">使用门槛计算不包含运费</p>
                            </div>
                        </div>
                        <h1 class="config-title">基本规则</h1>
                        <!-- 会员等级暂时隐藏 -->
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>会员等级：</label>
                            <div class="controls">
                                <select name="member_card_id"  disabled>
                                    <option value="" selected="selected">所有会员等级 </option>
                                </select> 可领取
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>每人限领：</label>
                            <div class="controls">
                                <select name="limit_num"  disabled>
                                    <option value="0" selected="selected">不限张</option>
                                    <option value="1">1张</option>
                                    <option value="2">2张</option>
                                    <option value="3">3张</option>
                                    <option value="4">4张</option>
                                    <option value="5">5张</option>
                                    <option value="10">10张</option>
                                </select>
                            </div>
                        </div>
                        <!-- 同步打标签暂时隐藏 -->
                        <!-- 
                        <div class="control-group" style="display: none;">
                            <label class="control-label">同步打标签：</label>
                            <div class="controls ">
                                <select name="coupon_fans_tag" multiple=""  style="width: 220px;" id="coupon_fans_tag">
                                </select>
                                <a href="javascript:;" class="js-refresh-fans-tag"> 刷新</a> |
                                <a href="//www.youzan.com/v2/fans/tag/add" class="new-window" target="_blank">新建</a>
                            </div>
                        </div> -->
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>有效期：</label>
                            <div class="controls">
                                <div style="min-height: 35px;">
                                    <label class="radio inline">
                                    <input type="radio" name="valid_type" value="1" checked="checked"  disabled/>固定日期
                                    </label>
                                    <div style="display: block">
                                        <div class="date-range-wrap">生效时间：
                                            <input type="text"  name="active_stime" id="date1" disabled/>
                                        </div>
                                        <div class="date-range-wrap">过期时间：
                                            <input type="text"  name="active_etime" id="date2" disabled/>
                                        </div>
                                    </div>
                                </div>
                                <div class="fixed-term">
                                    <label class="radio inline"> 
                                    <input type="radio" name="valid_type" value="2" disabled/> <span>领到券当日开始</span> 
                                    </label>
                                    <i>N</i>
                                    <span>天内有效</span>
                                </div>
                                <div class="fixed-term">
                                    <label class="radio inline"> 
                                    <input type="radio" name="valid_type" value="3" disabled/> <span>领到券次日开始</span>
                                     </label>
                                    <i>N</i>
                                    <span>天内有效</span>
                                </div>
                            </div>
                        </div>
                        <!-- 
                        <div class="control-group">
                            <label class="control-label">到期提醒：</label>
                            <div class="controls">
                                <label class="checkbox inline"> 
                                <input type="checkbox" name="to_remind" />到期前4天提醒一次 </label>
                            </div>
                        </div> -->
                        <!-- 
                        <div class="control-group">
                            <label class="control-label">推广设置：</label>
                            <div class="controls">
                                <label class="checkbox inline"> 
                                <input type="checkbox" name="to_share_link" checked="" /> 允许分享领取链接 </label>
                            </div>
                        </div> -->
                        <div class="control-group">
                            <label class="control-label"><em class="required">*</em>可使用商品：</label>
                            <div class="online-goods-group-container">
                                <div class="controls">
                                    <div style="padding-left: 16px;">
                                        <label class="radio inline"> 
                                        	<input name="is_all_use_flag" type="radio" value="1" checked="checked"/> 全店商品 
                                        </label>
                                        <label class="radio inline">
                                            <input name="is_all_use_flag" type="radio" value="0" /> 指定商品
                                        </label>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="controls">
                                    <table class="assign-goods-list ui-table js-goods-list" style="display: none" id="coupon_commodity_table">
                                   		<thead>
                                   			<tr>
  												<th class="cell-80">商品名称</th>
               									<th class="cell-20">操作</th>
          					 				</tr>
                                   		</thead>
                                   		<tbody></tbody>
                                    </table>
                                        <div style="margin-top: 10px;">
                                            <a href="javascript:void(0)" class="add-goods js-add-goods" onclick="addCouponGoods()"> + 添加商品</a>
                                        </div>
                                        <input type="hidden" name="is_select_online_goods" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 
                        <div class="control-group ">
                            <label class="control-label"></label>
                            <div class="controls">
                                <label class="checkbox inline"> 
                                	<input type="checkbox" name="use_detail_price" disabled/>仅原价购买商品时可用 
                                </label>
                            </div>
                        </div> -->
                        <div class="control-group">
                            <label class="control-label">使用说明：</label>
                            <div class="controls">
                                <textarea name="instructions" style="width:280px;" cols="30" rows="2" placeholder="填写活动的详细说明，支持换行;">
                                </textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        		<div class="app-actions" style="bottom: 0px;">
                    <div class="form-actions text-center">
                        <input class="btn js-btn-quit" type="button" value="取 消" />
                        <input class="btn btn-primary js-btn-save" type="submit" value="保 存" id="saveCoupon"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <div class="notify-bar js-notify animated hinge hide" style="">
        </div>
    </div>
</div>
<script type="text/javascript" src="${basePath}/pages/marketing/coupon/couponEdit.js"></script>
</body>
</html>
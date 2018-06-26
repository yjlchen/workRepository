<%@page import="com.swn.common.util.PropertiesUtil"%>
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
<title>商品详情及评价的预览页面</title>
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/preview/pro.css"  media="screen">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/preview/produce.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/preview/detail.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/preview/zong.js"></script>
<script type="text/javascript">
	var goodId = getUrlParam("goodId");
	//判断是选中详情还是评价
	var ischange = getUrlParam("ischange");
	$(function(){
		$.ajax({
        	"type":"post",
            "url": getRootPath()+"/commodity/queryCommodityInfo.action",
            async: false,//同步
            'data' : {id:goodId},
            "dataType":"json",
            'success' : function (gdata) {
            	$(".custom-richtext").html(gdata.data.preview_content);
            	//删除id=module的第一个子div的第一个子div
		    	$(".custom-richtext").find("#module").children().eq(0).children().eq(0).remove();
		    	//删除带有20个按钮的div
		    	$(".custom-richtext").find(".js-add-region").remove();
		    	//删除每一个div的编辑、加内容、删除
		    	$(".custom-richtext").find("#module .actions").remove();
		    	//去掉超链接的下划线
		    	$(".custom-richtext a").css("text-decoration","none");
            },
            'error':function(){
            	
            }
	    });
		
		//确定是选中，pc还是手机端
 		var pcOrMobile = getUrlParam("pcOrMobile");
		if (pcOrMobile == "p") {
	    	$('.js-no-follow').eq(1).addClass('active');
	    	$('.js-no-follow').eq(0).removeClass('active');
	        $('.content-body').css('width','620px');
	    }else if(pcOrMobile == "m"){
	    	$('.js-no-follow').eq(0).addClass('active');
	    	$('.js-no-follow').eq(1).removeClass('active');
	        $('.content-body').css('width','320px');
	    }
	
		//判断选中详情还是选中评价
		var ischange = getUrlParam("ischange");
	    if (ischange == 1) {
	        $('.goods').click();
	    }else if(ischange == 2){
	    	$('.assess').click();
	    }
	
	})
	
	//查看商品详情或评价
	function viewDetailOrComment1(pcOrMobile){
		var flag;
		if($('.goods').hasClass("active")){
			flag = 1;
		}
		else if($('.assess').hasClass("active")){
			flag = 2;
		}
		location.href = 
			getRootPath()+"/pages/webstore/webpage/preview/goodDetailOrComment.jsp?pcOrMobile="+pcOrMobile+"&goodId="+goodId+"&ischange="+flag;
	} 
	
	//跳转到重新编辑商品页面
	function reEditCommodity(){
		location.href = getRootPath()+ '/pages/commodity/manage/commodityCreate.jsp?id='+goodId
	}
	
</script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/preview/zong.js"></script>
</head>
<body class=" body-fixed-bottom default-theme">
<div class="container wap-goods internal-purchase" style="min-height: 895px;">
    <div class="header">
        <div class="headerbar">
            <div class="headerbar-wrap clearfix">
                <div class="headerbar-preview">
                    <span>预览：</span>
                    <ul>
                        <li>
                            <a href="javascript:;" class="js-no-follow active" data-size="default" onclick="viewDetailOrComment1('m')">手机版</a>
                        </li>
                        <li>
                            <a href="javascript:;" class="js-no-follow" data-size="800" onclick="viewDetailOrComment1('p')">PC版</a>
                        </li>
                    </ul>
                </div>
                <div class="headerbar-reedit">
                    <a href="javascript:;" class="js-no-follow" onclick="reEditCommodity()">重新编辑</a>
                </div>
            </div>
        </div>
        <%--
        <div class="js-mp-info share-mp-info ">
            <a class="page-mp-info" href="javascript: void(0);">
                <img class="mp-image" src="${basePath}/commons/images/publicPicture/logo_<%=PropertiesUtil.getValue("sys.properties", "orderPrefix")%>.jpg" width="24" height="24">
                <i class="mp-nickname"><%=PropertiesUtil.getValue("sys.properties", "mallName")%> </i>
            </a>
            <div class="links">
                <span class="js-search mp-search search-icon"></span>
                <a class="mp-homepage" href="https://h5.youzan.com/v2/showcase/usercenter?kdt_id=15635310">我的记录</a>
            </div>
        </div> --%>
    </div>
    <div class="content ">
        <div class="content-body" style="width:320px;margin:0 auto;">
            <!-- 分享文案 -->
            <span id="wxdesc" class="hide"></span>
            <!-- 分享为空时，给的默认文案，为商品名 -->
            <span style="display: none;">
            </span>
            <div class="js-detail-container js-components-container">
                <div class="js-tabber-container goods-detail">
                    <div class="js-tabber tabber tabber-n2 clearfix orange">
                        <button class="goods" data-type="goods" class="active">商品详情</button>
                        <button class="assess" data-type="reviews" class="">销量和评价</button>
                    </div>
                    <div class="js-tabber-content">
                        <div class="js-part js-trade-review-list trade-review-list hide" data-type="reviews">
                            <div class="js-review-tabber review-rate-tabber tabber tabber-n4 clearfix">
						        <span class="item">
						            <button class="js-rate-all rate js-cancal-disable-link active" data-reviewtype="all" data-rate="0">全部</button>
						        </span>
						        <span class="item">
						            <button class="js-rate-good js-cancal-disable-link" data-reviewtype="good" data-rate="30">好评(0)</button>
						        </span>
						        <span class="item">
						            <button class="js-rate-middle js-cancal-disable-link" data-reviewtype="middle" data-rate="20">中评(0)</button>
						        </span>
						        <span class="item">
						            <button class="js-rate-bad js-cancal-disable-link" data-reviewtype="bad" data-rate="10">差评(0)</button>
						        </span>
                            </div>
                            <div class="js-review-tabber-content block block-list">
                                <div class="js-review-avatar-container review-profile block-item">
                                    <div class="js-review-avatar review-avatar-container">
                                        <div class="profiles clearfix">
                                            <img src="img/64.jpg" class="image-circle">
                                        </div>
                                    </div>
                                </div>
                                <div class="js-review-report-container report-detail-container block-item no-border hide pd0"></div>
                                <div class="js-review-part review-detail-container" data-reviewtype="all">
                                    <div class="js-list b-list"></div>
                                    <div class="list-finished">暂无评论</div>
                                </div>
                                <div class="js-review-part review-detail-container hide" data-reviewtype="good">
                                	<div class="js-list b-list"></div>
                                    <div class="list-finished">暂无好评</div>
                                </div>
                                <div class="js-review-part review-detail-container hide" data-reviewtype="middle">
                                	<div class="js-list b-list"></div>
                                    <div class="list-finished">暂无中评</div>
                                </div>
                                <div class="js-review-part review-detail-container hide" data-reviewtype="bad">
                                	<div class="js-list b-list"></div>
                                    <div class="list-finished">暂无差评</div>
                                </div>
                            </div>
                        </div>
                        <div class="js-part js-goods-detail goods-tabber-c" data-type="goods">
                            <div class="js-components-container components-container">
                                <div class="custom-richtext js-lazy-container js-view-image-list">
                                	<!-- 动态加载商品详情 -->
                                </div>
                                <div class="price-intro">
                                    <h4>划线价格说明<i class="icon-arrow"></i></h4>
                                    <p>划线价格：划线的价格可能是商品的专柜价、吊牌价、正品零售价、指导价、曾经展示过的销售价等，仅供您参考。</p>
                                    <p>未划线价格：未划线的价格是商品的销售标价，具体的成交价格可能因会员使用优惠券、积分等发生变化，最终以订单结算价格为准。 </p>
                                    <p>*此说明仅当出现价格比较时有效。若这件商品针对划线价格进行了特殊说明，以特殊说明为准。</p>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div class="js-bottom-opts js-footer-auto-ele bottom-fix" style="">
                <div class="responsive-wrapper" style="width:320px;margin:0 auto;">
                    <div class="mini-btn-3-1">
                        <a href="javascript:;" class="js-im-icon new-btn service" ><i
                                class="iconfont icon-service"></i><span class="desc">客服</span></a>
                        <a href="javascript:;" class="new-btn gift js-add-gift"><i class="iconfont icon-gift"></i><span
                                class="desc">送人</span></a>
                        <a id="global-cart" href="javascript:;" class="new-btn buy-cart" onClick="tocart()">
                            <i class="iconfont icon-shopping-cart"></i><span class="desc">购物车</span>
                        </a>
                        <!-- 预售的积分兑换 -->
                    </div>
                    <div class="big-btn-2-1">
                        <a href="javascript:;" class="js-add-cart big-btn orange-btn vice-btn" onClick="tocart()">加入购物车</a>
                        <a href="javascript:;" class="js-buy-it big-btn red-btn main-btn" onClick="tobuy()">立即购买</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="js-footer" style="min-height: 1px;">
       <div class="footer" style="bottom:-145px;">
           <div class="copyright">
               <div class="ft-links">
                   <a href="https://h5.youzan.com/v2/showcase/homepage?kdt_id=15635310" target="_blank">店铺主页</a>
                   <a href="https://h5.youzan.com/v2/showcase/usercenter?kdt_id=15635310" target="_blank">会员中心</a>
                   <a href="javascript:;" class="js-open-follow">关注我们</a>
                   <a href="https://h5.youzan.com/v2/showcase/cert" target="_blank">店铺信息</a>
                   <!-- 第三方app隐藏topbar时，需要在底部显示购物记录入口 -->
               </div>
           </div>
       </div>
</div>
</body>
</html>
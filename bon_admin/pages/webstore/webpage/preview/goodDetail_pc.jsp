<%@page import="com.swn.common.util.PropertiesUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品详情预览-PC端</title>
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/preview/producepc.css"  media="screen">
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>

</head>
<script type="text/javascript">
	var goodId = getUrlParam("goodId");
	$(function(){
		//pc端赋值处理
		 $.ajax({
        	"type":"post",
            "url": getRootPath()+"/commodity/queryCommodityInfo.action",
            async: false,//同步
            'data' : {id:goodId},
            "dataType":"json",
            'success' : function (data) {
            	 var url;
            	 if(data.data.img_path_str.indexOf(",")<0){
        			 url = data.data.img_path_str;
        		 }else{
        			 //图片url,取第一个，之前的值
        			 url = data.data.img_path_str.substr(0,data.data.img_path_str.indexOf(","));
        		 }
    			var price = data.data.price;
    			var goodName = data.data.commodity_name;
    			var freight = data.data.postage;
    			var store_count = data.data.store_count;
    			//大图
    			$(".swiper-wrapper .swiper-image img").attr("src",url);
    			//缩略图
    			$(".swiper-pagination img").attr("src",url);
    			//商品名称
    			$(".goods-info h3").html(goodName);
    			//价格
    			$(".goods-price strong").html("<em class='goods-rmb'>￥</em>"+price);
    			//运费
    			$("table tr:eq(0) td:eq(1)").html(freight);
    			//库存
    			$("table tr:eq(1) td:eq(1)").html(store_count);
    			
    			//规格
    			var speList = data.speList;
    			var speMes = "";
    			$.each(speList,function(i,n){
    				var name = n.specification_value_name;
    				speMes += name+"、";
    			})
    			$("table tr:eq(2) td:eq(1)").html(speMes.substr(0,speMes.length-1));
    			
    			//给轮播图赋值
    			var picUrl = data.data.img_path_str;
    			//如果只有一张图片
    			if(picUrl.indexOf(",")<0){
    				//加商品图
    				$(".swiper-wrapper").append('<div class="swiper-slide swiper-slide-visible swiper-slide-active" style="width: 400px; height: 400px;"><div class="swiper-image"><img src='+picUrl+' alt="商品图"></div></div>');
    				//加缩略图
    				$(".swiper-pagination-list").append('<span class="swiper-pagination-switch swiper-active-switch" data-index="0"><img src='+picUrl+' width="44" height="44" alt="商品缩略图"><span class="swiper-arrow"></span></span>');
    			}
    			//如果是多张图片
    			else{
    				var picUrlArr = picUrl.split(",");
    				for(var i=0;i<picUrlArr.length;i++){
    					if(i==0){
    						$(".swiper-wrapper").append('<div class="swiper-slide swiper-slide-visible swiper-slide-active" style="width: 400px; height: 400px;"><div class="swiper-image"><img src='+picUrlArr[i]+' alt="商品图"></div></div>');
    						//加缩略图
    	    				$(".swiper-pagination-list").append('<span class="swiper-pagination-switch swiper-active-switch" data-index="0"><img src='+picUrlArr[i]+' width="44" height="44" alt="商品缩略图"><span class="swiper-arrow"></span></span>');
    					}else{
    						$(".swiper-wrapper").append('<div class="swiper-slide" style="width: 400px; height: 400px;"><div class="swiper-image"><img src='+picUrlArr[i]+' alt="商品图"></div></div>');
    						$(".swiper-pagination-list").append('<span class="swiper-pagination-switch" data-index="0"><img src='+picUrlArr[i]+' width="44" height="44" alt="商品缩略图"><span class="swiper-arrow"></span></span>');
    					}
    				}
    			}
    			
    			
            },
            'error':function(){
            	
            }
	    }); 
	});
	
	//转向手机版页面
	function toMobile(){
		location.href = getRootPath()+"/pages/webstore/webpage/preview/goodDetail_mobile.jsp?goodId="+goodId;
	}
	
	//跳转到重新编辑商品页面
	function reEditCommodity(){
		location.href = getRootPath()+ '/pages/commodity/manage/commodityCreate.jsp?id='+goodId
	}
	
</script>
<body>
<div class="headerbar">
    <div class="headerbar-wrap clearfix">
        <div class="headerbar-preview">
            <span>预览：</span>
            <ul class="js-change-style">
                <li>
                    <a href="javascript:;" class="js-no-follow" onclick="toMobile()">手机版</a>
                </li>
                <li class="last">
                    <a href="javascript:;" class="js-no-follow active" >PC版</a>
                </li>
            </ul>
        </div>
        <div class="headerbar-reedit">
            <a href="javascript:;" class="js-no-follow" onclick="reEditCommodity()">重新编辑</a>
        </div>
    </div>
</div>
<div class="header">
    <div class="container">
        <a href="javascript:;" class="js-hover logo" data-target="js-shop-info">
        <%=PropertiesUtil.getValue("sys.properties", "mallName")%> 
        <span class="icon-wxv"></span>
           <%--  <span class="smaller-title">微店铺首页</span> --%>
        </a>
        <%-- 
        <ul class="nav">
            <li class="separate">|</li>
            <li>
                <a href="http://detail.youzan.com/show/goods/newest?alias=1ybcymo33229q" target="_blank">最新商品</a>
            </li>
        </ul>--%>
    </div>
    <%-- 
    <!-- 浮层店铺信息 -->
    <div class="shop-info shop-info-fixed js-shop-info">
        <div class="container clearfix" style="height: 220px;">
            <div class="js-async shop-qrcode pull-left" data-url="http://detail.youzan.com/show/goods/teamurl.json">
            	<!-- <img src="img/create.png" alt="二维码"> -->
            	<!-- 店铺二维码的图片 -->
            	<img src="" alt="二维码">
            	</div>
            <div class="shop-desc pull-left" style="margin-left: 50px;">
                <dl>
                    <dt>舒卫能商城 （ <span class="icon-wxv"></span> <span class="wxv">微信认证</span> ）</dt>
                    <dd></dd>
                    <dt>微信扫描二维码，访问我们的微信店铺</dt>
                    <dd>您可以使用微信联系我们，随时随地的购物、客服咨询、查询订单和物流...</dd>
                </dl>
            </div>
            <span class="arrow"></span>
        </div>
    </div> --%>
</div>
<div class="container main clearfix">
    <div class="content">
        <!-- 商品简介 -->
        <div class="goods-summary clearfix">
            <!-- 商品信息 -->
            <div class="goods-info pull-right">
                <h3 class="goods-title">【顺丰包邮】秘鲁原装进口 黑玛咖天然成分安全高效</h3>
                <div class="goods-price clearfix">
                    <strong class="goods-current-price pull-left">
                        <em class="goods-rmb">￥</em>1800.00 - 4200.00 </strong>
                    <span class="goods-origin-price pull-left">
                          	            </span>
                </div>
                <table class="goods-meta">
                    <tbody>
                    <tr class="first-child">
                        <td class="goods-meta-name">运费：</td>
                        <td>￥0.00</td>
                    </tr>
                    <tr>
                        <td class="goods-meta-name">库存：</td>
                        <td>300 件</td>
                    </tr>
                    <%-- 
                    <tr class="last-child">
                        <td class="goods-meta-name">规格：</td>
                        <td> 3瓶、6瓶、9瓶</td>
                    </tr> --%>
                    </tbody>
                </table>
                <div class="goods-action clearfix">
                    <a href="javascript:;" class="goods-buy-link icon-buybutton pull-left js-hover"
                       data-target="js-popover-goods" data-position="top" data-shake="true">立即购买</a>
                    <a href="javascript:;" class="btn-share goods-share-link pull-left js-hover"
                       data-target="js-popover-share" data-position="top" data-shake="true">收藏 / 分享</a>
                </div>
                <div class="goods-payment">
                    <dl class="clearfix">
                        <dt>支付：</dt>
                        <dd class="pull-left clearfix">
                            <a href="javascript:;" class="clearfix pull-left"><span class="icon-wxpay"></span>微信支付</a>
                            <a href="javascript:;" class="clearfix pull-left"><span class="icon-bankpay"></span>银行卡</a>
                            <a href="javascript:;" class="clearfix pull-left"><span class="icon-alipay"></span>支付宝</a>
                        </dd>
                    </dl>
                </div>
            </div>
            <!-- 商品图片 -->
            <div class="goods-image pull-left">
                <div class="swiper-container">
                    <div class="swiper-wrapper" style="width: 400px; height: 400px;">
                   
                    </div>
                </div>
                <div class="swiper-pagination">
                    <div class="swiper-pagination-list">
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-detail js-goods-detail">
        </div>
    </div>
    <%-- 
    <div class="sidebar">
        <!-- 店铺简单信息 -->
        <div class="shop-card clearfix">
            <div class="shop-image pull-left">
                <img src="${basePath}/commons/images/publicPicture/logo_<%=PropertiesUtil.getValue("sys.properties", "orderPrefix")%>.jpg" alt="店铺logo">
                <span class="icon-wxv"></span>
            </div>
            <div class="shop-link pull-left">
                <span class="shop-name">舒卫能商城</span>
                <a href="javascript:;" class="btn-add-wx js-hover" data-target="popover-weixin" data-position="bottom" data-align="right" data-shake="true">加微信好友</a>
            </div>
        </div>
    </div> --%>
</div>
<%-- 
<div class="footer">
    <div class="container">
        <div class="wrap">
            <a href="https://youzan.com/">由 舒卫能 提供技术支持</a><a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602006634" target="_blank">
            &nbsp;&nbsp; 浙公网安备 33010602006634号 增值电信业务经营许可证：浙B2-20140331 - 浙ICP备13037466号</a>
        </div>
    </div>
</div>

<div class="popover popover-goods js-popover-goods" style="left: 821.5px; top: 78px; display: none;">
    <!-- 设置为关注后购买 -->
    <!-- 当设置为直接购买二维码则走这段逻辑 -->
    <div class="popover-inner">
        <div class="popover-buy title clearfix">
            <div class="icons clearfix">
                <p class="icon-item pull-left">
                	<span class="icon icon-wxpay-new"></span>
                	<span class="desc">微信支付</span>
                </p>
                <p class="icon-item pull-left">
                	<span class="icon icon-alipay-new"></span>
                	<span class="desc">支付宝</span>
                </p>
            </div>
            <p class="main-text">扫一扫购买</p>
        </div>
        <div class="js-async ui-goods-qrcode" data-url="http://detail.youzan.com/show/goods/goodsurl.json?alias=1ybcymo33229q">
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADuAQMAAAAEIKlhAAAABlBMVEUAAAD///+l2Z/dAAACYklEQVRYhe2Ya4rFIAyF019dhhsVujWX5AIEx5wkPjrlwsAwZqBSLr392pKY5BhL9dMo9OIX/yLO1MZR01XTkUOhUM7Klyj8D5wp4hIfKw7NQ2B+rr3gaH8rru/Hzcgjq9l8wjc1X2ZcE/xpb0reMGbeRnjALSQ9Ks7wR8ur+ErxTPFpWjbirMY3fA8Jco3vaJhr5SkV92CpUMVi8/cCDvPhDyOTqP/eNbUFoyBiz5L751hVhVDDCZWgKXXHrKzIKkcY40ym6nze57w9geI++dEiZVCrDyzGDpuXlQiBIn4UvmmoyPzeipOGJHfLkTMzLhwxrumimLVqO+7JlMfMR7lbcIS+X8AcNP5tEuUDL8tQ0TbGpKfpKFSec41LHE4XL1iSpEvijIP0C1IPsmIxtvreiotNdR8HakOrpGiggmiqLsjVAU5zeUpncyA2iqVrEFm9sCCjXJxgnWo9CVOeo1mA05Jr4nfygJE6RAq6C3HKc2nqtRW7tHGrDrDtNxbLacYVyYXtlLxjaOperImdVM9l8s8Voz64XCRcxQWWqTZV7y5YtkCHkFyIBHqH5ARjwqOlyh3LC7iJ6CtYHf3aZqwNjVmexP6xGsRTtyMdj1zbiVGPadisRXoPie70JKWqG0x9g00rliFShBbnQgw9YPtS1LUlku7sZqyiOSlRdYN1H5TvlgcV1BOdTla/108Du7A2Kr0AzJcnjKVMxNUVnsbdcjjNDSXSbarv7bh//8KGaF79qe9LsPYWyL0nLJIyKeTS9Zjc4PsBTXvBndi0ZRmP9W3d5DF6ZMf4w3jxi3+AvwDx0fh9q2n5twAAAABJRU5ErkJggg=="
                alt="二维码" class="qrcode-img">
        </div>
    </div>
</div>


<div class="popover popover-weixin js-popover-weixin" style="left: 1260.5px; top: 192.6px;">
    <div class="popover-inner">
    	<!-- 鼠标放到加微信好友时弹出 -->
        <h4 class="title">打开微信，扫一扫</h4>
        <h5 class="sub-title">或搜索微信号：shuweineng_ysj</h5>
        <div class="js-async ui-goods-qrcode" data-url="http://detail.youzan.com/show/goods/wxcode.json">
        	<img src="" alt="二维码" class="qrcode-img">
        </div>
    </div>
</div>
<div class="popover popover-share js-popover-share" style="left: 842.5px; top: 78px;">
    <div class="popover-inner clearfix">
        <div class="popover-qrcode pull-left">
            <h4 class="title">收藏到微信 or 发给朋友</h4>
            <div class="js-async ui-goods-qrcode"
                 data-url="http://detail.youzan.com/show/goods/goodsurl.json?alias=1ybcymo33229q">
                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADuAQMAAAAEIKlhAAAABlBMVEUAAAD///+l2Z/dAAACYklEQVRYhe2Ya4rFIAyF019dhhsVujWX5AIEx5wkPjrlwsAwZqBSLr392pKY5BhL9dMo9OIX/yLO1MZR01XTkUOhUM7Klyj8D5wp4hIfKw7NQ2B+rr3gaH8rru/Hzcgjq9l8wjc1X2ZcE/xpb0reMGbeRnjALSQ9Ks7wR8ur+ErxTPFpWjbirMY3fA8Jco3vaJhr5SkV92CpUMVi8/cCDvPhDyOTqP/eNbUFoyBiz5L751hVhVDDCZWgKXXHrKzIKkcY40ym6nze57w9geI++dEiZVCrDyzGDpuXlQiBIn4UvmmoyPzeipOGJHfLkTMzLhwxrumimLVqO+7JlMfMR7lbcIS+X8AcNP5tEuUDL8tQ0TbGpKfpKFSec41LHE4XL1iSpEvijIP0C1IPsmIxtvreiotNdR8HakOrpGiggmiqLsjVAU5zeUpncyA2iqVrEFm9sCCjXJxgnWo9CVOeo1mA05Jr4nfygJE6RAq6C3HKc2nqtRW7tHGrDrDtNxbLacYVyYXtlLxjaOperImdVM9l8s8Voz64XCRcxQWWqTZV7y5YtkCHkFyIBHqH5ARjwqOlyh3LC7iJ6CtYHf3aZqwNjVmexP6xGsRTtyMdj1zbiVGPadisRXoPie70JKWqG0x9g00rliFShBbnQgw9YPtS1LUlku7sZqyiOSlRdYN1H5TvlgcV1BOdTla/108Du7A2Kr0AzJcnjKVMxNUVnsbdcjjNDSXSbarv7bh//8KGaF79qe9LsPYWyL0nLJIyKeTS9Zjc4PsBTXvBndi0ZRmP9W3d5DF6ZMf4w3jxi3+AvwDx0fh9q2n5twAAAABJRU5ErkJggg=="
                    alt="二维码" class="qrcode-img">
            </div>
        </div>
        <div class="popover-share-info pull-left">
            <p>1. 打开微信，扫一扫左侧二维码</p>
            <p>2. 点击右上角图标</p>
            <img src="img/share_1.png" alt="点击右上角分享图标" width="212" height="71">
            <p>3. 发送给朋友、分享到朋友圈、收藏</p>
            <img src="img/share_2.png" alt="发送给朋友、分享到朋友圈、收藏" width="212" height="71">
        </div>
    </div>
</div>
--%>
</body>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/preview/ppc.js"></script>
</html>
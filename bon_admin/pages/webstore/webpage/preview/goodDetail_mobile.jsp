<%@page import="com.swn.common.util.PropertiesUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:
	${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品详情页预览-手机端</title>
	<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/preview/pro.css"  media="screen">
    <link rel="stylesheet" href="${basePath}/pages/webstore/webpage/preview/produce.css"  media="screen">
    <script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
    <script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>	
	<script type="text/javascript" src="${basePath}/pages/webstore/webpage/preview/Md.js"></script>
	
</head>
<script type="text/javascript">
	//获得商品id
	var goodId = getUrlParam("goodId");
	//定义一个数组，用来存储各种规格的商品价格
	var priceArr = [];
	$(function(){
		initGoodInfo();
	});
	
	//初始化商品信息
	function initGoodInfo(){
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
    			//商品名称
    			var goodName = data.data.commodity_name;
    			$(".goods-header h2").html(goodName);
    			
    			/*商品价格的判断显示*/
    			//读取商品基本信息的价格
    			var price = data.data.price;
    			//获得规格值集合
    			var speValueList = data.speValueList;
    			//获得规格值集合长度
    			var listLength = speValueList.length;
    			if(listLength>0){
    				//显示选择规格的div
    				$("#chooseSpe").show();
    				//只有一种规格价格
    				if(listLength == 1){
    					$.each(speValueList,function(j,n){
            				//获得这种规格价格
            				var price = n.detail_price;
            				//为商品价格赋值
            				$(".goods-header .current-price i").html(price);
            				//弹出的div中，为商品价格赋值
            				$("#clVmQGLkPc .current-price i").html(price);
            			})
    				}
    				//多种价格组合时
    				else{
    					$.each(speValueList,function(j,n){
            				//获得每种规格组合对应的价格
            				var price = n.detail_price;
            				//将每次获得的价格放入定义的数组中
            				priceArr.push(Number(price).toFixed(2));
            			})
            			//console.log(priceArr);
            			//获得数组中的最大价格
            			var max = Math.max.apply(null, priceArr);
            			max = Number(max).toFixed(2);
    					//获得数组中的最小价格
    					var min = Math.min.apply(null, priceArr);
    					min = Number(min).toFixed(2);
    					//为商品价格赋值
    					$(".goods-header .current-price i").html(min+"-"+max);
        				//弹出的div中，为商品价格赋值
        				$("#clVmQGLkPc .current-price i").html(min+"-"+max);
    				}
    			}else{
    				//未选择规格，价格赋值为商品基本信息的价格
    				$(".goods-header .current-price i").html(price);
    				//弹出的div中，价格赋值为商品基本信息的价格
    				$("#clVmQGLkPc .current-price i").html(price);
    				//隐藏选择规格的div
    				$("#chooseSpe").hide();
    			}
    			
    			//库存
    			var store_count = data.data.store_count;
    			$(".js-value").html(store_count);
    			//运费
    			var freight = data.data.postage;
    			if(freight==null||freight==""){
    				$(".js-postage-desc").html("免运费");
    			}else{
    				$(".js-postage-desc").html(freight);
    			}
    			
    			//获得规格集合
    			var speList = data.speList;
    			//列出需要选择的全部规格
    			$.each(speList,function(j,n){
    				//规格名称
    				var name = n.specification_name;
    				//动态添加
    				$(".adv-opts-inner dd").append('<span class="sku-item">'+name+'</span>');
    			})
    			
    			//给轮播图赋值
    			var picUrl = data.data.img_path_str;
    			//如果只有一张图片
    			if(picUrl.indexOf(",")<0){
    				$("#slide ul").append('<li><a href="javascript:;"><div class="swp-page"><img src='+picUrl+' /></div></a></li>');
    			}
    			//如果是多张图片，进行轮播
    			else{
    				var picUrlArr = picUrl.split(",");
    				for(var i=0;i<picUrlArr.length;i++){
    					//循环加上图片
    					$("#slide ul")
    					.append('<li><a href="javascript:;"><div class="swp-page"><img src='+picUrlArr[i]+' /></div></a></li>');
    					//循环加小圆点
    					if(i==0){
    						$(".swiper-pagination ul").append('<li class="swiper-pagination-switch swiper-active-switch"></li>');
    					}else{
    						$(".swiper-pagination ul").append('<li class="swiper-pagination-switch"></li>');
    					}
    				}
    				
    			}
    			
    			//设置轮播时间
    			$("#slide").MdsSlideFade({
					pageNum: true,time: '3000'
				});
    			
    			//给点击立即购买弹出的div中的商品信息赋值
    			$("#clVmQGLkPc .thumb img").attr("src",url);
    			$("#clVmQGLkPc .detail p").html(goodName);
    			$("#clVmQGLkPc .stock").html("剩余"+"<span class='js-stock'>"+store_count+"</span>"+"件");
    			

    			$.each(speList,function(i,n){
    				//规格名称
    				var name = n.specification_name;
    				//规格id
    				var speId = n.specification_id;
    				var str = 
    					'<dl class="clearfix block-item sku-list-container">'
    					+'<dt class="model-title sku-sel-title"><label>'+name+':</label></dt>'
    					+'<dd><ul class="model-list sku-sel-list"></ul></dd>'
    					+'</dl>'
    				//在购买数量的dl之前添加
    				$("#buyNum").before(str);
    				showSpeValue(i,goodId,speId);
    			})
            },
            'error':function(){
            	
            }
	    });
	}
	
	
	//展示规格值
	function showSpeValue(num,commodity_id,speId){
		$.ajax({
	        url : getRootPath()+"/commodity/querySpeValueList.action",
	        type : "post",
	        dataType :"json",
	        data:{id:commodity_id,speId:speId,num:num},
	        success : function (data) {
	        	var speValueList = data.speValueList;
	        	$.each(speValueList,function(i,n){
	        		//每个规格下的具体值
    				var name = n.specification_value_name;
	        		//规格值id，将该值放入隐藏域中，选择完规格计算商品价格时使用
	        		var specification_value_id = n.specification_value_id;
    				$("#clVmQGLkPc .sku-list-container .sku-sel-list").eq(num)
    	        	.append('<li class="tag sku-tag pull-left ellipsis" onclick="choose()">'+name+'</li>')
    	        	.append('<input type="hidden" value='+specification_value_id+'>');
    			})
	        },
	        error:function(){
			}
	    })
	}
	
	
	//转向PC版页面
	function toPc(){
		location.href = getRootPath()+"/pages/webstore/webpage/preview/goodDetail_pc.jsp?goodId="+goodId;
	}
	
	//查看商品详情或评价
	function viewDetailOrComment(ischange){
		location.href = getRootPath()+"/pages/webstore/webpage/preview/goodDetailOrComment.jsp?ischange="+ischange+"&goodId="+goodId;
	}
	
	//跳转到重新编辑商品页面
	function reEditCommodity(){
		location.href = getRootPath()+ '/pages/commodity/manage/commodityCreate.jsp?id='+goodId
	}
</script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/preview/zong.js"></script>
<body class="body-fixed-bottomdefault-theme">
<div class="container wap-goods internal-purchase" style="min-height: 837px;">
    <div class="header">
        <div class="headerbar">
            <div class="headerbar-wrap clearfix">
                <div class="headerbar-preview">
                    <span>预览：</span>
                    <ul>
                        <li>
                            <a href="javascript:;" class="js-no-follow active">手机版</a>
                        </li>
                        <li>
                            <a href="javascript:;" class="js-no-follow"  onclick="toPc()">PC版</a>
                        </li>
                    </ul>
                </div>
                <div class="headerbar-reedit">
                    <a href="javascript:;" class="js-no-follow" onclick="reEditCommodity()">重新编辑</a>
                </div>
            </div>
        </div>
        
        <%-- 
        <div class="js-mp-info share-mp-info " style="background-color:#21282e;">
            <a class="page-mp-info"  href="javascript: void(0);">
                <img class="mp-image" width="24" height="24" 
                	src="${basePath}/commons/images/publicPicture/logo_<%=PropertiesUtil.getValue("sys.properties", "orderPrefix")%>.jpg">
                <i class="mp-nickname">读取配置文件</i>
            </a>
            <div class="links">
                <span class="js-search mp-search search-icon"></span>
                <a class="mp-homepage" href="javascript:;">我的记录</a>
            </div>
        </div>
        --%>
    </div>
    <div class="content no-sidebar">
        <div class="content-body" style="width:320px;">
            <div class="custom-image-swiper custom-goods-swiper js-swp swp">
                <div id="slide" class="swiper-wrapper js-swp-wrap" style="height: 320px;" data-height="320">
                    <ul class="list">
                    </ul>
                </div>
                <div class="swiper-pagination js-swiper-pagination">
                	<ul class="swp-thumbnail-list" style="left:45%"></ul>
                </div>
            </div>
            <div class="goods-header">
                <h2 class="title"></h2>
                <!-- <span class="hide js-add-wish js-wish-animate wish-add  font-size-12 tag tag-redf30 pull-right">喜欢</span> -->
                <div class="goods-price ">
                    <div class="current-price">
                        <span>¥</span>
                        <i class="js-goods-price price" id="price"><!-- 根据是否选择规格，进行价格的判断，并显示 --></i>
                    </div>
                    <!-- <span class="btn btn-blue btn-retail hide js-retail-btn">门店有售</span> -->
                    <!-- <div class="original-price">
                         </div> -->
                </div>
                <hr class="with-margin-l">
                <div class="stock-detail">
                    <dl>
                        <dt>运费:</dt>
                        <dd class="js-postage-desc"></dd>
                    </dl>
                    <dl>
                        <dt>剩余:</dt>
                        <dd class="js-value"></dd>
                    </dl>
                </div>
            </div>
            <div class="sku-detail adv-opts" onClick="tospec()" id="chooseSpe">
                <div class="sku-detail-inner adv-opts-inner">
                    <dl class="sku-group select-sku js-select-sku">
                        <dt><span class="js-sku-label">选择</span>：</dt>
                        <dd class="js-sku-value">
                            <!-- 动态添加该商品的全部规格 -->
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="js-store-info">
                <div class="block block-list goods-store">
                    <div class="custom-store block-item ">
                        <a class="custom-store-link clearfix" href="javascript:;">
                            <div class="custom-store-img"></div>
                            <div class="custom-store-name"><%=PropertiesUtil.getValue("sys.properties", "mallName")%></div>
                            <span class="custom-store-enter">进入店铺</span>
                        </a>
                    </div>
                    <!-- 
                    <a class="offline-store block-item js-retail-store hide">
                        <span class="offline-store-img"></span>
                        <span class="offline-store-name">线下门店</span>
                        <div class="offline-store-branch js-retail-store-name"></div>
                    </a> -->
                    <div class="renzheng block-item">
                        <span class="js-rz-item-alert rz-item" data-type="team_certificate_company">
			                <span class="rz-name font-size-12 c-gray-darker">企业认证</span>
			            </span>
                        <span class="js-rz-item-alert rz-item" data-type="is_secured_transactions">
                			<span class="rz-name font-size-12 c-gray-darker">担保交易</span>
            			</span>
                    </div>
                </div>
            </div>
            
            <div class="js-detail-container js-components-container">
            	<%--
            	<!-- 普通商品的详情和评价 -->
                <div class="js-tabber-container goods-detail">
                    <div class="js-tabber tabber tabber-n2 clearfix orange">
                        <button class="goods" data-type="goods" class="active">商品详情</button>
                        <button class="assess" data-type="reviews" class="" onclick="initCommodityEvaluation()">销量和评价</button>
                    </div>
                    <div class="js-tabber-content">
                        <div class="js-part js-trade-review-list trade-review-list hide" data-type="reviews">
                            <div class="js-review-tabber review-rate-tabber tabber tabber-n4 clearfix">
						        <span class="item">
						            <button class="js-rate-all rate js-cancal-disable-link active" data-reviewtype="all" data-rate="0" 
						            	id="" onclick="showAllEvaluation()">
						            	全部
						            </button>
						        </span>
						        <span class="item">
						            <button class="js-rate-good js-cancal-disable-link" data-reviewtype="good" data-rate="30" id="1"
						              onclick="showGoodEvaluation()">
						            	好评(0)
						            </button>
						        </span>
						        <span class="item">
						            <button class="js-rate-middle js-cancal-disable-link" data-reviewtype="middle" data-rate="20" id="2"
						             onclick="showMiddleEvaluation()">
						            	中评(0)
						            </button>
						        </span>
						        <span class="item">
						            <button class="js-rate-bad js-cancal-disable-link" data-reviewtype="bad" data-rate="10" id="3"
						             onclick="showBadEvaluation()">
						            	差评(0)
						            </button>
						        </span>
                            </div>
                            <div class="js-review-tabber-content block block-list">
                                <div class="js-review-report-container report-detail-container block-item no-border hide pd0"></div>
                                <div class="js-review-part review-detail-container" data-reviewtype="all">
                                    <div class="js-list b-list">
                                    	<!-- 动态加载全部评论 -->
                                    </div>
                                    <div class="list-finished">暂无评论</div>
                                </div>
                                <div class="js-review-part review-detail-container hide" data-reviewtype="good">
                                	<div class="js-list b-list">
                                		<!-- 动态加载好评 -->
                                	</div>
                                    <div class="list-finished">暂无好评</div>
                                </div>
                                <div class="js-review-part review-detail-container hide" data-reviewtype="middle">
                                	<div class="js-list b-list">
                                		<!-- 动态加载中评 -->
                                	</div>
                                    <div class="list-finished">暂无中评</div>
                                </div>
                                <div class="js-review-part review-detail-container hide" data-reviewtype="bad">
                                	<div class="js-list b-list">
                                		<!-- 动态加载差评 -->
                                	</div>
                                    <div class="list-finished">暂无差评</div>
                                </div>
                            </div>
                        </div>
                        <div class="js-part js-goods-detail goods-tabber-c" data-type="goods">
                            <div class="js-components-container components-container">
                                <div class="custom-richtext js-lazy-container js-view-image-list">
                                	<!-- 动态加载商品详情 -->
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
                --%>
                
            <div class="js-bottom-opts js-footer-auto-ele bottom-fix">
                <div class="responsive-wrapper" style="width:320px;margin:0 auto;">
                    <div class="mini-btn-3-1">
                    	<%--
                        <a href="javascript:;" class="js-im-icon new-btn service" >
	                        <i class="iconfont icon-service"></i>
	                        <span class="desc">客服</span>
	                    </a>
                        <a href="javascript:;" class="new-btn gift js-add-gift">
	                        <i class="iconfont icon-gift"></i>
	                        <span class="desc">送人</span>
	                    </a> --%>
                        <a id="global-cart" href="javascript:;" class="new-btn buy-cart" onClick="tocart()">
                            <i class="iconfont icon-shopping-cart"></i>
                            <span class="desc">购物车</span>
                        </a>
                    </div>
                    <div class="big-btn-2-1">
                        <a href="javascript:;" class="js-add-cart big-btn orange-btn vice-btn"  onClick="tocart()">加入购物车</a>
                        <a href="javascript:;" class="js-buy-it big-btn red-btn main-btn" onClick="tobuy()">立即购买</a> 
                    </div>
                </div>
            </div>
            <div id="right-icon" class="js-right-icon hide">
                <div class="js-right-icon-container right-icon-container clearfix">
                    <a class="js-show-more-btn icon show-more-btn hide"></a>
                </div>
            </div>
        </div>
        <div id="shop-nav"></div>
    </div>
</div>
</div>
<div class="js-footer" style="min-height: 1px;">
    <div class="footer" style="width:100%">
        <div class="copyright" style="width:100%">
            <div class="ft-links">
                <a href="javascript:;" >店铺主页</a>
                <a href="javascript:;" >会员中心</a>
                <a href="javascript:;" class="js-open-follow">关注我们</a>
                <a href="javascript:;" >店铺信息</a>
            </div>
        </div>
    </div>
</div>
<!-- 点立即购买弹出的div -->
<div id="clVmQGLkPc" class="sku-layout sku-box-shadow popup am-share">
	<div class="sku-layout-title name-card sku-name-card">
    	<div class="thumb">
    		<img class="js-goods-thumb goods-thumb" src="" alt="">
    	</div>
		<div class="detail goods-base-info clearfix">
		    <p class="title c-black ellipsis"><!-- 读取商品名称 --></p>
		    <div class="goods-price clearfix">   
		        <div class="current-price pull-left c-black">
		            <span class="price-name pull-left font-size-14 c-orange">¥</span>
		            <i class="js-goods-price price font-size-16 vertical-middle c-orange"><!-- 读取价格 --></i>
		        </div>    
	    	</div>
		</div>
		<div class="js-cancel sku-cancel">
		    <div class="cancel-img"></div>
		</div>
	</div>
	<div class="adv-opts layout-content" style="max-height: 527px;">
	    <div class="goods-models js-sku-views block block-list border-top-0">
	    	<!-- 此处动态添加规格集合，以及其下的规格值集合 -->
	    	<dl class="clearfix block-item" id="buyNum">
			    <dt class="sku-num pull-left">
			        <label>购买数量：</label>
			    </dt>
	    		<dd class="sku-quantity-contaienr">
	    			<dl class="clearfix">
	    				<div class="quantity">            
	    					<button class="minus disabled" type="button"></button>            
	    					<input type="text" class="txt" pattern="[0-9]*" value="1">            
	    						<button class="plus" type="button"></button>            
	    						<div class="response-area response-area-minus"></div>            
	    						<div class="response-area response-area-plus"></div>        
	    				</div>
	    			</dl>
	    		</dd>
	    		<dt class="other-info">
	    			<div class="stock">剩余<span class="js-stock">100</span>件
					</div>
	    		</dt>
			</dl>
			<div class="block-item block-item-messages" style="display: none;"></div>
	    </div>
	    <div class="confirm-action content-foot clearfix">
	    	<!-- 点击选择规格组合后弹出框里的2个按钮 -->
		    <div class="big-btn-3-1">
		    	<a href="javascript:;" class="js-mutiBtn-confirm cart big-btn orange-btn vice-btn">加入购物车</a>
		    	<a href="javascript:;" class="js-mutiBtn-confirm confirm big-btn red-btn main-btn">立即购买</a>
		    </div>
		    <div class="big-btn-1-1">
		        <a href="javascript:;" class="js-confirm-it big-btn red-btn main-btn">加入购物车</a>
		    </div>
		</div>
	</div>
</div>

<div class="motify" style="display: none;">
	<div class="motify-inner">请选择 规格</div>
</div>

<div id="fRhInrDoeN" class="popout-box">
	<form class="js-login-form popout-login" method="GET" action="">
	    <div class="header c-green center">
	        <h2>请填写您的手机号码</h2>
	    </div>
	    <fieldset class="wrapper-form font-size-14">
	        <div class="form-item">
	            <label for="phone">手机号</label>
	            <input id="phone" name="phone" type="tel" maxlength="11" autocomplete="off" placeholder="" value="">
	        </div>
	        <div class="js-help-info font-size-12 error c-orange"></div>
	    </fieldset>
	    <div class="action-container">
	        <input type="submit" class="js-confirm btn btn-green btn-block font-size-14" value="确认手机号码">
	    </div>
	</form>
</div>
</body>
</html>
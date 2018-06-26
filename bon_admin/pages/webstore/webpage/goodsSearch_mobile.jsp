<%@page import="java.net.URLDecoder"%>
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
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>商品搜索手机端预览</title>
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/wbt1.css"  media="screen">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/wbt2.css"  media="screen">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/wbt3.css">

<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/chosen.jquery.20150826.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/dashboard_v4_7f51edc001.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/feature_a2159d53c2.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/jquery-ui.min.css">
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/pc_7364614c8d.css">
   
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/yz.css" >
<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">


<!-- 所需基础js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<%
	//处理参数的中文乱码
	String goodName = URLDecoder.decode(request.getParameter("goodName"),"UTF-8");
%>
<script type="text/javascript">
//获得商品名称
var goodName = '<%=goodName%>';
var bgcolor = getUrlParam("bgcolor");

$(function(){
	//加载数据
	$.ajax({
	    url : getRootPath()+"/commodity/queryCommodityList.action",
	    type : "post",
	    data : {commodity_name:goodName},
	    async: false,//同步
	    dataType:"json",
	    success : function (gdata) {
	    	var goodList = gdata.data;
	    	$.each(goodList,function(i,n){
	    		 //商品图的url
	    		 var url;
	           	 if(n.img_path_str.indexOf(",")<0){
	       			 url = n.img_path_str;
	       		 }else{
	       			//图片url,取第一个，之前的值
	       			 url = n.img_path_str.substr(0,n.img_path_str.indexOf(","));
	       		 }
	    		 //商品id
	    		 var goodId = n.id;
	    		 var goodName = n.commodity_name;
	    		 var price = n.price;
	    		 
	    		 var li = 
	    			 '  <li class="goods-card card small-pic"> 										 '
	    			 +'	  <input type="hidden" value='+goodId+' />                                           '
	    			 +'	  <a class="link js-goods clearfix" href='+getRootPath()+'/pages/webstore/webpage/preview/goodDetail_mobile.jsp?goodId='+goodId+' style="text-decoration: none;">  '
	    			 +'		<div class="photo-block">                                                '
	    			 +'		 <img class="goods-photo js-goods-lazy" src="'+url+'" />                        '
	    			 +'		</div>                                                                   '
	    			 +'		<div class="info">                                                       '
	    			 +'		 <p class="goods-title">'+goodName+'</p>                                        '
	    			 +'		 <p class="goods-price">'+price+'</p>                                          '
	    			 +'		 <p class="goods-price-taobao"></p>                                      '
	    			 +'		 <div class="goods-buy btn1"></div>                                      '
	    			 +'		</div>                                                                   '
	    			 +'	  </a>                                                                       '
	    			 +'   </li>                                                                       '
	    		 $(".control-group ul").append(li);
	    	})
	    	 //改背景色
	    	 $(".custom-search").css("background-color",bgcolor);
	    	 //给搜索框赋值
	    	 $("#yulanMain").find("#module .custom-search-input").val(goodName);
	    	 if($(".control-group ul").children().length>0){
	    		$(".control-group ul").css("display","block");
	    		$(".control-group span").css("display","none");
	    	}else{
	    		$(".control-group ul").css("display","none");
	    		$(".control-group span").css("display","block");
	    	} 
	    }
	});	
	
	//给商品搜索按钮绑定事件
	$("#yulanMain").find("#module .custom-search-button").click(function(){
		var goodName = $("#yulanMain").find("#module .custom-search-input").val();
		var url = ''+getRootPath()+'/pages/webstore/webpage/goodsSearch_mobile.jsp?bgcolor='+bgcolor+'&goodName='+goodName+'';
		location.href = url;
	})

});


//跳转到电脑端
function toPc(){
	var goodName = $("#yulanMain").find("#module .custom-search-input").val();
	var url = ''+getRootPath()+'/pages/webstore/webpage/goodsSearch_pc.jsp?bgcolor='+bgcolor+'&goodName='+goodName+'';
	location.href = url;
}
</script>

</head>
<body class="feature-content body-fixed-bottom" style="">
<div class="container " style="min-height: 700px;">
    <div class="header">
        <div class="headerbar">
            <div class="headerbar-wrap clearfix">
                <div class="headerbar-preview">
                    <span>预览：</span>
                    <ul>
                        <li>
                            <a href="javascript:void(0);" class="js-no-follow active" data-size="default" >手机版</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" class="js-no-follow" data-size="800" onclick="toPc()">PC版</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="content ">
        <div class="content-body js-page-content" id="yulanMain" style="width: 400px;margin-left: 250px;">
           	<div class="app-entry" id="module"> 
				 <div class="app-field clearfix editing module_div"> 
					<div class="control-group"> 
					 <div class="custom-search"> 
					  <form action="/" > 
					   <input type="text" class="custom-search-input" placeholder="搜索商品" /> 
					   <input type="button" class="custom-search-button" style="width: 22px;"> 
					  </form> 
					 </div> 
					 <div class="component-border"></div> 
					</div> 
					<div class="sort"> 
					 <i class="sort-handler"></i> 
					</div> 
				   </div> 
				   
				   <div class="app-field clearfix editing module_div"> 
					<div class="control-group"> 
					 <span style="display: none;">没有找到相关商品！</span>
					 <ul class="sc-goods-list clearfix size-3 list card"> 
					 </ul> 
					 <div class="component-border"></div> 
					</div> 
					<div class="sort"> 
					 <i class="sort-handler"></i> 
				 </div> 
			   </div> 
			 </div>
        
        
        
        </div>
        <div id="shop-nav" style="display: block;">
            <div class="js-navmenu js-footer-auto-ele shop-nav nav-menu nav-menu-1 has-menu-3">
                <div class="nav-special-item">
                    <a href="https://h5.youzan.com/v2/showcase/homepage?kdt_id=15635310" class="home" class="home">主页</a>
                </div>
                <div class="nav-items-wrap">
                    <div class="nav-item">
                        <a class="mainmenu js-mainmenu" href="#">
                            <span class="mainmenu-txt">商城主页</span>
                        </a>
                    </div>
                    <div class="nav-item">
                        <a class="mainmenu js-mainmenu" href="javascript:void(0);">
                                <span class="mainmenu-txt">
                                    <i class="arrow-weixin"></i>我有会员
                                </span>
                        </a>
                        <div class="submenu js-submenu">
                            <span class="arrow before-arrow"></span>
                            <span class="arrow after-arrow"></span>
                            <ul>
                                <li>
                                    <a href="#">我的订单</a>
                                </li>
                                <li class="line-divide"></li>
                                <li>
                                    <a href="#">购物车</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="nav-item">
                        <a class="mainmenu js-mainmenu" href="#">
                            <span class="mainmenu-txt">在线咨询</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="js-footer" style="min-height: 1px;">
    <div>
        <div class="footer" style="width:auto;">
            <div class="copyright">
                <div class="ft-links">
                    <a href="#" target="_blank">店铺主页</a>
                    <a href="#" target="_blank">会员中心</a>
                    <a href="javascript:;" class="js-open-follow">关注我们</a>
                    <a href="#" target="_blank">店铺信息</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="search-bar" style="display:none;">
    <form class="search-form" action="https://h5.youzan.com/v2/search" method="GET">
        <input type="search" class="search-input" placeholder="搜索商品" name="q" value="">
        <input type="hidden" name="kdt_id" value="15635310">
        <a class="js-search-cancel search-cancel" href="javascript:;">取消</a>
        <span class="search-icon"></span>
        <span class="close-icon hide"></span>
    </form>
    <div class="history-wrap center">
        <ul class="history-list search-recom-list js-history-list clearfix"></ul>
        <a class="tag tag-clear js-tag-clear c-gray-darker hide" href="javascript:;">清除历史搜索</a>
    </div>
</div>
</body>
</html>
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
 <title>商品详情页</title>
    <script type="text/javascript">
        (function (doc, win) {
            var docEl = doc.documentElement,
                    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                    recalc = function () {
                        var clientWidth = docEl.clientWidth;
                        if(clientWidth>750) clientWidth=750;
                        if (!clientWidth) return;
                        docEl.style.fontSize = Math.floor(100 * (clientWidth / 750)) + 'px';
                    };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    </script>
    <link rel="stylesheet" href="evaluation.css"/>
    <script src="./jquery.min.js"></script>
    <script type="text/javascript" src="../../../../commons/js/commons.js"></script>
    <script src="./evaluation.js"></script>
<style type="text/css">
.back{
    padding:0;
    cursor:pointer;
}
.back:after{
    clear:both;
    display:block;
    content:'';
}
.back>span{
    float:left;
    font-size:.2rem;
}
.back>img{
    width:.3rem;
    height:.3rem;
    float:left;
   }
 </style>
</head>
<body>
<div class="viewport">
  <!--返回按钮-->
      <div class="back">
        <img  src="back.png" alt="">
        <span>返回</span>
     </div>
    <!-- 作者信息 -->
    <div class='writer clear'>
        <div class='img left'><img id="head_img_url"/></div>
        <div class='content left'>
            <div id="wx_name">仗剑走天涯</div>
            <div id="publish_time" style='font-size:.22rem;color:#999;'>2018-04-02</div>
        </div>
    </div>
    <!--  星级  -->
    <div class='grade'>
        <img id="grade1" class='starLevel left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/noStar.png'/>
        <img id="grade2" class='starLevel left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/noStar.png'/>
        <img id="grade3" class='starLevel left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/noStar.png'/>
        <img id="grade4" class='starLevel left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/noStar.png'/>
        <img id="grade5" class='starLevel left' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/noStar.png'/>
        <span id="gradeName">还不错哦</span>
    </div>
    <!--  图文详情  -->
    <div class='textContent clear'>
        <div id="img_two" class='img wid50'></div>
        <div id="img_six" class='img wid33 clear'></div>
        <!--  心得产品  -->
        <div class='recommend'  onclick="addShopping()">
            <div class='shop clear'>
                <div class='img left'><img id="img_path_str" src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/shop1.png'/></div>
                <div class='data left'>
                    <div id="commodity_name" class='name'>Doctor's Best, 番茄红素Ly c-O-Mato, 10毫克，120粒</div>
                    <div id="price" class='price'>参考价: ¥189</div>
                </div>
                <div class='shopping left'>
                    <img src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/shopping.png'/>
                    <span>加购</span>
                </div>
            </div>
        </div>
        <div id="experience_content_list">
        </div>
    </div>
    <!--  评论  -->
    <div class='commentModule'>
        <div class='title'>评论 （<span id="evaluate_amount">10</span>）</div>
        <div id="commentReply" class='commentPeople clear'>
            <input class='left' value="" maxlength="300" placeholder='谢谢你长这么好看还来给我评论!' data-content=""/>
            <span class="replyBtn left" id="replyButt" onclick="replyBtn(this)">回复</span>
        </div>
        <div id="noCommentList" class='noComment clear' style="display: none">
        </div>
	    <div id="commentList">
	    </div>
        <div id="commentMore" class='more' onclick="commentMore(0)">查看更多评论 <img style="display: inline" src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/common/shopBreak.png'/></div>
    </div>
</div>
</body>
</html>
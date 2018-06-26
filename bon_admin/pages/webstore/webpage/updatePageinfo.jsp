<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>微页面修改页面</title>
	<meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
	<link rel="stylesheet" href="${basePath}/tools/layui1.0.9/css/layui.css" media="all">
    <link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/chosen.jquery.20150826.min.css">
    <link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/dashboard_v4_7f51edc001.css">
    <link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/feature_a2159d53c2.css">
    <link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/jquery-ui.min.css">
    <link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/pc_7364614c8d.css">
    
	<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/yz.css" >
	<link rel="stylesheet" href="${basePath}/pages/webstore/webpage/css/bootstrap_140705.min.css">
	<link rel="stylesheet" href="${basePath}/ueditor/themes/iframe.css"></link>
	<style>
         .inner-page-top{
            width: auto;
            border-bottom:1px solid #e5e5e5;
            padding: 17px 21px;
        }
        .inner-page-main {
            border-left:1px solid #e5e5e5;
            background-color: #F2F2F2;
            height: auto;
            overflow: hidden;
        }
        .inner-page-main-container {
            margin: 10px;
            padding: 15px;
            background-color: #fff;
            height: auto;
            overflow: hidden;
        }

        .inner-page-top {
            width: auto;
            border-bottom: 1px solid #e5e5e5;
            padding: 17px 21px;
        }
        .inner-page-main {
            border-left: 1px solid #e5e5e5;
            background-color: #F2F2F2;
            height: auto;
            overflow: hidden;
        }
        .inner-page-main-container {
            margin: 10px;
            padding: 15px;
            background-color: #fff;
            height: auto;
            overflow: hidden;
        }

        a {
            color: #38f;
        }
        a:hover, a:focus {
            color: #07d;
            text-decoration: none;
        }

        form div input {
            display: inline-block;
            height: 20px;
            padding: 4px 6px;
            font-size: 12px;
            line-height: 20px;
            color: #555;
            vertical-align: middle;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            transition: border linear .2s,box-shadow linear .2s;
            background-color: #fff;
            border: 1px solid #ccc;
            margin-bottom: 0;

        }
        .uneditable-input:focus, input[type=text]:focus, input[type=password]:focus, input[type=datetime]:focus, 
        input[type=datetime-local]:focus, input[type=date]:focus, input[type=month]:focus, input[type=time]:focus, 
        input[type=week]:focus, input[type=number]:focus, input[type=email]:focus, input[type=url]:focus, 
        input[type=tel]:focus, input[type=color]:focus, input[type=search]:focus, textarea:focus {
            border-color: rgba(82,168,236,.8);
            outline: 0;
            outline: dotted thin\9;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
            -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
        }

        .controls ,input{
            display: inline-block;
        }
        label{
            display: inline-block;
        }
        .uneditable-input, input, textarea {
            width: 206px;
        }
        .btn {
            padding: 4px 12px;
            margin-bottom: 0;
            font-size: 14px;
            color: #333;
            vertical-align: middle;
            cursor: pointer;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
        .btn:hover {
            border-color: rgba(82,168,236,.8);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(82,168,236,.6);
            transition: border linear .2s,box-shadow linear .2s;
        }
        .checkbox.inline+.checkbox.inline, .radio.inline+.radio.inline {
            margin-left: 10px;
        }
        .checkbox.inline, .radio.inline {
            display: inline-block;
            padding-top: 5px;
            margin-bottom: 0;
            vertical-align: middle;
        }
        .app-preview .sc-goods-list.list .goods-card .photo-block {
            float: left;
            margin-right: 13px;
            width: 125px;
            height: 125px
        } 
        
        #modality>div{ 
        	display: none; 
        }
        #modality>div:first-child{
         	display: block; 
        }
        
        /* 左右留边的样式 */
        .left-right-margin{
        	margin: 0 10px!important;	
        }
    </style>
</head>
<body>
<div class="inner-page-top layui-clear">
    <a href="" style="color: #38f;">微页面</a>/新建微页面
</div>
<div class="inner-page-main app layui-clear" id="total">
	<!-- 从数据库中加载 -->
</div>
<!-- ueditor编辑器所需js -->
<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.all.min.js"></script>
<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/lang/zh-cn/zh-cn.js"></script>
<!-- 所需基础js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-1.11.3.js" ></script>
<script type="text/javascript" src="${basePath}/commons/js/commons.js"></script>
<script type="text/javascript" src="${basePath}/tools/layui1.0.9/layui.js"></script>
<!-- 各模块公用的js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/total.js" ></script>
<!-- 日历控件引入的js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/jquery-ui-timepicker-addon.min.js" ></script>
<!-- 提交表单，初始化的js -->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/editPageinfo.js"></script>
<!-- 引入各个模块的js   注释掉的暂时不需要开发-->
<%-- <script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/goods.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/title.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/richtext.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/text_nav.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/nav.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/store.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/goods_list.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/notice.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/showcase.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/image_ad.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/cube2.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/search.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/line.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/white.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/link.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/audio.js" ></script>
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/coupon.js" ></script> --%>
<script>
$("body").on("click",function(){
	//$("div.popover-inner").hide();
	var chi=$(modality).children();
	for(var i=0;i<chi.length;i++){
		var sty=$(chi[i]).css("display");
		if(sty=="block"){
			var top=parseInt($(chi[i]).css("top"));
			var height=$(chi[i]).height();
		}
	}
	var mCheight=$("#module_class").height();
    var rheight=$("#module").height();
    var zheight=rheight+mCheight;
    height=height+top;
    if(height>800||zheight>800){
        if(height>zheight){
        	$("#total").css("height",height+125+"px");
        	$("#root").css("height",height+35+"px");
        }else{
        	$("#total").css("height",zheight+125+"px");
        	$("#root").css("height",zheight+35+"px");
        }
    }
});

window.onload = function(e){
	e.preventDefault();
	//将所有的边框全部隐藏
	$("#module").find(".module_div .actions").css("border","2px dashed transparent");
	//所有的actions隐藏
    $("#module").find(".module_div .actions").hide();
    //所有的编辑框隐藏
	$("#modality").children().hide();
	//判断高度，使页面显示完整
	var height=$("#module").parents(".app-preview").height();
	if(height>800){
        $("#total").css("height",height+125+"px");
        $("#root").css("height",height+35+"px");
    }else{
    	$("#total").css("height","auto");
        $("#root").css("height","auto");
    }

    var div=$("div[id*='edui]");
    //console.log(div);
	for(var i=0;i<div.lenght;i++){
		var num=$(div[i]).attr("id").substring(4);
		if(num!="1"){
			$(div[i]).remove();
		}
	}
} 
</script>
</body>
</html>
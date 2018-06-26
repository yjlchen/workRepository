<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>微页面草稿编辑页面</title>
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
            border:1px solid #e5e5e5;
            background-color: #F2F2F2;
            height: auto;
            overflow: hidden;
        }
        .inner-page-main-container {
        	border: 1px solid #e5e5e5;
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
            border: 1px solid #e5e5e5;
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
    <!-- <a href="" style="color: #38f;">微页面</a>/ -->
    	新建微页面
</div>
<div class="inner-page-main app layui-clear" id="total">
    <div class="inner-page-main-container app-inner" style="margin-bottom:50px;" id="root">
        <div class="app-init-container">
            <div class="app__content js-app-main"><div class="app-design clearfix">
                <div class="app-preview">
                    <div class="app-entry" id="module">
                        <div class="app-config js-config-region module_div">
                            <div class="app-field clearfix editing">
                                <h1 style="margin-top:0;"><span id="page-title">微页面标题</span></h1>
                                <span id="page-description" style="display:none;"></span>
                            </div>
                        </div>
                    </div>
                    <div class="js-add-region" id="module_class">
                        <div>
                            <div class="app-add-field">
                                <h4>添加内容</h4>
                                <ul>
                                    <li><a class="js-new-field" data-field-type="rich_text">富文本</a></li>
                                    <li><a class="js-new-field" data-field-type="goods">商品</a></li>
                                    <li><a class="js-new-field" data-field-type="goods_list">商品<br>列表</a></li>
                                    <li><a class="js-new-field" data-field-type="image_ad">图片<br>广告</a></li>
                                    <li><a class="js-new-field" data-field-type="cube2">魔方</a></li>
                                    <li><a class="js-new-field" data-field-type="title">标题</a></li>
                                    <li><a class="js-new-field" data-field-type="text_nav">文本<br>导航</a></li>
                                    <li><a class="js-new-field" data-field-type="nav">图片<br>导航</a></li>
                                    <!-- <li><a class="js-new-field" data-field-type="link">关联<br>链接</a></li> -->
                                    <li><a class="js-new-field" data-field-type="search">商品<br>搜索</a></li>
                                    <li><a class="js-new-field" data-field-type="showcase">橱窗</a></li>
                                    <li><a class="js-new-field" data-field-type="line">辅助线</a></li>
                                    <li><a class="js-new-field" data-field-type="white">辅助<br>空白</a></li>
                                    <!-- <li><a class="js-new-field" data-field-type="component">自定义<br>模块</a></li> -->
                                    <li><a class="js-new-field" data-field-type="store">进入<br>店铺</a></li>
                                    <!-- <li><a class="js-new-field" data-field-type="tag_list">商品<br>分组</a></li> -->
                                    <!-- <li><a class="js-new-field" data-field-type="audio">语音</a></li> -->
                                    <li><a class="js-new-field" data-field-type="notice">公告</a></li>
                                    <li><a class="js-new-field" data-field-type="coupon">优惠券</a></li>
                                    <!-- <li><a class="js-new-field" data-field-type="ump_activity">营销活动</a></li> -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modality">
                <div class="app-sidebar keep" style="margin-top: 0px;">
                    <div class="arrow"></div>
                    <div class="app-sidebar-inner js-sidebar-region">
                        <div>
                            <form class="form-horizontal"  id="wymForm">
                          	    <input type="hidden" name="id" />
                          	    <input type="hidden" name="micro_main">
                                <div class="control-group">
                                    <label class="control-label"><em class="required">*</em>页面名称：</label>
                                    <div class="controls" style="margin: 0">
                                      <input class="input-xxlarge" type="text"  
                                      	name="micro_name" value="微页面标题" id="_page-title" maxlength="16">
                                      <p class="help-block error-message" style="display: none;color: red">页面名称不能为空</p>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">页面描述：</label>
                                    <div class="controls" style="margin: 0">
                                        <input class="input-xxlarge" type="text" name="micro_des" maxlength="128"
                                               placeholder="用户通过微信分享给朋友时，会自动显示页面描述" id="_page-description">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label">分类：</label>
                                    <div class="controls" style="margin: 0">
                                        <div class="chosen-container chosen-container-multi" style="width: 220px;" title="">
                                        		<select name="micro_group_id" id="micro_group_id" >
				           							<option value="">全部分类</option>
				        						</select>
                                        </div>
                                    </div>
                                </div>
                                <!-- 
                                <div class="control-group">
                                    <label class="control-label">背景颜色：</label>
                                    <div class="controls" style="margin: 0">
                                        <input type="color" value="#f9f9f9" name="back_color">
                                        <button class="btn js-reset-bg" type="button">重置</button>
                                        <p class="help-desc">背景颜色只在手机端显示。</p>
                                    </div>
                                </div> -->
                            </form>
                        </div>
                     </div>
                	</div>
                </div>
                <div class="app-actions" style="bottom: 0;z-index:1000">
                    <div class="form-actions text-center">
                        <button class="zent-btn zent-btn-primary js-btn-add"  id="launch">上 架</button>
                        <button class="zent-btn js-btn-save"  id="savedraft">保存成草稿</button>
                        <button class="zent-btn js-btn-preview" id="yulan">预览效果</button>
                    </div>
                </div>
                <!-- <div id="data" style="display:none;position:fixed;">
                    <input id="defult" />
                    <input id="date_start_1" style="display: none"/><input id="date_end_1" style="display: none" />
                </div> -->
              </div>
            </div>
        </div>
    </div>
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
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/editPageinfoDraft.js"></script>
<!-- 引入各个模块的js   注释掉的暂时不需要开发-->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/goods.js" ></script>
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
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/coupon.js" ></script>
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
</script>
</body>
</html>
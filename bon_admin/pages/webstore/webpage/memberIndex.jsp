<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>会员主页新增</title>
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
        .uneditable-input:focus, input[type=text]:focus, input[type=password]:focus, input[type=datetime]:focus, input[type=datetime-local]:focus, input[type=date]:focus, input[type=month]:focus, input[type=time]:focus, input[type=week]:focus, input[type=number]:focus, input[type=email]:focus, input[type=url]:focus, input[type=tel]:focus, input[type=color]:focus, input[type=search]:focus, textarea:focus {
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
        .cuxiao{
        	width:100% !important;
        	display:block !important;
        	font-size:16px;
        	margin:1px !important;
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
    <span>会员主页</span>
</div>
<div class="inner-page-main app layui-clear" id="total">
    <div class="inner-page-main-container app-inner" id="root">
        <div class="app-init-container">
            <div class="app__content js-app-main"><div class="app-design clearfix">
                <div class="app-preview">
                    <div class="app-entry" id="module">
                       <div class="app-config js-config-region module_div">
						<div class="app-field clearfix editing">
							<h1 style="margin: 0"><span id="hyzy-title">会员主页</span></h1>
								<div class="app-field editing">
									<div class="control-group">
										<div class="custom-level">
											<img class="custom-level-img" src="${basePath}/pages/webstore/webpage/image/hyzybjt.jpg" id="leftHyzybjt">
											<div class="custom-level-title-section">
											    <h5 class="custom-level-title" style="display: none;">尊贵的｛会员等级名｝</h5>
												<h5 class="custom-level-title" style="display: block;">你拥有本店积分：888</h5>
											</div>
										</div>
									<div class="order-related www-tpl-usercenter">
										<ul class="uc-order list-horizon clearfix" style="margin: 0">
											<li>
												<a class="link clearfix relative link-topay" href="javascript: void(0);">
													<span class="title-num">99+</span>
													<p class="title-info c-black font-size-12">待付款</p>
												</a>
											</li>
											<li>
												<a class="link clearfix relative link-totuan" href="javascript: void(0);">
													<p class="title-info c-black font-size-12">待接单</p>
												</a>
											</li>
											<li>
												<a class="link clearfix relative link-tosend" href="javascript: void(0);">
													<span class="title-num">5</span>
													<p class="title-info c-black font-size-12">待发货</p>
												</a>
											</li>
											<li>
												<a class="link clearfix relative link-send" href="javascript: void(0);">
													<span class="title-num">7</span>
													<p class="title-info c-black font-size-12">已发货</p>
												</a>
											</li>
											<li>
												<a class="link clearfix relative link-sign" href="javascript: void(0);">
													<span class="title-num">3</span>
													<p class="title-info c-black font-size-12">已完成</p>
												</a>
											</li>
										</ul>
										<div class="block block-list list-vertical">
											<a class="block-item link ico-order clearfix" href="javascript: void(0);">
												<p class="title-info c-black font-size-14">全部订单</p>
											</a>
										</div>
										<div class="block block-list list-vertical">
											<a class="block-item link clearfix ico-saler-center" href="javascript: void(0);">
												<p class="title-info c-black font-size-14">销售员中心</p>
											</a>
										</div>
										<div class="block block-list list-vertical">
											<a class="block-item link ico-gift clearfix" href="javascript: void(0);">
												<p class="title-info c-black font-size-14">我收到的礼物</p>
											</a>
											<a class="block-item link ico-coupon clearfix" href="javascript: void(0);">
												<p class="title-info c-black font-size-14">我的优惠券</p>
											</a>
											<a class="block-item link ico-promocode clearfix" href="javascript: void(0);">
												<p class="title-info c-black font-size-14">我的优惠码</p>
											</a>
										</div>
									</div>
									</div>
								</div>
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
                                  <!--   <li><a class="js-new-field" data-field-type="link">关联<br>链接</a></li> -->
                                    <li><a class="js-new-field" data-field-type="search">商品<br>搜索</a></li>
                                    <li><a class="js-new-field" data-field-type="showcase">橱窗</a></li>
                                    <!-- <li><a class="js-new-field" data-field-type="line">辅助线</a></li> -->
                                    <!-- <li><a class="js-new-field" data-field-type="white">辅助<br>空白</a></li> -->
                                    <!-- <li><a class="js-new-field" data-field-type="component">自定义<br>模块</a></li> -->
                                    <li><a class="js-new-field" data-field-type="store">进入<br>店铺</a></li>
                                    <li><a class="js-new-field" data-field-type="notice">公告</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modality">
                <div class="app-sidebar keep" style="margin-top: 0px;">
                    <div class="arrow"></div>
                     <div class="app-sidebar-inner js-sidebar-region"><div>
						  <form class="form-horizontal" id="hyzyForm">
						    <input type="hidden" name="id" />
							<div class="control-group">
								<label class="control-label"><em class="required">*</em>页面名称：</label>
								<div class="controls" style="margin-left: 0">
									<input class="input-xxlarge" type="text" name="title" value="会员主页" id="hyzymc">
									<p class="help-block error-message" style="display: none;color: red">标题长度不能少于一个字或者多于50个字</p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">背景图：</label>
								<div class="controls" style="margin-left: 0">
									<img src="${basePath}/pages/webstore/webpage/image/hyzybjt.jpg" width="100" height="100" id="rightHyzybjt">
									<a class="js-choose-bg control-action" href="javascript: void(0);" onclick="addMemberIndexPho('insert_MemberIndexPho',1)">修改背景图</a>
									<p class="help-block">建议尺寸：640 x 320 像素</p>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">等级：</label>
								<div class="controls" style="margin-left: 0">
									<label class="checkbox inline">
										<input type="checkbox" name="show_level" value="0">显示等级
									</label>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">积分：</label>
								<div class="controls" style="margin-left: 0">
									<label class="checkbox inline">
										<input type="checkbox" name="show_point" value="1" checked="">显示积分
									</label>
								</div>
							</div>
							<!-- 
							<div class="control-group">
								<label class="control-label">销售员中心：</label>
								<div class="controls" style="margin-left: 0">
									<label class="radio inline">
										<input type="radio" name="salesman_center_option" value="0" checked="">对所有会员显示
									</label>
									<label class="radio inline">
										<input type="radio" name="salesman_center_option" value="1">只对我的销售员显示
									</label>
								</div>
							</div> -->
						   </form>
						  </div>
						</div>
                	</div>
                </div>
                <div class="app-actions" style="bottom: 0;">
                    <div class="form-actions text-center">
                        <button class="zent-btn zent-btn-primary js-btn-add"  id="saveHyzy">保存</button>
                        <button class="zent-btn js-btn-preview" id="yulanHyzy">预览效果</button>
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
<!-- 引入各个模块的js   注释掉的暂时不需要开发-->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/memberIndex.js" ></script>

<script type="text/javascript">
	//定义一个数组，存储leftText_后面的数字
	var numArr = [];
	var saveUrl = getRootPath()+ '/webstore/memberIndex/addMemberIndex.action'; 
	layui.use(['form','layer'], function(){
		//保存
		$("#saveHyzy,#yulanHyzy").click(function(){
			//获得要提交的字段的值
			var id = $("input[name='id']").val();
			var page_name = $("#hyzymc").val();
			//图片路径
			var back_img_url = $("#rightHyzybjt").attr("src");
			//判断是否显示等级
			var sfxsdj;
			var show_level = $("input[name='show_level']");
			if(show_level.is(':checked')==true){
				sfxsdj = 0;
			}else if(show_level.is(':checked')==false){
				sfxsdj = 1;
			}
			//判断是否显示积分
			var sfxsjf;
			var show_point = $("input[name='show_point']");
			if(show_point.is(':checked')==true){
				sfxsjf = 0;
			}else if(show_point.is(':checked')==false){
				sfxsjf = 1;
			}
			
			var edit_content = $("#total").html();
			var preview_content = $(".app-preview").html();
			
			var addJsonStr = {"id":id,"page_name":page_name,"back_img_url":back_img_url,"grade_view":sfxsdj,"integral_view":sfxsjf,"edit_content":edit_content,"preview_content":preview_content};
			var jsonStr = JSON.stringify(addJsonStr);
			
			//获得公告的内容（如果有的话）
			var noticeArray = $("input[name='content']");
			for(var i=0;i<noticeArray.length;i++){
				var value = $(noticeArray[i]).val();
					//判断公告内容不能为空
					if(value == ""){
						var index = $(noticeArray[i]).parents("div.app-sidebar").index();
						var top = $(noticeArray[i]).position().top;
				        $(modality.children()[index]).css("display","block");
				        $(modality.children()[index]).siblings().css("display","none");
						//显示错误提示信息
				        $(modality.children()[index]).find(".notice-error-message").css("display","block");
						return false;
						break;
					}
				}
			
			if(page_name==""){
				$(".error-message").css("display","block");
				return false;
			}
			else{
				$.ajax({
					url : saveUrl,
					type : 'POST',
					data : {signupForm:jsonStr},
					dataType : 'TEXT',
					success : function(result){
						if("success"==result){
							layer.msg("保存成功", {
								  icon: 1,
								  time: 500 //（如果不配置，默认是3秒）
								}, function(){
									location.href = getRootPath()+ '/webstore/memberIndex/toMemberIndex.action';
									
								});
						}
						else{
							parent.layer.alert("保存失败");
						}
					},
					error:function(){
						parent.layer.alert("保存失败");
					}
				});
			  }
			
		  });
		
	})
</script>

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

</body>
</html>
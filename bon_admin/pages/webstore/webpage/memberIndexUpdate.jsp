<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>会员主页修改</title>
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
<!-- 引入各个模块的js   注释掉的暂时不需要开发-->
<script type="text/javascript" src="${basePath}/pages/webstore/webpage/js/memberIndex.js" ></script>

<script type="text/javascript">
	//定义一个数组，存储leftText_后面的数字
	var numArr = [];
	var saveUrl = getRootPath()+ '/webstore/memberIndex/updateMemberIndex.action'; 
	layui.use(['form','layer'], function(){
		//修改时加载数据
		$.ajax({
		    url : getRootPath()+"/webstore/memberIndex/queryMemberIndexMap.action",
		    type : "post",
		    async: false,//同步
		    dataType:"json",
		    success : function (gdata) {
		    	$("#total").html(gdata.edit_content);
		    	//定义<div id="total">对象
		    	var total = $(gdata.edit_content);
		    	//遍历id以leftText_开头的div
		    	total.find("div[id*='leftText_']").each(function (j,n) {  
		            var id = $(n).attr("id");
		            //获得id'_'后面的数字
		        	var num  = id.substr(id.lastIndexOf('_')+1);
		        	//给对应的文本编辑器赋值	
		        	$(document.getElementById('ueditor_'+num).contentWindow.document.body).html("<p>"+$(n).html()+"</p>"); 
		        	//向数组中放值
		        	numArr.push(parseInt(num));
		        });  
		    	
		    	//遍历id以li_开头的li，目的是找到商品，给商品的价格等信息赋值，以便商品信息更新时，微页面随之变化
		    	total.find("li[id*='li_']").each(function (j,n) {  
		    		//获得隐藏域中的商品id
		    		var goodId = $(n).children().eq(0).val();
		    		//获得这个li的id
		    		var id = $(n).attr("id");
		    		//获得id的_后面的数字
		    		var num  = id.substr(id.lastIndexOf('_')+1);
		    		//根据id,ajax查询其他商品信息，并赋值
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
	    	    			$("#"+id).find("div.photo-block img").attr("src",url);
	    	    			$("#"+id).find("div.info .goods-title").html(goodName);
	    	    			$("#"+id).find("div.info .goods-price").html(price);
	    	    			$("#good_"+num).find("img").attr("src",url);
	    	            },
	    	            'error':function(){
	    	            }
	    		    });
		    	});
		    	
		    	//给会员主页表中存储的字段赋值
		    	$("input[name='id']").val(gdata.id);
				
				//加载各个模块的js
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/total.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/goods.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/title.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/richtext.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/text_nav.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/nav.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/store.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/goods_list.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/notice.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/showcase.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/image_ad.js");
		    	jQuery.getScript(getRootPath()+"/pages/webstore/webpage/js/memberIndex.js");
		    	
		     }
		  });
		
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
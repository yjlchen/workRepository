<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>资讯审核</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/pages/commodity/manage/c_files/chosen.css"  media="screen">
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.config.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/ueditor.all.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="${basePath}/ueditor/lang/zh-cn/zh-cn.js"></script>
	<link rel="stylesheet" href="${basePath}/ueditor/themes/iframe.css"></link>
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<%
	String status = request.getParameter("status");
%>
<script type="text/javascript">
	var status = '<%=status %>';
</script>
<style type="text/css">
.chzn-container-multi .chzn-choices .search-field input{
    	height:auto !important;
    }
	.icon-add {
		display: inline-block;
		width: 14px;
		height: 14px;
		background-image: url("${basePath}/pages/order/allorder/icon-add.png");
		background-repeat: no-repeat;
		background-position: 0
	}
	
	.module-goods-list li .add-goods,
	.module-goods-list li .add,
	.app-image-list li .add-goods,
	.app-image-list li .add {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 50px;
		text-align: center;
		cursor: pointer
	}
	#addBannerContent .layui-form-item .module-goods-list .goods-thumb{
		width: 50px;
    	height: 50px;
    	display: inline-block;
    	background-size: 100% 100%;
	}
	#addBannerContent .layui-form-item .module-goods-list li{
		position:relative;
	}
	#addBannerContent .layui-form-item .module-goods-list .close-modal{
		position: absolute;
    	top: -8px;
    	right: -8px;
    	width: 18px;
    	height: 18px;
    	font-size: 14px;
    	line-height: 16px;
    	border-radius: 9px;
    	background: rgba(153, 153, 153, 0.6);
    	text-align: center;
    	color:#fff;
	}
	.layui-anim-upbit{
		width: 300px;
	}
.shanpin {
	height: 50px;
	padding: 10px 10px 10px 34px;
}
.shanpin.layui-form {
    min-width: 800px;
}
.shanpin div.layui-unselect {
	display: initial;
}

#goods_list tbody tr td .shanpin div.layui-unselect i {
	margin-bottom: 27px;
}

#goods_list2 tbody tr td .shanpin div.layui-unselect i {
	margin-bottom: 27px;
	margin-left: -7px;
}

#goods_list2 tfoot tr td .shanpin div.layui-unselect i{
	margin-bottom: 4px;
	margin-left: -121px;
}

#goods_list tfoot tr td .shanpin div.layui-unselect i{
	margin-bottom: 4px;
	margin-left: -121px;
}

.shanpin input {
	display: inline-block;
	margin-right: 10px;
}

.shanpin img {
	margin: -30px 10px 0;
	width: 50px;
	height: 34px;
}

.shanpin div {
	/**width: 75%;**/
	height: 50px;
	display: inline-block;
}

.sorting_disabled div.layui-unselect i {
	margin: 0 10px 0 27px;
}

.dataTables_length div.layui-unselect {
	display: none;
}

#joinDiv div.layui-form-radio i{
   	margin-top: -2px;
}
span.tips{
	color:red;
	display:none;
}
.control-group>.reward-table-wrap {
    padding-left: 50px;
}
table.reward-table{
	width:100%;
}
table.reward-table tr{
	border:1px solid #ddd;
}
.page-reward .reward-table tr .pl100 {
    padding-left: 100px;
    text-align: left;
}
.reward-table tr th {
    line-height: 36px;
    background: #f2f2f2;
    text-align:center;
}
.reward-table tr td .first-reward {
    margin-top: 5px;
}
p.help-block.error-message{
	display:none;
	color:red;
}
label.checkbox.inline.reward-label {
    margin-left: 18px;
}
span.origin-status.show {
    float: right;
}
#addBannerContent .layui-form-item .module-goods-list li {
    position: relative;
    margin-top: 20px;
    margin-left: 15px;
}
	.layui-select-title {
		display: none
	}
	
/* 	#edui1 {
		height: 500px;
		width: 500px;
	} */
	div.p_img{
		width:50px;
		height:50px;
		border:1px solid #DDDDDD;
		float:left;
		position:relative;
		display:none;
	}
	img.delete{
		width: 20px;
	    height: 20px;
	    position: absolute;
	    right: -10px;
	    top: -11px;
	}
	div.select_box{
		width:50px;
		height:50px;
		border:1px solid #DDDDDD;
		line-height:50px;
		text-align:center;
		float:left;

	}
	div.standard{
		width:500px;
		height:auto;
		float:left;
		padding:10px 0;
		/* display:none */
	}
	div.standard>text,span{
		float:left;
		margin-top:5px;
	}
	div.standard>ul>li{
		width:auto;
		height:30px;
		line-height:30px;
		border:1px solid #DDDDDD;
		border-radius:5px;
		text-align:center;
		float:left;
		margin-left:15px;
	}
	li.selected{
		background-color:#4E97D9;
		color:#FFFFFF;
	}
</style>
</head>
<body>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addOrUpdateForm" class="layui-form" action="">
			    	<div id="addBannerContent">
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">标题：</label>
							    <div class="layui-input-inline" > 
							       <input id="title" name="title" type="text" class="layui-input" style="width: 300px; border:none;" disabled="disabled">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">简介：</label>
							    <div class="layui-input-inline" > 
							       <input id="brief_introduce" name="brief_introduce" type="text" class="layui-input" style="width: 300px; border:none;" disabled="disabled">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟浏览量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_browse_amount" name="unreal_browse_amount" type="text" class="layui-input" style="width: 300px; border:none;" disabled="disabled">
							    </div>
						    </div>
						 </div>
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟收藏量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_collect_amount" name="unreal_collect_amount" type="text" class="layui-input" style="width: 300px; border:none;" disabled="disabled">
							    </div>
						    </div>
						 </div>
						 
						 
				    	<div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">虚拟点赞量：</label>
							    <div class="layui-input-inline" > 
							       <input id="unreal_praise_amount" name="unreal_praise_amount" type="text" class="layui-input" style="width: 300px; border:none;" disabled="disabled">
							    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">首页图片：</label>
				    			<button type="button" class="layui-btn" id="noImgUrl" style="display:none">
									  暂无图片
								</button>
			                    <div class="controls" id="imgDiv" style="display:none;width: 100%;height: 50px;margin-left: 165px;margin-top: -4px; border:none;" disabled="disabled">
			                        <ul class="module-goods-list clearfix" name="img_urls" id="img_urls">
			                        </ul>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: -15px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">音频：</label>
				    			<button type="button" class="layui-btn" id="uploadAudioUrl" style="display:none">
									  暂无音频
								</button>
			                    <div id="audioDiv" class="controls" style="display:none; width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;" disabled="disabled">
			                        <div id="audioUrl" style="outline:none;">
                					</div>
                					<input type="hidden" id="audio_url" name="audio_url"/>
			                    </div>
						    </div>
						 </div>
						 
						 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">标签：</label>
							    <div class="layui-input-inline" >
							    	<select name="label_id" id="label_id"  multiple="" style="width:400px; border:none;" disabled="disabled" >
									</select> 
							    </div>
						    </div>
						 </div>
						 
						 
					 	 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img class="commPic"></img>	
							    		</div>	
							    		<div class="select_box">
							    			<a>无</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe" data-commid="">
							    	</div>
							    </div>
						    </div>
						 </div>
						 		 
						 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">商品：</label>
							    <div class="layui-input-inline comms" style="width: 500px;">
							    	<!-- 选择图片-->
							    	<div class="select">
							    		<div class="p_img">
							    			<img class="commPic"></img>	
							    		</div>	
							    		<div class="select_box">
							    			<a>无</a>	
							    		</div>	
							    	</div>	
							    	<div class="spe">
							    	</div>
							    </div>
						    </div>
						 </div>
						 
					 	 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">内容：</label>
							    <div class="layui-input-inline" >
                          			<div style="width: 500px;"> <script id="editor" type="text/plain"></script></div> 
                          			<script type="text/javascript">
                          				var ue = UE.getEditor("editor",{
        									elementPathEnabled : false, //是否启用元素路径，默认是true显示
        									wordCount:false, //是否开启字数统计
        									toolbars: [[]],
        									readonly: true
        								});
                          			</script>
							    </div>
						    </div>
						 </div>
					 	  	 
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						    	<a class="layui-btn" id="returnToList">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
 

</body>
<script type="text/javascript" src="checkInformation.js"></script>
</html>
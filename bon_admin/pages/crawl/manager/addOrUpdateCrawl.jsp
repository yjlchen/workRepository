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
<title></title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="addOrUpdateCrawl.js"></script>
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
</style>
</head>
<body>
<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">新增公众平台</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="misssionForm1" class="layui-form" action="">
			    	<div id="addMissionContent">
						 <div class="layui-form-item" style="margin-top: -15px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">公众号/微信号：</label>
							    <div class="layui-input-inline" style="width: 400px;">
							    <input id="key" name="key"  placeholder="公众号/微信号" class="layui-input" style="width: 200px;">
							      	<!-- <select id="type" name="type" lay-verify="type" lay-filter="typeFilter" >
								       <option value="">请选择任务名称</option>
								       <option value="分享">分享</option>
								       <option value="发布心得">发布心得</option>
								       <option value="发布视频">发布视频</option>
								       <option value="点赞">点赞</option>
								       <option value="签到">签到</option>
								       <option value="评论">评论</option>
								    </select> -->
							    </div>
						    </div>
						 </div>
			    	
				    	<!-- <div class="layui-form-item" style="margin-top: -15px;">
				    		<div class="layui-inline" id="select_featured">
					        <label class="layui-form-label" style="width: 165px;">序号：</label> 
							     <label class="layui-form-label" style="width:100px"  style="display:none">
		          				 	 <input type="number" min="1" id="number_sort" step="1"  name="number_sort" style="width: 60px;">
		          			    </label>
						    </div>
						 </div>
						 <div class="layui-form-item" style="margin-top: -15px;">
				    		<div class="layui-inline" id="select_featured">
   					       <label class="layui-form-label" style="width: 165px;">分值设置：</label> 
				    		    <label class="layui-form-label" style="width: 100px"  style="display:none">
		          				 	 <input type="number" min="1" id="score_sort" step="1"  name="score_sort" style="width: 60px;">
		          			    </label>
				
						    </div>
						 </div>
						 <div class="layui-form-item" style="margin-top: -15px;">
				    		<div class="layui-inline" id="select_featured">
							    <label class="layui-form-label" style="width: 165px;">每日有效次数：</label> 
							    <label class="layui-form-label" style="width: 100px" style="display:none">
		          				 	 <input type="number" min="1" id="everyday_valid_times_sort" step="1" name="everyday_valid_times_sort" style="width: 60px;">
		          			    </label>
							 
						    </div>
						 </div> -->
					 	 <div class="layui-inline" style="margin-left: 50px;">
						    <div class="layui-input-inline layui-input-btn">
						       <a id="confirmBtn" class="layui-btn layui-btn-normal">确定</a>
						       <a id="return" class="layui-btn layui-btn-normal"
									style="height: 35px; margin-top: -2px;">返回</a>
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
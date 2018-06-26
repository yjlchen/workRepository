<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>客户标签管理</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath }/pages/customer/customerlabel/customerlabel.js"></script>
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
</head>
<style type="text/css">
	.chzn-container-multi .chzn-choices .search-field input{
    	height:auto !important;
    }
	.layui-anim-upbit{
		width: 300px;
	}
	#bannerForm .layui-form-item .layui-form-select{
		display: inline-block;
	}
	#bannerForm .layui-form-item .layui-inline{
		margin: 4px 0 0 15px;
	}
	#bannerForm .layui-form-item .layui-unselect.layui-form-select{
		display: none;
	}
	#bannerForm .layui-form-item .chzn-container.chzn-container-multi{
		float: left;
    	margin-top: 0;
	}
	#bannerForm .layui-form-item .chzn-container.chzn-container-multi>ul{
		height: 38px !important;
    	border: 1px solid #e6e6e6;
    	background-color: #fff;
    	padding-left: 10px;
        border-radius: 5px;
	}
</style>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">客户标签</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container">
		   
			<div style="margin-left: -63px;margin-top: 15px;">
				<form id="bannerForm" class="layui-form" action="">
			    	<div class="layui-form-item">
					    <div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">姓名:</label>
							<div class="layui-input-block">
								<input type="text" name="cust_name" autocomplete="off" class="layui-input" style="margin-left: -20px;">
							</div>
						</div>
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px">性别:</label>
							<div class="layui-input-block">
								<input type="text" name="sex" autocomplete="off" class="layui-input" style="margin-left: -20px;">
							</div>
						</div>
						
						<div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px;">电话:</label>
							<div class="layui-input-block">
								<input type="text" name="phone" autocomplete="off" class="layui-input" style="margin-left: -20px;">
							</div>
						</div>
						
						 <div class="layui-form-item" style="display: inline-block;">
							<label class="layui-form-label" style="width: 100px;">标签:</label>
						 	<select name="label_id" id="label_id" multiple="" style="margin-left: -20px;width: 200px">
								
							</select> 
							<div class="layui-inline"> 
							    <div class="layui-input-inline layui-input-btn">
							       <a id="queryBannerInfo" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">筛选</a>
							    </div>
						 	</div> 
						</div>
					 </div>
				</form>
			</div>
			<div class="tool_item clearfix">
		        <table id="banner_list" class="layui-table">
		        	<colgroup>
		        		<col width="18%">
		        		<col width="18%">
		        		<col width="18%">
		        		<col width="18%">
		        		<col width="18%">
		        		<col>
		       </colgroup>
					<thead id="cust_header">
					     <tr>
					     	 <th style="text-align: center;">姓名</th>
							 <th style="text-align: center;">性别</th>
							 <th style="text-align: center;">昵称</th>
							 <th style="text-align: center;">电话</th>
							 <th style="text-align: center;">标签</th>
							 <th style="text-align: center;">加标签</th>
						</tr>
					</thead>
				    <tbody>
					</tbody>
				</table>
		    </div>
		 </div>
	</div>
</body>
</html>
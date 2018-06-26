<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.swn.common.util.DateUtil,com.swn.common.constants.ICommonConstants"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>商城后台</title>
    <jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
    <script type="text/javascript" src="editMenu.js"></script>
    <link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
	<!-- chosen插件js -->
    <script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
    <style type="text/css">
    	.chzn-container-multi .chzn-choices .search-field input{
    		height:auto !important;
    	}
    </style>
    <%  String user_id =  ((Map<String,Object>)session.getAttribute(ICommonConstants.LOGIN_USER)).get("id").toString();%>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">菜单编辑</span>
  	</div>
  	<div class="inner-page-main layui-clear">
	    <div class="inner-page-main-container" style="height:600px">
			<div style="padding-top: 20px;padding-right: 20px">
			    <input type="hidden" name="user_id" id="user_id" value="<%=user_id %>" />
				<input type="hidden" name="user_time" id="user_time" value="<%=DateUtil.getDateAndTime()%>"/>
				<form id="label_form" method="post">
				   <input type="hidden" name="menu_warrant" id="menu_warrant" />
				   <input type="hidden" name="id" id="id" />
				   <input type="hidden" name="menu_warrant_name" id="menu_warrant_name" />
				   <input type="hidden" name="img_url" id="img_url" />
				   <input type="hidden" name="parent_id" id="parent_id" />
				   <input type="hidden" name="create_user_id" id="create_user_id" />
				   <input type="hidden" name="create_time" id="create_time" />
				   <input type="hidden" name="update_user_id" id="update_user_id"  />
				   <input type="hidden" name="last_update_time" id="last_update_time" />
				   <div class="layui-form-item" id="node-none" style="display:none">
				    <label class="layui-form-label"  required  style="width: 100px">最终节点：</label>
				    <div class="layui-input-block" >
				      <input type="radio" name="final_node" value="1" title="最终节点" >最终节点
                      <input type="radio" name="final_node" value="0" title="非最终节点" checked="true">非最终节点
				    </div>
				  </div>
				  <div class="layui-form-item">
				    <label class="layui-form-label"  required  style="width: 100px"><font style="color:red">*</font>名称：</label>
				    <div class="layui-input-block">
				      <input type="text" id="name" name="name" required maxlength="15" placeholder="如果选择非最终节点，则只录入名称,排序即可" autocomplete="off" class="layui-input">
				    </div>
				  </div>
				  <div class="layui-form-item">
				    <label class="layui-form-label" style="width: 100px"><font style="color:red">*</font>排序：</label>
				    <div class="layui-input-block">
				      <input type="number" id="serial_num" name="serial_num" required   maxlength="3" placeholder="请输入排序，值越小越靠前" autocomplete="off" class="layui-input">
				    </div>
				  </div>
				  <div class="layui-form-item" id="menu-none" style="display:none">
				    <label class="layui-form-label" style="width: 100px"><font style="color:red">*</font>链接：</label>
				    <div class="layui-input-block">
				      <input type="text" id="menu_url" name="menu_url" required  maxlength="200" placeholder="请输入链接" autocomplete="off" class="layui-input">
				    </div>
				  </div>
				  <div class="layui-form-item" id="warrant-none" style="display:none">
				    <label class="layui-form-label" style="width: 100px">功能：</label>
				    <div class="layui-input-block">
				         <select name="warrant" id="warrant"  multiple="" style="width:500px"></select>
				    </div>
				  </div>
				  <div class="layui-form-item" id="imgc-none" style="display:none">
				    <label class="layui-form-label" style="width: 100px"><font style="color:red">*</font>图标：</label>
				    <div class="layui-input-block">
				      	<span ><img id="imgc" style="height:200px" src="${basePath}/commons/images/addpicture.jpg"></span>
				    </div>
				  </div>
				  <div class="layui-form-item">
				    <div class="layui-input-block" >
				     <!--  <input type="button" class="layui-btn" lay-submit lay-filter="formdm" id="commit" value="确定">
				      <button id="reset" type="reset" class="layui-btn layui-btn-primary">返回</button> -->
				       <button class="layui-btn" lay-submit lay-filter="formdm" id="commit">提交</button>
					   <a class="layui-btn" id="reset">返回</a>
				    </div>
				  </div>
				  
				</form>
				</div>
		 </div>
	</div>
</body>
</html>
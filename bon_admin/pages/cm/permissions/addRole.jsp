<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.swn.common.util.DateUtil,com.swn.common.constants.ICommonConstants"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="${basePath}/tools/ztree/css/demo.css" type="text/css">
<link rel="stylesheet" href="${basePath}/tools/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.core.js"></script>
<script type="text/javascript" src="${basePath}/tools/ztree/js/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="addRole.js"></script>
<div style="padding-top: 20px;padding-right: 30px">
<%  String user_id =  ((Map<String,Object>)session.getAttribute(ICommonConstants.LOGIN_USER)).get("id").toString();%>
  <input type="hidden" name="user_id" id="user_id" value="<%=user_id %>" />
 <input type="hidden" name="user_time" id="user_time" value="<%=DateUtil.getDateAndTime()%>"/>
<form class="layui-form" method="post" id="addOrUpdateForm">
     <input type="hidden" name="id" id="id" />
     <input type="hidden" name="create_user_id" id="create_user_id" />
     <input type="hidden" name="create_time" id="create_time" />
     <input type="hidden" name="update_user_id" id="update_user_id"  />
     <input type="hidden" name="last_update_time" id="last_update_time" />
     <input type="hidden" name="menu_ids" id="menu_ids" />
     <input type="hidden" name="menu_names" id="menu_names" />
  <div class="layui-form-item">
    <label class="layui-form-label"  required  style="width: 100px"><font style="color:red">*</font>名称</label>
    <div class="layui-input-block">
      <input type="text" id="name" name="name" required  lay-verify="name" placeholder="请输入角色名称" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px"><font style="color:red">*</font>说明</label>
    <div class="layui-input-block">
      <input type="text" id="remark" name="remark" required  lay-verify="remark" placeholder="请输入角色说明" autocomplete="off" class="layui-input">
    </div>
  </div>
   <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px"><font style="color:red">*</font>菜单</label>
    <div class="layui-input-block">
     <ul id="dataTree" class="ztree"></ul>
    </div>
  </div>
  <div class="layui-form-item">
    <div class="layui-input-block" >
        <input type="button" class="layui-btn" lay-submit lay-filter="formDemo" id="commit" value="确定">
		<button id="reset" type="reset" class="layui-btn layui-btn-primary">取消</button>
    </div>
  </div>
</form>
</div>





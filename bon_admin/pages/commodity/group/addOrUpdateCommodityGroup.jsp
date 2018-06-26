<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<style>
	.layui-form-item .layui-form-label{
		width:130px !important;
	}
	.layui-form-item .layui-input-block{
		margin-left:130px !important;
	}
</style>
<div style="padding-top: 50px;padding-right: 30px">
<form class="layui-form" method="post" id="editForm">
  <input type="hidden" name="id" />
  
  <div class="layui-form-item" style="width:100%">
    <label class="layui-form-label" style="width: 100px"><font color="red">*&nbsp;</font>分组名称:</label>
    <div class="layui-input-block">
      <input type="text" id="commodity_group_name" name="commodity_group_name"  lay-verify="commodity_group_name" placeholder="请输入" autocomplete="off" class="layui-input">
    </div>
  </div>
  <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px"><font color="red">*&nbsp;</font>关税百分比:</label>
    <div class="layui-input-block">
      <input type="text" id="tariff_rate" name="tariff_rate"  lay-verify="tariff_rate" placeholder="请输入0.0001~0.9999范围的数字" autocomplete="off" class="layui-input">
    </div>
  </div>
   <div class="layui-form-item">
    <label class="layui-form-label" style="width: 100px"><font color="red">*&nbsp;</font>关税启征金额:</label>
    <div class="layui-input-block">
      <input type="text" id="enlistment_amount" name="enlistment_amount"  lay-verify="enlistment_amount" placeholder="请输入启征金额" autocomplete="off" class="layui-input">
    </div>
  </div>  
  <c:if test="${param.type == null}">
  <div class="layui-form-item">
    <div class="layui-input-block" >
      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="save" id="save" style="margin-top: 50px;margin-left: 62px;">保存</button>
      <button id="cancel" class="layui-btn layui-btn-primary" style="margin-top: 50px;margin-left: 62px;">取消</button>
    </div>
  </div>
  </c:if>
  <c:if test="${param.type == 2}">
  <div class="layui-form-item">
    <div class="layui-input-block" >
      <button class="layui-btn layui-btn-normal" lay-submit lay-filter="save" id="save" style="margin-top: 50px;margin-left: 62px;">修改</button>
      <button id="cancel" class="layui-btn layui-btn-primary" style="margin-top: 50px;margin-left: 62px;">取消</button>
    </div>
  </div>
  </c:if>
</form>
<script type="text/javascript" src="${basePath}/pages/commodity/group/addOrUpdateCommodityGroup.js"></script>
</div>





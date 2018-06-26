<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>

<%
	String micro_url = request.getParameter("micro_url");
%>
<body style="overflow: hidden;">
<div>
  <div class="layui-form-item">
    <div class="layui-input-block" style="margin-left:5px;margin-top: 5px;">
      <input type="text" id="url"  style="width: 350px;float: left;"  readonly value="<%=micro_url %>" class="layui-input">
      <button onClick="copyUrl()" class="layui-btn layui-btn-primary" style="float: left">复制</button>
    </div>
  </div>
</div>
<script type="text/javascript">
 function copyUrl(){
	  var url = document.getElementById("url");
	  url.select(); // 选择对象
	  document.execCommand("Copy"); // 执行浏览器复制命令
	  //关闭复制弹窗
	  parent.layer.closeAll();
	  //显示复制成功
	  parent.layer.msg("复制成功", {
		  icon: 1,
		  time: 500 //（如果不配置，默认是3秒）
		});
 	 }
</script>

</body>


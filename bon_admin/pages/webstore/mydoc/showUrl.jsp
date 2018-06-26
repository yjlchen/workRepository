<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<div>
 <form class="layui-form" method="post" id="addForm">
		<input type="hidden" name="id" value="${map.id }" />
		<div class="layui-form-item">
			<div class="layui-input-block" style="margin-left: 0px;">
				<input type="text" id="url" name="file_url"
					style="width: 350px; float: left;" value="${map.file_url}" readonly
					class="layui-input">
				<button onClick="copyUrl()" class="layui-btn layui-btn-primary"
					style="float: left">复制</button>
			</div>
		</div>
	</form>
<script type="text/javascript" src="showUrl.js"></script>
</div>
 <script type="text/javascript">
 function copyUrl(){
	  var url = document.getElementById("url");
	  url.select(); // 选择对象
	  document.execCommand("Copy"); // 执行浏览器复制命令
	  parent.layer.closeAll(); //执行关闭
	  parent.layer.msg('已复制，可粘贴！',{icon: 6}); 
	 };
 </script>




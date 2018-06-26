<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<link rel="stylesheet" href="../../commodity/manage/c_files/chosen.css"  media="screen">
<!-- chosen插件js -->
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="addLabel.js"></script>
<div style="padding-top: 20px;padding-right: 30px">
	<div >
		<div class="layui-form-item">
			<label class="layui-form-label" style="width: 100px;">标签</label>
			<div class="layui-input-block">
				<select name="label_id" id="label_id" multiple=""
					style="width: 230px">
				</select>
			</div>
		</div>
		
		<div class="layui-input-inline layui-input-btn" style="margin-left: 122px;">
	        <button id="submitBtn" class="layui-btn layui-btn-normal">确定</button>
	        <button id="closeBtn" class="layui-btn layui-btn-primary">取消</button>
	     </div>
	</div>

</div>





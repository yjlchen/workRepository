<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>商品列表页面</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<%-- <link rel="stylesheet" href="${basePath}/pages/bon/experience/experienceTb.css"  media="screen"> --%>
<script type="text/javascript" src="${basePath}/pages/commodity/manage/batchManage.js"></script>
</head>
<body>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div  class="layui-row">
 				<div class="layui-col-xs11">
					<form id="queryform" method="post" class="layui-form" action="">
						<div class="layui-inline">
							<label class="layui-form-label">批次号</label>
							<div class="layui-input-inline">
								<input type="text" name="batch_num" id="batch_num" autocomplete="off" class="layui-input">
							</div>
						</div>
						<div class="layui-inline">
							 <div class="layui-input-inline layui-input-btn">
						        <a id="to_return" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">返回</a>
						     </div>
					 	 </div>
						<div class="layui-inline">
							 <div class="layui-input-inline layui-input-btn">
						        <a id="seach" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">筛选</a>
						     </div>
					 	 </div>
					 	 <div class="layui-inline">
						     <div class="layui-input-inline layui-input-btn">
						        <a id="to_create" class="layui-btn layui-btn-normal" style="height: 38px;margin-top: -5px;">添加</a>
						     </div>
					 	 </div>
					</form>
				</div>
			</div>
			<div class="tool_item clearfix">
				<table id="batch_list" class="layui-table layui-form" > 
					<thead id="batch_header">
						<tr>
                            <th style="text-align:center">批次号</th>
                            <th style="text-align:center">入库日期</th>
                            <th style="text-align:center">生产日期</th>
							<th style="text-align:center">过期日期</th>
							<th style="text-align:center">数量</th>
						</tr>
					</thead>
					<tbody id="batch_body">
					</tbody>
				</table>
				<div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
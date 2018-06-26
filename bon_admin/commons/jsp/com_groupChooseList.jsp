<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>选项卡下的商品分组列表  弹窗</title>
<%
	String num = request.getParameter("num");
	//接受leixing参数，微页面编辑的弹出微页面，区别于店铺导航
	String leixing = request.getParameter("leixing");
	String ind = request.getParameter("ind");
%>
<script type="text/javascript">
	var num = '<%=num%>';
	var leixing = '<%=leixing%>';
	var ind = '<%=ind%>';
</script>
<script type="text/javascript" src="com_goodsGroup.js"></script>
<style>
.tool_search_div {
	float: right;
	display: inline-block;
	width: 200px;
	height: 37px;
	border: 1px solid #ccc;
	border-radius: 2px;
}
.tool_search_div input {
	border: none;
	width: 150px;
	height: 35px;
	display: inline-block;
	vertical-align: middle;
	font-size: 13px;
	padding-left: 20px;
}

.inner-page-main {
	height: 350px;
}
</style>
</head>
<body>
	
<div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">
    	<div>
		<div style="float:right;">
			<form id="queryform" method="post" class="layui-form" action="">
				<div class="tool_search_div" >
					<input id="commodity_group_name" name="commodity_group_name" type="text"
						placeholder="搜索" /> <a href="javascript:;" onclick="searchPage()"
						class="tool_search_btn" style="margin-left: 0px;"> <i
						class="fa fa-search" aria-hidden="true"></i>
					</a>
				</div>
  			 </form>
   		</div>
   </div>
   
    <div class="tool_item clearfix">
        <table id="group_list" class="layui-table">
        	<colgroup>
		      <col width="350">
		      <col width="180">
		      <col>
  		  </colgroup>
			 <thead>
		     <tr>
		     	 <td>分组名称</td>
				 <td>创建时间</td>
				 <td>操作</td>
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
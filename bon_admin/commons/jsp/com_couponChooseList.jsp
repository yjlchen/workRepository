<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>  
<c:set
value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>只选择优惠券的弹窗列表</title>
<jsp:include page="common.jsp"></jsp:include>
<%
	String ind = request.getParameter("ind");
	String coupon_li_for_count = request.getParameter("coupon_li_for_count");
%>
<script type="text/javascript">
	var ind = '<%=ind%>';
	var coupon_li_for_count = '<%=coupon_li_for_count%>';
</script>
<script type="text/javascript" src="com_couponChooseList.js"></script>
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
	/* height: 350px; */
}

/* 重写datatable的样式 */
.dataTables_info {
    left: 0px;
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
					<input id="coupon_name" name="name" type="text" placeholder="搜索" /> 
						<a href="javascript:;" onclick="searchPage()"
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
        	  <col width="2%">
		      <col width="25%">
		      <col width="20%">
		      <col>
  		  </colgroup>
			 <thead>
		     <tr>
		     	<th> 
		     	<!-- 此处没有全选按钮 -->
                </th>
		     	 <th style="text-align:center;">名称</th>
				 <th style="text-align:center;">价值</th>
				 <th style="text-align:center;">使用条件</th>
			</tr>
			</thead>
		    <tbody>
			</tbody>
	   </table>
	   <div style="text-align:center;margin-top:25px;">
		   <a id="choose_coupons" style="cursor: pointer;width: 70px;background:#347AB7;color:#fff;border-color:transparent"
		    class="layui-btn layui-btn-primary" onclick="choose_coupons(this)">确定</a>
		</div>
    </div>
   </div>
</div>
</body>
</html>
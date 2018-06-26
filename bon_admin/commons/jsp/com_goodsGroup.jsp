<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<title>只选择商品分组的弹窗</title>
<jsp:include page="common.jsp"></jsp:include>

<%
	String leixing = request.getParameter("leixing");
	String ind = request.getParameter("ind");
	//接受size参数（表示大图，小图，一大两小）
	String size = request.getParameter("size");
	//接受显示个数参数（6,12,18）
	String goods_number_type = request.getParameter("goods_number_type");
%>
<script type="text/javascript">
	var leixing = '<%=leixing%>';
	var ind = '<%=ind%>';
	var size = '<%=size%>';
	var goods_number_type = '<%=goods_number_type%>';
</script>
<script type="text/javascript" src="com_goodsGroup.js"></script>

<style>
.tool_search_btn {
	display: inline-block;
	vertical-align: middle;
	margin-left: 24px;
	color: #009688;
	font-size: 26px;
}

.tool_add_btn {
	float:left;
	width: 194px;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 6px;
    color: #8ab616;
    vertical-align: middle;
    margin-left: 20px;
    margin-bottom: 20px;
    padding-left: 24px;
}
.tool_search_div {
		float: right;
		display: inline-block;
		width: 200px;
		height: 37px;
		border: 1px solid #ccc;
		border-radius: 2px;
		margin-bottom: 20px;
	}
.tool_shop_div {
		float: left;
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
</style>
    <div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">
		<form id="queryform" method="post">
			<div class="tool_search_div" >
				<input id="commodity_group_name" name="commodity_group_name" type="text"
					placeholder="搜索" /> 
					<a href="javascript:;" onclick="searchPage()"
					class="tool_search_btn" style="margin-left: 0px;"> 
					<i
					class="fa fa-search" aria-hidden="true"></i>
				</a>
				<br>
			</div>
   		</form>
	    <div class="tool_item clearfix">
	        <table id="group_list" class="layui-table">
				<thead>
			     <tr>
			     	 <td>标题</td>
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
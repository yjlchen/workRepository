<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath}/pages/commodity/group/commodityGroupList.js"></script>

<style>
	.tool_search_btn {
		display: inline-block;
		vertical-align: middle;
		margin-left: 24px;
		color: #1E9FFF;
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
	/* dataTables表头居中 */
	#interfacejslist>thead:first-child>tr:first-child>td{
		text-align:center;
	}
	thead td{
		style="text-align: center;"
	}
</style>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">商品分组管理</span>
  	</div>
    <div class="inner-page-main layui-clear">
    <div class="inner-page-main-container">
	    <div class="tool_shop_div" >
			<button class="layui-btn layui-btn-normal" id="addCommodityGroup">新建商品分组</button>
		</div>
		<form id="queryform" method="post">
			<div class="tool_search_div" >
				<input id="commodity_group_name" name="commodity_group_name" type="text"
					placeholder="搜索" /> <a href="javascript:;" onclick="searchPage()"
					class="tool_search_btn" style="margin-left: 0px;"> <i
					class="fa fa-search" aria-hidden="true"></i>
				</a><br>
			</div>
   		</form>
	    <div class="tool_item clearfix">
	        <table id="group_list" class="layui-table">
        		<colgroup>
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
					<col width="10%">
				</colgroup>
				<thead id="group_header">
			     <tr>
			     	 <th style="text-align: center;">分组名称</th>
					 <th style="text-align: center;">商品数</th>
					 <th style="text-align: center;">关税百分比</th>
					 <th style="text-align: center;">关税启征金额</th>
					 <th style="text-align: center;">创建时间</th>
					 <th style="text-align: center;">创建人</th>
					 <th style="text-align: center;">最后修改时间</th>
					 <th style="text-align: center;">最后修改人</th>
					 <th style="text-align: center;">操作</th>
				</tr>
				</thead>
			   <tbody>
				</tbody>
		  </table>
	    </div>
    </div>
</div>
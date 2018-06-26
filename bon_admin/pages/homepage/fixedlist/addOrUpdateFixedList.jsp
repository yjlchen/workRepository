<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>固定商品模块编辑</title>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="addOrUpdateFixedList.js"></script>
<style type="text/css">
.shanpin {
	height: 50px;
	padding: 10px 10px 10px 34px;
}
.shanpin.layui-form {
    min-width: 800px;
}
.shanpin div.layui-unselect {
	display: initial;
}

#goods_list tbody tr td .shanpin div.layui-unselect i {
	margin-bottom: 27px;
}

#goods_list2 tbody tr td .shanpin div.layui-unselect i {
	margin-bottom: 27px;
	margin-left: -7px;
}

#goods_list2 tfoot tr td .shanpin div.layui-unselect i{
	margin-bottom: 4px;
	margin-left: -121px;
}

#goods_list tfoot tr td .shanpin div.layui-unselect i{
	margin-bottom: 4px;
	margin-left: -121px;
}

.shanpin input {
	display: inline-block;
	margin-right: 10px;
}

.shanpin img {
	margin: -30px 10px 0;
	width: 50px;
	height: 34px;
}

.shanpin div {
	/**width: 75%;**/
	height: 50px;
	display: inline-block;
}

.sorting_disabled div.layui-unselect i {
	margin: 0 10px 0 27px;
}

.dataTables_length div.layui-unselect {
	display: none;
}

#joinDiv div.layui-form-radio i{
   	margin-top: -2px;
}
span.tips{
	color:red;
	display:none;
}
.control-group>.reward-table-wrap {
    padding-left: 50px;
}
table.reward-table{
	width:100%;
}
table.reward-table tr{
	border:1px solid #ddd;
}
.page-reward .reward-table tr .pl100 {
    padding-left: 100px;
    text-align: left;
}
.reward-table tr th {
    line-height: 36px;
    background: #f2f2f2;
    text-align:center;
}
.reward-table tr td .first-reward {
    margin-top: 5px;
}
p.help-block.error-message{
	display:none;
	color:red;
}
label.checkbox.inline.reward-label {
    margin-left: 18px;
}
span.origin-status.show {
    float: right;
}
</style>

</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">固定商品模块编辑</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="label_form" method="post" class="layui-form">
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 128px">模块类型：</label>
						<div class="layui-input-block">
							<input type="radio" id="g" name="module" lay-filter="module" value="g" title="固定商品模块" checked=""/>
							<input type="radio" id="y" name="module" lay-filter="module" value="y" title="营养保健" />
							<input type="radio" id="j" name="module" lay-filter="module" value="j" title="积分商城"/>
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label" required style="width: 128px">固定模块名称：</label>
						<div class="layui-input-block">
							<input type="text" id="name" name="name" required maxlength="20" style="width:98%"
								placeholder="必填：请输入固定模块名称" autocomplete="off" class="layui-input">
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 128px">模块图片：</label>
						<div class="layui-input-block" style="position: relative;">
							<div>
								<img id="imgc" style="width: 200px" src="${basePath}/commons/images/addpicture.jpg">
							</div>
							<a href="javascipt:;" style="display: none" id="pic"> 
								<span style="position: absolute; border: 1px solid #ddd; left: 205px; top: -9px;
								 border-radius: 50%; padding: 2px 7px; background: #aaa; color: #fff;">X</span>
							</a>
						</div>
					</div>

                    <div id="isShow" style="display:''">
					<h5 class="reward-sub-title" style="margin-left: 20px;">选择活动商品：</h5>
					
					<!-- 下面为商品列表 -->
					<div class="layui-tab layui-tab-card" id="goodsListDiv" style="width: 99%;margin-left: 20px;">
						<ul class="layui-tab-title">
							<li class="layui-this">选择商品</li>
							<li>已选商品</li>
						</ul>
						<div class="layui-tab-content">
							<div class="layui-tab-item layui-show">
								<div id="goodsForm" class="layui-form" action="">
									<div class="layui-form-item">
										<div class="layui-inline">
											 <div class="layui-input-inline" style="width: 150px;">
												<select id="goodsSelect" name="goodsGroup"
													lay-filter="getGroupList">
													<option value="">请选择分组</option>
												</select>
											</div>
										<!--	<div class="layui-input-inline" style="width: 150px;">
												<select id="goodsType" name="goodsType"
													lay-filter="getGroupList2">
													<option value="">请选择类别</option>
													<option value="1">商品标题</option>
													<option value="2">商品编码</option>
												</select>
											</div> -->
											<div class="layui-input-inline" style="width: 150px;">
												<input id="commodity_name" name="commodity_name"
													type="text" lay-verify="" placeholder="" autocomplete="off"
													class="layui-input">
											</div>
										</div>
										<div class="layui-inline" style="left: -10px;">
											<div class="layui-input-inline">
												<a id="queryIntegralList" class="layui-btn layui-btn-normal"
													style="height: 35px; margin-top: -2px;">搜索</a>
											</div>
										</div>
									</div>
								</div>
								<div class="tool_item clearfix layui-form">
									<table id="goods_list" class="layui-table layui-form"
										onclick="changeGoodsAmount();">
										<colgroup>
											<col width="60%">
											<col width="18%">
										</colgroup>
										<thead>
											<tr>
												<th style="padding-left: 40px">
													<!-- <input id="checkall" type="checkbox" lay-skin="primary" lay-filter="allChoose"> -->
													商品信息
												</th>
												<th style="text-align: center;">操作</th>
											</tr>
										</thead>
										<tbody>

										</tbody>
										<tfoot>
											<tr>
												<td colspan="2">
													<div class="shanpin layui-form">
														<input type="checkbox" name="batchJoinCheckbox"
															lay-skin="primary" lay-filter="batchChoose"
															style="margin-left: -23px;" id="batchJoinCheckbox">
														<span class="aa">全选</span> <a
															style="margin-top: -2px; height: 25px; margin-left: 53px; cursor: pointer; float: left"
															class="layui-btn layui-btn-primary layui-btn-mini"
															id="batchJoin">批量参加</a>
														<%-- 
													<a style="margin-top:-23px;height:25px;margin-left:10px;cursor: pointer;" 
														class="layui-btn layui-btn-normal layui-btn-mini" id="currPageJoin">
														第<span id="currPage"></span>页全部参加</a> --%>
													</div>
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
							<!-- 记录已选商品 -->
							<div class="layui-tab-item">
								<div class="tool_item clearfix layui-form">
									<table id="goods_list2" class="layui-table"
										onclick="changeGoodsAmount();">
										<colgroup>
											<col width="15%">
											<col width=10%>
										</colgroup>
										<thead>
											<tr>
												<th class="sorting_disabled" style="padding-left: 40px">
													<!-- <input id="checkall2" type="checkbox" lay-skin="primary" lay-filter="allChoose"> -->
													商品信息
												</th>
												<th style="text-align: center;">操作</th>
											</tr>
										</thead>
										<tbody>
										</tbody>
										<tfoot>
											<tr>
												<td colspan="3">
													<div class="shanpin layui-form">
														<input type="checkbox" name="batchCancelCheckbox"
															lay-skin="primary" lay-filter="batchChoose"
															style="margin-left: -23px;" id="batchCancelCheckbox">
														<span class="aa">全选</span> <a
															style="margin-top: -2px; height: 25px; margin-left: 53px; cursor: pointer; float: left"
															class="layui-btn layui-btn-primary layui-btn-mini"
															onclick="batchCancel();">批量取消</a>
													</div>
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
					</div>
				
				</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<!-- <input type="button" class="layui-btn" lay-submit
								lay-filter="formdm" id="commit" value="确定">
							<button id="reset" type="reset"
								class="layui-btn layui-btn-primary">重置</button> -->
							<button class="layui-btn" lay-submit lay-filter="formdm" id="commit">提交</button>
						 	<a class="layui-btn" id="back">返回</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/cm/virtualevaluate/virtualCommodityEvaluate.js"></script>
<title></title>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;">虚拟评论</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container" style="height:700px">
			<div style="padding-top: 20px; padding-right: 30px">
				<form class="layui-form" method="post" id="addOrUpdateForm">
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 100px">选择商品：</label>
						<div class="layui-input-block" style="position: relative;">
							<div>
								<img id="commodity" style="width: 80px"
									src="${basePath}/commons/images/addpicture.jpg">
							</div>
							<a href="javascipt:;" style="display: none" id="pic"> <span
								style="position: absolute; border: 1px solid #ddd; left: 70px; top: -9px; border-radius: 50%; padding: 0px 7px; background: #aaa; color: #fff;">x</span>
							</a>
						</div>
					</div>
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label" style="width: 100px">评价内容：</label>
						<div class="layui-input-block">
							<textarea placeholder="请输入内容" class="layui-textarea" name="evaluate_content"></textarea>
						</div>
					</div>
					<div class="layui-inline">
				    	<label class="layui-form-label" style="width: 100px">评价日期：</label>
				    	<div class="layui-input-inline">
				    		<input type="text" name="evaluate_time" id="evaluate_time" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off"
				    		 class="layui-input" style="margin-left: 10px;" onclick="layui.laydate({elem: this})">
				    	</div>
				    </div>
				    <div class="layui-form-item">
						<label class="layui-form-label" style="width: 100px">时分秒：</label>
						<div class="layui-input-block">
							<input type="text" id="timesfm" name="timesfm" 
								lay-verify="timesfm" placeholder="请输入hh:mm:ss格式的时间  注：中间不能多空格" autocomplete="off"
								class="layui-input" >
						</div>
					</div>
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 100px">新增用户：</label>
						<div class="layui-input-block">
							<input type="radio" name="addOrNot" lay-filter="addOrNot" value="y" title="是" checked="">
							<input type="radio" name="addOrNot" lay-filter="addOrNot" value="n" title="否">
						</div>
					</div>
					<div class="layui-form-item" id="ndiv" style="display: none;">
						<label class="layui-form-label" style="width: 100px">虚拟用户：</label>
						<div class="layui-input-block">
							<select name="user_id" id="user_id" lay-search >
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div id="ydiv">
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 100px">选择头像：</label>
							<div class="layui-input-block" style="position: relative;">
								<div>
									<img id="head-img" style="width: 80px"
										src="${basePath}/commons/images/addpicture.jpg">
								</div>
								<a href="javascipt:;" style="display: none" id="pic2"> <span
									style="position: absolute; border: 1px solid #ddd; left: 70px; top: -9px; border-radius: 50%; padding: 0px 7px; background: #aaa; color: #fff;">x</span>
								</a>
							</div>
						</div>
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 114px">虚拟用户名：</label>
							<div class="layui-input-block">
								<input type="text" id="wx_name" name="wx_name" 
									lay-verify="vEname" placeholder="请输入登陆账户" autocomplete="off"
									class="layui-input" style="width: 99%">
							</div>
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<button class="layui-btn" lay-submit lay-filter="fsbm"
								id="commit">立即提交</button>
							<button type="reset" id="reset" class="layui-btn layui-btn-primary">重置</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

</body>
</html>
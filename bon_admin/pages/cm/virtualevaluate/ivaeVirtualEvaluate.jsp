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
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript">
<%String title=new String(request.getParameter("title").getBytes("UTF-8"),"UTF-8");%>
var title='<%=title%>';
</script>
<script type="text/javascript" src="${basePath}/pages/cm/virtualevaluate/ivaeVirtualEvaluate.js"></script>
<title></title>
</head>
<body>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
	   <span style="font-size: 18px;font-weight:bold;">虚拟评论</span>
  	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container" style="height:700px">
			<div style="padding-top: 20px; padding-right: 30px">
				<form class="layui-form" method="post" id="addOrUpdateForm">
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 100px">标题：</label>
						<div style="float: left; margin-top: 8px;margin-left: 10px;font-size: 15px;" id="title"></div>
					</div>
					<div class="layui-form-item layui-form-text">
						<label class="layui-form-label" style="width: 100px">评价内容：</label>
						<div class="layui-input-block">
							<textarea placeholder="请输入内容" class="layui-textarea" name="evaluate_content"></textarea>
						</div>
					</div>
					<div class="layui-form-item" id="time">
						<div class="layui-inline">
					    	<label class="layui-form-label" style="width: 100px">评价日期：</label>
					    	<div class="layui-input-inline">
					    		<input type="text" name="evaluate_time" id="evaluate_time"  placeholder="yyyy-MM-dd" autocomplete="off"
					    		 class="layui-input" style="margin-left: 10px;">
					    	</div>
					    </div>
						<div class="layui-inline">
					    	<label class="layui-form-label" style="width: 150px">时间：</label>
					    	<div class="layui-input-inline">
					    		<input type="text" class="layui-input" name="timesfm" id="timesfm" placeholder="HH:mm:ss">
					    	</div>
					    </div>
					</div>
					<div class="layui-inline">
				    	<label class="layui-form-label" style="width: 100px">点赞数：</label>
				    	<div class="layui-input-inline">
				    		<input type="text" name="point_count" id="point_count" autocomplete="off"
				    		 class="layui-input" style="margin-left: 10px;" value="0">
				    	</div>
				    </div>
					<%-- 
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 100px">是否提醒：</label>
						<div class="layui-input-block">
							<input type="radio" name="is_read" lay-filter="is_read" value="0"
								title="是"> <input type="radio" name="is_read"
								lay-filter="is_read" value="1" title="否" checked="">
						</div>
					</div>--%>
					<div class="layui-form-item">
						<label class="layui-form-label" style="width: 100px">新增用户：</label>
						<div class="layui-input-block">
							<input type="radio" name="addOrNot" lay-filter="addOrNot" value="y" title="是">
							<input type="radio" name="addOrNot" lay-filter="addOrNot" value="n" title="否"  checked="">
						</div>
					</div>
					<div class="layui-form-item" id="ndiv">
						<label class="layui-form-label" style="width: 100px">虚拟用户：</label>
						<div class="layui-input-block">
							<select name="evaluate_member_id" id="evaluate_member_id" lay-search >
								<option value="">--请选择--</option>
							</select>
						</div>
					</div>
					<div id="ydiv"  style="display: none;">
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 100px">选择头像：</label>
							<div class="layui-input-block" style="position: relative;">
								<div>
									<img id="head-img" style="width: 80px"
										src="${basePath}/commons/images/addpicture.jpg">
								</div>
								<a href="javascipt:;" style="display: none" id="pic"> <span
									style="position: absolute; border: 1px solid #ddd; left: 70px; top: -9px; border-radius: 50%; padding: 0px 7px; background: #aaa; color: #fff;">x</span>
								</a>
							</div>
						</div>
						<div class="layui-form-item">
							<label class="layui-form-label" style="width: 114px">虚拟用户名：</label>
							<div class="layui-input-block">
								<input type="text" id="wx_name" name="wx_name" 
									 placeholder="请输入登陆账户" autocomplete="off"
									class="layui-input" style="width: 99%">
							</div>
						</div>
					</div>
					<div class="layui-form-item">
						<div class="layui-input-block">
							<button class="layui-btn" lay-submit lay-filter="fsbm" id="commit">立即提交</button>
							<!-- <button type="reset" id="reset" class="layui-btn layui-btn-primary">重置</button> -->
							<a id="returnTo" class="layui-btn layui-btn-primary">返回</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

</body>
</html>
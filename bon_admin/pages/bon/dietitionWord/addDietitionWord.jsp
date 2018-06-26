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
<title>编辑营养师说说</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript" src="addDietitionWord.js"></script>

</head>
<body>
<script type="text/javascript">
	var flag = getUrlParam("flag");
	$(function(){
		var index = parseInt(flag);//从哪个tab页点的编辑
		//点击返回按钮跳转		
		$("#addBack").click(function(){
			//新增页面直接返回草稿列表查询
			location.href = "dietitionWordList.jsp?status_flag="+index;
		});
	})
	
</script>

	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">营养师说说编辑</span>
	</div>
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="addForm" class="layui-form" action="">
				 <input type="hidden" name="status" value="0" id="status"/>
			    	<div id="addBannerContent">
						 
						 <div class="layui-form-item" style="margin-top: 10px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;"><span style="color:red;">*</span>音频：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                    <button type="button" class="layui-btn" id="uploadAudioUrl">
									  <i class="layui-icon">&#xe67c;</i>上传音频
									</button>
			                        <div id="audioUrl" style="outline:none;">
                					</div>
                					<input type="hidden" id="audio_url" name="audio_url"/>
			                    </div>
						    </div>
						 </div>
						 
					 	 <div class="layui-form-item" style="margin-top: 10px;">
				    		<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><span style="color:red;">*</span>内容：</label>
							    <div class="layui-input-inline" > 
							       <textarea id="content"  style="width: 300px;height:120px" name="content"  placeholder="营养师说"  
							       maxlength="64"  lay-verify="required" autocomplete="off" class="layui-input" ></textarea>
							    </div>
						    </div>
						 </div>
					 	 
					 	 
					 	 <div class="layui-inline" style="margin-left: 100px;">
						    <div class="layui-input-inline layui-input-btn">
   						    <button  class="layui-btn" lay-submit lay-filter="formDemo" id="commit" >保存</button>
   							<button type="button" class=" layui-btn " id="putWord" >提交审核</button> 
     						<button type="button" class="layui-btn" id="addBack">返回</button> 
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
<!-- 
 <div id="loading" style="display:none;padding-top: 20px;padding-right: 30px;position:fixed;top:50%;left:50%;width:100%;">
 <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 80px; color: #1E9FFF;position:relative;">&#xe63d;</i> 
 </div> -->

</body>
</html>
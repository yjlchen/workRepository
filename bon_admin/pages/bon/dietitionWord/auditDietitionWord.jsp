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
<title>审核营养师说说</title>
<jsp:include page="../../../commons/jsp/common2.0.jsp"></jsp:include>
<script type="text/javascript" src="${basePath}/pages/commodity/manage/c_files/chosen.jquery.min.js"></script>
<script type="text/javascript" src="auditDietitionWord.js"></script>
<style type="text/css">
/* 必选项 样式 */
em.required {
	    font-size: 16px;
	    color: #f00;
	    vertical-align: middle;
}
</style>
</head>
<body>
<script type="text/javascript">
	var id = getUrlParam("id");
	var flag = getUrlParam("flag");
	$(function(){
		//活动id隐藏域赋值
		$("input[name='id']").val(id);
		//点击选项卡跳转		
		$("#editBack").click(function(){
			var index = parseInt(flag);//从哪个tab页点的编辑
			location.href = "auditDietitionWordList.jsp?status_flag="+index;
		});
	})
</script>
	<div class="inner-page-top layui-clear" style="padding: 14px 21px 14px;">
		<span style="font-size: 18px;">营养师说说查看</span>
	</div>
	<div class="inner-page-main layui-clear">
		<div class="inner-page-main-container">
			<div style="padding-top: 20px; padding-right: 20px">
				<form id="updateForm" class="layui-form" action="">
				 <input type="hidden" name="audit_status" value="2" id="audit_status"/>
				 <input type="hidden" name="emp_id" id="emp_id"/>
				 <input type="hidden" name="add_time" id="add_time"/>
				 <input id='time_length' name='time_length' type='hidden'  >
				 <input type="hidden" name="id"  />
						 <div class="layui-form-item" style="margin-top: 10px;"> 
				    		<div class="layui-inline">
				    			<label class="layui-form-label" style="width: 165px;">音频：</label>
			                    <div class="controls" style="width: 100%;height: 50px;margin-left: 165px;margin-top: -4px;">
				                   
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
   								<textarea id="content"  style="width: 300px;height:120px" name="content"  placeholder="营养师说"   readonly="readonly"
   									maxlength="64"  required   autocomplete="off" class="layui-input" style="width: 300px;" >
							    </textarea>							    
							    </div>
						    </div>
						 </div>
					 	 
					 	  <div class="layui-form-item" style="margin-top: 10px;" >
					 	  	<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;">审核结果</label>
							    <div class="layui-input-inline" id="isPass">
							      <input type="radio" name="checkstatus" value="2"  title="通过" checked>
							      <input type="radio" name="checkstatus" value="3"  title="驳回" >
							    </div>
						 	</div>
						  </div>
					 	  <div class="layui-form-item " id="reason" style="display:none;" >
					 	  	<div class="layui-inline">
							    <label class="layui-form-label" style="width: 165px;"><em class="required">*</em>驳回原因</label>
							    <div class="layui-input-inline" >
							    <textarea id="reject_reason"  style="width: 300px;height:120px" name="reject_reason"  
							      placeholder="驳回原因"  maxlength="249"     autocomplete="off" class="layui-input" style="width: 300px;" >
							    </textarea>
							    </div>
						 	</div>
						  </div>
					 	  <div class="layui-form-item" style="margin-top: 10px;">
					 	 <div class="layui-inline" style="margin-left: 80px;">
						    <div class="layui-input-inline layui-input-btn">
						    	
    						    <button  class="layui-btn " lay-submit lay-filter="formDemo" id="commit" >确定</button>
   								<button type="button" class="layui-btn" id="editBack">返回</button> 
						    </div>
					 	 </div>
					</div>
				</form>
			</div>
		</div>
	</div>


 <div id="loading" style="display:none;padding-top: 20px;padding-right: 30px;position:fixed;top:50%;left:50%;width:100%;">
 <i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 80px; color: #1E9FFF;position:relative;">&#xe63d;</i> 
 	
 </div>

</body>
</html>
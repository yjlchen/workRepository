<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="../../../commons/jsp/common.jsp"></jsp:include>
<script type="text/javascript"
	src="${basePath}/pages/commodity/manage/promotion.js"></script>
	<style type="text/css">
	table.gridtable {
		font-family: verdana,arial,sans-serif;
		font-size:12px;
		color:#333333;
		border-width: 0px;
		border-color: #666666;
		border-collapse: collapse;
		margin-left:30px;
	}
	table.gridtable th {
		border-width: 0px;
		padding: 8px;
		border-style: solid;
		border-color: #666666;
		background-color: #ffffff;
	}
	table.gridtable td {
		border-width: 1px;
		padding: 8px;
		border-style: solid;
		border-color: #666666;
		background-color: #ffffff;
	}
	</style>
</head>
<body>
  <div>
     <div class="layui-tab">
	  <ul class="layui-tab-title">
	    <li class="layui-this" style="width:50%"><b>商品二维码</b></li>
	    <li style="width:50%"><b>商品链接</b></li>
	  </ul>
	  <div class="layui-tab-content">
		    <div class="layui-tab-item layui-show">
		       <div>
		                          扫一扫，在手机上查看并分享
		       </div>
		       <div id="qrcode">
		         <img src="" height="130px" width="200px" id="qrcodeImg" />
		       </div>
		    </div>
		    <div class="layui-tab-item">
		            <div>
		                          分享才有更多人看到哦
		            </div>
		            <div>
		                     </br>商品页链接</br>
		                    <input id="sp_url"  style="width:260px;" readonly="readonly"/>
		                    <button class="layui-btn layui-btn-small " id="sp_url" onclick="toUrl('sp_url')" >复制</button>
		                      </br></br>直接弹出购买界面的链接</br>
		                     <input id="sp_url"  style="width:260px;" readonly="readonly"/>
		                    <button class="layui-btn layui-btn-small " id="buy_url" onclick="toUrl('buy_url')">复制</button>
		                    
		            </div>
		    </div>
	  </div>
	</div>
  </div>
</body>
</html>
/**
 * 商品推广
 */
var id="";            //商品id
var commodity_url=""; //商品的详情页链接
$(function(){  
	intiData();
	initEvent();
});

layui.use(['element','layer'], function(){ 
	  element = layui.element()
	  ,layer = layui.layer;
	  
	  initEvent();
	
})
/**
 * 初始化事件
 */
function initEvent(form){
	$('#qrcodeImg').attr('src', getRootPath()+"/commodity/encoderQRCode.action?url="+commodity_url);
}
/**
 * 数据初始化
 */
function intiData(){
	id=getUrlParam("id");
	commodity_url=getUrlParam("commodity_url");
	$("#sp_url").val(commodity_url);
}
/**
 * 复制商品俩家
 */
function toUrl(id){
	var url = document.getElementById(id);
	url.select();
	var result = document.execCommand("Copy");
	if(result==true){
		layer.msg('复制成功', {
		   icon: 1,
		   time: 500 //2秒关闭（如果不配置，默认是3秒）
		}, function(){
		});
	}
}
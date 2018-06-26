var id=getUrlParam("id");
var pId=getUrlParam("pId");//父id有值说明是添加方法
var rank=getUrlParam("rank");
$(function(){
	if(!isNotEmpty(pId)){
		initData();
	}
	initEvent();
})
var layer;
var form;
layui.use(['form','element','layer','laydate'], function(){
	layer = layui.layer;
	form=layui.form();
})

function initEvent(){
	$("#commit").click(function(){
		subForm();
	});
	$("#imgc").click(function(){
		addpho("setImgUrl",1);
	});
//	$("#reset").click(function(){
//		$("#imgc").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
//		$("#pic").hide();
//	})
	$("#back").click(function(){
		window.location.href=getRootPath()+'/pages/customer/functionlabel/functionLabel.jsp';
	});
	$("#pic").click(function(){
		$("#imgc").attr("src",getRootPath()+"/commons/images/addpicture.jpg");
		$("#pic").hide();
	});
}

function initData(){ 
	//初始化下拉标签
	$.ajax({
		url : getRootPath()+ '/functionLabel/functionLabelById.action?id='+id,
		type : 'POST',
		async: false,
		dataType : 'json',
		success : function(data){
			$("#label_form").setForm(data);
			if(isNotEmpty(data.img_url)){
				$("#imgc").attr("src",data.img_url);
				$("#pic").show();
			}
		}
	});
}



function subForm(){
	disable_submit(true,'commit');
	var name = $("#name").val();
	if(!isNotEmpty(name)){
		parent.layer.msg('请填写标签名', {icon: 2,time: 2000});
		disable_submit(false,'commit');
		return false;
	}
	var sort = $("#sort").val();
	if(!isNotEmpty(sort)){
		parent.layer.msg('请填写排序', {icon: 2,time: 2000});
		disable_submit(false,'commit');
		return false;
	}
	
	if(!(sort%1 === 0)||sort<1||sort>10000){
		parent.layer.msg('请输入1-10000之间的整数', {icon: 2,time: 2000});
		disable_submit(false,'commit');
		return false;
	}
	var info = $('#label_form').serializeObject();
	var imgurl=$("#imgc").attr("src");
	if(imgurl.indexOf("/commons/images/addpicture.jpg") >= 0){
		info["img_url"]="";
	}else{
		info["img_url"]=imgurl;
	}
	var repeat=false;
	//pId没有说明是修改
	if(!isNotEmpty(pId)){
		info["id"]=id;
	}else{//插入方法
		info["direct_superior_id"]=id
		info["indirect_superior_id"]=pId
		info["rank"]=parseInt(rank)+1
		info["is_used"]=1;
		$.ajax({
			url : getRootPath()+ '/functionLabel/queryFunctionLabelByName.action',
			type : 'POST',
			dataType : 'TEXT',
			data : {name:name},
			async:false,
			success : function(result){
				if("exist"==result){
					parent.layer.msg('标签名已存在', {
						icon: 2,
						time: 1000 //（如果不配置，默认是3秒）
					});
					disable_submit(false,'commit');
					repeat=true;
				}
			},
			error:function(){
				parent.layer.msg('操作失败，请重试', {
					icon: 2,
					time: 1000 //（如果不配置，默认是3秒）
				});
				disable_submit(false,'commit');
			}
		});
	}
	if(repeat){
		return false;
	}
	var jsonStr=JSON.stringify(info);//将表单中的数据转成json
	$.ajax({
		url : getRootPath()+ '/functionLabel/saveOrUpdateFunctionLabel.action',
		type : 'POST',
		dataType : 'TEXT',
		data : {jsonInfo:jsonStr},
		async:false,
		success : function(result){
			if("success"==result){
				parent.layer.msg('操作成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						window.location.href=getRootPath()+"/pages/customer/functionlabel/functionLabel.jsp";
					});
			}
			else{
				parent.layer.msg('操作失败，请重试', {
					  icon: 2,
					  time: 1000 //（如果不配置，默认是3秒）
					});
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.msg('操作失败，请重试', {
				  icon: 2,
				  time: 1000 //（如果不配置，默认是3秒）
				});
			disable_submit(false,'commit');
		}
	});
}



function addpho(b_fun,mutl_type){
	parent.layer.open({
		  title: ''
		  ,type:2
		  ,closeBtn: 1
		  ,resize:false
		  ,area:["860px","530px"]
		  ,content:getRootPath()+'/commons/jsp/com_pho.jsp?b_fun='+b_fun+'&mutl_type='+mutl_type   //type=1 单选; 2多选
		});
}

function setImgUrl(imgUrl){
	if( imgUrl.length>0){
		var url=imgUrl[0];
		$("#imgc").attr("src",url);
		$("#pic").show();
	}
}

/**
 * 检查form表单填写是否错误
 */
function check(){
	var name = $("#name").val();
	if(!isNotEmpty(name)){
		parent.layer.msg('请填写标签名', {icon: 2,time: 2000});
		return false;
	}
	var title = $("#title").val();
	if(!isNotEmpty(title)){
		parent.layer.msg('请填写标题', {icon: 2,time: 2000});
		return false;
	}
	var keywords = $("#keywords").val();
	if(!isNotEmpty(keywords)){
		parent.layer.msg('请填写关键词', {icon: 2,time: 2000});
		return false;
	}
	var description = $("#description").val();
	if(!isNotEmpty(description)){
		parent.layer.msg('请填写描述', {icon: 2,time: 2000});
		return false;
	}
	var sort = $("#sort").val();
	if(!isNotEmpty(sort)){
		parent.layer.msg('请填写排序', {icon: 2,time: 2000});
		return false;
	}
	if(!(sort%1 === 0)||sort<1||sort>10000){
		parent.layer.msg('请输入1-10000之间的整数', {icon: 2,time: 2000});
		return false;
	}
	return true;
}
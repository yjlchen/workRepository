var id=getUrlParam("id");
var flag = getUrlParam("flag");
var labels = [];  // 标签列表

$(function(){
	initData();
	//是否收费点击切换
	$("#is_pay").click(function(){		
		if($(this).children('input').eq(1).is(":checked")){//点击否			
			$("#original_bon_point").hide();
			 $("#now_bon_point").hide();
			 $("input[name='now_bon_point']").removeAttr("lay-verify");//去掉现在棒点的验证
			 $("input[name='original_bon_point']").removeAttr("lay-verify");//去掉原始棒点的验证
			 $("input[name='now_bon_point']").val("");
			 $("input[name='original_bon_point']").val("");
		}else{
			 $("#original_bon_point").show();
			 $("#now_bon_point").show();
			 //验证现在棒点
			 $("input[name='now_bon_point']").attr("lay-verify","checkNow");
			 //验证原始棒点
			 $("input[name='original_bon_point']").attr("lay-verify","checkOriginal");
		}		
    });
	
	//点击返回
	$("#goBack").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp?flag="+flag;
	})
	
	if(flag != 0){
		$("#save").hide();//隐藏存草稿
	}
})

layui.use(['form','element','layer','laydate', 'upload', 'table'], function(){
	var layer = layui.layer;
	var form=layui.form;
	// 执行图片
	layui.upload.render({
		elem : '#uploadImgUrl',
		url : getRootPath() + '/uploadCommon/uploadInfo.action?group_ids='+""+'&type=pic',
		ext: 'jpg|png|gif',
		multiple: true,
		acceptMime: 'image/*',
		before: function() {
			console.log("before");
			disable_submit(true,'commit');
			disable_submit(true,'save');
			$("#loading").show();
		},
		done: function(res) {
			showImage(res);
			$("#loading").hide();
			disable_submit(false,'commit');
			disable_submit(false,'save');
			//上传按钮隐藏
			$("#uploadImgUrl").hide();
		},
		error: function() {
			console.log("error");
			$("#loading").hide();
			disable_submit(false,'commit');
			disable_submit(false,'save');
		}
	});
	
	layui.table.render({
	    elem: '#comms_table'
	    , id:'commsReload'
	    ,cols: [[
              {field: 'comm', title: '商品', width: 80}
              ,{field: 'spes', title: '规格', width: 200}
              ,{title:'操作',width: 150,align:'center', toolbar: '#barDemo'}
	    ]]
	    ,data: []
	    ,even: true
	 });
	
	form.verify({  
		checkNumber: function(value){  
			value=toTrim(value);
			var p = /^([1-9]\d*|[0]{1,1})$/;
			if(!p.test(value)){
				return '请输入0或正整数';
			} 
	    },
	    checkOriginal: function(value){  
			value=toTrim(value);
			var p = /^[1-9]+\d*$/;
			if(value!=0 && !p.test(value)){
				return '请输入正整数';
			} 
	    },
	    checkNow: function(value){  
			value=toTrim(value);
			var p = /^[1-9]+\d*$/;
			if(!p.test(value)){
				return '请输入正整数';
			} 
	    }
	});
	
	//提交
	form.on('submit(commit)', function(data){
		var formInfo = $('#addOrUpdateForm').serializeObject();
		// 单标签处理
		if(typeof formInfo.label_id == "string") {
			formInfo.label_id = [formInfo.label_id];
		}
		if(formInfo.label_id==undefined){//标签没填
			parent.layer.msg('请选择标签', {
				  icon: 5,
				  time: 2000 //（如果不配置，默认是3秒）
				})
			return false;
		}
		if(formInfo.audio_img_url==""){//封面图没传
			parent.layer.msg('请上传封面图', {
				  icon: 5,
				  time: 2000 //（如果不配置，默认是3秒）
			})
			return false;
		}
		if(formInfo.original_bon_point==""){//原始棒点为空的时候，默认存0，防止数据类型不匹配，保存错误
			formInfo.original_bon_point = 0;
		}
		if(formInfo.now_bon_point==""){//现在棒点为空的时候，默认存0，防止数据类型不匹配，保存错误
			formInfo.now_bon_point = 0;
		}
		if(parseInt(formInfo.original_bon_point)<=parseInt(formInfo.now_bon_point) && parseInt(formInfo.original_bon_point)>0){//原始棒点必须大于现在棒点
			parent.layer.msg('原始棒点必须大于现在棒点！', {
				  icon: 5,
				  time: 2000 //（如果不配置，默认是3秒）
			})
			return false;
		}
		formInfo.status = 1;
		formInfo.ischanged = 1;
		var addJsonStr=JSON.stringify(formInfo);
		disable_submit(true,'commit');//禁用按钮
		disable_submit(true,'save');//禁用按钮
		if(id==null || ""==id){
			$.ajax({
				url : getRootPath()+ '/totalAudio/save.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr},
				success : function(result){
					if("success"==result){
						layer.msg('添加成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp";
							});
					}else{
						layer.msg("添加失败，请重试",{
							icon:5,
							time:2000
						})
						disable_submit(false,'commit');
						disable_submit(false,'save');
					}
				},
				error:function(e){
					parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'commit');
					disable_submit(false,'save');
				}
			});
		}else{  //修改信息
			$.ajax({
				url : getRootPath()+ '/totalAudio/updateById.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr,id:id},
				success : function(result){
					if("success"==result){
						layer.msg('修改成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp";
							});
					} else {
						layer.msg("修改失败，请重试",{
							icon:5,
							time:2000
						})
						disable_submit(false,'commit');
						disable_submit(false,'save');
					}
				},
				error:function(){
					parent.layer.alert("修改失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'commit');
					disable_submit(false,'save');
				}
			});
		}
		return false; 
	});
	
	//存草稿
	form.on('submit(save)', function(data){
		var formInfo = $('#addOrUpdateForm').serializeObject();
		// 单标签处理
		if(typeof formInfo.label_id == "string") {
			formInfo.label_id = [formInfo.label_id];
		}
		
		if(formInfo.label_id==undefined){//标签没填
			parent.layer.msg('请选择标签', {
				  icon: 5,
				  time: 2000 //（如果不配置，默认是3秒）
				})
			return false;
		}
		if(formInfo.audio_img_url==""){//封面图没传
			parent.layer.msg('请上传封面图', {
				  icon: 5,
				  time: 2000 //（如果不配置，默认是3秒）
			})
			return false;
		}
		if(formInfo.original_bon_point==""){//原始棒点为空的时候，默认存0，防止数据类型不匹配，保存错误
			formInfo.original_bon_point = 0;
		}
		if(formInfo.now_bon_point==""){//现在棒点为空的时候，默认存0，防止数据类型不匹配，保存错误
			formInfo.now_bon_point = 0;
		}
		if(parseInt(formInfo.original_bon_point)<=parseInt(formInfo.now_bon_point) && parseInt(formInfo.original_bon_point)>0){//原始棒点必须大于现在棒点
			parent.layer.msg('原始棒点必须大于现在棒点！', {
				  icon: 5,
				  time: 2000 //（如果不配置，默认是3秒）
			})
			return false;
		}
		formInfo.status = 0;
		formInfo.ischanged = 0;
		var addJsonStr=JSON.stringify(formInfo);
		disable_submit(true,'commit');//禁用按钮
		disable_submit(true,'save');
		if(id==null || ""==id){
			$.ajax({
				url : getRootPath()+ '/totalAudio/save.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr},
				success : function(result){
					if("success"==result){
						layer.msg('添加成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp";
							});
					}else{
						layer.msg("添加失败，请重试",{
							icon:5,
							time:2000
						})
						disable_submit(false,'commit');
						disable_submit(false,'save');
					}
				},
				error:function(e){
					parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'commit');
					disable_submit(false,'save');
				}
			});
		}else{  //修改信息
			$.ajax({
				url : getRootPath()+ '/totalAudio/updateById.action',
				type : 'POST',
				dataType : 'TEXT',
				data : {jsonStr:addJsonStr,id:id},
				success : function(result){
					if("success"==result){
						layer.msg('修改成功', {
							  icon: 1,
							  time: 500 //（如果不配置，默认是3秒）
							}, function(){
								window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp";
							});
					} else {
						layer.msg("修改失败，请重试",{
							icon:5,
							time:2000
						})
						disable_submit(false,'commit');
						disable_submit(false,'save');
					}
				},
				error:function(){
					parent.layer.alert("修改失败，请关闭浏览器重试或联系管理员！");
					disable_submit(false,'commit');
					disable_submit(false,'save');
				}
			});
		}
		return false; 
	});
});

// 初始化数据
function initData() {
	initLabel();  // 初始化标签列表
	if(id != null && id != "") {
		initForm();   // 初始化表单数据
	} else {
		renderLabel(labels, null);
	}
}

//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/totalAudio/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#addOrUpdateForm').setForm(result);
					//li显示
					$(".module-goods-list").find("li").css("display","block");
					//添加上图片
					$(".module-goods-list").find("li").find(".goods-thumb").css("background-image","url("+result.audio_img_url+")");
					//给背景图隐藏域赋值
					$("input[name='audio_img_url']").val(result.audio_img_url);
					//上传图片按钮隐藏
					 $("#uploadImgUrl").hide();
					// 标签
					if(result.labelIds != null && result.labelIds != '') {
						renderLabel(labels, result.labelIds.split(","));
					}
					form.render();
				}
			}
		});
	});
}


function isInList(d, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i] == d) {
			return true;
		}
	}
	return false;
}

// 初始化下拉标签列表
function initLabel() {
	$.ajax({
		url : getRootPath()+ "/commodity/queryCommodityLabelList.action",
		type : 'POST',
		dataType : 'json',
		async: false,
		success: function(result){
			 if(result){
				 labels = result.data;
			 }
		}
	});
}

// 渲染标签列表
function renderLabel(labels, chosen_lebel_ids) {
	var html = "";
	if(chosen_lebel_ids != null && chosen_lebel_ids.length > 0) {
		for(var i = 0; i < labels.length; i ++) {
			if(isInList(labels[i].id, chosen_lebel_ids)) {
				html += "<option value='"+labels[i].id+"' selected='selected'>"+labels[i].name+"</option>"; 
			} else {
				html += "<option value='"+labels[i].id+"'>"+labels[i].name+"</option>"; 
        	}
		}
	} else {
		for(var i=0; i<labels.length; i++){
			html += "<option value='"+labels[i].id+"'>"+labels[i].name+"</option>"; 
		 };
	}
	$("#label_id").append(html);
	$("#label_id").chosen();
}


//展示选择的图片
function showImage(res){
	 //li显示
	 $(".module-goods-list").find("li").css("display","block");
	 //添加上图片
	 $(".module-goods-list").find("li").find(".goods-thumb").css("background-image","url("+res.filePath+")");
	 //给背景图隐藏域赋值
	 $("input[name='audio_img_url']").val(res.filePath);
	 //上传图片按钮隐藏
	 $("#uploadImgUrl").hide();
}

//删除图片
function deleteImgUrl(){
	 //li隐藏
	 $(".module-goods-list").find("li").css("display","none");
	 //清空隐藏域的值
	 $("input[name='audio_img_url']").val("");
	 //上传图片按钮显示
	 $("#uploadImgUrl").show();
}






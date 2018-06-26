var id=getUrlParam("id");
var img_url = [];  // 首页图片列表
var labels = [];  // 标签列表

var seclectCommDiv = null;
var chosenCommId = null;  // 商品id
var chosenCommPic = null;  // 商品pic

$(function(){
	initData();
})

// 20180514 去掉商品规格
//function renderCommSpe() {
//	layer.closeAll();
//	
//	// 获取商品规格
//	$.ajax({
//		url: getRootPath()+ '/commodity/queryCommoditySpeAndValList.action',
//		type: 'POST',
//		dataType: 'json',
//		async: false,
//		data: {
//			id: chosenCommId
//		},
//		success : function(result){
//			var html = geneCommHtml(chosenCommId, result.speList, null);
//			seclectCommDiv.children("div.spe").html(html);
//		},
//		error:function(){
//			parent.layer.alert("获取商品规格失败");
//			disable_submit(false,'commit');
//		}
//	});
//	seclectCommDiv.children("div.select").children("div.select_box").hide();
//	seclectCommDiv.children("div.select").children("div.p_img").children("img.commPic").attr('src', chosenCommPic); // 背景图
//	seclectCommDiv.children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
//	seclectCommDiv.children("div.select").children("div.select_box").parent().siblings().css({'display':'block'})//产品规格显示
//}
//
//
//function geneCommHtml(chosenCommId, speList, chosenSpes) {
//	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
//	var chosenSpeList = [];
//	if(chosenSpes != null && chosenSpes != '') {
//		chosenSpeList = chosenSpes.split(",");
//	}
//	if(speList != null && speList != '') {
//		// 规格1
//		if(speList.specifications_id1 != null && speList.specifications_id1 != '') {
//			html += '<div class="standard">'
//				+ '<text  style="color:#DD4B3F">*</text><span>'+speList.name1+'：</span>'
//				+ '<ul>';
//			for(var i = 0; i < speList.specifications_val1.length; i++) {
//				html += '<li data-id='+speList.specifications_val1[i].id
//						+ ' data-commid='+chosenCommId 
//						+ (isInList(speList.specifications_val1[i].id, chosenSpeList)?' class="selected"':" ") +'>'
//						+speList.specifications_val1[i].name+'</li>';
//			}
//			html += '</ul></div>';
//		}
//		// 规格2
//		if(speList.specifications_id2 != null && speList.specifications_id2 != '') {
//			html += '<div class="standard">'
//				+ '<text  style="color:#DD4B3F">*</text><span>'+speList.name2+'：</span>'
//				+ '<ul>';
//			for(var i = 0; i < speList.specifications_val2.length; i++) {
//				html += '<li data-id='+speList.specifications_val2[i].id
//						+ ' data-commid='+chosenCommId 
//						+ (isInList(speList.specifications_val2[i].id, chosenSpeList)?' class="selected"':" ") +'>'
//						+speList.specifications_val2[i].name+'</li>';
//			}
//			html += '</ul></div>';
//		}
//		// 规格3
//		if(speList.specifications_id3 != null && speList.specifications_id3 != '') {
//			html += '<div class="standard">'
//				+ '<text  style="color:#DD4B3F">*</text><span>'+speList.name3+'：</span>'
//				+ '<ul>';
//			for(var i = 0; i < speList.specifications_val3.length; i++) {
//				html += '<li data-id='+speList.specifications_val3[i].id
//						+ ' data-commid='+chosenCommId 
//						+ (isInList(speList.specifications_val3[i].id, chosenSpeList)?' class="selected"':" ") +'>'
//						+speList.specifications_val3[i].name+'</li>';
//			}
//			html += '</ul></div>';
//		}
//	}
//	return html;
//}
function renderCommSpe() {
	layer.closeAll();
	var html = geneCommHtml(chosenCommId);
	seclectCommDiv.children("div.spe").html(html);
	seclectCommDiv.children("div.select").children("div.select_box").hide();
	seclectCommDiv.children("div.select").children("div.p_img").children("img.commPic").attr('src', chosenCommPic); // 背景图
	seclectCommDiv.children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
}
function geneCommHtml(chosenCommId) {
	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
	return html;
}
// end 20180514 去掉商品规格

layui.use(['form','element','layer','laydate', 'upload', 'table'], function(){
	var layer = layui.layer;
	var form=layui.form;

	form.on('radio(statusFilter)', function(data){
		console.log(data.value); //被点击的radio的value值
		if(data.value == 3) {
			$("#rejectDiv").show();
		} else {
			$("#rejectDiv").hide();
		}
	});  
	
	form.on('submit(commit)', function(data){
		submit();
		return false;
	});
	$("#returnToList").click(function() {
		window.location.href=getRootPath()+"/pages/bon/information/informationExamineTab.jsp";
	})
});

// 提交表单
function submit() {
	disable_submit(true,'commit');
	var formInfo = $('#addOrUpdateForm').serializeObject();
	
	if(formInfo.status == null || formInfo.status == '') {
		alertErrorMsg("请选择审核结果");
		disable_submit(false,'commit');
		return false;
	}

	if(formInfo.status == 3) {
		if(formInfo.reject_reason == null || formInfo.reject_reason == '') {
			alertErrorMsg("请填写驳回原因");
			disable_submit(false,'commit');
			return false;
		}
	} else if(formInfo.status == 3) {
		formInfo.reject_reason = null;
	}
	$.ajax({
		url: getRootPath()+ '/information/updateToExamined.action',
		type: 'POST',
		dataType: 'TEXT',
		data: {
			jsonStr: JSON.stringify({
				id: id,
				status: formInfo.status,
				reject_reason: formInfo.reject_reason,
				emp_id:$("#emp_id").val()
			})
		},
		success : function(result){
			if("success"==result){
				layer.msg('提交成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						window.location.href=getRootPath()+"/pages/bon/information/informationExamineTab.jsp";
					});
			} else {
				alertErrorMsg("提交失败，请重试");
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.alert("添加失败，请关闭浏览器重试或联系管理员！");
			disable_submit(false,'commit');
		}
	});
	return false; 
}

function alertErrorMsg(msg) {
	layer.msg(msg,{
		icon:2,
		time:2000
	})
}

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
			url:getRootPath() + '/information/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#addOrUpdateForm').setForm(result);
					// 渲染图片
					if(result.img_url != null && result.img_url != '') {
						$("#imgDiv").show();
						$.each(result.img_url.split(","), function(i, n) {
							if(n != null && n != '') {
								img_url.push({
									id: n.substring(n.lastIndexOf("\/") + 1, n.length).split(".")[0],
									filePath: n
								})
							}
						})
						renderImgUrl();
					} else {
						$("#noImgUrl").show();
					}
					// 渲染视频
					renderAudioUrl(result.audio_url);
					
					// 标签
					if(result.labelIds != null && result.labelIds != '') {
						renderLabel(labels, result.labelIds.split(","));
					} else {
						renderLabel(labels, null);
					}
					// 商品
					// 20180514 去掉商品规格
//					if(result.commList != null && result.commList != '') {
//						var commList = result.commList;
//						var spe = $('.comms');
//						for(var i = 0; i < commList.length; i++) {
//							if(commList[i] != null && commList[i] != '') {
//								var html = geneCommHtml(commList[i].commodity_id, commList[i].speList, commList[i].specifications_value_id);
//								$(spe[i]).children("div.spe").html(html);
//								var url = "";
//								if(commList[i].img_path_str.indexOf(",")<0){
//									 url = commList[i].img_path_str;
//								 }else{
//									//图片url,取第一个，之前的值
//									 url = commList[i].img_path_str.substr(0,commList[i].img_path_str.indexOf(","));
//								 }
//								
//								$(spe[i]).children("div.select").children("div.select_box").hide();
//								$(spe[i]).children("div.select").children("div.p_img").children("img.commPic").attr('src', url); // 背景图
//								$(spe[i]).children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
//								$(spe[i]).children("div.select").children("div.select_box").parent().siblings().css({'display':'block'})//产品规格显示
//							}
//						}
//						
//					}
					if(result.commList != null && result.commList != '') {
						var commList = result.commList;
						var spe = $('.comms');
						for(var i = 0; i < commList.length; i++) {
							if(commList[i] != null && commList[i] != '') {
								var html = geneCommHtml(commList[i].commodity_id);
								$(spe[i]).children("div.spe").html(html);
								var url = "";
								if(commList[i].img_path_str.indexOf(",")<0){
									 url = commList[i].img_path_str;
								 }else{
									 url = commList[i].img_path_str.substr(0,commList[i].img_path_str.indexOf(","));
								 }
								
								$(spe[i]).children("div.select").children("div.select_box").hide();
								$(spe[i]).children("div.select").children("div.p_img").children("img.commPic").attr('src', url); // 背景图
								$(spe[i]).children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
							}
						}
					}
					// 20180514 去掉商品规格
					
					// 填充内容
					if(result.content != null && result.content != '') {
						console.log(result.content);
//						$("#content").html(`${result.content}`);
						ue.ready(function() {//编辑器初始化完成再赋值
							ue.setContent(result.content);  //赋值给UEditor
						});
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
		url : getRootPath()+ '/banner/queryLabels.action',
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


//渲染图片
function renderImgUrl() {
	$("#img_urls li").remove(); 
	var imUrlStyle = "";
	for(var i = 0; i < img_url.length; ++i) {
		imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+img_url[i].filePath+'\');"></a>';
	}
	$("#img_urls").html(imUrlStyle);
}

//渲染音频
function renderAudioUrl(audioFilePath) {
	if(audioFilePath == null || audioFilePath == '') {
		$("#uploadAudioUrl").show();
	} else {
		$("#audioDiv").show();
		var str = "<div style='height:250px;'id='splice'>"
			+ "<div>"
			+ "<audio controls='controls'><source src='"+ audioFilePath + "'></audio>"
			+ "</div>"
			+ "<div>";
		$("#audioUrl").html(str);
		$("#audio_url").val(audioFilePath);
	}
}


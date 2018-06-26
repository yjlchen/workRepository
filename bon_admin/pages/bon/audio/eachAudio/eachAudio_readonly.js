var id=getUrlParam("id");
var sta=getUrlParam("status");

var seclectCommDiv = null;
var chosenCommId = null;  // 商品id
var chosenCommPic = null;  // 商品pic
$(function(){
	initData();
	layui.use(['form', 'layedit'], function(){
		layer = layui.layer
		,layedit = layui.layedit
		,form = layui.form;
		form.on('radio(check_result)', function(data){
			if(data.value=="0"){
				$("#reject_reason").show();
				$("#bohui").attr("lay-verify","required")
			}else{
				$("#reject_reason").hide();
				$("#bohui").removeAttr("lay-verify");//去掉验证
			}
		});
		form.on('submit(submit)', function(data){
			
		})
	});
	$("#returnToList").click(function() {
		window.location.href=getRootPath()+"/pages/bon/audio/eachAudio/eachAudioExamineTab.jsp?status="+sta;
	})
	

})



// 20180519 去掉商品规格
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

function geneCommHtml(chosenCommId) {
	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
	return html;
}
//end 20180519 去掉商品规格

// 初始化数据
function initData() {
	initForm();   // 初始化表单数据
//	initTab();
}

//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/eachAudio/queryById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					$('#addOrUpdateForm').setForm(result);
					// 渲染音频
					if(result.audio_url != null && result.audio_url != '') {
						renderAudioUrl(result.audio_url);
					}
					if(result.isPay==1){
						if(result.is_pay==1){//是否试听
							$("#is_pay").html('<span>是</span>')
						}else{
							$("#is_pay").html('<span>否</span>')
						}
						$("#isPay").show();
					}
					if(result.status==2){//如果审核通过
						$("#pass").show();
					}
					if(result.status==3){//如果审核结果是驳回
						$("#reject").show();
						$("#reject_reason").show();
						
					}
					// 商品
					if(result.commList != null && result.commList != '') {
						var commList = result.commList;
						var spe = $('.comms');
						for(var i = 0; i < commList.length; i++) {
							if(commList[i] != null && commList[i] != '') {
								// 20180519 去掉商品规格
								//var html = geneCommHtml(commList[i].commodity_id, commList[i].speList, commList[i].specifications_value_id);
								var html = geneCommHtml(commList[i].commodity_id);
								// end 20180519 去掉商品规格
								$(spe[i]).children("div.spe").html(html);
								var url = "";
								if(commList[i].img_path_str.indexOf(",")<0){
									 url = commList[i].img_path_str;
								 }else{
									//图片url,取第一个，之前的值
									 url = commList[i].img_path_str.substr(0,commList[i].img_path_str.indexOf(","));
								 }
								
								$(spe[i]).children("div.select").children("div.select_box").hide();
								$(spe[i]).children("div.select").children("div.p_img").children("img.commPic").attr('src', url); // 背景图
								$(spe[i]).children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
								//$(spe[i]).children("div.select").children("div.select_box").parent().siblings().css({'display':'block'})//产品规格显示
								$(spe[i]).parent().parent().show();
							}
						}
						
					}
					// 填充内容
					if(result.content != null && result.content != '') {
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


//渲染音频
function renderAudioUrl(audioFilePath) {
	var str = "<div style='height:250px;'id='splice'>"
		+ "<div>"
		+ "<audio id='audio' controls='controls'><source src='"+ audioFilePath + "'></audio>"
		+ "</div>"
		+ "<div>";
	$("#audioUrl").html(str);
}
//初始化左边选项卡、右边图片选择的样式
function initTab(){
	search();
	$(".right>div").on("click", "div.identical", function() {
		$(this).siblings().find(".attachment-selected").removeClass("start");
		if ($(this).find(".attachment-selected").hasClass("start")) {
			$(this).find(".attachment-selected").removeClass("start");
			chosenCommId = null;
			chosenCommPic = null;
		} else {
			$(this).find(".attachment-selected").addClass("start");
			chosenCommId = $(this).find("input[name='id']").val();
			chosenCommPic = $(this).find("img").attr("src");
		}
	})
}


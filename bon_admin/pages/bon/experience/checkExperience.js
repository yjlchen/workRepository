var id=getUrlParam("id");//心得表的主键
var checkFlag=getUrlParam("checkFlag");//判断是查看还是审核的标志,只有审核才会传值
var jumpFlag=getUrlParam("jumpFlag");//判断从其他tab的页面传递过来的
var backFlag=getUrlParam("backFlag");//获取是从哪个tab传递过来的,最好返回的时候，将他再传递回去
var img_url = [];  // 首页图片列表
var seclectCommDiv = null;
var chosenCommId = null;  // 商品id
var chosenCommPic = null;  // 商品pic

$(function(){
	initData();
	initCheck();
})

layui.use(['form','element','layer','laydate', 'upload'], function(){
	var layer = layui.layer,form=layui.form;
	//心得的表单验证
	layui.form.verify({  
		reject_reason: function(value){  
			value=toTrim(value);
			if(value.length==0){
				return '审核意见不能为空';
			}else if (value.length>240){
				return '审核意见字数太多，请少于240个字'
			}
		}
	});
	
	
	 // 返回上一层
	$('#backPage').click(function(){
		if (jumpFlag != 1)
			backPage();
		else
			//从心得管理跳转过来的
		    location.href = getRootPath()+"/pages/bon/experience/experienceManage.jsp?backFlag="+backFlag;
	})
	
	// 审核通过
	form.on('submit(formDemo)', function(data){
		//判断是通过还是驳回
		var str = $("#reject_reason").val();
		if (str != "" && str.length>0){
			//驳回
			var url = getRootPath()+ '/experience/rejectExperience.action';
			saveOrUpExperience(0,url);
		}else{
			//通过
			var url = getRootPath()+ '/experience/updateCheckExperience.action';
			saveOrUpExperience(1,url);
		}
	})
	
	//是否收费点击切换
	$("#is_pay").click(function(){
		if($(this).children('input').eq(1).is(":checked")){//点击否			
			$("#original_bon_point").show();
			$("#reject_reason").attr("lay-verify","reject_reason");
		}else{
			$("#original_bon_point").hide();
			$("#reject_reason").removeAttr("lay-verify");//去掉现在棒点的验证
			$("#reject_reason").val("");
		}		
    });
});

function saveOrUpExperience(status,url){
	
	disable_submit(true,'commit');
	
	var empInfo = $('#addOrUpdateForm').serializeObject();
	var addJsonStr=JSON.stringify(empInfo);//将表单中的数据转成json
	var data;
	if (status == 1){
		data = {id:id};
	}else{
		data = {rejectJsonStr:addJsonStr,id:id};
	}
	
	$.ajax({
		url : url,
		type : 'POST',
		dataType : 'TEXT',
		data : data,
		success : function(result){
			if("success"==result){
				layer.msg('添加成功', {
					  icon: 1,
					  time: 500 //（如果不配置，默认是3秒）
					}, function(){
						backPage();
					});
			}else{
				layer.msg("添加失败，请重试或联系管理员",{
					icon:1,
					time:2000
				})
				disable_submit(false,'commit');
			}
		},
		error:function(){
			parent.layer.alert("添加失败");
			disable_submit(false,'commit');
		}
	});
	
	return false; 
}

// 初始化数据
function initData() {
	//填充表格
	if(id != null && id != "") {
		$.ajax({
			url:getRootPath() + '/experience/selectExperienceById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				
				$('#addOrUpdateForm').setForm(result);
				starChangeClazz(result.score_star);
				
				//填充图片
				if(result.img_url != null && result.img_url != '') {
					$.each(result.img_url.split(","), function(i, n) {
						if(n != null && n != '') {
							img_url.push({
								id: n.substring(n.lastIndexOf("\/") + 1, n.length).split(".")[0],
								filePath: n
							})
						}
					})
					
					renderImgUrl();
				}
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
								//图片url,取第一个，之前的值
								 url = commList[i].img_path_str.substr(0,commList[i].img_path_str.indexOf(","));
							 }
							 $('#commodity_name').val(commList[i].commodity_name)
							
							$(spe[i]).children("div.select").children("div.select_box").hide();
							$(spe[i]).children("div.select").children("div.p_img").children("img.commPic").attr('src', url); // 背景图
							$(spe[i]).children("div.select").children("div.select_box").siblings().css({'display':'block'});//图片显示
						}
					}
					
				}
			}
		});
	}
	
}

//判断是否显示审核状态
function initCheck(){
	if (checkFlag == 1){
		//$('#original_bon_point').show();
		$('#is_reject').show();
		$('#commit').show();
	}
}

//渲染图片
function renderImgUrl() {
	$("#img_urls li").remove(); 
	var imUrlStyle = "";
	var imgUrls = "";
	for(var i = 0; i < img_url.length; ++i) {
		imUrlStyle += '<li style="float:left"><a class="goods-thumb" style="background-image: url(\''+img_url[i].filePath+'\');"></a>';
		imgUrls += img_url[i].filePath + ",";
	}
	$("#img_urls").html(imUrlStyle);
	$("#img_url").val(imgUrls);
}

function geneCommHtml(chosenCommId) {
	var html = "<input style='width:0px;height:0px;border:none;' value="+chosenCommId+" />";
	return html;
}

function isInList(d, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i] == d) {
			return true;
		}
	}
	return false;
}
//返回
function backPage(){
	location.href = getRootPath()+"/pages/bon/experience/verifyExperience.jsp?backFlag="+backFlag;
}
function starChangeClazz(index){
	for (var i=1;i<6;i++){
		document.getElementById('star'+i).style.background='rgba(0, 0, 0, 0) url('+'./star_unsele.png'+') repeat scroll 0% 0% / 16px 16px'
	}
	//先清空
	for (var i=1;i<6;i++){
		if (i > index){
			break;
		}else{
			document.getElementById('star'+i).style.background='rgba(0, 0, 0, 0) url('+'./star_sele.png'+') repeat scroll 0% 0% / 16px 16px'
		}
	}
}



var id = getUrlParam("id");
var audio_id = getUrlParam("audio_id");
var flag = getUrlParam("flag");
var ispay = getUrlParam("ispay");
var publisher_id = "";
$(function(){
	initForm();
	initEvaluate(false);
	
	//点击返回
	$(".back").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/eachAudio/eachAudioManageTab.jsp?status="+flag+"&audio_id="+audio_id+"&ispay="+ispay
	})
})

//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/eachAudio/previewById.action',
			type:'post',
			dataType:'json',
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					// 标题
					$("#eachTitle").html(result.title);
					// 封面图
					$(".poster img").attr('src', result.audio_img_url);
					// 最后更新时间
					if(result.publish_time != null && result.publish_time != '') {//审核时间
						$(".updateTime").html("最后更新："+result.publish_time.split(" ")[0]);
					}else{//发布时间
						$(".updateTime").html("最后更新："+result.add_time.split(" ")[0]);
					}
					// 音频
					var audioDiv = "<audio controls='controls'><source src='"+ result.audio_url + "'></audio>";
					$(".playNumber").html(audioDiv);
					// 正文
					$(".content_info>div").html(result.main_text);
					// 作者
					$(".hoster_name").html(result.wx_name);
					//作者头像
					$(".hoster_icon img").attr('src', result.head_img_url);
					//粉丝数量
					$(".hoster_focus").html(result.followNum+"人关注")
					//音频发布人
					publisher_id = result.emp_id;
				}
			}
		});
	});
}

var currentPage = 1;
var pageSize = 3;
//初始化评论列表
function initEvaluate(add){
	var cPage = currentPage;
	var pSize = pageSize;
	if(add) {
		// 追加
		
	} else  {
		// 刷新
		pSize = cPage*pageSize;
		cPage = 1;
	}
	$.ajax({
		url:getRootPath() + '/eachAudioEvaluate/queryList.action',
		type:'post',
		dataType:'json',
		data:{
			"queryJson":JSON.stringify({
				info_id: id,
				member_id: publisher_id
			}),
			page: cPage,
			limit: pSize
		},
		async: false,
		success:function(result){
			if(result != null && result != "") {
				renderEvaluate(result, add);
			}
		}
	});
}

function renderEvaluate(evaluateList, add) {
	$("#evaluateCnt").html(evaluateList.count);
	if(evaluateList.count <= 0) {
		$(".noComment").show();
		$("#evaluationList").empty();
	} else {
		$(".noComment").hide();
		var html = "";
		for(var i = 0; i < evaluateList.data.length; i++) {
			var eva = evaluateList.data[i];
			html += "<div class='commentList clear'>";
			html += "<div class='portrait left'><img src='"+eva.mhead_img_url+"'/></div>";
			html += "<div class='content left'>";
			html += "<div class='peopleName clear'>";
			html += "<div class='left'><span class='commName'>"+eva.evaluate_member_name+"</span><div class='time'>"+dateDesc(eva.evaluate_time)+"</div></div>";
			html += "<div class='right' style='position: relative'>";
			if(eva.pointed == 0) {
				html += '<div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="false" data-evaluateid="'+eva.id+'" evaluateTime="'+eva.evaluate_time+'"  isVirtual="'+eva.is_virtual+'">';
				html += "<img class='left like' style='display: none;' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png'>";
				html += "<img class='left yiLike' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png' style='display: block;'>";
			} else if(eva.pointed == 1) {
				html += '<div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="true" data-evaluateid="'+eva.id+'">';
				html += "<img class='left like' style='display: block;' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png'>";
				html += "<img class='left yiLike' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png' style='display: none;'>";
			}
			html += "  <span>"+(eva.point_count>0?eva.point_count:"赞")+"</span>";
			html += "</div>";
			html += "<span class='listMore' data-active='false' onclick='popup(this)'>···</span>";
			html += "<div class='operation'>";
			html += "<span class='delter left' style='color: #f00;margin-right: .2rem' onclick='delComment(this)' data-id='"+eva.id+"'>删除</span>";
			html += "<span class='reply left' onclick='reply(this)' data-evaluateid='"+eva.id+"' evaluateTime='"+eva.evaluate_time+"'  isVirtual='"+eva.is_virtual+"'>回复</span>";
			html += "</div></div> </div>";
			html += "<div class='commentCon'>"+eva.evaluate_content+"</div>";
			if(eva.answer_member_id != null && eva.answer_member_id != '') {
				html += "<div class='replyPeople'>@ "+eva.answer_member_name+"：<span style='color:#404040'>"+eva.answer_audio_evaluate_content+"</span></div>";
			}
			html += " </div></div>";
		}
		if(add){
			$("#evaluationList").append(html);
		} else {
			$("#evaluationList").html(html);
		}
	}
	// 当前为最后一页，隐藏查看更多
	if(currentPage*pageSize >= evaluateList.count) {
		$("#more").hide();
	} else {
		$("#more").show();
	}
	
}

function dateDesc(d) {
	var date = new Date(d);
	var timediff =(new Date() - date) / (1000 * 60);
	if(timediff < 0) {
		return  d.split(" ")[0];
	} else if(timediff <= 10) {
		return "刚刚";
	} else if(timediff <= 60) {
		return parseInt(timediff)+"分钟前";
	} else if(timediff <= 60 * 24){
		return parseInt(timediff/60) + "小时前";
	}
	return d.split(" ")[0]
}

//  点赞
function like(obj){
	var isVirtual = $(obj).attr("isVirtual");//获得评论类型
	var evaluateTime = $(obj).attr("evaluateTime");//评论时间
	if(isVirtual == 1){//如果虚拟评论的时间超过当前时间，禁止回复
		//获取系统当前时间
    	var currTime = queyNowTimeByServer();//该方法是common.js里面的方法
    	if (evaluateTime > currTime ){
    		alert("评论时间超过当前时间，禁止点赞")
    		return
    	}
	}
    var num=parseInt($(obj).children("span").text());
    var active=$(obj).data("active");
    $(obj).children("img").hide();
    if(active){
    	// 取消点赞
        $(obj).data("active",false);
        $(obj).children(".yiLike").show();
        num--;
        if(num<=0){
            num="赞"
        }
    }else{
    	// 点赞
        $(obj).data("active",true);
        $(obj).children(".like").show();
        if(Number(num)){
            num++
        }else{
            num=1
        }
    }
    $(obj).children("span").text(num);
    
    
	$.ajax({
		url:getRootPath() + '/eachAudioEvaluate/point.action',
		type:'post',
		dataType:'json',
		data:{
			"queryJson":JSON.stringify({
				audio_children_evaluate_id: $(obj).data("evaluateid"),
				active: active?0:1,
				member_id:publisher_id//点赞人，即音频发布人
			})
		},
		success:function(result){}
	});
}
//  弹出回复评论
function popup(obj){
    var active=$(obj).data("active");
    //console.log($(obj).parents(".commentModule"))
    $(obj).parents(".commentModule").find(".operation").css("right","-1.5rem")
    if(active){
        $(obj).data("active",false);
        $(obj).siblings(".operation").css("right","-1.5rem")
    }else{
        $(obj).data("active",true);
        $(obj).siblings(".operation").css("right",".25rem")
    }
}
// 删除评论
function delComment(obj){
    $.ajax({
		url:getRootPath() + '/eachAudioEvaluate/delete.action',
		type:'post',
		dataType:'json',
		async: false,
		data:{
			"id": $(obj).data("id")
		},
		success : function(result){
			console.log(result);
		}
	});
    initEvaluate(false);
}
//  回复
function reply(obj){
	var isVirtual = $(obj).attr("isVirtual");//获得评论类型
	var evaluateTime = $(obj).attr("evaluateTime");//评论时间
	if(isVirtual == 1){//如果虚拟评论的时间超过当前时间，禁止回复
		//获取系统当前时间
    	var currTime = queyNowTimeByServer();//该方法是common.js里面的方法
    	if (evaluateTime > currTime ){
    		alert("评论时间超过当前时间，禁止回复")
    		return
    	}
	}
    var name=$(obj).parents(".commentList").find(".peopleName .commName").text();
    var content=$(obj).parents(".commentList").find(".commentCon").text();
    $(obj).parents(".commentModule").find(".commentPeople input").attr("placeholder","@ "+name);
    $(obj).parents(".commentModule").find(".commentPeople input").data("content",content);
    $(obj).parents(".commentModule").find(".commentPeople input").data("evaluateid",$(obj).data("evaluateid"));
    $(obj).parent(".operation").css("right","-1.5rem");
}
//  回复按钮
function replyBtn(obj){
	var inputVal=$(obj).siblings("input").val();
	var evaluateId=$(obj).siblings("input").data("evaluateid");
    if(inputVal==""){
        alert("回复内容不能为空");
        return;
    }
    $.ajax({
		url:getRootPath() + '/eachAudioEvaluate/evaluate.action',
		type:'post',
		dataType:'json',
		async: false,
		data:{
			jsonStr: JSON.stringify({
				audio_children_id:id,
				answer_audio_evaluate_id: evaluateId,
				evaluate_content: inputVal,
				evaluate_member_id:publisher_id,//评论人id,即音频发布人id
				audio_id:audio_id  //总集id
			}),
		},
		success:function(result){

		}
	});
    var evaluateId=$(obj).siblings("input").val("");
    $(obj).parents(".commentModule").find(".commentPeople input").attr("placeholder","谢谢你长这么好看还来给我评论!");
    $(obj).parents(".commentModule").find(".commentPeople input").data("content","");
    $(obj).parents(".commentModule").find(".commentPeople input").data("evaluateid","");
    initEvaluate(false);
}


// 查看更多
function more() {
	currentPage += 1;
	initEvaluate(true);
}


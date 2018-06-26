var id=getUrlParam("id");
var status = getUrlParam("status");
var currentUserId = "";

$(function(){
	initForm();
	
	//点击返回
	$(".back").click(function(){
		window.location.href=getRootPath()+"/pages/bon/information/informationManageTab.jsp?status="+status
	})
})

//初始化表单数据
function initForm(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/information/queryById.action',
			type:'post',
			dataType:'json',
			data:{
				"id":id
			},
			success:function(result){
				if(result != null && result != "") {
					currentUserId = result.emp_id;// 当前用户为作者
					// 标题
					$("#title").html(result.title);
					// 作者
					$(".author").html(result.wx_name);
					// 头像
					$(".head_img_url").attr('src', result.head_img_url);
					// 发布时间
					if(result.add_time != null && result.add_time != '') {
						$(".add_time").html(result.add_time.split(" ")[0]);
					}
					// 内容
					$("#textContent").html(result.content);
					// 音频
					if(result.audio_url != null && result.audio_url != '') {
						var audioDiv = "<audio controls='controls'><source src='"+ result.audio_url + "'></audio>";
						$("#audioDiv").html(audioDiv);
					}
				}
				initEvaluate(false);
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
		url:getRootPath() + '/informationEvaluate/queryList.action',
		type:'post',
		dataType:'json',
		data:{
			"queryJson":JSON.stringify({
				info_id: id,
				member_id: currentUserId
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
		$("#evaluationList").html("");
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
				html += '<div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="false" data-evaluateid="'+eva.id+'" data-date="'+eva.evaluate_time+'">';
				html += "<img class='left like' style='display: none;' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png'>";
				html += "<img class='left yiLike' src='http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png' style='display: block;'>";
			} else if(eva.pointed == 1) {
				html += '<div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="true" data-evaluateid="'+eva.id+'" data-date="'+eva.evaluate_time+'">';
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
				html += "<div class='replyPeople'>@ "+eva.answer_member_name+"：<span style='color:#404040'>"+eva.answer_information_evaluate_content+"</span></div>";
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
	var date = $(obj).data("date");
	if((new Date() - new Date(date)) < 0) {
		alert("评论时间超过当前时间，禁止点赞")
		return;
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
		url:getRootPath() + '/informationEvaluate/point.action',
		type:'post',
		dataType:'json',
		data:{
			"queryJson":JSON.stringify({
				information_evaluate_id: $(obj).data("evaluateid"),
				active: active?0:1,
				member_id: currentUserId
			})
		},
		success:function(result){}
	});
}
//  弹出回复评论
function popup(obj){
    var active=$(obj).data("active");
    console.log($(obj).parents(".commentModule"))
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
		url:getRootPath() + '/informationEvaluate/delete.action',
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
		url:getRootPath() + '/informationEvaluate/evaluate.action',
		type:'post',
		dataType:'json',
		async: false,
		data:{
			jsonStr: JSON.stringify({
				information_id: id,
				answer_information_evaluate_id: evaluateId,
				evaluate_content: inputVal,
				evaluate_member_id: currentUserId
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


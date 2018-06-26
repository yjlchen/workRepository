var id=getUrlParam("id");
var backFlag=getUrlParam("backFlag");
var experienceJson = "";//这个是心得具体信息
var nowTime = "";//服务器时间
var recordsTotal = "";//评论总数
var pageClick = 0;
//定义分页的start
var start = 0;
var length = 10;

$(function(){  
	initData(); //初始数据
	
	$('.back').click(function(){
		location.href = getRootPath()+"/pages/bon/experience/experienceManage.jsp?backFlag="+backFlag;
	})
});

// 请求数据
function initData(){
	
	$.ajax({
	    url : getRootPath()+"/experience/queryExperienceEvaluate.action",
	    type : "post",
	    data:{"id":id},
	    async: false,//同步
	    "dataType":"json",
	    success : function (gdata) {
	    	console.log(gdata)
	    	experienceJson = gdata.experience;
	    	nowTime = gdata.nowTime;
	    	commLength = gdata.evaluation.length;
	    	recordsTotal = gdata.recordsTotal;
	    	paddingData(gdata.experience);
	    	paddingCommentList(gdata.evaluation);
	    }
	});
}

// 首次填充列表
function paddingCommentList(evaluation){
	
	//没有评论
	if (evaluation.length == 0){
		$('#noCommentList').append('<img class="left" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/noComment.png"/>哭哭，还没有人给我评论...')
		$('#noCommentList').show();
		$('#commentList').hide();
		$('#commentMore').hide();
	}else{
		//组合评论
		for (var i=0;i<evaluation.length;i++){
			//追加样式
			var htm = paddingCommentHtml(evaluation[i]);
			$('#commentList').append(htm);
		}
	    
	}
}

function paddingCommentHtml(evaluation){
	
	var id = evaluation.id;
	var head_img_url = evaluation.head_img_url;//头像
	var wx_name = evaluation.wx_name;//名字
	var belong_id = evaluation.evaluate_member_id;//人的id
	var point =  evaluation.point;//是否已经点赞
	var point_count =  evaluation.point_count;//点赞数量
	var evaluate_time = dateDesc(evaluation.evaluate_time);//评论时间
	var evaluate_content = evaluation.evaluate_content;//评论内容
	var answer_member_name = evaluation.answer_member_name;//被回复人
	var answer_experience_evaluate_content = evaluation.answer_experience_evaluate_content;//被回复内容
	var answer_experience_evaluate_id = evaluation.answer_experience_evaluate_id;//被回复人id
	var virtual = evaluation.is_virtual;
	var evalutateTime = new Date(evaluation.evaluate_time).getTime();
	
	var html ='<div class="commentList clear" data-id='+id+' data-memid='+belong_id+' data-evaluate_time_s='+evalutateTime+' data-virtual='+virtual+'>'
        +'    <div class="portrait left"><img src='+head_img_url+'></div>'
        +'    <div class="content left">'
        +'        <div class="peopleName clear">'
        +'            <div class="left"><span class="commName">'+wx_name+'</span><div class="time">'+evaluate_time+'</div></div>'
        +'            <div class="right" style="position: relative">'
        if (point == 1){
        	 html	+=        '                <div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="true">'
        		 +'                    <img class="left like" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png">'
        		 +'                    <img class="left yiLike" style="display:none" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png">'
        }
       
        if (point != 1){
        	 html +=  '                <div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="false">'
        		 +'                    <img class="left like" style="display:none" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png">'
        		 +'                    <img class="left yiLike" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png">'
        }
       
     if (point_count ==0){
    	 html+='                    <span>赞</span>'
     }else{
    	 html+='                    <span>'+point_count+'</span>'
     }
       
     html+='                </div>'
        +'                <span class="listMore" data-active="false" onclick="popup(this)">···</span>'
        +'                <div class="operation">'
        +'                    <span class="delter left" style="color: #f00;margin-right: .2rem" onclick="delComment(this)">删除</span>'
        +'                    <span class="reply left" onclick="reply(this)">回复</span>'
        +'                </div>'
        +'            </div>'
        +'        </div>'
        +'        <div class="commentCon">'+evaluate_content+'</div>'
     if (answer_experience_evaluate_id != null && answer_experience_evaluate_id != ''){
    	 html+=   '<div class="replyPeople">@ '+answer_member_name+'：<span style="color:#404040">'+answer_experience_evaluate_content+'</span></div>'
     }
      html+=  '    </div>'
        +'</div>';
	
	 return html;
	
}


//填充主要数据
function paddingData(experience){
	//头像
	$("#head_img_url").attr('src',experience.head_img_url); 
	//名字
	$("#wx_name").html(experience.wx_name);
	//发布日期
	//$("#publish_time").html(experience.publish_time.substring(0,10));
	$("#publish_time").html(experience.add_time.substring(0,10));
	//星级评分
	for (var i=1;i<6;i++){
		if (i > experience.score_star)
			break;
		else
			$("#grade"+i).attr('src','http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/fullStar.png');
	}
	//预留出心得评级的汉字字典
	$('#gradeName').html(experience.val1)
	
	//心得内容
	var ex_content = experience.experience_content.split("\n");
	var cont = "";
	for (var j=0;j<ex_content.length;j++){
		$('#experience_content_list').append('<div class="text">'+ex_content[j]+'</div>')
	}
	
	//图片信息
	var expImgUrl = experience.img_url.split(",");
	//商品图片
	var img_path_str = experience.img_path_str.split(",")[0];
	
	if (expImgUrl.length == 1){
		$('#img_two').append('<img class="left" src='+expImgUrl[0]+'>')
		$('#img_two').append('<img class="left" src='+img_path_str+'>')
		$('#img_two').show();
	}
	if (expImgUrl.length == 2){
		$('#img_two').append('<img class="left" src='+expImgUrl[0]+'>')
		$('#img_two').append('<img class="left" src='+expImgUrl[1]+'>')
		$('#img_two').show();
	}
	if (expImgUrl.length >2){
		for (var j=0;j<expImgUrl.length;j++){
			$('#img_six').append('<img class="left" src='+expImgUrl[j]+'>')
			if (j == 5 && expImgUrl.length > 6){
				$('#img_six').append('<div>共'+expImgUrl.length+'张</div>');
				break;
			}
		}
		$('#img_six').show();
	}

	
	$("#img_path_str").attr('src',img_path_str); 
	//商品名
	$("#commodity_name").html(experience.commodity_name); 
	//商品价格
	$("#price").html("¥"+experience.price); 
	
	//评论数
	$('#evaluate_amount').html(recordsTotal);
}



//  点赞
function like(obj){
	var id=$(obj).parents(".commentList").data("id");
	var virtual=$(obj).parents(".commentList").data("virtual");
	var evaluate_time_s=$(obj).parents(".commentList").data("evaluate_time_s"); //评论时间
	
	//获取值
	var addJson = {
		experience_evaluate_id : id,//心得评论id
		member_id:experienceJson.customer_id//心得发布人ID
	}
	
	var currTime = new Date(queyNowTimeByServer()).getTime();
	if (evaluate_time_s > currTime ){
		alert("超当前时间的评论，禁止点赞")
		return false;
	}
	var addJsonStr = JSON.stringify(addJson);
	
	$.ajax({
	    url : getRootPath()+"/experience/updateEvaluatePoint.action",
	    type : "post",
	    data:{addJsonStr:addJsonStr},
	    async: false,//同步
	    "dataType":"text",
	    success : function (gdata) {
	    	//判断返回值
	    	if (gdata == 'success'){
	    		//成功
	    		var num=parseInt($(obj).children("span").text());
	    	    var active=$(obj).data("active");
	    	    $(obj).children("img").hide();
	    	    if(active){
	    	        $(obj).data("active",false);
	    	        $(obj).children(".yiLike").show();
	    	        num--;
	    	        if(num<=0){
	    	            num="赞"
	    	        }
	    	    }else{
	    	        $(obj).data("active",true);
	    	        $(obj).children(".like").show();
	    	        if(Number(num)){
	    	            num++
	    	        }else{
	    	            num=1
	    	        }
	    	    }
	    	    $(obj).children("span").text(num)
	    	}else{
	    		//失败
	    		alert("点赞失败")
	    	}
	    },error:function(){
			alert("点赞失败，请关闭浏览器重试或联系管理员！");
		}
	});
    
}
//  弹出回复评论
function popup(obj){
    var active=$(obj).data("active");
    if(active){
        $(obj).data("active",false);
        $(obj).siblings(".operation").css("right","-1.5rem")
    }else{
        $(obj).data("active",true);
        $(obj).siblings(".operation").css("right",".25rem")
    }
}
//  删除评论
function delComment(obj){

	var id=$(obj).parents(".commentList").data("id");
	var virtual=$(obj).parents(".commentList").data("virtual");
		
	//获取值
	var addJson = {
		id : id,//心得评论id
		experience_id : experienceJson.id,//心得id
		is_virtual : virtual,//是否虚拟评论0否1是
	}
	
	var addJsonStr = JSON.stringify(addJson);
	
	$.ajax({
	    url : getRootPath()+"/experience/deleteExperienceEvaluate.action",
	    type : "post",
	    data:{addJsonStr:addJsonStr},
	    async: false,//同步
	    "dataType":"text",
	    success : function (gdata) {
	    	//判断返回值
	    	if (gdata == 'success'){
	    		$(obj).parents(".commentList").remove();
		    	 $('#evaluate_amount').html(parseInt(ev)-1);
	    		 commentMore(1);
	    		 var ev = $("#evaluate_amount").text();
	    		 //获取
	    		 if (ev == 0){
		    		$('#noCommentList').show();
		    		$('#commentMore').hide();
		    	 }
	    		
	    	}else{
	    		//失败
	    		alert("删除失败")
	    	}
	    },error:function(){
			alert("删除失败，请关闭浏览器重试或联系管理员！");
		}
	});
}
//  回复
function reply(obj){
    var name=$(obj).parents(".commentList").find(".peopleName .commName").text();
    var content=$(obj).parents(".commentList").find(".commentCon").text(); 
    
    var evid=$(obj).parents(".commentList").data("id"); //评论id
    var memid=$(obj).parents(".commentList").data("memid"); //评论人id
    var evaluate_time_s=$(obj).parents(".commentList").data("evaluate_time_s"); //评论时间
    var virtual=$(obj).parents(".commentList").data("virtual"); //是否虚拟
    
    $(obj).parents(".commentModule").find(".commentPeople input").attr("placeholder","@ "+name);
    $(obj).parents(".commentModule").find(".commentPeople input").data("content",content);
    $(obj).parents(".commentModule").find(".commentPeople input").data("evid",evid);
    $(obj).parents(".commentModule").find(".commentPeople input").data("memid",memid);
    $(obj).parents(".commentModule").find(".commentPeople input").data("evaluate_time_s",evaluate_time_s);
    $(obj).parents(".commentModule").find(".commentPeople input").data("virtual",virtual);
    $(obj).parent(".operation").css("right","-1.5rem");
}
//  回复按钮
function replyBtn(obj){
    var replyName=$(obj).siblings("input").attr("placeholder").substring(2);//被回复者姓名
    var inputVal=$(obj).siblings("input").val();//回复的内容,输入框的内容
    var replyContent=$(obj).siblings("input").data("content");//被回复的内容
    var evid=$(obj).siblings("input").data("evid");//被回复评论id
    var memid=$(obj).siblings("input").data("memid");//被评论人id
    var virtual=$(obj).siblings("input").data("virtual");//虚拟
    var evaluate_time_s=$(obj).siblings("input").data("evaluate_time_s");//时间
        
    var belong_id = experienceJson.customer_id;//心得所属人id
    
    if(inputVal==""){
        alert("回复内容不能为空");
        return;
    }
    
    
    
    //微信名
    var wx_name = experienceJson.wx_name;
    //微信头像
    var head_img_url =  experienceJson.head_img_url;
    
    //组合评论的json
    //评论时间
    var addJson = {
    	evaluate_content :inputVal,//评论内容
    	experience_id : experienceJson.id,//心得ID
    	belong_id : experienceJson.customer_id,//心得所属人id
    	evaluate_member_name : experienceJson.wx_name,//评论人姓名
    	evaluate_member_id : experienceJson.customer_id,//评论人ID
    	is_read : 0,//是否已读
    	is_virtual : 0,//是否虚拟
    	point_count : 0,//点赞数
    }
    
    //有回复信息
    //需要更改内容，暂时搁浅
    if (replyContent != null && replyContent != ''){
    	addJson.answer_member_id = memid,//被回复者的id
    	addJson.answer_member_name = replyName,//被回复者的名字
    	addJson.answer_experience_evaluate_id = evid,//被回复者的心得评论id
    	addJson.answer_experience_evaluate_content = replyContent//被回复者的心得评论内容
    }
    
    var addJsonStr = JSON.stringify(addJson);
    
    $("#replyButt").attr("disabled", true); 
    
        
    //虚拟评论,判断时间
    if(virtual == 1){
    	 //获取系统当前时间 queyNowTimeByServer 该方法是common.js里面的方法
    	//既可以使用时间字符串直接比较大小也可以将时间字符串转换为秒后比较大小，我采用的后者。
    	var currTime = new Date(queyNowTimeByServer()).getTime();
    	if (evaluate_time_s > currTime ){
    		alert("超当前时间的评论，禁止回复")
    		//恢复默认的回复样式，清除回复里面的内容
    		$(obj).siblings("input").data("content","");
    		$(obj).siblings("input").data("evaluate_time_s","");
    		$(obj).siblings("input").data("virtual","");
    		$(obj).siblings("input").attr("placeholder","谢谢你长这么好看还来给我评论!");
    		$(obj).siblings("input").val("")
    		return
    	}
    }
    //ajax，进行添加评论
    $.ajax({
	    url : getRootPath()+"/experience/saveExperienceEvaluate.action",
	    type : "post",
	    data:{addJsonStr:addJsonStr},
	    async: false,//同步
	    "dataType":"text",
	    success : function (gdata) {
	    	$("#replyButt").attr("disabled", false); 
	    	//判断返回值
	    	if (gdata.indexOf(",") > 0){
	    		//成功
	    		var id = gdata.split(",")[1];
	    		addEvaluation(obj,id,belong_id,replyContent,head_img_url,wx_name,inputVal,replyName);
	    		//评论成功，需要+1
	    		 var ev = $("#evaluate_amount").text(); 
	    		 if (ev == 0){
	    			$('#noCommentList').hide();
	    			$('#commentMore').show();
	    		 }
	    		 commentMore(1);
	    	}else{
	    		//失败
	    		alert("回复失败")
	    	}
	    },error:function(){
			alert("添加失败，请关闭浏览器重试或联系管理员！");
			$("#replyButt").attr("disabled", false); 
		}
	});
}



function addEvaluation(obj,id,belong_id,replyContent,head_img_url,wx_name,inputVal,replyName){
	var html="";
    if(replyContent!="") {
        html+='<div class="commentList clear" data-id='+id+' data-memid='+belong_id+'>'
            +'    <div class="portrait left"><img src='+head_img_url+'></div>'
            +'    <div class="content left">'
            +'        <div class="peopleName clear">'
            +'            <div class="left"><span class="commName">'+wx_name+'</span><div class="time">刚刚</div></div>'
            +'            <div class="right" style="position: relative">'
            +'                <div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="false">'
            +'                    <img class="left like" style="display: none" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png">'
            +'                    <img class="left yiLike" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png">'
            +'                    <span>赞</span>'
            +'                </div>'
            +'                <span class="listMore" data-active="false" onclick="popup(this)">···</span>'
            +'                <div class="operation" style="right: -1.5rem;">'
            +'                    <span class="delter left" style="color: #f00;margin-right: .2rem" onclick="delComment(this)">删除</span>'
            +'                    <span class="reply left" onclick="reply(this)">回复</span>'
            +'                </div>'
            +'            </div>'
            +'        </div>'
            +'        <div class="commentCon">'+inputVal+'</div>'
            +'        <div class="replyPeople">@ '+replyName+'：<span style="color:#404040">'+replyContent+'</span></div>'
            +'    </div>'
            +'</div>';
    }else{
        html+='<div class="commentList clear" data-id='+id+' data-memid='+belong_id+'>'
            +'    <div class="portrait left"><img src='+head_img_url+'></div>'
            +'    <div class="content left">'
            +'        <div class="peopleName clear">'
            +'            <div class="left"><span class="commName">'+wx_name+'</span><div class="time">刚刚</div></div>'
            +'            <div class="right" style="position: relative">'
            +'                <div class="left" style="margin-right: .2rem;cursor: pointer" onclick="like(this)" data-active="false">'
            +'                    <img class="left like" style="display: none" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xYiLike.png">'
            +'                    <img class="left yiLike" src="http://bon-xiaochengxu.oss-cn-shanghai.aliyuncs.com/home/consult/xLike.png">'
            +'                    <span>赞</span>'
            +'                </div>'
            +'                <span class="listMore" data-active="false" onclick="popup(this)">···</span>'
            +'                <div class="operation">'
            +'                    <span class="delter left" style="color: #f00;margin-right: .2rem" onclick="delComment(this)">删除</span>'
            +'                    <span class="reply left" onclick="reply(this)">回复</span>'
            +'                </div>'
            +'            </div>'
            +'        </div>'
            +'        <div class="commentCon">'+inputVal+'</div>'
            +'    </div>'
            +'</div>';
    }
    //$(obj).parents(".commentPeople").after(html);
    $(obj).siblings("input").data("content","");
    $(obj).siblings("input").attr("placeholder","谢谢你长这么好看还来给我评论!");
    $(obj).siblings("input").val("")
}

//  加入购物车
function addShopping(){
    alert("后台预览不支持购买")
}

//分页查询
function commentMore(index){
	
	var startIndex = "";
	var lengthIndex = "";
	
	$('#commentList').show();
	
	if (index == 0){
		//普通分页
		pageClick += 1;
		startIndex = start = $('#commentList').children().length;
		lengthIndex = length;
	}else{
		//刷新列表
		startIndex = 0;
		lengthIndex = $('#commentList').children().length+1
	}
	
	//点击一下记录一下
	var addJsonStr = {
		start : startIndex,
		length : lengthIndex,
		experience_id : experienceJson.id,
		member_id :experienceJson.emp_id
	}
	$.ajax({
	    url : getRootPath()+"/experience/listExperienceEvaluate.action",
	    type : "post",
	    data:addJsonStr,
	    async: false,//同步
	    "dataType":"json",
	    success : function (gdata) {
	    	console.log(gdata)
	    	if (index == 0){
	    		commLength += gdata.data.length;//计算长度
	    	}else{
	    		//清空列表
	    		$("#commentList").empty();
	    		$('#evaluate_amount').html(gdata.recordsTotal);
	    	}
	    	if (gdata.data.length>0){
    			addToCommentList(gdata.data);
    		}else{
    			$('#commentMore').hide();
    		}
	    }
	});
}

function addToCommentList(evaluation){
	for (var i=0;i<evaluation.length;i++){
		//追加样式
		var htm = paddingCommentHtml(evaluation[i]);
		$("#commentList").append(htm);
	}
}

//计算时间差
function dateDesc(d) {
	var date = new Date(d);
	var timediff =( new Date(queyNowTimeByServer())- date) / (1000 * 60);
	if (timediff < 0){
		return d.substring(0,10);
	}
	if(timediff <= 10) {
		return "刚刚";
	} else if(timediff <= 60) {
		return parseInt(timediff)+"分钟前";
	} else if(timediff <= 60 * 24){
		return parseInt(timediff/60) + (timediff%60>=30?"个半":"") + "小时前";
	}
	return d.split(" ")[0]
}
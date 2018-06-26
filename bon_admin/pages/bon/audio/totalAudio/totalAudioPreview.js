var id=getUrlParam("id");
var flag = getUrlParam("flag");

$(function(){
	initData();
	//点击返回
	$(".back").click(function(){
		window.location.href=getRootPath()+"/pages/bon/audio/totalAudio/totalAudioManage.jsp?flag="+flag;
	})
})

function initData(){
	layui.use('form',function(){
		var form = layui.form;
		$.ajax({
			url:getRootPath() + '/totalAudio/previewById.action',
			type:'post',
			dataType:'json',
			async:false,
			data:{
				"id":id
			},
			success:function(result){
				console.log(result);
				var totalAudioPreview = result.totalAudioPreview;
				$(".poster img").attr("src",totalAudioPreview.audio_img_url);//封面图
				$(".title").html(totalAudioPreview.title);//标题
				if(totalAudioPreview.lastUpdateTime!=null){//有分集的时候才有最后更新时间，没有则不显示
					$(".updateTime").html("最后更新："+totalAudioPreview.lastUpdateTime);
				}
				$(".playNumber span").eq(0).html(totalAudioPreview.real_play_amount+totalAudioPreview.unreal_play_amount);
				$(".hoster_icon img").attr("src",totalAudioPreview.head_img_url);//主播头像
				$(".hoster_name").html(totalAudioPreview.wx_name);
				$("#dietitian_introduction").html(totalAudioPreview.dietitian_introduction);//主播简介
				$(".content_info p").html(totalAudioPreview.brief_introduce);//内容简介
				/**收费金额显示判断**/
				if(totalAudioPreview.is_pay==0){//免费
					$(".moneyTips").hide();
				}else{//收费
					$(".moneyTips").show();
					$(".moneyTips span").eq(1).html(totalAudioPreview.now_bon_point);
					if(totalAudioPreview.original_bon_point!=0){
						$(".moneyTips span").eq(2).html(totalAudioPreview.original_bon_point);
					}
				}
				
				var str = "";
				if(result.eachAudio.length==0){
					str="<div style='width:5rem;height:1rem;margin:0 auto;line-height:1rem;text-align:center;'>暂无相关节目信息</div>"
						$(".jiemu_list").append(str);
				}else{
		
				       $.each(result.eachAudio,function(i,n){
				        	str += '<li>											'
				                +'	     <span>'+n.audio_num+'</span>               '
				                +'	     <div class="jm_itemTop">                          '
				                +'	         <span>'+n.title+'</span>               '
				               // +'	         <span>2018-03</span>                      '
				                +'	     </div>                                            '
				                +'	     <div class="jm_itemBottom">                       '
				                +'	         <div class="listen_number">                   '
				                +'	             <img src="../img/samllListen.png" alt=""> '
				                +'	             '+(n.real_play_amount+n.unreal_play_amount)+'   '
				                +'	         </div>                                        '
				                +'	         <div class="judge_number">                    '
				                +'	             <img src="../img/msgIcon.png" alt="">     '
				                +'	             '+(n.real_evaluate_amount+n.unreal_evaluate_amount)+'    '
				                +'	         </div>                                        '
				                +'	         <div class="audio_time">                      '
				                +'	             <img src="../img/timeIcon.png" alt="">    '
				                +'	             '+change(n.time_length)+'                 '
				                +'	         </div>                                        '
				                +'	     </div>                                            '
				                +'</li>                                                 '
				        });
				        $(".jiemu_list").append(str);
				}
			}
		});
	});
}

//秒转换成分钟
function change(s) {
	  var t;
	  if (s > -1) {
	    var min = Math.floor(parseInt(s) / 60) % 60;
	    var sec = s % 60;
	    if (min < 10) { t = "0" + min + ":"; }else{
	    	t=min+':'
	    }
	    if (sec < 10) { t += "0"; }
	    t += sec;
	  }
	  return t;
}


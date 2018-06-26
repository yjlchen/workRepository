var audio = function (){
	this.left = '<div class="app-fields js-fields-region module_div">'
	+'    <div class="app-fields ui-sortable">'
	+'        <div class="app-field clearfix editing"><div class="control-group">'
	+'            <div class="custom-audio">'
	+'                <div class="custom-audio-weixin clearfix">'
	+'                    <img src="https://img.yzcdn.cn/upload_files/2016/02/16/ba0ce73b67d5347b9c691b6be9107dda.jpeg?imageView2/2/w/80/h/80/q/75/format/webp" width="40" height="40" class="custom-audio-logo">'
	+'                    <span class="custom-audio-bar">'
	+'                        <img class="js-animation hide" src="https://b.yzcdn.cn/v2/image/wap/audio/player.gif" alt="播放器动画" width="13" height="17">'
	+'                        <i class="custom-audio-animation-static js-animation-static"></i>'
	+'                    </span>'
	+'                    <span class="custom-audio-time js-duration"></span>'
	+'                </div>'
	+'				  <div class="custom-audio-music" style="display:none">'
    +'    				<i class="custom-audio-btn js-trigger"></i>'
    +'    				<span class="custom-audio-title"></span>'
    +'    				<span class="custom-audio-status js-status"></span>'
    +'        				<span class="custom-audio-time">'
    +'            			<span class="js-current-time"></span>'
    +'            			<span class="js-duration"></span>'
    +'        			</span>'
    +'    				<span class="custom-audio-timeline js-percentage"></span>'
    +'				  </div>'
	+'            </div>'
	+'        </div>'
	+'            <div class="actions">'
	+'                <div class="actions-wrap">'
	//+'                    <span class="action edit">编辑</span>'
	//+'                    <span class="action add">加内容</span>'
	+'                    <span class="action delete">删除</span>'
	+'                </div>'
	+'            </div>'
	+'            <div class="sort">'
	+'                <i class="sort-handler"></i>'
	+'            </div>'
	+'        </div>'
	+'    </div>'
	+'</div>';
	
	
	this.right = 
		'<div class="app-sidebar">														'
	+'		<div class="arrow"></div>                                                   '
	+'<div class="app-sidebar-inner js-sidebar-region">'
	+'    <div>'
	+'        <form class="form-horizontal edit-audio" novalidate="">'
	+'            <div class="control-group" style="margin-bottom:0;">'
	+'                <label class="control-label">音频：</label>'
	+'                <div class="controls" style="margin-left:0;">'
	+'                    <input type="hidden" name="audio">'
	+'                    <a href="javascript:;" class="js-choose-audio control-action">选择音频</a>'
	+'                </div>'
	+'            </div>'
	+'            <div class="control-group" style="margin-bottom:0;">'
	+'                <label class="control-label">样式：</label>'
	+'                <div class="controls mfwx" style="margin-left:0;">'
	+'                    <label class="radio">'
	+'                        <input type="radio" name="style" value="0" checked="">模仿微信对话样式'
	+'                    </label>'
	+'                    <div class="control-group control-group-inner">'
	+'                        <label class="control-label">头像：</label>'
	+'                        <div class="controls">'
	+'                            <div class="clearfix">'
	+'                                <img src="https://img.yzcdn.cn/upload_files/2016/02/16/ba0ce73b67d5347b9c691b6be9107dda.jpeg?imageView2/2/w/80/h/80/q/75/format/webp" class="edit-audio-avatar">'
	+'                                <div class="edit-audio-avatar-action">'
	+'                                    <div>'
	+'                                        <a href="javascript:;" class="js-upload-avatar">上传头像</a>'
	+'                                        <span class="c-gray"> | </span>'
	+'                                        <a href="javascript:;" class="js-use-default-avatar">使用店铺logo</a>'
	+'                                    </div>'
	+'                                    <p class="help-desc">建议尺寸80*80像素</p>'
	+'                                    <p class="help-desc">如果不设置，默认将使用店铺logo</p>'
	+'                                </div>'
	+'                            </div>'
	+'                        </div>'
	+'                    </div>'
	+'                    <div class="control-group control-group-inner">'
	+'                        <label class="control-label">气泡：</label>'
	+'                        <div class="controls">'
	+'                            <label class="radio inline">'
	+'                                <input type="radio" name="bubble" value="left" checked="">'
	+'                                居左'
	+'                            </label>'
	+'                            <label class="radio inline">'
	+'                                <input type="radio" name="bubble" value="right">'
	+'                                居右'
	+'                            </label>'
	+'                        </div>'
	+'                    </div>'
	+'                    <label class="radio">'
	+'                        <input type="radio" name="style" value="1">简易音乐播放器'
	+'                    </label>'
	+'                </div>'
	+'<div class="controls jyyy" style="margin-left:0;display:none">'
	+'    <label class="radio">'
	+'        <input type="radio" name="style" value="0">模仿微信对话样式'
	+'    </label><br>'
	+'    <label class="radio">'
	+'        <input type="radio" name="style" value="1">简易音乐播放器'
	+'    </label>'
	+'    <div class="control-group control-group-inner">'
	+'        <label class="control-label">标题：</label>'
	+'        <div class="controls">'
	+'            <input type="text" placeholder="标题" name="title" value="">'
	+'        </div>'
	+'    </div>'
	+'    <div class="control-group control-group-inner">'
	+'        循环：'
	+'        <label class="checkbox inline">'
	+'            <input type="checkbox" name="loop" value="0">开启循环播放'
	+'        </label>'
	+'    </div>'
	+'</div>'
	+'            </div>'
	+'            <div class="control-group">'
	+'                <label class="control-label">播放：</label>'
	+'                <div class="controls" style="margin-left: 0;width: 335px;display: inline-block;">'
	+'                    <label class="radio">'
	+'                        <input type="radio" name="reload" value="1" checked="">暂停后再恢复播放时，从头开始'
	+'                    </label>'
	+'                    <label class="radio">'
	+'                        <input type="radio" name="reload" value="0">暂停后再恢复播放时，从暂停位置开始'
	+'                    </label>'
	+'                </div>'
	+'            </div>'
	+'        </form>'
	+'    </div>'
	+'</div></div>';
}
//样式的转换
$(modality).on("click","input[name='style']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
	var val=$(this).val();
	if(val==0){
		var lab=$(this).parents(".control-group").find(".radio input[name='style']");
		for(var i=0;i<lab.length;i++){
			if(i==0){
				$(lab[i]).prop("checked",true);
				$(this).parents(".control-group").find(".mfwx").show();
				$(this).parents(".control-group").find(".jyyy").hide();
				$(module.children()[ind]).find(".control-group .custom-audio").children().hide();
				$(module.children()[ind]).find(".control-group .custom-audio-weixin").show();
			}else{
				$(lab[i]).prop("checked",false);
			}
		}
	}else if(val==1){
		var lab=$(this).parents(".control-group").find(".radio input[name='style']");
		for(var i=0;i<lab.length;i++){
			if(i==3){
				$(lab[i]).prop("checked",true);
				$(this).parents(".control-group").find(".mfwx").hide();
				$(this).parents(".control-group").find(".jyyy").show();
				$(module.children()[ind]).find(".control-group .custom-audio").children().hide();
				$(module.children()[ind]).find(".control-group .custom-audio-music").show();
			}else{
				$(lab[i]).prop("checked",false);
			}
		}
	}
});
//气泡的居左和居右
$(modality).on("click","input[name='bubble']",function(){
	$(this).attr("checked",true);
	$(this).parents().siblings().children().attr("checked",false);
	var ind=$(this).parents("div.app-sidebar").index();
	var val=$(this).val();
	if(val=="left"){
		$(module.children()[ind]).find(".control-group .custom-audio>div.custom-audio-weixin").removeClass("custom-audio-weixin-right");
	}else if(val=="right"){
		$(module.children()[ind]).find(".control-group .custom-audio>div.custom-audio-weixin").addClass("custom-audio-weixin-right");
	}
});
//更换头像
$(modality).on("click",".mfwx .edit-audio-avatar-action a",function(){
	var ind=$(this).parents("div.app-sidebar").index();
	var cla=$(this).attr("Class");
	console.log("cc");
	if(cla=="js-upload-avatar"){
		$(this).parents(".mfwx").find(".clearfix img").attr("src","https://img.yzcdn.cn/upload_files/2017/08/12/FvzJ8UB3yDi86JK3YxGygbumLxGO.gif?imageView2/2/w/240/h/240/q/75/format/gif");
		$(module.children()[ind]).find(".control-group .custom-audio-weixin img").attr("src","https://img.yzcdn.cn/upload_files/2017/08/12/FvzJ8UB3yDi86JK3YxGygbumLxGO.gif?imageView2/2/w/240/h/240/q/75/format/gif");
	}else if(cla=="js-use-default-avatar"){
		$(this).parents(".mfwx").find(".clearfix img").attr("src","https://img.yzcdn.cn/upload_files/2016/02/16/ba0ce73b67d5347b9c691b6be9107dda.jpeg?imageView2/2/w/80/h/80/q/75/format/webp");
		$(module.children()[ind]).find(".control-group .custom-audio-weixin img").attr("src","https://img.yzcdn.cn/upload_files/2016/02/16/ba0ce73b67d5347b9c691b6be9107dda.jpeg?imageView2/2/w/80/h/80/q/75/format/webp");
	}
});
//显示标题
$(modality).on("blur",".jyyy input[name='title']",function(){
	var ind=$(this).parents("div.app-sidebar").index();
	var val=$(this).val();
	$(module.children()[ind]).find(".control-group .custom-audio-music .custom-audio-title").text(val);
});









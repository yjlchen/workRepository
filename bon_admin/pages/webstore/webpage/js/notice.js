
var notice = function (){
	this.left = 
		'	<div class="app-field clearfix editing module_div" >'
		+'		<div class="control-group">'
		+'			<div class="custom-notice">'
		+'				<div class="custom-notice-inner">'
		+'					<div class="custom-notice-scroll">'
		+'						<span>公告：请填写内容，如果过长，将会在手机上滚动显示</span>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'		<div class="actions">'
		+'			<div class="actions-wrap">'
		//+'				<span class="action edit">编辑</span>'
		//+'				<span class="action add">加内容</span>'
		+'				<span class="action delete">删除</span>'
		+'			</div>'
		+'		</div>'
		+'		<div class="sort">'
		+'			<i class="sort-handler"></i>'
		+'		</div>'
		+'	</div>'
		
		
		
		
	this.right = 
		'	<div class="app-sidebar">'
		+'		<div class="arrow"></div>'
		+'		<div class="app-sidebar-inner js-sidebar-region"><div>'
		+'		<form class="form-horizontal edit-tpl-11-11" novalidate="" onsubmit="return false">'
		+'		<div class="control-group">'
		+'			<label class="control-label" style="width:50px;">公告：</label>'
		+'			<div class="controls" style="display:block;margin-left:50px;">'
		+'				<input style="width: 335px;" type="text" name="content" '
		+'					value="" class="input-xxlarge" placeholder="请填写内容，如果过长，将会在手机上滚动显示">'
		+' 				<p class="help-block notice-error-message" id="noticeError" style="display:none;color: red">请填写公告内容</p>'
		+'			</div>'
		+'		</div>'
		+'		</form>'
		+'		</div></div>'
		+'	</div>'
}


	//公告内容变化事件
	$(modality).on("blur","input[name='content']",function(){
	    var ind = $(this).parents("div.app-sidebar").index();
	    var txt = $(this).val();
	    if(txt == ""){
	    	$(module.children()[ind]).find(".custom-notice span").html('公告：请填写内容，如果过长，将会在手机上滚动显示'); 
	    	$(modality.children()[ind]).find("#noticeError").css("display","block");
		}else{
			$(module.children()[ind]).find(".custom-notice span").html('公告：'+txt); 
			$(modality.children()[ind]).find("#noticeError").css("display","none");
		}
	    $(this).attr("value",txt);
	});



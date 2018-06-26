/*声明全局变量*/
var selectedIndex=0;
//将selectedIndex的值变为最大
var richText=$("div[name='rich_text']");
for(var i=0;i<richText.length;i++){
	var ueid=$(richText[i]).attr("ueid");
	var num=Number($(richText[i]).attr("ueid").substring(6));
	if(num>selectedIndex){
		selectedIndex=num;
	}
}
selectedIndex+=1;
/*if(numArr.length == 0){
	//数组为空时，初始为0
	selectedIndex = 0;
}else{
	//数组不为空时，取数组当前的最大值
	selectedIndex = Math.max.apply(null, numArr)+1;
}*/
//富文本对象
var rich_text=function (){
	this.left = 
		' <div class="app-field clearfix editing module_div" name="rich_text" ueid="editor'+selectedIndex+'">'
		+'<div class="control-group" >'
		+'	<div class="custom-richtext"  id="leftText_'+selectedIndex+'">'
		//+'	<div class="custom-richtext"  id="leftRichtext">'
		+'	<p>点此编辑『富文本』内容 ——&gt;</p>'
		+'	<p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、 '
		+'	<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、'
		+'	<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、'
		+'	以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p>'
		+'	<p>还可以在这里加入表格了</p>'
		+'	<table><tbody>'
		+'	<tr><td width="93" valign="top" style="word-break: break-all;">中奖客户</td>'
		+'   	<td width="93" valign="top" style="word-break: break-all;">发放奖品</td>'
		+'	 	<td width="93" valign="top" style="word-break: break-all;">备注</td></tr>'
		+'	<tr><td width="93" valign="top" style="word-break: break-all;">猪猪</td>'
		+'		<td width="93" valign="top" style="word-break: break-all;">内测码</td>'
		+'		<td width="93" valign="top" style="word-break: break-all;"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td></tr>'
		+'	<tr><td width="93" valign="top" style="word-break: break-all;">大麦</td> '
		+' 		<td width="93" valign="top" style="word-break: break-all;">积分</td>'
		+'		<td width="93" valign="top" style="word-break: break-all;"><a href="javascript: void(0);" target="_blank">领取地址</a></td></tr>'
		+'	</tbody></table>'
		+'	<p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>'
		+'	</div>'
		+'	<div class="component-border"></div> '
		+'	</div>'
		+'	<div class="actions">'
		+'	<div class="actions-wrap">'
		//+'		  <span class="action edit">编辑</span>'
		//+'		  <span class="action add">加内容</span>'
		+'		 	  <span class="action delete">删除</span>'
		+'	</div>'
		+'	</div>'
		+'	<div class="sort">'
		+'		<i class="sort-handler"></i>'
		+'	</div>'
		+'	</div>'

	this.right = 
		 '<div class="app-sidebar" style="margin-top: 0px;">'
        +'	<div class="arrow"></div>'
		+'  <div class="app-sidebar-inner js-sidebar-region" >'
		+'		<div class="edit-rich-text">'
		+'	 		<form class="form-horizontal" novalidate="">'
		+'				<div class="control-group">'
		+'					<div class="pull-left">'
		+'						<label class="control-label">背景颜色：</label>'
		+'						<div class="input-append">'
		+'							<input type="color" value="#ffffff" name="color" class="span1" style="width: 200px;">'
		+'							<button class="btn js-reset-bg" type="button">重置</button> '
		+'						</div>'
		+'					</div>'
		/*+'				<div class="pull-left">'
		+'						<label class="control-label">是否全屏：</label>'
		+'						<label class="checkbox inline">'
		+'							<input type="checkbox" name="fullscreen"> 全屏显示 '
		+'						</label>'
		+'					</div>'*/
		+'    			</div>'
		+'				<div class="control-group">'
		+'					<div><script id="editor'+selectedIndex+'" type="text/plain"></script></div>'
		//+'				<div><script id="editorwym" type="text/plain"></script></div>'
		+'					<script type="text/javascript">'
		+'						var editor'+selectedIndex+' = UE.getEditor("editor'+selectedIndex+'",{elementPathEnabled : false,wordCount:false});'
		//+'					var ue = UE.getEditor("editorwym",{elementPathEnabled : false,wordCount:false});'
		+'					</script>'
		+'				</div>'
		+'			</from>'
		+'		</div>'
		+'	</div>'
		+'</div>';

	selectedIndex += 1;
};


//背景颜色修改
$(modality).on("change","input[name='color']",function(){
    var ind=$(this).parents("div.app-sidebar").index();
    var txt=$(this).val();
    $(module.children()[ind]).find("div.custom-richtext").css("background-color",txt);
});

//颜色重置
$(modality).on("click","button[type='button']",function(){
    $(this).prev("input[name='color']").val("#ffffff");
    var ind=$(this).parents("div.app-sidebar").index();
    $(module.children()[ind]).find("div.custom-richtext").css("background-color","");
});


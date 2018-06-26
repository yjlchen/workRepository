
var white = function (){
this.left = 
	'	<div class="app-field clearfix editing  module_div">'
	+'	  <div class="control-group">'
	+'		<div class="custom-white text-center" style="height: 30px;">'
	+'		</div>'
	+'		<div class="component-border"></div>'
	+'	  </div>'
	+'	<div class="actions">'
	+'		<div class="actions-wrap">'
	//+'		  <span class="action edit">编辑</span>'
	//+'		  <span class="action add">加内容</span>'
	+'		 	  <span class="action delete">删除</span>'
	+'		</div>'
	+'	</div>'
	+'	<div class="sort">'
	+'		<i class="sort-handler"></i>'
	+'	</div>'
	+'	</div>'
	
		
this.right = 
	'<div class="app-sidebar">'
	+'	<div class="arrow"></div>'
	+'	<div class="app-sidebar-inner js-sidebar-region"><div>'
	+'	<div class="control-group white-space-group">'
	+'	<label class="control-label" style="position:absolute;text-align: right;top: 5px;">空白高度：</label>'
	+'	<div class="controls controls-slider" >'
	+'	<div class="js-slider white-space-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false" '
	+'      style="border-radius: 6px;box-shadow: inset 0 1px 1px rgba(0,0,0,.15);background: #f5f5f5;">'
	+'		<a class="ui-slider-handle ui-state-default ui-corner-all" href="javascript:;" '
	+'  		style="left:23%;background:#ddd;border-radius:50%;border: 1px solid #aaa;"></a>'
	+'	</div>'
	+'	<div class="slider-height"><span class="js-height">30</span> 像素</div>'
	+'		<div style="margin-top:15px">'
	+'		<button class="decresae" style="margin:0 30px 0">减小空白</button>'
	+'		<button class="magnify">增大空白</button>'
	+'		</div>'
	+'	</div>'
	+'	</div>'
	+'</div></div>'
	+'</div>'
}

//鼠标滑入按钮
$(modality).on("mouseenter",".controls .js-slider a",function(){
	$(this).css({"background":"#e3f3ee","border":"1px solid #008620"});
});
//鼠标滑出按钮
$(modality).on("mouseleave",".controls .js-slider a",function(){
	$(this).css({"background":"#ddd","border":"1px solid #aaa"});
});
//鼠标点击滑动事件
$(modality).on("mousedown",".app-sidebar .controls .js-slider",function(e){
	 //var offset = $(this).offset();
	 var ind=$(this).parents("div.app-sidebar").index();
	 var relativeX = (e.pageX - $(this).offset().left);
	 relativeX=(relativeX/230).toFixed(2)*100;
	 var num= Math.ceil(relativeX*0.9)+10;
	 if(relativeX<=0){
		 num=10;
		 relativeX=0;
	 }else if(relativeX>=100){
		 num=100;
		 relativeX=100;
	 }
	 var left=relativeX+"%";
	 $(this).children("a").css("left",left);
	 $(this).next().find("span").text(num)
	 $(module.children()[ind]).find(".control-group .custom-white").css("height",num);
	 if(num>=100){
		 $(modality.children()[ind]).find(".controls div .magnify").attr("disabled",true);
	 }else if(num<=10){
		 $(modality.children()[ind]).find(".controls div .decresae").attr("disabled",true);
	 }else {
		 $(modality.children()[ind]).find(".controls div button").attr("disabled",false);
	 }
});
//点击按钮减小空白
$(modality).on("click",".app-sidebar .controls .decresae",function(){
	var ind=$(this).parents("div.app-sidebar").index();
	var span=$(this).parent().prev().children("span");
	var num=span.text();
	num--;
	span.text(num);
	if(num==10){
		$(this).attr("disabled",true);
	}
	var left=Math.ceil((num-10)/0.9)+"%";
	$(this).next().attr("disabled",false);
	$(module.children()[ind]).find(".control-group .custom-white").css("height",num);
	$(modality.children()[ind]).find(".controls .js-slider a").css("left",left);
});
//点击按钮增加空白
$(modality).on("click",".app-sidebar .controls .magnify",function(){
	var ind=$(this).parents("div.app-sidebar").index();
	var span=$(this).parent().prev().children("span");
	var num=span.text();
	num++;
	span.text(num);
	if(num==100){
		$(this).attr("disabled",true);
	}
	$(this).prev().attr("disabled",false);
	var left=Math.ceil((num-10)/0.9)+"%";
	$(module.children()[ind]).find(".control-group .custom-white").css("height",num);
	$(modality.children()[ind]).find(".controls .js-slider a").css("left",left);
});





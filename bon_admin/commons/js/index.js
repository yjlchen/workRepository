$(function(){
    remdinder();
    setInterval('remdinder()',60000); 
})
//退款提醒页面提醒跳转
$(".msg-btn").on("click",function(){
	openTab("pages/order/refundrights/rightsOrder.jsp","退款维权",38,"退款维权");
})
//
$(".msg-btn1").on("click",function(){
	$.ajax({
		type:"post",
        url: getRootPath()+"/reminder/cancelReminder.action",
        success:function(data){
        	remdinder();
        }
	});
	openTab("pages/order/allorder/allOrder.jsp","所有订单",39,"所有订单");
})

//声明一个对象函数
var moduleCategory=function(html){
    this.html=html;
};
//当页面加载完成后判断标题栏显示隐藏
$(document).ready(function(){
	analysis();
	var win_height=$(window).height();
	var main_top=$("#admui-pageContent").offset().top;
	if($(window).width()<768){
		$("body").attr("class","site-contabs-open site-menubar-hide site-menubar-unfold");
		var height=win_height-main_top;
	}else{
		$("body").attr("class","site-contabs-open site-menubar-unfold");
		var height=win_height-main_top-80;
	}
	var ul_li=$("#admui-navMenu>ul").children();
	$(ul_li).css("display","block");
	var width=$("#admui-navMenu>ul").width();
	var li_width=ul_li.last().width();
	var dian_li=$("#admui-navbarSubMenu>ul>li");
	for(var j=0;j<dian_li.length;j++){
		if(!$(dian_li[j]).hasClass("no-menu")){
			$(dian_li[j]).remove();
		}
	}
	var html="";
	for(var i=0;i<(ul_li.length-1);i++){
		li_width+=$(ul_li[i]).width();
		if(width<li_width){
			html+=$(ul_li[i]).prop("outerHTML");
			$(ul_li[i]).css("display","none");
			$("#admui-navbarSubMenu").show()
		}else{
			$(ul_li[i]).css("display","block");
			$("#admui-navbarSubMenu").hide()
		}
	}
	$("#admui-navbarSubMenu>ul").prepend(html);
	$("#admui-pageContent>div").css({"height":height});
});
//当窗口发生变化后判断标题栏显示隐藏
$(window).resize(function(){
	var win_height=$(window).height();
	var main_top=$("#admui-pageContent").offset().top;
	if($(window).width()<768){
		$("body").attr("class","site-contabs-open site-menubar-hide site-menubar-unfold");
		var height=win_height-main_top;
	}else{
		$("body").attr("class","site-contabs-open site-menubar-unfold");
		var height=win_height-main_top-40;
	}
	var ul_li=$("#admui-navMenu>ul").children();
	$(ul_li).css("display","block");
	var width=$("#admui-navMenu>ul").width();
	var li_width=ul_li.last().width();
	var dian_li=$("#admui-navbarSubMenu>ul>li");
	for(var j=0;j<dian_li.length;j++){
		if(!$(dian_li[j]).hasClass("no-menu")){
			$(dian_li[j]).remove();
		}
	}
	var html="";
	for(var i=0;i<(ul_li.length-1);i++){
		li_width+=$(ul_li[i]).width();
		if(width<li_width){
			html+=$(ul_li[i]).prop("outerHTML");
			$(ul_li[i]).css("display","none");
			$("#admui-navbarSubMenu").show()
		}else{
			$(ul_li[i]).css("display","block");
			$("#admui-navbarSubMenu").hide()
		}
	}
	$("#admui-navbarSubMenu>ul").prepend(html);
	var div_width=$("#admui-siteConTabs>div.contabs-scroll").width();
	var ul_width=$("#admui-siteConTabs>div.contabs-scroll>ul").width();
	if(div_width<ul_width){
		$("#admui-siteConTabs button.btn-default").removeClass("hide");
	}else{
		$("#admui-siteConTabs button.btn-icon").addClass("hide");
		$("#admui-siteConTabs>div.contabs-scroll>ul").css("left",0);
	}
	$("#admui-pageContent>div").css({"height":height});
});
//点击页面让多出来的隐藏
$("body").on("click",function(){
    $("#admui-navbarSubMenu").removeClass("open");
    $("#admui-siteConTabs>div.pull-right").removeClass("open");
	$("#admui-demo-app").removeClass("open");
	$("#admui-pageContent button[data-id='skintoolsSidebar']").parent().removeClass("open");
});
//点击主菜单选项改变左边二级菜单选项
$("#admui-navMenu").on("click","li[role='presentation']>a",function(e){
    e.preventDefault();
	if($(window).width()<768){
		$("html").addClass("disable-scrolling");
		$("body").removeClass("site-menubar-hide").addClass("site-menubar-open");
		$("#navbar-header button[data-toggle='menubar']").removeClass("hided");
	}
    var id=$(this).attr("href").substring(1);
    $(this).parent().siblings().removeClass("active");
    $(this).parent().addClass("active");
    $("#"+id).siblings().removeClass("active");
    $("#"+id).addClass("active");
});
//当主菜单隐藏之后点击隐藏的选项改变左边二级菜单选项
$("#admui-navbarSubMenu").on("click","li[role='presentation']>a",function(e){
	e.preventDefault();
	if($(window).width()<768){
		$("html").addClass("disable-scrolling");
		$("body").removeClass("site-menubar-hide").addClass("site-menubar-open");
		$("#navbar-header button[data-toggle='menubar']").removeClass("hided");
	}
    var id=$(this).attr("href").substring(1);
    $(this).parent().siblings().removeClass("active");
    $(this).parent().addClass("active");
    $("#"+id).siblings().removeClass("active");
    $("#"+id).addClass("active");
});
//三个点显示剩余的主菜单选项
$("#admui-navbarCollapse").on("click","#admui-navbarSubMenu",function(e){
    e.stopPropagation();
	$(this).toggleClass("open");
    //$(this).children("ul").toggle();
});
//在左边为小界面时鼠标经过时显示菜单
$("#site-menubar-body").on("mouseover","ul.site-menu>li",function(){
    if(!$("#admui-toggleMenubar").hasClass("unfolded")) {
        $("body").addClass("site-menubar-fold-hover");
        $(this).addClass("hover");
        $(this).siblings().removeClass("hover");
        $(this).children("ul").css("max-height", "488");
    }
});
//在左边为小界面时鼠标经过时隐藏菜单
$("#site-menubar-body").on("mouseout","ul.site-menu>li",function(){
    if(!$("#admui-toggleMenubar").hasClass("unfolded")) {
        $("body").removeClass("site-menubar-fold-hover");
        $(this).removeClass("hover");
        $(this).children("ul").attr("style", "");
    }
});
//点击左边二级菜单中不能弹出下拉框的选项是在右边添加li框
$("#site-menubar-body").on("click","a[data-pjax]",function(e){
	e.preventDefault();
	var href=$(this).attr("href");
	var text=$(this).text();
	var pjax=$(this).attr("data-pjax");
	var title=$(this).children("span").text();
	openTab(href,text,pjax,title);
});
function openTab(href,text,pjax,title){
	var win_height=$(window).height();
	var main_top=$("#admui-pageContent").offset().top;
	var height=win_height-main_top-40;
	$("#admui-pageContent>div").hide();
	$("#admui-navTabs li").removeClass("active");
	$(this).parent().addClass("active");
	var tobsUl=$("#admui-siteConTabs>div.contabs-scroll>ul");
	var tobsUl_li=tobsUl.children();
	var width=$(tobsUl_li[0]).width();
	var div_width=tobsUl.parent().width();
	for(var i=0;i<tobsUl_li.length;i++){
		var li_text=$(tobsUl_li[i]).children().attr("data-pjax");
		var li_title=$(tobsUl_li[i]).children().attr("title");
		if(pjax==li_text||title.indexOf(li_title)!=-1){
			tobsUl_li.removeClass("active");
			$(tobsUl_li[i]).addClass("active");
			$("#admui-pageContent>."+$(tobsUl_li[i]).children().attr("data-pjax")+"").show();
			$("#admui-pageContent>."+$(tobsUl_li[i]).children().attr("data-pjax")+"").children().attr("src",href);
			if(div_width<(i+1)*width){
				tobsUl.animate({'left':div_width-(i+1)*width+"px"});
			}else{
				tobsUl.animate({'left':'0px'});
			}
			return false;
		}
	}
	var html='<li class="active">';
	html+='<span data-pjax="'+pjax+'" href="'+href+'" title="'+text+'">';
	html+='<span>'+text+'</span>';
	html+='<i class="icon wb-close-mini"></i></span></li>';
	tobsUl_li.removeClass("active");
	tobsUl.css("width",(tobsUl_li.length+1)*width);
	tobsUl.append(html);
	if(div_width<(tobsUl_li.length+1)*width){
		$("#admui-siteConTabs button.btn-default").removeClass("hide");
		tobsUl.animate({"left":-((tobsUl_li.length+1)*width-div_width)});
	}
	var obj;
	try{
		eval("obj = new "+pjax+"();");
		var mdClass=new moduleCategory(obj.html);
		$("#admui-pageContent").append(mdClass.html);
	}
	catch(exception){
		var html='<div class="'+pjax+'">';
		html+='<iframe id='+pjax+' style="width: 100%;height:100%; display: block; border: 0px;" src="'+href+'"></iframe>';
		html+='</div>';
		$("#admui-pageContent").append(html);
	}
	$("#admui-pageContent>div").css({"height":height});
}
//单价击table页显示对应的点击项
$("#admui-siteConTabs").on("click",".contabs-scroll>ul>li>span",function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
		var cla=$(this).attr("data-pjax");
		$("#admui-pageContent>div").hide();
		$("#admui-pageContent>div."+cla).show();
		$("#admui-navTabs li").removeClass("active");
		var li_a=$("#admui-navTabs a[data-pjax='"+cla+"']");
		$("#admui-navTabs li.open").removeClass("open");
		$("#admui-navTabs li.active").removeClass("active");
		li_a.parent().addClass("active");
		li_a.parents("ul").parents("li").addClass("open");
		li_a.parents("div.tab-pane").addClass("active");
		li_a.parents("div.tab-pane").siblings().removeClass("active");
		var id=li_a.parents("div.tab-pane").attr("id");
		$("#admui-navbarCollapse a[href='#"+id+"'").parent().addClass("active");
		$("#admui-navbarCollapse a[href='#"+id+"'").parent().siblings().removeClass("active");
});
//双击table页大屏显示
$("#admui-siteConTabs").on("dblclick",".contabs-scroll>ul>li>span",function(e){
	$("#admui-siteConTabs>div.pull-right").removeClass("open");
	if($(this).attr("double")){
		$("nav.site-navbar").show();
		$("nav.site-menubar").show();
		$("#admui-siteConTabs").attr("style","");
		$("main.site-page").attr("style","");
		$("footer.site-footer").attr("style","");
		$("body").attr("style","");
		$(this).attr("double","");
		$(this).parent().siblings().children().attr("double","");
	}else{
		$("nav.site-navbar").hide();
		$("nav.site-menubar").hide();
		$("#admui-siteConTabs").css({"top":0,"margin-left":0});
		$("main.site-page").css({"margin-left":0,"margin-top":0});
		$("footer.site-footer").css({"margin-left":0});
		$("body").css({"padding-top":"40px"})
		$(this).attr("double","true");
		$(this).parent().siblings().children().attr("double","true");
	}
});
//点击单个table也上面的关闭按钮，就table页删除
$("#admui-siteConTabs").on("click",".contabs-scroll>ul>li>span>i",function(e){
	e.stopPropagation();
	if($(this).parents("li").next().length==0){
		$(this).parents("li").prev().addClass("active");
		$("#admui-pageContent>."+$(this).parents("li").prev().children().attr("data-pjax")).show();
	}else{
		$(this).parents("li").next().addClass("active");
		$("#admui-pageContent>."+$(this).parents("li").next().children().attr("data-pjax")).show();
	}
	var tobsUl=$("#admui-siteConTabs>div.contabs-scroll>ul");
    var tobsUl_li=tobsUl.children();
    var width=$(tobsUl_li[0]).width();
    var div_width=tobsUl.parent().width();
    $(this).parents("li").remove();
    tobsUl.css("width",(tobsUl_li.length-1)*width);
    if(div_width<(tobsUl_li.length-1)*width){
        tobsUl.animate({"left":-((tobsUl_li.length-1)*width-div_width)});
    }else{
        $("#admui-siteConTabs button.btn-icon").addClass("hide");
        tobsUl.animate({"left":0});
    }
	$("#admui-pageContent>."+$(this).parent().attr("data-pjax")).remove();
});
//点击左边按钮向左边滑动
$("#admui-siteConTabs").on("click","button.pull-left",function(e){
    var tobsUl=$("#admui-siteConTabs>div.contabs-scroll>ul");
    var left=parseInt(tobsUl.css("left"));
    var div_width=tobsUl.parent().width();
    if((left+210)>=0){
        tobsUl.animate({"left":0});
    }else{
		tobsUl.animate({"left":left+280});
    }
});
//点击左边按钮向左边滑动
$("#admui-siteConTabs").on("click",".pull-right>button.btn-icon",function(e){
    var tobsUl=$("#admui-siteConTabs>div.contabs-scroll>ul");
    var left=parseInt(tobsUl.css("left"));
    var div_width=tobsUl.parent().width();
    if((-left+210)>(tobsUl.width()-div_width)){
        tobsUl.animate({"left":div_width-tobsUl.width()});
    }else{
        tobsUl.animate({"left":left-280});
    }
});
//点击向下的三角弹出刷新，关闭选项的对话框
$("#admui-siteConTabs>div.pull-right>button.btn-outline").on("click",function(e){
    e.stopPropagation();
    $(this).parent("div.pull-right").toggleClass("open");
	$("#admui-siteConTabs>div.pull-right>ul").css({"right":0});
});
//点击左边菜单显示隐藏对应的下一级菜单
$("#site-menubar-body").on("click","li",function(e){
    e.stopPropagation();
	if($(this).hasClass("has-sub")){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
		}else{
			$(this).siblings().removeClass("open");
			$(this).addClass("open");
		}
	}
});
//点击按钮二级菜单放大缩小
$("#admui-toggleMenubar").on("click",function(){
	var html="";
    var list_html=$("#admui-navTabs").prop("outerHTML");
    $("#site-menubar-body").children().remove();
    if($(this).hasClass("unfolded")){
        $("body").removeClass("site-menubar-unfold").addClass("site-menubar-fold");
        $(this).removeClass("unfolded");
        html=list_html;
        $("#site-menubar-body").append(html);
        $("#admui-navTabs").attr("style","");
        $("#admui-navTabs").children().attr("style","");
    }
    else{
        $("body").removeClass("site-menubar-fold").addClass("site-menubar-unfold");
        $(this).addClass("unfolded");
        html='<div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">'
        +list_html
        +'</div>';
        $("#site-menubar-body").append(html);
        $("#admui-navTabs").css({"overflow":"hidden","width":"auto","height":"100%"});
    }
});
//在左边为小界面时鼠标经过时显示菜单
$("#site-menubar-body").on("mouseover","ul.site-menu>li",function(){
    if(!$("#admui-toggleMenubar").hasClass("unfolded")) {
    	console.log($(this).children("ul"));
        $("body").addClass("site-menubar-fold-hover");
        $(this).addClass("hover");
        $(this).siblings().removeClass("hover");
        $(this).children("ul").css("max-height", "488");
    }
});
//在左边为小界面时鼠标经过时隐藏菜单
$("#site-menubar-body").on("mouseout","ul.site-menu>li",function(){
    if(!$("#admui-toggleMenubar").hasClass("unfolded")) {
        $("body").removeClass("site-menubar-fold-hover");
        $(this).removeClass("hover");
        $(this).children("ul").attr("style", "");
    }
});
//鼠标滑过标题栏右边的图标，显示对应的文字
$("#admui-navbarCollapse").on("mouseover","ul.navbar-right>li[data-toggle='tooltip']",function(){
	if($(window).width()<768){
		var html='<div class="tooltip fade bottom in" role="tooltip" id="tooltip936827" style="top: 121px; display: block;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">'+$(this).attr("data-original-title")+'</div></div>';
	}else{
		var html='<div class="tooltip fade bottom in" role="tooltip" id="tooltip936827" style="top: 60px; display: block;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">'+$(this).attr("data-original-title")+'</div></div>';
	}
	$(this).after(html);
	var li_w=$(this).width()/2;
	var div_w=$(this).next().width()/2;
	var lef=$(this).offset().left;
	var left=lef+li_w-div_w;
	$(this).next().animate({"left":left});
});
$("#admui-navbarCollapse").on("mouseout","ul.navbar-right>li[data-toggle='tooltip']",function(){
	$(this).next().remove();
});
//点击下载桌面版
$("#admui-demo-app").on("click",function(e){
	e.stopPropagation();
	$(this).toggleClass("open");
});
function requestFullScreen() {
	var de = document.documentElement;
    if (de.requestFullscreen) {
	    de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
	    de.mozRequestFullScreen();
	} else if (de.webkitRequestFullScreen) {
	    de.webkitRequestFullScreen();
	}
}
function exitFullscreen() {
	var de = document;
	if (de.exitFullscreen) {
		de.exitFullscreen();
	} else if (de.mozCancelFullScreen) {
	    de.mozCancelFullScreen();
	} else if (de.webkitCancelFullScreen) {
	    de.webkitCancelFullScreen();
	}
}
//点击全屏与取消全屏
$('#admui-navbarFullscreen').on('click', function () {
    if (!$(this).attr('fullscreen')) {
        $(this).attr('fullscreen', 'true');
        requestFullScreen();
    } else {
        $(this).removeAttr('fullscreen');
        exitFullscreen();
     }
});
//鼠标右键table页显示操作框
$("#admui-siteConTabs").on("contextmenu",".contabs-scroll>ul>li",function(e){
	e.preventDefault();
	var nav_width=$("#admui-siteConTabs").width();
	var ul_width=$("#admui-siteConTabs>div.pull-right>ul").width();
	var left=e.pageX-$("#admui-siteConTabs").offset().left;
	var right=nav_width-left-ul_width;
	$("#admui-siteConTabs>div.pull-right").addClass("open");
	$("#admui-siteConTabs>div.pull-right>ul").css({"right":right});
});
//点击刷新当前，关闭所有，关闭其他，关闭左侧，关闭右侧
$("#admui-siteConTabs").on("click","div.pull-right>ul>li",function(){
	var cla=$(this).attr("class");
	var li=$("#admui-siteConTabs>div.pull-left>ul>li");
	var fie_pajx=li.eq(0).children("span").attr("data-pjax");
	//刷新当前
	if(cla=="reload-page"){
		var $this=$("#admui-siteConTabs>div.pull-left>ul>li.active");
		var id=$this.children().attr("data-pjax");
		var li_cla=$this.children().attr("data-pjax");
		var li_href=$this.children().attr("href");
		$("#admui-pageContent>."+li_cla).remove();
		var win_height=$(window).height();
		var main_top=$("#admui-pageContent").offset().top;
		var height=win_height-main_top-40;
		var obj;
		try{
			eval("obj = new "+li_cla+"();");
			var mdClass=new moduleCategory(obj.html);
			$("#admui-pageContent").append(mdClass.html);
		}
		catch(exception){
			var html='<div class="'+li_cla+'">';
			html+='<iframe id="'+id+'" style="width: 100%;height:100%; display: block; border: 0px;" src="'+li_href+'"></iframe>';
			html+='</div>';
			$("#admui-pageContent").append(html);
		}
		$("#admui-pageContent>div").css({"height":height});
		//关闭其他
	}else if(cla=="close-other"){
		for(var i=0;i<li.length;i++){
			var li_cla=$(li[i]).attr("class");
			var txt=$(li[i]).children().attr("data-pjax");
			if(!(li_cla=="active"||txt==fie_pajx)){
				$(li[i]).remove();
				$("#admui-pageContent>."+$(li[i]).children().attr("data-pjax")).remove();
			}
		}
		//关闭所有
	}else if(cla=="close-all"){
		for(var i=0;i<li.length;i++){
			var txt=$(li[i]).children().attr("data-pjax");
			if(txt==fie_pajx){
				$(li[i]).addClass("active");
				$("#admui-pageContent>."+$(li[i]).children().attr("data-pjax")).show();
			}else{
				$(li[i]).remove();
				$("#admui-pageContent>."+$(li[i]).children().attr("data-pjax")).remove();
			}
		}
		//关闭左侧
	}else if(cla=="close-left"){
		var ind=$("#admui-siteConTabs>div.pull-left>ul>li.active").index();
		for(var i=1;i<ind;i++){
			$(li[i]).remove();
			$("#admui-pageContent>."+$(li[i]).children().attr("data-pjax")).remove();
		}
		//关闭右侧
	}else if(cla=="close-right"){
		var ind=$("#admui-siteConTabs>div.pull-left>ul>li.active").index();
		for(var i=ind+1;i<li.length;i++){
			$(li[i]).remove();
			$("#admui-pageContent>."+$(li[i]).children().attr("data-pjax")).remove();
		}
	}
});
//点击设置主题与布局按钮显示对应的table页
$("#admui-navbarDisplay").on("click",function(){
	$("#admui-pageContent>div").hide();
	var id=$(this).attr("href");
    var tobsUl=$("#admui-siteConTabs>div.contabs-scroll>ul");
    var tobsUl_li=tobsUl.children();
    var width=$(tobsUl_li[0]).width();
    var div_width=tobsUl.parent().width();
    var href=$(this).attr("href");
    var text=$(this).text();
    for(var i=0;i<tobsUl_li.length;i++){
        var li_text=$(tobsUl_li[i]).text();
        if(" 显示设置 "==li_text){
            tobsUl_li.removeClass("active");
            $(tobsUl_li[i]).addClass("active");
			$("#admui-pageContent>."+$(tobsUl_li[i]).children().attr("href")).show();
            return false;
        }
    }
    var html='<li class="active">';
    html+='<span data-pjax="show_set" href="show_set" title=" 显示设置 " rel="contents">';
    html+='<span> 显示设置 </span>';
    html+='<i class="icon wb-close-mini"></i></span></li>';
    tobsUl_li.removeClass("active");
    tobsUl.css("width",(tobsUl_li.length+1)*width);
    tobsUl.append(html);
    if(div_width<(tobsUl_li.length+1)*width){
        $("#admui-siteConTabs button.btn-default").removeClass("hide");
        tobsUl.animate({"left":-((tobsUl_li.length+1)*width-div_width)});
    }
	var obj;
    eval("obj = new show_set();");
    var mdClass=new moduleCategory(obj.html);
	$("#admui-pageContent").append(mdClass.html);
	var li_a=$("#admui-navTabs a[data-pjax='show_set']");
	$("#admui-navTabs li.open").removeClass("open");
	$("#admui-navTabs li.active").removeClass("active");
	li_a.parent().addClass("active");
	li_a.parents("ul").parents("li").addClass("open");
	li_a.parents("div.tab-pane").addClass("active");
	li_a.parents("div.tab-pane").siblings().removeClass("active");
	var id=li_a.parents("div.tab-pane").attr("id");
	$("#admui-navbarCollapse a[href='#"+id+"'").parent().addClass("active");
	$("#admui-navbarCollapse a[href='#"+id+"'").parent().siblings().removeClass("active");
});
//自定义标题大小
$("#admui-navbarSize").on("click",function(){
	var width=$("#admui-navbarCollapse .navbar-toolbar-right").innerWidth();
	var html='<div class="leftDistance" style="position: fixed;width:300px;height: 130px;top: 300px;left: calc(50% - 150px);background-color: #fff;border: 1px solid #ddd;text-align: center;border-radius: 10px"> '
			+'	<div style="font-size: 26px;margin-top: 15px">顶部菜单距左边的距离</div> '
			+'	<div style="font-size: 14px;">最小距离为：'+width+'</div>'
			+' 	<label style="margin-top: 10px">'
			+'		距离： <input style="border-radius: 5px;line-height: 26px;border: 1px solid #ddd;padding-left: 10px;-webkit-appearance：none" type="number"/> '
			+'		<text class="confirm" style="color: #fff;background-color: #51C332;padding: 3px 5px;border-radius: 5px">确定</text>'
			+'	</label>'
			+'  <div class="leftClose" style="width: 20px;height: 20px;line-height: 20px;text-align: center;cursor: pointer;position: absolute;top: -10px;right: -10px;color: #fff;border-radius: 50%;background-color: #ccc">X</div>'
			+'</div>';
	$("body").append(html);

});
//当弹出框点击确定时
$("body").on("click",".confirm",function(){
	var width=$("#admui-navbarCollapse .navbar-toolbar-right").width();
	var val=$(this).prev().val();
	if(val<width){
		var html='<div class="mistake" style="position: fixed;top: 250px;left:calc(50% - 75px);color: #fff;padding: 0 15px;border-radius: 5px;background-color: rgba(0,0,0,0.5)">填写数字小于最小距离</div>';
		$("body").append(html);
		setTimeout(function(){
			$("body>.mistake").remove();
		},3000);
		return;
	}
	$("#admui-navbarCollapse>.navbar-left").css("width","calc(100% - "+val+"px)");
	$("body>.leftDistance").remove();
	var ul_li=$("#admui-navMenu>ul").children();
	$(ul_li).css("display","block");
	var width=$("#admui-navMenu>ul").width();
	var li_width=ul_li.last().width();
	var dian_li=$("#admui-navbarSubMenu>ul>li");
	for(var j=0;j<dian_li.length;j++){
		if(!$(dian_li[j]).hasClass("no-menu")){
			$(dian_li[j]).remove();
		}
	}
	var html="";
	for(var i=0;i<(ul_li.length-1);i++){
		li_width+=$(ul_li[i]).width();
		if(width<li_width){
			html+=$(ul_li[i]).prop("outerHTML");
			$(ul_li[i]).css("display","none");
			$("#admui-navbarSubMenu").show()
		}else {
			$(ul_li[i]).css("display", "block");
			$("#admui-navbarSubMenu").hide()
		}
	}
	$("#admui-navbarSubMenu>ul").prepend(html);
	var div_width=$("#admui-siteConTabs>div.contabs-scroll").width();
	var ul_width=$("#admui-siteConTabs>div.contabs-scroll>ul").width();
	if(div_width<ul_width){
		$("#admui-siteConTabs button.btn-default").removeClass("hide");
	}else{
		$("#admui-siteConTabs button.btn-icon").addClass("hide");
		$("#admui-siteConTabs>div.contabs-scroll>ul").css("left",0);
	}
});
//点击弹窗关闭按钮
$("body").on("click",".leftClose",function(){
	$("body>.leftDistance").remove();
});
//点击退出时
$("body").on("click","#admui-navbarRetreat",function(){
	layer.confirm('确定登出？', {
		btn: ['是', '否'] //可以无限个按钮
	}, function(index, layero){
		var href=window.location.href;
		var num=href.indexOf("index");
		href=href.substring(0,num)+"login.jsp";
		window.location.href=href;
	}, function(index){
		//按钮【按钮二】的回调
		layer.closeAll('dialog');
	});
})
//解析json 形成顶部列表与右边分类列表
function analysis(){
	var list=[];
	$.ajax({
		url : getRootPath()+ '/menu/queryMenuByRoleID.action',
		type : 'POST',
		dataType : 'json',
		async:false,
		success : function(result){
			if(result){
				list=result;
			}
		}
	});
	var topHtml="",leftHtml="";
	var frist=0;
	for(var i=0;i<list.length;i++){
		if(list[i].parent_id==0){
			topHtml+='<li role="presentation" class="" style="display:block">'
			+' 	<a data-toggle="tab" href="#'+list[i].href+'" aria-controls="admui-navTabsItem-1" role="tab" aria-expanded="false"> '
//			+'		<img style="width: 14px;height: 14px;margin-right: 7px;" src="'+list[i].icon+'"/>'
			+' 		<span>'+list[i].name+'</span>'
			+' 	</a>'
			+'</li>';
			var id=list[i].id;
			leftHtml+='<div class="tab-pane animation-fade height-full hoverscorll-disabled" id="'+list[i].href+'" role="tabpanel">'
			+'	<div style="">'
			+'		<ul class="site-menu" style="transform: translate3d(0px, 0px, 0px);">'
			+'			<li class="site-menu-category">'+list[i].name+'</li>';
			for(var j=0;j<list.length;j++){
				if(list[j].parent_id==id){
					var chi_id=list[j].id;
					if(list[j].final_node==1){
						if(frist==0){
							frist=j;
						}
						leftHtml+='<li class="site-menu-item has-sub">'
						+' <a data-pjax="m'+list[j].id+'" href="'+getRootPath()+list[j].href+'">'
						+'		<i class="site-menu-icon fa-cube" aria-hidden="true"></i>'
						+'		<span class="site-menu-title">'+list[j].name+'</span>'
						+'	</a>'
						+'</li>';
					}else{
						leftHtml+='<li class="site-menu-item has-sub">'
						+'	<a href="javascript:;">'
						+'		<i class="site-menu-icon fa-cube" aria-hidden="true"></i>'
						+'		<span class="site-menu-title">'+list[j].name+'</span>'
						+'		<span class="site-menu-arrow"></span>'
						+'	</a> '
						+'	<ul class="site-menu-sub">';
						for(x=0;x<list.length;x++){
							if(list[x].parent_id==chi_id){
								if(frist==0){
									frist=x;
								}
								leftHtml+='<li class="site-menu-item"> '
								+'	<a data-pjax="m'+list[x].id+'" href="'+getRootPath()+list[x].href+'" target="_blank"> '
								+'		<span class="site-menu-title">'
								+'			<i style="margin-right: 5px" class="icon fa-circle-o" aria-hidden="true"></i>'+list[x].name+''
								+'		</span>'
								+' </a>'
								+'</li>';
							}
						}
						leftHtml+='</ul></li>'
					}
				}
			}
			leftHtml+='</ul></div></div>'
		}
	}
	topHtml+='<li class="dropdown" id="admui-navbarSubMenu" style="display: block;"> '
	+'	<a class="dropdown-toggle" data-toggle="dropdown" href="#" data-animation="slide-bottom" aria-expanded="true" role="button">'
	+' 		<i class="icon wb-more-vertical"></i>'
	+' 	</a> '
	+'	<ul class="dropdown-menu" role="menu"> </ul>'
	+'</li>';
	$("#admui-navMenu>ul").append(topHtml);
	$("#admui-navTabs").append(leftHtml);
	$("#admui-navMenu>ul>li:first-child").addClass("active");
	$("#admui-navTabs>div:first-child").addClass("active");
	var Tabs=$("#admui-navTabs>div");
	$($("#admui-navTabs>div a[data-pjax]")[0]).parent().addClass("active");
	$("#admui-siteConTabs>div.pull-left>ul").append('<li class="active"> <span data-pjax="m'+list[frist].id+'" title="'+list[frist].name+'" rel="contents" href="'+getRootPath()+list[frist].href+'"><span>'+list[frist].name+'</span></span> </li>');
	$("#admui-pageContent").append('<div class="m'+list[frist].id+'"> <iframe id="m'+list[frist].id+'" style="width: 100%;height:100%; display: block; border: 0;" src="'+getRootPath()+list[frist].href+'"></iframe> </div>');
}

/**
 * 发货提醒与退款提醒
 */
function remdinder(){
	$.ajax({
		type:"post",
        url: getRootPath()+"/reminder/nodelivery.action",
        success:function(data){
        	$("#refundreminderno").html(data.total0);
        	$("#refundreminder").html(data.total);
        }
	});
}






























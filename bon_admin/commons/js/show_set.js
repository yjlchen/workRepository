function show_set(){
    this.html='<div class="show_set">';
    this.html+='<link rel="stylesheet" href="commons/css/display.css" />';
    this.html+='<link rel="stylesheet" href="commons/css/bootstrap-select.css" />';
    this.html+='<div class="page animation-fade page-display">';
    this.html+='    <div class="page-content">';
    this.html+='        <form id="displayForm" class="form-horizontal padding-vertical-30">';
    this.html+='            <div class="form-group">';
    this.html+='                <label class="col-sm-2 control-label">导航条颜色：</label>';
    this.html+='                <div class="col-sm-10" id="skintoolsNavbar">';
    this.html+='                    <ul class="list-unstyled list-inline color-radio">';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-primary">';
    this.html+='                                <input type="radio" checked="" name="navigationColor" value="bg-blue-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-brown">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-brown-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-cyan">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-cyan-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-green">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-green-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-grey">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-grey-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div> </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-indigo">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-indigo-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-orange">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-orange-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div> </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-pink">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-pink-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-purple">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-purple-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-red">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-red-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-teal">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-teal-600" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-yellow">';
    this.html+='                                <input type="radio" name="navigationColor" value="bg-yellow-700" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                    </ul>';
    this.html+='                    <div class="checkbox-custom checkbox-primary margin-top-10">';
    this.html+='                        <input type="checkbox" checked="" id="navbarDisplay" name="acrossFlag" value="navbar-inverse" />';
    this.html+='                        <label for="navbarDisplay">通栏显示</label>';
    this.html+='                    </div>';
    this.html+='                </div>';
    this.html+='            </div>';
    this.html+='            <hr />';
    this.html+='            <div class="form-group">';
    this.html+='                <label class="col-sm-2 control-label">菜单主题：</label>';
    this.html+='                <div class="col-sm-10">';
    this.html+='                    <div class="btn-group bootstrap-select">';
    this.html+='                        <button type="button" class="btn dropdown-toggle btn-select" data-toggle="dropdown" data-id="skintoolsSidebar" title="深色主题"><span class="filter-option pull-left">深色主题</span>&nbsp;<span class="bs-caret"><span class="caret"></span></span></button>';
    this.html+='                        <div class="dropdown-menu open">';
    this.html+='                            <ul class="dropdown-menu inner" role="menu">';
    this.html+='                                <li data-original-index="0" class="selected"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">深色主题</span><span class="icon wb-check check-mark"></span></a></li>';
    this.html+='                                <li data-original-index="1"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">浅色主题</span><span class="icon wb-check check-mark"></span></a></li>';
    this.html+='                            </ul>';
    this.html+='                        </div>';
    this.html+='                        <select data-plugin="selectpicker" id="skintoolsSidebar" name="menuTheme" class="" tabindex="-98"> <option value="site-menubar-dark" selected="">深色主题</option> <option value="site-menubar-light">浅色主题</option> </select>';
    this.html+='                    </div>';
    this.html+='                </div>';
    this.html+='            </div>';
    this.html+='            <div class="form-group">';
    this.html+='                <label class="col-sm-2 control-label">菜单显示：</label>';
    this.html+='                <div class="col-sm-10">';
    this.html+='                    <div class="radio-inline radio-custom radio-primary">';
    this.html+='                        <input type="radio" id="menuUnfold" checked="checked" name="menuDisplay" value="site-menubar-unfold" />';
    this.html+='                        <label for="menuUnfold">默认展开</label>';
    this.html+='                    </div>';
    this.html+='                    <div class="radio-inline radio-custom radio-primary">';
    this.html+='                        <input type="radio" id="menuFold" name="menuDisplay" value="site-menubar-fold" />';
    this.html+='                        <label for="menuFold">默认收起</label>';
    this.html+='                    </div>';
    this.html+='                    <div class="margin-top-10 hidden" id="menuFoldSetting">';
    this.html+='                        <span>鼠标经过菜单时显示：</span>';
    this.html+='                        <div class="btn-group btn-group-xs" data-toggle="buttons">';
    this.html+='                            <label class="btn  btn-outline btn-dark active" for="textIconKeep"> <input type="radio" id="textIconKeep" autocomplete="off" hidden="hidden" chec;ked="" name="menuTxtIcon" value="site-menubar-keep" /> 文字 </label>';
    this.html+='                            <label class="btn btn-outline btn-dark" for="textIconAlt"> <input type="radio" id="textIconAlt" autocomplete="off" hidden="hidden" name="menuTxtI;con" value="site-menubar-fold-alt" /> 图标 </label>';
    this.html+='                        </div>';
    this.html+='                    </div>';
    this.html+='                    <span class="help-block">仅在可视区域宽度大于768px生效</span>';
    this.html+='                </div>';
    this.html+='            </div>';
    this.html+='            <hr />';
    this.html+='            <div class="form-group">';
    this.html+='                <label class="col-sm-2 control-label">主题颜色：</label>';
    this.html+='                <div class="col-sm-10" id="skintoolsPrimary">';
    this.html+='                    <ul class="list-unstyled list-inline color-radio">';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-primary">';
    this.html+='                                <input type="radio" checked="" name="themeColor" value="primary" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-brown">';
    this.html+='                                <input type="radio" name="themeColor" value="brown" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-cyan">';
    this.html+='                                <input type="radio" name="themeColor" value="cyan" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-green">';
    this.html+='                                <input type="radio" name="themeColor" value="green" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-grey">';
    this.html+='                                <input type="radio" name="themeColor" value="grey" />';
    this.html+='                                <label></label>';
    this.html+='                            </div> </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-indigo">';
    this.html+='                                <input type="radio" name="themeColor" value="indigo" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-orange">';
    this.html+='                                <input type="radio" name="themeColor" value="orange" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-pink">';
    this.html+='                                <input type="radio" name="themeColor" value="pink" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-purple">';
    this.html+='                                <input type="radio" name="themeColor" value="purple" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-red">';
    this.html+='                                <input type="radio" name="themeColor" value="red" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-teal">';
    this.html+='                                <input type="radio" name="themeColor" value="teal" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                        <li>';
    this.html+='                            <div class="radio-custom radio-yellow">';
    this.html+='                                <input type="radio" name="themeColor" value="yellow" />';
    this.html+='                                <label></label>';
    this.html+='                            </div>';
    this.html+='                        </li>';
    this.html+='                    </ul>';
    this.html+='                </div>';
    this.html+='            </div>';
    this.html+='            <hr />';
    this.html+='            <div class="form-group">';
    this.html+='                <label class="col-sm-2 control-label">Tab 页签：</label>';
    this.html+='                <div class="col-sm-10">';
    this.html+='                    <div class="radio-inline radio-custom radio-primary">';
    this.html+='                        <input type="radio" id="tabDisplayShow" checked="" name="tabFlag" value="site-contabs-open" />';
    this.html+='                        <label for="tabDisplayShow">开启</label>';
    this.html+='                    </div>';
    this.html+='                    <div class="radio-inline radio-custom radio-primary">';
    this.html+='                        <input type="radio" id="tabDisplayHide" name="tabFlag" value="" />';
    this.html+='                        <label for="tabDisplayHide">关闭</label>';
    this.html+='                    </div>';
    this.html+='                    <span class="help-block">Tab 页签必须保存以后才能看到效果</span>';
    this.html+='                </div>';
    this.html+='            </div>';
    this.html+='            <hr />';
    this.html+='            <div class="form-group">';
    this.html+='                <div class="col-sm-10 col-sm-offset-2 margin-top-20">';
    this.html+='                    <button type="submit" class="btn btn-primary" name="save" value="true">保存</button>';
    this.html+='                    <button type="button" class="btn btn-outline btn-default" name="reset" value="reset" id="skintoolsReset">恢复默认 </button>';
    this.html+='                </div>';
    this.html+='            </div>';
    this.html+='        </form>';
    this.html+='    </div>';
    this.html+='</div>';
    this.html+='</div>';
}
var TopMenu_bg="",text_color="";
//点击转换导航条颜色
$("#admui-pageContent").on("click","#skintoolsNavbar input[name='navigationColor']",function(){
    $("nav.navbar-fixed-top").removeClass(TopMenu_bg);
    TopMenu_bg=$(this).val();
    $("nav.navbar-fixed-top").addClass(TopMenu_bg);
});
//点击显示隐藏导航条栏颜色
$("#admui-pageContent").on("click","#navbarDisplay",function(){
    $("nav.navbar-fixed-top").toggleClass("navbar-inverse");
});
//点击显示菜单主题
$("#admui-pageContent").on("click","button[data-id='skintoolsSidebar']",function(e){
    e.stopPropagation();
    $(this).parent().toggleClass("open");
});
//点击选择菜单主题
$("#admui-pageContent").on("click","div.bootstrap-select ul>li",function(){
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    var txt=$(this).text();
    $("#admui-pageContent button[data-id='skintoolsSidebar']").attr("tltle",txt).children(".filter-option").text(txt);
	//获取当前点击元素的data_index
	var data_index=$(this).attr("data-original-index");
	//获取select框下面对应的index的value值
	var val=$("#skintoolsSidebar").children().eq(data_index).val();
	$("nav.site-menubar").attr("class","site-menubar "+val);
});
//点击菜单显示按钮
$("#admui-pageContent").on("click","input[name='menuDisplay']",function(){
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
//点击显示tab页面
$("#admui-pageContent").on("click","input[name='tabFlag']",function(){
	if($(this).attr("id")=="tabDisplayShow"){
		$("body").addClass("site-contabs-open");
	}else if($(this).attr("id")=="tabDisplayHide"){
		$("body").removeClass("site-contabs-open");
	}
});
//点击更换主题颜色
$("#admui-pageContent").on("click","input[name='themeColor']",function(){
	var txt=$(this).val();
	if(txt=="primary"){
		txt="site";
	}
	var href="css/style_css/"+txt+".css";
	$("#siteStyle").attr("href",href);
});
//点击恢复默认状态
$("#admui-pageContent").on("click","#skintoolsReset",function(e){
	e.preventDefault();
	var href=window.location.href;
	var num=href.indexOf("css/");
	href=href.substring(0,num)+"css/site.css";
	$("#siteStyle").attr("href","css/style_css/site.css");
	$("nav.navbar-fixed-top").removeClass(TopMenu_bg);
	$("nav.navbar-fixed-top").addClass("navbar-inverse");
	$("nav.site-menubar").attr("class","site-menubar site-menubar-dark");
	$("body").addClass("site-contabs-open");
	$("#admui-pageContent>.show_set").remove();
	var obj=new show_set();
	var mdClass=new moduleCategory(obj.html);
	$("#admui-pageContent").append(mdClass.html);
});
//将信息保存在cookie中
$("#admui-pageContent").on("click","button[name='save']",function(e){
	e.preventDefault();
    var body=$("body").attr("class");
    var navbar=$("nav[role='navigation']").attr("class");
    var menubar=$("nav.site-menubar").attr("class");
	var siteStyle=$("#siteStyle").attr("href");
	document.cookie="body="+body;
	document.cookie="navbar="+navbar;
	document.cookie="menubar="+menubar;
	document.cookie="siteStyle="+siteStyle;
	//history.go(0);
	console.log(body,navbar,menubar,siteStyle);
});








































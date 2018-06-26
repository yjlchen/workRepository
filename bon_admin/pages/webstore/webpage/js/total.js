var module=$("#module");
var moduleClass=$("#module_class");
var modality=$("#modality");
//设置富文本添加个数
var text_num=0;
//设置公共元素目标元素
var thisDiv=null;
var moduleCategory=function(moduleCl1,moduleCl2){
    this.moduleCl1=moduleCl1;
    this.moduleCl2=moduleCl2;
};
(function () {
	//声明错误信息函数
	function alert_mess(mess){
		parent.layer.alert(mess, {
			icon : 5
		});
	}
	var thisDiv=null;
	//点击列表显示对应的选项
    moduleClass.on("click","li",function () {
    	//获取当前点击的列表按钮的data-field-type值
    	var name=$(this).children("a").attr("data-field-type");
     	//判断点击的元素是否为富文本
     	/*if(name=="rich_text"){
     		if(text_num>=1){
        	 	alert_mess('已经添加了一个富文本了');
        	 	return;
         	}
    	 	text_num++;
     	}*/
      	//创建一个对象
      	var obj;
      	eval("obj = new "+name+"();");
      	var mdClass=new moduleCategory(obj.left,obj.right);
      	//在module与modality中追加对应的元素
      	$(module).append(mdClass.moduleCl1);
      	$(modality).append(mdClass.moduleCl2);
      	//获取module下最后一个元素的top值
      	var top=$(module.children(".module_div")).last().position().top;
      	//modality下的元素隐藏，新加的元素显示在对应的位置
      	$(modality.children()).css("display","none");
      	$(modality.children()).last().css({"display":"block","top":top});
      	//module下面的所有元素边框不显示，新加元素边框显示
      	$(module).find(".module_div .actions").css("border","2px dashed transparent");
      	$(module).find(".module_div .actions").last().css("border","2px dashed rgba(255, 0, 0, 0.5)");
      	//将新加元素赋值给thisDiv
      	thisDiv= $(module).find(".module_div").last();
    });
    /*module.on("click","div.module_div",function () {
    	thisDiv=$(this);
        var index=$(this).index();
        var top=$(this).position().top;
        $(modality.children()[index]).css("display","block");
        $(modality.children()[index]).css("top",top);
        $(modality.children()[index]).siblings().css("display","none");
        var mCheight=$("#module_class").height();
        var rheight=$("#module").height();
        var zheight=rheight+mCheight;
        var height=$(modality.children()[index]).height();
        height=height+top;
        if(height>800||zheight>800){
	        if(height>zheight){
	        	$(this).parents("#total").css("height",height+125+"px");
	        	$(this).parents("#root").css("height",height+35+"px");
	        }else{
	        	$(this).parents("#total").css("height",zheight+125+"px");
	        	$(this).parents("#root").css("height",zheight+35+"px");
	        }
        }
    });
    //鼠标滑入时边框显示，actions显示
    $("#module").on("mouseenter",".module_div",function(e){
    	$(this).find(".actions").css("border","2px dashed rgba(255, 0, 0, 0.5)");
        $(this).find(".actions").show();
    });
    //鼠标离开时边框隐藏，actions隐藏
    $("#module").on("mouseleave",".module_div",function(e){
    	$(this).find(".actions").css("border","2px dashed transparent");
    	//以前显示的边框继续显示
    	$(thisDiv).find(".actions").css("border","2px dashed rgba(255, 0, 0, 0.5)");
        $(this).find(".actions").hide();
        $(thisDiv).find(".actions").show();
    });*/
    $("#module").on("mousedown","span.delete",function (e) {
    	 e.stopPropagation();
    	 //先删除多余的删除对话框
    	 $(this).parent().siblings(".ui-popover").remove();
    	 //弹出是否删除的对话框
    	 var html=
    		 '	<div class="ui-popover ui-popover--confirm left-center" style="width:290px;top: 0; left: -3px;">'
    		+'		<div class="ui-popover-inner clearfix" style="display:block;width:auto">'
    	    +'			<div class="inner__header clearfix">'
        	+'    			<div class="pull-left text-center" style="width: 160px;line-height: 28px;font-size: 14px;">确定删除？</div>'
        	+'    			<div class="pull-right">'
        	+'        			<a href="javascript:;" class="zent-btn zent-btn-primary zent-btn-small js-save" style="color:#fff">确定</a>'
        	+'        			<a href="javascript:;" class="zent-btn zent-btn-small js-cancel">取消</a>'
        	+'   			</div>'
        	+'  		</div>'
        	+'		</div>'
        	+'		<div class="arrow"></div>'
        	+'	</div>';
    	 $(this).parents(".actions").append(html);
    	 var obj_top=$(this).offset().top;
    	 var par_top=$(this).parents(".actions").offset().top;
    	 var top=obj_top-par_top-16;
    	 $(this).parent().siblings(".ui-popover").css({"top":top,});
    });
})();
//点击确定按钮删除微页面组件
//function wjm_remove(obj){
$("#module").on("mousedown",".js-save",function(e){
	e.stopPropagation();
});
$("#module").on("mouseup",".js-save",function(e){
	e.stopPropagation();
	//获取当前删除的是第几个元素
    var ind=$(this).parents("div.module_div").index();
    //判断当前删除的元素是否为富文本
    var name=$(this).parents("div.module_div").attr("name");
    if(name=="rich_text"){
    	var ueid=$(thisDiv).attr("ueid");
    	UE.getEditor(""+ueid+"").destroy();
    }
    //删除当前元素，并且删除当前元素右边对应的div
    $(this).parents("div.module_div").remove();
    $(modality.children(".app-sidebar")).hide();
    $(modality.children(".app-sidebar")[ind]).remove();
    //获取高度，使页面显示完整
    var mCheight=$("#module_class").height();
    var rheight=$("#module").height();
    var zheight=rheight+mCheight;
    if(zheight>800){
        $("#total").css("height",zheight+125+"px");
        $("#root").css("height",zheight+35+"px");
    }else{
    	$("#total").css("height","auto");
        $("#root").css("height","auto");
    }
});
//点击取消，不删除微页面组件
//function wym_cancel(obj){
$("#module").on("mousedown",".js-cancel",function(e){
	e.stopPropagation();
	$(this).parents(".ui-popover").remove();
});
/**
 * 实现微界面拖拽效果
 */
function drag() {
	//设置当前要拖拽的元素，声明当前拖拽元素的状态为false
    var dragState=false;
    //声明拖拽元素是第几个，拖拽元素的高度，拖拽元素中心位置，拖拽元素宽度
    var thisDivId= 0,thisDivHeight= 0,thisDivCenter=0,thisDivWidth= 0;
    //声明鼠标的偏移量(鼠标在元素中的位置)
    var range={x:0,y:0};
    //声明拖拽元素的四个坐标
    var thisCoord={x:0,y:0,x1:0,y1:0};
    //设置新添加的元素
    var newDiv=null;
    //设置目标div
    var tarDiv=null;
    //设置目标div的坐标
    var tarCoord={x:0,y:0,x1:0,y1:0};
    //声明拖拽元素右边对应的元素
    var rightDiv="";
  	//为每一个module_div绑定mousedown事件
    $("#module").on("mousedown",".module_div",function(e){
    	//将thisDiv清空
    	thisDiv=null;
    	//获取当前元素是第几个元素
    	var index=$(this).index();
    	//获取当前元素的top值
        var top=$(this).position().top;
        //右边编辑页面对应的显示其他隐藏
        $(modality.children()[index]).css("display","block");
        $(modality.children()[index]).css("top",top);
        $(modality.children()[index]).siblings().css("display","none");
        //当前点击的元素边框显示，actions显示，其他元素的隐藏
        $(this).siblings().find(".actions").css("border","2px dashed transparent");
        $(this).find(".actions").css("border","2px dashed rgba(255, 0, 0, 0.5)");
        $(this).siblings().find(".actions").hide()
        $(this).find(".actions").show();
        //如果当前点击的是第一个元素，则图退出函数
    	if($(this).index()==0) return false;
    	//设置thisDiv为当前点击的元素
        thisDiv=$(this);
        //设置thisDivId为当前元素的位置
        thisDivId=$(this).index();
        //获取右边相对应的div
        rightDiv=$(modality.children()[index]).prop("outerHTML");;
        //设置thisDivHeight为当前元素的高度
        thisDivHeight=$(this).height();
      	//设置thisDivHeight为当前元素的宽度
        thisDivWidth=$(this).width();
        //设置thisDivCenter为当前元素的中心
        thisDivCenter=thisDivHeight/2;
        /*if($(this).attr("name")=="rich_text"){
        	dragState=false;
        }else{
        	//改变拖拽元素的拖拽状态为true
        	dragState=true;
        }*/
        //改变拖拽元素的拖拽状态为true
    	dragState=true;
        //设置鼠标元素相对偏移量(鼠标在元素中的位置)
        range.x=e.pageX-thisDiv.offset().left;
        range.y=e.pageY-thisDiv.offset().top;
        //设置拖拽元素的定位状态为relative,并设置更改class
        thisDiv.attr("class","module_div_drag app-field clearfix editing");
        thisDiv.css({width:thisDivWidth+"px",height:thisDivHeight+"px",position:"absolute","z-index":5});
        //新建一个新的div并放在拖拽元素的下方
        var html="<div class='newDiv' style='width: "+thisDivWidth+"px;height:"+thisDivHeight+"px;border: 1px dotted #000;'>";
        html+="</div>";
        thisDiv.after(html);
    });
    $("#module").on("mousemove",function(e){
    	e.preventDefault();
        //如果拖拽元素的拖拽状态为true则继续执行，否则退出函数
        if (!dragState) return false;
        //设置拖拽元素改变之后的坐标
        thisCoord.x= e.pageX-$(this).offset().left-range.x;
        thisCoord.y= e.pageY-$(this).offset().top-range.y;
        thisCoord.y1=thisCoord.y+thisDivHeight;
        //改变拖拽元素的位置
        thisDiv.css({left:0,top:thisCoord.y});
        //设置newDiv为新建的div
        newDiv=$("#module .newDiv");
        //重新获取module下面的元素
        var anew=$("#module .module_div");
        //对新获取的元素进行循环
        anew.each(function(){
            //获取目标元素的坐标值
            tarDiv=$(this);
            tarCoord.x = tarDiv.offset().left;
            tarCoord.y = tarDiv.offset().top-82+$(this).height()/2;
            if(thisCoord.y+thisDivHeight>=tarCoord.y){
                newDiv.insertAfter(tarDiv);
            } 
        });
    }).mouseup(function(e){
    	e.preventDefault();
        //如果thisDiv为空，则退出函数，否则继续执行
        if(thisDiv==null) return false;
        //将拖拽元素放在新建元素上
        thisDiv.insertBefore(".newDiv");
       //删除新建的div
       $(".newDiv").remove();
        //将thisDiv的定位状态回归原样，并将class恢复
        thisDiv.attr("class","module_div app-field clearfix editing");
        thisDiv.attr("style","");
        if(!dragState) return false;
        //将拖拽元素的状态改为false
        dragState=false;
     	//左边移动元素对应右边元素删除
        $(modality.children()[thisDivId]).remove();
        if($(thisDiv).attr("name")=="rich_text"){
        	//获取拖动元素所对应的ueid
        	var ueid=$(thisDiv).attr("ueid");
        	var num=ueid.substring(6);
        	UE.getEditor(""+ueid+"").destroy();
        	var html='<div class="app-sidebar" style="margin-top: 0px;display:block;" ueid="'+ueid+'">'
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
        		+'    			</div>'
        		+'				<div class="control-group">'
        		+'						<div><script id="'+ueid+'" type="text/plain"></script></div>'
        		+'					<script type="text/javascript">'
        		+'						var '+ueid+' = UE.getEditor("'+ueid+'",{elementPathEnabled : false,wordCount:false});'
        		+'					</script>'
        		+'				</div>'
        		+'			</from>'
        		+'		</div>'
        		+'	</div>'
        		+'</div>';
        	//位置改变完后在对应位置添加删除元素
            $(modality.children()[$(thisDiv).index()-1]).after(html);
        	//删除ueditor编辑器的div下的多余的一个子div
	    	$("#editorwym").children().eq(0).remove();
	    	//给ueditor编辑器进行初始化赋值
	    	var richTextContent = $("#leftText_"+num).html();
	    	//初始化编辑器内容
	    	var ue = UE.getEditor(""+ueid+"");
	    	ue.addListener("ready", function ()  {
	    		ue.setContent(richTextContent, false); 
            });
            /*$("#editorwym").parents(".control-group").siblings("textarea").remove();*/
        }else{
        	//位置改变完后在对应位置添加删除元素
            $(modality.children()[$(thisDiv).index()-1]).after(rightDiv);
        }
        /*//右边对应的元素改变位置
		rightDiv.insertAfter($(modality.children()[$(thisDiv).index()]));*/
        //获取top值
        var top=$(thisDiv).position().top;
        //右边对应元素改变top值
        $(modality.children()[$(thisDiv).index()]).css("top",top);
    });
    //鼠标滑入时边框显示，actions显示
    $("#module").on("mouseenter",".module_div",function(e){
    	$(this).find(".actions").css("border","2px dashed rgba(255, 0, 0, 0.5)");
        $(this).find(".actions").show();
    });
    //鼠标离开时边框隐藏，actions隐藏
    $("#module").on("mouseleave",".module_div",function(e){
    	$(this).find(".actions").css("border","2px dashed transparent");
    	//以前显示的边框继续显示
    	$(thisDiv).find(".actions").css("border","2px dashed rgba(255, 0, 0, 0.5)");
        $(this).find(".actions").hide();
        $(thisDiv).find(".actions").show();
    });
}
drag();
//当页面加载完成时
window.onload = function(){
	//获取当前页面下所有的class为（module_div）的div
	var div=$("#module .module_div");
	//循环获取到的div
	for(var i=0;i<div.length;i++){
		//判断是否存在富文本
		var name=$(div[i]).attr("name");
		if(name=="rich_text"){
			text_num=1;
		}
	}
	//将所有的边框全部隐藏
	$(module).find(".module_div .actions").css("border","2px dashed transparent");
	//所有的actions隐藏
    /*$(module).find(".module_div .actions").hide();
    //所有的编辑框隐藏
	$(modality).children().hide();*/
	//判断高度，使页面显示完整
	var height=$(module).parents(".app-preview").height();
	if(height>800){
        $("#total").css("height",height+125+"px");
        $("#root").css("height",height+35+"px");
    }else{
    	$("#total").css("height","auto");
        $("#root").css("height","auto");
    }
}

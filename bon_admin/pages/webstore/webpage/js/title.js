//全局变量
var title_count = 0;
var title=function(){
	this.left=
		      '<div class="module_div app-fields js-fields-region">'
              +'              <div class="app-fields ui-sortable">'
              +'                  <div class="app-field clearfix editing ">'
              +'                      <div class="control-group">'
              +'                          <div class="">'
              +'                              <div class="custom-title text-left">'
              +'                                  <h2 class="title">点击编辑『标题』<span class="custom-title-link-container"></span></h2>'
              +'                                  <p class="sub_title"></p>'
              +'                              </div>'
              +'                          </div>'
              +'                          <div class="component-border"></div>'
              +'                      </div>'
              +'                      <div class="actions">'
              +'                          <div class="actions-wrap">'
              //+'                              <span class="action edit">编辑</span>'
              //+'                              <span class="action add">加内容</span> '
              +'                              <span class="action delete">删除</span>'
              +'                          </div>'
              +'                      </div>'
              +'                      <div class="sort">'
              +'                          <i class="sort-handler"></i>'
              +'                      </div>'
              +'                  </div>'
              +'              </div>'
              +'          </div>';

              
	this.right='<div class="app-sidebar">'
            +'        <div class="arrow"></div>'
            +'        <div class="app-sidebar-inner js-sidebar-region">'
            +'            <div>'
            +'                <form class="form-horizontal" novalidate="">'
            +'                    <div class="control-group">'
            +'                        <label class="control-label"><em class="required">*</em>标题名：</label>'
            +'                        <div class="controls" style="margin-left: 10px;">'
            +'                            <input type="text" name="title" value="" maxlength="100">'
            +'                        </div>'
            +'                    </div>'
            +'                    <div class="control-group">'
            +'                        <label class="control-label">标题模版：</label>'
            +'                        <div class="controls" style="margin-left: 10px;">'
            +'                            <label class="radio inline">'
            +'                                <input type="radio" name="title_template" value="0" checked="">传统样式  '
            +'                            </label>'
            +'                            <label class="radio inline">'
            +'                                <input type="radio" name="title_template" value="1">模仿微信图文页样式'
            +'                            </label>'
            +'                        </div>'
            +'                    </div>'
            +'                    <div class="control-group">'
            +'                        <label class="control-label">副标题：</label>'
            +'                        <div class="controls" style="margin-left: 10px;">'
            +'                            <input type="hidden" class="js-time-holder hasDatepicker" id="dp1500262126998"> '
            +'                            <input type="text" name="sub_title" maxlength="100">'
            //+'                            <a href="javascript: void(0);" class="js-time">日期</a>'
            +'                        </div>'
            +'                    </div>'
            +'                    <div class="control-group">'
            +'                        <label class="control-label">显示：</label>'
            +'                        <div class="controls" style="margin-left: 10px;">'
            +'                            <label class="radio inline">'
            +'                                <input type="radio" name="title_show_method" value="0" checked="">居左显示'
            +'                            </label>'
            +'                            <label class="radio inline">'
            +'                                <input type="radio" name="title_show_method" value="1">居中显示 '
            +'                            </label>'
            +'                            <label class="radio inline">'
            +'                                <input type="radio" name="title_show_method" value="2">居右显示'
            +'                            </label>'
            +'                        </div>'
            +'                    </div>'
            +'                    <div class="control-group">'
            +'                        <label class="control-label">背景颜色：</label>'
            +'                        <div class="controls" style="margin-left: 10px;"> '
            +'                            <input type="color" value="#ffffff" name="color">'
            +'                            <button class="btn js-reset-bg" type="button">重置</button>'
            +'                        </div>'
            +'                    </div>'
            +'                    <div class="control-group js-collection-region">'
            +'                        <ul class="choices"></ul>'
            +'                    </div>'
            +'<div class="control-group options" style="display: block;" >'
            +'   <a href="javascript:;" class="add-option js-add-option" id="addTextnavOfTitle"><i class="icon-add"></i> 添加一个文本导航</a>'
            +'</div>'
            +'</form>'
            
            
            +'<form class="form-horizontal" novalidate="" style="display:none">'
            +'    <div class="control-group">'
            +'        <label class="control-label"><em class="required">*</em>标题名：</label>'
            +'        <div class="controls" style="margin-left:10px;">'
            +'            <input type="text" name="title" value="" maxlength="100">'
            +'        </div>'
            +'    </div>'
            +'    <div class="control-group">'
            +'        <label class="control-label">标题模版：</label>'
            +'        <div class="controls" style="margin-left:10px;">'
            +'            <label class="radio inline">'
            +'                <input type="radio" name="title_template" value="0">传统样式'
            +'            </label>'
            +'            <label class="radio inline">'
            +'                <input type="radio" name="title_template" value="1" checked="">模仿微信图文页样式'
            +'            </label>'
            +'        </div>'
            +'    </div>'
            +'  <div class="control-group">'
            +'  <label class="control-label">日期：</label>'
            +'   <div class="controls" style="margin-left:10px;">'
            +'   <input type="text" name="wx_title_date" value="" maxlength="100" '
            +' 		class="js-wx-time-holder span2 hasDatepicker" id="dp1500717490954">'
            +'      </div>'
            +'    </div>'
            +'    <div class="control-group">'
            +'        <label class="control-label">作者：</label>'
            +'        <div class="controls" style="margin-left:10px;">'
            +'            <input type="text" name="wx_title_author" value="" maxlength="100" class="span2">'
            +'        </div>'
            +'    </div>'
            +'    <div class="control-group">'
            +'        <label class="control-label">链接标题：</label>'
            +'        <div class="controls" style="margin-left:10px;">'
            +'            <input type="text" name="wx_title_link" value="" maxlength="100" class="span2">'
            +'        </div>'
            +'    </div>'
            +'    <div class="control-group">'
            +'        <label class="control-label">链接地址：</label>'
            +'        <div class="controls" style="margin-left:10px;">'
            +'            <label class="radio">'
            +'                <input type="radio" name="wx_title_link_type" value="0" checked="">引导关注'
            +'                <a href="javascript:;" target="_blank" style="margin-left:20px" class="new-window">设置快速关注链接</a>'
            +'            </label>'
            +'        </div>'
            +'    </div>'
            +'    <div class="control-group">'
            +'        <div class="controls js-wx-link" >'
            +'         <label class="radio wx-template-radio">'
            +'          <input type="radio" name="wx_title_link_type" value="1">其他链接'
            +'          <input type="hidden" name="wx_link_url">'
            +'          <div class="dropdown hover">'
            +'   <a class="js-dropdown-toggle dropdown-toggle control-action" style="height:20px;" href="javascript:;">'
            +'		设置链接到的页面地址 <i class="caret"></i></a>'
            +'                    <ul class="dropdown-menu">'
            +'                        <li>'
            +'                            <a class="js-modal-magazine" data-type="feature" href="javascript:;"  id="xzWym">微页面</a>'
            +'                        </li>'
            +'                        <li>'
            +'                            <a class="js-modal-goods" data-type="goods" href="javascript:;" id="xzShp">商品</a>'
            +'                        </li>'
            +'                        <li>'
            +'                            <a class="js-modal-links" data-type="links" href="javascript:;">自定义外链</a>'
            +'                        </li>'
            +'                    </ul>'
            +'                </div>'
            +'        </label>'
            +'        </div>'
            +'    </div>'
            +'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none">'
            +'  	<div class="popover-content">'
            +'      	<div class="form-inline">'
            +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
            +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
            +'   				onclick=title_wl_queding_qt(this,"'+title_count+'") data-loading-text="确定"> 确定</button> '
            +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
            +'      	</div>'
            +'  	</div>'
            +'	</div>'
            +'</form>'
            +'</div> '
            +'</div> '
            +'</div>';
};


(function(){
	//标题变化事件
    $(modality).on("blur","input[name='title']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("h2").html(txt+'<span class="custom-title-link-container"></span>'); 
        $(this).attr("value",txt);
    });
    
   //文本导航名称变化事件
    $(modality).on("blur","input[name='textnavTitle']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("h2 .custom-title-link-container .custom-title-link a").text(txt);
        $(this).attr("value",txt);
    });
    
    //副标题变化事件
    $(modality).on("blur","input[name='sub_title']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("p.sub_title").text(txt);
    });
    
    //左，中，右显示切换
    $(modality).on("click","input[name='title_show_method']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        if(txt==0) {
            $(module.children()[ind]).find("div.custom-title").css("text-align","left");
        }else if(txt==1) {
            $(module.children()[ind]).find("div.custom-title").css("text-align","center");
        }else if(txt==2) {
            $(module.children()[ind]).find("div.custom-title").css("text-align","right");
        }
    });
    
    //颜色修改
    $(modality).on("change","input[name='color']",function(){
        var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("div.custom-title").css("background",txt);
    });
    
    //颜色重置
    $(modality).on("click","button[type='button']",function(){
        $(this).prev("input[name='color']").val("#ffffff");
        var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("div.custom-title").css("background",txt);
    });
    
    //标题模板
    $(modality).on("click","input[name='title_template']",function(){
    	var val = $(this).val();
    	var ind = $(this).parents("div.app-sidebar").index();
    	if(val==0){
	    	$(modality).find("input[name='title_template'][value=0]").prop("checked","true");
	    	$(this).parents("form.form-horizontal").parent().children().eq(0).css("display","block");
	    	$(this).parents("form.form-horizontal").parent().children().eq(1).css("display","none");
	    	
	    	var biaoti = $(this).parents("form.form-horizontal").parent().children().eq(1).find("[name=title]").val();
	    	$(this).parents("form.form-horizontal").parent().children().eq(0).find("[name=title]").val(biaoti);
	    	//左边h2下的span显示
	    	$(module.children()[ind]).find("h2 span").show();
    	}else if(val==1){
	    	$(modality).find("input[name='title_template'][value=1]").prop("checked","true");
	    	$(this).parents("form.form-horizontal").parent().children().eq(1).css("display","block");
	    	$(this).parents("form.form-horizontal").parent().children().eq(0).css("display","none");
	    	
	    	var biaoti = $(this).parents("form.form-horizontal").parent().children().eq(0).find("[name=title]").val();
	    	$(this).parents("form.form-horizontal").parent().children().eq(1).find("[name=title]").val(biaoti);
	    	//左边h2下的span隐藏
	    	$(module.children()[ind]).find("h2 span").hide();
    	}
    	});

    
    $("#defult").change(function(){
    	$("#data").css("display","none");
    	var v=$(this).val();
    	$(modality).find("input[name='sub_title']").val(v);
    });
    
    
    //添加一个文本导航
	$(modality).on("click","#addTextnavOfTitle",function(){
	    var ind=$(this).parents("div.app-sidebar").index();
	    //右边添加
	    var str = 
	    	'<li class="choice">'
	    	+'	<div class="control-group">'
	    	+'		<label class="control-label"><em class="required">*</em>名称：</label>'
	    	+'		<div class="controls" style="margin-left: 10px;">'
	    	+'			<input type="text" name="textnavTitle" value="" >'
	    	+'		</div>'
	    	+'	</div>'
	    	+'	<div class="control-group">'
	    	+'	<label class="control-label"><em class="required">*</em>链接：</label>'
	    	+'	<div class="controls" style="margin-left: 10px;" id="titleControls_'+title_count+'">'
	    	+'	<div class="dropdown hover">'
	    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
	    	+'	<ul class="dropdown-menu">'
	    	+'	<li>'
	    	+'	<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,0)">微页面</a>'
	    	+'	</li>'
	    	+'	<li>'
	    	+'	<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,0)">商品</a>'
	    	+'	</li>'
	    	+'  <li>'
            +'  <a class="js-modal-links" data-type="links" href="javascript:void(0);">自定义外链</a>'
            +'  </li>'
	    	+'	</ul>'
	    	+'	</div>'
	    	+'	<input type="hidden" name="link_url">'
	    	+'	</div>'
	    	+'	</div>'
	    	+'	<div class="actions">'
	    	+'		<span class="action delete close-modal" title="删除"  id="deleteTextnavOfTitle">×</span>'
	    	+'	</div>'
	    	+'  <div class="popover-inner popover-link" style="width:330px;position: absolute;top: 105px;display:none">'
            +'  	<div class="popover-content">'
            +'      	<div class="form-inline">'
            +'          	<input type="text" class="link-placeholder js-link-placeholder" placeholder="链接地址：http://example.com">'
            +'          	<button type="button" class="btn btn-primary js-btn-confirm" style="color:#fff;background:#0080ed;" '
            +'					onclick=title_wl_queding(this,"'+title_count+'")  data-loading-text="确定"> 确定</button>'
            +'          	<button type="reset" class="btn js-btn-cancel" onclick="mf_wl_quxiao(this)">取消</button>'
            +'      	</div>'
            +'  	</div>'
            +'	</div>'
	    	+'	</li>'	
	    $(modality.children()[ind]).find(".control-group .choices").append(str);
	    $(modality.children()[ind]).find(".options").css("display","none");
	    //左边的span下增加一个span
	    var span = '<span class="custom-title-link"><span class="gray">-</span> <a></a></span>';
	    $(module.children()[ind]).find("h2 span").html(span);
	    title_count++;
	});
	
	
	//删除文本导航
	$(modality).on("click","#deleteTextnavOfTitle",function(){
		var ind=$(this).parents("div.app-sidebar").index();
		//显示添加一个文本导航
		$(modality.children()[ind]).find(".options").css("display","block");
		//清空原先添加的文本导航
		$(modality.children()[ind]).find(".control-group .choices").empty();
		//删除左边添加的span
		$(module.children()[ind]).find("h2 span").empty();
	});
})();
    


//模仿微信页面
(function(){
	$("#defult").change(function(){
    	$("#data").css("display","none");
    	var v=$(this).val();
    	$(modality).find("input[name='wx_title_date']").attr("value",v);
    });
	$(modality).on("click","input[name='wx_title_date']",function(e){
		var x=e.pageX;
    	var y=e.pageY;
    	$("#data").css({"display":"block","top":y,"left":x});
    	//$("#defult")[0].focus();
	});
	/*$(modality).find("input[name='wx_title_date']").change(function(){
		var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("p.sub_title").text(txt);
	})*/
	$(modality).on("blur","input[name='wx_title_date']",function(e){
    	var ind=$(this).parents("div.app-sidebar").index();
        var txt=$(this).val();
        $(module.children()[ind]).find("p.sub_title").text(txt);
	});
	
	//弹出选择微页面及分类的列表
	$(modality).on("click","#xzWym",function(){
	    var ind = $(this).parents("div.app-sidebar").index();
		layui.use(['form','element'], function(){ 
		  var form = layui.form(),
			  element = layui.element(),
			  layer = layui.layer;
		      form.render();
			  parent.layer.open({
				  title:"",
				  type: 2,
				  id:100,
				  area: ['800px', '500px'],
				  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?ind='+ind+'&leixing=pageinfoOfTitle'
			  });
		})
	});
	
	
	
	//弹出选择商品及分组的列表
	$(modality).on("click","#xzShp",function(){
	    var ind = $(this).parents("div.app-sidebar").index();
		layui.use(['form','element'], function(){ 
		  var form = layui.form(),
			  element = layui.element(),
			  layer = layui.layer;
		      form.render();
			  parent.layer.open({
				  title:"",
				  type: 2,
				  id:100,
				  area: ['800px', '530px'],
				  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?ind='+ind+'&leixing=goodsOfTitle'
			  });
		})
	});
	
}());
    
/*(function($) {
    $.timepicker.regional['zh-CN'] = {
        timeOnlyTitle: '选择时间',
        timeText: '时间',
        hourText: '小时',
        minuteText: '分钟',
        secondText: '秒钟',
        millisecText: '毫秒',
        microsecText: '微秒',
        timezoneText: '时区',
        currentText: '现在时间',
        closeText: '关闭',
        timeFormat: 'HH:mm',
        timeSuffix: '',
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        isRTL: false
    };
    $.timepicker.setDefaults($.timepicker.regional['zh-CN']);
})(jQuery);
(function($) {
    $(function() {
        $.datepicker.regional['zh-CN'] = {
            changeMonth: true,
            changeYear: true,
            clearText: '清除',
            clearStatus: '清除已选日期',
            closeText: '关闭',
            closeStatus: '不改变当前选择',
            prevText: '<上月',
            prevStatus: '显示上月',
            prevBigText: '<<',
            prevBigStatus: '显示上一年',
            nextText: '下月>',
            nextStatus: '显示下月',
            nextBigText: '>>',
            nextBigStatus: '显示下一年',
            currentText: '今天',
            currentStatus: '显示本月',
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            monthStatus: '选择月份',
            yearStatus: '选择年份',
            weekHeader: '周',
            weekStatus: '年内周次',
            dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
            dayStatus: '设置 DD 为一周起始',
            dateStatus: '选择 m月 d日, DD',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            initStatus: '请选择日期',
            isRTL: false
        };
    });
    $(function() {
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
        $("#defult").datetimepicker();
        $('#date').prop("readonly", true).datetimepicker({
            timeText: '时间',
            hourText: '小时',
            minuteText: '分钟',
            secondText: '秒',
            currentText: '现在',
            closeText: '完成',
            showSecond: true, //显示秒
            timeFormat: 'HH:mm:ss' //格式化时间
        });
        $("#date_yy-mm-dd").prop("readonly", true).datepicker({
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            onClose: function(selectedDate) {
            }
        });
        $("#date_start").prop("readonly", true).datepicker({
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            onClose: function(selectedDate) {
                $("#date_end").datepicker("option", "minDate", selectedDate);
            }
        });

        $("#date_end").prop("readonly", true).datepicker({
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            onClose: function(selectedDate) {
                $("#date_start").datepicker("option", "maxDate", selectedDate);
                $("#date_end").val($(this).val());
            }
        });
        $('#date_hhmmss').prop("readonly", true).timepicker({
            timeText: '时间',
            hourText: '小时',
            minuteText: '分钟',
            secondText: '秒',
            currentText: '现在',
            closeText: '完成',
            showSecond: true, //显示秒
            timeFormat: 'HH:mm:ss' //格式化时间
        });
        $.timepicker.dateRange(
            $("#date_start_1"),
            $("#date_end_1"), {
                minInterval: (1000 * 60 * 60 * 24 * 1), // 区间时间间隔时间
                maxInterval: (1000 * 60 * 60 * 24 * 1), // 1 days 区间时间间隔时间
                start: {}, // start picker options
                end: {} // end picker options});
            }
        );
    });
}(jQuery));*/


//修改时,其他链接点击叉号删除
function deleteUpdateTitle(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//追加上原有的内容
	var str = 
		'<input type="radio" name="wx_title_link_type" value="1" checked>其他链接'
		+'	<div class="dropdown hover">'
    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'	<ul class="dropdown-menu">'
    	+'	<li>'
    	+'		<a class="js-modal-magazine" data-type="feature" href="javascript:void(0);" id="xzWym">微页面</a> '
    	+'	</li>'
    	+'	<li>'
    	+'		<a class="js-modal-goods" data-type="goods" href="javascript:void(0);" id="xzShp">商品</a> '
    	+'	</li>'
    	+'  <li>'
        +'  <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
    	+'	</ul>'
    	+'	</div>'
    	+'	<input type="hidden" name="wx_link_url">'
    
    controls.html(str);
}


//修改时,文本导航点击叉号删除
function deleteUpdateTitle_textNav(obj){
	//获得div
	var controls = $(obj).parent().parent().parent();
	//清空内容
	controls.empty();
	//追加上原有的内容
	var str = 
		'<div class="dropdown hover">'
    	+'	<a class="js-dropdown-toggle dropdown-toggle control-action" href="javascript:;">设置链接到的页面地址 <i class="caret"></i></a>'
    	+'	<ul class="dropdown-menu">'
    	+'	<li>'
    	+'	<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,0)">微页面</a>'
    	+'	</li>'
    	+'	<li>'
    	+'	<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,0)">商品</a>'
    	+'	</li>'
    	+'  <li>'
        +'  <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
        +'  </li>'
    	+'	</ul>'
    	+'</div>'
    	+'<input type="hidden" name="link_url">'
    
    controls.html(str);
}




//弹出选择微页面及分类的列表
function chooseWebpageTextnavOfTitle(obj,flag){
	var controls = "";
	//获得变化的div
	if(flag=="0"){
		controls = $(obj).parent().parent().parent().parent();
	}else if(flag=="1"){
		controls = $(obj).parent().parent().parent().parent().parent();
	}
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  id:100,
			  area: ['800px', '500px'],
			  content: getRootPath()+'/commons/jsp/com_pageinfoChooseTab.jsp?num='+num+'&leixing=pageinfoOfTitle_Textnav'
		  });

	})
}



//弹出选择商品及分类的列表
function chooseGoodsAndGroupTextnavOfTitle(obj,flag){
	var controls = "";
	//获得变化的div
	if(flag=="0"){
		controls = $(obj).parent().parent().parent().parent();
	}else if(flag=="1"){
		controls = $(obj).parent().parent().parent().parent().parent();
	}
	//获得变化的div的id
	var id = controls.attr("id");
	//获得id后面的数字
	var num  = id.substr(id.lastIndexOf('_')+1);
	
	layui.use(['form','element'], function(){ 
	  var form = layui.form(),
		  element = layui.element(),
		  layer = layui.layer;
	      form.render();
		  parent.layer.open({
			  title:"",
			  type: 2,
			  area: ['800px', '530px'],
			  content: getRootPath()+'/commons/jsp/com_goodsAndGroupChooseTab.jsp?num='+num+'&leixing=goodsOfTitle_Textnav'
		  });

	})
}
//链接到  显示
$(modality).on("mouseenter","div.js-sidebar-region .control-group div.dropdown",function(){
	$(this).children(".dropdown-menu").show();
});
//链接到  隐藏
$(modality).on("mouseleave","div.js-sidebar-region .control-group div.dropdown",function(){
	$(this).children(".dropdown-menu").hide();
});



//文本导航外链点击确定（文本导航）
function title_wl_queding(obj,jishu){
	//获得文本框中的值
	var lianjie = $(obj).prev().val();
	if(""!=lianjie){
		var str = 
			'	<div class="control-action clearfix">'
			+'	<div class="pull-left js-link-to link-to">'
			+'		<a href="'+lianjie+'" target="_blank" class="new-window link-to-title" >'
			+'			<span class="label label-success">'
			+'				  外链'
			+'				<em class="link-to-title-text">'+lianjie+'</em>'
			+'			</span>'
			+'		</a>'
			+'<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle_textNav(this)">×</a>'
			+'	</div>'
			+'	<div class="dropdown hover pull-right">'
			+'	<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
			+'		<ul class="dropdown-menu">'
			+'		<li>'
			+'		<a class="js-modal-magazine" data-type="feature" href="javascript:;" onclick="chooseWebpageTextnavOfTitle(this,1)">微页面</a>'
			+'		</li>'
			+'		<li>'
			+'		<a class="js-modal-goods" data-type="goods" href="javascript:;" onclick="chooseGoodsAndGroupTextnavOfTitle(this,1)">商品</a>'
			+'		</li>'
			+'      <li>'
	        +'      <a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
	        +'      </li>'
			+'		</ul>'
			+'	</div>'
			+'	</div>'
			+'	<input type="hidden" name="link_url" value="'+lianjie+'">'
			//改变原来div中的内容
			$("#titleControls_"+jishu).html(str);
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}



//文本导航外链点击确定（其他链接）
function title_wl_queding_qt(obj,jishu){
	//获得文本框中的值
	var lianjie = $(obj).prev().val();
	var ind = $(obj).parents("div.app-sidebar").index();
	if(""!=lianjie){
		var str = 
			'<input type="radio" name="wx_title_link_type" value="1" checked>其他链接 '
			+'	<div class="control-action clearfix">'
			+'		<div class="pull-left js-link-to link-to">'
			+'			<a href="'+lianjie+'" target="_blank" class="new-window link-to-title">'
			+'				<span class="label label-success">'
			+'					外链 '
			+'					<em class="link-to-title-text">'+lianjie+'</em>'
			+'				</span>'
			+'			</a>'
			+'	<a href="javascript:;" class="js-delete-link link-to-title close-modal" title="删除" onclick="deleteUpdateTitle(this)">×</a>'
			+'		</div>'
			+'		<div class="dropdown hover pull-right">'
			+'			<a class="dropdown-toggle" href="javascript:void(0);">修改 <i class="caret"></i></a>'
			+'			<ul class="dropdown-menu">'
			+'			<li>'
			+'				<a class="js-modal-magazine 1" data-type="feature" href="javascript:void(0);" id="xzWym">微页面</a>'
			+'			</li>'
			+'			<li>'
			+'				<a class="js-modal-goods" data-type="goods" href="javascript:void(0);"  id="xzShp">商品</a>'
			+'			</li>'
			+' 			 <li>'
	        +' 				<a class="js-modal-links" data-type="links"  href="javascript:void(0);">自定义外链</a>'
	        +' 			 </li>'
			+'			</ul>'
			+'		</div>'
			+'		</div>'
			+'		<input type="hidden" name="wx_link_url" value="'+lianjie+'">'
		
			//改变原来div中的内容
			var div1 = $(modality.children()[ind]).find(".control-group").eq(13).find(".controls label");
			div1.html(str);
			
	}
	//关闭外链窗口
	$(obj).parents(".popover-inner").hide();
}



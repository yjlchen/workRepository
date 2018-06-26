
/** 跳转到一个具体的微页面的路径 **/
//var weiPagePath = "http://192.168.2.22:8079/shopPhone/mall/weiPage/";    //我本地不再使用
//var weiPagePath = "http://www.bjshengkang.cn/shopPhone/mall/weiPage/";   //宠物
//var weiPagePath = "http://shop.bjshengkang.cn/shopPhone/mall/weiPage/";    //恩喜曼
//var weiPagePath = "http://shop.bonjk.com/shopPhone/mall/weiPage/";     //棒健康
var weiPagePath = "http://js.lishusuan.net/mall/weiPage/";     //江苏测试

/** 跳转到商品详情页的路径 **/
//var commodityDetailPath = "http://192.168.2.22:8079/shopPhone/commodity/skipCommodityDetail/";  //我本地不再使用
//var commodityDetailPath = "http://www.bjshengkang.cn/shopPhone/commodity/skipCommodityDetail/"; //宠物 
//var commodityDetailPath = "http://shop.bjshengkang.cn/shopPhone/commodity/skipCommodityDetail/"; //恩喜曼
//var commodityDetailPath = "http://shop.bonjk.com/shopPhone/commodity/skipCommodityDetail/";		//棒健康
var commodityDetailPath = "http://js.lishusuan.net/commodity/skipCommodityDetail/";		//江苏测试

/** 跳转到领取优惠券页面的路径 **/
//var getCouponPath = "http://192.168.2.22:8079/shopPhone/coupon/getCouponPath/";   //我本地不再使用
//var getCouponPath = "http://www.bjshengkang.cn/shopPhone/coupon/getCouponPath/";  //宠物
//var getCouponPath = "http://shop.bjshengkang.cn/shopPhone/coupon/getCouponPath/";  //恩喜曼
//var getCouponPath = "http://shop.bonjk.com/shopPhone/coupon/getCouponPath/";		//棒健康
var getCouponPath = "http://js.lishusuan.net/coupon/getCouponPath/";		//江苏测试

/** 跳转到临时订单支付页面的路径（宠物使用） **/
//var temporaryOrderPath = "http://192.168.2.22:8079/shopPhone/order/temporaryOrderDetail/";   //我本地不再使用
//var temporaryOrderPath = "http://www.bjshengkang.cn/shopPhone/order/temporaryOrderDetail/";  //宠物
//var temporaryOrderPath = "http://shop.bjshengkang.cn/shopPhone/order/temporaryOrderDetail/";  //恩喜曼
//var temporaryOrderPath = "http://shop.bonjk.com/shopPhone/order/temporaryOrderDetail/";   //棒健康
var temporaryOrderPath = "http://js.lishusuan.net/order/temporaryOrderDetail/";   //江苏测试

$(function(){
/*	$(window).bind('beforeunload',function(){
		$.ajax({
	  		url : getRootPath()+"/login/exit.action",
	  		type:"POST",
	 		dataType : "text",
			success : function(result) {
				alert(1);
			}
		});
		return "走吗？";
	})*/
	//序列化表单转换成json
	$.fn.serializeObject = function()
	{
	  var o = {};
	  var a = this.serializeArray();
	  $.each(a, function() {
	    if (o[this.name] !== undefined) {
	      if (!o[this.name].push) {
	        o[this.name] = [o[this.name]];
	      }
	      o[this.name].push(this.value || '');
	    } else {
	      o[this.name] = this.value || '';
	    }
	  });
	  return o;
	};
})



$(function(){
	$.ajaxSetup({  
	    cache: false, //close AJAX cache  
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",   
	    complete:function(XHR,textStatus){ 
	        var resText = XHR.responseText;  
	        if(resText=='9999'){     
	            window.location.href = 'login.jsp'; 
	        }  
	    }   
	}); 
})
function showTime(){
	$('.easyui-datetimebox').datetimebox({
		formatter:function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			var h = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();
			var str = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+' '+(h<10?('0'+h):h)+':'+(min<10?('0'+min):min)+':'+(sec<10?('0'+sec):sec);
			return str;
		},
		parser:function(s){
			if (!s) return new Date();
			var y = s.substring(0,4);
			var m =s.substring(5,7);
			var d = s.substring(8,10);
			var h = s.substring(11,13);
			var min = s.substring(14,16);
			var sec = s.substring(17,19);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d) && !isNaN(h) && !isNaN(min) && !isNaN(sec)){
				return new Date(y,m-1,d,h,min,sec);
			} else {
				return new Date();
			}
		}	
	})
}

/**
 * 日期格式化
 */
function showDate(){
	$('.easyui-datebox').datebox({ //格式化日期
	    formatter: function(date){ 
	    	var y = date.getFullYear();  
	    	var m = date.getMonth() + 1;  
	    	var d = date.getDate();  
	    	return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);  
	    },
	    parser: function(s){
	    	if (!s) return new Date();
	    	var ss = (s.split('-'));
	    	var y = parseInt(ss[0],10);
	    	var m = parseInt(ss[1],10);
	    	var d = parseInt(ss[2],10);
	    	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
	    		return new Date(y,m-1,d);
	    	} else {
	    		return new Date();
	    	}
	    }
	})
}

function add_zero(temp){
    if(temp<10) 
    	return "0"+temp;
    else 
    	return temp;
}

//js获取项目根路径，如： http://localhost:8080/jjyl
function getRootPath(){
    //获取当前网址，如： http://localhost:8080/jjyl/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： /jjyl/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}

/*
 * jsp页面之间跳转获取参数值
 * 参数：参数的属性名
 */
function getUrlParam(name) {
	// 构造一个含有目标参数的正则表达式对象
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	// 匹配目标参数
	var r = window.location.search.substr(1).match(reg);
	// 返回参数值
	if (r != null)
		return unescape(r[2]);
	return null;
}

/**
 * 
 * @param url 路径
 * @param params 获取参数的key键
 * @returns
 */
//获取Url中某参数的值
function getUrlParamsValueMy(url, params) {
    var value = null;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            try {
                if (strs[i].split("=")[0] == params) {
                    value = decodeURI(strs[i].split("=")[1]);
                    break;
                }
            } catch (e) {
                value = strs[i].split("=")[1];
                break;
            }
        }
    }

    return value;
}

/*根据需求通过时间获取编号*/
function getCommonCode(pre){
	var time =  new Date();
	
	var year = time.getYear() + 1900;
	var month = time.getMonth() + 1;
	if (month<10) {month = "0" + month;}
	var date = time.getDate();
	if (date < 10) {date = "0" + date;}
	var hour = time.getHours();
	if (hour < 10) {hour = "0" + hour;}
	var minite = time.getMinutes();
	if (minite < 10) {minite = "0" + minite;}
	var second = time.getSeconds();
	if (second < 10) {second = "0" + second;}
	var misecond = time.getMilliseconds();
	var codeStr = year+''+month+''+date+''+hour+''+minite+''+second+''+misecond;
	return(pre+''+codeStr);
}
     /**
      * FORM 公用方法表单 是否启用验证功能
      * 说明：必须有required=true  和class 类名
      * @param formID  Form表单 ID
      * @param ifUse  true:启用验证   false:关闭验证
      * @author Dsm
      * @date  2015-08-28
      */
     function comIsValidate(formID,ifUse){
     	$("#"+formID+" input").each(function () {
     	    if ($(this).attr('required')=='required' && $(this).attr('class')!=undefined){
     	    	
     	    	 if($(this).attr('class').indexOf("easyui-combotree")>=0)
       		    {
           			var mv=$(this).combotree('getValue');	
       		        $(this).combotree({required:ifUse});
       		        $(this).combotree("setValue",mv);
       		    }else  if($(this).attr('class').indexOf("easyui-validatebox")>=0)
         		{ 
         		    $(this).validatebox({required:ifUse});
         		}else if($(this).attr('class').indexOf("easyui-datebox")>=0)
         		{ 
         		    var mv=$(this).datebox("getValue");	
           		    $(this).datebox({required:ifUse});
           		    $(this).datebox("setValue",mv);
           		}else if($(this).attr('class').indexOf("easyui-combobox")>=0)
       		    {
           			var mv=$(this).combobox('getValue');	
       		        $(this).combobox({required:ifUse});
       		        $(this).combobox("setValue",mv);
       		    }else if($(this).attr('class').indexOf("easyui-numberbox")>=0)
       		    {
           			var mv=$(this).numberbox('getValue');	
       		        $(this).numberbox({required:ifUse});
       		        $(this).numberbox("setValue",mv);
       		    }else if($(this).attr('class').indexOf("easyui-textbox")>=0)
       		    {
           			var mv=$(this).textbox('getValue');	
       		        $(this).textbox({required:ifUse});
       		        
       		        $(this).textbox("setValue",mv);
       		    }
     	    }
     	})
     }
 

    	/* 密码由字母和数字组成，至少6位 */
    	var commonsafePassword = function (value) {
    	    return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
    	}

    	var commonidCard = function (value) {
    	    if (value.length == 18 && 18 != value.length) return false;
    	    var number = value.toLowerCase();
    	    var d, sum = 0, v = '10x98765432', w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
    	    var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
    	    if (re == null || a.indexOf(re[1]) < 0) return false;
    	    if (re[2].length == 9) {
    	        number = number.substr(0, 6) + '19' + number.substr(6);
    	        d = ['19' + re[4], re[5], re[6]].join('-');
    	    } else d = [re[9], re[10], re[11]].join('-');
    	    if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
    	    for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
    	    return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
    	}
    	var isDateTime = function (format, reObj) {
    	    format = format || 'yyyy-MM-dd';
    	    var input = this, o = {}, d = new Date();
    	    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    	    var len = f1.length, len1 = f3.length;
    	    if (len != f2.length || len1 != f4.length) return false;
    	    for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
    	    for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
    	    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    	    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    	    o.dd = s(o.dd, o.d, d.getDate(), 31);
    	    o.hh = s(o.hh, o.h, d.getHours(), 24);
    	    o.mm = s(o.mm, o.m, d.getMinutes());
    	    o.ss = s(o.ss, o.s, d.getSeconds());
    	    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    	    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    	    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    	    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    	    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    	    return reVal && reObj ? d : reVal;
    	    function s(s1, s2, s3, s4, s5) {
    	        s4 = s4 || 60, s5 = s5 || 2;
    	        var reVal = s3;
    	        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
    	        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
    	        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    	    }
    	};

      /**
       * 以上自定义验证举例
       * 手机1：<input validType="mobile" id="txtMobile1" name="mobile1" type="text" />   验证手机格式
       * 手机2：<input validType="equalTo[#txtMobile1]" id="txtMobile2" name="mobile2" type="text" />  验证手机2与手机1输入的是否一致
       * 
       * 
       * 
       */
/**
 * 禁用form表单中所有的input[文本框、复选框、单选框],select[下拉选],多行文本框[textarea] 
 * Dsm
 * 2015-9-21
 * @param formId       FORM ID
 * @param isDisabled   TRUE 禁用  False 启用
 */
   function commDisableForm(formId,isDisabled) {  
	  
	    var attr="disable";  
	    if(!isDisabled){  
	       attr="enable";  
	    }  
	    $("form[id='"+formId+"'] :text").attr("disabled",isDisabled);  
	    $("form[id='"+formId+"'] textarea").attr("disabled",isDisabled);  
	    $("form[id='"+formId+"'] select").attr("disabled",isDisabled);  
	    $("form[id='"+formId+"'] :radio").attr("disabled",isDisabled);  
	    $("form[id='"+formId+"'] :checkbox").attr("disabled",isDisabled);  
	      
	    //禁用jquery easyui中的下拉选（使用input生成的combox） 
	  
	   $("#" + formId + " input[class='combobox-f combo-f']").each(function () {  
	        if (this.id) { 
	            $("#" + this.id).combobox(attr);  
	        }  
	    });  
	      
	    //禁用jquery easyui中的下拉选（使用select生成的combox） 
	    $("#" + formId + " select[class='combobox-f combo-f']").each(function () {  
	        if (this.id) {  
	            $("#" + this.id).combobox(attr);  
	       }  
	    });  
	      
	    //禁用jquery easyui中的日期组件dataBox  
	    $("#" + formId + " input[class='datebox-f combo-f']").each(function () {  
	        if (this.id) {  
	            $("#" + this.id).datebox(attr);  
	       }  
	    });  
	} 

   /**
    * @param    dateID    时间框的ID
    * @param    ifNeed    true  需要验证选择的时间》=当前时间   false 不需要验证 
    * @param    dateBoxType  datebox  ,datetimebox   表示验证的是哪种时间框
    */
   function comDateBoxValue(dateID,ifNeed,dateBoxType){
   	 
   	   if(dateBoxType=="datebox"){
   				   $('#'+dateID).datebox().datebox('calendar').calendar({
   						validator: function(date1){
   							var date = new Date();
   							var y = date.getFullYear();
   							var m = date.getMonth();
   							var d = date.getDate();
   							var h = date.getHours();
   							var min = date.getMinutes();
   							var sec = date.getSeconds();
   							var d1 = new Date(y, m, d);
   							return d1<=date1 ;
   						}
   					});
   	   }else if(dateBoxType=="datetimebox"){
   				 $('#'+dateID).datetimebox().datetimebox('calendar').calendar({
   						validator: function(date1){
   							var date = new Date();
   							var y = date.getFullYear();
   							var m = date.getMonth();
   							var d = date.getDate();
   							var h = date.getHours();
   							var min = date.getMinutes();
   							var sec = date.getSeconds();
   							var d2 = new Date(y, m, d,h,min,sec);
   							return d2<=date1 ;
   						}
   					});
   	   }
   	 
   }  
   /**
    * @param    dateID    时间框的ID
    * @param    ifNeed    true  需要验证选择的时间<=当前时间   false 不需要验证 
    * @param    dateBoxType  datebox  ,datetimebox   表示验证的是哪种时间框
    */
   function comDateBoxBelowValue(dateID,ifNeed,dateBoxType){
   	 
   	   if(dateBoxType=="datebox"){
   				   $('#'+dateID).datebox().datebox('calendar').calendar({
   						validator: function(date1){
   							var date = new Date();
   							var y = date.getFullYear();
   							var m = date.getMonth();
   							var d = date.getDate();
   							var h = date.getHours();
   							var min = date.getMinutes();
   							var sec = date.getSeconds();
   							var d1 = new Date(y, m, d);
   							return d1>=date1 ;
   						}
   					});
   	   }else if(dateBoxType=="datetimebox"){
   				 $('#'+dateID).datetimebox().datetimebox('calendar').calendar({
   						validator: function(date1){
   							var date = new Date();
   							var y = date.getFullYear();
   							var m = date.getMonth();
   							var d = date.getDate();
   							var h = date.getHours();
   							var min = date.getMinutes();
   							var sec = date.getSeconds();
   							var d2 = new Date(y, m, d,h,min,sec);
   							return d2>=date1 ;
   						}
   					});
   	   }
   	 
   } 
   /**
    *修改传人的时间  
    *传人2015-02-1223:22:33
    *返回 2015-02-12 23:22:33
    **/
   
  function upBaiduDate(udate){
     	var ndate="";
     	if(udate!=''){
     	   var sdate=udate.substr(0,10);
        	 var edate=udate.substr(10);
        	 ndate=sdate+" "+edate;
        }
     	  return ndate;
 }
      
  /**
   *根据老人ID返回基本信息,仅演示使用,写死的数据 
   *
   *返回 2015-02-12 23:22:33
  *	$('#nurseLevel').val("一级看护");
	$('#foodType').val("营养餐");
	$('#baseAccountBalance').val(1000);			
	$('#berthInfo').val("1号楼301房");
	$('#inDate').val("2015-01-20");
   **/   
  function getOlderInfoById(fid)
  {
	  var datas=[{id:1,nurseLevel:"一级看护",foodType:"营养餐",baseAccountBalance:1000,berthInfo:"1号楼301房",inDate:"2015-01-20"},
	             {id:2,nurseLevel:"二级看护",foodType:"滋补餐",baseAccountBalance:1000,berthInfo:"2号楼101房",inDate:"2014-06-18"},
	             {id:60,nurseLevel:"二级看护",foodType:"营养餐",baseAccountBalance:1000,berthInfo:"2号楼102房",inDate:"2014-02-05"}
	             ]
	  var result =[];
	  $(datas).each(function(i,item){
		  if (item.id==fid)
			  {
			  result = item ;		
			  
			  }		
	  });
	  return result;
  }
  
  
/**
 *	处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
 */
function banBackSpace(e){   
    var ev = e || window.event;//获取event对象   
    var obj = ev.target || ev.srcElement;//获取事件源   
    var t = obj.type || obj.getAttribute('type');//获取事件源类型  
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    //处理null值情况
    vReadOnly = (vReadOnly == "") ? false : vReadOnly;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& vReadOnly=="readonly")?true:false;
    //当敲Backspace键时，事件源类型非密码、number型、单行、多行文本的，则退格键失效
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" && t != "number")?true:false;    
    //判断
    if(flag2){
        return false;
    }
    if(flag1){   
        return false;   
    }   
}

/**
 *  监控键盘事件
 */
window.onload=function(){
    //禁止后退键 作用于Firefox、Opera
    document.onkeypress=banBackSpace;
    //禁止后退键  作用于IE、Chrome
    document.onkeydown=banBackSpace;
}
    
/**
 * 获取当前系统的日期和星期
 * chenql
 */
function getDateAndWeek(){
	var week;
	var day = new Date().getDay();
	if(day == 0){
		week = "星期日";
	}else if(day == 1){
		week = "星期一";
	}else if(day == 2){
		week = "星期二";
	}else if(day == 3){
		week = "星期三";
	}else if(day == 4){
		week = "星期四 ";
	}else if(day == 5){
		week = "星期五";
	}else if(day == 6){
		week = "星期六";
	}
	return new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日  "+week;
}

function justLayout(divId,queryConditionHeight){
	document.getElementById(divId).style.height = (document.body.clientHeight-queryConditionHeight) + 'px'; 
	
}
function gettomcatrootPath(){
    //获取当前网址，如： http://localhost:8080/jjyl/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： /jjyl/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
   // var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht);
}

function scscms_alert(msg,sign,ok,can){
	var c_=false;//是否已经关闭窗口，解决自动关闭与手动关闭冲突
	sign=sign||"";
	var s="<div id='mask_layer'></div><div id='scs_alert'><div id='alert_top'></div><div id='alert_bg'><table width='260' align='center' border='0' cellspacing='0' cellpadding='1'><tr>";
	if (sign!="")s+="<td width='45'><div id='inco_"+sign+"'></div></td>";
	s+="<td id='alert_txt'>"+msg+"</td></tr></table>";
	if (sign=="confirm"){
		s+="<a href='javascript:void(0)' id='confirm_ok'>确 定</a><a href='javascript:void(0)' id='confirm_cancel'>取 消</a>";
	}else{
		s+="<a href='javascript:void(0)' id='alert_ok'>确 定</a>"
	}
	s+="</div><div id='alert_foot'></div></div>";
	$("body").append(s);
	$("#scs_alert").css("margin-top",-($("#scs_alert").height()/2)+"px"); //使其垂直居中
	$("#scs_alert").focus(); //获取焦点，以防回车后无法触发函数

	if (typeof can == "number"){
	//定时关闭提示
		setTimeout(function(){
			close_info();
		},can*1000);
	}
	function close_info(){
	//关闭提示窗口
		if(!c_){
		$("#mask_layer").fadeOut("fast",function(){
			$("#scs_alert").remove();
			$(this).remove();
		});
		c_=true;
		}
	}
	$("#alert_ok").click(function(){
		close_info();
		if(typeof(ok)=="function")ok();
	});
	$("#confirm_ok").click(function(){
		close_info();
		if(typeof(ok)=="function")ok();
	});
	$("#confirm_cancel").click(function(){
		close_info();
		if(typeof(can)=="function")can();
	});
	function modal_key(e){	
		e = e||event;
		close_info();
		var code = e.which||event.keyCode;
		if (code == 13 || code == 32){if(typeof(ok)=="function")ok()}
		if (code == 27){if(typeof(can)=="function")can()}		
	}
	//绑定回车与ESC键
	if (document.attachEvent)
		document.attachEvent("onkeydown", modal_key);
	else
		document.addEventListener("keydown", modal_key, true);
}

/**
 * 根据数据库字典表设置Radio
 * @param dicType  字典类型
 * @param name     界面属性名称   
 * @param compId   控件ID
 */
function queryDicForRadio(dicType,name,compId){
	$.ajax({
		url:getRootPath()+'/dic/queryDic.action?dic_type='+dicType,
		dataType:"text",
		type:"POST",
		success:function(result){
			var orderserve=eval("("+result+")");// 将返回的JSON字符串转换成JSON(取出字符串的引号)
			// 控制查看
			var a = orderserve;
			var html="";
			$.each(a,function(i,item){
				html=html+"<input type='radio' id='"+name+item.DIC_CODE + "' name='"+name+"' value="+item.DIC_CODE+"  /> "+item.DIC_NAME+"";
			});
			$("#"+compId).append(html);
		}
	});

}

/**
 * 根据数据库字典表设置Radio
 * @param dicType  字典类型
 * @param name     界面属性名称   
 * @param compId   控件ID
 */
function queryDicForRadioDisabled(dicType,name,compId){
	$.ajax({
		url:getRootPath()+'/dic/queryDic.action?dic_type='+dicType,
		dataType:"text",
		type:"POST",
		success:function(result){
			var orderserve=eval("("+result+")");// 将返回的JSON字符串转换成JSON(取出字符串的引号)
			// 控制查看
			var a = orderserve;
			var html="";
			$.each(a,function(i,item){
				html=html+"<input type='radio' disabled='true' id='"+name+item.DIC_CODE + "' name='"+name+"' value="+item.DIC_CODE+"  /> "+item.DIC_NAME+"";
			});
			$("#"+compId).append(html);
		}
	});

}
/**
 * 根据数据库字典表设置Radio
 * @param dicType  字典类型
 * @param name     界面属性名称   
 * @param compId   控件ID
 */
function queryDicForRadioSome(dicType,name,compId){
	$.ajax({
		url:getRootPath()+'/dic/queryDic.action?dic_type='+dicType,
		dataType:"text",
		type:"POST",
		success:function(result){
			var orderserve=eval("("+result+")");// 将返回的JSON字符串转换成JSON(取出字符串的引号)
			// 控制查看
			var a = orderserve;
			var html="";
			$.each(a,function(i,item){
				html=html+"<input type='radio' id='"+name+"s"+item.DIC_CODE + "' name='"+name+"' value="+item.DIC_CODE+"  /> "+item.DIC_NAME+"";
			});
			$("#"+compId).append(html);
		}
	});

}


/**
 * 根据数据库字典表设置Checkbox
 * @param dicType  字典类型
 * @param name     界面属性名称   
 * @param compId   控件ID
 */
function queryDicForCheckbox(dicType,name,compId){
	$.ajax({
		url:getRootPath()+'/dic/queryDic.action?dic_type='+dicType,
		dataType:"text",
		type:"POST",
		success:function(result){
			var orderserve=eval("("+result+")");// 将返回的JSON字符串转换成JSON(取出字符串的引号)
			// 控制查看
			var a = orderserve;
			var html="";
			$.each(a,function(i,item){
				html=html+"<input type='checkbox' id='"+name+item.DIC_CODE + "' name='"+name+"' value="+item.DIC_CODE+"  /> "+item.DIC_NAME+"";
			});
			$("#"+compId).append(html);
		}
	});

}


/**
 * 根据数据库字典表设置Combobox
 * @param dicType 字典类型
 * @param compId  控件ID
 */
function queryDicForCombobox(dicType,compId){	
	$("#"+compId).combobox(
			           {url:getRootPath()+'/dic/queryDic.action?dic_type='+dicType,   
					    valueField:'DIC_CODE',   
					    textField:'DIC_NAME',
						editable:false,
						onLoadSuccess: function () { //数据加载完毕事件
//							$("#"+compId).combobox('setValue', "");
//							$("#"+compId).combobox('setText', "请选择");
//				               var data = $("#"+compId).combobox('getData');
//				               if (data.length > 0) {
//				                   $("#sorgDuties").combobox('select', data[0].value);
//				               }
				           }
					   
					  });
}

/**
 * 根据数据库字典表设置Combobox(有请选择提示)
 * @param dicType 字典类型
 * @param compId  控件ID
 */
function queryDicForComboboxWithTip(dicType,compId){	
	$("#"+compId).combobox({
		url:getRootPath()+'/dic/queryDic.action?dic_type='+dicType,   
		valueField:'DIC_CODE',   
		textField:'DIC_NAME',
		editable:false,
		onLoadSuccess: function () { //数据加载完毕事件
			$("#"+compId).combobox('setValue', "");
			$("#"+compId).combobox('setText', "请选择");
		}
	});
}



/**
 * 查询列表中根据字典类型和value返回字典名称
 * @param dic_type 字典类型
 * @param dic_code 字典代码
 * @returns
 * 用法：
 * {field : 'BZR_NAME',title : '班主任姓名',width : 180,align : 'center',
			 formatter:function(value){ return queryDicName("APPLY_TYPE",value); },
			 sortable : 'true',resizable : 'true'}
 */
function queryDicName(dic_type,dic_code){
	var name ="";
	$.ajax({
		url:getRootPath()+'/dic/queryDicName.action?dic_type='+dic_type+'&dic_code='+dic_code,
		async:false,
		dataType:"text",
		type:"POST",
		success:function(result){
			name =  result;
		}
	});
	return name;
}


/**
 * 设置easyui控件是否可用（注：当前只适用于继承textbox的easyui控件）
 * @param parentId 父控件Id
 * @param isDisabled 是否可用
 */
function isDisableCtrls(parentId,isDisabled) {  
    var attr="disable";  
    if(!isDisabled){  
       attr="enable";  
    }  
    
	$("#" +parentId + " :input").each(function () {  
		try {
			$("#" +parentId+ " input[id='"+this.id+"']").textbox(attr);
		} catch (e) {}
		try {
			$("#" +parentId+ " input[textboxname='"+this.name+"']").textbox(attr);
		} catch (e) {}	
    });
}

/**
 * 查看流程图
 * @param taskCode
 */
function viewWorkFlow(taskCode){
	
	var mes="0"
		$.ajax({
			url : getRootPath()+"/workflow/checkTaskCode.action",
			type : 'POST',
			dataType : 'TEXT',
			async : false,
			data : {id : taskCode},
			success : function(result){
				mes=result;
			}
		});
		if(mes=="0"){
			$.messager.alert('提示','您还未提交申请,无法查看流程!');
			return;
		}
	
	parent.closeAndOpenNewTab(taskCode,'查看流程图',getRootPath()+'/pages/workflow/viewWorkFlow.jsp?taskCode='+taskCode,null);
}


/**
 * 在Tab页界面中连接到其他界面
 * @param url:链接的url
 * @param isConfirmwhenFresh:通过Tab上图标刷新界面是否提醒。true：提醒；false：不提醒
 */
function linkPage(url,isConfirmwhenFresh) {
	if(isConfirmwhenFresh==true){
		parent.setIframeIdAndUrl(getRootPath() + url);
	}else{
		//调用tabs.js内的updateTabUrl方法：需要修改iframe的src
		parent.updateframeUrl(getRootPath() + url);
	}
	
}

/**
 * null转化为空字符串
 * @param value
 * @returns
 */
function nullToEmpty(value){
	if(value == null){
		return '';
	}
	return value;
}

/**
 * 获取复选框的值（字符串类型，例：1,2,3）
 * @param parentId （父控件Id）
 * @param checkBoxName （checkbox名称）
 * return String 
 */
function getCheckBoxValue(parentId,checkBoxName){
	var result="";
	$("#"+parentId+" input:checkbox[name='"+checkBoxName+"']:checked").each(function(i){
		result += "," +  $(this).val();
	})
	result = result.substring(1);
	return result;
}

//采用正则表达式获取地址栏参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

/**  js获取uuid **/
function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    //s[8] = s[13] = s[18] = s[23] = "-";
    s[8] = s[13] = s[18] = s[23] = "";
    var uuid = s.join("");
    return uuid;
}
/**
 * 中文汉字转Unicode
 * @param str
 * @returns {String}
 */
function unicode(str){
    var value='';
    for (var i = 0; i < str.length; i++) {
        value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
    }
    return value;
}
function left_zero_4(str) {
    if (str != null && str != '' && str != 'undefined') {
        if (str.length == 2) {
            return '00' + str;
        }
    }
    return str;
}
/**
 * Unicode转中文汉字、ASCII转换Unicode
 * @param str
 * @returns
 */
function reconvert(str){ 
    str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
    }); 
    str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
    }); 
    str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
    }); 
     
    return str; 
}
/**
*返回表格单元格的内容，用于单元格内容较大的单元格
*@param value   内容
*@valueLen      允许显示的长度
*/
function showColumnValue(value,valueLen){
	var showValue = value;
	var titleValue = value;
	var j = 0;
	if(value && value.length>valueLen){
		showValue = showValue.substring(0,valueLen)+"...";
		if(value.length>50){
			titleValue = "";
			for(var i=25;i<value.length;i=i+25){
				titleValue = titleValue + value.substring(i-25,i)+"&#10;"
				j = i;
			}
			titleValue = titleValue + value.substring(j,value.length);
		}
	}
	if(titleValue != "" && titleValue != null )
		titleValue = titleValue.replace(/>/g, "&gt;");
	if(showValue != "" && showValue != null )
		showValue = showValue.replace(/>/g, "&gt;");
	return '<span title='+titleValue+'>'+showValue+'</span>';
}
/**
 * 提交按钮的禁用开启
 * @param ift        true  禁用; false  启用
 * @param submit_id  禁用按钮的id
 */
function disable_submit(ift,submit_id){
	if(ift){
	  $("#"+submit_id).addClass("layui-btn-disabled");  
	  $("#"+submit_id).attr("disabled",true); 
	}else{
	  $("#"+submit_id).removeClass("layui-btn-disabled");
	  $("#"+submit_id).attr("disabled",false); 
	}
}
/**
 * 判断对象是否为空
 * @param obj
 */
function isNotEmpty(obj){
	if(obj!=null && obj!='' && obj!=undefined){
		return true;
	}else{
		return false;
	}
}

/**
 * 获取客户端当前时间
 * @returns {String}
 */
function getNowTime(){
	var time =  new Date();
	var year = time.getYear() + 1900;
	var month = time.getMonth() + 1;
	if (month<10) {month = "0" + month;}
	var date = time.getDate();
	if (date < 10) {date = "0" + date;}
	var hour = time.getHours();
	if (hour < 10) {hour = "0" + hour;}
	var minite = time.getMinutes();
	if (minite < 10) {minite = "0" + minite;}
	var second = time.getSeconds();
	if (second < 10) {second = "0" + second;}
	var misecond = time.getMilliseconds();
	var codeStr = year+'-'+month+'-'+date+' '+hour+':'+minite+':'+second;
	return codeStr;
}
/**
 * 获取服务器端时间
 */
function queyNowTimeByServer(){
	var t_n="";
	$.ajax({
        url : getRootPath()+"/commodity/queryNowTime.action",
        type : "post",
        async: false,
        "dataType":"json",
        success : function (gdata) {
        	if(gdata!=null){
        		t_n=gdata.date;
        	}
        }
    })
    return t_n;
}
/**
 * 去除字符串前后空格
 * @param str
 * @returns
 */
function toTrim(str){
	if(str != null){
		str = str.replace(/(^\s*)|(\s*$)/g,'');
	}else{
		str = "";
	}
	return str;
}


/**
 * 列表头浮动在视野内：向下滚动鼠标滑轮将要看不到表头时自动浮动表头。
 * @param tableId：表格id
 * @param tHeadId:表头id
 */
function fixHead(tableId,tHeadId){
	var scroll_bar = "#"+tableId;//表格的id
    var bar_head = "#"+tHeadId;//表头
    var bar_width = $(bar_head).width();
    var bar_height =$(bar_head).height();
    var left =$(scroll_bar).offset().left;
    var sroll_header= $(scroll_bar).clone().attr('id','bb');//更改复制的表格id
    $(window).resize(function() {
    	bar_width = $(bar_head).width();
        bar_height = $(bar_head).height();
        left =$(scroll_bar).offset().left;
        $("#shelter").css({'height':bar_height,'position':'fixed','top':'0','overflow':'hidden','width':bar_width,'margin-top': '0','left':left,'right':'0','border-bottom':'1px solid #c8c8c8'});
    })
    $(window).scroll(function(){
        var scroll_top = $('body').scrollTop() - $(scroll_bar).offset().top;//判断是否到达窗口顶部
        if (scroll_top > 0) {
            $('body').append('<div id="shelter"></div>');//复制的表格所在的容器
            $("#shelter").css({'height':bar_height,'position':'fixed','top':'0','overflow':'hidden','width':bar_width,'margin-top': '0','left':left,'right':'0','border-bottom':'1px solid #c8c8c8'});
            sroll_header.appendTo('#shelter');
            $('#shelter table').removeClass(); //删除table原来有的默认class，防止margin,padding等值影响样式
            $('#shelter table').css({'width':'100%','hieght':'100%','background-color':'#f0f0f0'});
            $('#shelter table tr th').css({'height': bar_height,'border':'1px solid #c8c8c8'});//此处可以自行发挥
            $('#shelter table tr th').css({'font-size':'14px','padding':'10px','text-align':'center','line-heght':bar_height});
            $('#shelter').show();

        }else {
            $('#shelter').hide();
            $('#shelter').empty();
        }
    });   
}

/**
 * 把字符串里的空格全部替换为特殊字符
 */
function replaceAllSpace(str){
    return str.replace(/ /g, '@@##');
}
/**
 * 根据之前的空格转特殊字符进行还原空格
 * @param str
 * @returns
 */
function unReplaceSpace(str){
	return str.replace(/(@@##)/g, ' ');
} 
//公用的layui的提示
function alert_mess(mess){
	parent.layer.alert(mess, {
		icon : 5
	});
}
/**
 * 对用户角色中具体页面的功能授权的判断
 * @param menuPath   页面路径 如(商品页面) /pages/commodity/manage/commodityList.jsp
 */
function featuresFilter(menuPath){
	$.ajax({
        url : getRootPath()+"/role/queryFeaturesByRole.action",
        type : "post",
        data:{'menuPath':menuPath},
        "dataType":"text",
        success : function (gdata) {
        	if(gdata!=null && gdata!=""){
        		 for(var ftag in gdata.split(",")){
        			 $("."+gdata.split(",")[ftag]).addClass("layui-btn-disabled");  
        			 $("."+gdata.split(",")[ftag]).attr("onclick",""); 
        			 $("."+gdata.split(",")[ftag]).attr("disabled",true); 
        		 }
        	}
        }
    })
}

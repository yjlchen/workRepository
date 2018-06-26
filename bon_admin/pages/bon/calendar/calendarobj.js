function bornCalendar (tableid) {
        //生成表头结构以及声明一些公共变量
        let tabhtml = `
        <thead class="t_title"> 
            <tr>
                <th colspan="2" class="prev"><span>上个月</span></th>
                <th colspan="2"></th>
                <th colspan="2" class="next"><span>下个月</span></th>
                <th colspan="2" class="now"><span>回到今天</span></th>
            </tr>
        </thead>
        <tbody>       
            <tr>
                <td>一</td>
                <td>二</td>
                <td>三</td>
                <td>四</td>
                <td>五</td>
                <td><span>六</span></td>
                <td><span>日</span></td>
            </tr>
        </tbody>
    `
       $(tableid).append(tabhtml);
       let now_year = this.now_year//今天对应的年份
       let now_month = this.now_month//今天对应的月份(0-11)
       let now_date = this.now_date;//今天是几号
       writeHead(now_year,now_month);//填写表头
       //var thingsStr = [{"id":"20180420","time":"2018.4.20","title":"去北京","content":"吃烤鸭"},{"id":"20180421","time":"2018.4.21","title":"去南京","content":"吃板鸭"}];
       Calendar(now_year,now_month,now_date,thingsStr);//填写日历
       //Calendar(now_year,now_month,now_date,thingsStr1);//填写日历
       handleModal();//处理弹出框

//判断当前年是否是闰年
        function is_run(year) {
            this.year = year;
            return (this.year % 100 == 0 ? res = (this.year % 400 == 0 ? 1 : 0) : res = (this.year % 4 == 0 ? 1 : 0));
        }

//填写表头
        function writeHead(yearnow, monthnow) {
            this.yearnow = yearnow;
            this.monthnow = monthnow;
            $(tableid+'>thead.t_title>tr>th:nth-child(2)').html(this.yearnow + '年' + (this.monthnow + 1) + '月');
        }

//填写日历数据
        function Calendar(nowyear, nowmonth, nowdate) {

            this.nowyear = nowyear;

            this.nowmonth = nowmonth;

            this.nowdate = nowdate;

            let realDate = new Date();

            let realmonth = realDate.getMonth();

            let realyear = realDate.getFullYear();//实际日期用作判断

            $(tableid+' tbody tr:nth-child(1)').siblings().remove();//之前的隐藏

            let m_days = new Array(31, 28 + is_run(this.nowyear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //每个月的天数

            let firstday = new Date(this.nowyear, this.nowmonth, 1).getDay()+6//这个月1号对应的星期几

            let tr_str = Math.ceil((m_days[this.nowmonth] + firstday) / 7); //表格行数

            //循环创建日历
            for (var i = 0; i < tr_str; i++) {
                $(tableid+'>tbody').append('<tr></tr>');
                for (var j = 0; j < 7; j++) {
                    idx = i * 7 + j; //单元格序列号
                    date_str = idx - firstday + 1; //计算日期
                    if (date_str <= 0 || date_str > m_days[this.nowmonth]) {
                        date_str = "";
                        $(tableid+">tbody>tr").last().append(`<td class='day'> 
                        <span class="solarDay">${date_str}</span>
                        </td>`
                        );
                    } else {
                        date_str = idx - firstday + 1
                        $(tableid+">tbody>tr").last().append(`
                        <td class='day'> 
                        <span class="solarDay">${date_str}</span> 
                            <div class="lunarDay">
                                <span class="lunar_month">${calendar.solar2lunar(this.nowyear,this.nowmonth+1,date_str+1).IMonthCn}</span>
                                <span class="lunar_date">${calendar.solar2lunar(this.nowyear,this.nowmonth+1,date_str).IDayCn}</span>
                                <span class="lunar_weekday" data-weekday="${calendar.solar2lunar(this.nowyear,this.nowmonth+1,date_str).ncWeek}"></span>
                            </div>
                        </td>`
                        );
                    }
                }
            }

            var trarr = $(tableid+'>tbody>tr:nth-child(1)').siblings();//获取除表头外其他数据

            //循环填数据库数据，处理样式细节
            for (let k = 0; k < trarr.length; k++) {
                // console.log(trarr[k]);
               if($(trarr[k]).children('td').children('span.solarDay').text()==''){
                   $(trarr[k]).children('td').remove();//若一整行都为空删除整行
               }else{
                   for (let val of trarr[k].childNodes) {

                       let solarDay=$(val).children('span.solarDay').text();//阳历的日期

                       let datestr=nowyear+'.'+(nowmonth+1)+'.'+solarDay//用作比较的字符串

                       for(let i=0;i<thingsStr.length;i++){
                           if(thingsStr[i].time==datestr){
                               $(val).append(`<div class="showcontent" data-title="${thingsStr[i].title}" data-content="${thingsStr[i].content}">${thingsStr[i].title}</div>`)
                           }//请求来的字符串，传入表格内
                       }
                       //处理样式
                       if (realmonth == this.nowmonth && this.nowdate == $(val).children('span.solarDay').text() && realyear == this.nowyear) {
                           $(val).addClass('currentDay');
                           $(val).children('div.lunarDay').css('color','#FFFFFF');//当前日子的样式
                       } else if ($(val).children('span.solarDay').text()=='') {
                           $(val).removeClass('day');//若这里面的内容为空的去掉这个样式
                           $(val).children('div.showcontent').remove()
                       } else if($(val).children('div.lunarDay').children('span.lunar_date').text()!='初一'){
                           $(val).children('div.lunarDay').children('span.lunar_month').css('display','none')//不是初一的不加阴历月
                       }

                   }
               }
            }

        }

//处理上个月
        $(tableid+'>thead.t_title>tr>th:nth-child(1)>span').click(function(){
            if (now_month <= 0) {
                now_month = 11;
                now_year = now_year - 1;
            } else {
                now_month--;
            }
            
            getCalendar(now_year,now_month+1);
            
            Calendar(now_year, now_month,now_date,thingsStr);
            writeHead(now_year, now_month);
            handleModal();

        })

//处理下个月
        $(tableid+'>thead.t_title>tr>th:nth-child(3)>span').click(function(){
            if (now_month >= 11) {
                now_month = 0;
                now_year = now_year + 1;
            } else {
                now_month++;
            }
            
            //重新获取ajax
            getCalendar(now_year,now_month+1);
            
            Calendar(now_year, now_month,now_date,thingsStr);
            writeHead(now_year, now_month);
            handleModal();

        })

//处理回到今天
        $(tableid+'>thead.t_title>tr>th:nth-child(4)>span').click(function(){
            now_year=new Date().getFullYear();
            now_month=new Date().getMonth();
            now_date=new Date().getDate();
            
            //ajax获取信息
            getCalendar(now_year,now_month+1);
            
            Calendar(now_year,now_month,now_date,thingsStr);
            writeHead(now_year,now_month);
            handleModal();

    })

//处理生成模态框
        function modal(parent, cTime,titleInputed,contentInputed) {
        	
        	this.cTime=cTime;

            this.parent = parent;

            this.titleInputed = titleInputed;

            this.contentInputed=contentInputed;

            if ($(this.parent).children('div.modal').length == 0) {
                let outHtml = `
                        <div class="modal">
                            <div class="modalcontent">
                                <div style="font-size:.2rem;font-weight:bold;padding:.1rem 0;color:#000000">${this.cTime}</div>
                                <span class="title">标题</span> <input  maxlength="8" type="text" value="${this.titleInputed}" class="contentTitle">
                                <img src="image/close2.png" alt="" class="close">
                                <span class="content">内容</span><textarea  maxlength="25" name="inputpanel" id="contetTxt" autofocus="autofocus" required="required"  wrap="hard">${this.contentInputed}</textarea>
                                <button id="sure">确定</button>
                                <button id="cancel">取消</button>
                            </div>
                        </div>       
                    `//模态框的代码片段
                return $(parent).append(outHtml);//把模态框添加上
            }
        }

//此函数用来处理弹出框
        function handleModal() {
            $(tableid+'>tbody>tr:nth-child(1)').siblings().children(".day").on('click', function () {

                // $(this).css('color','#FF6307');//处理编辑过了

                let title=$(this).children('div.showcontent').data('title');
                
                let cyear=$('thead.t_title').children().children('th:nth-child(2)').text();//当前点击日期
                let cdate=$(this).children('span.solarDay').text();
                let cTime='【'+cyear+cdate+'】内容';

                let content=$(this).children('div.showcontent').data('content');

                if($(this).attr('class')=='day currentDay'){
                    $(this).css('background-color','#2EB6A8')
                }else{
                    $(this).css('background-color','#FFFFFF')
                }
                if ($(this).children('div.showcontent').length == 0) {//如果td中之前没有写的话
                    modal(this,cTime, '','')
                } else {
                    modal(this,cTime, title,content);
                }
            })
        }

//点击确定和取消回显数据
        $(tableid).on('click', '#sure', function () {

            let userInput1 = $('#contetTxt').val()//用户输入的内容

            let userInput2=$('input.contentTitle').val();//标题的值

            let lunardate=$(this).parent().parent().siblings('div.lunarDay').children('span.lunar_date').text();//阴历日期

            let lunarMonth=$(this).parent().parent().siblings('div.lunarDay').children('span.lunar_month').text();//阴历月份

            let week=$(this).parent().parent().siblings('div.lunarDay').children('span.lunar_weekday').data('weekday');;//星期

            let lunarTime="农历"+lunarMonth+lunardate;//阴历字符串、月日
            
            var dbMonth = now_month+1 + "";
            if (dbMonth.length < 2)
            	dbMonth = "0" + dbMonth;
            var dbDay = $(this).parent().parent().siblings('span.solarDay').text() + "";//阳历日期
            if (dbDay.length < 2)
            	dbDay = "0" + dbDay;
            
            let solarTime=now_year+'/'+dbMonth+'/'+dbDay;

          //拼接数据库ID
            var idMonth = now_month+1;
            var idDay = $(this).parent().parent().siblings('span.solarDay').text() + "";
            //年月日
            let id =  now_year + "." + idMonth +"." +idDay;
/*            console.log('用户输入的标题'+userInput2,'用户输入的内容：'+userInput1,'阴历日期：'+lunarTime,'阳历日期：'+solarTime+'星期' +week);
*/            updateCalendarData(id,userInput2,userInput1,lunarTime,solarTime,week);
        })
        $(tableid).on('click', 'button#cancel', function () {
            $(this).parent().parent('div.modal').remove();
        })
        $(tableid).on('click','img.close',function(){
            $(this).parent().parent('div.modal').remove();
        })
    }

bornCalendar.prototype.now_year = new Date().getFullYear();
bornCalendar.prototype.now_month = new Date().getMonth();
bornCalendar.prototype.now_date = new Date().getDate();



var thingsStr=""//初始化的数据

$(function(){
	initData();
	new bornCalendar('#calendar');
})

/*
 * 初始化当前月份的数据  
 */
function initData(){
	var month = new Date().getMonth() + 1 + "";
	var year = new Date().getFullYear();
	getCalendar(year,month);
}

/*
 * 根据月份查找数据,传入参数 年份，月份 例如 2018,1 2018,12
 */
function getCalendar(yearPar,monthPar){
	var searchP = yearPar +"."+ monthPar+".";
	var queryParam = {id : searchP}
	var addJsonStr=JSON.stringify(queryParam);
	$.ajax({
		url : getRootPath()+"/calendar/listCalendarByColmn.action",
		type : 'POST',
		dataType : 'TEXT',
		async : false,
		data : {queryJson:addJsonStr},
		success : function(result){
			var val =  JSON.parse(result); 
			thingsStr = val.data;
		}
	});
}

/*
 * 保存或者更新
 */
function updateCalendarData(id,title,content,lunar,solar,week){
	
	  title=toTrim(title);
	  content=toTrim(content);
	 
	  if (title.length==0){
		  alert("标题不能为空")
		  return ;
	  }
	  if (content.length==0){
		  alert("内容不能为空")
		  return ;
	  }
	  
	  if (getByteLen(title)>64){
/*		  console.log(getByteLen(title));
*/		  alert("标题过长,汉字长度不能超过32个字")
		  return ;
	  }
	  if (getByteLen(content)>64){
		  alert("内容过长,汉字长度不能超过32个字")
		  return ;
	  }
	  
	  var so = solar.split("/");
	  
	  var param = {
			id : id,
			title: title,
	  		content : content,
	  		lunar : lunar,
	  		solar : solar,
	  		weekday : week,
	  		solar_year_month : so[0]+"/"+so[1],
	  		solar_day: so[2]
	  }
	  	  
	  var queryJsonStr=JSON.stringify(param);
	  
	  $.ajax({
		  url : getRootPath()+"/calendar/saveCalendar.action",
			type : 'POST',
			dataType : 'TEXT',
			data : {queryJson:queryJsonStr},
			success : function(result){
				if("success"==result){
					//写到里面
					 let showHtml = "<div class='showcontent' data-title='"+title+"' data-content='"+content+"'>"+title+"</div>"
					 $('div.modal').parent().children('div.showcontent').remove()//之前写的删除
		             $('div.modal').parent().append(showHtml)//回显在页面上
		             $('div.modal').remove();//去掉模态框
				}else{
					alert("失败")
				}
			}
		});
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

/**
 * 去掉空格后去重
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

/*
 * 获取字符串长度（汉字算两个字符，字母数字算一个）
 */
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        }
        else {
            len += 1;
        }
    }
    return len;
}

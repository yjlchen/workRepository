<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- c -->
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<c:set value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort }${pageContext.request.contextPath}"
	   var="basePath" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no">
    <title>æ¥å--likai</title>
    <link rel="stylesheet" href="${basePath}/pages/bon/calendar/calendar.css">
    <script type="text/javascript">
        (function (doc, win) {
            var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if(clientWidth>750) clientWidth=750;
                    if (!clientWidth) return;
                    docEl.style.fontSize = Math.floor(100 * (clientWidth / 750)) + 'px';
                };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    </script>
    <script src="${basePath}/pages/bon/calendar/jquery-1.11.3.min.js"></script>
     <script src="lunarCalendar.js"></script>
</head>
<body>
    <table id="calendar" class="calendar">
    </table>
<script src="calendarobj.js">
</script>
</body>
</html>
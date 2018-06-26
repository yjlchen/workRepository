$(function(){
	$(".logo").hover(function() {
            $(".shop-info").css('display', 'block');
        }, function() {
           $(".shop-info").css('display', 'none');
	});
	$(".goods-buy-link").hover(function() {
            $(".js-popover-goods").css('display', 'block');
        }, function() {
           $(".js-popover-goods").css('display', 'none');
	});
	$(".btn-share").hover(function() {
            $(".js-popover-share").css('display', 'block');
        }, function() {
           $(".js-popover-share").css('display', 'none');
	});
	$(".btn-add-wx").hover(function() {
            $(".js-popover-weixin").css('display', 'block');
        }, function() {
           $(".js-popover-weixin").css('display', 'none');
	});
	$(".swiper-pagination-switch img").mouseover(function() {
        $(this).parent().addClass("swiper-active-switch");
        $(this).parent().siblings().removeClass("swiper-active-switch");
        var src = $(this).attr("src");
        $(".swiper-image img").attr("src", src);
    });
})
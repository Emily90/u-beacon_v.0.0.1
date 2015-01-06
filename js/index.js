/**
 * Created by zxj on 2014/12/5.
 */
$(document).ready(function () {
    //导航
    $("#navList>li").bind({
            mouseenter:function(){$("#navList").find("li").find("span").hide(); $("#navList").find("li").find("ul.drop_down").hide();},
            mouseover:function(){$(this).find("span").show();$(this).find("ul.drop_down").show();}
    });
    $("ul.drop_down").mouseout(function(){
        $("#navList").find("li").find("span").hide(); $("#navList").find("li").find("ul.drop_down").hide();
    });
    //页脚
    $("#cooperator").find("dl dd img").hover(function(){
        var imgSrcCur = $(this).attr("src").split(".png")[0]+'_cur.png';
        $(this).attr("src",imgSrcCur);
    }, function () {
        var imgSrc = $(this).attr("src").split("_cur.png")[0]+'.png';
        $(this).attr("src",imgSrc);
    });

    function mousePos(e){
        var x,y;
        var e = e||window.event;
        return {
        x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
        y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop
        };
        };
        function test(e){
        document.getElementById("mjs").innerHTML = mousePos(e).x+','+mousePos(e).y;    
    };

    $("#AppDownload").mouseover(function(event) {
        /* Act on the event */
        var pageX = mousePos(event).x;
        var pageY = mousePos(event).y;
        $(this).find('img').css({"display":"block"});
        $(this).find('img').css({"left":pageX,"top":pageY});
    });

    $("#AppDownload").mouseout(function(event) {
        /* Act on the event */
        $(this).find('img').css({"display":"none"});
    });

    $("#weibo").mouseover(function(event) {
        /* Act on the event */
        var pageX = mousePos(event).x;
        var pageY = mousePos(event).y;
        $(this).find('img').css({"display":"block"});
        $(this).find('img').css({"left":pageX,"top":pageY});
    });

    $("#weibo").mouseout(function(event) {
        /* Act on the event */
        $(this).find('img').css({"display":"none"});
    });
    //右侧导航
    var dotCur = 'style/img/bg_dot_rightnav02_zxj_141216_cur.png';
    var dotSrc = 'style/img/bg_dot_rightnav02_zxj_141216.png';

    $("#nav_title").find("li.cur").click(function() {
        var _index = $(this).index();
        var thisImage = $("#dot_id_02").find("li").eq(_index).find("img");
        thisImage.attr("src", dotCur);
    });
    $("#nav_title_02").find("li.cur").click(function(){
        var _index = $(this).index();
        var thisImage = $("#dot_id_02").find("li").eq(_index).find("img");
        thisImage.attr("src",dotCur);
    });

    //切换内容
    //每格三秒切换一屏
    //首页轮播特效
    var lock = false;
    var _indexTo = 0;//默认为0
    var windowsWidth = $(window).width();//窗口宽度
   // var slideBox = "#lunboBox"; //轮播的所有的DOM
    var slideUl  = '#lunboBox ul.bigImage';
   // var slideUlDot = '#lunboBox ul.dot_img';
    var slideImg = '#lunboBox ul.bigImage li';
    var slideDot = '#lunboBox ul.dot_img li';
    var slideNum = $(slideImg).length;//轮播图个数
    var slideLen = windowsWidth; //轮播图宽度
    var intervalTime = 3000;//每隔三秒
    var numTo;
    var ad;

    
    //为元素添加宽度
    $(slideUl).css({"width":windowsWidth*slideNum+"px"});//ul长度
    $(slideImg).css({"width":windowsWidth+"px"});//li长度
    //延迟加载
    $(slideImg).css({"display":"block"});
    //窗口大小变化时，重新获取宽度
    $(window).resize(function(){
        windowsWidth = $(window).width();
        slideLen = windowsWidth;
        $(slideUl).css({"width":windowsWidth*slideNum+"px"});//ul长度
        $(slideImg).css({"width":windowsWidth+"px"});//li长度
    });

    ad = window.setInterval(autoScroll,intervalTime);



    $(slideDot).click(function(){
        //清除计时
        clearInterval(ad);
        lock = true;
        var indexCur = $(this).index();
        //去掉高亮
        $(slideDot).removeClass("cur");
        //滑动到下一个
        $(slideImg).each(function(index){
            if(parseInt(indexCur) == parseInt($(this).attr("id"))){
                numTo = index;
            }
        });
        $(slideUl).animate({'margin-left':-slideLen},function(){
            for(var i =0;i<numTo;i++){
                $(slideImg).eq(0).appendTo($(slideUl));
            }
            $(slideUl).css({'margin-left':0});
        });
        //添加高亮
        $(slideDot).eq(indexCur).addClass("cur");
        lock = false;
        ad = window.setInterval(autoScroll,intervalTime);
    });

    //每隔三秒自动切换
    function autoScroll() {
        if(lock) {
            return;
        }
        //下一个
        $(slideDot).each(function(index){
            if($(this).hasClass("cur")){
                _indexTo = index;
                if(_indexTo != (slideNum-1)){
                    _indexTo ++;
                }else{
                    _indexTo = 0;
                }
            }
        });
        //去掉高亮
        $(slideDot).removeClass("cur");
        //滑动到下一个
        $(slideImg).each(function(index){
            if(parseInt(_indexTo) == parseInt($(this).attr("id"))){

                numTo = index;
            }
        });
        $(slideUl).animate({'margin-left':-slideLen},function(){
            for(var i =0;i<numTo;i++){
                $(slideImg).eq(0).appendTo($(slideUl));
            }
            $(slideUl).css({'margin-left':0});
        });
        //添加高亮
        $(slideDot).eq(_indexTo).addClass("cur");
    }

    //tab切换
    $("#cpycJob").find('li').hover(function(){
        var _indexCur = $(this).index();
        var len = $("#cpycJob").find('li').length;
        if(_indexCur != (len-1)){
            $("#cpycJob").find('li').removeClass("cur");
            $(this).addClass("cur");
            $(".u-beacon_ind04_zxj141208").hide();
            $(".u-beacon_ind04_zxj141208").eq(_indexCur).show();
        }else{
            $("#cpycJob").find('li').removeClass("cur");
            $(".u-beacon_ind04_zxj141208").hide();
            var total_len = $(".u-beacon_ind04_zxj141208").length;
            $(".u-beacon_ind04_zxj141208").each(function(index){
                if(index > (len-1)){
                    $(".u-beacon_ind04_zxj141208").eq(index).show();
                }
            });
            $("#cpycJob").find('li:last').addClass("cur");
        }
    });

    //鼠标划过显示右侧导航
    $(".dot_id").find("li").hover(function(){
        $(".intro").show();
    },function(){
        $(".intro").hide();
    });
    $(".intro").mouseover(function(){
        $(".intro").show();
    });
    $(".intro").mouseout(function(){
        $(".intro").show();
    });

     
     

});


// $(document).ready(function() 
// { 
// console.log("浏览器当前窗口可视区域高度:"+$(window).height()); //浏览器当前窗口可视区域高度 
// console.log("浏览器当前窗口文档的高度:"+$(document).height()); //浏览器当前窗口文档的高度 
// console.log("浏览器当前窗口文档body的高度:"+$(document.body).height());//浏览器当前窗口文档body的高度 
// console.log("浏览器当前窗口文档body的总高度 包括border padding margin:"+$(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin 
// console.log("浏览器当前窗口可视区域宽度:"+($(window).width())); //浏览器当前窗口可视区域宽度
// console.log("浏览器当前窗口文档对象宽度:"+$(document).width());//浏览器当前窗口文档对象宽度
// console.log("浏览器当前窗口文档body的高度:"+$(document.body).width());//浏览器当前窗口文档body的高度 
// console.log("浏览器当前窗口文档body的总宽度 包括border padding margin:"+$(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin 
// console.log("显示器分辨率，只能用JavaScript代码获取高度:"+screen.height);//显示器分辨率，只能用JavaScript代码获取 
// console.log("显示器分辨率，只能用JavaScript代码获取宽度:"+screen.width); 
// }) ; 



var dotCur = 'style/img/bg_dot_rightnav02_zxj_141216_cur.png';
var dotSrc = 'style/img/bg_dot_rightnav02_zxj_141216.png';

//字体左右滑入
function getAnimate(wrapper,navId,divObj,conId,wid,flag,length){
    var windowsW = parseInt($(window).width());//当前窗口大小
    var windowsH = parseInt($(window).height());

    divObj.css('height',windowsH);
    divObj.find(".bg_img img").attr('width',windowsW);
    divObj.find(".bg_img img").attr('height',windowsH);

    wrapper.parent(".page_body").css({'width':windowsW+'px','height':windowsH+'px','overflow':'hidden'});
    wrapper.css({'width':windowsW+'px','height':windowsH*4+'px'});
    


    // var len = length?length:divObj.length;//一共多少个
    // var totalH = parseInt(wrapper.parent(".page_body").height())+"px";//总高度
    // wrapper.css({"height":totalH,"width":windowsW+"px"});

    // divObj.css("width",windowsW+"px");

    // console.log('window.screen.height'+window.screen.height);
    // console.log('window.screen.width'+window.screen.width);
    // console.log('window.screen.availHeight'+window.screen.availHeight);
    // console.log('window.screen.availWidth'+window.screen.availWidth);
    // console.log('window.screenTop'+window.screenTop);
    // console.log('window.screenLeft'+window.screenLeft);

    //重置窗口大小
    $(window).resize(function() {
        // windowsW = $(window).width();//当前窗口大小
        // totalH = parseInt(wrapper.parent(".page_body").height())+"px";//总长度
        // divObj.css("width",windowsW+"px");
        // 
        windowsW = parseInt($(window).width());//当前窗口大小
        windowsH = parseInt($(window).height());


        divObj.css('height',windowsH);
        divObj.find(".bg_img img").attr('width',windowsW);
        divObj.find(".bg_img img").attr('height',windowsH);

        wrapper.parent(".page_body").css({'width':windowsW+'px','height':windowsH+'px','overflow':'hidden'});
        wrapper.css({'width':windowsW+'px','height':windowsH*4+'px'});
    });
    //点击切换页面
    navId.find("li").click(function(){
        var currentPage = $(this).index();
        //高亮
        navId.find(".intro").find("li").removeClass("cur");
        navId.find(".intro").find("li").eq(currentPage).addClass("cur");
        navId.find(".dot_id").find("li").find("img").attr("src",dotSrc);
        navId.find(".dot_id").find("li").eq(currentPage).find("img").attr("src",dotCur);



        //给高度赋值
        //var liH = parseInt(divObj.eq(currentPage).height());

        //wrapper.parent(".page_body").css({"height":liH+'px',"overflow":"hidden"});//page_body
        
        var iphoneH = divObj.eq(currentPage).find(".images img").attr('height');
                    
        divObj.eq(currentPage).find(".images").css({'top':(windowsH + 96 - iphoneH)/2 + 'px','display':'block'});

       // divObj.eq(currentPage).find(".images").css({'top':'0','display':'block'});
      //  divObj.eq(currentPage).find(".images").animate({top:"+="+(windowsH + 96 - iphoneH)/2 + 'px'});
       
       var titleH = divObj.eq(currentPage).find(conId).height();
        divObj.eq(currentPage).find(conId).css({'top':(windowsH + 96 - titleH)/2 + 'px','display':'block'});
        
        var liH = windowsH;

        if(liH > 960) {
            liH = 960;
        }
       // divObj.find(".core_window").css({"height":liH+'px'}); //core_window
        wrapper.animate({
            "margin-top":-(liH*currentPage)+"px"
        },function(){
            //var contW = divObj.eq(currentPage).find(conId).width();

            if(flag == 1){
                //大型场馆
                if(currentPage == 0){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+550,opacity:1},500);
                }else if(currentPage == 1){
                    divObj.eq(currentPage).find(conId).css({right:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+434,opacity:1},500)
                }else if(currentPage == 2){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+470,opacity:1},500)
                }else if(currentPage == 3){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+450,opacity:1},500)
                }
            }else if(flag == 2){
                //公共安全
                if(currentPage == 0){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+481,opacity:1},500);
                }else if(currentPage == 1){
                    divObj.eq(currentPage).find(conId).css({right:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+550,opacity:1},500);
                }else if(currentPage == 2){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+466,opacity:1},500);
                }else if(currentPage == 3){
                    divObj.eq(currentPage).find(conId).css({right:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+545,opacity:1},500);
                }
            }else if(flag == 3){
                //商超o2o
                if(currentPage == 0){
                    
                    

                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+96,opacity:1},500);
                }else if(currentPage == 1){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+136,opacity:1},500);
                }else if(currentPage == 2){
                    divObj.eq(currentPage).find(conId).css({right:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+157,opacity:1},500);
                }else if(currentPage == 3){
                    divObj.eq(currentPage).find(conId).css({right:-100+"px",opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+100,opacity:1},500);
                }else if(currentPage == 4){
                    divObj.eq(currentPage).find(conId).css({right:-100+"px",opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+100,opacity:1},500);
                }
            }else if(flag == 4){
                //易逛
               if(currentPage == 1){
                    $(".bg_yg_02 .content .tips_01").css({"top":"0px","left":"0px"});
                    $(".bg_yg_02 .content .tips_02").css({"top":"200px","left":"260px"});
                    $(".bg_yg_02 .content .tips_05").css({"top":"0px","left":"928px"});
                    $(".bg_yg_02 .content .tips_01").animate({top:"+="+300,left:"+="+600},100);
                    $(".bg_yg_02 .content .tips_02").animate({top:"+="+100,left:"+="+100},100)
                        .animate({top:"+="+200,left:"+="+100},100);
                    $(".bg_yg_02 .content .tips_05").animate({top:"+="+300,left:"+="+50},100)
                }else if(currentPage == 2){
                    $(".bg_yg_03 .content .tips_01").css({"top":"24px","left":"8px"});
                    $(".bg_yg_03 .content .tips_03").css({"top":"18px","left":"121px"});
                    $(".bg_yg_03 .content .tips_04").css({"top":"59px","left":"507px"});
                    $(".bg_yg_03 .content .tips_01").animate({top:"+="+300,left:"+="+40},100);
                    $(".bg_yg_03 .content .tips_03").animate({top:"+="+150,left:"+="+400},100);
                    $(".bg_yg_03 .content .tips_04").animate({top:"+="+300,right:"+="+100},100);
                }else if(currentPage == 3){
                    divObj.eq(currentPage).find(conId).css({left:-100+"px",opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+140,opacity:1},500);
                }else if(currentPage == 4){
                    divObj.eq(currentPage).find(conId).css({right:-100+"px",opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+100,opacity:1},500);
                }

            }else if(flag == 5){
                //停车
                if(currentPage == 0){
                    divObj.eq(currentPage).find(conId).css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).animate({left:"+="+44,opacity:1},500);
                }else if(currentPage == 1){
                    divObj.eq(currentPage).find(conId).css({right:-100+"px",opacity:1});
                    divObj.eq(currentPage).find(conId).animate({right:"+="+100,opacity:1},500);
                }else if(currentPage == 2){
                    divObj.eq(currentPage).find(conId).find(".title").css({left:0,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".title").animate({left:"+="+150,opacity:1},500);
                }
            }else if(flag == 6){
                //收获达人
                if(currentPage == 1){
                    divObj.eq(currentPage).find(conId).find(".image").css({left:90,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".image").animate({left:"+="+300,opacity:1},800)
                        .animate({left:"-="+100,opacity:1},800);
                }else if(currentPage == 2){
                    divObj.eq(currentPage).find(conId).find(".image").css({left:390,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".image").animate({left:"-="+160,opacity:1},800)
                        .animate({left:"+="+80,opacity:1},800);
                }else if(currentPage == 3){
                    divObj.eq(currentPage).find(conId).find(".tips_01").css({right:150,top:200,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_01").animate({right:"-="+100,top:"+="+100,opacity:1},500);
                    divObj.eq(currentPage).find(conId).find(".tips_02").css({top:200,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_02").animate({top:"+="+63,opacity:1},500);
                    divObj.eq(currentPage).find(conId).find(".tips_03").css({top:300,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_03").animate({top:"+="+160,opacity:1},500);
                }else if(currentPage == 4){
                    divObj.eq(currentPage).find(conId).find(".tips_01").css({left:0,top:0,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_01").animate({left:"+="+490,top:"+="+293,opacity:1},500);

                    divObj.eq(currentPage).find(conId).find(".tips_02").css({left:0,top:0,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_02").animate({left:"+="+464,top:"+="+402,opacity:1},500);

                    divObj.eq(currentPage).find(conId).find(".tips_03").css({left:0,top:0,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_03").animate({left:"+="+650,top:"+="+287,opacity:1},500);

                    divObj.eq(currentPage).find(conId).find(".tips_04").css({left:0,top:0,opacity:1});
                    divObj.eq(currentPage).find(conId).find(".tips_04").animate({left:"+="+96,top:"+="+307,opacity:1},500);
                }
            }
        });
    });
    //默认调用
    navId.find("li").eq(0).click();

    //下一页
    divObj.find(".next").click(function(){
        var thisIndex = 0;
        navId.find(".intro").find("li").each(function(index){
            if($(this).hasClass('cur')){
                thisIndex = index;
            }
        });
        navId.find("li").eq(thisIndex+1).click();
    });
}


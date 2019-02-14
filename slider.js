//入口函数
function init(){
    //事件
    bindEvent();
    //自动轮播
    sliderAuto();
}
init();
function bindEvent(){
    //点击事件
    $('#swiper .order li').add('.prev').add('.next').on('click',function(){
        if($(this).attr('class')=='prev'){
            move('prev');
        }else if($(this).attr('class')=='next'){
            move('next');
        }else{
            move($(this).index());
        }
        changeStyle();
        console.log(222)
    })
    //移入事件
    $('#swiper').on('mouseenter',function(){
        $('.btn a').css('display','inline-block');
        clearTimeout(timer);
    }).on('mouseleave',function(){
        $('.btn a').css('display','none');
        slider();
    })
}
//改变nowIdex值
var nowIdex = 0;
var  len = 4;
var itemWidth =1040;
var flag=true;
function move(dir){
    if(flag){
        flag =false;
        if(dir == 'prev'){
            if(nowIdex == 0){//若当前为图片1，切到5然后调用slider()
                $('.img-box').css('left',-(len*itemWidth) + 'px')
                nowIdex =len -1 ;
            }else{
                nowIdex --;
            }
        }else if(dir == 'next'){
            if(nowIdex == len-1){//若当前为图片4,滑动到5切为图片1
                $('.img-box').animate({'left':-(len*itemWidth) + 'px'},function(){
                    $(this).css('left','0');
                    // sliderAuto();
                    flag = true;
                });
                nowIdex = 0;
            }else{
                nowIdex ++;
            }
        }else{
            nowIdex = dir;
        }
        slider();
    }
    
}
//轮播
function slider(){
    $('.img-box').animate({'left':-(nowIdex*itemWidth) + 'px'},function(){
        sliderAuto();
        flag = true;
    });
  
}
//改变小圆点样式，切换类名
function changeStyle(){
    $('.active').removeClass('active');
    $('.order li').eq(nowIdex).addClass('active');
}
//自动轮播
var timer;
function sliderAuto(){
    clearTimeout(timer);
    timer = setTimeout(function(){
        move('next');
        changeStyle();
    },2000);
}
//立即执行函数插件实现
(function($){
        //实现轮播图功能
        function Swiper(options) {
            this.opts = options || {};
            this.wrap = options.father
            this.init();
            // options.father       
        }
        Swiper.prototype.init = function(){
            this.image = this.opts.image;
            this.len = this.image.length -1;//图片ul长度
            this.itemWidth = parseInt(this.wrap.css('witdh'));//每一张当前展示的宽度
            this.createDom();
        }
        //创建DOM结构，father，image
        Swiper.prototype.createDom = function(){
            var len = this.len;
            console.log(len)
            
            var str = '';
            var imgBox = $('<ul class="img-box"></ul>');
            var order = $('<div class="order"></div>');
            var prev = $('<a href="javaScript:void(0)" class = "prev"></a>');
            var next = $('<a href="javaScript:void(0)" class = "next"></a>');
            var btn = $('<div class="btn"><div/>')
            var list = $('<ul></ul>');
            var listStr='';
            for(var i = 0; i<len; i++){
                str += '<li><a href="javaScript:void(0)"><img src="'+ this.image[i] +'"></a></li>';
                listStr +='<li></li>';
            }
            //实现无缝切换的最后一个图片图片1
            str += '<li><a href="javaScript:void(0)"><img src="'+ this.image[0] +'"></a></li>';
            console.log(listStr)
            $(listStr).appendTo(list);
            this.wrap.append(imgBox.html($(str))).append(order.append(list));
            this.wrap.append(btn.html(prev.add(next)));
            // btn.append(prev).append(next);
        }
        //jq上扩展方法，传id
        $.fn.extend({
            slideImg: function(options){
                options.father = this || $('body');  
                new Swiper(options);
            }
        })
    }(jQuery));

    // $('#swiper').sliderImg({
    //     image: ['./img/1.jpg', './img/2.jpg','./img/3.jpg','./img/4.jpg','./img/1.jpg'],
    // })
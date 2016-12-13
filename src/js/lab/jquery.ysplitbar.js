(function($){
    $.fn.ySplitbar = function (options){
        var opts;
        var PLUGIN = $.fn.ySplitbar;
        //覆盖参数
        opts = $.extend(true,{},PLUGIN.defaults,options);
        //实例化类
        var ySplitbar = new yfjs.ySplitbar(opts);
        ySplitbar.$applyTo = $(this);
        ySplitbar.render();
    }
    //默认参数
    $.fn.ySplitbar.defaults = {
        minWidth : 150,
        //拖拽分栏个数
        number:2
    }
    //命名空间
    var yfjs = yfjs || {};
    yfjs.ySplitbar = function(options){
        //参数
        this.options = options;
        //起作用的对象
        this.$applyTo = this.options.applyTo && $(this.options.applyTo) || null;
        //最小宽度
        this.minWidth = this.options.minWidth;
        //最大宽度
        this.maxWidth = this.options.maxWidth;
        //最新left值
        this.newLeft=null;
        //拖拽标识数量
        this.number = this.options.number;
        //自定拖拽标识Top值
        this.barTop =this.options.barTop;
        //拖拽回调函数
        this.callback = this.options.callback;
        //需要被拖拽节点容器
        //拖拽标识left值
        this.dragMarkArr=[];
        this.splitArr=[];
        //当前拖拽标识对象
        this.curSplitbar = null;
        //拖拽标识
        this.mark = false;
        //拖拽标识索引
        this.dragIndex = null;

    }
    yfjs.ySplitbar.prototype = {
        //运行
        render : function(){
            this.init();
        },
        //初始化
        init : function(){
            var self = this;
            //设置父容器css属性
            this.$applyTo.css("position","relative");
            //保存分栏容器节点
            this.$applyTo.children("div").each(function(index){
                $(this).addClass("split-containe");
                self.splitArr[index] = $(this);
            });
            this.parentLeft = this.$applyTo.offset().left;
            this.parentRight = this.$applyTo.outerWidth();
            this.createHtml();
            this.addEvent();
        },
        createHtml : function(){
            //创建移动标识
            var splitHtml="";
            for(var i=0;i<this.number;i++){
                splitHtml+='<div class="splitbar" style="top:0px"></div>';
            }
            //插入拖拽标识
            this.$applyTo.append(splitHtml);
            //获取插入拖拽标识节点
            this.splitbar = this.$applyTo.find(".splitbar");
            this.sw = this.splitbar.outerWidth()+2;
            //获取拖拽标识的居中高度

            var top =(this.$applyTo.height() -this.splitbar.eq(0).height())/2;
            if(this.barTop!=null){
                top = this.barTop;
            }
            //设置
            this.splitbar.css("top",top+'px');
            for(var i=0;i<this.number;i++){
                this.dragMarkArr.push(Math.abs(this.parentLeft-this.splitArr[i].offset().left)+this.splitArr[i].outerWidth());
                //保存拖拽标识left
                this.splitbar.eq(i).css("left",this.dragMarkArr[i]+'px');
            }
        },
        addEvent : function(){
            var self = this;
            //按下
            this.$applyTo.children(".splitbar").each(function(index){
                  $(this).on("mousedown",{"index":index,"self":self},self.dragPlitbar);
            });
        },
        //拖拽前
        dragPlitbar : function(e){
            e.preventDefault();
            var self = e.data.self;
            self.mark = true;
            //$("body").css({"cursor":"e-resize"});
            self.dragIndex = e.data.index;
            self.curSplitbar =$(this);
            self.curX =e.pageX-self.curSplitbar.offset().left + 1;
            //移动
            $(document).bind("mousemove",{"self":self},self.ondragPlitbar);
            //松开
            $(document).bind("mouseup",{"self":self},self.beforePlitbar);
        },
        //拖拽中
        ondragPlitbar : function(e){
            e.preventDefault();
            var self = e.data.self;
            if(!self.mark) return false;
            if(self.splitbar.size()<=1){
                self.dragType2(self,e);
            } else {
                self.dragType1(self,e);
            }
            /************new锁定************/
            if(lockLeft){
                lockLeft = $(".main-right").offset().left;
                if($(".table_container_fix").css("position") == "fixed"){
                    $(".table_container_fix,.table_container_head").css({"left":lockLeft});
                }               
            }

            /************end**************/
        },
        //拖拽后
        beforePlitbar : function(e){
            //e.preventDefault();
            var self = e.data.self;
            self.mark = false;
            //$("body").css({"cursor":"default"});
            self.dragIndex = null;
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");
        },

        /*三栏拖拽*/
        dragType1 : function(self,e){
            var leftX,rightX;
            var newX = (e.pageX-self.parentLeft)-self.curX;
            //第一个标识
            if(self.dragIndex==0){
                //判断拖拽标识左边容器最小宽度
                if(newX<self.minWidth){newX=self.minWidth;}
                //获取拖拽标识右边容器宽度
                rightX = self.splitbar.eq(self.dragIndex+1).position().left-newX-self.sw;
                //判断拖拽标识右边容器最小宽度
                if(rightX<self.minWidth){
                    rightX = self.minWidth;
                    newX=self.splitbar.eq(self.dragIndex+1).position().left-self.minWidth-self.sw;
                }
                leftX = newX-2;
            } else {

                //第二个标识
                leftX = newX-self.splitbar.eq(self.dragIndex-1).position().left-self.sw;
                if(leftX<self.minWidth){
                    newX = self.splitbar.eq(self.dragIndex-1).position().left+self.minWidth+self.sw;
                    leftX = self.minWidth;
                }
                rightX = self.parentRight-newX-self.sw;
                if(rightX<self.minWidth){
                    rightX = self.minWidth;
                    newX=self.parentRight-self.minWidth-self.sw;
                    leftX =newX-self.splitbar.eq(self.dragIndex-1).position().left-self.sw;
                }
            }
            //移动拖拽标识
            self.curSplitbar.css("left",newX);
            self.splitArr[self.dragIndex].css("width",leftX);
            self.splitArr[self.dragIndex+1].css("width",rightX);
            this.callbackFn(rightX);
        },
        //两栏拖拽
        dragType2 : function(self,e){
            var leftX,rightX;
            var newX = (e.pageX-self.parentLeft)-self.curX;
            //判断拖拽标识左边容器最小宽度
            if(newX<self.minWidth){newX=self.minWidth;}
            if(newX>self.maxWidth){newX=self.maxWidth;}
            //获取拖拽标识右边容器宽度
            rightX = self.parentRight-newX-self.sw;
            leftX = newX-2;
            //移动拖拽标识
            self.curSplitbar.css("left",newX);
            self.splitArr[self.dragIndex].css("width",leftX);
            self.splitArr[self.dragIndex+1].css("width",rightX);
            this.callbackFn(rightX);
        },
        callbackFn : function(rightX){
            if(typeof this.callback =="function"){
                this.callback(rightX);
            }
        }
    };
})(jQuery);

//new锁定表头表尾
var lockLeft;
function autoLock(l){
    if($(".editarea").is(":visible")){
        if($(window).scrollTop() > 717){
            $(".table_container_fix,.table_container_head").css({"left":l,"position":"fixed"});
        }else{
            $(".table_container_fix,.table_container_head").css({"left":0,"position":"absolute"});
        }
    }else{
        if($(window).scrollTop() > 282){
            $(".table_container_fix,.table_container_head").css({"left":l,"position":"fixed"});
        }else{
            $(".table_container_fix,.table_container_head").css({"left":0,"position":"absolute"});
        }
    }
}
function autoLock2(l){
    if($("#viewchart").is(":visible")){
        if($(window).scrollTop() > 753){
            $(".table_container_fix,.table_container_head").css({"left":l,"position":"fixed"});
        }else{
            $(".table_container_fix,.table_container_head").css({"left":0,"position":"absolute"});
        }
    }else{
        if($(window).scrollTop() > 353){
            $(".table_container_fix,.table_container_head").css({"left":l,"position":"fixed"});
        }else{
            $(".table_container_fix,.table_container_head").css({"left":0,"position":"absolute"});
        }
    }
}

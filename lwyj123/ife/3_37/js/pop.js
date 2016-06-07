
//参考自https://github.com/pcdqc/IFE.FrontEnd/blob/master/TeamIntro/public/task/task-37/js/pop-up-layer.js
(function(w, d, undefined) {
	var unique;
	var fadeFn;
	var wFn;
	var mFn;
	var dragFn; //拖曳方法
	var dropFn;
	var btn1Fn;
	var btn2Fn;
	
	var Layer = function(txt, config) {
		this.txt = txt;
		this.config = config;   //config有type和title两个属性
		this.dragFlag = false;
		this.startX = 0;
		this.startY = 0;
	};
	
	Layer.prototype = {
		init: function() {
			var that = this;
			this.wrap = d.createElement('div');
			this.fade = d.createElement('div');
			this.model = d.createElement('div');
			this.title = d.createElement('div');
			this.content = d.createElement('div');
			this.footer = d.createElement('div');
			this.confirmBtn = d.createElement('div');
			this.closeBtn = d.createElement('div');

			this.wrap.className = 'POP-wrap POP-on';
			this.fade.className = 'POP-fade';
			this.model.className = 'POP-model';
			this.title.className = 'POP-title';
			this.footer.className = 'POP-footer';
			this.content.className = 'POP-content';
			this.confirmBtn.className = 'POP-confirm';
			this.confirmBtn.innerHTML = '确认';
			this.closeBtn.className = 'POP-close';
			this.closeBtn.innerHTML = '取消';
			this.model.appendChild(this.title);
			this.model.appendChild(this.content);
			this.model.appendChild(this.footer);
			this.footer.appendChild(this.closeBtn);
			this.footer.appendChild(this.confirmBtn);
			this.wrap.appendChild(this.fade);
			this.wrap.appendChild(this.model);

			this.title.addEventListener('mousedown', dragFn = function(event) {
				that.dragFlag = true;
				that.startX = event.pageX;
				that.startY = event.pageY;
                that.left = parseInt(w.getComputedStyle(that.model, null)['left']);
                that.top = parseInt(w.getComputedStyle(that.model, null)['top']);
			});
            this.title.addEventListener('mouseup', dropFn = function() {
                that.dragFlag = false;
            });
            this.wrap.addEventListener('mousemove', mFn = function(event) {
                that.onDrag(event, that);
            });

            //遮罩绑定事件
            this.fade.addEventListener('click', fadeFn = function() {
                that.close(that, undefined, true);
            });

            //可以加入键盘事件绑定
            w.addEventListener('keydown', wFn = function(event){
                var code = event.keyCode;
                if(code === 27){
                    event.preventDefault();
                    that.close(that,undefined,true);
                }
                else if(code === 13){
                    event.preventDefault();
                    var zzz = that.input ? that.input.value : true;
                    that.close(that, zzz);
                }
            });

            d.getElementsByTagName('body')[0].appendChild(this.wrap);

            //出现效果，通过移除pop-on来实现
            setTimeout(function() {
                that.wrap.className = 'POP-wrap';
            }, 100);
		},
        //对调用参数进行处理，有点多态的赶脚
        option: function() {
            //config是string，即选用特定类型的浮出框.
            if(typeof this.config === 'string') {
                this.setTheme(this.config);
            }
            else if(typeof  this.config === 'function') {
                this.setTheme();
                this.callback = this.config;
            }
            else if(typeof this.config === 'object') {
                var type = this.config.type ? this.config.type : 'default';
                this.setTheme(type);
                if(this.config.title) {
                    this.title.innerHTML = this.config.title;
                }
                this.callback = this.config.callback;
            }
            else {
                this.setTheme();
            }
        },
        //除了alert和confirm和prompt还可以自定义很多类型的浮出窗
        alert: function() {
            var that = this;
            this.init();
            this.option(this.config);
            this.content.innerHTML = this.txt;
            this.footer.removeChild(this.closeBtn);
            this.confirmBtn.addEventListener('click', btn2Fn = function() {
                that.close(that);
            })
        },
        confirm: function() {

        },

        close: function(that, msg, flag) {
            d.getElementsByTagName('body')[0].removeChild(that.wrap);
            //单例标识
            unique = undefined;

            //这里又遇到一个疑问，为什么需要移除这些监听？
            this.fade.removeEventListener('click', fadeFn, false);
            this.title.removeEventListener('mousedown', dragFn, false);
            this.title.removeEventListener('mouseup', dropFn, false);
            this.wrap.removeEventListener('mousemove', mFn, false);
            w.removeEventListener('keydown', wFn, false);
            this.closeBtn.removeEventListener('click', btn1Fn, false);
            this.confirmBtn.removeEventListener('click', btn2Fn, false);
            if(that.callback && !flag) {
                if(msg !== undefined) {
                    that.callback(msg);
                }
                else {
                    that.callback();
                }
            }
        },
        //选择不同的模板
        setTheme: function(type) {
            switch(type) {
                case "success":
                    this.model.style.backgroundColor = "#5CB85C";
                    this.title.innerHTML = "Success!";
                    break;
                case "error":
                    this.model.style.backgroundColor = "#E74C3C";
                    this.title.innerHTML = "Error!"
                    break;
                default:
                    this.model.style.backgroundColor = "#999";
                    this.title.innerHTML = '缺省样式';
                    break;
            }
        },

        onDrag: function(event, that) {
            if(that.dragFlag) {
                this.model.style.left = (event.pageX - that.startX + that.left) + 'px';
                this.model.style.top = (event.pageY - that.startY + that.top) + 'px';
            }
        }
    };

    window['POP'] = {
        alert: function(txt, config) {
            var layer = this.single(txt, config);
            if(layer) {
                layer.alert();
            }
        },
        /*
        confirm: function(txt, config) {
            var layer = this.single(txt, config);
            if(layer) {
                layer.alert();
            }
        },

        prompt: function(txt, config) {
            var layer = this.single(txt, config);
            if(layer) {
                layer.alert();
            }
        }
        */
        single: function(txt, config) {
            if(unique == undefined) {
                unique = new Layer(txt, config);
                return unique;
            }
            else {
                return false;
            }
        }
    };

})(window, document);
;(function($){

	var Tab = function(tab){

		var _this_ = this;

		this.tab  = tab;

		// // 默认配置参数
		this.config={

			// 触发事件类型
			"triggerType":"mouseover",
			// 默认显示动画类型
			"effect":"default",
			// 默认第几个显示
			"invoke":1,
			// 用来定义tab是否自动切换，当指定了时间间隔，
			// 就表示自动切换，且切换时间为指定时间
			"auto":false
		};

		// 如果配置参数存在，就扩展掉默认的配置参数
		if(this.getConfig()) {
			$.extend(this.config, this.getConfig());
		};

		// 保存tab标签列表、对应的内容列表
		this.tabItems = this.tab.find('ul.tab-nav li');
		this.contentItems = this.tab.find('div.ad_wrap div.ad_wrap_item');


		//保存配置参数
		var config = this.config;

		if(config.triggerType === 'click') {
			this.tabItems.bind(config.triggerType,function(){
				_this_.invoke($(this));
			});
		}
		else if(config.triggerType === 'mouseover' || config.triggerType !== "click") {
			this.tabItems.mouseover(function(){
				_this_.invoke($(this));
			// 	var self = $(this);
			// 	this.timer = window.setTimeout(function() {
			// 		_this_.invoke($(this));
			// 	},300);
			// }).mouseout(function() {
			// 	window.clearTimeout(this.timer);
			});
		}

		if(config.auto) {
			this.timer = null;

			this.loop = 0;

			this.autoPlay();

			this.tab.hover(function(){
				window.clearInterval(_this_.timer);
			},function(){
				_this_.autoPlay();
			});

		}

		//默认显示第几个
		if (config.invoke > 1) {
			this.invoke(this.tabItems.eq(config.invoke - 1));
		}
	};

	Tab.prototype = {

		autoPlay:function() {
			var _this_ = this,
				tabItems = this.tabItems,
				tabLength = tabItems.length,
				config = this.config;

				this.timer = window.setInterval(function(){
					_this_.loop++;
					if(_this_.loop >= tabLength) {
						_this_.loop = 0;
					}

					tabItems.eq(_this_.loop).trigger(config.triggerType);
				},config.auto);
		},

		// 事件驱动函数
		invoke:function(currentTab){
			var _this_ = this;

			var index = currentTab.index();

			// 1.执行tab选中状态，给当前选中元素加上active类，背景文字变色
			// 2.切换对应的tab内容，
			currentTab.addClass("active").siblings().removeClass("active");

			var effect = this.config.effect;
			var conItems = this.contentItems;

			if(effect === "default" || effect !== "fade") {
				conItems.eq(index).addClass("current").siblings().removeClass("current");
			}
			else if(effect === "fade") {
				conItems.eq(index).fadeIn().siblings().fadeOut();
			}

			if(this.config.auto) {
				this.loop = index;
			}
		},

		// 获取配置参数
		getConfig:function(){
			var config = this.tab.attr("data-config");

			if(config && config !== "") {
				return $.parseJSON(config);
			}
			else {
				return null;
			}
		}
	};

	Tab.init = function(tabs) {
		var _this_ = this;
		tabs.each(function(){
			new _this_($(this));
		});
	}

	// 注册成为Jquery方法

	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this));
			});
		}
	});
	window.Tab = Tab;
})(jQuery);
Ext.define('MyApp.Application', {
	name : 'MyApp',
	extend : 'Ext.app.Application',
//	requires : [ 'MyApp.Const', 'MyApp.Config', 'MyApp.ExtFix', 'MyApp.ExtOverride', 'MyApp.ExtSetting', 'MyApp.util.Restful', 'MyApp.locale.Converter',
//			'MyApp.ux.proxy.NestedRest', 'MyApp.reader.RestTaskGrid', 'Ext.util.Cookies' ],

	views : [ 'Viewport' ],
//	controllers : [ 'Enhance', 'Project' ],
	autoCreateViewport : false,
	onReady : function() {
		

		var me = this;

//		console.info('i18n for ExtJS');
//		loadJS("ext/locale/ext-lang-" + Locale.getLanguage() + ".js");
//
//		console.info('init: ExtFix ExtOverride and ExtSetting');
//		MyApp.ExtFix.init(MyApp.Config);
//
//		MyApp.ExtOverride.init(MyApp.Config);
//
//		MyApp.ExtSetting.init(MyApp.Config);

//		this.readyFn = fn;
//		this.on('loaded', this.readyFn, this);
	},
	launch : function() {

	}

});

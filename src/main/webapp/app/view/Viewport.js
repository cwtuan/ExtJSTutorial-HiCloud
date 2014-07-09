// Viewport (hicloud)
Ext.define('MyApp.view.Viewport', {
	extend : 'Ext.container.Viewport',
	renderTo : Ext.getBody(),

	requires : [
	// layout
	'Ext.layout.container.Card', 'Ext.layout.container.Border',

	// util
	'MyApp.HiCloudSetting',

	// view
	// for sencha cmd
	'MyApp.view.Entry'

	],
	id : 'viewport',
	layout : 'border',
	defaults : {
		border : false,
		xtype : 'container'
	},
	initComponent : function() {
		var me = this;

		// default setting from hicloud
		MyApp.HiCloudSetting.init();

		var menuItems = [];

		menuItems.push({
			xtype : 'box',
			html : 'HiCloud header'
		});

		var enrty = {
			// TODO dev and /
			// entrypoint : 'http://localhost:8080/ExtJSTutorial-HiCloud/app/view/Entry.js', // for dev
			// entrypoint : 'http://localhost:8080/ExtJSTutorial-HiCloud/all-classes.js', // for production
			src : 'http://localhost:8080/ExtJSTutorial-HiCloud/entrypoint?debug=' + (window.location.pathname.indexOf('dev') != -1),
			entry : 'MyApp.view.Entry'
		};

		loadJS(enrty.src);

		me.items = [ {
			xtype : 'panel',
			region : 'center',
			layout : 'card',
			tbar : Ext.widget('toolbar', {
				items : menuItems,
				height : 78,
				style : {
					backgroundColor : '#919191'
				}
			}),
			items : [ Ext.create(enrty.entry) ]
		} ];

		me.callParent(arguments);

	}
});

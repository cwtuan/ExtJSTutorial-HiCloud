Ext.define('MyApp.view.Viewport', {
	extend : 'Ext.container.Viewport',
	renderTo : Ext.getBody(),

	requires : [
	// layout
	'Ext.layout.container.Card', 'Ext.layout.container.Border'

	],
	id : 'viewport',
	layout : 'border',
	defaults : {
		border : false,
		xtype : 'container'
	},
	initComponent : function() {
		var me = this;

		var menuItems = [];

		menuItems.push({
			xtype : 'box',
			html : 'HiCloud header'
		});

		var enrty = {
			// TODO servlet http://172.21.255.213/hidesk/entrypoint
			// TODO dev and /
			entrypoint : 'http://localhost:8080/ExtJSTutorial-HiCloud/app/view/Entry.js',
			containerClass : 'MyApp.view.Entry'
		};

		loadJS(enrty.entrypoint);

		me.items = [ {
			xtype : 'panel',
			region : 'center',
			layout : 'card',
			tbar : Ext.widget('toolbar', {
				items : menuItems,
				height : 78,
				style : {
					backgroundColor : '#919191',
				}
			}),
			items : [ Ext.create(enrty.containerClass) ]
		} ];

		me.callParent(arguments);

	}
});

/**
 * application entry point for valid user
 */

Ext.define('MyApp.view.Entry', {
	extend : 'Ext.container.Container',

	requires : [

	// Utils
	'MyApp.Config', 'MyApp.Session', 'MyApp.util.Format', 'MyApp.util.Validator', 'MyApp.util.Restful', 'MyApp.locale.Converter', 'Ext.util.Cookies',
			'MyApp.Const', 'MyApp.util.Restful', 'MyApp.ux.proxy.NestedRest', 'MyApp.reader.RestTaskGrid', 'MyApp.action.Action',

			// events
			'MyApp.event.Session', 'MyApp.event.Project', 'MyApp.event.User',

			// views ux
			'MyApp.ux.image.ImageViewer', 'MyApp.ux.image.MultiImageViewer', 'MyApp.ux.button.LinkButton', 'MyApp.ux.toolbar.NotifyBar', 'MyApp.ux.IFrame',


			// views
			'MyApp.view.project.ProjectView', 'MyApp.view.about.OpenSourceLicenseWin',

			// layout
			'Ext.layout.container.Card', 'Ext.layout.container.Border'

	],

	layout : 'border',
	defaults : {
		border : false,
		xtype : 'container'
	},

	initComponent : function() {
		var me = this;

		var menuItems = [];

		menuItems.push({
			itemId : 'project',
			pressed : true,
			icon : 'css/images/clapperboard_16x16.png',
			scale : 'medium',
			height : 30,
			toggleGroup : 'mainbar',
			allowDepress : false,
			text : Locale.getMsg('view.project.projects'),
			handler : function() {
				me.switchActivePage('projectView', false, this);
			}
		});

		menuItems.push(' ', {
			xtype : 'notifybar',
			id : 'notifybar',
			maxWidth : 600
		}, '->', {
			height : 30,
			text : Locale.getMsg('view.about'),
			menu : {
				showSeparator : false,
				items : [ {
					plain : true,
					text : Locale.getMsg('view.about.openSourceLicense'),
					handler : function() {
						Ext.widget('openSourceLicenseWin').show();
					}
				} ]
			}
		});

		var viewItems = [];

		viewItems.push({
			itemId : 'projectView',
			xtype : 'projectView'
		});

		// put menus and views to viewport

		me.items = [ {
			itemId : 'mainCards',
			xtype : 'panel',
			region : 'center',
			layout : 'card',
			tbar : Ext.widget('toolbar', {
				itemId : 'mainToolbar',
				items : menuItems
			}),
			items : viewItems
		} ];

		me.callParent(arguments);

		console.info('viewport is created');

	},

	switchActivePage : function(pageName, isRedirect) {
		var me = this;
		if (isRedirect) {
			location.href = pageName;
		} else {
			me.down('#mainCards').getLayout().setActiveItem(pageName);
		}
	}
});

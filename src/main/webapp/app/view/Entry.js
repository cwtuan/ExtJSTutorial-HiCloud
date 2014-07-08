/**
 * application entry point for valid user
 */

Ext.define('MyApp.view.Entry', {
	extend : 'Ext.container.Container',

	requires : [

	// Utils
	'MyApp.Session', 'MyApp.util.Format', 'MyApp.util.Validator', 'MyApp.util.Restful', 'MyApp.locale.Converter', 'Ext.util.Cookies', 'MyApp.Const',
			'MyApp.Config', 'MyApp.ExtOverride', 'MyApp.util.Restful', 'MyApp.ux.proxy.NestedRest', 'MyApp.reader.RestTaskGrid', 'MyApp.action.Action',

			// events
			'MyApp.event.Session', 'MyApp.event.Project', 'MyApp.event.User',

			// views ux
			'MyApp.ux.image.ImageViewer', 'MyApp.ux.image.MultiImageViewer', 'MyApp.ux.button.LinkButton', 'MyApp.ux.toolbar.NotifyBar', 'MyApp.ux.IFrame',
			'MyApp.ux.grid.column.ComponentColumn',

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

		MyApp.ExtOverride.init(MyApp.Config);

		MyApp.Session.getSession();

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
			itemId : 'accountmenu',
			menu : {
				showSeparator : false,
				defaults : {
					plain : true
				},
				items : [ {
					text : Locale.getMsg('view.session.signout'),
					handler : function() {
						me.switchActivePage('./signout', true, this);
					}
				} ]
			}
		}, {
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

		me.on({
			afterrender : function() {
				// warning message for old IE
				if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || Ext.isIE9) {
					Ext.getCmp('notifybar').showError(Locale.getMsg('view.oldBrowserWarning'));
				}
			}
		});

		MyApp.event.Session.on('read', function(user) {
			me.down('#accountmenu').setText(user.id);
		});

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

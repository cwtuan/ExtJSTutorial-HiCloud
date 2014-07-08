Ext.define('MyApp.view.about.OpenSourceLicenseWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.openSourceLicenseWin',
	modal : true,
	title : Locale.getMsg('view.about.openSourceLicense'),
	initComponent : function() {
		var me = this;
		me.items = [ {
			xtype : 'form',
			items : [ {
				xtype : 'textareafield',
				width : 650,
				height : 401
			} ]
		} ];

		me.buttons = [ {
			text : Locale.getMsg('view.common.close'),
			handler : function() {
				me.close();
			}
		} ];

		me.callParent();

		me.on({
			show : function(dialog, eOpts) {

				Ext.Ajax.request({
					url : 'resources/license.txt',
					method : 'GET',
					success : function(data) {
						me.down('textareafield').setRawValue(data.responseText);
					}
				});
			}
		});
	}
});

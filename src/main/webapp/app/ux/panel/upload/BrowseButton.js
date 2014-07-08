/**
 * A "browse" button for selecting multiple files for upload. It's a wrapper. File field is defined in AssetPanel
 */
Ext.define('MyApp.ux.panel.upload.BrowseButton', {
	extend : 'MyApp.action.Action',
	icon : 'css/images/arrow_up_16x16.png',
	text : Locale.getMsg('view.transfer.browse'),
	uploadFieldId : null,
	constructor : function(config) {
		var me = this;
		me.uploadFieldId = config.uploadFieldId;
		me.callParent([ config ]);
	},
	handler : function() {
		// check if xrh2 file upload is supported
		if (!!window.ProgressEvent && !!window.FormData) {
			document.getElementById(this.uploadFieldId).click();
		} else {
			Ext.MessageBox.show({
				title : Locale.getMsg('view.transfer.upload.oldBrowser'),
				msg : Locale.getMsg('view.oldBrowserWarning'),
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}

	},
	switchStatus : function(folder) {
		var me = this;

		// FIXME why somethies foder is null
		if (folder) {
			var isValidFolder = MyApp.Validator.resourceFolder(folder);
			if (isValidFolder === true) {
				me.enable();
				me.setTooltip(Locale.getMsg('view.transfer.browse.tooltip'));
			} else {
				me.disable();
				me.setTooltip(Locale.getMsg('view.transfer.browse.tooltip.disabled'));
			}
		}

	}
});

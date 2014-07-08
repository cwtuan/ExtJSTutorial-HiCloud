/**
 * Upload status bar.
 * 
 * @class MyApp.ux.panel.upload.StatusBar
 * @extends Ext.toolbar.Toolbar
 */
Ext.define('MyApp.ux.panel.upload.StatusBar', {
	extend : 'Ext.toolbar.Toolbar',

	config : {
		selectionMessageText : 'Selected {0} file(s), {1}',
		uploadMessageText : 'Upload progress {0}% ({1} of {2} file(s))',
		textComponentId : 'mu-status-text'
	},

	constructor : function(config) {
		this.initConfig(config);

		return this.callParent(arguments);
	},

	initComponent : function() {

		Ext.apply(this, {
			items : [ {
				xtype : 'tbtext',
				itemId : this.textComponentId, // tony
				text : '&nbsp;'
			} ]
		});

		this.callParent(arguments);
	},

	setText : function(text) {
		// tony
		// this.getComponent(this.textComponentId).setText(text);
//		console.log('setText', this, text);
		// this.down('#' + this.textComponentId).setText(text);
	},

	setSelectionMessage : function(fileCount, byteCount) {
		this.setText(Ext.String.format(this.selectionMessageText, fileCount, Ext.util.Format.fileSize(byteCount)));
	},

	setUploadMessage : function(progressPercent, uploadedFiles, totalFiles) {
		this.setText(Ext.String.format(this.uploadMessageText, progressPercent, uploadedFiles, totalFiles));
	}

});

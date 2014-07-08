// FIXME tony: progress到100時，會卡卡的

/**
 * The main upload panel, which ties all the functionality together.
 * 
 * In the most basic case you need just to set the upload URL:
 * 
 * @example var uploadPanel = Ext.create('MyApp.ux.panel.upload.FileUploadPanel', { uploaderOptions: { url: '/api/upload' } });
 * 
 * It uses the default ExtJsUploader to perform the actual upload. If you want to use another uploade, for example the FormDataUploader, you can pass the name
 * of the class:
 * 
 * @example var uploadPanel = Ext.create('MyApp.ux.panel.upload.FileUploadPanel', { uploader: 'MyApp.ux.panel.upload.uploader.FormDataUploader', uploaderOptions: {
 *          url: '/api/upload', timeout: 120*1000 } });
 * 
 * Or event an instance of the uploader:
 * 
 * @example var formDataUploader = Ext.create('MyApp.ux.panel.upload.uploader.FormDataUploader', { url: '/api/upload' });
 * 
 * var uploadPanel = Ext.create('MyApp.ux.panel.upload.FileUploadPanel', { uploader: formDataUploader });
 * 
 */
Ext.define('MyApp.ux.panel.upload.FileUploadPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.fileUploadPanel', // tony
	requires : [ 'MyApp.ux.panel.upload.ItemGridPanel', 'MyApp.ux.panel.upload.Manager', 'MyApp.ux.panel.upload.StatusBar', 'MyApp.ux.panel.upload.BrowseButton',
			'MyApp.ux.panel.upload.Queue', 'MyApp.ux.panel.upload.uploader.ExtJsUploader', 'MyApp.ux.panel.upload.uploader.FormDataUploader' ],
	title : Locale.getMsg('view.transfer.upload.queued'),
	enableBrowse : false,
	projectOid : null, // @deprecated
	subFolder : null, // @deprecated
	// TODO remoteFolder -> folderPath
	remoteFolder : null, // folder path. set by folder selected event (FileUploadPanel) or SimpleUploaderWin
	config : {

		/**
		 * @cfg {Object/String}
		 * 
		 * The name of the uploader class or the uploader object itself. If not set, the default uploader will be used.
		 */
		// uploader : 'MyApp.ux.panel.upload.uploader.ExtJsUploader',
		uploader : 'MyApp.ux.panel.upload.uploader.FormDataUploader',

		/**
		 * @cfg {Object}
		 * 
		 * Configuration object for the uploader. Configuration options included in this object override the options 'uploadUrl', 'uploadParams',
		 * 'uploadExtraHeaders', 'uploadTimeout'.
		 */
		uploaderOptions : null,

		/**
		 * @cfg {boolean} [synchronous=false]
		 * 
		 * If true, all files are uploaded in a sequence, otherwise files are uploaded simultaneously (asynchronously).
		 */
		synchronous : true,

		/**
		 * @cfg {String} uploadUrl
		 * 
		 * The URL to upload files to. Not required if configured uploader instance is passed to this panel.
		 */
		uploadUrl : 'rest/transfer/uploadAjax',

		/**
		 * @cfg {Object}
		 * 
		 * Params passed to the uploader object and sent along with the request. It depends on the implementation of the uploader object, for example if the
		 * {@link MyApp.ux.panel.upload.uploader.ExtJsUploader} is used, the params are sent as GET params.
		 */
		uploadParams : {},

		/**
		 * @cfg {Object}
		 * 
		 * Extra HTTP headers to be added to the HTTP request uploading the file.
		 */
		uploadExtraHeaders : {},

		/**
		 * @cfg {Number} [uploadTimeout=6000]
		 * 
		 * The time after the upload request times out - in miliseconds.
		 */
		uploadTimeout : 60000,

		// strings
		textOk : 'OK',
		textUpload : 'Upload',
		textBrowse : 'Browse',
		textAbort : Locale.getMsg('view.transfer.abort'),
		textRemoveSelected : Locale.getMsg('view.transfer.remove.selected'),
		textRemoveAll : Locale.getMsg('view.transfer.remove.all'),

		// grid strings
		textFilename : Locale.getMsg('view.transfer.file.name'),
		textSize : Locale.getMsg('view.common.size'),
		textType : 'Type',
		textStatus : Locale.getMsg('view.common.status'),
		textProgress : '%',

		// status toolbar strings
		selectionMessageText : Locale.getMsg('view.transfer.status.selection'),
		uploadMessageText : Locale.getMsg('view.transfer.status.upload')
	// 
	// // browse button
	// ,buttonText : 'Browse...' // tony
	},

	/**
	 * @property {MyApp.ux.panel.upload.Queue}
	 * @private
	 */
	queue : null,

	/**
	 * @property {MyApp.ux.panel.upload.ItemGridPanel}
	 * @private
	 */
	grid : null,

	/**
	 * @property {MyApp.ux.panel.upload.Manager}
	 * @private
	 */
	uploadManager : null,

	/**
	 * @property {MyApp.ux.panel.upload.StatusBar}
	 * @private
	 */
	statusBar : null,

	/**
	 * @property {MyApp.ux.panel.upload.BrowseButton}
	 * @private
	 */
	browseButton : null,

	/**
	 * Constructor.
	 */
	constructor : function(config) {
		this.initConfig(config);
		return this.callParent(arguments);
	},

	/**
	 * @private
	 */
	initComponent : function() {

		var me = this;

		this.addEvents({
			/**
			 * @event
			 * 
			 * Fired when all files has been processed.
			 * 
			 * @param {MyApp.ux.panel.upload.FileUploadPanel}
			 *            panel
			 * @param {MyApp.ux.panel.upload.Manager}
			 *            manager
			 * @param {MyApp.ux.panel.upload.Item[]}
			 *            items
			 * @param {number}
			 *            errorCount
			 */
			'uploadcomplete' : true
		});

		this.queue = this.initQueue();

		this.grid = Ext.create('MyApp.ux.panel.upload.ItemGridPanel', {
			queue : this.queue,
			textFilename : this.textFilename,
			textSize : this.textSize,
			textType : this.textType,
			textStatus : this.textStatus,
			textProgress : this.textProgress
		});

		this.uploadManager = this.createUploadManager();

		this.uploadManager.on('uploadcomplete', this.onUploadComplete, this);
		this.uploadManager.on('itemuploadsuccess', this.onItemUploadSuccess, this);
		this.uploadManager.on('itemuploadfailure', this.onItemUploadFailure, this);

		this.statusBar = Ext.create('MyApp.ux.panel.upload.StatusBar', {
			dock : 'bottom',
			selectionMessageText : this.selectionMessageText,
			uploadMessageText : this.uploadMessageText,
			// tony
			hidden : true
		});

		Ext.apply(this, {
			// title : this.dialogTitle, // tony
			// autoScroll : true, // tony
			layout : 'fit',
			uploading : false,
			items : [ this.grid ],
			dockedItems : [ this.getTopToolbarConfig(), this.statusBar ]
		});

		this.on('afterrender', function() {
			this.stateInit();
		}, this);

		// tony
		me.on({
			afterrender : function() {
				var fileFieldEl;
				// simple uploader
				if (me.up('window')) {
					fileFieldEl = Ext.get('upload-field-at-win');
				} else {
					fileFieldEl = Ext.get('upload-field-at-panel');
				}

				fileFieldEl.on('click', function() {
					// clear the old selection to prevent from onchange event doesn't fire if the user select the same file again.
					this.dom.value = null;
				});
				// TODO use this.browseButton.on('fileselected' 
				fileFieldEl.on('change', function() {
					var files = this.dom.files;
					if (files) {
						me.onFileSelection(files);
					}
				});

			}
		});

		MyApp.event.Folder.on({
			selected : function(args) {

				// console.log('fileupload args', args, 'me.containerId', me.containerId);

				// console.log('pathhhh',record.getId());
				if (args.containerId === me.containerId) {
					me.remoteFolder = args.record.getId();
				}

			}
		});

		this.callParent(arguments);

	},

	createUploadManager : function() {
		var uploaderOptions = this.getUploaderOptions() || {};

		Ext.applyIf(uploaderOptions, {
			url : this.uploadUrl,
			params : this.uploadParams,
			extraHeaders : this.uploadExtraHeaders,
			timeout : this.uploadTimeout
		});

		var uploadManager = Ext.create('MyApp.ux.panel.upload.Manager', {
			uploader : this.uploader,
			uploaderOptions : uploaderOptions,
			synchronous : this.getSynchronous(),
			// tony
			queue : this.queue
		});

		return uploadManager;
	},

	/**
	 * @private
	 * 
	 * Returns the config object for the top toolbar.
	 * 
	 * @return {Array}
	 */
	getTopToolbarConfig : function() {

		var me = this;
		var buttons = [];

		// me.enableBrowse = true;

		// simple uploader win
		if (me.enableBrowse) { // tony
			this.browseButton = Ext.create('MyApp.ux.panel.upload.BrowseButton', {
				itemId : 'browseButton',
				uploadFieldId : 'upload-field-at-win',
				name : 'file', // tony: for server side's fileUploadBean
				buttonText : this.textBrowse
			// ,
			// iconCls : 'ux-mu-icon-action-browse'
			});
			// this.browseButton.on('fileselected', this.onFileSelection, this); //tony: listen at initComponent

			buttons.push(this.browseButton, '-' // tony
			);
		}

		buttons.push({
			hidden : true,// tony
			itemId : 'button_upload',
			text : this.textUpload,
			iconCls : 'ux-mu-icon-action-upload',
			scope : this,
			handler : this.onInitUpload
		}, {
			hidden : true,// tony
			itemId : 'button_abort',
			text : this.textAbort,
			iconCls : 'ux-mu-icon-action-abort',
			scope : this,
			handler : this.onAbortUpload,
			disabled : true
		}, {
			itemId : 'button_remove_selected',
			text : this.textRemoveSelected,
			iconCls : 'ux-mu-icon-action-remove',
			scope : this,
			handler : this.onMultipleRemove
		}, '-', {
			itemId : 'button_remove_all',
			text : this.textRemoveAll,
			iconCls : 'ux-mu-icon-action-remove',
			scope : this,
			handler : this.onRemoveAll
		});

		// var buttons = [ ];

		return {
			xtype : 'toolbar',
			dock : 'top',
			items : buttons
		};
	},

	/**
	 * @private
	 * 
	 * Initializes and returns the queue object.
	 * 
	 * @return {MyApp.ux.panel.upload.Queue}
	 */
	initQueue : function() {
		var queue = Ext.create('MyApp.ux.panel.upload.Queue');
		// console.log('queue', queue);

		queue.on('queuechange', this.onQueueChange, this);

		return queue;
	},

	onInitUpload : function() {
		// console.log('onInitUpload', this.queue, this.queue.getCount());
		if (!this.queue.getCount()) {
			// console.log('onInitUpload if');
			return;
		}

		this.stateUpload();
		this.startUpload();
	},

	onAbortUpload : function() {
		this.uploadManager.abortUpload();
		this.finishUpload();
		this.switchState();
	},

	onUploadComplete : function(manager, queue, errorCount) {
		this.finishUpload();
		this.stateInit();
		if (manager && queue) { // tony: sometimes queue will be null after removeAll
			this.fireEvent('uploadcomplete', this, manager, queue.getUploadedItems(), errorCount);
		}

		manager.resetUpload();
	},

	/**
	 * @private
	 * 
	 * Executes after files has been selected for upload through the "Browse" button. Updates the upload queue with the new files.
	 * 
	 * @param {MyApp.ux.panel.upload.BrowseButton}
	 *            input
	 * @param {FileList}
	 *            files
	 */
	onFileSelection : function(/* (tony) input, */files) {

		// console.log('#remoteFolder', this.down('#remoteFolder').getValue());
		// console.log('this.remoteFolder', this.remoteFolder);

		// this.queue.clearUploadedItems(); // tony: just append new files to queue

		this.queue.addFiles(files, this.remoteFolder); // tony
		// this.browseButton.reset(); // tony

		this.onInitUpload(); // tony: upload on selection
	},

	/**
	 * @private
	 * 
	 * Executes if there is a change in the queue. Updates the related components (grid, toolbar).
	 * 
	 * @param {MyApp.ux.panel.upload.Queue}
	 *            queue
	 */
	onQueueChange : function(queue) {
		this.updateStatusBar();

		this.switchState();
	},

	/**
	 * @private
	 * 
	 * Executes upon hitting the "multiple remove" button. Removes all selected items from the queue.
	 */
	onMultipleRemove : function() {
		var records = this.grid.getSelectedRecords();
		if (!records.length) {
			return;
		}

		var keys = [];
		var i;
		var num = records.length;

		for (i = 0; i < num; i++) {
			keys.push(records[i].getId());
		}

		this.queue.removeItemsByKey(keys);
	},

	onRemoveAll : function() {
		// this.queue.clearItems();

		// console.log('onRemoveAll this.id', this.id);

		var records = this.grid.getStore().getRange();
		var keys = [];
		var i;
		var num = records.length;

		for (i = 0; i < num; i++) {
			keys.push(records[i].getId());
		}

		this.queue.removeItemsByKey(keys);

	},

	onItemUploadSuccess : function(manager, item, info) {
		// tony
		MyApp.event.File.fireEvent('created', {
			name : item.fileApiObject.name,
			folder : item.remoteFolder,
			path : item.remoteFolder + '/' + item.fileApiObject.name,
			type : MyApp.Const.File.Type.IS_FILE,
			size : item.fileApiObject.size,
			modifyTime : (new Date().getTime())
		});

	},

	onItemUploadFailure : function(manager, item, info) {
		// tony
		// TODO enable retry icon
		// TODO show error msg
	},

	// tony: show warning dialog before browser exit
	onBeforeunload : function(e) {
		var confirmationMessage = Locale.getMsg('view.transfer.upload.beforeunload'); // message will not show in FF
		(e || window.event).returnValue = confirmationMessage; // Gecko, IE
		return confirmationMessage; // Webkit, Safari, Chrome etc.
	},

	startUpload : function() {
		this.uploading = true;
		this.uploadManager.uploadQueue(this.queue);
		// tony
		addDomEventListener(window, 'beforeunload', this.onBeforeunload);

	},

	finishUpload : function() {
		this.uploading = false;
		// tony
		removeDomEventListener(window, 'beforeunload', this.onBeforeunload);

	},

	isUploadActive : function() {
		return this.uploading;
	},

	updateStatusBar : function() {
		if (!this.statusBar) {
			return;
		}

		// var numFiles = this.queue.getCount();

		this.statusBar.setSelectionMessage(this.queue.getCount(), this.queue.getTotalBytes());
	},

	getButton : function(id) {
		// return Ext.ComponentMgr.get(id); // tony
		this.down('#' + id); // tony
	},

	switchButtons : function(info) {
		var id;
		for (id in info) {
			this.switchButton(id, info[id]);
		}
	},

	switchButton : function(id, on) {
		var button = this.getButton(id);

		if (button) {
			if (on) {
				button.enable();
			} else {
				button.disable();
			}
		}
	},

	switchState : function() {
		if (this.uploading) {
			console.log('switchState stateUpload');
			this.stateUpload();
		} else if (this.queue.getCount()) {
			console.log('switchState stateQueue');
			this.stateQueue();
		} else {
			console.log('switchState stateInit');
			this.stateInit();
		}
	},

	stateInit : function() {
		this.switchButtons({
			'button_browse' : 1,
			'button_upload' : 0,
			'button_abort' : 0,
			'button_remove_all' : 1,
			'button_remove_selected' : 1
		});
	},

	stateQueue : function() {
		this.switchButtons({
			'button_browse' : 1,
			'button_upload' : 1,
			'button_abort' : 0,
			'button_remove_all' : 1,
			'button_remove_selected' : 1
		});
	},

	stateUpload : function() {
		this.switchButtons({
			'button_browse' : 0,
			'button_upload' : 0,
			'button_abort' : 1,
			'button_remove_all' : 1,
			'button_remove_selected' : 1
		});
	}

});

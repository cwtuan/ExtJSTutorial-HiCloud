/**
 * Uploader implementation - with the Connection object in ExtJS 4
 * 
 */
Ext.define('MyApp.ux.panel.upload.uploader.ExtJsUploader', {
	extend : 'MyApp.ux.panel.upload.uploader.AbstractXhrUploader',

	requires : [ 'MyApp.ux.panel.upload.data.Connection' ],

	config : {
		/**
		 * @cfg {String} [method='PUT']
		 * 
		 * The HTTP method to be used.
		 */
		method : 'PUT',

		/**
		 * @cfg {Ext.data.Connection}
		 * 
		 * If set, this connection object will be used when uploading files.
		 */
		connection : null
	},

	/**
	 * @property
	 * @private
	 * 
	 * The connection object.
	 */
	conn : null,

	/**
	 * @private
	 * 
	 * Initializes and returns the connection object.
	 * 
	 * @return {MyApp.ux.panel.upload.data.Connection}
	 */
	initConnection : function() {
		var conn, url = this.url;

		console.log('[ExtJsUploader initConnection params', this.params);

		if (this.connection instanceof Ext.data.Connection) {
			console.log('[ExtJsUploader] instanceof Connection');
			conn = this.connection;
		} else {
			console.log('[ExtJsUploader] !! instanceof Connection');
			if (this.params) {
				url = Ext.urlAppend(url, Ext.urlEncode(this.params));
			}

			conn = Ext.create('MyApp.ux.panel.upload.data.Connection', {
				disableCaching : true,
				method : this.method,
				url : url,
				timeout : this.timeout,
				defaultHeaders : {
					'Content-Type' : this.contentType,
					'X-Requested-With' : 'XMLHttpRequest'
				}
			});
		}

		return conn;
	},

	/**
	 * @protected
	 */
	initHeaders : function(item) {

		console.log('[ExtJsUploader] initHeaders', item);

		var headers = this.callParent(arguments);

		headers['Content-Type'] = item.getType();

		return headers;
	},

	/**
	 * Implements {@link MyApp.ux.panel.upload.uploader.AbstractUploader#uploadItem}
	 * 
	 * @param {MyApp.ux.panel.upload.Item}
	 *            item
	 */
	uploadItem : function(item) {

		console.log('ExtJsUploader uploadItem', item);

		var file = item.getFileApiObject();
		if (!file) {
			return;
		}

		item.setUploading();

		// tony
		this.params = {
			folder : item.getRemoteFolder()
		};
		this.conn = this.initConnection();

		/*
		 * Passing the File object directly as the "rawData" option. Specs: https://dvcs.w3.org/hg/xhr/raw-file/tip/Overview.html#the-send()-method
		 * http://dev.w3.org/2006/webapi/FileAPI/#blob
		 */
		console.log('ExtJsUploader conn', this.conn);
		this.conn.request({
			scope : this,
			headers : this.initHeaders(item),
			rawData : file,
			timeout : MyApp.Const.JAVASCRIPT_MAX_NUMBER, // tony
			success : Ext.Function.bind(this.onUploadSuccess, this, [ item ], true),
			failure : Ext.Function.bind(this.onUploadFailure, this, [ item ], true),
			progress : Ext.Function.bind(this.onUploadProgress, this, [ item ], true)
		});

	},

	/**
	 * Implements {@link MyApp.ux.panel.upload.uploader.AbstractUploader#abortUpload}
	 */
	abortUpload : function() {
		if (this.conn) {
			/*
			 * If we don't suspend the events, the connection abortion will cause a failure event.
			 */
			this.suspendEvents();
			console.log('abort conn', conn);
			this.conn.abort();
			this.resumeEvents();
		}
	}
});

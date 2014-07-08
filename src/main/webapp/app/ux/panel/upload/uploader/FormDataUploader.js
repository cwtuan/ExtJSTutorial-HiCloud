/**
 * Uploader implementation which uses a FormData object to send files through XHR requests.
 * 
 */
Ext.define('MyApp.ux.panel.upload.uploader.FormDataUploader', {
	extend : 'MyApp.ux.panel.upload.uploader.AbstractXhrUploader',

	requires : [ 'MyApp.ux.panel.upload.data.Connection' ],

	method : 'POST',
	xhr : null,

	initConnection : function() {

		var xhr = new XMLHttpRequest(), method = this.method, url = this.url;

		// tony
		if (this.params) {
			url = Ext.urlAppend(url, Ext.Object.toQueryString(this.params));
		}

		// console.log('[FormDataUploader] url', url);

		xhr.open(method, url, true);

		this.abortXhr = function() {
			this.suspendEvents();
			xhr.abort();
			this.resumeEvents();
		};

		return xhr;
	},

	uploadItem : function(item) {
		var me = this;

		// tony
		this.params = {
			folder : item.getRemoteFolder()
		};

		var file = item.getFileApiObject();

		item.setUploading();

		var formData = new FormData();
		formData.append(file.name, file);

		var xhr = this.initConnection();
		item.setXhr(xhr);
		// console.log('getXhr', item, item.getXhr());

		xhr.setRequestHeader(this.filenameHeader, unescape(encodeURIComponent(file.name)));
		xhr.setRequestHeader(this.sizeHeader, file.size);
		xhr.setRequestHeader(this.typeHeader, file.type);

		var loadendhandler = Ext.Function.bind(this.onLoadEnd, this, [ item ], true);
		var progresshandler = Ext.Function.bind(this.onUploadProgress, this, [ item ], true);

		xhr.addEventListener('loadend', loadendhandler, true);
		xhr.upload.addEventListener("progress", progresshandler, true);

		xhr.send(formData);
	},

	/**
	 * Implements {@link MyApp.ux.panel.upload.uploader.AbstractUploader#abortUpload}
	 */
	abortUpload : function() {
		console.log('abortUpload', this);
		this.abortXhr();
	},

	/**
	 * @protected
	 * 
	 * A placeholder for the abort procedure.
	 */
	abortXhr : function() {
	},

	onLoadEnd : function(event, item) {
		var response = event.target;

		if (response.status != 200) {
			return this.onUploadFailure(response, null, item);
		}

		return this.onUploadSuccess(response, null, item);
	}
});

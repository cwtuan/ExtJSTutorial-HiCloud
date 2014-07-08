/**
 * Modified Ext.data.Connection object, adapted to be able to report progress.
 */
Ext.define('MyApp.ux.panel.upload.data.Connection', {
    extend : 'Ext.data.Connection',
  

    /**
     * @cfg {Function}
     * 
     * Callback fired when a progress event occurs (xhr.upload.onprogress).
     */
    progressCallback : null,

    request : function(options) {
    	options.method = 'PUT';
    	
    	console.log('[Connection]request options', options);
    	
        var progressCallback = options.progress;
        if (progressCallback) {
            this.progressCallback = progressCallback;
        }

        this.callParent(arguments);
    },

    getXhrInstance : function() {
        var xhr = this.callParent(arguments);

        if (this.progressCallback) {
            xhr.upload.onprogress = this.progressCallback;
        }

        return xhr;
    }
});
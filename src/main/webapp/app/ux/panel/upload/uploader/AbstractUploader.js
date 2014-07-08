/**
 * Abstract uploader object.
 * 
 * The uploader object implements the the upload itself - transports data to the server. This is an "abstract" object
 * used as a base object for all uploader objects.
 * 
 */
Ext.define('MyApp.ux.panel.upload.uploader.AbstractUploader', {
    mixins : {
        observable : 'Ext.util.Observable'
    },

    config : {
        /**
         * @cfg {Number} [maxFileSize=50000000]
         * 
         * (NOT IMPLEMENTED) The maximum file size allowed to be uploaded.
         */
        maxFileSize : 50000000,

        /**
         * @cfg {String} url (required)
         * 
         * The server URL to upload to.
         */
        url : '',

        /**
         * @cfg {Number} [timeout=60000]
         * 
         * The connection timeout in miliseconds.
         */
        timeout : 60 * 1000,

        /**
         * @cfg {String} [contentType='application/binary']
         * 
         * The content type announced in the HTTP headers. It is autodetected if possible, but if autodetection
         * cannot be done, this value is set as content type header.
         */
        contentType : 'application/binary',

        /**
         * @cfg {String} [filenameHeader='X-File-Name']
         * 
         * The name of the HTTP header containing the filename.
         */
        filenameHeader : 'X-File-Name',

        /**
         * @cfg {String} [sizeHeader='X-File-Size']
         * 
         * The name of the HTTP header containing the size of the file.
         */
        sizeHeader : 'X-File-Size',

        /**
         * @cfg {String} [typeHeader='X-File-Type']
         * 
         * The name of the HTTP header containing the MIME type of the file.
         */
        typeHeader : 'X-File-Type',

        /**
         * @cfg {Object}
         * 
         * Additional parameters to be sent with the upload request.
         */
        params : {},

        /**
         * @cfg {Object}
         * 
         * Extra headers to be sent with the upload request.
         */
        extraHeaders : {}
    },

    /**
     * Constructor.
     * @param {Object} [config]
     */
    constructor : function(config) {
        this.mixins.observable.constructor.call(this);

        this.addEvents({
            uploadfailure : true,
            uploadsuccess : true,
            uploadprogress : true
        });

        this.initConfig(config);
    },

    /**
     * @protected
     */
    initHeaders : function(item) {
        var headers = this.extraHeaders || {};
        headers[this.filenameHeader] = item.getFilename();
        headers[this.sizeHeader] = item.getSize();
        headers[this.typeHeader] = item.getType();

        return headers;
    },

    /**
     * @abstract
     * 
     * Upload a single item (file). 
     * **Implement in subclass**
     * 
     * @param {MyApp.ux.panel.upload.Item} item
     */
    uploadItem : function(item) {
    },

    /**
     * @abstract
     * 
     * Aborts the current upload. 
     * **Implement in subclass**
     */
    abortUpload : function() {
    }

});
/**
 * Data structure managing the upload file queue.
 * 
 */
Ext.define('MyApp.ux.panel.upload.Queue', {
	extend : 'Ext.util.MixedCollection',

	requires : [ 'MyApp.ux.panel.upload.Item' ],

	/**
	 * Constructor.
	 * 
	 * @param {Object}
	 *            config
	 */
	constructor : function(config) {

		this.callParent(arguments);

		this.addEvents({
			multiadd : true,
			multiremove : true,
			queuechange : true,
			itemchangestatus : true,
			itemprogressupdate : true
		});

		this.on('clear', function() {
			this.fireEvent('queuechange', this);
		}, this);

	},

	/**
	 * Adds files to the queue.
	 * 
	 * @param {FileList}
	 *            fileList
	 */
	addFiles : function(fileList, remoteFolder) { // tony

		var i;
		var items = [];
		var num = fileList.length;

		if (!num) {
			return;
		}

		for (i = 0; i < num; ++i) {
			items.push(this.createItem(fileList[i], remoteFolder)); // tony
		}

	
		this.addAll(items);

		this.fireEvent('multiadd', this, items);
		this.fireEvent('queuechange', this);

	},

	/**
	 * Uploaded files are removed, the rest are set as ready.
	 */
	reset : function() {
		this.clearUploadedItems();

		this.each(function(item) {
			item.reset();
		}, this);
	},

	/**
	 * Returns all queued items.
	 * 
	 * @return {MyApp.ux.panel.upload.Item[]}
	 */
	getItems : function() {
		return this.getRange();
	},

	/**
	 * Returns an array of items, that have already been uploaded.
	 * 
	 * @return {MyApp.ux.panel.upload.Item[]}
	 */
	getUploadedItems : function() {
		var uploadedItems = [];
		var num = this.getCount();
		var i;

		for (i = 0; i < num; i++) {
			var item = this.getAt(i);
			if (item.isUploaded()) {
				uploadedItems.push(item);
			}
		}

		return uploadedItems;
	},

	/**
	 * Returns the first "ready" item in the queue (with status STATUS_READY).
	 * 
	 * @return {MyApp.ux.panel.upload.Item/null}
	 */
	getFirstReadyItem : function() {
		var items = this.getRange();
		var num = this.getCount();
		var i;

		for (i = 0; i < num; i++) {
			if (items[i].isReady()) {
				return items[i];
			}
		}

		return null;
	},

	/**
	 * Clears all items from the queue.
	 * 
	 */
	// tony: not in use
	clearItems : function() {
		this.clear();
	},

	/**
	 * Removes the items, which have been already uploaded, from the queue.
	 */
	clearUploadedItems : function() {
		this.removeItems(this.getUploadedItems());
	},

	/**
	 * Removes items from the queue.
	 * 
	 * @param {MyApp.ux.panel.upload.Item[]}
	 *            items
	 */
	removeItems : function(items) {
		var num = items.length;
		var i;

		if (!num) {
			return;
		}

		for (i = 0; i < num; i++) {
			this.remove(items[i]);
		}

		this.fireEvent('queuechange', this);
	},

	/**
	 * Removes the items identified by the supplied array of keys.
	 * 
	 * @param {Array}
	 *            itemKeys
	 */
	removeItemsByKey : function(itemKeys) {
		var i;
		var num = itemKeys.length;

		if (!num) {
			return;
		}

		this.fireEvent('beforemultiremove', this, itemKeys);

		for (i = 0; i < num; i++) {
			this.removeItemByKey(itemKeys[i]);
		}

		this.fireEvent('multiremove', this, itemKeys);
		// console.log('multiremove', itemKeys); // key=path TODO about conn if key is for this conn
		this.fireEvent('queuechange', this);
	},

	/**
	 * Removes a single item by its key.
	 * 
	 * @param {String}
	 *            key
	 */
	removeItemByKey : function(key) {
		this.removeAtKey(key);
	},

	/**
	 * Perform cleanup, after the upload has been aborted.
	 */
	recoverAfterAbort : function() {
		this.each(function(item) {
			if (!item.isUploaded() && !item.isReady()) {
				item.reset();
			}
		});
	},

	/**
	 * @private
	 * 
	 * Initialize and return a new queue item for the corresponding File object.
	 * 
	 * @param {File}
	 *            file
	 * @return {MyApp.ux.panel.upload.Item}
	 */
	createItem : function(file, remoteFolder) { // tony

		var item = Ext.create('MyApp.ux.panel.upload.Item', {
			fileApiObject : file,
			remoteFolder : remoteFolder
		// tony
		});
		item.on('changestatus', this.onItemChangeStatus, this);
		item.on('progressupdate', this.onItemProgressUpdate, this);

		return item;
	},

	/**
	 * A getKey() implementation to determine the key of an item in the collection.
	 * 
	 * @param {MyApp.ux.panel.upload.Item}
	 *            item
	 * @return {String}
	 */
	getKey : function(item) {
		return item.getId();
	},

	onItemChangeStatus : function(item, status) {
		this.fireEvent('itemchangestatus', this, item, status);
	},

	onItemProgressUpdate : function(item) {
		this.fireEvent('itemprogressupdate', this, item);
	},

	/**
	 * Returns true, if the item is the last item in the queue.
	 * 
	 * @param {MyApp.ux.panel.upload.Item}
	 *            item
	 * @return {boolean}
	 */
	isLast : function(item) {
		var lastItem = this.last();
		if (lastItem && item.getId() == lastItem.getId()) {
			return true;
		}

		return false;
	},

	/**
	 * Returns total bytes of all files in the queue.
	 * 
	 * @return {number}
	 */
	getTotalBytes : function() {
		var bytes = 0;

		this.each(function(item, index, length) {
			bytes += item.getSize();
		}, this);

		return bytes;
	}
});

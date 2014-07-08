/**
 * The grid displaying the list of uploaded files (queue).
 * 
 * @class MyApp.ux.panel.upload.ItemGridPanel
 * @extends Ext.grid.Panel
 */
Ext.define('MyApp.ux.panel.upload.ItemGridPanel', {
	extend : 'Ext.grid.Panel',

	requires : [ 'Ext.selection.CheckboxModel', 'MyApp.ux.panel.upload.Store' ],

	layout : 'fit',
	border : 0,

	viewConfig : {
		scrollOffset : 40
	},

	config : {
		queue : null,

		textFilename : 'Filename',
		textSize : 'Size',
		textType : 'Type',
		textStatus : 'Status',
		textProgress : '%'
	},

	constructor : function(config) {
		this.initConfig(config);

		return this.callParent(arguments);
	},

	initComponent : function() {

		if (this.queue) {
			this.queue.on('queuechange', this.onQueueChange, this);
			this.queue.on('itemchangestatus', this.onQueueItemChangeStatus, this);
			this.queue.on('itemprogressupdate', this.onQueueItemProgressUpdate, this);
		}

		Ext.apply(this, {
			store : Ext.create('MyApp.ux.panel.upload.Store'),
			selModel : Ext.create('Ext.selection.CheckboxModel', {
				checkOnly : true
			}),
			columns : [ {
				xtype : 'rownumberer',
				width : 40
			}, {
				itemId : 'filename', // tony
				// id : 'filename',
				dataIndex : 'filename',
				header : this.textFilename,
				flex : 1
			}, {
				dataIndex : 'remoteFolder', // tony
				header : Locale.getMsg('view.transfer.folder.remote'), // tony
				flex : 1
			}, {
				dataIndex : 'size',
				header : this.textSize,
				width : 70,
				renderer : function(value, meta, record) {
					// console.log('file record',record);
					return Ext.util.Format.fileSize(value);
				}
			}, {
				dataIndex : 'status',
				header : this.textStatus,
				width : 50,
				align : 'right',
				renderer : this.statusRenderer
			}, {
				dataIndex : 'progress',
				header : this.textProgress,
				width : 50,
				align : 'right',
				renderer : function(value) {
					if (!value) {
						value = 0;
					}
					return value + '%';
				}
			}
			// ,
			// { // tony
			// dataIndex : 'message',
			// width : 100,
			// // hidden : true
			// }
			]
		});

		this.callParent(arguments);
	},

	onQueueChange : function(queue) {
		this.loadQueueItems(queue.getItems());
	},

	onQueueItemChangeStatus : function(queue, item, status) {
		this.updateStatus(item);
	},

	onQueueItemProgressUpdate : function(queue, item) {
		this.updateStatus(item);
	},

	/**
	 * Loads the internal store with the supplied queue items.
	 * 
	 * @param {Array}
	 *            items
	 */
	loadQueueItems : function(items) {
		var data = [];
		var i;

		// tony
		for (i = 0; i < items.length; i++) {
			data.push({
				filename : items[i].getFilename(),
				size : items[i].getSize(),
				status : items[i].getStatus(),
				progress : items[i].getProgressPercent(),
				remoteFolder : items[i].getRemoteFolder(),
				type : items[i].getType()
			});
		}

		// tony
		// for (i = 0; i < items.length; i++) {
		// data.push([ items[i].getFilename(), items[i].getSize(), items[i].getStatus(), items[i].getProgressPercent(), items[i].getType() ]);
		// }
		this.loadStoreData(data);
	},

	loadStoreData : function(data, append) {

		// console.log('loadData', data);

		this.store.loadData(data, append);
	},

	getSelectedRecords : function() {
		return this.getSelectionModel().getSelection();
	},

	// tony TODO getRecordById -> path is id
	updateStatus : function(item) {
		// var record = this.getRecordByFilename(item.getFilename());
		var record = this.store.getById(item.getId()); // tony
		if (!record) {
			return;
		}

		var itemStatus = item.getStatus();

		if (itemStatus != record.get('status')) {
			this.scrollIntoView(record);

			record.set('status', item.getStatus());
			if (item.isUploadError()) {
				record.set('tooltip', item.getUploadErrorMessage());
			}
		}

		record.set('progress', item.getProgressPercent());
		record.commit();

		// Item in grid is deselected after record has been modified with set-method. It's fixed in Extjs 4.1.3.
		// TODO remove it after upgrade extjs
		// me.getView().refresh();
	},

	// tony
	// getRecordByFilename : function(filename) {
	// var index = this.store.findExact('filename', filename);
	// if (-1 == index) {
	// return null;
	// }
	//
	// return this.store.getAt(index);
	// },

	// tony
	// getIndexByRecord : function(record) {
	// console.log('getIndexByRecord record', record);
	//
	// return this.store.findExact('filename', record.get('filename'));
	// },

	statusRenderer : function(value, metaData, record, rowIndex, colIndex, store) {
		var iconCls = 'ux-mu-icon-upload-' + value;
		var tooltip = record.get('tooltip');
		if (tooltip) {
			value = tooltip;
		} else {
			'upload_status_' + value;
		}
		value = '<span class="ux-mu-status-value ' + iconCls + '" data-qtip="' + value + '" />';
		return value;
	},

	scrollIntoView : function(record) {

		var index = this.store.getById(record.getId());
		if (-1 == index) {
			return;
		}

		this.getView().focusRow(index);
		return;
		var rowEl = Ext.get(this.getView().getRow(index));
		// var rowEl = this.getView().getRow(index);
		if (!rowEl) {
			return;
		}

		var gridEl = this.getEl();

		// debug.log(rowEl.dom);
		// debug.log(gridEl.getBottom());

		if (rowEl.getBottom() > gridEl.getBottom()) {
			rowEl.dom.scrollIntoView(gridEl);
		}
	}
});

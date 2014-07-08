// developed by Virtuoso team
Ext.define('MyApp.ux.grid.PropertyGrid', {
	extend : 'Ext.grid.Panel',
	requires : [ 'MyApp.ux.grid.store.Property' ],
	hideHeaders : true,
	columns : [ {
		dataIndex : 'name',
		flex : 1,
		renderer : function(value, meta, record, rowIndex, columnIndex, model) {
			if (record.data.tooltipMessage) {
				return value + ' (<a href="#" data-qtip="' + record.data.tooltipMessage + '"><span class="help-cursor">?</span></a>)';
			} else {
				return value;
			}
		}
	}, {
		dataIndex : 'value',
		flex : 3,
		renderer : function(value, meta, record, rowIndex, columnIndex, model) {
			return String(value).replace(new RegExp('&lt;br/&gt;', 'g'), '<br/>');
		}
	} ],
	columnLines : true,
	disableSelection : true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('MyApp.ux.grid.store.Property', {
			model : me.model,
			properties : me.properties
		});
		me.callParent(arguments);
	},
	load : function(options) {
		var me = this;
		me.store.load(options);
	},
	getRecord : function() {
		return this.store.record;
	}
});

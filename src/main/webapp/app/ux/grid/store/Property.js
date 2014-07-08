Ext.define('MyApp.ux.grid.store.Property', {
	extend : 'Ext.data.Store',
	requires : [ 'MyApp.ux.grid.model.Property' ],
	constructor : function(config) {

		var me = this;
		me.model = config.model;
		me.properties = config.properties;
		me.callParent(config);
	},

	load : function(options) {
		var me = this, options = options || {};

		operation = new Ext.data.Operation(options);

		if (me.fireEvent('beforeload', me, operation) !== false) {
			me.loading = true;
			options.callback = function(record, operation) {
				me.loadData([ record ]);
				me.loading = false;
				me.fireEvent('load', me, [ record ]);
			};
			Ext.ModelManager.getModel(me.model).load(options.id, options);
		}

		return me;
	},
	loadRecords : function(records, options) {

		var me = this;
		var record = records[0];
		me.record = record;
		var newrecords = [];
		for ( var i in me.properties) {
			var p = me.properties[i], value;

			value = typeof (record) === 'undefined' ? null : (p.dataIndex ? record.get(p.dataIndex) : null);

			if (p.hidden === true || (Ext.isFunction(p.hidden) && p.hidden(value, record)))
				continue;

			newrecords.push(Ext.create('MyApp.ux.grid.model.Property', {
				name : p.name,
				value : p.renderer ? p.renderer(value, record) : value,
				tooltipMessage : p.tooltipMessage
			}));
		}
		me.callParent([ newrecords, options ]);
	}
});

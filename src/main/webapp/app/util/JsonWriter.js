Ext.define('MyApp.util.JsonWriter', {
	extend : 'Ext.data.writer.Json',
	getRecordData : function(record) {
		console.log('Util.JsonWriter',record.data,record.raw);
		Ext.applyIf(record.data, record.getAssociatedData());
		return record.raw;
	}
});

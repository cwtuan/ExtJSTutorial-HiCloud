// TODO use file.js model


Ext.define('MyApp.ux.panel.upload.Model', {
	extend : 'Ext.data.Model',
	idProperty : 'path',
	fields : [ {
		name : 'filename',
		type : 'string'
	}, {
		name : 'size',
		type : 'integer'
	}, {
		name : 'type',
		type : 'string'
	}, {
		name : 'status',
		type : 'string'
	}, {
		name : 'message',
		type : 'string'
	}, {
		name : 'remoteFolder', // tony
		type : 'string'
	}, {
		name : 'path', // tony
		type : 'string',
		convert : function(value, record) {
			return record.get('remoteFolder') + '/' + record.get('filename');
		}
	} ],
	proxy : {
		type : 'memory',
		reader : {
			type : 'array'
		}
	}
});

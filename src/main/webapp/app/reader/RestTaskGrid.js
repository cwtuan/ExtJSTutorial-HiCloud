//  Data example:
//	{
//		success : true,
//		errorKey : "X001",
//		target : [ {
//			oid : "123",
//			name : "myname",
//			size : 5
//		} ]
//	}

Ext.define('MyApp.reader.RestTaskGrid', {
	extend : 'Ext.data.reader.Json',
	alias : 'reader.restTaskGrid',
	successProperty : 'success',
	root : 'target',
	messageProperty : 'error'
});



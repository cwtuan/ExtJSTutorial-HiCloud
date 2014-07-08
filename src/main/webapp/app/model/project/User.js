Ext.define('MyApp.model.project.User', {
	extend : 'Ext.data.Model',
	idProperty : 'id',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'role',
		type : 'string'
	} ],
	proxy : {
		type : 'nestedRest',
		url : 'rest/projects/{0}/users/',
		reader : {
			type : 'restTaskGrid'
		}
	}
});

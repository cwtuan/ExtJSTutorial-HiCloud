Ext.define('MyApp.model.project.Project', {
	extend : 'Ext.data.Model',
	idProperty : 'id',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	} ],

	proxy : {
		type : 'rest',
		url : 'rest/projects',
		reader : {
			type : 'restTaskGrid'
		}

	}
});

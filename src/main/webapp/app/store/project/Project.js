Ext.define('MyApp.store.project.Project', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.project.Project',
	sorters : [ {
		property : 'name',
		direction : 'ASC'
	} ]
});

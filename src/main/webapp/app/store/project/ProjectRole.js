// TODO use loop to generate data

Ext.define('MyApp.store.project.ProjectRole', {
	extend : 'Ext.data.Store',
	fields : [ 'display', 'value', 'isDefault' ],
	data : [ {
		display : MyApp.locale.Converter.getProjectRole(MyApp.Const.Project.Role.MEMBER),
		value : MyApp.Const.Project.Role.MEMBER,
		// refactor to ECFA
		isDefault : true
	}, {
		display : MyApp.locale.Converter.getProjectRole(MyApp.Const.Project.Role.ADMIN),
		value : MyApp.Const.Project.Role.ADMIN
	} ]
});

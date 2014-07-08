Ext.define('MyApp.controller.Project', {
	extend : 'Ext.app.Controller',
	stores : [ 'MyApp.store.project.User', 'MyApp.store.project.Project' ],
	refs : [ {
		ref : 'userGrid',
		selector : 'userGrid'
	} ],
	init : function() {
		var me = this;
		me.control({
			'projectGrid' : {

				select : function(grid, record) {
					me.getUserGrid().load(record);
				}
			// ,cellclick : function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
			// if (cellIndex != 0) {
			// me.getProjectUserGrid().load(record);
			// }
			// }
			}
		});
	}
});

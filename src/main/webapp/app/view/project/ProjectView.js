Ext.define('MyApp.view.project.ProjectView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.projectView',
	border : false,
//	margins : '0 0 0 0',
	requires : [ 'MyApp.view.project.ProjectGrid', 'MyApp.view.project.UserGrid' ],
	layout : 'border',

	initComponent : function() {
		var me = this;
		

		me.items = [ {
			xtype : 'projectGrid',
			region : 'west',
			flex : .5,
			// margin : '0 5 0 0',
			split : true,
			collapsible : true,
			animCollapse : true
		}, {
			xtype : 'userGrid',
			region : 'center',
			flex : .5
		} ];

		me.callParent(arguments);

	}

});

Ext.define('MyApp.view.project.ProjectGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.projectGrid',
	title : Locale.getMsg('view.project.projects'),
	icon : 'css/images/clapperboard_16x16.png',
	viewConfig : {
		getRowClass : function(record, index) {
			return 'cursorPointer';
		}
	},
	initComponent : function() {
		var me = this;

		me.store = Ext.create('MyApp.store.project.Project');

		me.columns = [ {

			header : Locale.getMsg('view.common.title'),
			dataIndex : 'name',
			flex : 2
		} ];

		me.callParent(arguments);

		me.store.load();

		me.on({
			viewready : function() {
				// select the first project as default
				if (me.store.getCount() != 0) {
					// me.fireEvent('cellclick', me, null, 1, me.store.first());
					me.getSelectionModel().select(0);

				}
			}
		});

	}

});

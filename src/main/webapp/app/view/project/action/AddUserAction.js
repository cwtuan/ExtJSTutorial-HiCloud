Ext.define('MyApp.view.project.action.AddUserAction', {
	extend : 'MyApp.action.Action',
	icon : 'css/images/add_16x16.png',
	requires : [ 'MyApp.view.project.AddUserWin' ],
	text : Locale.getMsg('view.common.add'),
	project : null,
	panel : null,
	// constructor : function(config) {
	// var me = this;
	// me.callParent([ config ]);
	// },
	handler : function() {
		var me = this;
		Ext.widget('addUserWin', {
			panel : me.panel
		// me.project is set by switchStatus
		}).show();
	},
	switchStatus : function(projectRecord) {
		var me = this;

		// me.project = projectRecord;

		var result = MyApp.Validator.notProject1(projectRecord);

		// TODO determine it at ecfa action
		if (result !== true) {
			me.disable();
			me.setTooltip(result);
		} else {
			me.enable();
			me.setTooltip('');
		}

	}
});

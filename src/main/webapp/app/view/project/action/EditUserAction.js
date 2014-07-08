Ext.define('MyApp.view.project.action.EditUserAction', {
	extend : 'MyApp.action.Action',
	icon : 'css/images/edit_16x16.png',
	requires : [ 'MyApp.view.project.EditUserWin' ],
	text : Locale.getMsg('view.common.edit'),
	panel : null,
	// TODO disableIfNoSelectionOrMoreThanOne:true,
	handler : function() {
		var me = this;
		Ext.widget('editUserWin', {
			panel : me.panel
		}).show();
	},
	switchStatus : function(projectRecord) {
		var me = this;
		if (me.disableIfNoSelectionOrMoreThanOne()) {
			return;
		}

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

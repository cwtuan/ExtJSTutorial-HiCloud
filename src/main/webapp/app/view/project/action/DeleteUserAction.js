Ext.define('MyApp.view.project.action.DeleteUserAction', {
	extend : 'MyApp.action.Action',
	icon : 'css/images/delete_16x16.png',
	text : Locale.getMsg('view.common.delete'),
	panel : null,
	// project : null,
	// disableIfNoSelection : true,
	switchStatus : function(projectRecord) {
		var me = this;

		// TODO 先用後面的Validator，再disableIfNoSelection
		if (me.disableIfNoSelection()) {
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

	},
	handler : function(config) {
		var me = this;

		Ext.Msg.confirm(Locale.getMsg('view.common.warning'), Locale.getMsg('view.auth.user.delete.confirm'), function(btn) {
			if (btn == 'yes') {

				MyApp.Restful.request({
					method : 'DELETE',
					records : me.panel.getSelectionModel().getSelection(), // if you have extjs model, you don't need to sepcify url
					eventType : MyApp.event.User,
					successSubject : Locale.getMsg('view.auth.user.delete.success'),
					failureSubject : Locale.getMsg('view.auth.user.delete.failure'),
					success : function(jsonResp) {
						// Ext.getCmp('notifybar').showSuccess(Locale.getMsg('view.auth.user.delete.success'));
						// MyApp.event.User.fireEvent('destroy', jsonResp.target);
					},
					failure : function(jsonResp) {
						// Ext.getCmp('notifybar').showError(MyApp.locale.Converter.getErrorMsg(Locale.getMsg('view.auth.user.delete.failure'), jsonResp));
					}
				});
			}
		});

	}

});

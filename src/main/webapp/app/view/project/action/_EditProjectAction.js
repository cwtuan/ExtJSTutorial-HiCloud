Ext.define('MyApp.view.project.action._EditProjectAction', {
	extend : 'MyApp.action.RowEditAction',
	alias : 'widget.editProjectAction',
	// record : null,
	panel : null,
	getDisabledTooltip : function(record) {
		// TODO determine it at ecfa actions
		var result = MyApp.Validator.notProject1(record);
		return record === true ? null : result;
	},
	getErrorMsg : function(jsonResp, record) {
		return MyApp.locale.Converter.getErrorMsg(Locale.getMsg('view.project.edit.error', record.get('name')), jsonResp);
	},
	constructor : function(config) {
		var me = this;
		config.getErrorMsg = me.getErrorMsg;
		config.eventType = MyApp.event.Project;
		config.disabledTooltip = me.getDisabledTooltip(config.record);
		me.callParent([ config ]);
	}
});

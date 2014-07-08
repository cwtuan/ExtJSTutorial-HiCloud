Ext.define('MyApp.view.project.action._DeleteProjectAction', {
	extend : 'MyApp.action.RowDeleteAction',
	alias : 'widget.deleteProjectAction',
	record : null,
	getDisabledTooltip : function(record) {
		var result = MyApp.Validator.notProject1(record);
		return record === true ? null : result;
	},
	getErrorMsg : function(jsonResp, record) {
		return MyApp.locale.Converter.getErrorMsg(Locale.getMsg('view.project.delete.error', record.get('name')), jsonResp);
	},
	constructor : function(config) {
		var me = this;
		config.disabledTooltip = me.getDisabledTooltip(config.record);
		config.confirmMsg = Locale.getMsg('view.project.delete.confirm', config.record.get('name'));
		config.eventType = MyApp.event.Project;
		me.callParent([ config ]);
	}
});

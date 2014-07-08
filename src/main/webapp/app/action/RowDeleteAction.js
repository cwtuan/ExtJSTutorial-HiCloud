Ext.define('MyApp.action.RowDeleteAction', {
	extend : 'MyApp.action.Action',
	icon : 'css/images/delete_16x16.png',
	confirmMsg : null, // leave it null if you don't want to show confirm win
	getErrorMsg : null, // must be overrided
	constructor : function(config) {
		var me = this;
		config.getErrorMsg = me.getErrorMsg;
		config.defaultTooltip = Locale.getMsg('view.common.delete');
		config.request = function() {
			var me = this;
			MyApp.Restful.request({
				method : 'DELETE',
				record : me.record,
				success : function(jsonResp) {
					// TODO support scope
					// me.eventType.fireEvent('destroy', jsonResp.target);
					me.eventType.fireEvent('destroy', me.record);
				},
				failure : function(jsonResp) {
					console.log('delete jsonResp', jsonResp);
					Ext.getCmp('notifybar').showError(me.getErrorMsg(jsonResp, me.record));
				}
			});
		};

		me.callParent([ config ]);
	},
	handler : function() {
		var me = this;

		if (me.confirmMsg) {
			Ext.Msg.confirm(Locale.getMsg('view.common.warning'), me.confirmMsg, function(btn) {
				if (btn == 'yes') {
					me.request();
				}
			});
		} else {
			me.request();
		}
	}

});

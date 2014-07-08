Ext.define('MyApp.action.RowEditAction', {
	extend : 'MyApp.action.Action',
	icon : 'css/images/edit_16x16.png',
	getErrorMsg : null, // must be overrided
	// record : null,
	// panel : null,
	constructor : function(config) {
		var me = this;
		me.itemId = Ext.String.format('{0}-EditAction', config.record.getId());
		// me.record = config.record;

		config.defaultTooltip = Locale.getMsg('view.common.edit');
		me.callParent([ config ]);

		// save data to server after editing
		if (!config.panel.hasListener('edit')) {
			config.panel.on({
				edit : function(editor, e) {

					MyApp.Restful.request({
						record : e.record,
						method : 'PUT',
						success : function(jsonResp) {
							// console.log('RowEditAction jsonResp', jsonResp.target);
							config.eventType.fireEvent('update', e.record);
						},
						failure : function(jsonResp) {
							config.panel.store.rejectChanges();
							Ext.getCmp('notifybar').showError(me.getErrorMsg(jsonResp, e.record));
						}
					});

					// MyApp.Restful.PUT(url, e.record.data, {
					// success : function(jsonResp) {
					// config.eventType.fireEvent('updated');
					// },
					// failure : function(jsonResp) {
					// config.panel.store.rejectChanges();
					// Ext.getCmp('notifybar').showError(me.getErrorMsg(jsonResp, e.record));
					// }
					// });

					// e.record.save({
					// success : function(record, operation) {
					// console.log('success edit pro', record, operation.response);
					// config.eventType.fireEvent('updated');
					// },
					// failure : function(record, operation) {
					// console.log('fail edit pro response', operation.response); // undefined? WTF!!!
					// console.log('fail edit pro jsonData', operation.request.scope.reader.jsonData);
					//										
					// config.panel.store.rejectChanges();
					// }
					// });
				}
			});
		}

		// disable double row editing if the action is disabled
		if (!config.panel.hasListener('beforeedit')) {
			config.panel.on({
				beforeedit : function(editor, e) {
					return !config.panel.down(Ext.String.format('#{0}-EditAction', e.record.getId())).disabled;
				}
			});
		}
	},
	handler : function() {
		var me = this;
		me.panel.plugins[0].startEdit(me.record, 0); // TODO find by id
	}

});

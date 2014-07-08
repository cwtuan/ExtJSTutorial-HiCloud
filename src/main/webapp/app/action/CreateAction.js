//Ext.define('MyApp.action.CreateAction', {
//	extend : 'MyApp.action.Action',
//	icon : 'css/images/add_16x16.png',
//	text : Locale.getMsg('view.common.add'),
//	form : null, // concrete action need to create a win for it 
//	constructor : function(config) {
//		var me = this;
//		config.defaultTooltip = '';
//		me.callParent([ config ]);
//
//		if (!config.panel.hasListener('edit')) {
//			config.panel.on({
//				edit : function(editor, e) {
//
//					// console.log('e.record.getProxy.url', e.record.getProxy().url);
//					//
//					MyApp.Restful.PUT(e.record.getProxy().url + '/' + e.record.getId(), e.record.data, {
//						success : function(jsonResp) {
//
//							if (jsonResp.successful) {
//								config.eventType.fireEvent('updated');
//							} else {
//								Ext.getCmp('notifybar').showError(me.getMyAppExceptionMsg(jsonResp.error));
//							}
//						},
//						failure : function(jsonResp) {
//							Ext.getCmp('notifybar').showError(me.getExceptionMsg());
//						}
//					});
//
//					// e.record.save({
//					// success : function(record, operation) {
//					// console.log('success edit pro', record, operation.response);
//					// config.eventType.fireEvent('updated');
//					// },
//					// failure : function(record, operation) {
//					// console.log('fail edit pro response', operation.response); // undefined? WTF!!!
//					// console.log('fail edit pro jsonData', operation.request.scope.reader.jsonData);
//					//
//					// config.panel.store.rejectChanges();
//					// }
//					// });
//				}
//			});
//		}
//
//	},
//	handler : function() {
//		this.win.show();
//	}
//
//});

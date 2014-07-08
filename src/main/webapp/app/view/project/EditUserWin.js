Ext.define('MyApp.view.project.EditUserWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.editUserWin',
	width : 400,
	modal : true,
	layout : {
		type : 'fit'
	},
	panel : null,
	title : Locale.getMsg('view.account.editProperty'),
	initComponent : function() {
		var me = this;

		me.defaultFocus = 'email';

		me.items = [ {
			xtype : 'form',
			bodyPadding : 10,
			layout : 'anchor',
			defaults : {
				anchor : '100%',
				labelWidth : 110
			},

			items : [ {
				xtype : 'combo',
				fieldLabel : Locale.getMsg('view.project.user.role'),
				name : 'role',
				itemId : 'role',
				allowBlank : false,
				queryMode : 'local',
				displayField : 'display',
				valueField : 'value',
				store : Ext.create('MyApp.store.project.ProjectRole')
			}, {
				xtype : 'hiddenfield',
				name : 'id'
			} ],

			buttons : [ {
				text : Locale.getMsg('view.common.ok'),
				formBind : true,
				type : 'submit',
				handler : function() {

					var userData = this.up('form').getValues(); // {id:'xxx'}
					var userRecord = me.getTargetRecord();
					Ext.apply(userRecord.data, userData);
					console.log('PUT userRecord', userRecord);

					// PUT /rest/projects/p1/users/p1 {id:'user1',role:'ADMIN'}
					MyApp.Restful.request({
						// getBaseUrl() is /rest/projects/p1/users
						// url : me.panel.store.getBaseUrl(),
						record : userRecord,
						method : 'PUT',
						// params : {
						// yourParam1 : 123
						// },
						eventType : MyApp.event.User,
						successSubject : Locale.getMsg('view.project.user.edit.success', userData.id),
						failureSubject : Locale.getMsg('view.project.user.edit.error', userData.id),
						success : function(jsonResp) {
							// MyApp.event.User.fireEvent('update',
							// jsonResp.target);
							// Ext.getCmp('notifybar').showSuccess(Locale.getMsg('view.project.user.edit.success',
							// user.id));
						},
						failure : function(jsonResp) {
							// Ext.getCmp('notifybar').showError(
							// MyApp.locale.Converter.getErrorMsg(Locale.getMsg('view.project.user.edit.error',
							// user.id), jsonResp));
						}
					});
					me.close();

				}
			}, {
				text : Locale.getMsg('view.common.cancel'),
				handler : function() {
					me.close();
				}
			} ]
		} ];

		// set original value to form
		me.on({
			show : function() {
				me.down('form').loadRecord(me.getTargetRecord());
			}
		});

		me.callParent();
	},
	getTargetRecord : function() {
		return this.panel.getSelectionModel().getSelection()[0];
	}
});

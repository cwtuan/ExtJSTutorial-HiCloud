Ext.define('MyApp.view.project.AddUserWin', {
	extend : 'Ext.window.Window',
	alias : 'widget.addUserWin',
	panel : null,
	width : 400,
	modal : true,
	layout : {
		type : 'fit'
	},
	title : Locale.getMsg('view.project.user.invite'),
	initComponent : function() {
		var me = this;

		me.defaultFocus = 'id';

		me.items = [ {
			xtype : 'form',
			bodyPadding : 10,
			layout : 'anchor',
			defaults : {
				anchor : '100%',
				labelWidth : 110
			},

			items : [ {
				xtype : 'textfield',
				fieldLabel : Locale.getMsg('view.common.name'),
				name : 'id',
				itemId : 'id',
				maxLength : 50,
				allowBlank : false,
				// validator : function(value){return true;}
				validator : MyApp.Validator.noSpecialChar
			}, {
				xtype : 'combo',
				fieldLabel : Locale.getMsg('view.project.user.role'),
				tooltip : Locale.getMsg('view.project.user.role.tooltip'),
				name : 'role',
				itemId : 'role',
				allowBlank : false,
				queryMode : 'local',
				displayField : 'display',
				valueField : 'value',
				store : Ext.create('MyApp.store.project.ProjectRole')
			} ],

			buttons : [ {
				text : Locale.getMsg('view.common.ok'),
				formBind : true,
				type : 'submit',
				handler : function() {

					var project = me.panel.project;

					var userData = this.up('form').getValues();
					var modelName = me.panel.store.model.modelName;

					var url = Ext.String.format('rest/projects/{0}/users', project.getId()); 

					MyApp.Restful.request({
						url : url, // userData is not extjs model, so we need to specify the url
						record : userData,
						method : 'POST',
						eventType : MyApp.event.User,
						failureSubject : Locale.getMsg('view.project.user.add.failure', userData.id, project.get('name')),
						successSubject : Locale.getMsg('view.project.user.add.success', userData.id, project.get('name')),
						success : function(jsonResp) {
							console.log('jsonResp',jsonResp);
						},
						failure : function(jsonResp) {
						},
						callback : function() {
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
		me.callParent();

		// set default value for a comboBox
		me.on({
			show : function() {
				var combo = me.down('#role');
				var value = combo.getStore().findRecord('isDefault', true).get(combo.valueField);
				combo.setValue(value);
			}
		});
	}
});

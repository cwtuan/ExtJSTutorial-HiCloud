Ext.define('MyApp.view.project.UserGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userGrid',
	project : null,
	requires : [ 'MyApp.view.project.action.DeleteUserAction', 'MyApp.view.project.action.EditUserAction', 'MyApp.view.project.action.AddUserAction' ],
	title : Locale.getMsg('view.project.user.members'),
	icon : 'css/images/user_16x16.png',
	selType : 'checkboxmodel',
	selModel : {
		mode : 'MULTI'
	},
	// store: 'project.User',
	initComponent : function() {
		var me = this;

		me.store = Ext.create('MyApp.store.project.User');

		me.columns = [ {
			header : Locale.getMsg('view.auth.user.id'),
			dataIndex : 'id',
			flex : 1
		}, {
			header : Locale.getMsg('view.project.user.role'),
			dataIndex : 'role',
			flex : 2,
			renderer : MyApp.locale.Converter.getProjectRole
		} ];

		me.tbar = [ Ext.create('MyApp.view.project.action.AddUserAction', {
			itemId : 'addProjectUserAction',
			panel : me
		}), Ext.create('MyApp.view.project.action.DeleteUserAction', {
			itemId : 'deleteProjectUserAction',
			panel : me
		}), Ext.create('MyApp.view.project.action.EditUserAction', {
			itemId : 'editProjectUserAction',
			panel : me
		}), {
			itemId : 'refreshBtn',
			icon : 'css/images/refresh.png',
			text : Locale.getMsg('view.common.refresh'),
			handler : function() {
				me.store.reload();
			}
		} ];

		me.on({

			selectionchange : function(selectionModel, records, index) {
				me.switchBtnStatus();
			}
		});

		me.callParent(arguments);

		MyApp.event.User.on({
			destroy : function(userIds) {
				console.log('destroy User', userIds);
				Ext.Array.each(userIds, function(userId) {
					me.store.remove(me.store.getById(userId));
				});
			},
			create : function(userData) {
				// console.log('create User', userData);
				me.store.add(userData);
			},
			update : function(userData) {
				console.log('update', userData);
				me.store.remove(me.store.getById(userData.id));
				me.store.add(userData);
			}
		});

		MyApp.event.Project.on({
			select : function(record) {
				console.log('on project select event', record);
				me.load(record);
			}
		});
	},

	load : function(projectRecord) {

		var me = this;

		// 1. set title
		me.setTitle(Locale.getMsg('view.project.user.members') + ' (' + projectRecord.get('name') + ')');

		// 2. load users
		me.store.load({
			ids : [ projectRecord.getId() ]
		});
		me.project = projectRecord;

		// 3. determine button disability
		me.switchBtnStatus();
	},
	switchBtnStatus : function() {
		var me = this;
		me.down('#addProjectUserAction').switchStatus(me.project);
		me.down('#deleteProjectUserAction').switchStatus(me.project);
		me.down('#editProjectUserAction').switchStatus(me.project);
	}

});

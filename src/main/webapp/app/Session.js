Ext.define('MyApp.Session', {
	singleton : true,
	user : null,
	constructor : function() {
	},
	getSession : function() {
		var me = this;

		Ext.Ajax.request({
			url : 'rest/session',
			method : 'GET',
			// async : false,
			success : function(response) {
				me.user = Ext.decode(response.responseText);
				MyApp.event.Session.fireEvent('read', me.user);
			},
			failure : function() {
			}
		});

	},
	getUser : function() {
		return this.user;
	}
});

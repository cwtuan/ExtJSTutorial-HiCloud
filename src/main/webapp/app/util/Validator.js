// FIXME  not work in resetPassword.jsp

Ext.define('MyApp.util.Validator', {
	singleton : true,
	alternateClassName : [ 'MyApp.Validator' ],
	// constructor : function() {
	// },
	noSpecialChar : function(value) {
		if (/[^a-zA-Z0-9]/.test(value)) {
			return 'Only allow a-z, A-Z, and 0-9';
		}
		return true;
	},
	notProject1 : function(record) {
		if (record.get('name') === 'project1') {
			return Locale.getMsg('view.project.user.disabledBtnTip.role.owner');
		}

		return true;
	}

});

/**
 * Convert locale key to value
 * 
 */
Ext.define('MyApp.locale.Converter', {
	singleton : true,
	alternateClassName : [ 'MyApp.Converter' ],
	yes_no : function(value) {
		return value ? Locale.getMsg('view.yes') : Locale.getMsg('view.no');
	},
	getErrorMsg : function(failedMsg, jsonResp) {
		var msg = '';
		var key = 'err.' + ((jsonResp && jsonResp.error) ? jsonResp.error : '');
		// console.log('jsonResp',jsonResp, jsonResp.error);
		msg += failedMsg;
		msg += Locale.getMsg('err.reason');
		if (Locale.hasKey(key)) {
			msg += Locale.getMsg(key);
		} else {
			msg += Locale.getMsg('err.internal');
		}
		return msg;
	},

	// for official store retrieve error key from operation.error
	getSimpleErrorMsg : function(errorCode) {
		var msg = '';
		var key = 'err.' + errorCode;

		if (Locale.hasKey(key)) {
			msg += Locale.getMsg(key);
		} else {
			msg += Locale.getMsg('err.internal');
		}
		return msg;
	},

	getProjectRole : function(projectRole) {
		return Locale.getMsg('view.project.user.role.' + projectRole.toLowerCase());
	}

});

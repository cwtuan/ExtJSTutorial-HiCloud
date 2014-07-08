Ext.define('MyApp.HiCloudSetting', {
	singleton : true,
	init : function(config) {

		delete Ext.tip.Tip.prototype.minWidth;
		Ext.picker.Date.override({
			dayNames : Ext.Date.dayNames
		});

		// Timeout Validation
		Ext.Ajax.on('requestcomplete', function(conn, response, options, eOpts) {
			if (!response.getResponseHeader)
				return; // for some special cases like 'upload' or something else
			var sessionStatus = response.getResponseHeader("sessionstatus");
			// redirectUrl = response.getResponseHeader("redirect");
			if (sessionStatus && sessionStatus === 'timeout') {
				showTimeoutMsg();
			}

			/*
			 * if (redirectUrl && redirectUrl.length>0) { // [Open Redirect Issue] APP_IS_CLOSE = false;
			 * window.location=redirectUrl; }
			 */
		}, this);

		if (!window.console) {
			var doNothing = function() {
			};
			window.console = {
				log : doNothing,
				info : doNothing,
				warn : doNothing,
				error : doNothing
			};
		}

	}
});

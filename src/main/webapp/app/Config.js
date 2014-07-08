Ext.define('MyApp.Config', {
	singleton : true,
	NO_INTERNET_RETRY_PERIOD : 5000, // ms
	SECURE_COOKIES : false,

	// Queue
	TASK_UPDATING_PERIOD : 10000,
	BALANCE_UPDATING_PERIOD : 20000,
	AJAX_TIMEOUT : 120000, // 2 mins,

	USAGE_PERIOD_MONTH_NUM : 6, // used in UsageView.js
	CURRENCY : 'USD',//used in currency format//MyApp.Const.Currency.USD
	DATETIME_FORMAT : 'Y/m/d H:i:s'
	//SOFT_DEL_LIMIT : 30*24*60*60*1000 //30 days to milliseconds

});

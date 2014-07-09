Ext.define('MyApp.ExtOverride', {
	singleton : true,
	init : function() {

		// Convert ExtJS model in store to primitive object
		Ext.define('Ext.enhance.data.Store', {
			override : 'Ext.data.Store',
			getData : function() {
				var me = this;
				return Ext.Array.map(me.getRange(), function(model) {
					return model.getData();
				});
			}
		});

		// get last base URL after store load
		Ext.define('Ext.enhance.data.Store', {
			override : 'Ext.data.Store',
			getBaseUrl : function() {
				var me = this;
				return me.proxy.buildUrl({
					operation : new Ext.data.Operation(me.lastOptions),
					url : me.proxy.url
				});
			}
		});

	}
});

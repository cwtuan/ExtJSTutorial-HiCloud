Ext.define('MyApp.event.ModelEvent', {
	extend : 'Ext.util.Observable',
	constructor : function() {

		// TODO: const for event type
		this.addEvents({
			"read" : false,
			"select" : false, // MyApp.event.XXX.fireEvent('select', record);
			"create" : false, // MyApp.event.XXX.fireEvent('create', record);
			"update" : false, // MyApp.event.XXX.fireEvent('update', record);
			"destroy" : false,// MyApp.event.XXX.fireEvent('destroy', record);
			// "bulkupdated" : false,
			"running" : false
		// MyApp.event.XXX.fireEvent('running', true);
		});
		this.callParent(arguments);
	}
});

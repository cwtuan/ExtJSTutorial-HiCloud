/** 
 * Usage: 
 *
*  	proxy : {
		type : 'nestedRest',
		url : 'rest/countries/{0}/companies/{1}/departments/{2}/staff',		
		reader : {
			type : 'json'
		}
	}
    
    store.load( { ids: ['TW', 'CHTTL', 'B23', 'tony' ], params: { foo:123 } } );
    
    Then it will GET 'rest/countries/TW/companies/CHTTL/departments/B23/staff/tony?foo=123'
 * 
 * 
 */

Ext.define('MyApp.ux.proxy.NestedRest', {
	extend : 'Ext.data.proxy.Rest',
	alias : 'proxy.nestedRest',
	buildUrl : function(request) {
		var me = this;
		request.url = me.getUrl(request).replace(/\{(\d+)\}/g, function(m, i) {
//			console.log('m i', m, i, me.ids[i]);
			return me.ids[i];
		});
		// console.log('request.url', request.url);
		return me.callParent(arguments);
	},
	doRequest : function(operation, callback, scope) {
//		console.log('operation', operation);
		var me = this;
		if (operation.ids)
			me.ids = operation.ids;
		if (!me.ids)
			return false;
		return this.callParent(arguments);
	}

});

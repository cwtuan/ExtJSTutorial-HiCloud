
/*
var records = Ext.getCmp('userGrid-1027').store.getRange();
var record = Ext.getCmp('userGrid-1027').store.first();
var baseUrl = Ext.getCmp('userGrid-1027').store.getBaseUrl(); // baseUrl = rest/projects/p2/users

Delete users:
MyApp.Restful.request({method:'DELETE', records:records} );
URL: "http://localhost:8080/ExtJSTutorial/rest/projects/p2/users/?id=alice&id=tom&id=tony". 

Delete a user:
MyApp.Restful.request({method:'DELETE', record: record} );
URL: "http://localhost:8080/ExtJSTutorial/rest/projects/p2/users/alice"

Update a user data:
Ext.apply(record.data, {role:'ADMIN'});
MyApp.Restful.request({method:'PUT', record: record} );
URL: "http://localhost:8080/ExtJSTutorial/rest/projects/p2/users/alice". 
Request body: {id: "alice", role: "MEMBER"}

Update multiple user data:
MyApp.Restful.request({method:'PUT', records: records} );
URL: http://localhost:8080/ExtJSTutorial/rest/projects/p3/users/ 
Request body: [{id: "alice", role: "MEMBER"}, {id: "tony", role: "MEMBER"}]

Suspend a user:
MyApp.Restful.request({method:'PUT', record: record, params:{action: 'suspend'}} );
URL: "http://localhost:8080/ExtJSTutorial/rest/projects/p2/users/alice?&action=suspend". 
Request body: {id: "alice", role: "MEMBER"}

Suspend multiple users:
MyApp.Restful.request({method:'PUT', records: records, params:{action: 'suspend'}} );
URL: "http://localhost:8080/ExtJSTutorial/rest/projects/p3/users/?action=suspend". 
Request body: [{id: "alice", role: "MEMBER"}, {id: "tony", role: "MEMBER"}]

Create a user: 
MyApp.Restful.request({method:'POST', url: baseUrl ,record:{id:'newuser', role:'ADMIN'},eventType : MyApp.event.User } );
URL: "http://localhost:8080/ExtJSTutorial/rest/projects/p2/users". 
Request body: {id: "newuser", role: "ADMIN"}

 */

Ext.define('MyApp.util.Restful', {
	singleton : true,
	alternateClassName : [ 'MyApp.Restful' ],
	request : function(options) {

		if (!options.method) {
			console.error('[Restful.js] request method is required.', options);
			return;
		}

		// TODO refactor to ECFA
		options.failureSubject = options.failureSubject || Locale.getMsg('err.unknownSubject');

		var jsonData = {};
		options.params = options.params || {};

		var url = this.getUrl(options);

		if (options.method === 'PUT' || options.method === 'POST') {

			if (options.record) {
				if (options.record.isModel) {
					jsonData = options.record.data;
				} else {
					jsonData = options.record;
				}
			} else if (options.records) {
				jsonData = [];
				Ext.each(options.records, function(r) {
					if (r.isModel) {
						jsonData.push(r.data);
					} else {
						jsonData.push(r);
					}

				});
			}
		}

		Ext.Ajax.request({
			url : encodeURI(url),
			method : options.method,
			async : true,
			timeout : options.timeout || Ext.Ajax.timeout,
			headers : {
				'Content-Type' : 'application/json'
			},
			jsonData : jsonData, // for params in body
			params : options.params, // for params in url
			success : function(response) {
				var jsonResp = Ext.decode(response.responseText);
				if (jsonResp.success === false) {
					// call failure function if server response {success:false}
					if (options.failure) {
						// TODO refactor to HRM APP (show error msg even if no
						// failureSubject)
						Ext.getCmp('notifybar').showError(MyApp.locale.Converter.getErrorMsg(options.failureSubject, jsonResp));
						options.failure(jsonResp);
					}
				} else {
					// call success function if server response {success:true}
					// or without success field
					if (options.success != null) {
						options.success(jsonResp);
					}
					if (options.successSubject) {
						Ext.getCmp('notifybar').showSuccess(options.successSubject);
					}
					if (options.eventType) {
						// TODO for ECFA: create->created
						if (options.method === 'POST') {
							options.eventType.fireEvent('create', jsonResp.target);
						} else if (options.method === 'PUT') {
							options.eventType.fireEvent('update', jsonResp.target);
						} else if (options.method === 'DELETE') {
							options.eventType.fireEvent('destroy', jsonResp.target);
						}
					}
				}
			},
			failure : function() {
				if (options.failure) {
					var internalErrorKey = 'internal';
					Ext.getCmp('notifybar').showError(MyApp.locale.Converter.getErrorMsg(options.failureSubject, {
						error : internalErrorKey
					}));
					options.failure({
						// TODO show connection error msg
						error : internalErrorKey
					});
				}
			},
			// TODO make gird loading mask disabled, if gird is pass to request
			// options
			callback : function(response) {
				if (options.callback != null) {
					if (response && response.responseText) {
						options.callback(Ext.decode(response.responseText));
					} else {
						options.callback(null);
					}
				}
			}
		});
	},

	/*
	 * @private
	 */
	getUrl : function(options) {
		var record = null;
		var isMutipleObjects;
		if (options.url) {
			return options.url;
		}

		if (options.record && Ext.isArray(options.record)) {
			console.error('[Restful.js] options.record is an array, please use options.records instead.');
			return;
		}

		if (options.record && options.record.isModel) {
			record = options.record;
			isMutipleObjects = false;
		} else if (options.records && options.records[0] && options.records[0].isModel) {
			record = options.records[0];
			isMutipleObjects = true;
		}
		if (record) {
			var request = {
				operation : {
					records : [ record ]
				},
				url : record.getProxy().url
			};

			var url = record.getProxy().buildUrl(request);

			if (isMutipleObjects) {
				// rest/projects/p1/users/u1 -> rest/projects/p1/users
				var idIndex = url.indexOf(record.getId());
				if (idIndex !== -1) {
					url = url.substr(0, idIndex);
				}
				// just append id to url instead of send objects in request body
				if (options.method === 'DELETE') {
					Ext.each(options.records, function(r) {
						url = Ext.urlAppend(url, r.idProperty + '=' + r.getId());
					});
				}

			}

			return url;
		} else {
			console.error('[Restful.js] URL is not defined. If you dont specify record(s) in extjs model format, you sould specify a url', options);
		}

	}

});

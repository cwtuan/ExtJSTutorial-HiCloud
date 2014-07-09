
Ext.define("MyApp.Config", {
	singleton : true,
	NO_INTERNET_RETRY_PERIOD : 5000,
	SECURE_COOKIES : false,
	TASK_UPDATING_PERIOD : 10000,
	BALANCE_UPDATING_PERIOD : 20000,
	AJAX_TIMEOUT : 120000,
	USAGE_PERIOD_MONTH_NUM : 6,
	CURRENCY : "USD",
	DATETIME_FORMAT : "Y/m/d H:i:s"
});
Ext.define("MyApp.Const", {
	singleton : true,
	Ftp : {
		PREFIX : "/"
	},
	Invitation : {
		Action : {
			INVITATION_NOT_EXIST : "INVITATION_NOT_EXIST",
			ABLE_TO_ACCEPT : "ABLE_TO_ACCEPT",
			NEED_SIGNOUT : "NEED_SIGNOUT",
			NEED_SIGNIN : "NEED_SIGNIN",
			EXPIRED : "EXPIRED",
			ALREADY_ACCEPTED : "ALREADY_ACCEPTED"
		},
		Status : {
			WAITING : "WAITING",
			EXPIRED : "EXPIRED",
			ACCEPT : "ACCEPT",
			REJECT : "REJECT"
		}
	},
	Job : {
		Priority : {
			LOW : "LOW",
			MEDIUM : "MEDIUM",
			HIGH : "HIGH"
		},
		Output : {
			JPG : "jpg",
			BMP : "bmp",
			PNG : "png",
			TGA : "tga",
			TIFF : "tiff",
			EXR : "exr",
			ANIMATION : "animation"
		}
	},
	ViewType : {
		Mission : {
			RUNNING : "RUNNING",
			HISTORICAL : "HISTORICAL",
			USER : {
				RUNNING : "USER_RUNNING",
				HISTORICAL : "USER_HISTORICAL"
			}
		}
	},
	Mission : {
		Action : {
			RERUN : "RERUN",
			CANCEL : "CANCEL",
			HOLD : "HOLD",
			RESUME : "RESUME",
			RETRY : "RETRY"
		},
		State : {
			HOLDING : "HOLDING",
			PAUSE : "PAUSE",
			CMP : "CMP",
			DON : "DON",
			SKP : "SKP",
			RDY : "RDY",
			ERR : "ERR",
			SYS_HOLDING : "SYS_HOLDING",
			SYS_PAUSE : "SYS_PAUSE"
		},
		RenderMode : {
			STANDARD : "STANDARD",
			EVALUATION : "EVALUATION"
		}
	},
	Project : {
		Role : {
			MEMBER : "MEMBER",
			ADMIN : "ADMIN",
			OWNER : "OWNER"
		}
	},
	File : {
		Status : {
			WAITING : "WAITING",
			UPLOADING : "UPLOADING",
			PAUSED : "PAUSED",
			PAUSING : "PAUSING",
			UPLOAD_FAIL : "UPLOAD_FAIL",
			COMPLETED : "COMPLETE",
			DELETED : "DELETED",
			DOWNLOADING : "DOWNLOADING",
			DOWNLOAD_PAUSE : "DOWNLOAD_PAUSE"
		},
		Type : {
			IS_FOLDER : "IS_FOLDER",
			IS_FILE : "IS_FILE"
		}
	},
	Asset : {
		Status : {
			FOUND : "FOUND",
			MISSING : "MISSING"
		},
		PathType : {
			ABS : "ABS",
			REL : "REL"
		}
	},
	Folder : {
		Name : {
			RESOURCE : "resource",
			ZIP : "zip",
			LOG : "log",
			OUTPUT : "output"
		},
		SEPARATOR : "/"
	},
	User : {
		Role : {
			ADMIN : "ADMIN",
			VIEWER : "VIEWER",
			USER : "USER"
		},
		Status : {
			ACTIVE : "ACTIVE",
			INACTIVE : "INACTIVE",
			DELETE : "DELETE"
		},
		Type : {
			OP : "OP",
			UP : "UP"
		},
		DefaultAdmin : "admin"
	},
	Render : {
		Level : {
			HIGH : "LEVEL_HIGH",
			MID : "LEVEL_MID",
			LOW : "LEVEL_LOW"
		},
		Priority : {
			HIGH : "HIGH",
			MID : "MID",
			LOW : "LOW"
		},
		OS : {
			WIN64 : "WINDOWS64",
			WIN32 : "WINDOWS32",
			LINUX : "LINUX",
			MAC : "MAC",
			NonSpecified : "nonSepcified"
		}
	},
	LicenseType : {
		SOFTWARE : "SOFTWARE",
		ENGINE : "ENGINE"
	},
	Product : {
		State : {
			ON : "ON",
			OFF : "OFF"
		}
	},
	Currency : {
		USD : "USD",
		NTD : "NTD"
	},
	DOLLAR_PREFIX : "$",
	DOLLAR_ROUND : 2,
	ITEM_SPLITTER : "###",
	KV_SPLITTER : "@@@",
	JAVASCRIPT_MAX_NUMBER : 9007199254740992,
	NotificationType : {
		PROBLEM : "PROBLEM",
		SYSTEM : "SYSTEM",
		SERVICE : "SERVICE",
		POOL_EXPIRATION : "POOL_EXPIRATION",
		RENDER_FAIL : "RENDER_FAIL"
	},
	NotificationId : {
		PROBLEM : "P001",
		SYSTEM_ERROR : "E001",
		NAGIOS_ERROR : "N001",
		DB_ERROR : "N002",
		UP_ERROR : "N003",
		POOL_EXPIRATION : "X001",
		POOL_EXPIRATION_2 : "X002",
		POOL_EXPIRATION_3 : "X003",
		RENDER_ERROR : "R001",
		RENDER_ERROR_2 : "R002"
	},
	MonitorStatus : {
		UP : "UP",
		UNREACHABLE : "UNREACHABLE",
		DOWN : "DOWN",
		OK : "OK",
		WARNING : "WARNING",
		CRITICAL : "CRITICAL",
		UNKNOWN : "UNKNOWN"
	}
});
Ext.define("MyApp.Session", {
	singleton : true,
	user : null,
	constructor : function() {
	},
	getSession : function() {
		var a = this;
		Ext.Ajax.request({
			url : "rest/session",
			method : "GET",
			success : function(b) {
				a.user = Ext.decode(b.responseText);
				MyApp.event.Session.fireEvent("read", a.user)
			},
			failure : function() {
			}
		})
	},
	getUser : function() {
		return this.user
	}
});
Ext.define("MyApp.action.Action", {
	extend : Ext.Action,
	hideOnClick : true,
	scale : "small",
	constructor : function(a) {
		var b = this;
		a = a || {};
		a.hidden = a.hidden || b.hidden || false;
		a = Ext.applyIf(a || {}, {
			text : b.text,
			iconCls : b.iconCls,
			icon : b.icon,
			handler : b.handler,
			itemId : b.itemId,
			scope : b.scope,
			menu : b.menu,
			hideOnClick : b.hideOnClick,
			scale : b.scale,
			tooltip : (Ext.isString(a.disabledTooltip)) ? a.disabledTooltip : a.defaultTooltip,
			disabled : (Ext.isString(a.disabledTooltip)),
			switchStatus : b.switchStatus || Ext.emptyFn,
			disableIfNoSelection : b.disableIfNoSelection,
			disableIfNoSelectionOrMoreThanOne : b.disableIfNoSelectionOrMoreThanOne
		});
		b.callParent([ a ])
	},
	disableIfNoSelection : function() {
		var a = this;
		if (a.panel) {
			if (a.panel.getSelectionModel().getSelection().length === 0) {
				a.disable();
				a.setTooltip(Locale.getMsg("common.tooltip.disabled.noRecords"));
				return true
			}
		} else {
			console.error("you should set me.panel properly when using disableIfNoSelection")
		}
		a.setTooltip("");
		a.enable();
		return false
	},
	disableIfNoSelectionOrMoreThanOne : function() {
		var b = this;
		if (b.panel) {
			var a = b.panel.getSelectionModel().getSelection().length;
			if (a != 1) {
				b.disable();
				b.setTooltip(Locale.getMsg("view.common.tooltip.disabled.noRecordsOrMoreThanOne"));
				return true
			}
		} else {
			console.error("you should set me.panel properly when using disableIfNoSelectionOrMoreThanOne")
		}
		b.setTooltip("");
		b.enable();
		return false
	}
});
Ext.define("MyApp.ux.proxy.NestedRest", {
	extend : Ext.data.proxy.Rest,
	alias : "proxy.nestedRest",
	buildUrl : function(b) {
		var a = this;
		b.url = a.getUrl(b).replace(/\{(\d+)\}/g, function(c, d) {
			return a.ids[d]
		});
		return a.callParent(arguments)
	},
	doRequest : function(a, d, b) {
		var c = this;
		if (a.ids) {
			c.ids = a.ids
		}
		if (!c.ids) {
			return false
		}
		return this.callParent(arguments)
	}
});
Ext.define("MyApp.reader.RestTaskGrid", {
	extend : Ext.data.reader.Json,
	alias : "reader.restTaskGrid",
	successProperty : "success",
	root : "target",
	messageProperty : "error"
});
Ext.define("MyApp.model.project.User", {
	extend : Ext.data.Model,
	idProperty : "id",
	fields : [ {
		name : "id",
		type : "string"
	}, {
		name : "role",
		type : "string"
	} ],
	proxy : {
		type : "nestedRest",
		url : "rest/projects/{0}/users/",
		reader : {
			type : "restTaskGrid"
		}
	}
});
Ext.define("MyApp.store.project.User", {
	extend : Ext.data.Store,
	model : "MyApp.model.project.User",
	sorters : [ {
		property : "id",
		direction : "ASC"
	} ]
});
Ext.define("MyApp.model.project.Project", {
	extend : Ext.data.Model,
	idProperty : "id",
	fields : [ {
		name : "id",
		type : "string"
	}, {
		name : "name",
		type : "string"
	} ],
	proxy : {
		type : "rest",
		url : "rest/projects",
		reader : {
			type : "restTaskGrid"
		}
	}
});
Ext.define("MyApp.store.project.Project", {
	extend : Ext.data.Store,
	model : "MyApp.model.project.Project",
	sorters : [ {
		property : "name",
		direction : "ASC"
	} ]
});
Ext.define("MyApp.event.ModelEvent", {
	extend : Ext.util.Observable,
	constructor : function() {
		this.addEvents({
			read : false,
			select : false,
			create : false,
			update : false,
			destroy : false,
			running : false
		});
		this.callParent(arguments)
	}
});
Ext.define("MyApp.event.Project", {
	extend : Ext.util.Observable,
	mixins : [ MyApp.event.ModelEvent ],
	singleton : true,
	constructor : function() {
		this.callParent(arguments)
	}
});
Ext.define("MyApp.event.Session", {
	extend : Ext.util.Observable,
	mixins : [ MyApp.event.ModelEvent ],
	singleton : true,
	constructor : function() {
		this.callParent(arguments)
	}
});
Ext.define("MyApp.event.User", {
	extend : Ext.util.Observable,
	mixins : [ MyApp.event.ModelEvent ],
	singleton : true,
	constructor : function() {
		this.callParent(arguments)
	}
});
Ext.define("MyApp.locale.Converter", {
	singleton : true,
	alternateClassName : [ "MyApp.Converter" ],
	yes_no : function(a) {
		return a ? Locale.getMsg("view.yes") : Locale.getMsg("view.no")
	},
	getErrorMsg : function(d, b) {
		var c = "";
		var a = "err." + ((b && b.error) ? b.error : "");
		c += d;
		c += Locale.getMsg("err.reason");
		if (Locale.hasKey(a)) {
			c += Locale.getMsg(a)
		} else {
			c += Locale.getMsg("err.internal")
		}
		return c
	},
	getSimpleErrorMsg : function(b) {
		var c = "";
		var a = "err." + b;
		if (Locale.hasKey(a)) {
			c += Locale.getMsg(a)
		} else {
			c += Locale.getMsg("err.internal")
		}
		return c
	},
	getProjectRole : function(a) {
		return Locale.getMsg("view.project.user.role." + a.toLowerCase())
	}
});
Ext.define("MyApp.store.project.ProjectRole", {
	extend : Ext.data.Store,
	fields : [ "display", "value", "isDefault" ],
	data : [ {
		display : MyApp.locale.Converter.getProjectRole(MyApp.Const.Project.Role.MEMBER),
		value : MyApp.Const.Project.Role.MEMBER,
		isDefault : true
	}, {
		display : MyApp.locale.Converter.getProjectRole(MyApp.Const.Project.Role.ADMIN),
		value : MyApp.Const.Project.Role.ADMIN
	} ]
});
Ext.define("MyApp.util.Format", {
	singleton : true,
	alternateClassName : [ "MyApp.Format" ],
	usagePercentage : function(a) {
		if (a && !isNaN(a)) {
			a = a > 100 ? 100 : a;
			a = a.toFixed(2) + " %"
		} else {
			a = null
		}
		return a
	},
	highchartsTooltip : function(a) {
		return function() {
			var b = "<b>" + Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) + "</b>";
			var c = this.points;
			if (!Ext.isArray(c)) {
				c = [ this.point ]
			}
			$.each(c, function(e, d) {
				var f = d.y;
				if (a) {
					f = a(d.y, "B", e)
				}
				b += '<br/><span style="color:' + d.series.color + '">' + d.series.name + "</span>: <b>" + f + "</b>"
			});
			return b
		}
	},
	fullFileNameFromPath : function(a) {
		return a.replace(/^.*(\\|\/|\:)/, "")
	},
	fileName : function(a) {
		return a.split(/\.([^\.]+)$/)[0]
	},
	fileExtension : function(a) {
		return a.split(/\.([^\.]+)$/)[1]
	},
	getDate : function(a) {
		return (a == null) || (a == 0) ? "" : Ext.util.Format.date(new Date(a), "Y/m/d H:i:s")
	},
	formatDate : function(b) {
		if (!b) {
			return ""
		}
		b = new Date(b);
		var a = new Date(), e = Ext.Date.clearTime(a, true), c = Ext.Date.clearTime(b, true).getTime();
		if (c === e.getTime()) {
			return Locale.getMsg("view.common.today") + " " + Ext.Date.format(b, "g:i a")
		}
		e = Ext.Date.add(e, "d", -6);
		if (e.getTime() <= c) {
			return Ext.Date.format(b, "D g:i a")
		}
		return Ext.Date.format(b, "Y/m/d g:i a")
	},
	secondsToTime : function(d) {
		var b = Math.floor(d / (60 * 60));
		var e = d % (60 * 60);
		var c = Math.floor(e / 60);
		var a = e % 60;
		var g = Math.ceil(a);
		if (b < 10) {
			b = "0" + b
		}
		if (c < 10) {
			c = "0" + c
		}
		if (g < 10) {
			g = "0" + g
		}
		var f = b + ":" + c + ":" + g;
		return f
	},
	seconds2Time : function(d) {
		var b = Math.floor(d / (60 * 60));
		var e = d % (60 * 60);
		var c = Math.floor(e / 60);
		var a = e % 60;
		var g = Math.ceil(a);
		if (b != 0) {
			b = b + Locale.getMsg("view.common.hour")
		} else {
			b = ""
		}
		if (c != 0) {
			c = c + Locale.getMsg("view.common.min")
		} else {
			c = ""
		}
		if (g != 0) {
			g = g + Locale.getMsg("view.common.sec")
		} else {
			g = ""
		}
		var f = b + c + g;
		return f
	},
	floatRound : function(c, b) {
		var a = Math.pow(10, b);
		return Math.round(c * a) / a
	},
	currency : function(b) {
		var a = MyApp.Config.CURRENCY;
		if (a == MyApp.Const.Currency.USD) {
			return "$" + this.floatRound(b, 2)
		} else {
			if (a == MyApp.Const.Currency.NTD) {
				return "NTD" + this.floatRound(b, 0)
			} else {
				return "$" + this.floatRound(b, 2)
			}
		}
	},
	alterFilePath : function(f, e, d) {
		var g;
		console.log(f.indexOf("/") != -1);
		if (f.indexOf("/") != -1) {
			g = "/"
		} else {
			g = "\\"
		}
		console.log(g);
		var b = f.split(g);
		console.log(b);
		var a = Ext.Array.slice(b, e, d);
		console.log(a);
		var h = "/";
		for ( var c = 0; c < a.length; c++) {
			if (c < a.length - 1) {
				h += a[c] + "/"
			} else {
				if (a[c].indexOf(".") != -1) {
					h += a[c]
				} else {
					h += a[c] + "/"
				}
			}
		}
		console.log(h);
		return h
	},
	alterPath : function(h, e, d) {
		var f;
		console.log(h.indexOf("/") != -1);
		if (h.indexOf("/") != -1) {
			f = "/"
		} else {
			f = "\\"
		}
		console.log(f);
		var b = h.split(f);
		console.log(b);
		var a = Ext.Array.slice(b, e, d);
		console.log(a);
		var g = "/";
		for ( var c = 0; c < a.length; c++) {
			if (c == (a.length - 1) && a[c].indexOf(".") != -1) {
				console.log("SKIP FILENAME");
				console.log(a[c])
			} else {
				g += a[c] + "/"
			}
		}
		console.log(g);
		return g
	},
	retriveFilename : function(b) {
		var c;
		console.log(b.indexOf("/") != -1);
		if (b.indexOf("/") != -1) {
			c = "/"
		} else {
			c = "\\"
		}
		console.log(c);
		var a = b.split(c);
		console.log(a);
		return a[a.length - 1]
	},
	formatDate : function(b) {
		if (!b) {
			return ""
		}
		b = new Date(b);
		var a = new Date(), e = Ext.Date.clearTime(a, true), c = Ext.Date.clearTime(b, true).getTime();
		if (c === e.getTime()) {
			return Locale.getMsg("view.common.today") + " " + Ext.Date.format(b, "g:i a")
		}
		e = Ext.Date.add(e, "d", -6);
		if (e.getTime() <= c) {
			return Ext.Date.format(b, "D g:i a")
		}
		return Ext.Date.format(b, "Y/m/d g:i a")
	}
});
Ext.define("MyApp.util.Restful", {
	singleton : true,
	alternateClassName : [ "MyApp.Restful" ],
	request : function(b) {
		if (!b.method) {
			console.error("[Restful.js] request method is required.", b);
			return
		}
		b.failureSubject = b.failureSubject || Locale.getMsg("err.unknownSubject");
		var c = {};
		b.params = b.params || {};
		var a = this.getUrl(b);
		if (b.method === "PUT" || b.method === "POST") {
			if (b.record) {
				if (b.record.isModel) {
					c = b.record.data
				} else {
					c = b.record
				}
			} else {
				if (b.records) {
					c = [];
					Ext.each(b.records, function(d) {
						if (d.isModel) {
							c.push(d.data)
						} else {
							c.push(d)
						}
					})
				}
			}
		}
		Ext.Ajax.request({
			url : encodeURI(a),
			method : b.method,
			async : true,
			timeout : b.timeout || Ext.Ajax.timeout,
			headers : {
				"Content-Type" : "application/json"
			},
			jsonData : c,
			params : b.params,
			success : function(d) {
				var e = Ext.decode(d.responseText);
				if (e.success === false) {
					if (b.failure) {
						Ext.getCmp("notifybar").showError(MyApp.locale.Converter.getErrorMsg(b.failureSubject, e));
						b.failure(e)
					}
				} else {
					if (b.success != null) {
						b.success(e)
					}
					if (b.successSubject) {
						Ext.getCmp("notifybar").showSuccess(b.successSubject)
					}
					if (b.eventType) {
						if (b.method === "POST") {
							b.eventType.fireEvent("create", e.target)
						} else {
							if (b.method === "PUT") {
								b.eventType.fireEvent("update", e.target)
							} else {
								if (b.method === "DELETE") {
									b.eventType.fireEvent("destroy", e.target)
								}
							}
						}
					}
				}
			},
			failure : function() {
				if (b.failure) {
					var d = "internal";
					Ext.getCmp("notifybar").showError(MyApp.locale.Converter.getErrorMsg(b.failureSubject, {
						error : d
					}));
					b.failure({
						error : d
					})
				}
			},
			callback : function(d) {
				if (b.callback != null) {
					if (d && d.responseText) {
						b.callback(Ext.decode(d.responseText))
					} else {
						b.callback(null)
					}
				}
			}
		})
	},
	getUrl : function(d) {
		var a = null;
		var c;
		if (d.url) {
			return d.url
		}
		if (d.record && Ext.isArray(d.record)) {
			console.error("[Restful.js] options.record is an array, please use options.records instead.");
			return
		}
		if (d.record && d.record.isModel) {
			a = d.record;
			c = false
		} else {
			if (d.records && d.records[0] && d.records[0].isModel) {
				a = d.records[0];
				c = true
			}
		}
		if (a) {
			var e = {
				operation : {
					records : [ a ]
				},
				url : a.getProxy().url
			};
			var b = a.getProxy().buildUrl(e);
			if (c) {
				var f = b.indexOf(a.getId());
				if (f !== -1) {
					b = b.substr(0, f)
				}
				if (d.method === "DELETE") {
					Ext.each(d.records, function(g) {
						b = Ext.urlAppend(b, g.idProperty + "=" + g.getId())
					})
				}
			}
			return b
		} else {
			console.error("[Restful.js] URL is not defined. If you dont specify record(s) in extjs model format, you sould specify a url", d)
		}
	}
});
Ext.define("MyApp.util.Validator", {
	singleton : true,
	alternateClassName : [ "MyApp.Validator" ],
	noSpecialChar : function(a) {
		if (/[^a-zA-Z0-9]/.test(a)) {
			return "Only allow a-z, A-Z, and 0-9"
		}
		return true
	},
	notProject1 : function(a) {
		if (a.get("name") === "project1") {
			return Locale.getMsg("view.project.user.disabledBtnTip.role.owner")
		}
		return true
	}
});
Ext.define("MyApp.ux.IFrame", {
	extend : Ext.Component,
	alias : "widget.ecfaiframe",
	loadMask : "Loading...",
	src : "about:blank",
	renderTpl : [ '<iframe src="{src}" name="{frameName}" width="100%" height="100%" frameborder="0"></iframe>' ],
	initComponent : function() {
		this.callParent();
		this.frameName = this.frameName || this.id + "-frame";
		this.addEvents("beforeload", "load");
		Ext.apply(this.renderSelectors, {
			iframeEl : "iframe"
		})
	},
	initEvents : function() {
		var c = this, b = c.iframeEl.dom, a = c.getFrame();
		c.callParent();
		c.iframeEl.on("load", c.onLoad, c)
	},
	initRenderData : function() {
		return Ext.apply(this.callParent(), {
			src : this.src,
			frameName : this.frameName
		})
	},
	getBody : function() {
		var a = this.getDoc();
		return a.body || a.documentElement
	},
	getDoc : function() {
		try {
			return this.getWin().document
		} catch (a) {
			return null
		}
	},
	getWin : function() {
		var b = this, a = b.frameName, c = Ext.isIE ? b.iframeEl.dom.contentWindow : window.frames[a];
		return c
	},
	getFrame : function() {
		var a = this;
		return a.iframeEl.dom
	},
	beforeDestroy : function() {
		var a = this, c, d;
		if (a.rendered) {
			try {
				c = a.getDoc();
				if (c) {
					Ext.EventManager.removeAll(c);
					for (d in c) {
						if (c.hasOwnProperty && c.hasOwnProperty(d)) {
							delete c[d]
						}
					}
				}
			} catch (b) {
			}
		}
		a.callParent()
	},
	onLoad : function() {
		var b = this, d = b.getDoc(), a = b.onRelayedEvent;
		if (d && b.src != "about:blank") {
			try {
				Ext.EventManager.removeAll(d);
				Ext.EventManager.on(d, {
					mousedown : a,
					mousemove : a,
					mouseup : a,
					click : a,
					dblclick : a,
					scope : b
				})
			} catch (c) {
			}
			Ext.EventManager.on(window, "unload", b.beforeDestroy, b);
			this.el.unmask();
			this.fireEvent("load", this);
			Ext.getCmp("notifybar").showError(Locale.getMsg("err.donwloadFail"))
		} else {
			if (b.src && b.src != "") {
				this.el.unmask();
				this.fireEvent("error", this)
			}
		}
	},
	onRelayedEvent : function(c) {
		var b = this.iframeEl, d = b.getXY(), a = c.getXY();
		c.xy = [ d[0] + a[0], d[1] + a[1] ];
		c.injectEvent(b);
		c.xy = a
	},
	load : function(d) {
		var a = this, c = a.loadMask, b = a.getFrame();
		if (a.fireEvent("beforeload", a, d) !== false) {
			if (c && a.el) {
				a.el.mask(c)
			}
			b.src = a.src = (d || a.src)
		}
	}
});
Ext.define("MyApp.ux.button.LinkButton", {
	extend : Ext.Component,
	alias : "widget.linkButton",
	childEls : [ "btnEl" ],
	renderTpl : [ '<dev title={tooltip}><a href="javascript:;" id="{id}-btnEl" ', ">{text}</a></dev>" ],
	config : {
		text : "",
		tooltip : "",
		handler : function() {
		}
	},
	imgsrc : "",
	enableMouseover : false,
	grid : null,
	win : null,
	missionOid : null,
	frameSeq : null,
	initComponent : function() {
		var a = this;
		a.callParent(arguments);
		this.renderData = {
			text : this.getText(),
			tooltip : this.getTooltip()
		}
	},
	onRender : function(c, a) {
		var d = this, b;
		d.addChildEls("btnEl");
		d.callParent(arguments);
		b = d.btnEl;
		d.mon(b, "click", d.onClick, d);
		if (d.enableMouseover) {
			d.mon(b, "mouseover", d.onMouseover, d);
			d.mon(b, "mouseout", d.onMouseout, d)
		}
	},
	onClick : function(b) {
		var a = this;
		if (a.preventDefault || (a.disabled && a.getHref()) && b) {
			b.preventDefault()
		}
		if (b.button !== 0) {
			return
		}
		if (!a.disabled) {
			a.fireHandler(b)
		}
	},
	onMouseover : function(d) {
		var b = this;
		if (b.enableMouseover) {
			var a;
			if (!Ext.getCmp("infowin")) {
				console.log("no infowin");
				a = Ext.create("Ext.Img", {
					src : b.imgsrc
				});
				var c = Ext.create("Ext.window.Window", {
					id : "infowin",
					header : false,
					border : false,
					closable : false,
					draggable : false,
					height : 200,
					width : 200,
					layout : "fit",
					x : b.getEl().getX() + 25,
					y : b.getEl().getY() - 10,
					items : [ a ]
				});
				c.show()
			}
		}
	},
	onMouseout : function(b) {
		var a = this;
		if (a.enableMouseover && Ext.getCmp("infowin")) {
			Ext.getCmp("infowin").close()
		}
	},
	fireHandler : function(c) {
		var b = this, a = b.handler;
		b.fireEvent("click", b, c);
		if (a) {
			a.call(b.scope || b, b, c)
		}
	}
});
/*
 * ! CTemplate Version 1.1 Copyright(c) 2011-2013 Skirtle's Den License: http://skirtlesden.com/ux/ctemplate
 */
Ext.define("MyApp.ux.template.CTemplate", {
	extend : Ext.XTemplate,
	statics : {
		AUTO_ID : 0
	},
	copyDepth : 10,
	cTpl : '<p id="ctemplate-{0}-{1}"></p>',
	isCTemplate : true,
	constructor : function() {
		var a = this;
		a.callParent(arguments);
		a.id = ++a.statics().AUTO_ID;
		a.reset()
	},
	copyValues : function(a, d) {
		var c = this, f, e = {}, b = d || c.copyDepth;
		if (b === 1) {
			return a
		}
		if (Ext.isArray(a)) {
			return Ext.Array.map(a, function(g) {
				return c.copyValues(g, b - 1)
			})
		}
		if (!Ext.isObject(a)) {
			return a
		}
		if (a.isComponent) {
			f = a.getId();
			c.ids.push(f);
			return Ext.String.format(c.cTpl, f, c.id)
		}
		Ext.Object.each(a, function(g, h) {
			e[g] = g === "$comp" ? h : c.copyValues(h, b - 1)
		});
		return e
	},
	doInsert : function() {
		var a = this.callParent(arguments);
		this.injectComponents();
		return a
	},
	doPolling : function(a) {
		var b = this;
		b.pollInterval = a;
		if (b.pollId) {
			clearTimeout(b.pollId)
		}
		b.pollId = Ext.defer(b.injectComponents, a, b)
	},
	getPlaceholderEl : function(a) {
		return Ext.get("ctemplate-" + a + "-" + this.id)
	},
	injectComponents : function() {
		var d = this, b = d.ids, a = b.length - 1, f, c, e;
		for (; a >= 0; --a) {
			f = b[a];
			c = Ext.getCmp(f);
			e = d.getPlaceholderEl(f);
			if (d.renderComponent(c, e) || !c) {
				Ext.Array.splice(b, a, 1);
				if (e) {
					e.remove()
				}
			}
		}
		if (b.length) {
			d.doPolling(d.pollInterval * 1.5)
		}
	},
	overwrite : function(b) {
		var d, c, a;
		if (Ext.isIE) {
			d = Ext.getDom(b);
			while (c = d.firstChild) {
				d.removeChild(c)
			}
		}
		a = this.callParent(arguments);
		this.injectComponents();
		return a
	},
	renderComponent : function(b, c) {
		if (b && c) {
			var a = c.parent();
			if (b.rendered) {
				b.getEl().replace(c)
			} else {
				b.render(a, c)
			}
			if (Ext.isIE6) {
				a.repaint()
			}
			return true
		}
		return false
	},
	reset : function() {
		var a = this;
		a.ids = [];
		if (a.pollId) {
			clearTimeout(a.pollId);
			a.pollId = null
		}
	}
}, function(b) {
	var a = function() {
		var d = this, c = Ext.Array.slice(arguments);
		c[0] = d.copyValues(c[0]);
		d.doPolling(10);
		return d.callParent(c)
	};
	if (b.prototype.applyOut) {
		b.override({
			applyOut : a
		})
	} else {
		b.override({
			applyTemplate : a
		});
		b.createAlias("apply", "applyTemplate")
	}
});
Ext.define("MyApp.ux.grid.column.ComponentColumn", {
	alias : "widget.componentcolumn",
	extend : Ext.grid.column.Column,
	autoWidthComponents : true,
	componentGC : true,
	hasCustomRenderer : true,
	lastFrameWidth : 12,
	widthUpdateDelay : [ 10, 400 ],
	constructor : function(a) {
		var b = this;
		b.callParent(arguments);
		b.compIds = [];
		b.dataIndex = b.dataIndex || Ext.id(null, "cc-dataIndex-");
		b.tpl = b.createTemplate(b.tpl);
		b.renderer = b.createRenderer(b.renderer);
		b.registerColumnListeners()
	},
	addRefOwner : function(c) {
		var b = this, a = b.refOwnerFn || (b.refOwnerFn = function() {
			return b
		});
		if (b.extVersion < 40200) {
			c.getBubbleTarget = a
		} else {
			c.getRefOwner = a
		}
	},
	applyTemplate : function(b, a) {
		if (Ext.isDefined(a)) {
			b[this.dataIndex] = a
		}
		return this.tpl.apply(b)
	},
	beforeViewRefresh : function() {
		if (Ext.isIE) {
			var e = this.compIds, b = 0, a = e.length, f, d, c;
			for (; b < a; b++) {
				if ((f = Ext.getCmp(e[b])) && (d = f.getEl()) && (d = d.dom) && (c = d.parentNode)) {
					c.removeChild(d)
				}
			}
		}
	},
	calculateFrameWidth : function(a) {
		var b = a.getEl(), c = b && b.parent(), d = c && c.parent();
		if (d) {
			return this.lastFrameWidth = c.getFrameWidth("lr") + d.getFrameWidth("lr")
		}
	},
	createRenderer : function(b) {
		var a = this;
		return function(e, f, c) {
			var d = Ext.apply({}, c.data, c.getAssociatedData());
			if (b) {
				e = b.apply(this, arguments)
			}
			e = a.processValue(e);
			return a.applyTemplate(d, e)
		}
	},
	createTemplate : function(a) {
		return a && a.isTemplate ? a : Ext.create("MyApp.ux.template.CTemplate", a || [ "{", this.dataIndex, "}" ])
	},
	destroyChild : function(a) {
		a.destroy()
	},
	getRefItems : function(b) {
		var c = this.callParent([ b ]), e = this.compIds, d = 0, a = e.length, f;
		for (; d < a; d++) {
			if (f = Ext.getCmp(e[d])) {
				c.push(f);
				if (b && f.getRefItems) {
					c.push.apply(c, f.getRefItems(true))
				}
			}
		}
		return c
	},
	onChildAfterRender : function(a) {
		this.resizeChild(a)
	},
	onChildBoxReady : function(a) {
		this.resizeChild(a, false)
	},
	onChildDestroy : function(a) {
		Ext.Array.remove(this.compIds, a.getId())
	},
	onChildResize : function() {
		this.redoScrollbars()
	},
	onColumnResize : function(a) {
		a.resizeAll()
	},
	onColumnShow : function(a) {
		a.resizeAll()
	},
	onColumnVisibilityChange : function(c) {
		var a = c.getRefItems(), b = 0, d = a.length, e = !c.isHidden();
		Ext.suspendLayouts && Ext.suspendLayouts();
		for (; b < d; ++b) {
			a[b].setVisible(e)
		}
		Ext.resumeLayouts && Ext.resumeLayouts(true)
	},
	onDestroy : function() {
		Ext.destroy(this.getRefItems());
		this.callParent()
	},
	onRender : function() {
		this.registerViewListeners();
		this.callParent(arguments)
	},
	onViewChange : function() {
		var b = this, a = b.tpl;
		b.suspendResizing();
		if (a.isCTemplate) {
			Ext.suspendLayouts();
			a.injectComponents();
			Ext.resumeLayouts(true);
			a.reset()
		}
		b.redoScrollbars();
		b.resumeResizing();
		b.performGC()
	},
	performGC : function() {
		var d = this.compIds, b = d.length - 1, a, c;
		for (; b >= 0; --b) {
			a = Ext.getCmp(d[b]);
			c = a && a.getEl();
			if (!c || (this.componentGC && (!c.dom || Ext.getDom(Ext.id(c)) !== c.dom))) {
				if (a && !a.isDestroyed) {
					a.destroy()
				}
			}
		}
	},
	processValue : function(d) {
		var c = this, b = c.compIds, g, f, e, a;
		if (Ext.isObject(d) && !d.isComponent && d.xtype) {
			d = Ext.widget(d.xtype, d)
		}
		if (d && d.isComponent) {
			g = d.getId();
			if (!Ext.Array.contains(b, g)) {
				b.push(g)
			}
			c.addRefOwner(d);
			c.registerListeners(d);
			if (d.rendered) {
				if (Ext.isIE) {
					e = d.el.dom;
					a = e.parentNode;
					if (a) {
						if (c.extVersion === 40101) {
							Ext.core.DomHelper.insertBefore(e, {
								tag : "p"
							})
						}
						a.removeChild(e)
					}
				}
			} else {
				if (c.autoWidthComponents) {
					f = c.getWidth() - c.lastFrameWidth;
					f = f > 4 ? f : 4;
					d.setWidth(f)
				}
			}
			if ((Ext.isIE6 || Ext.isIE7) && c.isHidden()) {
				d.hide()
			}
		}
		return d
	},
	redoScrollbars : function() {
		var b = this, a = b.up("tablepanel");
		if (a) {
			if (b.resizeQueue) {
				b.redoScrollbarsRequired = true;
				return
			}
			if (b.extVersion < 40100) {
				a.invalidateScroller();
				a.determineScrollbars()
			} else {
				a.doLayout()
			}
		}
	},
	registerColumnListeners : function() {
		var a = this;
		if (a.autoWidthComponents) {
			a.on("resize", a.onColumnResize);
			a.on("show", a.onColumnShow)
		}
		if (Ext.isIE6 || Ext.isIE7) {
			a.on({
				hide : a.onColumnVisibilityChange,
				show : a.onColumnVisibilityChange
			})
		}
	},
	registerListeners : function(a) {
		var b = this;
		a.on("destroy", b.onChildDestroy, b);
		if (b.autoWidthComponents) {
			a.on("afterrender", b.onChildAfterRender, b, {
				single : true
			});
			if (!b.extVersion < 40100) {
				a.on("boxready", b.onChildBoxReady, b, {
					single : true
				})
			}
		}
		a.on("resize", b.onChildResize, b)
	},
	registerViewListeners : function() {
		var b = this, a = b.up("tablepanel").getView();
		b.mon(a, "beforerefresh", b.beforeViewRefresh, b);
		b.mon(a, "refresh", b.onViewChange, b);
		b.mon(a, "itemupdate", b.onViewChange, b);
		b.mon(a, "itemadd", b.onViewChange, b);
		b.mon(a, "itemremove", b.onViewChange, b)
	},
	resizeAll : function() {
		var a = this;
		a.suspendResizing();
		a.resizeQueue = a.getRefItems();
		a.resumeResizing()
	},
	resizeChild : function(d, g) {
		var f = this, c, e, b, a;
		if (f.resizingSuspended) {
			a = f.resizeQueue;
			if (!Ext.Array.contains(a, d)) {
				a.push(d)
			}
			return
		}
		c = f.calculateFrameWidth(d);
		if (Ext.isNumber(c)) {
			e = f.getWidth() - c;
			b = d.getWidth();
			if (f.setChildWidth(d, e, b)) {
				if (g !== false) {
					Ext.each(f.widthUpdateDelay, function(h) {
						Ext.defer(f.resizeChild, h, f, [ d, false ])
					})
				}
			}
		}
	},
	resumeResizing : function() {
		var d = this, c = 0, b = d.resizeQueue, a = b.length;
		if (!--d.resizingSuspended) {
			Ext.suspendLayouts();
			for (; c < a; ++c) {
				d.resizeChild(b[c])
			}
			Ext.resumeLayouts(true);
			d.resizeQueue = null;
			if (d.redoScrollbarsRequired) {
				d.redoScrollbars()
			}
		}
	},
	setChildWidth : function(b, c, a) {
		if (a === c) {
			return false
		}
		b.setWidth(c);
		return true
	},
	suspendResizing : function() {
		var a = this;
		a.resizingSuspended = (a.resizingSuspended || 0) + 1;
		if (!a.resizeQueue) {
			a.resizeQueue = []
		}
	}
}, function(b) {
	var c = b.prototype, a = Ext.getVersion();
	c.extVersion = (a.getMajor() * 100 + a.getMinor()) * 100 + a.getPatch();
	if (Ext.Element.prototype.syncContent && a.toString() === "4.1.0") {
		c.extVersion = 40101
	}
});
Ext.define("MyApp.ux.image.ImageViewer", {
	extend : Ext.container.Container,
	layout : {
		type : "vbox",
		align : "stretch"
	},
	config : {
		isMoving : false,
		imageWidth : null,
		imageHeight : null,
		originalImageWidth : null,
		originalImageHeight : null,
		clickX : null,
		clickY : null,
		lastMarginX : null,
		lastMarginY : null,
		rotation : 0
	},
	initComponent : function() {
		var a = this;
		a.tooltips = a.tooltips || {};
		a.tooltips = Ext.applyIf(a.tooltips, {
			stretchHorizontally : "Stretch horizontally",
			stretchVertically : "Stretch vertically",
			stretchOptimally : "Stretch optimally",
			zoomIn : "Zoom in",
			zoomOut : "Zoom out",
			rotateClockwise : "Rotate clockwise",
			rotateAntiClockwise : "Rotate anticlockwise"
		});
		a.items = [ {
			xtype : "toolbar",
			defaults : {
				tooltipType : "title"
			},
			items : [ {
				xtype : "button",
				tooltip : a.tooltips.zoomIn,
				icon : "css/images/zoom_in.png",
				listeners : {
					click : a.zoomIn,
					scope : a
				}
			}, {
				xtype : "button",
				tooltip : a.tooltips.zoomOut,
				icon : "css/images/zoom_out.png",
				listeners : {
					click : a.zoomOut,
					scope : a
				}
			} ]
		}, {
			xtype : "container",
			itemId : "imagecontainer",
			flex : 1,
			style : {
				overflow : "hidden",
				backgroundColor : "#f2f1f0",
				padding : "10px",
				cursor : "move"
			},
			items : {
				xtype : "image",
				mode : "element",
				src : a.src,
				style : {
					boxShadow : "0 0 5px 5px #888"
				},
				listeners : {
					render : function(b) {
						b.el.dom.onload = function() {
							a.setRotation(0);
							a.rotateImage();
							a.setOriginalImageWidth(b.el.dom.naturalWidth);
							a.setOriginalImageHeight(b.el.dom.naturalHeight);
							a.setImageWidth(b.el.dom.naturalWidth);
							a.setImageHeight(b.el.dom.naturalHeight);
							a.stretchOptimally()
						}
					}
				}
			}
		} ];
		a.callParent()
	},
	initEvents : function() {
		var a = this;
		a.mon(a.getImageContainer().getEl(), {
			mouseup : a.mouseup,
			mousedown : a.mousedown,
			mousemove : a.mousemove,
			scope : a
		});
		a.callParent()
	},
	stretchHorizontally : function() {
		var b = this, a = b.getImageContainer().getWidth();
		b.setImageSize({
			width : a - 20,
			height : b.getOriginalImageHeight() * (a - 20) / b.getOriginalImageWidth()
		});
		b.centerImage()
	},
	stretchVertically : function() {
		var a = this, b = a.getImageContainer().getHeight();
		a.setImageSize({
			width : a.getOriginalImageWidth() * (b - 20) / a.getOriginalImageHeight(),
			height : b - 20
		});
		a.centerImage()
	},
	stretchOptimally : function() {
		var c = this, b = c.getImageContainer(), a = c.getAdjustedImageSize();
		if (a.width * b.getHeight() / a.height > b.getWidth()) {
			c.stretchHorizontally()
		} else {
			c.stretchVertically()
		}
	},
	centerImage : function() {
		var c = this, b = c.getImageContainer(), a = c.getAdjustedImageSize();
		c.setMargins({
			top : (b.getHeight() - a.height - 20) / 2,
			left : (b.getWidth() - a.width - 20) / 2
		})
	},
	mousedown : function(b) {
		var a = this, c = a.getMargins();
		b.stopEvent();
		a.setClickX(b.getPageX());
		a.setClickY(b.getPageY());
		a.setLastMarginY(c.top);
		a.setLastMarginX(c.left);
		a.setIsMoving(true)
	},
	mousemove : function(b) {
		var a = this;
		if (a.getIsMoving()) {
			a.setMargins({
				top : a.getLastMarginY() - a.getClickY() + b.getPageY(),
				left : a.getLastMarginX() - a.getClickX() + b.getPageX()
			})
		}
	},
	mouseup : function() {
		var a = this;
		if (a.getIsMoving()) {
			a.setClickX(null);
			a.setClickY(null);
			a.setLastMarginX(null);
			a.setLastMarginY(null);
			a.setIsMoving(false)
		}
	},
	zoomOut : function(b, e, d) {
		var c = this, f = c.getMargins(), a = c.getAdjustedImageSize();
		c.setMargins({
			top : f.top + a.height * 0.05,
			left : f.left + a.width * 0.05
		});
		c.setImageSize({
			width : a.width * 0.9,
			height : c.getOriginalImageHeight() * a.width * 0.9 / c.getOriginalImageWidth()
		});
		e.stopEvent()
	},
	zoomIn : function(b, e, d) {
		var c = this, f = c.getMargins(), a = c.getAdjustedImageSize();
		c.setMargins({
			top : f.top - a.height * 0.05,
			left : f.left - a.width * 0.05
		});
		c.setImageSize({
			width : a.width * 1.1,
			height : c.getOriginalImageHeight() * a.width * 1.1 / c.getOriginalImageWidth()
		});
		e.stopEvent()
	},
	rotateClockwise : function() {
		var b = this, a = b.getRotation();
		a += 90;
		if (a > 360) {
			a -= 360
		}
		b.setRotation(a);
		b.rotateImage()
	},
	rotateAntiClockwise : function() {
		var b = this, a = b.getRotation();
		a -= 90;
		if (a < 0) {
			a += 360
		}
		b.setRotation(a);
		b.rotateImage()
	},
	rotateImage : function() {
		var c = this, b, a = "rotate(" + c.getRotation() + "deg)";
		b = c.getOriginalImageWidth();
		c.setOriginalImageWidth(c.getOriginalImageHeight());
		c.setOriginalImageHeight(b);
		c.getImage().getEl().applyStyles({
			transform : a,
			"-o-transform" : a,
			"-ms-transform" : a,
			"-moz-transform" : a,
			"-webkit-transform" : a
		});
		c.setMargins(c.getMargins())
	},
	setMargins : function(g) {
		var f = this, d = f.getRotation(), a = f.getAdjustedImageSize(), b = f.getImageContainer(), e = b.getWidth(), h = b.getHeight();
		if (a.width > e - 20) {
			if (g.left > 0) {
				g.left = 0
			} else {
				if (g.left < e - a.width - 20) {
					g.left = e - a.width - 20
				}
			}
		} else {
			if (g.left < 0) {
				g.left = 0
			} else {
				if (g.left > e - a.width - 20) {
					g.left = e - a.width - 20
				}
			}
		}
		if (a.height > h - 20) {
			if (g.top > 0) {
				g.top = 0
			} else {
				if (g.top < h - a.height - 20) {
					g.top = h - a.height - 20
				}
			}
		} else {
			if (g.top < 0) {
				g.top = 0
			} else {
				if (g.top > h - a.height - 20) {
					g.top = h - a.height - 20
				}
			}
		}
		if (d === 90 || d === 270) {
			var c = (f.getImageHeight() - f.getImageWidth()) / 2;
			g.top = g.top - c;
			g.left = g.left + c
		}
		f.getImage().getEl().setStyle("margin-left", g.left + "px");
		f.getImage().getEl().setStyle("margin-top", g.top + "px")
	},
	getMargins : function() {
		var c = this, b = c.getRotation(), e = c.getImage().getEl();
		var d = {
			top : parseInt(e.getStyle("margin-top"), 10),
			left : parseInt(e.getStyle("margin-left"), 10)
		};
		if (b === 90 || b === 270) {
			var a = (c.getImageHeight() - c.getImageWidth()) / 2;
			d.top = d.top + a;
			d.left = d.left - a
		}
		return d
	},
	getAdjustedImageSize : function() {
		var b = this, a = b.getRotation();
		if (a === 90 || a === 270) {
			return {
				width : b.getImageHeight(),
				height : b.getImageWidth()
			}
		} else {
			return {
				width : b.getImageWidth(),
				height : b.getImageHeight()
			}
		}
	},
	setImageSize : function(b) {
		var c = this, a = c.getRotation();
		if (a === 90 || a === 270) {
			c.setImageWidth(b.height);
			c.setImageHeight(b.width)
		} else {
			c.setImageWidth(b.width);
			c.setImageHeight(b.height)
		}
	},
	applyImageWidth : function(a) {
		var b = this;
		b.getImage().setWidth(a);
		return a
	},
	applyImageHeight : function(a) {
		var b = this;
		b.getImage().setHeight(a);
		return a
	},
	getImage : function() {
		return this.query("image")[0]
	},
	getImageContainer : function() {
		return this.query("#imagecontainer")[0]
	}
});
Ext.define("MyApp.ux.image.MultiImageViewer", {
	extend : MyApp.ux.image.ImageViewer,
	alias : "widget.multiImageViewer",
	config : {
		currentImage : 0,
		imageCount : 0,
		sources : null
	},
	initComponent : function() {
		var a = this;
		a.setSources(a.src);
		a.setImageCount(a.src.length);
		a.currentImageTemplate = a.currentImageTemplate || "Viewing image {i} out of {total}";
		a.currentImage = 0;
		a.src = a.src[0];
		a.on("beforerender", a.insertPageUI, a);
		a.callParent()
	},
	insertPageUI : function() {
		var b = this, a = this.down("toolbar");
		a.add([ {
			xtype : "tbfill"
		}, {
			xtype : "button",
			icon : "css/images/resultset_previous.png",
			listeners : {
				click : b.previousImage,
				scope : b
			}
		}, {
			xtype : "tbtext"
		}, {
			xtype : "button",
			icon : "css/images/resultset_next.png",
			listeners : {
				click : b.nextImage,
				scope : b
			}
		} ]);
		b.updateImageText()
	},
	nextImage : function() {
		var b = this, a = this.getCurrentImage();
		a += 1;
		if (a === b.getImageCount()) {
			a = 0
		}
		b.setCurrentImage(a);
		b.updateImageText()
	},
	previousImage : function() {
		var b = this, a = this.getCurrentImage();
		a -= 1;
		if (a < 0) {
			a = b.getImageCount() - 1
		}
		b.setCurrentImage(a);
		b.updateImageText()
	},
	applyCurrentImage : function(a) {
		var b = this;
		b.getImage().el.dom.src = b.getSources()[a];
		return a
	},
	updateImageText : function() {
		var b = this, a = new Ext.XTemplate(b.currentImageTemplate);
		b.down("toolbar").down("tbtext").setText(a.apply({
			i : b.getCurrentImage() + 1,
			total : b.getImageCount()
		}))
	},
	_isCurrentImageInitialized : function() {
		return true
	}
});
Ext.define("MyApp.ux.toolbar.NotifyBar", {
	extend : Ext.toolbar.Toolbar,
	alias : "widget.notifybar",
	cssOn : false,
	successDuration : 8000,
	cls : "notifybar",
	initComponent : function() {
		var a = this;
		a.items = [ {
			itemId : "msg",
			flex : 1,
			xtype : "tbtext",
			cls : "notifybar-text"
		}, {
			text : "X",
			scope : a,
			handler : a.hideBar
		} ];
		a.callParent(arguments);
		a.msgItem = a.child("#msg");
		a.hideTask = new Ext.util.DelayedTask(function() {
			a.hideBar()
		})
	},
	showSuccess : function(b, a) {
		this.type = "success";
		this.showBar(b, a)
	},
	showError : function(b, a) {
		this.type = "error";
		this.showBar(b, a)
	},
	showWarning : function(b, a) {
		this.type = "warning";
		this.showBar(b, a)
	},
	showBar : function(c, b) {
		var a = this;
		a.hideBar();
		if (c == null) {
			c = "undefined"
		}
		a.msgItem.setText(c);
		a.show();
		if (a.type === "error" || a.type === "warning") {
			if (b) {
				a.hideTask.delay(b)
			}
			if (a.changeClsTask == null) {
				a.changeClsTask = Ext.TaskManager.start({
					run : function() {
						if (a.cssOn) {
							a.cssOn = false;
							a.removeCls("notifybar-error notifybar-success notifybar-warning")
						} else {
							a.cssOn = true;
							if (a.type === "error") {
								a.addClass("notifybar-error")
							} else {
								a.addClass("notifybar-warning")
							}
						}
					},
					interval : 1000
				})
			} else {
				Ext.TaskManager.start(a.changeClsTask)
			}
		}
		if (a.type === "success") {
			a.addClass("notifybar-success");
			a.hideTask.delay(b ? b : a.successDuration)
		}
	},
	hideBar : function() {
		var a = this;
		if (a.rendered && !a.isHidden()) {
			Ext.suspendLayouts();
			a.hide();
			a.removeCls("notifybar-error notifybar-success notifybar-warning");
			a.msgItem.update("");
			Ext.resumeLayouts(true);
			if (a.changeClsTask != null) {
				Ext.TaskManager.stop(a.changeClsTask)
			}
			if (a.hideTask != null) {
				a.hideTask.cancel()
			}
		}
	},
	beforeRender : function() {
		this.callParent(arguments);
		this.hide()
	},
	onDestroy : function() {
		if (this.changeClsTask) {
			Ext.TaskManager.stop(this.changeClsTask)
		}
		this.getEl().stopAnimation();
		this.callParent(arguments)
	}
});
Ext.define("MyApp.view.project.ProjectGrid", {
	extend : Ext.grid.Panel,
	alias : "widget.projectGrid",
	title : Locale.getMsg("view.project.projects"),
	icon : "css/images/clapperboard_16x16.png",
	viewConfig : {
		getRowClass : function(a, b) {
			return "cursorPointer"
		}
	},
	initComponent : function() {
		var a = this;
		a.store = Ext.create("MyApp.store.project.Project");
		a.columns = [ {
			header : Locale.getMsg("view.common.title"),
			dataIndex : "name",
			flex : 2
		} ];
		a.callParent(arguments);
		a.store.load();
		a.on({
			viewready : function() {
				if (a.store.getCount() != 0) {
					a.getSelectionModel().select(0)
				}
			}
		});
		a.on({
			select : function(c, b) {
				console.log("fire project select event", b);
				MyApp.event.Project.fireEvent("select", b)
			}
		})
	}
});
Ext.define("MyApp.view.project.action.DeleteUserAction", {
	extend : MyApp.action.Action,
	icon : "css/images/delete_16x16.png",
	text : Locale.getMsg("view.common.delete"),
	panel : null,
	switchStatus : function(c) {
		var b = this;
		if (b.disableIfNoSelection()) {
			return
		}
		var a = MyApp.Validator.notProject1(c);
		if (a !== true) {
			b.disable();
			b.setTooltip(a)
		} else {
			b.enable();
			b.setTooltip("")
		}
	},
	handler : function(a) {
		var b = this;
		Ext.Msg.confirm(Locale.getMsg("view.common.warning"), Locale.getMsg("view.auth.user.delete.confirm"), function(c) {
			if (c == "yes") {
				MyApp.Restful.request({
					method : "DELETE",
					records : b.panel.getSelectionModel().getSelection(),
					eventType : MyApp.event.User,
					successSubject : Locale.getMsg("view.auth.user.delete.success"),
					failureSubject : Locale.getMsg("view.auth.user.delete.failure"),
					success : function(d) {
					},
					failure : function(d) {
					}
				})
			}
		})
	}
});
Ext.define("MyApp.view.project.EditUserWin", {
	extend : Ext.window.Window,
	alias : "widget.editUserWin",
	width : 400,
	modal : true,
	layout : {
		type : "fit"
	},
	panel : null,
	title : Locale.getMsg("view.account.editProperty"),
	initComponent : function() {
		var a = this;
		a.defaultFocus = "email";
		a.items = [ {
			xtype : "form",
			bodyPadding : 10,
			layout : "anchor",
			defaults : {
				anchor : "100%",
				labelWidth : 110
			},
			items : [ {
				xtype : "combo",
				fieldLabel : Locale.getMsg("view.project.user.role"),
				name : "role",
				itemId : "role",
				allowBlank : false,
				queryMode : "local",
				displayField : "display",
				valueField : "value",
				store : Ext.create("MyApp.store.project.ProjectRole")
			}, {
				xtype : "hiddenfield",
				name : "id"
			} ],
			buttons : [ {
				text : Locale.getMsg("view.common.ok"),
				formBind : true,
				type : "submit",
				handler : function() {
					var b = this.up("form").getValues();
					var c = a.getTargetRecord();
					Ext.apply(c.data, b);
					console.log("PUT userRecord", c);
					MyApp.Restful.request({
						record : c,
						method : "PUT",
						eventType : MyApp.event.User,
						successSubject : Locale.getMsg("view.project.user.edit.success", b.id),
						failureSubject : Locale.getMsg("view.project.user.edit.error", b.id),
						success : function(d) {
						},
						failure : function(d) {
						}
					});
					a.close()
				}
			}, {
				text : Locale.getMsg("view.common.cancel"),
				handler : function() {
					a.close()
				}
			} ]
		} ];
		a.on({
			show : function() {
				a.down("form").loadRecord(a.getTargetRecord())
			}
		});
		a.callParent()
	},
	getTargetRecord : function() {
		return this.panel.getSelectionModel().getSelection()[0]
	}
});
Ext.define("MyApp.view.project.action.EditUserAction", {
	extend : MyApp.action.Action,
	icon : "css/images/edit_16x16.png",
	text : Locale.getMsg("view.common.edit"),
	panel : null,
	handler : function() {
		var a = this;
		Ext.widget("editUserWin", {
			panel : a.panel
		}).show()
	},
	switchStatus : function(c) {
		var b = this;
		if (b.disableIfNoSelectionOrMoreThanOne()) {
			return
		}
		var a = MyApp.Validator.notProject1(c);
		if (a !== true) {
			b.disable();
			b.setTooltip(a)
		} else {
			b.enable();
			b.setTooltip("")
		}
	}
});
Ext.define("MyApp.view.project.AddUserWin", {
	extend : Ext.window.Window,
	alias : "widget.addUserWin",
	panel : null,
	width : 400,
	modal : true,
	layout : {
		type : "fit"
	},
	title : Locale.getMsg("view.project.user.invite"),
	initComponent : function() {
		var a = this;
		a.defaultFocus = "id";
		a.items = [ {
			xtype : "form",
			bodyPadding : 10,
			layout : "anchor",
			defaults : {
				anchor : "100%",
				labelWidth : 110
			},
			items : [ {
				xtype : "textfield",
				fieldLabel : Locale.getMsg("view.common.name"),
				name : "id",
				itemId : "id",
				maxLength : 50,
				allowBlank : false,
				validator : MyApp.Validator.noSpecialChar
			}, {
				xtype : "combo",
				fieldLabel : Locale.getMsg("view.project.user.role"),
				tooltip : Locale.getMsg("view.project.user.role.tooltip"),
				name : "role",
				itemId : "role",
				allowBlank : false,
				queryMode : "local",
				displayField : "display",
				valueField : "value",
				store : Ext.create("MyApp.store.project.ProjectRole")
			} ],
			buttons : [ {
				text : Locale.getMsg("view.common.ok"),
				formBind : true,
				type : "submit",
				handler : function() {
					var e = a.panel.project;
					var b = this.up("form").getValues();
					var c = a.panel.store.model.modelName;
					var d = a.panel.store.getBaseUrl();
					MyApp.Restful.request({
						url : d,
						record : b,
						method : "POST",
						eventType : MyApp.event.User,
						failureSubject : Locale.getMsg("view.project.user.add.failure", b.id, e.get("name")),
						successSubject : Locale.getMsg("view.project.user.add.success", b.id, e.get("name")),
						success : function(f) {
							console.log("jsonResp", f)
						},
						failure : function(f) {
						},
						callback : function() {
						}
					});
					a.close()
				}
			}, {
				text : Locale.getMsg("view.common.cancel"),
				handler : function() {
					a.close()
				}
			} ]
		} ];
		a.callParent();
		a.on({
			show : function() {
				var c = a.down("#role");
				var b = c.getStore().findRecord("isDefault", true).get(c.valueField);
				c.setValue(b)
			}
		})
	}
});
Ext.define("MyApp.view.project.action.AddUserAction", {
	extend : MyApp.action.Action,
	icon : "css/images/add_16x16.png",
	text : Locale.getMsg("view.common.add"),
	project : null,
	panel : null,
	handler : function() {
		var a = this;
		Ext.widget("addUserWin", {
			panel : a.panel
		}).show()
	},
	switchStatus : function(c) {
		var b = this;
		var a = MyApp.Validator.notProject1(c);
		if (a !== true) {
			b.disable();
			b.setTooltip(a)
		} else {
			b.enable();
			b.setTooltip("")
		}
	}
});
Ext.define("MyApp.view.project.UserGrid", {
	extend : Ext.grid.Panel,
	alias : "widget.userGrid",
	project : null,
	title : Locale.getMsg("view.project.user.members"),
	icon : "css/images/user_16x16.png",
	selType : "checkboxmodel",
	selModel : {
		mode : "MULTI"
	},
	initComponent : function() {
		var a = this;
		a.store = Ext.create("MyApp.store.project.User");
		a.columns = [ {
			header : Locale.getMsg("view.auth.user.id"),
			dataIndex : "id",
			flex : 1
		}, {
			header : Locale.getMsg("view.project.user.role"),
			dataIndex : "role",
			flex : 2,
			renderer : MyApp.locale.Converter.getProjectRole
		} ];
		a.tbar = [ Ext.create("MyApp.view.project.action.AddUserAction", {
			itemId : "addProjectUserAction",
			panel : a
		}), Ext.create("MyApp.view.project.action.DeleteUserAction", {
			itemId : "deleteProjectUserAction",
			panel : a
		}), Ext.create("MyApp.view.project.action.EditUserAction", {
			itemId : "editProjectUserAction",
			panel : a
		}), {
			itemId : "refreshBtn",
			icon : "css/images/refresh.png",
			text : Locale.getMsg("view.common.refresh"),
			handler : function() {
				a.store.reload()
			}
		} ];
		a.on({
			selectionchange : function(b, c, d) {
				a.switchBtnStatus()
			}
		});
		a.callParent(arguments);
		MyApp.event.User.on({
			destroy : function(b) {
				console.log("destroy User", b);
				Ext.Array.each(b, function(c) {
					a.store.remove(a.store.getById(c))
				})
			},
			create : function(b) {
				a.store.add(b)
			},
			update : function(b) {
				console.log("update", b);
				a.store.remove(a.store.getById(b.id));
				a.store.add(b)
			}
		});
		MyApp.event.Project.on({
			select : function(b) {
				console.log("on project select event", b);
				a.load(b)
			}
		})
	},
	load : function(b) {
		var a = this;
		a.setTitle(Locale.getMsg("view.project.user.members") + " (" + b.get("name") + ")");
		a.store.load({
			ids : [ b.getId() ]
		});
		a.project = b;
		a.switchBtnStatus()
	},
	switchBtnStatus : function() {
		var a = this;
		a.down("#addProjectUserAction").switchStatus(a.project);
		a.down("#deleteProjectUserAction").switchStatus(a.project);
		a.down("#editProjectUserAction").switchStatus(a.project)
	}
});
Ext.define("MyApp.view.project.ProjectView", {
	extend : Ext.panel.Panel,
	alias : "widget.projectView",
	border : false,
	layout : "border",
	initComponent : function() {
		var a = this;
		a.items = [ {
			xtype : "projectGrid",
			region : "west",
			flex : 0.5,
			split : true,
			collapsible : true,
			animCollapse : true
		}, {
			xtype : "userGrid",
			region : "center",
			flex : 0.5
		} ];
		a.callParent(arguments)
	}
});
Ext.define("MyApp.view.about.OpenSourceLicenseWin", {
	extend : Ext.window.Window,
	alias : "widget.openSourceLicenseWin",
	modal : true,
	title : Locale.getMsg("view.about.openSourceLicense"),
	initComponent : function() {
		var a = this;
		a.items = [ {
			xtype : "form",
			items : [ {
				xtype : "textareafield",
				width : 650,
				height : 401
			} ]
		} ];
		a.buttons = [ {
			text : Locale.getMsg("view.common.close"),
			handler : function() {
				a.close()
			}
		} ];
		a.callParent();
		a.on({
			show : function(c, b) {
				Ext.Ajax.request({
					url : "resources/license.txt",
					method : "GET",
					success : function(d) {
						a.down("textareafield").setRawValue(d.responseText)
					}
				})
			}
		})
	}
});
Ext.define("MyApp.view.Entry", {
	extend : Ext.container.Container,
	layout : "border",
	defaults : {
		border : false,
		xtype : "container"
	},
	initComponent : function() {
		var c = this;
		var b = [];
		b.push({
			itemId : "project",
			pressed : true,
			icon : "css/images/clapperboard_16x16.png",
			scale : "medium",
			height : 30,
			toggleGroup : "mainbar",
			allowDepress : false,
			text : Locale.getMsg("view.project.projects"),
			handler : function() {
				c.switchActivePage("projectView", false, this)
			}
		});
		b.push(" ", {
			xtype : "notifybar",
			id : "notifybar",
			maxWidth : 600
		}, "->", {
			height : 30,
			text : Locale.getMsg("view.about"),
			menu : {
				showSeparator : false,
				items : [ {
					plain : true,
					text : Locale.getMsg("view.about.openSourceLicense"),
					handler : function() {
						Ext.widget("openSourceLicenseWin").show()
					}
				} ]
			}
		});
		var a = [];
		a.push({
			itemId : "projectView",
			xtype : "projectView"
		});
		c.items = [ {
			itemId : "mainCards",
			xtype : "panel",
			region : "center",
			layout : "card",
			tbar : Ext.widget("toolbar", {
				itemId : "mainToolbar",
				items : b
			}),
			items : a
		} ];
		c.callParent(arguments);
		c.on({
			afterrender : function() {
				if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || Ext.isIE9) {
					Ext.getCmp("notifybar").showError(Locale.getMsg("view.oldBrowserWarning"))
				}
			}
		});
		console.info("viewport is created")
	},
	switchActivePage : function(a, c) {
		var b = this;
		if (c) {
			location.href = a
		} else {
			b.down("#mainCards").getLayout().setActiveItem(a)
		}
	}
});

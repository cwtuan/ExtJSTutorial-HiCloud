<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>


<title>Sign in HiRender</title>

<!-- Modify some CSS classes -->
<style>
.form-error-state {
	background: none no-repeat scroll 0 0 transparent;
	cursor: default;
	font-size: 14px;
	height: 26px;
	line-height: 18px;
	padding-left: 30px;
}

.form-error-state-invalid {
	padding-left: 10px;
	background-image: url("css/images/exclamation_16x16.png");
	color: #FF3300;
}
</style>



<%@include file="/WEB-INF/jsp/loadjs.jspf"%>

<script type="text/javascript">
	Ext.onReady(function() {
		// 				console.log('isOP=', MyApp.Auth.isOP());
		// 		if (MyApp.Auth.isOP() === false) {
		var resendLink = '<a href="./resendActivateLink">' + Locale.getMsg('view.auth.resendLink') + '</a>';
		var recoverAccount = '<a href="./recoverAccount">' + Locale.getMsg('view.auth.recoverAccount.forgetPassword') + '</a>';
		var recoverId = '<a href="./recoverId">' + Locale.getMsg('view.auth.recoverId.forgetUserId') + '</a>';
		// 		}

		var submitOptions = {
			url : 'j_spring_security_check',
			success : function(form, action) {
				Ext.util.Cookies.clear('pauseAlert');
				Ext.util.Cookies.set('pauseAlert', false);
				var pauseAlert = Ext.util.Cookies.get('pauseAlert');
				console.log('siginging pauseAlert');
				console.log(pauseAlert);

				window.location = '${map.redirectPage}';
			},
			failure : function(form, action) {
				if (form.isDirty()) {
					win.down('#formErrorState').setError(action.result.errorMessage);
					win.down('#submit').setDisabled(false);
				}
			}
		};

		var win = Ext.create('widget.window', {
			closable : false,
			draggable : false,
			resizable : false,
			shadow : false,
			defaultFocus : 'username',
			width : 400,
			items : [ {
				xtype : 'form',
				shadow : false,
				itemId : 'form',
				renderTo : Ext.getBody(),
				preventHeader : true,
				//bodyPadding : '20 20 10 20',
				fieldDefaults : {
					msgTarget : 'under',
					labelWidth : 55
				},
				defaultType : 'textfield',
				defaults : {
					anchor : '100%'
				},
				listeners : {
					afterRender : function(thisForm, options) {
						this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
							enter : function() {
								var form = this.getForm();
								if (form.isValid()) {
									form.submit(submitOptions);
									this.down('#submit').setText(Locale.getMsg('view.session.signingin'));
									this.down('#submit').setDisabled(true);
									win.down('#formErrorState').clearError();
								}
							},
							scope : this
						});
					}
				},
				items : [ {
					width : 213,
					height : 210,
					xtype : 'image',
					// 											padding : '10 10 10 10',
					src : 'css/images/logo.png'
				}, {
					xtype : 'image',
					padding : '0 10 5 10',
					src : 'css/images/signin-page-hr-line.gif'
				}, {
					// 											hidden : !MyApp.Auth.isOP(),
					xtype : 'component',
					padding : '0 10 5 20',
					html : '<div style="font-size:large;font-weight:bold;">' + Locale.getMsg('view.welcomeUP') + '</div>',
				}, {
					xtype : 'textfield',
					itemId : 'username',
					fieldLabel : Locale.getMsg('view.auth.account'),
					name : 'j_username',
					padding : '5 20 5 20'
				}, {
					xtype : 'textfield',
					itemId : 'password',
					fieldLabel : Locale.getMsg('view.auth.password'),
					name : 'j_password',
					inputType : 'password',
					padding : '0 20 5 20'
				} ],
				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'bottom',
					ui : 'footer',
					padding : '0 15 10 20',
					items : [ recoverId, recoverAccount
					// 									          , resendLink
					, '->', {
						xtype : 'button',
						// 			xtype:'component',
						// 			html:'<button type="button" class="btn btn-primary btn-xs">'+Locale.getMsg('view.session.signin')+'</button>',
						//										componentCls : 'btn btn-primary',
						//										cls: 'btn btn-primary',
						text : Locale.getMsg('view.session.signin'),
						formBind : true,
						itemId : 'submit',
						type : 'submit',
						width : 70,
						handler : function() {
							this.up('form').getForm().submit(submitOptions);
							this.setText(Locale.getMsg('view.session.signingin'));
							this.setDisabled(true);
							win.down('#formErrorState').clearError();
						}
					} ]
				} ]
			},
			// 							{
			// 								hidden : MyApp.Auth.isOP(),
			// 								xtype : 'component',
			// 								padding : '0 10 10 20',
			// 								html : Locale.getMsg('view.auth.account.dontHave') + ' <a href="./registerAccount">'
			// 										+ Locale.getMsg('view.auth.account.create') + '</a>.'
			// 							},
			{
				xtype : 'component',
				itemId : 'formErrorState',
				baseCls : 'form-error-state',
				padding : '0 10 10 20',
				hidden : true,
				setError : function(error) {
					var me = this, baseCls = me.baseCls;
					me.setVisible(true);
					me.addCls(baseCls + '-invalid');
					error = error.replace(/\s+/g, '');
					me.update(Locale.getMsg('view.session.signin.failure.' + error));
					win.down('#submit').setText(Locale.getMsg('view.session.signin'));
				},
				clearError : function() {
					var me = this, baseCls = me.baseCls;
					me.removeCls(baseCls + '-invalid');
					me.update('');
					me.setVisible(false);
				},
				listeners : {
					afterrender : function(eOpts) {
						var me = this;
						var search = Ext.Object.fromQueryString(window.location.search);
						if (search.error) {
							me.setError(search.error);
						}
					}
				}
			} ]
		});
		win.show();

	});
</script>

<%@include file="/WEB-INF/jsp/footer.jspf"%>

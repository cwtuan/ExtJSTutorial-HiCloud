<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Reset your password</title>



<!-- Modify some CSS classes -->
<style>
.message {
	background: none no-repeat scroll 0 0 transparent;
	cursor: default;
	font-size: 14px;
	height: 52px;
	line-height: 18px;
	padding-left: 30px;
	color: #000;
}

.message-error {
	padding-left: 10px;
	background-image: url("css/images/exclamation_16x16.png");
	color: #000;
}
</style>



<%@include file="/WEB-INF/jsp/loadjs.jspf"%>

<script type="text/javascript">
	Ext.onReady(function() {

		Ext.require([ 'MyApp.util.Validator' ]);

		var invalidLink = '${model.id}' == '';
		console.log('id', '${model.id}', invalidLink);
		var explainHtml;
		if (invalidLink) {
			explainHtml = '<div style="font-size:x-large;font-weight:bold;">'
					+ Locale.getMsg('view.auth.recoverAccount.resetPassword.invalidLink') + '</div><div style="color:#FF0000;">'
					+ Locale.getMsg('view.auth.recoverAccount.resetPassword.invalidLink.explain', '5') + '</div>';

			setTimeout("window.location = './recoverAccount';", 5000);
		} else {
			explainHtml = '<div style="font-size:x-large;font-weight:bold;">'
					+ Locale.getMsg('view.auth.recoverAccount.resetPassword') + '</div><div>'
					+ Locale.getMsg('view.auth.recoverAccount.resetPassword.explain') + '</div>';
		}

		var submitOptions = {
			url : 'resetPassword',
			success : function(form, action) {
				win.down('#message').setMessage(true, Locale.getMsg('view.auth.recoverAccount.resetPassword.success', '5'));
				setTimeout("window.location = './';", 3000);
			},
			failure : function(form, action) {
				win.down('#submit').setDisabled(false);
				win.down('#message').setMessage(false, Locale.getMsg('view.auth.recoverAccount.resetPassword.fail'));
			}
		};

		var win = Ext.create('widget.window', {
			closable : false,
			draggable : false,
			resizable : false,
			shadow : false,
			defaultFocus : 'username',
			width : 370,
			items : [ {
				xtype : 'form',
				shadow : false,
				itemId : 'form',
				renderTo : Ext.getBody(),
				preventHeader : true,
				fieldDefaults : {
					msgTarget : 'under',
					labelWidth : 100
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
									this.down('#submit').setDisabled(true);
									win.down('#message').clearMessage();
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
					xtype : 'component',
					html : explainHtml,
					padding : '5 20 5 20'
				}, {
					hidden : invalidLink,
					itemId : 'username',
					fieldLabel : Locale.getMsg('view.auth.user.id'),
					name : 'username',
					allowBlank : false,
					padding : '0 20 5 20',
					readOnly : true,
					value : '${model.id}'
				}, {
					hidden : invalidLink,
					itemId : 'password',
					fieldLabel : Locale.getMsg('view.auth.password.new'),
					name : 'password',
					inputType : 'password',
					allowBlank : false,
					padding : '0 20 5 20',
					validator : function(value) {
						if (value != '' && value.length < 6) {
							return Locale.getMsg('view.auth.password.min.error');
						}
						return true;
					}
				}, {
					itemId : 'email',
					name : 'email',
					hidden : true,
					value : '${model.email}'
				}, {
					itemId : 'authCode',
					name : 'authCode',
					hidden : true,
					value : '${model.authCode}'
				}, {
					hidden : invalidLink,
					itemId : 'repeatPassword',
					fieldLabel : Locale.getMsg('view.auth.recoverAccount.resetPassword.button'),
					name : 'password_repeat',
					inputType : 'password',
					allowBlank : false,
					padding : '0 20 0 20',
					validator : function(value) {
						if (value != '') {
							var params = this.up('form').getValues();
							if (!MyApp.Validator.minPasswordLength(value)) {
								Locale.getMsg('view.auth.password.min.error');
							} else if (params.password_repeat != params.password) {
								return Locale.getMsg('view.auth.user.password.repeat.error');
							}
						}
						return true;
					}
				}

				],
				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'bottom',
					ui : 'footer',
					padding : '0 15 10 0',
					items : [ '->', {
						hidden : invalidLink,
						xtype : 'button',
						text : Locale.getMsg('view.auth.recoverAccount.resetPassword.button'),
						formBind : true,
						itemId : 'submit',
						type : 'submit',
						handler : function() {
							this.up('form').getForm().submit(submitOptions);
							this.setDisabled(true);
							win.down('#message').clearMessage();
						}
					} ]
				} ]
			}, {
				xtype : 'component',
				itemId : 'message',
				baseCls : 'message',
				padding : '0 10 10 20',
				hidden : true,
				setMessage : function(success, msg) {
					var me = this, baseCls = me.baseCls;
					if (!success) {
						me.addCls(baseCls + '-error');
					}
					me.update(msg);
					me.setVisible(true);
				},
				clearMessage : function() {
					var me = this, baseCls = me.baseCls;
					me.removeCls(baseCls + '-error');
					me.update('');
					me.setVisible(false);
				}
			} ]
		});
		win.show();

	});
</script>

<%@include file="/WEB-INF/jsp/footer.jspf"%>

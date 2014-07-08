<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Re-send Activate Link</title>

<!-- Modify some CSS classes -->
<style>
.message {
	background: none no-repeat scroll 0 0 transparent;
	font-size: 14px;
	color: #000;
}

.message-error {
	padding-left: 10px;
	background-image: url("css/images/exclamation_16x16.png");
	color: #F30;
}
</style>



<%@include file="/WEB-INF/jsp/loadjs.jspf"%>

<script type="text/javascript">
	Ext.onReady(function() {

		var submitOptions = {
			url : 'resendActivateLink',
			success : function(form, action) {
				console.log('action.result', action.result);
				win.down('#message').setVisible(true);
				win.down('#submit').setDisabled(false);
				win.down('#message').setMessage(true,
						Locale.getMsg('view.auth.user.resendLink.success.msg', action.result.target, '3'));
				setTimeout("window.location = './';", 3000);
			},
			failure : function(form, action) {
				console.log('failure', MyApp.locale.Converter.getErrorMsg('', action.result));
				if (form.isDirty()) {
					//win.down('#message').setMessage(false, action.result.msg);
					win.down('#submit').setDisabled(false);
				}
				win.down('#message').setVisible(true);
				win.down('#message').setMessage(false, MyApp.locale.Converter.getErrorMsg('', action.result));
			}
		};

		var win = Ext.create('widget.window', {
			closable : false,
			draggable : false,
			resizable : false,
			shadow : false,
			defaultFocus : 'userId',
			width : 370,
			items : [
					{
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
						items : [
								{
									width : 213,
									height : 210,
									xtype : 'image',
									// 											padding : '10 10 10 10',
									src : 'css/images/logo.png'
								},
								{
									xtype : 'image',
									padding : '0 10 5 0',
									src : 'css/images/signin-page-hr-line.gif'
								},
								{
									xtype : 'component',
									html : '<div style="font-size:x-large;font-weight:bold;">'
											+ Locale.getMsg('view.auth.user.resendLink') + '</div><div>'
											+ Locale.getMsg('view.auth.user.resendLink.msg') + '</div>',
									padding : '5 20 5 20'
								}, {
									itemId : 'userId',
									fieldLabel : Locale.getMsg('view.auth.user.id'),
									name : 'userId',
									allowBlank : false,
									padding : '5 20 5 20'
								}, {
									itemId : 'password',
									fieldLabel : Locale.getMsg('view.auth.password'),
									name : 'password',
									inputType : 'password',
									allowBlank : false,
									padding : '0 20 5 20',
									//value:'111111',
									validator : function(value) {
										if (value != '' && value.length < 6) {
											return Locale.getMsg('view.auth.password.min.error');
										}
										return true;
									}
								} /*, {
																								itemId : 'repeatPassword',
																								fieldLabel : Locale.getMsg('view.auth.password.repeat'),
																								name : 'password_repeat',
																								inputType : 'password',
																								allowBlank : false,
																								padding : '0 20 0 20',
																								//value:'111111',
																								validator : function(value) {
																									if (value != '') {
																										var params = this.up('form').getValues();
																										if (value.length < 6) {
																											return Locale.getMsg('view.auth.password.min.error');
																										} else if (params.password_repeat != params.password) {
																											return Locale.getMsg('view.auth.user.password.repeat.error');
																										}
																									}
																									return true;
																								}
																							}*/],
						dockedItems : [ {
							xtype : 'toolbar',
							dock : 'bottom',
							ui : 'footer',
							padding : '0 15 10 0',
							items : [ '->', {
								xtype : 'button',
								text : Locale.getMsg('view.auth.user.resendLink'),
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
						height : 95,
						setMessage : function(success, msg) {
							var me = this, baseCls = me.baseCls;
							if (!success) {
								me.addCls(baseCls + '-error');
							}
							me.update(msg);
						},
						clearMessage : function() {
							var me = this, baseCls = me.baseCls;
							me.removeCls(baseCls + '-error');
							me.update('');
						},
						listeners : {
							afterrender : function(eOpts) {
								var me = this;
								var search = Ext.Object.fromQueryString(window.location.search);
								if (search.error) {
									me.setMessage(search.error);
								}
							}
						}
					} ]
		});
		win.show();

	});
</script>

<%@include file="/WEB-INF/jsp/footer.jspf"%>

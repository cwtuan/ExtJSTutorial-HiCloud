<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Register Account</title>

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
		var check_space = /^([ ]?[\w-]*[ ]+[\w-]*)+$/;
		var check_id = /^[a-z0-9_-]{1,50}$/;
		var check_first = /^[a-z]{1}$/;

		var submitOptions = {
			url : 'rest/auth/user',
			method : 'POST',
			success : function(form, action) {
				console.log("register success");
				win.down('#formErrorState').clearError();
				win.down('#message').setVisible(true);

				win.down('#submit_account').setDisabled(true);
				var emailProvider = (win.down('#email').getValue().split('@'))[1];
				//	console.log('emailProvider', emailProvider, emailProvider === 'gmail.com');
				if (emailProvider === 'gmail.com') {
					win.down('#message').setMessage(
							true,
							Locale.getMsg('view.auth.register.mailSent.gmail')
									+ Locale.getMsg('view.auth.register.mailSent', win.down('#email').getValue()));
					//			setTimeout("window.location = 'http://www.gmail.com';", 3000);
				} else {
					win.down('#message').setMessage(true,
							Locale.getMsg('view.auth.recoverAccount.mailSent', win.down('#email').getValue(), '3'));
					setTimeout("window.location = './';", 3000);
				}

			},
			failure : function(form, action) {
				console.log("register failed", action.result)
				win.down('#formErrorState').setVisible(true);
				win.down('#formErrorState').setError(
						MyApp.locale.Converter.getErrorMsg(Locale.getMsg('view.auth.user.create.failure'), action.result));//action.result.mesg);//Locale.getMsg('view.auth.account.create.failure'));
				win.down('#submit_account').setDisabled(false);
			}
		};

		var win = Ext.create('widget.window', {
			// 					baseCls : 'dark-window',
			closable : false,
			draggable : false,
			resizable : false,
			shadow : false,
			defaultFocus : 'username',
			width : 370,
			items : [
					{
						xtype : 'form',
						shadow : false,
						// 						baseCls : 'dark-panel',
						itemId : 'form',
						renderTo : Ext.getBody(),
						preventHeader : true,
						bodyPadding : '0 10 10 10',
						fieldDefaults : {
							msgTarget : 'under',
							labelWidth : 120
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
											this.down('#submit_account').setText(Locale.getMsg('view.auth.account.create'));
											this.down('#submit_account').setDisabled(true);
											win.down('#formErrorState').clearError();
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
									padding : '0 10 10 0',
									src : 'css/images/signin-page-hr-line.gif'
								},
								{
									xtype : 'component',
									html : '<div style="font-size:x-large;font-weight:bold;">'
											+ Locale.getMsg('view.auth.account.create') + '</div>',
									padding : '0 20 5 20'
								}, {
									itemId : 'id',
									fieldLabel : Locale.getMsg('view.auth.user.id'),
									name : 'id',
									allowBlank : false,
									padding : '0 20 5 20',
									value : '${model.id}',
									maskRe : /^[A-Za-z0-9-_]*$/, // Restrict input characters
									validator : function(value) {
										if (value === '') {
											return true;
										} else if (!check_first.test(value.charAt(0))) {
											return Locale.getMsg('view.auth.id.invalid_firstChar');
										} else if (check_space.test(value)) {
											return Locale.getMsg('view.auth.id.invalid_space');
										} else if (!check_id.test(value) || value != value.toLowerCase()) {
											return Locale.getMsg('view.auth.id.invalid_char');
										} else if (Ext.getStore('auth.User').findExact('id', value) !== -1) {
											return Locale.getMsg('view.auth.user.create.failure.duplicated');
										}
										return true;
										/*if (value === '') {
											return true;
										} else if (!check_first.test(value.charAt(0))) {
											return Locale.getMsg('view.auth.id.invalid_firstChar');
										} else if (check_space.test(value)) {
											return Locale.getMsg('view.auth.id.invalid_space');
										} else if (!check_id.test(value)) {
											return Locale.getMsg('view.auth.id.invalid_char');
										}
										return true;*/
									}
								}, {
									itemId : 'email',
									fieldLabel : Locale.getMsg('view.common.email'),
									name : 'email',
									vtype : 'email',
									maxLength : 50,
									allowBlank : false,
									value : '${model.email}',
									padding : '0 20 0 20'
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
								}, {
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
								}, {
									itemId : 'phoneNumber',
									fieldLabel : Locale.getMsg('view.common.phoneNumber'),
									name : 'phoneNumber',
									maxLength : 50,
									padding : '0 20 0 20'
								}, {
									xtype : 'component',
									itemId : 'formErrorState',
									baseCls : 'form-error-state',
									padding : '0 10 0 20',
									layout : 'fit',
									setError : function(error) {
										var me = this, baseCls = me.baseCls;
										me.addCls(baseCls + '-invalid');
										//error = error.replace(/\s+/g, '');
										console.log(error);
										me.update(error);
										win.down('#submit_account').setText(Locale.getMsg('view.auth.account.create'));
									},
									clearError : function() {
										var me = this, baseCls = me.baseCls;
										//console.log("clear error");
										me.removeCls(baseCls + '-invalid');
										me.update('');
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
								} ],
						dockedItems : [ {
							xtype : 'toolbar',
							dock : 'bottom',
							ui : 'footer',
							padding : '0 15 10 0',
							items : [ '->', {
								xtype : 'button',
								text : Locale.getMsg('view.account.create'),
								formBind : true,
								itemId : 'submit_account',
								type : 'submit',
								handler : function() {
									var params = this.up('form').getValues();
									/*console.log("params:",params);
									var confirm_win = Ext.create('widget.window', {
									        title : Locale.getMsg('view.auth.account.create'),
											//closable : false,
											draggable : false,
											resizable : false,
											shadow : false,
									// 												height : 155,
									// 												width : 450,
									
										 items : [ {
											id : 'welcomeMesg',
											name : 'welcomeMesg',
											xtype : 'component',
											margins : '0 10 0 20',
											layout: 'fit',
											html:Ext.String.format(Locale.getMsg('view.auth.account.create.welcomeMesg'), win.down('#id').getValue(),  win.down('#email').getValue()),
											style : 'font-size: 18px;',
										 }],									    
									        
										 buttons : [ {
											text : Locale.getMsg('view.common.ok'),
											type : 'submit',
											handler : function() {
												win.down('form').getForm().submit(submitOptions);
												win.down('#submit_account').setDisabled(true);
												confirm_win.close();
												win.down('#message').clearMessage();
									         }
									     }]
									});
									  confirm_win.show();*/
									win.down('form').getForm().submit(submitOptions);
									win.down('#submit_account').setDisabled(true);
									win.down('#message').clearMessage();
									win.down('#message').setVisible(false);
									win.down('#formErrorState').clearError();
								}
							} ]
						} ]
					/*	buttons : [ {
							text : Locale.getMsg('view.account.create'),
							itemId : 'submit_account',
							formBind : true,
							type : 'submit',
							padding : '0 0 10 0',
							align:'right',
							handler : function() {
								var params = this.up('form').getValues();

								var confirm_win = Ext.create('widget.window', {
						                title : Locale.getMsg('view.auth.account.create'),
										//closable : false,
										draggable : false,
										resizable : false,
										shadow : false,
										height : 155,
										width : 640,
								
										items : [ {
											id : 'welcomeMesg',
											name : 'welcomeMesg',
											xtype : 'label',
											margins : '0 10 0 20',
											html:Ext.String.format(Locale.getMsg('view.auth.account.create.welcomeMesg'), win.down('#id').getValue(),  win.down('#email').getValue()),
											style : 'font-size: 20px;',
									    }],									    
						                
						       		 buttons : [ {
										text : Locale.getMsg('view.common.ok'),
										type : 'submit',
										handler : function() {
											win.down('form').getForm().submit(submitOptions);
											win.down('#submit_account').setDisabled(true);
											confirm_win.close();
						              }
							    }]
						});
						        confirm_win.show();
								win.down('#formErrorState').clearError();
							}
						} ]*/
					}, {
						xtype : 'component',
						itemId : 'message',
						baseCls : 'message',
						padding : '0 10 10 20',
						height : 80,
						hidden : true,
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

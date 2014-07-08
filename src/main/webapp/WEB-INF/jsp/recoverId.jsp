<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Recover User ID</title>

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
			url : 'recoverId/sendMail',
			success : function(form, action) {
				console.log(action);
				//win.down('#message').setMessage(true,Ext.String.format(Locale.getMsg('view.auth.recoverAccount.' + action.result.msg), action.result.email));
				win.down('#submit').setDisabled(false);
				win.down('#message').setVisible(true);
				win.down('#message').setMessage(true,
						Locale.getMsg('view.auth.recoverAccount.mailSent', action.result.target, '3'));
				setTimeout("window.location = './';", 3000);
			},
			failure : function(form, action) {
				console.log('fail', form, action.result);
				if (form.isDirty()) {
					//win.down('#message').setMessage(false, action.result.msg);
					win.down('#submit').setDisabled(false);
				}
				//win.down('#message').setMessage(false, Locale.getMsg('view.auth.recoverId.' + action.result.msg, win.down('#email').getValue()))
				win.down('#message').setVisible(true);
				win.down('#message').setMessage(false, MyApp.locale.Converter.getErrorMsg('', action.result));
			}
		};

		var win = Ext.create('widget.window', {
			// 					baseCls : 'dark-window',
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
						// 								baseCls : 'dark-panel',
						itemId : 'form',
						renderTo : Ext.getBody(),
						preventHeader : true,
						// 					bodyPadding : '20 20 10 20',
						fieldDefaults : {
							msgTarget : 'under',
							labelWidth : 170
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
									// FIXME not show in IE
									xtype : 'image',
									padding : '0 10 5 0',
									src : 'css/images/signin-page-hr-line.gif'
								},
								{
									xtype : 'component',
									html : '<div style="font-size:x-large;font-weight:bold;">'
											+ Locale.getMsg('view.auth.recoverId') + '</div><div>'
											+ Locale.getMsg('view.auth.recoverId.forgetUserId.exlpain') + '</div>',
									padding : '5 20 5 20'
								}, {
									itemId : 'email',
									fieldLabel : Locale.getMsg('view.auth.recoverId.email'),
									name : 'email',
									allowBlank : false,
									padding : '5 20 5 20',
									vtype : 'email'
								} /*, {
																								itemId : 'repeat_email',
																								fieldLabel : Locale.getMsg('view.auth.recoverId.email.repeat'),
																								name : 'repeat_email',
																								allowBlank : false,
																								padding : '5 20 5 20',
																								vtype : 'email',
																								validator : function(value) {
																									if (win.down('#repeat_email').getValue() != win.down('#email').getValue()) {
																										return Locale.getMsg('view.auth.recoverId.email.repeat.error');
																									}
																									return true;
																								}
																							}*/],
						dockedItems : [ {
							xtype : 'toolbar',
							dock : 'bottom',
							ui : 'footer',
							padding : '0 15 10 0',//'0 10 10 160',
							items : [ '->', {
								xtype : 'button',
								text : Locale.getMsg('view.auth.recoverAccount.mailSent.button'),
								formBind : true,
								itemId : 'submit',
								type : 'submit',
								//width: '60%',
								handler : function() {
									//if (win.down('#repeat_email').getValue() != win.down('#email').getValue())
									//	win.down('#message').setMessage(true, Locale.getMsg('view.auth.recoverId.email.repeat.error'));
									//else {
									this.up('form').getForm().submit(submitOptions);
									this.setDisabled(true);
									win.down('#message').clearMessage();
									//}
								}
							} ]
						} ]
					}, {
						xtype : 'component',
						itemId : 'message',
						baseCls : 'message',
						padding : '0 5 10 20',
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

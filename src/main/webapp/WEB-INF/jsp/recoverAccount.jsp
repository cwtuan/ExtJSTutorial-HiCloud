<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Recover Password</title>

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
			url : 'recoverAccount/sendMail',
			success : function(form, action) {
				//win.down('#message').setMessage(true,Ext.String.format(Locale.getMsg('view.auth.recoverAccount.' + action.result.msg), action.result.email));
				win.down('#submit').setDisabled(false);
				win.down('#message').setVisible(true);
				win.down('#message').setMessage(true,
						Locale.getMsg('view.auth.user.resendLink.success.msg', action.result.target, '3'));
				setTimeout("window.location = './';", 3000);
			},
			failure : function(form, action) {
				win.down('#submit').setDisabled(false);
				//win.down('#message').setMessage(false,Locale.getMsg('view.auth.recoverAccount.resetPassword.' + action.result.msg, win.down('#userId').getValue()))
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
									padding : '0 10 5 10',
									src : 'css/images/signin-page-hr-line.gif'
								},
								{
									xtype : 'component',
									html : '<div style="font-size:x-large;font-weight:bold;">'
											+ Locale.getMsg('view.auth.recoverAccount.resetPassword') + '</div><div>'
											+ Locale.getMsg('view.auth.recoverAccount.forgetPassword.explain') + '</div>',
									padding : '5 20 5 20'
								}, {
									itemId : 'userId',
									fieldLabel : Locale.getMsg('view.auth.user.id'),
									name : 'userId',
									allowBlank : false,
									padding : '5 20 5 20'
								} ],
						dockedItems : [ {
							xtype : 'toolbar',
							dock : 'bottom',
							ui : 'footer',
							padding : '0 15 10 0',
							items : [ '->', {
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
						hieght : 80,
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

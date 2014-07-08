<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Activate Account</title>

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
			url : 'rest/auth/activate',
			method : 'POST',
			success : function(form, action) {
				win.down('#message').setMessage(true, Locale.getMsg('view.auth.account.activate.redirect', '3'));
				setTimeout("window.location = './';", 3000);

				// Auto sign in
				/*console.log("auto sign-in Ajax request : j_username=",'${model.id}',' j_password=',win.down('#password').getValue());
				  Ext.Ajax.request({
					 url: 'j_spring_security_check',
					 params: {
					           j_username:  win.down('#id').getValue(),//'${model.id}',
					           j_password:  win.down('#password').getValue()
					 },
					 success: function(response){
					  var text = response.responseText;
					  window.location = './signin';
					 }
				});*/
			},
			failure : function(form, action) {
				//console.log("activate failed");
				win.down('#message').setMessage(true, Locale.getMsg('view.auth.account.activate.failure'));
				win.down('#activate_account').setDisabled(false);
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
					labelWidth : 125
				},
				defaultType : 'textfield',
				defaults : {
					anchor : '100%'
				},
				listeners : {
					afterRender : function(thisForm, options) {
						thisForm.submit(submitOptions);
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
					padding : '0 10 20 10',
					src : 'css/images/signin-page-hr-line.gif'
				}, {
					itemId : 'id',
					fieldLabel : Locale.getMsg('view.common.id'),
					name : 'id',
					//vtype : 'email',
					maxLength : 50,
					//allowBlank : false,
					//hidden : true,
					value : '${model.id}',
					readOnly : true,
					hidden : true,
					padding : '0 20 0 20'
				}, {
					itemId : 'email',
					fieldLabel : Locale.getMsg('view.common.email'),
					name : 'email',
					//vtype : 'email',
					maxLength : 50,
					//allowBlank : false,
					//hidden : true,
					value : '${model.email}',
					readOnly : true,
					hidden : true,
					padding : '0 20 0 20'
				}, {
					itemId : 'authCode',
					//fieldLabel : Locale.getMsg('view.auth.password'),
					name : 'authCode',
					hidden : true,
					value : '${model.authCode}'
				}, {
					itemId : 'password',
					//fieldLabel : Locale.getMsg('view.auth.password'),
					name : 'password',
					hidden : true,
					value : '${model.password}'
				}, {
					xtype : 'component',
					itemId : 'message',
					baseCls : 'message',
					padding : '0 10 10 20',
					style : 'font-size: 18px;',
					layout : 'fit',
					setMessage : function(success, msg) {
						var me = this;
						/*baseCls = me.baseCls;
						if (!success) {
							me.addCls(baseCls + '-error');
						}*/
						me.update(msg);
					},
					clearMessage : function() {
						var me = this;
						/*baseCls = me.baseCls;
						me.removeCls(baseCls + '-error');*/
						me.update('');
					}

				} ]

			} ]
		});
		win.show();

	});
</script>

<%@include file="/WEB-INF/jsp/footer.jspf"%>

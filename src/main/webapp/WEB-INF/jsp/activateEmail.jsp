<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>HiRender: Activate Email</title>

<!-- Modify some CSS classes -->
<style>
.message-error {
	font-size: 14px;
	background: none no-repeat scroll 0 0 transparent;
	/* 	padding-left: 10px; */
	background-image: url("css/images/exclamation_16x16.png");
	color: #F30;
}
</style>

<%@include file="/WEB-INF/jsp/loadjs.jspf"%>

<script type="text/javascript">
	Ext.onReady(function() {
		console.log("alreadyActivateAccount : valid=", '${model.valid}');

		var me = this;

		var win = Ext.create('widget.window', {
			closable : false,
			draggable : false,
			resizable : false,
			shadow : false,

			width : 370,
			items : [ {
				xtype : 'form',
				shadow : false,
				itemId : 'form',
				renderTo : Ext.getBody(),
				preventHeader : true,

				fieldDefaults : {
					msgTarget : 'under',
					labelWidth : 150
				},
				defaultType : 'textfield',
				defaults : {
					anchor : '100%'
				},
				listeners : {
					afterRender : function(thisForm, options) {
						console.log('*model.valid', '${model.valid}');
						if ('${model.valid}' === 'true') {
							this.down('#message').setMessage(true,
									Locale.getMsg('view.auth.email.activate.redirect', '${model.email}', '3'));
							setTimeout("window.location = './';", 3000);
						} else {
							this.down('#message').setMessage(false,
									Locale.getMsg('view.auth.email.activate.duplicated', '${model.email}', '3'));
							setTimeout("window.location = './';", 3000);
						}
						if ('${model.error}' != '') {
							var temp = new Object();
							temp.error = '${model.error}';
							var errorMsg = MyApp.locale.Converter.getErrorMsg('', temp);
							errorMsg = Locale.getMsg('view.auth.email.activate.fail', '3') + '<p>' + errorMsg + '</p>';
							this.down('#message').setMessage(false, errorMsg);
							setTimeout("window.location = './';", 3000);
						}
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
					itemId : 'message',
					baseCls : 'message',
					padding : '0 10 10 20',
					style : 'font-size: 16px;',
					layout : 'fit',
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
			} ]
		});
		win.show();

	});
</script>

<%@include file="/WEB-INF/jsp/footer.jspf"%>

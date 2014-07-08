/*
 * Tony modified it from http://ahlearns.wordpress.com/2011/12/16/ext-js-4-notification-bar
 */

/*
 * Usage:
 * 如果是成功的訊息，可使用
 * Ext.getCmp('notifybar').showSuccess('xxx', 5000); -> 顯示5000 ms後自動消失
 * Ext.getCmp('notifybar').showSuccess('xxx');  -> 如果沒指定則用預設的時間(successDuration ms)，建議大家使用預設的即可
 * PS：如果很明顯可以看到操作成功，建議就不用再顯示成功的訊息，例如更新project的名子，改完後他馬上就會refresh，user以可以明確知道成功了，就不必再顯示成功的訊息，減少視覺疲勞
 *
 *如果是失敗的訊息，可使用
 *Ext.getCmp('notifybar').showError('xxxx');  -> 失敗訊息預設不會自動消失，使用者點 X 後才會關閉
 *Ext.getCmp('notifybar').showError('xxxx', 5000);  -> 但是如果指定時間，還是可以讓錯誤訊息自動消失
 *
 * 如果是警告的訊息，可使用showWarning()，跟showError一樣，預設不會消失。
 */

// TODO dont close success msg when mouseover
// TODO close error msg by default and dont close it when mouseover
Ext.define('MyApp.ux.toolbar.NotifyBar', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.notifybar',
	requires : [ 'Ext.toolbar.*' ],
	cssOn : false,
	successDuration : 8000,
	cls : 'notifybar',

	initComponent : function() {
		var me = this;
		me.items = [ {
			itemId : 'msg',
			flex : 1,
			xtype : 'tbtext',
			cls : 'notifybar-text'
		}, {
			text : 'X',
			scope : me,
			handler : me.hideBar
		} ];

		me.callParent(arguments);
		me.msgItem = me.child('#msg');

		me.hideTask = new Ext.util.DelayedTask(function() {
			me.hideBar();
		});

	},

	showSuccess : function(msg, duration) {
		
		// if (!me.changeClsTask || (me.changeClsTask && me.changeClsTask.stopped === true)) {
		this.type = 'success';
		this.showBar(msg, duration);
		// } else {
		// console.log('When error msg not is closed, success msg will not be shown.');
		// }
	},

	showError : function(msg, duration) {
		this.type = 'error';
		this.showBar(msg, duration);

	},

	showWarning : function(msg, duration) {
		this.type = 'warning';
		this.showBar(msg, duration);
	},

	showBar : function(msg, duration) {
		var me = this;

		// stop old hideTask changeClsTask
		me.hideBar();

		if (msg == null) {
			msg = 'undefined';
		}

		me.msgItem.setText(msg);
		me.show();

		// me.removeCls("notifybar-error notifybar-success notifybar-warning");
		// if (me.changeClsTask != null) {
		// Ext.TaskManager.stop(me.changeClsTask);
		// }
		// if (me.hideTask != null) {
		// me.hideTask.cancel();
		// }

		// Add/Remove error msg CSS periodically
		if (me.type === 'error' || me.type === 'warning') {
			if (duration) {
				me.hideTask.delay(duration);
			}
			if (me.changeClsTask == null) {
				me.changeClsTask = Ext.TaskManager.start({
					run : function() {

						if (me.cssOn) {
							me.cssOn = false;
							me.removeCls("notifybar-error notifybar-success notifybar-warning");
						} else {
							me.cssOn = true;				
							if (me.type === 'error') {
								me.addClass('notifybar-error');
							} else {
								me.addClass('notifybar-warning');
							}
						}
					},
					interval : 1000
				});
			} else {
				Ext.TaskManager.start(me.changeClsTask);
			}
		}

		// close the success msg automatically
		if (me.type === 'success') {
			me.addClass('notifybar-success');
			me.hideTask.delay(duration ? duration : me.successDuration);
		}

	},

	hideBar : function() {
		var me = this;
		if (me.rendered && !me.isHidden()) {
			Ext.suspendLayouts();
			me.hide();
			// this.getEl().setOpacity(0.25, false);
			me.removeCls("notifybar-error notifybar-success notifybar-warning");
			me.msgItem.update('');
			Ext.resumeLayouts(true);

			if (me.changeClsTask != null) {
				Ext.TaskManager.stop(me.changeClsTask);
			}
			if (me.hideTask != null) {
				me.hideTask.cancel();
			}
		}
	},

	// Add custom processing to the beforeRender phase.
	beforeRender : function() {
		this.callParent(arguments);
		this.hide();
	},

	onDestroy : function() {
		if (this.changeClsTask) {
			Ext.TaskManager.stop(this.changeClsTask);
		}

		this.getEl().stopAnimation();
		this.callParent(arguments);
	}
});

// TODO mv to ux

Ext.define('MyApp.action.Action', {
	extend : 'Ext.Action',
	hideOnClick : true,
	scale : "small",
	constructor : function(config) {
		var me = this;

		config = config || {};
		config.hidden = config.hidden || me.hidden || false;
		config = Ext.applyIf(config || {}, {
			text : me.text,
			iconCls : me.iconCls,
			icon : me.icon,
			handler : me.handler,
			itemId : me.itemId,
			scope : me.scope,
			menu : me.menu,
			hideOnClick : me.hideOnClick,
			scale : me.scale,
			tooltip : (Ext.isString(config.disabledTooltip)) ? config.disabledTooltip : config.defaultTooltip, // TODO refactor to ecfa
			disabled : (Ext.isString(config.disabledTooltip)), // 只有在第一次constructor有效
			switchStatus : me.switchStatus || Ext.emptyFn, // 如果事後才要更新狀態，再使用switchStatus
			disableIfNoSelection : me.disableIfNoSelection,
			disableIfNoSelectionOrMoreThanOne : me.disableIfNoSelectionOrMoreThanOne
		});

		// console.log('config.disabledTooltip : config.defaultTooltip', config.disabledTooltip, config.defaultTooltip);

		me.callParent([ config ]);
	},
	/**
	 * return true if action is disabled when on records selected. you should set me.panel properly when create the action
	 */
	disableIfNoSelection : function() {
		var me = this;
		if (me.panel) {
			if (me.panel.getSelectionModel().getSelection().length === 0) {
				me.disable();
				me.setTooltip(Locale.getMsg('common.tooltip.disabled.noRecords'));
				return true;
			}
		} else {
			console.error('you should set me.panel properly when using disableIfNoSelection');
		}

		me.setTooltip('');
		me.enable();
		return false;
	},
	/**
	 * return true if action is disabled when on records selected or more than one record selected. you should set me.panel properly when create the action
	 */
	disableIfNoSelectionOrMoreThanOne : function() {
		var me = this;

		if (me.panel) {
			var ln = me.panel.getSelectionModel().getSelection().length;
			// console.log('disableIfNoSelectionOrMoreThanOne', ln);

			if (ln != 1) {
				me.disable();
				me.setTooltip(Locale.getMsg('view.common.tooltip.disabled.noRecordsOrMoreThanOne'));
				return true;
			}
		} else {
			console.error('you should set me.panel properly when using disableIfNoSelectionOrMoreThanOne');
		}
		me.setTooltip('');
		me.enable();
		return false;
	}
});

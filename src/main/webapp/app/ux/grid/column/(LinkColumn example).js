Ext.define('MyApp.ux.grid.column.VmLinkColumn', {
	extend : 'MyApp.ux.grid.column.ModelColumn',
	alias : 'widget.VmLinkColumn',
	getIcon : function(record) {
		var me = this;
		var image, state = Ext.isEmpty(me.modelField) ? record.get('state') : record.get(me.modelField + 'State');
		if (state === Vpdc.Node.POWERON) {
			image = 'vm-poweron';
		} else if (state === Vpdc.Node.POWEROFF) {
			image = 'vm-poweroff';
		} else if (state === Vpdc.Node.SUSPENDED) {
			image = 'vm-suspended';
		} else if (state === Vpdc.Node.RECOVER_FAILED) {
			image = 'vm-recoverfailed';
		} else {
			image = 'vm-processing';
		}
		if (image) {
			return 'css/images/' + image + '_16x16.png';
		}
	}
});
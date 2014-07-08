Ext.define('MyApp.ux.button.WinGridLinkButton', {
	extend : 'MyApp.ux.button.LinkButton',
	alias : 'widget.winGridLinkButton',	
	enableMouseover: true,
	//grid : null,
	//win : null,
	missionOid : null,
	frameSeq : null,
	initComponent : function() {
		var me = this;
		me.callParent(arguments);
	},	

	onMouseover : function(e) {
		var me = this;

		if (me.enableMouseover) {
			
			if (!Ext.getCmp('gridwin')) {
				//console.log('no gridwin');
				
				var win = Ext.create('MyApp.view.usage.UframeWin',{
					missionOid : me.missionOid,
					frameSeq : me.frameSeq,
					x : me.getEl().getX() + 25,
					y : me.getEl().getY() - 10
				}).show();
				win.load();				
			}
		}

	},

	onMouseout : function(e) {
		var me = this;
		
		if (me.enableMouseover && Ext.getCmp('gridwin')) {
					
			Ext.getCmp('gridwin').close();
			
		}
	}
});

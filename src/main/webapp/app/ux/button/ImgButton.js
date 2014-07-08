// Usage:
//{
//		xtype : 'imgButton',
//		src : 'css/images/folder_16x16.png',
//		handler : function() {
//			console.log('click!');
//		}
//}

Ext.define('MyApp.ux.button.ImgButton', {
	extend : 'Ext.Img',
	alias : 'widget.imgButton',
	enableKeyEvents : true,
	handler : function() {
	},
	afterRender : function() {
		this.callParent(arguments);
		this.el.on('click', this.handler, this);
		this.el.dom.style.cursor = "pointer";
	},
	initComponent : function() {
		this.callParent(arguments);
	}
});

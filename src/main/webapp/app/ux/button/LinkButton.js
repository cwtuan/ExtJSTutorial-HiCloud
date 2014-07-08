Ext.define('MyApp.ux.button.LinkButton', {
	extend : 'Ext.Component',
	alias : 'widget.linkButton',
	childEls : [ 'btnEl' ],
	renderTpl : [ '<dev title={tooltip}><a href=\"javascript:;\" id="{id}-btnEl" ', '>{text}</a></dev>' ],
	config : {
		text : '',
		tooltip : '',
		handler : function() {
		}
	},
	//mouseoverImage : null,
	//enableMouseoverImage : false,
	imgsrc : '',
	//enableMouseoverGrid : false,
	enableMouseover : false,
	grid : null,
	win : null,
	missionOid : null,
	frameSeq : null,
	initComponent : function() {
		var me = this;
		me.callParent(arguments);

		this.renderData = {
			text : this.getText(),
			tooltip : this.getTooltip()
		};

	},
	onRender : function(ct, position) {

		var me = this, btn;

		me.addChildEls('btnEl');

		me.callParent(arguments);

		btn = me.btnEl;

		me.mon(btn, 'click', me.onClick, me);
		if (me.enableMouseover) {
			me.mon(btn, 'mouseover', me.onMouseover, me);
			me.mon(btn, 'mouseout', me.onMouseout, me);
		}

	},
	onClick : function(e) {
		var me = this;
		if (me.preventDefault || (me.disabled && me.getHref()) && e) {
			e.preventDefault();
		}
		if (e.button !== 0) {
			return;
		}
		if (!me.disabled) {
			me.fireHandler(e);
		}
	},

	onMouseover : function(e) {
		var me = this;

		if (me.enableMouseover) {
			
			var item ;
			if (!Ext.getCmp('infowin')) {
				console.log('no infowin');
				
				// polling (which reload and re-render linkbtn) will trigger mouseover again
				// don't create win when last win haven't been closed
				item = Ext.create('Ext.Img', {
					src : me.imgsrc
				});
					
				var win = Ext.create('Ext.window.Window', {
					id : 'infowin',
					header : false,
					border : false,
					closable : false,
					draggable : false,
					height : 200,
					width : 200,
					layout : 'fit',
					x : me.getEl().getX() + 25,
					y : me.getEl().getY() - 10,
					items : [item]
				});
				win.show();				
			}
		}

	},

	onMouseout : function(e) {
		var me = this;
		//console.log('onMouseout');
		//console.log(me);		
		
		if (me.enableMouseover && Ext.getCmp('infowin')) {
			
			Ext.getCmp('infowin').close();		
						
		}
	},	

	fireHandler : function(e) {
		var me = this, handler = me.handler;

		me.fireEvent('click', me, e);
		if (handler) {
			handler.call(me.scope || me, me, e);
		}
	}
});

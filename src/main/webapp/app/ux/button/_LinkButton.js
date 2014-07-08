Ext.define('MyApp.ux.button._LinkButton', {
	extend : 'Ext.Component',
	alias : 'widget._linkButton',
	childEls : [ 'btnEl' ],
	renderTpl : [ '<dev title={tooltip}><a href=\"javascript:;\" id="{id}-btnEl" ', '>{text}</a></dev>' ],
	config : {
		text : '',
		tooltip : '',
		handler : function() {
		}
	},
	mouseoverImage : null,
	enableMouseoverImage : false,
	imgsrc : '',
	enableMouseoverGrid : false,
	grid : null,
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
		if (me.enableMouseoverImage || me.enableMouseoverGrid) {
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

		if (me.enableMouseoverImage || me.enableMouseoverGrid) {
			
			var item ;
			if (!Ext.getCmp('infowin')) {
				console.log('no infowin');
				if (me.enableMouseoverImage) {
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
					

				} else if (me.enableMouseoverGrid) {
					
					//me.mon(me.grid.getStore(),'load',me.popupWin,me);
					me.grid.getStore().on('load',me.popupWin, me);
					me.grid.load();				
					
					
					//me.grid.getStore().removeListener('load', me.popupWin, this);
				}			

				
			}
		}

	},

	onMouseout : function(e) {
		var me = this;
		console.log('onMouseout');
		console.log(me);
		
		if ((me.enableMouseoverImage && Ext.getCmp('infowin'))|| (me.enableMouseoverGrid && Ext.getCmp('gridwin'))) {
			//console.log(Ext.getCmp('infowin'));
			//console.log('CLOSE');			
			if(me.enableMouseoverImage){
				Ext.getCmp('infowin').close();
			}
			
			else if(me.enableMouseoverGrid){
				console.log(Ext.getCmp('gridwin'));
				console.log('CLOSE');
				Ext.getCmp('gridwin').close();
				me.grid.getStore().un('load',me.popupWin , me);
			}
						
		}
	},

	

	fireHandler : function(e) {
		var me = this, handler = me.handler;

		me.fireEvent('click', me, e);
		if (handler) {
			handler.call(me.scope || me, me, e);
		}
	},
	
	popupWin : function(){		
		
		console.log('load');
		
		console.log('SCOPE in POPWIN');
		console.log(this);
		console.log(this.grid);
		
		var win = Ext.create('Ext.window.Window', {
			id : 'gridwin',
			header : false,
			border : false,
			closable : false,
			draggable : false,
			height : 200,
			width : 200,
			layout : 'fit',				
			x : this.getEl().getX() + 25,
			y : this.getEl().getY() - 10,
			items : [this.grid]
		});
		console.log(win);
		 
		win.show();
		//}
		
		//Ext.getCmp('infowin').show();
		
		//me.mun(me.grid.getStore(), 'load',me.popupWin,me);
		
		
	}
});

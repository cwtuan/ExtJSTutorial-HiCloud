Ext
		.define(
				'MyApp.ExtSetting',
				{
					singleton : true,
					init : function(config) {

						// Disable row selection when clicking row on grid
						Ext.define('Ext.setting.grid.Panel', {
							override : 'Ext.grid.Panel',
							initComponent : function() {
								if (this.selModel && Ext.Array.contains([ 'MULTI', 'SIMPLE' ], this.selModel.mode)) {
									this.selModel.checkOnly = true;
								}
								this.callParent();
							}
						});

						// Set AJAX error handling
						if (config && config.AJAX_TIMEOUT) {
							Ext.Ajax.timeout = config.AJAX_TIMEOUT;
						}

						// init stateful component
						// Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider', {
						// expires: new Date(new Date().getTime()+15552000000), // 180 days
						// path: 'MyApp'
						// }));
						// Ext.define('Ext.setting.grid.Panel', {
						// override : 'Ext.grid.Panel',
						// initComponent : function() {
						// var me = this;
						// var className = Ext.getClassName(me);
						// if(className != null && className.indexOf('MyApp') != -1 && className !== 'MyApp.view.queue.task.FilterTaskGrid') {
						// me.stateful = true;
						// me.stateId = className;
						// }
						// me.callParent();
						// }
						// });

						// Set AJAX error handling
						// if (config && config.AJAX_TIMEOUT) {
						// Ext.Ajax.timeout = config.AJAX_TIMEOUT;
						// }

						Ext.Ajax.on({
							requestexception : function(conn, response, options, eOpts) {

								if (options.ignoreHandleException) {
									return;
								}

								// retry failed request
								// FIXME don't retry when timeout
								// if (response.status === 0) {
								// Ext.getCmp('notifybar').showError(Locale.getMsg('view.common.noInternet'), MyApp.Config.NO_INTERNET_RETRY_PERIOD);
								// Ext.Ajax.request(options);
								// }

								switch (response.status) {
								case 401: // user is not logged in
									window.location = './signout';
									break;
								case 403: // user is already logged in but does not have authority.
								// window.location = './signout';
									break;
								default:

									break;
								}
							}
						});

						// global setting for Grid View
						Ext.define("Ext.setting.grid.iew", {
							override : "Ext.grid.View",
							autoScroll : true,
							enableTextSelection : true,
							emptyText : 'No data' // FIXME
						});

						// global setting for Panel Table
						Ext.define('Ext.setting.panel.Table', {
							override : 'Ext.panel.Table',
							columnLines : true
						});

						// global setting for menu
						Ext
								.define(
										'Ext.setting.MenuItem',
										{
											override : 'Ext.menu.Item',
											renderTpl : [
													'<tpl if="plain">',
													'<a id="{id}-itemEl" class="'
															+ Ext.baseCSSPrefix
															+ 'menu-item-link" style="padding:6px 2px 3px 10px" href="{href}" <tpl	 if="hrefTarget">target="{hrefTarget}"</tpl> hidefocus="true" unselectable="on">',
													'<span id="{id}-textEl" class="' + Ext.baseCSSPrefix
															+ 'menu-item-text" <tpl if="menu">style="margin-right: 17px;"</tpl> >{text}</span>',
													'<tpl if="menu">',
													'<img id="{id}-arrowEl" src="{blank}" class="' + Ext.baseCSSPrefix + 'menu-item-arrow" />',
													'</tpl>',
													'</a>',
													'<tpl else>',
													'<a id="{id}-itemEl" class="'
															+ Ext.baseCSSPrefix
															+ 'menu-item-link" href="{href}" <tpl if="hrefTarget">target="{hrefTarget}"</tpl> hidefocus="true" unselectable="on">',
													'<img id="{id}-iconEl" src="{icon}" class="' + Ext.baseCSSPrefix + 'menu-item-icon {iconCls}" />',
													'<span id="{id}-textEl" class="' + Ext.baseCSSPrefix
															+ 'menu-item-text" <tpl if="arrowCls">style="margin-right: 17px;"</tpl> >{text}</span>',
													'<img id="{id}-arrowEl" src="{blank}" class="{arrowCls}" />', '</a>', '</tpl>' ]
										});

						// init quicktips
						Ext.tip.QuickTipManager.init();

						// global setting for tooltip
						Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
							dismissDelay : 0,
							showDelay : 0,
							autoHide : false
						// ,
						// cls : 'tooltip-message',
						// bodyCls : 'tooltip-message',
						// componentCls: 'tooltip-message'
						});

						// To show dialog/menu over Java Applet !!
						// Remove this if not use applet any more.
						// Ext.useShims = true;

						// make the error message under the field
						Ext.form.Field.prototype.msgTarget = 'under';
						Ext.form.CheckboxGroup.prototype.msgTarget = 'under';

					}
				});

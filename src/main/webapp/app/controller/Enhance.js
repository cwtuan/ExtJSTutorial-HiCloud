Ext.define('MyApp.controller.Enhance', {
	extend : 'Ext.app.Controller',
	requires : [],
	stores : [],
	models : [],
	refs : [],
	init : function() {
		var me = this;

		// tooltip setting is located at ExtSetting.js

		me.control({
			// 1. submit form on enter key
			'form' : { 
				afterrender : function(thisForm, eOpts) {
					Ext.create('Ext.util.KeyNav', thisForm.getEl(), {
						"enter" : function(e) {
							var el = Ext.Element.getActiveElement();
							if (el.type != 'textarea') {
								var b = Ext.DomQuery.select('div[id=' + thisForm.getId() + ']');
								var a = Ext.DomQuery.select('*[type=submit]', b[0]);
								if (a[0]) {
									a[0].click();
								}
							} else {
								// The user is in a textarea in the form so this feature
								// is diabled to allow for character returns
								// in field data.
							}
						},
						scope : this
					});
				}
			},
			// 2. Mark a red asterisk on an required field
			'field' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.isFieldLabelable && component.fieldLabel) {
						// // Mark a red asterisk on an required field
						if (component.allowBlank === false /*&& component.fieldLabel.match('color:red') == null*/) {
							component.fieldLabel += '<span style="color:red">*</span> ';
						}
						// Show tooltip on fields
						if (component.tooltip && component.fieldLabel.match('data-qtip') == null) {
							component.fieldLabel += ' <a href="#" class="help" data-qtip="' + component.tooltip + '">?</a>';
						}
					}
				}
			},
			'checkboxgroup' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.isFieldLabelable && component.fieldLabel) {

						if (component.allowBlank === false /*&& component.fieldLabel.match('color:red') == null*/) {
							component.fieldLabel += '<span style="color:red">*</span> ';
						}
					}
				}
			},
			// 3. show tooltip at end of component
			'fieldset' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.tooltip && component.title.match('data-qtip') == null) {
						component.title += ' <a href="#" class="help" data-qtip="' + component.tooltip + '">?</a>';
					}
				}
			},
			'gridcolumn' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.tooltip && component.text.match('data-qtip') == null) {
						component.text += ' <a href="#" class="help" data-qtip="' + component.tooltip + '">?</a>';
					}
				}
			},
			'radio' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.tooltip && component.boxLabel.match('data-qtip') == null) {
						component.boxLabel += ' <a href="#" class="help" data-qtip="' + component.tooltip + '">?</a>';
					}
				}
			},
			'checkbox' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.tooltip && component.boxLabel.match('data-qtip') == null) {
						component.boxLabel += ' <a href="#" class="help" data-qtip="' + component.tooltip + '">?</a>';
					}
				}
			},
			'radiogroup' : {
				beforerender : function(component) {
					if (component && !component.rendered && component.fieldLabel.match('data-qtip') == null) {
						if (component.tooltip) {
							component.fieldLabel += ' <a href="#" class="help" data-qtip="' + component.tooltip + '">?</a>';
						}
					}
				}
			}
//			,
//			// 4. Disable row selection when clicking row on grid
//			'gridview' : {
//				beforecellmousedown : function(view, cell, cellIdx, record, row, rowIdx, eOpts) {				
//					console.log('view, cell, cellIdx, record, row, rowIdx, eOpts', view, cell, cellIdx, record, row, rowIdx, eOpts);
//					if (cellIdx !== ) {
//						return false;
//					}
//				}
//			}
 
		});

	}
});

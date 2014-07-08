// To fix bugs in ExtJS, must load ExtJS before this
Ext.define('MyApp.ExtFix', {
	singleton : true,
	init : function(config) {

		// i18n for RowEditor
		if (Ext.grid.RowEditor) {
			Ext.apply(Ext.grid.RowEditor.prototype, {
				saveBtnText : Locale.getMsg('view.common.save'),
				cancelBtnText : Locale.getMsg('view.common.cancel'),
				errorsText : Locale.getMsg('view.common.save.error'),
				dirtyText : Locale.getMsg('view.common.save.dirtyText')
			});
		}

		// FIXME not work with sencha compile
		// Locale fix
		// switch (config.LANG) {
		// case 'zh_TW':
		// Ext.define("Ext.fix.LoadMask", {
		// override : "Ext.LoadMask",
		// msg : '讀取中...'
		// });
		// Ext.define("Ext.fix.view.AbstractView", {
		// override : "Ext.view.AbstractView",
		// loadingText : "讀取中..."
		// });
		// Ext.define('Ext.fix.picker.Date', {
		// override : 'Ext.picker.Date',
		// minText : '日期必須大於或等於最小容許日期',
		// maxText : '日期必須小於或等於最大容許日期'
		// });
		// Ext.define('Ext.fix.form.field.Number', {
		// override : 'Ext.form.field.Number',
		// minText : "此欄位之數值必須大於或等於 {0}",
		// maxText : "此欄位之數值必須小於或等於 {0}"
		// });
		// break;
		// case 'zh_CN':
		// Ext.define("Ext.fix.LoadMask", {
		// override : "Ext.LoadMask",
		// msg : "加载中..."
		// });
		// Ext.define("Ext.fix.view.AbstractView", {
		// override : "Ext.view.AbstractView",
		// loadingText : "加载中..."
		// });
		// Ext.define("Ext.fix.picker.Date", {
		// override : "Ext.picker.Date",
		// minText : "日期必须大于或等于最小允许日期",
		// maxText : "日期必须小于或等于最大允许日期"
		// });
		// break;
		// default:
		// break;
		// }

	}
});

/**
 * Serie class for error bar series type
 *
 * See {@link MyApp.ux.chart.Highcharts.RangeSerie} class for more info
 */
Ext.define('MyApp.ux.chart.Highcharts.ErrorBarSerie', {
	extend : 'MyApp.ux.chart.Highcharts.RangeSerie',
	alternateClassName: [ 'highcharts.errorbar' ],
	type : 'errorbar'
});

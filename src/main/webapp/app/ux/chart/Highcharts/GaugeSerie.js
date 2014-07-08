/**
 * Serie class for gauge series type
 *
 * See {@link MyApp.ux.chart.Highcharts.Serie} class for more info
 *
 * Gauge series is a one dimensional series type, i.e only y-axis data
 */
Ext.define('MyApp.ux.chart.Highcharts.GaugeSerie', {
	extend : 'MyApp.ux.chart.Highcharts.Serie',
	alternateClassName: [ 'highcharts.gauge' ],
	type : 'gauge'

  /***
   * @cfg xField
   * @hide
   */
});

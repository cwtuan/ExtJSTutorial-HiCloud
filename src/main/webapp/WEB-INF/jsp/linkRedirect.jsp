<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/header.jspf"%>

<title>Redirecting...</title>
<%@include file="/WEB-INF/jsp/loadjs.jspf"%>

<script type="text/javascript">
	Ext.onReady(function() {
		console.log('LINK REDIRECT..');

		window.location = '${map.redirectPage}';//call real restAPI in QueueController for download

	});
</script>

<%@include file="/WEB-INF/jsp/footer.jspf"%>

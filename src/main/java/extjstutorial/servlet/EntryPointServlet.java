package extjstutorial.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpResponse;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.SingleClientConnManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;

//  localhost:8080/ExtJSTutorial-HiCloud/entrypoint

@SuppressWarnings("deprecation")
public class EntryPointServlet extends HttpServlet {
	@SuppressWarnings("deprecation")
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ServletContext context = getServletContext();

		TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {

			// @Override
			public java.security.cert.X509Certificate[] getAcceptedIssuers() {
				return null;
			}

			// @Override
			public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {
			}

			// @Override
			public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {
			}

		} };

		// tony: debug=false, if there's no request parameter for debug
		String filename = "true".equals(request.getParameter("debug")) ? "/app/view/Entry.js" : "/all-classes.js";
		System.out.println("filename=" + filename);
		
		String failfilename = "/fail.js";

		HttpGet httpget = null;
		DefaultHttpClient hc = null;
		InputStream inp = null;
		InputStreamReader isr = null;
		BufferedReader reader = null;
		PrintWriter pw = null;
		BufferedReader rd = null;
		InputStreamReader input_reader = null;
		StringBuilder result = new StringBuilder();
		String outline = null;
		try {
			// try {
			// SSLContext sslcontext = SSLContext.getInstance("TLS");
			// sslcontext.init(null, trustAllCerts, null);
			//
			// SSLSocketFactory sf = new SSLSocketFactory(sslcontext, SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
			//
			// SchemeRegistry schemeRegistry = new SchemeRegistry();
			// schemeRegistry.register(new Scheme("http", 80, PlainSocketFactory.getSocketFactory()));
			// schemeRegistry.register(new Scheme("https", 443, sf));
			//
			// SingleClientConnManager cm = new SingleClientConnManager(schemeRegistry);
			// hc = new DefaultHttpClient(cm);
			// HttpParams httpParameters = new BasicHttpParams();
			// HttpConnectionParams.setConnectionTimeout(httpParameters, 5000);
			// HttpConnectionParams.setSoTimeout(httpParameters, 15000);
			// hc.setParams(httpParameters);
			// URIBuilder builder = new URIBuilder();
			//
			// String hn = request.getParameter("hnno"); // 用戶的HN
			// String locale = request.getParameter("locale"); // 現在使用的語系
			// String sessionid = request.getParameter("sessionid"); // cboss session id
			// String token = request.getParameter("token"); // cboss token
			// String userid = request.getParameter("userid"); // 用戶登入的帳號
			//
			// HttpSession session = request.getSession(true);
			//
			// // Check if our session variable is set, if so, get the session variable value
			// // which is an Integer object, and add one to the value.
			// // If the value is not set, create an Integer object with the default value 1.
			// // Add the variable to the session overwriting any possible present values.
			// session.setAttribute("hnno", hn);
			// session.setAttribute("locale", locale);
			// session.setAttribute("sessionid", sessionid);
			// session.setAttribute("token", token);
			// session.setAttribute("userid", userid);
			//
			// builder.setScheme("https").setHost("172.21.246.120").setPath("/cloud_ei/api/ext/identity/getSignature")
			// .setParameter("userid", hn).setParameter("token", token).setParameter("sessionid", userid);
			// httpget = new HttpGet(builder.build());
			// HttpResponse resp = hc.execute(httpget);
			//
			// input_reader = new InputStreamReader(resp.getEntity().getContent());
			// rd = new BufferedReader(input_reader);
			// String line = "";
			// while ((line = rd.readLine()) != null) {
			// result.append(line);
			// }
			// outline = result.toString();
			// } catch (Exception e) {
			// e.printStackTrace();
			// }
			// if (outline != null && outline.length() > 0 && outline.contains("\"code\":200,\"mesg\":\"success\"")) {
			// inp = context.getResourceAsStream(filename);
			// } else {
			// inp = context.getResourceAsStream(failfilename);
			// }

			// tony: Assume the user is valid
			inp = context.getResourceAsStream(filename);

			if (inp != null) {
				isr = new InputStreamReader(inp);
				reader = new BufferedReader(isr);
				response.setCharacterEncoding("utf-8");
				pw = response.getWriter();
				String text = "";
				while ((text = reader.readLine()) != null) {
					pw.println(text);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				inp.close();
			} catch (Exception e) {
				// do nothing
			}
			try {
				isr.close();
			} catch (Exception e) {
				// do nothing
			}
			try {
				reader.close();
			} catch (Exception e) {
				// do nothing
			}
			try {
				pw.close();
			} catch (Exception e) {
				// do nothing
			}
			try {
				hc.close();
			} catch (Exception e) {
				// do nothing
			}
			try {
				input_reader.close();
			} catch (Exception e) {
				// do nothing
			}
			try {
				rd.close();
			} catch (Exception e) {
				// do nothing
			}
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}
}

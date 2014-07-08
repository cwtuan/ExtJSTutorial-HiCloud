package extjstutorial.server.restcontroller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import extjstutorial.model.user.Role;
import extjstutorial.model.user.UserModel;

@Controller
public class SessionController {

	@RequestMapping(value = "rest/session", method = RequestMethod.GET)
	@ResponseBody
	public UserModel getSession() throws Exception {
		return new UserModel("cwtuan");
	}

	@RequestMapping(value = "/signout")
	public String destroy(HttpSession session) {
		session.invalidate();
		return "redirect:./";
	}

	@RequestMapping("/dev")
	public ModelAndView devIndexPage(HttpSession session) {
		return new ModelAndView("index_dev");

		// Map<String, Object> map = new HashMap<String, Object>();
		// if (isLogined(session)) {
		// return new ModelAndView("index_dev");
		// } else {
		// map.put("redirectPage", "./dev");
		// return new ModelAndView("signin", "map", map);
		// }
	}

	@RequestMapping("/")
	public ModelAndView indexPage(HttpSession session) {

		return new ModelAndView("index");

		// Map<String, Object> map = new HashMap<String, Object>();
		// if (isLogined(session)) {
		//
		// return new ModelAndView("index");
		// } else {
		// map.put("redirectPage", "./");
		// return new ModelAndView("signin", "map", map);
		// }
	}

	@RequestMapping("/signin")
	public ModelAndView signinPage(
			@RequestParam(required = false) String redirectPage,
			HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
//		if (isLogined(session)) {
//			return new ModelAndView("index");
//		} else {
//			if (redirectPage == null) {
//				map.put("redirectPage", "./");
//			} else {
//				map.put("redirectPage", redirectPage);
//			}
			return new ModelAndView("signin", "map", map);
//		}
	}

	private boolean isLogined(HttpSession session) {
		return session.getAttribute("user") != null;
	}

}
package extjstutorial.server.restcontroller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import extjstutorial.exception.AppException;
import extjstutorial.model.RestTask;
import extjstutorial.model.project.ProjectModel;
import extjstutorial.model.user.Role;
import extjstutorial.model.user.UserModel;
import extjstutorial.utility.constants.ErrorKey;

@Controller
@RequestMapping("rest/projects")
public class ProjectController {

	/* Projects */

	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public RestTask getProjects() throws Exception {
		try {
			List<ProjectModel> projects = new ArrayList<ProjectModel>();
			projects.add(new ProjectModel("p1", "project1"));
			projects.add(new ProjectModel("p2", "project2"));
			projects.add(new ProjectModel("p3", "project3"));
			return new RestTask(projects);
		} catch (Exception e) {
			return new RestTask(null, e);
		}

	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public RestTask createProject(@RequestBody ProjectModel projectModel) {
		try {
			projectModel.setId(UUID.randomUUID().toString());
			System.out.println("Creating a project:" + projectModel);
			return new RestTask(projectModel);
		} catch (Exception e) {
			return new RestTask(projectModel, e);
		}
	}

	@RequestMapping(method = RequestMethod.PUT)
	@ResponseBody
	public RestTask updateProject(@RequestBody ProjectModel projectModel) {
		try {
			System.out.println("Updating a project:" + projectModel);
			return new RestTask(projectModel);
		} catch (Exception e) {
			return new RestTask(projectModel, e);
		}
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	@ResponseBody
	public RestTask deleteProject(@PathVariable String id, HttpSession session) {
		try {
			System.out.println("Deleting a project with id:" + id);
			return new RestTask(id);
		} catch (Exception e) {
			return new RestTask(id, e);
		}
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "")
	@ResponseBody
	public RestTask deleteProjects(@PathVariable String[] id, HttpSession session) {
		try {
			System.out.println("Deleting projects with id:" + id);
			return new RestTask(id);
		} catch (Exception e) {
			return new RestTask(id, e);
		}
	}

	/* Users */

	@RequestMapping(method = RequestMethod.GET, value = "/{id}/users")
	@ResponseBody
	public RestTask getUsers(@PathVariable String id) throws Exception {
		try {
			// TODO service may thorw exception with ErrorKey
			// throw new AppException(ErrorKey.FORBIDDEN);
			Random generator = new Random();

			List<UserModel> users = new ArrayList<UserModel>();
			for (int i = 0; i < 1 + generator.nextInt(5); i++) {
				users.add(new UserModel("user" + generator.nextInt(999999999), Role.ADMIN));
			}

			return new RestTask(users);
		} catch (Exception e) {
			return new RestTask(null, e);
		}
	}

	@RequestMapping(method = RequestMethod.POST, value = "/{projectId}/users")
	@ResponseBody
	public RestTask addUser(@PathVariable String projectId, @RequestBody UserModel user) {
		try {
			System.out.println(String.format("Adding user %s to project %s.", user.getId(), projectId));
			return new RestTask(user);
		} catch (Exception e) {
			return new RestTask(user, e);
		}
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/{projectId}/users/{userId}")
	@ResponseBody
	public RestTask updateUser(@RequestBody UserModel user) {
		try {
			// TODO service may thorw exception without ErrorKey
			// throw new Exception("whatever");
			System.out.println("Updating a user:" + user);
			return new RestTask(user);
		} catch (Exception e) {
			return new RestTask(user, e);
		}
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{projectId}/users/")
	@ResponseBody
	public RestTask removeUsersFromProject(@RequestParam String[] id, @PathVariable String projectId) {
		try {
			for (String s : id) {
				System.out.println("Removing user: " + s);
			}
			System.out.println("  >from project:" + projectId);
			return new RestTask(id);
		} catch (Exception e) {
			return new RestTask(id, e);
		}

	}

}

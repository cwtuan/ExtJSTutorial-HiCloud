package extjstutorial.model.user;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class UserModel {
	private static final long serialVersionUID = 1L;
	private String id;
	private Role role; // user role in a specific project

	public UserModel() {
		super();
	}

	public UserModel(String id) {
		super();
		this.id = id;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public UserModel(String id, Role role) {
		super();
		this.id = id;
		this.role = role;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "UserModel [id=" + id + ", role=" + role + "]";
	}

}

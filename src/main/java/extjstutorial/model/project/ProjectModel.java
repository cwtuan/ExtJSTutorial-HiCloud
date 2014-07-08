package extjstutorial.model.project;

import java.io.Serializable;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class ProjectModel implements Serializable {
	private static final long serialVersionUID = -4446227406994286298L;
	private String id;
	private String name;

	public ProjectModel(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public ProjectModel() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "ProjectModel [id=" + id + ", name=" + name + "]";
	}

}

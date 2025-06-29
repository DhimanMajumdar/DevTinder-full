import { useState } from "react";
import UserCard from "./UserCard";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl:
      user.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    age: user.age || "",
    gender: user.gender || "",
    about:
      user.about ||
      "Passionate developer building modern, scalable applications with cutting-edge tech.",
    GithubUrl: user.GithubUrl || "",
    linkdlnUrl: user.linkdlnUrl || "",
    skills: user.skills || ["React", "Node.js", "TypeScript", "GraphQL"],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          photoUrl: formData.photoUrl,
          age: formData.age,
          gender: formData.gender,
          about: formData.about,
          GithubUrl: formData.GithubUrl,
          linkdlnUrl: formData.linkdlnUrl,
          skills: formData.skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return;
    }
    saveProfile();
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 my-10 px-4">
      <div className="w-full md:w-96">
        <div className="card bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl border border-gray-700">
          <div className="card-body">
            <h2 className="card-title justify-center text-white">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Existing Inputs */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      First Name*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="input input-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Last Name*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="input input-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    name="photoUrl"
                    value={formData.photoUrl}
                    className="input input-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    className="input input-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                    min="18"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Gender</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    className="select select-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">About</span>
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    className="textarea textarea-bordered h-24 bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">GitHub URL</span>
                  </label>
                  <input
                    type="url"
                    name="GithubUrl"
                    value={formData.GithubUrl}
                    className="input input-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">
                      LinkedIn URL
                    </span>
                  </label>
                  <input
                    type="url"
                    name="linkdlnUrl"
                    value={formData.linkdlnUrl}
                    className="input input-bordered bg-gray-800 text-white border-gray-700"
                    onChange={handleChange}
                  />
                </div>

                {/* Skills */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Skills</span>
                  </label>
                  <div className="space-y-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={skill}
                          className="input input-bordered flex-1 bg-gray-800 text-white border-gray-700"
                          onChange={(e) => handleSkillChange(e, index)}
                        />
                        <button
                          type="button"
                          className="btn btn-square btn-sm bg-gray-700 border-gray-600 hover:bg-gray-600"
                          onClick={() => removeSkill(index)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm w-full bg-gray-800 border-gray-700 hover:bg-gray-700"
                      onClick={addSkill}
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              <div className="card-actions justify-center mt-6">
                <button
                  type="submit"
                  className="btn w-full bg-gradient-to-r from-purple-600 to-blue-600 border-none text-white hover:from-purple-700 hover:to-blue-700"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full md:w-80">
        <UserCard user={formData} />
      </div>
    </div>
  );
};

export default EditProfile;

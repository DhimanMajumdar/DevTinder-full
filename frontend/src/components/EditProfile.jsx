import { useState } from "react";
import UserCard from "./UserCard";
import { X, Plus, Loader2, Github, Linkedin } from "lucide-react";
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
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);
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
          skills: formData.skills.filter((skill) => skill.trim() !== ""),
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setIsSaving(false);
      document.dispatchEvent(
        new CustomEvent("notify", {
          detail: { type: "success", message: "Profile updated successfully!" },
        })
      );
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      setIsSaving(false);
      document.dispatchEvent(
        new CustomEvent("notify", {
          detail: {
            type: "error",
            message: err?.response?.data || "Update failed",
          },
        })
      );
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
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-12 p-4 sm:p-6 md:p-8 max-w-[1400px] mx-auto">
      {/* Form Section */}
      <div className="w-full lg:w-[60%]">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300"></div>

          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl border border-gray-700/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Edit Profile
              </h2>
              <div className="flex space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500 animate-pulse"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-600"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
              {/* Two Column Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1 lg:space-y-2">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:ring-2 focus:ring-purple-500/70 text-sm sm:text-base"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:ring-2 focus:ring-purple-500/70 text-sm sm:text-base"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="space-y-1 lg:space-y-2">
                <label className="block text-xs sm:text-sm text-gray-300">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:ring-2 focus:ring-purple-500/70 text-sm sm:text-base"
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              {/* Two Column Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1 lg:space-y-2">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    min="18"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:ring-2 focus:ring-purple-500/70 text-sm sm:text-base"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:ring-2 focus:ring-purple-500/70 text-sm sm:text-base"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-1 lg:space-y-2">
                <label className="block text-xs sm:text-sm text-gray-300">
                  About
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  rows="4"
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:ring-2 focus:ring-purple-500/70 text-sm sm:text-base"
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1 lg:space-y-2">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    GitHub URL
                  </label>
                  <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-lg">
                    <span className="px-2 sm:px-3 text-gray-400">
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <input
                      type="url"
                      name="GithubUrl"
                      value={formData.GithubUrl}
                      className="flex-1 bg-transparent py-2 sm:py-3 pr-3 sm:pr-4 text-white focus:outline-none text-sm sm:text-base"
                      onChange={handleChange}
                      placeholder="github.com/username"
                    />
                  </div>
                </div>
                <div className="space-y-1 lg:space-y-2">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    LinkedIn URL
                  </label>
                  <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-lg">
                    <span className="px-2 sm:px-3 text-gray-400">
                      <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                    <input
                      type="url"
                      name="linkdlnUrl"
                      value={formData.linkdlnUrl}
                      className="flex-1 bg-transparent py-2 sm:py-3 pr-3 sm:pr-4 text-white focus:outline-none text-sm sm:text-base"
                      onChange={handleChange}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-2 lg:space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs sm:text-sm text-gray-300">
                    Skills
                  </label>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Skill
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2 text-white text-sm sm:text-base"
                        onChange={(e) => handleSkillChange(e, index)}
                        placeholder="Skill name"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="p-1 sm:p-2 text-gray-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-xs sm:text-sm bg-red-900/20 px-3 py-1 sm:px-4 sm:py-2 rounded-lg border border-red-800/50">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-1 lg:pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg flex justify-center items-center text-sm sm:text-base"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* UserCard Preview Section */}
      <div className="w-full lg:w-[35%] flex justify-center lg:justify-end mt-6 lg:mt-0">
        <div className="sticky top-4 max-w-xs sm:max-w-sm w-full">
          <h3 className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 ml-1 flex items-center">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mr-1 sm:mr-2 animate-pulse"></span>
            Live Preview
          </h3>
          <UserCard user={formData} showActions={false} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

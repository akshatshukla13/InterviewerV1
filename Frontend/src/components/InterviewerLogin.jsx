import { useState, useEffect } from 'react';
import axios from 'axios';
import { addUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import AppCard from '@/components/ui/AppCard';
import AppField from '@/components/ui/AppField';
import AppButton from '@/components/ui/AppButton';
import { designTokens } from '@/design/tokens';

const InterviewerLogin = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "akshat",
    email: "",
    password: "akshat123",
    company: "",
    position: "",
    role: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyLogin, setAlreadyLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (alreadyLogin) {
      navigate('/interview-dashboard', { replace: true });
    }

    axios.post(`${BASE_URL}/getCurrentUser/`, {}, {
      withCredentials: true
    })
      .then(response => {
        if (response.data.user?.type === "interviewer") {
          setAlreadyLogin(true);
          navigate('/interview-dashboard', { replace: true });
        }
      })
      .catch(() => { });
  }, [alreadyLogin, navigate]);

  const validate = () => {
    const errors = {};
    const { fullName, userName, email, password, company, position, role } = formData;

    if (!userName.trim()) errors.userName = "Username is required";
    if (!password.trim()) errors.password = "Password is required";

    if (!isLoginForm) {
      if (!fullName.trim()) errors.fullName = "Full name is required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = "Valid email is required";
      if (password.length < 6) errors.password = "Password must be at least 6 characters";
      if (!company.trim()) errors.company = "Company name is required";
      if (!position.trim()) errors.position = "Position is required";
      if (!role.trim()) errors.role = "Role is required";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      const endpoint = isLoginForm ? "/interviewer-login" : "/interviewer-signup";
      const payload = isLoginForm
        ? { userName: formData.userName, password: formData.password }
        : formData;

      const res = await axios.post(`${BASE_URL}${endpoint}`, payload, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className={designTokens.container}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Interviewer Workspace</h1>
            <p className="mt-4 text-slate-600">
              Conduct structured interviews from one platform: schedule, evaluate, and decide faster.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate-700">
              <li>• Unified scheduling, evaluation forms, and live session controls</li>
              <li>• Clear desktop layout with consistent information hierarchy</li>
              <li>• Reduced context switching for better interviewer focus</li>
            </ul>
          </div>

          <AppCard
            title={`${isLoginForm ? "Login" : "Sign Up"} to Interview Platform`}
            description="Use your interviewer account credentials."
          >
            <div className="space-y-4">
          {!isLoginForm && (
            <>
              <AppField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={formErrors.fullName}
              />
              <AppField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
              />
              <AppField
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                error={formErrors.company}
              />
              <AppField
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                error={formErrors.position}
              />
              <AppField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={formErrors.role}
              />
            </>
          )}

          <AppField
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            error={formErrors.userName}
            required
          />
          <AppField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required
          />

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-center text-red-500">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </p>
          )}

          <AppButton
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting
              ? (isLoginForm ? "Logging in..." : "Signing up...")
              : (isLoginForm ? "Login" : "Sign Up")}
          </AppButton>
          
          <p className="text-center mt-3">
            <span
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
                setFormErrors({});
              }}
              className="cursor-pointer font-medium text-blue-600 hover:text-blue-800"
            >
              {isLoginForm ? "New User? Sign up here" : "Existing User? Login here"}
            </span>
          </p>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  );
};

export default InterviewerLogin;

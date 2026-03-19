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

const CandidateLogin = () => {
    const [formData, setFormData] = useState({
        userName: "rishi",
        password: "rishi123"
    });
        
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alreadyLogin, setAlreadyLogin] = useState(false);

    useEffect(() => {
        if (alreadyLogin) {
            navigate('/interview-dashboard', { replace: true });
        }

        axios.post(`${BASE_URL}/getCurrentUser/`, {}, { withCredentials: true })
            .then(response => {
                if (response.data.user?.type === "candidate") {
                    setAlreadyLogin(true);
                    navigate('/interview-dashboard', { replace: true });
                }
            })
            .catch(() => { });
    }, [alreadyLogin, navigate]);

    const validate = () => {
        const { userName, password } = formData;
        const errors = {};

        if (!userName.trim()) errors.userName = "Username is required";
        if (!password.trim()) errors.password = "Password is required";

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
            const res = await axios.post(`${BASE_URL}/candidate-login`, formData, { withCredentials: true });
            dispatch(addUser(res.data));
            navigate("/interview-dashboard");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className={designTokens.container}>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Candidate Portal</h1>
                        <p className="mt-4 text-slate-600">
                            Join interviews faster with a focused dashboard designed for desktop productivity.
                        </p>
                        <ul className="mt-8 space-y-3 text-sm text-slate-700">
                            <li>• View upcoming interviews in a structured list</li>
                            <li>• Join live sessions with a single action</li>
                            <li>• Keep track of your interview status and timeline</li>
                        </ul>
                    </div>

                    <AppCard title="Candidate Login" description="Access your interview dashboard.">
                        <div className="space-y-4">
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
                            {error ? (
                                <p className="text-sm text-red-600">
                                    {typeof error === "string" ? error : JSON.stringify(error)}
                                </p>
                            ) : null}
                            <AppButton className="w-full" onClick={handleSubmit}>
                                Login
                            </AppButton>
                        </div>
                    </AppCard>
                </div>
            </div>
        </div>
    );
};

export default CandidateLogin;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import AppShell from '@/components/layout/AppShell';
import AppCard from '@/components/ui/AppCard';
import AppField from '@/components/ui/AppField';
import AppButton from '@/components/ui/AppButton';
import { dashboardSidebarItems } from '@/design/tokens';

function ScheduleInterview() {
    const [interviewerName, setInterviewerName] = useState('');
    const [interviewerId, setInterviewerId] = useState('');
    const [evalForms, setEvalForms] = useState([]);
    const [loadingForms, setLoadingForms] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [modal, setModal] = useState({ show: false, success: false, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`${BASE_URL}/getCurrentUser/`, {}, { withCredentials: true })
            .then(res => {
                if (res.data.user.type === 'interviewer') {
                    setInterviewerName(res.data.user.userName);
                    setInterviewerId(res.data.user._id);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (interviewerId) {
            axios.post(`${BASE_URL}/getAllEvaluationFormByInterviewerId/${interviewerId}`, {}, { withCredentials: true })
                .then(res => {
                    setEvalForms(res.data.evalForms || []);
                    setLoadingForms(false);
                })
                .catch(err => {
                    console.error('Error fetching evaluation forms:', err);
                    setLoadingForms(false);
                });
        }
    }, [interviewerId]);

    const [formData, setFormData] = useState({
        interviewerUserName: '',
        candidateEmail: '',
        date: '',
        time: '',
        duration: 30,
        timeZone: 'Asia/Kolkata',
        interviewType: 'technical',
        evaluationFormId: '',
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, interviewerUserName: interviewerName }));
    }, [interviewerName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setModal({ show: false, success: false, message: '' });

        try {
            const res = await fetch(`${BASE_URL}/schedule-interview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const result = await res.json();

            if (res.ok) {
                setModal({
                    show: true,
                    success: true,
                    message: `Interview scheduled successfully. Mail sent to ${formData.candidateEmail}!`
                });
            } else {
                setModal({ show: true, success: false, message: result.message || 'Failed to schedule interview.' });
            }
        } catch (error) {
            console.error('Scheduling request failed:', error);
            setModal({ show: true, success: false, message: 'Network error. Please try again.' });
        } finally {
            setLoadingSubmit(false);
        }
    };

    const handleModalClose = () => {
        setModal({ show: false, success: false, message: '' });
        if (modal.success) {
            navigate('/interview-dashboard');
        } else {
            navigate(0);
        }
    };

    const renderFormField = ({ label, name, type = "text", readOnly = false, value, options = null }) =>
        options ? (
            <AppField label={label} name={name}>
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={readOnly}
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </AppField>
        ) : (
            <AppField
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                readOnly={readOnly}
                min={type === "number" ? 5 : undefined}
                required
            />
        );

    return (
        <AppShell
            title="Schedule Interview"
            subtitle="Create a new interview with consistent, form-first desktop UX."
            sidebarItems={dashboardSidebarItems.interviewer}
            topActions={
                <AppButton variant="outline" onClick={() => navigate('/interview-dashboard')}>
                    <FiX className="mr-2 h-4 w-4" />
                    Close
                </AppButton>
            }
        >
            <AppCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                            {renderFormField({
                                label: "Interviewer Username",
                                name: "interviewerUserName",
                                readOnly: true,
                                value: formData.interviewerUserName
                            })}

                            {renderFormField({
                                label: "Candidate Email",
                                name: "candidateEmail",
                                type: "email",
                                value: formData.candidateEmail
                            })}

                            {renderFormField({
                                label: "Interview Type",
                                name: "interviewType",
                                value: formData.interviewType,
                                options: [
                                    { value: "technical", label: "Technical" },
                                    { value: "behavioral", label: "Behavioral" },
                                    { value: "system-design", label: "System Design" },
                                    { value: "coding", label: "Coding" }
                                ]
                            })}

                            {renderFormField({
                                label: "Time Zone",
                                name: "timeZone",
                                value: formData.timeZone,
                                options: [
                                    { value: "Asia/Kolkata", label: "India (IST)" },
                                    { value: "America/New_York", label: "Eastern Time (ET)" },
                                    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
                                    { value: "Europe/London", label: "London (GMT)" }
                                ]
                            })}

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-900 mb-1">
                                    Evaluation Form
                                </label>
                                {loadingForms ? (
                                    <div className="flex items-center space-x-2 text-gray-500 py-3">
                                        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Loading evaluation forms...</span>
                                    </div>
                                ) : (
                                    <select
                                        name="evaluationFormId"
                                        value={formData.evaluationFormId}
                                        onChange={handleChange}
                                        className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        required
                                    >
                                        <option value="">Select an evaluation form</option>
                                        {evalForms.map(form => (
                                            <option key={form._id} value={form.formName}>
                                                {form.formName}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {renderFormField({
                                label: "Date",
                                name: "date",
                                type: "date",
                                value: formData.date
                            })}

                            {renderFormField({
                                label: "Time",
                                name: "time",
                                type: "time",
                                value: formData.time
                            })}

                            {renderFormField({
                                label: "Duration (minutes)",
                                name: "duration",
                                type: "number",
                                value: formData.duration
                            })}
                        </div>

                    <div className="pt-4">
                            <AppButton
                                type="submit"
                                disabled={loadingSubmit}
                                className="w-full"
                            >
                                {loadingSubmit ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Scheduling...
                                    </span>
                                ) : (
                                    'Schedule Interview'
                                )}
                            </AppButton>
                    </div>
                </form>
            </AppCard>

            {modal.show && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="relative bg-white rounded-2xl max-w-md w-full mx-4 sm:mx-auto overflow-hidden shadow-xl transform transition-all">
                        <div className="bg-white px-6 pt-5 pb-6">
                            <div className="flex items-center justify-center mb-4">
                                {modal.success ? (
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                ) : (
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <FiAlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-900">{modal.success ? 'Success!' : 'Error'}</h2>
                                <p className="mt-2 text-sm text-gray-500">{modal.message}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3">
                            <AppButton
                                type="button"
                                className="w-full"
                                onClick={handleModalClose}
                            >
                                OK
                            </AppButton>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}

export default ScheduleInterview;

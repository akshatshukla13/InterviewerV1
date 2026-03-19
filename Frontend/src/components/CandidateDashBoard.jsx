/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaVideo, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import { BASE_URL } from '@/utils/constants';
import AppShell from '@/components/layout/AppShell';
import AppCard from '@/components/ui/AppCard';
import AppButton from '@/components/ui/AppButton';
import { dashboardSidebarItems } from '@/design/tokens';

function CandidateDashBoard({ candidateID }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const joinInterview = (interviewID) => {
    navigate(`/lobby/${interviewID}`);
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      if (candidateID) {
        try {
          const response = await axios.get(
            `${BASE_URL}/view-interview-for-candidate/${candidateID}`,
            { withCredentials: true }
          );
          setInterviews(response.data.interviews || []);
          setLoading(false);
        } catch {
          setLoading(false);
        }
      }
    };

    fetchInterviews();
  }, [candidateID]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  return (
    <AppShell
      title="Candidate Dashboard"
      subtitle="Track your interview schedule and join active sessions quickly."
      sidebarItems={dashboardSidebarItems.candidate}
    >
      <AppCard title="Candidate Interviews" description="Upcoming and completed interview sessions">
        {interviews.length === 0 ? (
          <p className="py-8 text-center text-slate-600">No interviews scheduled yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {interviews.map((interview) => {
              const interviewDate = new Date(interview.scheduledAt);
              const isCompleted = interview.status === 'completed';

              return (
                <div
                  key={interview._id} 
                  className={`rounded-xl border p-5 ${
                    isCompleted ? 'border-green-200 bg-green-50/40' : 'border-blue-200 bg-white'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {interview.interviewType}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {isCompleted ? (
                          <>
                            <FaCheckCircle className="inline mr-1" /> Completed
                          </>
                        ) : (
                          <>
                            <FaHourglassHalf className="inline mr-1" /> Pending
                          </>
                        )}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span>{interviewDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-400" />
                        <span>{interviewDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      <div>
                        <span>Duration: {interview.durationMinutes} mins</span>
                      </div>
                    </div>
                    
                    {!isCompleted ? (
                      <AppButton
                        onClick={() => joinInterview(interview._id)}
                        className="w-full"
                      >
                        <FaVideo className="mr-2" /> Join Interview
                      </AppButton>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AppCard>
    </AppShell>
  );
}

export default CandidateDashBoard;

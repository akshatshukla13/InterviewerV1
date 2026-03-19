/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiLink, FiCheckCircle, FiVideo, FiPlus } from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BASE_URL } from '@/utils/constants';
import AppShell from '@/components/layout/AppShell';
import AppCard from '@/components/ui/AppCard';
import AppButton from '@/components/ui/AppButton';
import { dashboardSidebarItems } from '@/design/tokens';

function InterviewerDashBoard({ interviewerId }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cacheRef = useRef(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (interviewerId) {
        if (cacheRef.current) {
          setInterviews(cacheRef.current);
          setLoading(false);
        } else {
          try {
            const response = await axios.get(
              `${BASE_URL}/view-interviews-for-interviewer/${interviewerId}`,
              { withCredentials: true }
            );
            setInterviews(response.data.interviews);
            cacheRef.current = response.data.interviews;
            setLoading(false);
            } catch {
              setLoading(false);
            }
          }
      }
    };

    fetchInterviews();
  }, [interviewerId]);

  const joinInterview = (interviewID) => {
    navigate(`/lobby/${interviewID}`);
  };

  const scheduleNewInterview = () => {
    navigate('/schedule-interview');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl text-gray-600 flex items-center space-x-2">
        <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading interviews...</span>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" /> Completed
          </span>
        );
      case 'Ongoing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <FiVideo className="mr-1" /> Ongoing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <FiClock className="mr-1" /> Scheduled
          </span>
        );
    }
  };

  const topActions = (
    <div className="flex flex-wrap gap-2">
      <AppButton
        onClick={() => navigate("/evalForm")}
        className="whitespace-nowrap"
      >
        <FiPlus className="mr-2" />
        Manage Evaluation Forms
      </AppButton>
      <AppButton onClick={scheduleNewInterview} variant="outline" className="whitespace-nowrap">
        <FiPlus className="mr-2" />
        Schedule Interview
      </AppButton>
    </div>
  );

  return (
    <AppShell
      title="Interviewer Dashboard"
      subtitle="Schedule interviews, monitor statuses, and launch sessions from one place."
      sidebarItems={dashboardSidebarItems.interviewer}
      topActions={topActions}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AppCard title="Total Interviews">
          <p className="text-3xl font-bold text-slate-900">{interviews.length}</p>
        </AppCard>
        <AppCard title="Upcoming">
          <p className="text-3xl font-bold text-blue-600">{interviews.filter(i => i.status === 'scheduled').length}</p>
        </AppCard>
        <AppCard title="Completed">
          <p className="text-3xl font-bold text-green-600">{interviews.filter(i => i.status === 'completed').length}</p>
        </AppCard>
      </div>

      <AppCard title="Your Interviews" description="Sorted by schedule with quick session actions.">
        {interviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 text-lg text-gray-500">No interviews scheduled yet</div>
            <AppButton onClick={scheduleNewInterview}>
              Schedule Your First Interview
            </AppButton>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {interviews.map((interview) => (
              <div key={interview._id} className="flex flex-col justify-between gap-4 p-6 xl:flex-row">
                <div className="mb-2 xl:mb-0">
                  <div className="mb-2 flex items-center space-x-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {interview.interviewType}
                    </span>
                    {getStatusBadge(interview.status)}
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    <FaChalkboardTeacher className="mr-2 inline text-blue-600" />
                    Interview with {interview?.candidateId?.email || 'Candidate'}
                  </h3>
                  <div className="flex flex-col text-sm text-gray-500 sm:flex-row sm:space-x-6">
                    <div className="mb-2 flex items-center sm:mb-0">
                      <FiCalendar className="mr-1 text-gray-400" />
                      {new Date(new Date(interview.scheduledAt).getTime() - 5.5 * 60 * 60 * 1000).toLocaleString()}
                    </div>
                    <div className="mb-2 flex items-center sm:mb-0">
                      <FiClock className="mr-1 text-gray-400" />
                      {interview.durationMinutes} minutes
                    </div>
                    {interview.meetingLink ? (
                      <div className="flex items-center">
                        <FiLink className="mr-1 text-gray-400" />
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 transition-colors hover:text-blue-800"
                        >
                          Meeting Link
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center">
                  <AppButton
                    onClick={() => joinInterview(interview._id)}
                    className="w-full xl:w-auto"
                  >
                    <FiVideo className="mr-2" />
                    {interview.status === 'completed' ? 'View Details' : 'Join Interview'}
                  </AppButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </AppCard>
    </AppShell>
  );
}

export default InterviewerDashBoard;

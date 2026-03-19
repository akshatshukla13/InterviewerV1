import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import { designTokens } from '@/design/tokens';
import AppButton from '@/components/ui/AppButton';

export default function Navbar() {
  const [isCandidate, setIsCandidate] = useState(false);
  const [isInterviewer, setIsInterviewer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${BASE_URL}/getCurrentUser/`, {}, {
      withCredentials: true
    })
      .then(response => {
        if (response.data?.user?.type === 'candidate') {
          setIsCandidate(true);
        } else if (response.data?.user?.type === 'interviewer') {
          setIsInterviewer(true);
        }
      })
      .catch(error => console.error("Error fetching current user:", error));
  }, []);

  const handleLogout = () => {
    axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      .then(() => {
        setIsCandidate(false);
        setIsInterviewer(false);
        navigate('/');
      })
      .catch(err => console.error("Logout failed:", err));
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className={designTokens.container}>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold tracking-tight text-slate-900">CodeInterview.Tech</span>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isCandidate && (
              <Link to="/interview-dashboard">
                <AppButton>Candidate Dashboard</AppButton>
              </Link>
            )}
            
            {isInterviewer && (
              <Link to="/interview-dashboard">
                <AppButton>Interviewer Dashboard</AppButton>
              </Link>
            )}

            {(isCandidate || isInterviewer) ? (
              <AppButton onClick={handleLogout} variant="outline">Logout</AppButton>
            ) : (
              <div className="relative group">
                <AppButton>
                  Get Started
                </AppButton>
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out border border-gray-200 overflow-hidden">
                  <li>
                    <Link to="/candidate-signup" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">
                      As Candidate
                    </Link>
                  </li>
                  <li>
                    <Link to="/interviewer-signup" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 font-medium">
                      As Interviewer
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

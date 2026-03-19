import { useEffect, useState } from 'react'
import CandidateDashBoard from './CandidateDashBoard';
import InterviewerDashBoard from './InterviewerDashBoard';
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

function InterviewDashBoard() {

  const [isCandidate, setIsCandidate] = useState(false)
  const [isInterviewer, setIsInterviewer] = useState(false)
  const [candidateID, setCandidateId] = useState(false)
  const [interviewerId, setInterviewerId] = useState(false)

  useEffect(() => {
    axios.post(`${BASE_URL}/getCurrentUser/`, {}, {
      withCredentials: true
    })
    .then(response => {
      if(response.data.user.type === "candidate"){
        setIsCandidate(true)
        setCandidateId(response.data.user._id)
      }
      if(response.data.user.type === "interviewer"){
        setIsInterviewer(true)
        setInterviewerId(response.data.user._id)
      }
    })
    .catch(error => console.error("Error fetching current user:", error));
    
  }, [])

  return (
    <>
      {isInterviewer && <InterviewerDashBoard interviewerId={interviewerId} />}
      {isCandidate && <CandidateDashBoard candidateID={candidateID} />}
    </>
  )
}

export default InterviewDashBoard;

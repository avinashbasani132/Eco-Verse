// frontend/src/components/MissionView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const MissionView = ({ username, updateLocalUser }) => {
  const { worldNumber } = useParams();
  const navigate = useNavigate();

  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMission();
  }, [worldNumber]);

  const fetchMission = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/mission/${worldNumber}`);
      setMissionData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch mission:", err);
      setFeedback({ type: 'error', message: 'Core API timeout. Please return and try again.' });
      setLoading(false);
    }
  };

  const handleOptionSelect = (index) => {
    if (feedback) return; // Prevent selection after submit
    setSelectedOption(index);
  };

  const handleSubmit = async () => {
    if (selectedOption === null) return;
    setIsSubmitting(true);

    const isCorrect = selectedOption === missionData.question.correctAnswerIndex;

    try {
      const res = await axios.post('http://localhost:5000/api/submit', {
        username,
        isCorrect
      });

      if (isCorrect) {
        setFeedback({ type: 'success', message: res.data.message });
        await updateLocalUser(username); // Refresh state
        setTimeout(() => navigate('/dashboard'), 2500);
      } else {
        setFeedback({ type: 'error', message: res.data.message });
        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
        }, 2000); // Reset for another attempt
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setFeedback({ type: 'error', message: "Submission failed. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-pulse">
        <Loader2 className="w-16 h-16 text-nature-accent animate-spin" />
        <h2 className="text-xl font-bold tracking-widest text-nature-leaf uppercase">Synthesizing Mission Details...</h2>
        <p className="text-sm text-gray-400">Communicating with the OpenAI neural net</p>
      </div>
    );
  }

  if (!missionData && !loading && !feedback) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-red-400 text-2xl mb-4">Transmission Error</h2>
        <button onClick={() => navigate('/dashboard')} className="secondary-btn">Return to Map</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-[slide-up_0.5s_ease-out]">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-semibold uppercase tracking-wider">Abort Mission</span>
      </button>

      {feedback && feedback.type === 'success' && (
        <div className="bg-nature-green/20 border border-nature-green text-nature-leaf p-6 rounded-2xl mb-8 flex items-center gap-4 animate-[bounce-in_0.5s_ease-out] shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <CheckCircle className="w-10 h-10" />
          <div>
            <h3 className="text-2xl font-bold">Protocol Success!</h3>
            <p className="text-gray-200">{feedback.message}</p>
            <p className="text-xs text-nature-leaf/80 mt-1 animate-pulse">Routing back to Core Dashboard...</p>
          </div>
        </div>
      )}

      {feedback && feedback.type === 'error' && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl mb-8 flex items-center gap-4 animate-[shake_0.5s_ease-in-out]">
          <XCircle className="w-8 h-8" />
          <div>
            <h3 className="font-bold">Logic Error Detected</h3>
            <p className="text-sm">{feedback.message}</p>
          </div>
        </div>
      )}

      <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-nature-accent/20 rounded-full blur-[80px]"></div>

        <div className="inline-block bg-white/10 px-3 py-1 rounded border border-white/20 text-xs font-bold tracking-widest text-nature-accent mb-6">
          WORLD {worldNumber} DATALOG
        </div>

        <h2 className="text-3xl font-bold mb-6 text-white leading-snug drop-shadow-sm">System Scenario</h2>
        <p className="text-lg text-gray-300 mb-10 leading-relaxed border-l-4 border-nature-leaf pl-6 italic">
          "{missionData?.missionText}"
        </p>

        <div className="bg-black/30 p-6 rounded-2xl border border-white/5 shadow-inner">
          <h3 className="text-xl font-semibold mb-6 text-nature-leaf flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-nature-accent animate-pulse-glow"></span>
            {missionData?.question?.text}
          </h3>

          <div className="space-y-3">
            {missionData?.question?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`
                   w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group
                   ${selectedOption === index
                    ? 'bg-nature-green/20 border-nature-green text-white shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-[1.02]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-nature-leaf/50 hover:text-white'}
                 `}
              >
                <div className={`
                   w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors
                   ${selectedOption === index ? 'bg-nature-green border-nature-green text-black' : 'border-gray-500 group-hover:border-nature-leaf'}
                 `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-medium text-lg leading-snug">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitting || (feedback && feedback.type === 'success')}
            className="primary-btn flex items-center gap-2 shadow-lg"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Execute Solution"
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default MissionView;

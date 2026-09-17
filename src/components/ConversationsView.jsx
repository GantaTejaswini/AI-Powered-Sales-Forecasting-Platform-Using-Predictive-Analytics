import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, FileText, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ConversationsView() {
  const [accountName, setAccountName] = useState('TechCorp Solutions');
  const [transcript, setTranscript] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeMeeting = async () => {
    if (!transcript.trim()) {
      alert('Kripya pehle meeting transcript paste karein!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Backend FastAPI endpoint call
      const response = await axios.post('http://127.0.0.1:8000/api/analyse-meeting', {
        account_name: accountName,
        transcript: transcript
      });
      setReport(response.data);
    } catch (err) {
      console.error('Backend connection failed:', err);
      // Demo fallback agar backend offline ho
      setReport({
        summary: "Meeting focused on cloud migration and AI adoption. Client expressed strong interest in predictive lead scoring.",
        action_items: [
          "Send product architecture overview by Friday",
          "Schedule technical deep-dive call with CTO",
          "Share pricing tier for enterprise tier"
        ],
        sentiment: "Positive / High Intent"
      });
      setError('Backend server abhi offline hai (127.0.0.1:8000). Showing fallback preview!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Conversations Intelligence</h2>
        <p className="text-sm text-gray-500">Analyze meeting transcripts and pitch calls using AI engine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Form */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Prospect / Account Name
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Meeting Transcript
            </label>
            <textarea
              rows={10}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste the call transcript or meeting notes here..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <button
            onClick={handleAnalyzeMeeting}
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Analyzing with AI...' : 'Analyze Meeting with AI'}</span>
          </button>

          {error && (
            <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
              {error}
            </p>
          )}
        </div>

        {/* Right Report Panel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Meeting Intelligence Report</span>
          </h3>

          {!report ? (
            <div className="h-80 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-center p-6">
              <MessageSquare className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium">No meeting analyzed yet</p>
              <p className="text-xs">Paste transcript on the left and click "Analyze Meeting with AI".</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Sentiment</span>
                <p className="mt-1 inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                  {report.sentiment || 'Positive'}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Executive Summary</span>
                <p className="text-sm text-gray-700 mt-1.5 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {report.summary || report.meeting_summary || JSON.stringify(report)}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Action Items</span>
                <ul className="mt-2 space-y-2">
                  {(report.action_items || [
                    "Follow up on architectural specs",
                    "Share customized pricing proposal"
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
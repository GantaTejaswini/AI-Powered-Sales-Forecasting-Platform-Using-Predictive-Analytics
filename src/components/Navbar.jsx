import React from 'react';
import { Search, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'leads', label: 'Leads' },
    { id: 'outreach', label: 'Outreach' },
    { id: 'conversations', label: 'Conversations' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 leading-tight">
            AI-Powered Sales Forecasting Platform
          </h1>
          <p className="text-xs text-gray-500">
            Using Predictive Analysis
          </p>
        </div>
      </div>

      <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="relative w-64">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search prospects..."
          className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>
    </header>
  );
}
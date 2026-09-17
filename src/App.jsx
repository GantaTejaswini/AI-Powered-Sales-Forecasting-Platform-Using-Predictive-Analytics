import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LeadsView from './components/LeadsView';
import OutreachView from './components/OutreachView';
import ConversationsView from './components/ConversationsView';
import DashboardView from './components/DashboardView';

export default function App() {
  const [activeTab, setActiveTab] = useState('leads');
  const [selectedLeadForOutreach, setSelectedLeadForOutreach] = useState(null);

  const handleGenerateOutreach = (lead) => {
    setSelectedLeadForOutreach(lead);
    setActiveTab('outreach');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === 'leads' && (
          <LeadsView onGenerateOutreach={handleGenerateOutreach} />
        )}
        {activeTab === 'outreach' && (
          <OutreachView initialLead={selectedLeadForOutreach} />
        )}
        {activeTab === 'conversations' && <ConversationsView />}
        {activeTab === 'dashboard' && <DashboardView />}
      </main>
    </div>
  );
}
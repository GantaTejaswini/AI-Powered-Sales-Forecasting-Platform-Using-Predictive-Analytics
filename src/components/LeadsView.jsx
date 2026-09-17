import React, { useState } from 'react';
import { Search, Send, Users, Building, Mail, Phone } from 'lucide-react';

export default function LeadsView({ onGenerateOutreach }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState({
    id: 1,
    companyName: 'TechCorp Solutions',
    contactPerson: 'Sarah Johnson',
    role: 'CTO',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 234-5678',
    status: 'High Intent',
    companySize: '250-500',
    industry: 'Enterprise SaaS',
    score: 92,
    insights: 'Recently announced expansion into AI infrastructure. Looking for sales automation tools.'
  });

  const leadsList = [
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      contactPerson: 'Sarah Johnson',
      role: 'CTO',
      email: 'sarah.j@techcorp.com',
      phone: '+1 (555) 234-5678',
      status: 'High Intent',
      companySize: '250-500',
      industry: 'Enterprise SaaS',
      score: 92,
      insights: 'Recently announced expansion into AI infrastructure. Looking for sales automation tools.'
    },
    {
      id: 2,
      companyName: 'Apex Financial',
      contactPerson: 'Michael Chen',
      role: 'Head of Growth',
      email: 'mchen@apexfin.io',
      phone: '+1 (555) 876-5432',
      status: 'Engaged',
      companySize: '50-100',
      industry: 'Fintech',
      score: 78,
      insights: 'Raised Series B last quarter. Scaling the outbound business development team.'
    },
    {
      id: 3,
      companyName: 'HealthPulse AI',
      contactPerson: 'Emily Davis',
      role: 'VP Sales',
      email: 'edavis@healthpulse.ai',
      phone: '+1 (555) 345-6789',
      status: 'Cold Lead',
      companySize: '100-250',
      industry: 'Healthcare Tech',
      score: 64,
      insights: 'Evaluating new CRM solutions for upcoming quarter.'
    }
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Sidebar: Leads List */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Prospect Leads</h2>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-1 rounded-full">
              {leadsList.length} Leads
            </span>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
          {leadsList
            .filter((l) =>
              l.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              l.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedLead?.id === lead.id ? 'bg-blue-50/60 border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-sm">{lead.companyName}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {lead.score}% Score
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 font-medium">{lead.contactPerson} · {lead.role}</p>
                <p className="text-xs text-gray-400 mt-1">{lead.industry}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Right Content: Lead Details */}
      <div className="w-2/3 p-6 overflow-y-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
              {selectedLead.status}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{selectedLead.companyName}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{selectedLead.contactPerson} · {selectedLead.role}</p>
          </div>
          <button
            onClick={() => onGenerateOutreach && onGenerateOutreach(selectedLead)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 mr-1" />
            <span>Generate Outreach</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Company Size</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{selectedLead.companySize} employees</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <Building className="w-4 h-4" />
              <span className="text-xs font-medium">Industry</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{selectedLead.industry}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <Mail className="w-4 h-4" />
              <span className="text-xs font-medium">Email Address</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{selectedLead.email}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-2 text-gray-500 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-medium">Phone Number</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">{selectedLead.phone}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">AI Prospect Insights</h3>
          <p className="text-sm text-gray-600 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            {selectedLead.insights}
          </p>
        </div>
      </div>
    </div>
  );
}
// frontend/app/dashboard/events/page.tsx

'use client';

import React, { useState } from 'react';
import { CalendarDaysIcon, MagnifyingGlassIcon, ListBulletIcon, TableCellsIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface EventItem {
  id: number;
  date: string; 
  category: string; 
  title: string;
  time: string; 
}

const eventsData: EventItem[] = [
  // ... your empty array data structure is fine here
];


const UpcomingEventsPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEvents = eventsData.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const groupedEvents = filteredEvents.reduce((acc: Record<string, EventItem[]>, event: EventItem) => {
    const month = event.date.substring(0, 3);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(event);
    return acc;
  }, {});

  // --- Render Functions ---

  const renderEventList = () => {
    
    if (filteredEvents.length === 0) {
      return (
        <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 text-center mt-8">
          <ClipboardDocumentListIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">No Upcoming Events Found</h3>
          <p className="mt-2 text-gray-600">
            Check back later! Upcoming events, such as registration dates and campus activities, will appear here once the administrator publishes them.
          </p>
        </div>
      );
    }
    
    // Renders if events exist after filtering
    return Object.entries(groupedEvents).map(([month, events]: [string, EventItem[]]) => (
      <div key={month} className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{month}</h2>
        <div className="space-y-4">
          {events.map((event: EventItem) => ( 
            <div key={event.id} className="flex bg-white p-4 rounded-xl shadow-md transition duration-150 hover:shadow-lg hover:border-blue-300 border border-gray-100">
              <div className="flex-shrink-0 w-24 text-center">
                <p className="text-3xl font-bold text-blue-600">{event.date.split(' ')[1]}</p>
                <p className="text-sm font-semibold text-gray-500">{month}</p>
              </div>
              <div className="ml-6 border-l pl-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">{event.category}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };


  // --- Main Render ---

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <CalendarDaysIcon className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
      </div>

      {/* Controls Section */}
      <div className="flex justify-between items-center space-x-4">
        
        {/* Search Bar */}
        <div className="relative flex-grow max-w-lg">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-500"
          />
        </div>
        
        {/* View Switcher (List/Calendar) */}
        <div className="flex space-x-2">
          
          {/* List View Button */}
          <button
            onClick={() => setView('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition duration-150 ${
              view === 'list' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ListBulletIcon className="h-5 w-5" />
            <span>List View</span>
          </button>
          
          {/* Calendar View Button */}
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition duration-150 ${
              view === 'calendar' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            // REMOVED: The 'disabled' attribute is removed, allowing the button to be clicked.
          >
            <TableCellsIcon className="h-5 w-5" />
            <span>Calendar View</span>
          </button>
        </div>
      </div>

      {/* Events List / Empty State */}
      {view === 'list' && renderEventList()}

      {/* Placeholder for Calendar View */}
      {view === 'calendar' && (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-8">
          <p className="text-gray-500">Calendar View feature coming soon!</p>
        </div>
      )}
      
    </div>
  );
};

export default UpcomingEventsPage;
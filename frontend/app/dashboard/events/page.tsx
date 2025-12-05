// frontend/app/dashboard/events/page.tsx

'use client';

import React, { useState } from 'react';
// CORRECTED IMPORTS: Three steps up to reach the components folder
import Header from '../../../components/Header';
import EventCard from '../../../components/EventCard';
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline';

const eventsData = [
  { month: 'OCT', day: 25, category: 'ACADEMICS', title: 'Fall Semester Registration', location: 'Online Portal | 11:59 PM' },
  { month: 'OCT', day: 28, category: 'CAREER', title: 'University Career Fair', location: 'Main Gymnasium | 10:00 AM' },
  { month: 'NOV', day: 5, category: 'SOCIAL', title: 'Homecoming Bonfire', location: 'Central Quad | 7:00 PM' },
  { month: 'NOV', day: 12, category: 'ACADEMICS', title: 'Mid-Term Examination Week', location: 'Various Locations' },
  { month: 'DEC', day: 1, category: 'SPORTS', title: 'Basketball Tryouts', location: 'Main Court | 6:00 PM' },
  { month: 'DEC', day: 15, category: 'SOCIAL', title: 'Winter Gala Dinner', location: 'Grand Ballroom | 7:30 PM' },
];

const groupEventsByMonth = (events: typeof eventsData) => {
  return events.reduce((acc, event) => {
    const monthKey = event.month;
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(event);
    return acc;
  }, {} as Record<string, typeof eventsData>);
};

const EventsPage: React.FC = () => {
  const [activeView, setActiveView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = eventsData.filter(event => {
    const term = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term)
    );
  });

  const groupedEvents = groupEventsByMonth(filteredEvents);

  return (
    // We only return the content now. The Layout (Header/Sidebar/Outer Div) wraps this.
    <div className="pt-0 pb-12">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
          <Bars3Icon className="h-7 w-7 text-gray-700 lg:hidden cursor-pointer" />
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-inner text-gray-900" 
          />
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex bg-gray-200 rounded-full p-1 mb-8 w-fit shadow-inner">
          <button
            className={`py-2 px-6 text-center rounded-full transition-colors duration-200 ${
              activeView === 'list' ? 'bg-white text-blue-600 font-bold shadow-md' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveView('list')}
          >
            List View
          </button>
          <button
            className={`py-2 px-6 text-center rounded-full transition-colors duration-200 ${
              activeView === 'calendar' ? 'bg-white text-blue-600 font-bold shadow-md' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveView('calendar')}
          >
            Calendar View
          </button>
        </div>

        {activeView === 'list' && (
          <div>
            {filteredEvents.length > 0 ? (
              Object.keys(groupedEvents).map(month => (
                <div key={month} className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">{month.toLowerCase()}</h2>
                  {groupedEvents[month].map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              ))
            ) : (
              <div className="p-10 text-center bg-white rounded-xl shadow-md">
                <p className="text-xl text-gray-600">No events found matching your search.</p>
                <p className="text-sm text-gray-400 mt-2">Try a different keyword.</p>
              </div>
            )}
          </div>
        )}

        {activeView === 'calendar' && (
          <div className="p-10 text-center bg-white rounded-xl shadow-md">
            <p className="text-gray-500">Calendar view implementation goes here.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventsPage;
// frontend/components/EventCard.tsx

import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

interface Event {
  month: string;
  day: number;
  category: string;
  title: string;
  location: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden mb-4 p-4 border border-gray-100 hover:shadow-lg transition duration-200">
      
      {/* Date Block */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2 mr-4">
        <span className="text-xs font-semibold uppercase text-blue-600">{event.month}</span>
        <span className="text-3xl font-bold text-gray-900">{event.day.toString().padStart(2, '0')}</span>
      </div>

      {/* Event Details */}
      <div className="flex-grow">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">{event.category}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
        <p className="text-sm text-gray-600">{event.location}</p>
      </div>

      {/* Calendar Icon */}
      <div className="flex-shrink-0 pt-3 pl-4">
        <CalendarIcon className="h-6 w-6 text-blue-600 hover:text-blue-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default EventCard;
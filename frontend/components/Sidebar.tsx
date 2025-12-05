// frontend/components/Sidebar.tsx

import React from 'react';
import Link from 'next/link';
import { UserIcon, BookOpenIcon, AcademicCapIcon, DocumentTextIcon, HomeIcon, CreditCardIcon, CalendarDaysIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

const mainNavigation: SidebarLink[] = [
  { name: 'Student Profile', href: '/profile', icon: UserIcon },
  { name: 'Enrollment Record', href: '/enrollment', icon: BookOpenIcon },
  { name: 'Academic History', href: '/history', icon: AcademicCapIcon },
  { name: 'Upcoming Events', href: '/events', icon: CalendarDaysIcon }, // Link to your existing page
];

const academicSubMenu: SidebarLink[] = [
  { name: 'Curriculum', href: '/academics/curriculum', icon: AcademicCapIcon },
  { name: 'Registration', href: '/academics/registration', icon: DocumentTextIcon },
  { name: 'Course Audit', href: '/academics/audit', icon: DocumentTextIcon },
  { name: 'Payment', href: '/academics/payment', icon: CreditCardIcon },
];

const requestSubMenu: SidebarLink[] = [
  { name: 'Add/Drop', href: '/request/add-drop', icon: LifebuoyIcon },
  { name: 'Withdrawal', href: '/request/withdrawal', icon: LifebuoyIcon },
  { name: 'Clearances', href: '/request/clearances', icon: LifebuoyIcon },
  { name: 'Complaint Request', href: '/request/complaint', icon: LifebuoyIcon },
  { name: 'Course Exemption', href: '/request/exemption', icon: LifebuoyIcon },
];

const otherLinks: SidebarLink[] = [
  { name: 'Dormitory', href: '/dormitory', icon: HomeIcon },
];


const Sidebar: React.FC = () => {
  const renderLinks = (links: SidebarLink[]) => (
    <ul className="space-y-1">
      {links.map((item) => (
        <li key={item.name}>
          <Link href={item.href} className="group flex items-center p-2 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-150">
            <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-blue-600 transition duration-150" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-col w-64 border-r border-gray-200 bg-white fixed h-full pt-20">
      <div className="flex-grow overflow-y-auto px-4 py-4">
        
        {/* Main Navigation */}
        <nav className="space-y-6">
          {renderLinks(mainNavigation)}
        </nav>

        {/* Academics Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Academics</h3>
          <nav className="mt-2 space-y-1">
            {renderLinks(academicSubMenu)}
          </nav>
        </div>

        {/* Requests Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Requests</h3>
          <nav className="mt-2 space-y-1">
            {renderLinks(requestSubMenu)}
          </nav>
        </div>
        
        {/* Other Links */}
        <div className="mt-8">
          <nav className="space-y-1">
            {renderLinks(otherLinks)}
          </nav>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
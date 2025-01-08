import { BarChart2, FileText, Users, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  title: string;
  href: string;
  icon: JSX.Element;
}

export default function DashboardNav() {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      title: 'Overview',
      href: '/overview',
      icon: <BarChart2 className="w-4 h-4" />,
    },
    {
      title: 'Medical Reports',
      href: '/reports',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      title: 'Patients Overview',
      href: '/patients',
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: 'Diagnose',
      href: '/diagnose',
      icon: <Stethoscope className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white dark:bg-[#1C1C1C] rounded-lg shadow-lg dark:shadow-[#000000]/10 p-4 mb-6">
      <div className="flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors relative',
                'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:transition-all',
                location.pathname === item.href
                  ? 'text-blue-600 dark:text-blue-400 after:bg-blue-600 dark:after:bg-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 after:bg-transparent hover:after:bg-blue-600/50 dark:hover:after:bg-blue-400/50'
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-64 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
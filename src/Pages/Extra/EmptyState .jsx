
import React from 'react';
import { FaBook } from 'react-icons/fa6';
import { FiFolder, FiInbox, FiFileText, FiBookOpen, FiCalendar } from 'react-icons/fi';

const iconMap = {
  folder: FiFolder,
  inbox: FiInbox,
  file: FiFileText,
  book: FiBookOpen,
  calendar: FiCalendar,
  book2:FaBook
};

const EmptyState = ({ icon = 'folder', title = 'Nothing Found', message = 'There is no data to display.' }) => {
  const IconComponent = iconMap[icon] || FiFolder;

  return (
    <div className="flex flex-col items-center justify-center text-gray-600 border border-[#3d53eb] m-6 p-16 rounded-lg bg-gray-50 shadow">
      <IconComponent className="text-5xl text-[#3d53eb] mb-3" />
      <p className="text-xl roboto font-semibold text-center">{title}</p>
      <p className="text-sm roboto text-gray-500 mt-2 text-center">{message}</p>
    </div>
  );
};

export default EmptyState;

import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';




export default function Layout() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateStore={() => navigate('/stores')}
        />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


import React, { useState, useEffect, useCallback } from 'react';
import { Clock, History, Settings as SettingsIcon, PlusCircle } from 'lucide-react';
import { MedicationLog, Settings, AppState, Season } from './types';
import Dashboard from './components/Dashboard';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import ReminderOverlay from './components/ReminderOverlay';
import LogForm from './components/LogForm';

const STORAGE_KEY = 'allerease_v3_data';

const DEFAULT_SETTINGS: Settings = {
  reminderTime: '08:00',
  vibrationEnabled: true,
  soundEnabled: true,
  inventoryCount: 5,
  totalBottles: 10,
  startDate: new Date().toISOString().split('T')[0],
};

const getSeason = (date: Date): Season => {
  const month = date.getMonth() + 1;
  if ([3, 4, 5].includes(month)) return '春';
  if ([6, 7, 8].includes(month)) return '夏';
  if ([9, 10, 11].includes(month)) return '秋';
  return '冬';
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'settings'>('dashboard');
  const [showLogForm, setShowLogForm] = useState(false);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      logs: [],
      settings: DEFAULT_SETTINGS,
      isSnoozed: false,
      snoozeUntil: null
    };
  });

  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const today = now.toISOString().split('T')[0];
      const alreadyTakenToday = state.logs.some(log => log.dateString === today);
      
      const shouldTrigger = currentTime === state.settings.reminderTime && !alreadyTakenToday;
      const isSnoozeExpired = state.snoozeUntil && now.getTime() >= state.snoozeUntil;

      if ((shouldTrigger && !state.isSnoozed) || isSnoozeExpired) {
        setShowReminder(true);
        if (state.settings.vibrationEnabled) {
          navigator.vibrate?.([200, 100, 200]);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [state]);

  const handleQuickConfirm = useCallback(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const existingLog = state.logs.find(l => l.dateString === today);
    
    if (existingLog) return;

    const newLog: MedicationLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      dateString: today,
      status: 'taken',
      treatments: { antiHistamine: true, nasalSpray: true, nasalWash: false },
      symptoms: { sneezing: '轻微', runnyNose: '干爽的一天', congestion: '几乎是正常人' },
      exercise: '未运动',
      season: getSeason(now)
    };

    setState(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs],
      isSnoozed: false,
      snoozeUntil: null
    }));
  }, [state.logs]);

  const handleSaveLog = useCallback((logData: Omit<MedicationLog, 'id' | 'timestamp' | 'dateString' | 'season'>) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const newLog: MedicationLog = {
      ...logData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      dateString: today,
      season: getSeason(now)
    };

    setState(prev => ({
      ...prev,
      logs: [newLog, ...prev.logs.filter(l => l.dateString !== today)],
      isSnoozed: false,
      snoozeUntil: null
    }));
    setShowLogForm(false);
    setShowReminder(false);
  }, []);

  const handleSnooze = useCallback((minutes: number) => {
    setState(prev => ({
      ...prev,
      isSnoozed: true,
      snoozeUntil: Date.now() + (minutes * 60000)
    }));
    setShowReminder(false);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F2F2F7] overflow-hidden relative shadow-2xl">
      <header className="px-6 pt-12 pb-4 bg-white/80 ios-blur sticky top-0 z-10 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-black">
          {activeTab === 'dashboard' ? '你是你鼻子的主人' : activeTab === 'history' ? '病程分析' : '系统设置'}
        </h1>
        {activeTab === 'dashboard' && (
          <button onClick={() => setShowLogForm(true)} className="text-blue-600 active:scale-90 transition-transform">
            <PlusCircle size={32} />
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'dashboard' && (
          <Dashboard 
            state={state} 
            onOpenForm={() => setShowLogForm(true)} 
            onQuickConfirm={handleQuickConfirm}
          />
        )}
        {activeTab === 'history' && <HistoryView logs={state.logs} onClear={() => setState(p => ({...p, logs: []}))} />}
        {activeTab === 'settings' && <SettingsView settings={state.settings} onUpdate={(s) => setState(p => ({...p, settings: s}))} />}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-white/90 ios-blur border-t border-gray-200 safe-area-bottom flex justify-around py-3 z-20">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center transition-colors ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Clock size={24} />
          <span className="text-[10px] mt-1 font-medium">概览</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center transition-colors ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-400'}`}>
          <History size={24} />
          <span className="text-[10px] mt-1 font-medium">分析</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center transition-colors ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'}`}>
          <SettingsIcon size={24} />
          <span className="text-[10px] mt-1 font-medium">设置</span>
        </button>
      </nav>

      {showLogForm && <LogForm onSave={handleSaveLog} onClose={() => setShowLogForm(false)} />}
      {showReminder && <ReminderOverlay onConfirm={() => setShowLogForm(true)} onSnooze={handleSnooze} onClose={() => setShowReminder(false)} />}
    </div>
  );
};

export default App;

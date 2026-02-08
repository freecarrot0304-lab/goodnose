
import React from 'react';
import { Bell, X, Check, Clock } from 'lucide-react';

interface ReminderOverlayProps {
  onConfirm: () => void;
  onSnooze: (minutes: number) => void;
  onClose: () => void;
}

const ReminderOverlay: React.FC<ReminderOverlayProps> = ({ onConfirm, onSnooze, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full rounded-[32px] p-8 shadow-2xl flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-2 text-gray-300 hover:text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center animate-bounce shadow-lg shadow-blue-100">
          <Bell size={40} strokeWidth={2.5} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight">用药提醒</h2>
          <p className="text-gray-500 mt-2 font-medium">该滴过敏药水啦！请立即确认。</p>
        </div>

        <div className="w-full space-y-3 pt-4">
          <button 
            onClick={onConfirm}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xl shadow-blue-200"
          >
            <Check size={24} /> 确认已用药
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onSnooze(15)}
              className="py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <Clock size={18} /> 15分钟后
            </button>
            <button 
              onClick={() => onSnooze(60)}
              className="py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <Clock size={18} /> 1小时后
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReminderOverlay;

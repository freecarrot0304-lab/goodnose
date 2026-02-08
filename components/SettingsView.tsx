
import React from 'react';
import { Settings } from '../types';
import { Bell, Shield, Package, Vibrate, CalendarDays } from 'lucide-react';

interface SettingsViewProps {
  settings: Settings;
  onUpdate: (settings: Settings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
  const handleChange = (key: keyof Settings, value: any) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <div className="px-5 py-6 space-y-8">
      <section>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-3">记录设置</h3>
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-xl"><CalendarDays size={20} /></div>
              <span className="font-medium">治疗起始日期</span>
            </div>
            <input 
              type="date" 
              value={settings.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="bg-gray-100 rounded-lg px-2 py-1 font-bold text-blue-600 focus:outline-none"
            />
          </div>
          <div className="p-4 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Bell size={20} /></div>
              <span className="font-medium">提醒时间</span>
            </div>
            <input 
              type="time" 
              value={settings.reminderTime}
              onChange={(e) => handleChange('reminderTime', e.target.value)}
              className="bg-gray-100 rounded-lg px-2 py-1 font-bold text-blue-600 focus:outline-none"
            />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl"><Vibrate size={20} /></div>
              <span className="font-medium">震动提醒</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={settings.vibrationEnabled} onChange={(e) => handleChange('vibrationEnabled', e.target.checked)} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-3">药水瓶装管理</h3>
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 text-orange-600 p-2 rounded-xl"><Package size={20} /></div>
              <span className="font-medium">当前剩余</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => handleChange('inventoryCount', Math.max(0, settings.inventoryCount - 1))} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">-</button>
              <span className="font-bold w-6 text-center">{settings.inventoryCount}</span>
              <button onClick={() => handleChange('inventoryCount', settings.inventoryCount + 1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">+</button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400 font-bold">
              <span>库存上限</span>
              <span>{settings.totalBottles} 瓶</span>
            </div>
            <input type="range" min="1" max="20" value={settings.totalBottles} onChange={(e) => handleChange('totalBottles', parseInt(e.target.value))} className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4 flex items-center gap-3">
          <div className="bg-gray-100 text-gray-600 p-2 rounded-xl"><Shield size={20} /></div>
          <div>
            <p className="font-medium text-sm">隐私政策</p>
            <p className="text-xs text-gray-400">所有数据均存于本地浏览器缓存。</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsView;

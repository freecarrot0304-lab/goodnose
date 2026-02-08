
import React, { useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShoppingBag, 
  Wind, 
  Droplet, 
  Activity, 
  CalendarDays, 
  ClipboardList, 
  PlusCircle,
  Thermometer,
  CloudSun,
  ShieldCheck
} from 'lucide-react';
import { AppState } from '../types';

interface DashboardProps {
  state: AppState;
  onOpenForm: () => void;
  onQuickConfirm: () => void;
}

const HEALTH_TIPS = [
  "生理盐水洗鼻能有效清除鼻腔内的过敏原 and 分泌物，缓解充血。",
  "花粉季节出门记得佩戴口罩和防风眼镜，归家后及时更换外衣。",
  "卧室避免地毯和厚重窗帘，定期用高温水清洗床上用品以除螨。",
  "过敏发作前一周开始预防性使用抗组胺药或鼻喷剂效果更佳。",
  "多摄入富含维生素C的食物，如柑橘、猕猴桃，辅助增强免疫力。",
  "洗澡水温不宜过高，避免冷热交替对鼻黏膜产生过度刺激。",
  "使用除湿机将室内湿度控制在50%以下，能抑制霉菌和尘螨生长。",
  "晨跑建议改为室内运动，因为早晨是空气中花粉浓度最高的时候。",
  "揉鼻子和打喷嚏后，用温水清洗双手和面部，减少二次刺激。",
  "如果鼻喷剂导致鼻腔干燥出血，可咨询医生使用软膏进行滋润。",
  "游泳时建议佩戴鼻夹，防止泳池中的氯气刺激敏感的鼻黏膜。",
  "心理压力大也会加重鼻炎症状，尝试冥想或深呼吸放松身心。",
  "避免在室内摆放易过敏的开花植物，尤其是百合、康乃馨等。",
  "换季时注意保暖，尤其是头颈部，防止受凉诱发血管舒缩性鼻炎。",
  "辛辣刺激性饮食会导致血管扩张，加重鼻塞，建议清淡饮食。"
];

const Dashboard: React.FC<DashboardProps> = ({ state, onOpenForm, onQuickConfirm }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayLog = state.logs.find(log => log.dateString === today);
  const isTaken = !!todayLog;
  
  const startDate = new Date(state.settings.startDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const inventoryColor = state.settings.inventoryCount === 1 ? 'text-red-500' : state.settings.inventoryCount === 2 ? 'text-yellow-500' : 'text-blue-600';

  // Get daily tip based on day of the year
  const dailyTip = useMemo(() => {
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return HEALTH_TIPS[dayOfYear % HEALTH_TIPS.length];
  }, []);

  return (
    <div className="px-5 py-6 space-y-5">
      {/* Day Counter Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[28px] p-6 text-white shadow-lg flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">坚持对抗过敏</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black">{diffDays}</span>
            <span className="text-sm font-bold">天</span>
          </div>
        </div>
        <CalendarDays size={40} className="opacity-30" />
      </div>

      {/* Medication Quick Record Widget */}
      <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isTaken ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-500'}`}>
          {isTaken ? <CheckCircle2 size={32} /> : <Droplet size={32} />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">今天是否滴药了？</h2>
          <p className={`text-lg font-semibold mt-1 ${isTaken ? 'text-green-600' : 'text-red-500'}`}>
            {isTaken ? '有' : '没有'}
          </p>
        </div>
        
        {!isTaken && (
          <button 
            onClick={onQuickConfirm}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform shadow-lg shadow-blue-200"
          >
            点击确认滴药
          </button>
        )}
      </div>

      {/* Symptom Recording Module */}
      <div 
        onClick={onOpenForm}
        className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 flex items-center gap-5 cursor-pointer active:scale-[0.98] transition-all"
      >
        <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
          <ClipboardList size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">去记录今日症状</h3>
          <p className="text-xs text-gray-400 font-medium">记录打喷嚏、鼻塞、流鼻涕及运动...</p>
        </div>
        <PlusCircle size={24} className="text-blue-600" />
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 text-gray-400 mb-2">
            <ShoppingBag size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wider">剩余库存</span>
          </div>
          <div className="flex items-end space-x-1">
            <span className={`text-3xl font-bold ${inventoryColor}`}>{state.settings.inventoryCount}</span>
            <span className="text-xs text-gray-400 mb-1">瓶</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${state.settings.inventoryCount === 1 ? 'bg-red-500' : state.settings.inventoryCount === 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}
              style={{ width: `${(state.settings.inventoryCount / state.settings.totalBottles) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 text-blue-500 mb-2">
            <AlertCircle size={18} />
            <span className="text-[10px] font-bold uppercase tracking-wider">提醒时间</span>
          </div>
          <div className="flex items-end space-x-1">
            <span className="text-3xl font-bold text-gray-900">{state.settings.reminderTime}</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 leading-tight">每日定时追踪。</p>
        </div>
      </div>

      {/* Weather and Air Quality Widget */}
      <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
            <CloudSun size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">今日天气</p>
            <p className="text-sm font-bold text-gray-900">晴 22°C</p>
          </div>
        </div>
        <div className="h-8 w-[1px] bg-gray-100" />
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-600 p-2 rounded-xl">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">空气质量</p>
            <p className="text-sm font-bold text-green-600">35 优</p>
          </div>
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="bg-blue-50 rounded-[32px] p-6 border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wind size={48} />
        </div>
        <h3 className="font-bold flex items-center gap-2 mb-2 text-blue-900">
          <Droplet size={18} className="fill-blue-200" /> 鼻炎防治贴士
        </h3>
        <p className="text-xs leading-relaxed text-blue-800 font-medium">
          {dailyTip}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

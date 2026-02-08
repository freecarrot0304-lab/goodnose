
import React, { useState } from 'react';
import { X, Save, Droplets, Wind, Activity } from 'lucide-react';
import { SneezingLevel, RunnyNoseLevel, CongestionLevel, ExerciseType, MedicationLog } from '../types';

interface LogFormProps {
  onSave: (data: Omit<MedicationLog, 'id' | 'timestamp' | 'dateString' | 'season'>) => void;
  onClose: () => void;
}

const LogForm: React.FC<LogFormProps> = ({ onSave, onClose }) => {
  const [antiHistamine, setAntiHistamine] = useState(false);
  const [nasalSpray, setNasalSpray] = useState(false);
  const [nasalWash, setNasalWash] = useState(false);
  const [sneezing, setSneezing] = useState<SneezingLevel>('轻微');
  const [runnyNose, setRunnyNose] = useState<RunnyNoseLevel>('干爽的一天');
  const [congestion, setCongestion] = useState<CongestionLevel>('几乎是正常人');
  const [exercise, setExercise] = useState<ExerciseType>('未运动');

  return (
    <div className="fixed inset-0 z-50 bg-[#F2F2F7] overflow-y-auto animate-in slide-in-from-bottom duration-300">
      <div className="bg-white min-h-screen p-6 max-w-md mx-auto space-y-8 pb-32">
        <div className="flex justify-between items-center">
          <button onClick={onClose} className="p-2 text-gray-400"><X /></button>
          <h2 className="text-xl font-bold">今日详细记录</h2>
          <button onClick={() => onSave({
            status: 'taken',
            treatments: { antiHistamine, nasalSpray, nasalWash },
            symptoms: { sneezing, runnyNose, congestion },
            exercise
          })} className="p-2 text-blue-600 font-bold"><Save /></button>
        </div>

        {/* Treatment */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Droplets size={14}/> 治疗情况
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setAntiHistamine(!antiHistamine)} className={`py-4 px-1 rounded-2xl border-2 transition-all text-xs font-bold ${antiHistamine ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
              服用抗阻药
            </button>
            <button onClick={() => setNasalSpray(!nasalSpray)} className={`py-4 px-1 rounded-2xl border-2 transition-all text-xs font-bold ${nasalSpray ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
              使用鼻喷
            </button>
            <button onClick={() => setNasalWash(!nasalWash)} className={`py-4 px-1 rounded-2xl border-2 transition-all text-xs font-bold ${nasalWash ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-50 bg-gray-50 text-gray-400'}`}>
              生理洗鼻
            </button>
          </div>
        </section>

        {/* Symptoms */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Wind size={14}/> 症状程度
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">打喷嚏</label>
              <div className="grid grid-cols-3 gap-2">
                {(['轻微', '能忍', '打到头晕'] as SneezingLevel[]).map(l => (
                  <button key={l} onClick={() => setSneezing(l)} className={`py-3 text-[10px] rounded-xl border-2 transition-all font-bold ${sneezing === l ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-50'}`}>{l}</button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">流鼻涕</label>
              <div className="grid grid-cols-3 gap-2">
                {(['干爽的一天', '半包纸巾', '干翻了两包'] as RunnyNoseLevel[]).map(l => (
                  <button key={l} onClick={() => setRunnyNose(l)} className={`py-3 text-[10px] rounded-xl border-2 transition-all font-bold ${runnyNose === l ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-50'}`}>{l}</button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">鼻塞</label>
              <div className="grid grid-cols-3 gap-2">
                {(['几乎是正常人', '一只可用', '憋死我了'] as CongestionLevel[]).map(l => (
                  <button key={l} onClick={() => setCongestion(l)} className={`py-3 text-[10px] rounded-xl border-2 transition-all font-bold ${congestion === l ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-400 border-gray-50'}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exercise */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14}/> 运动记录
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {(['跑步', '游泳', '骑车', '力量', '爬坡', '健身操', '未运动'] as ExerciseType[]).map(e => (
              <button key={e} onClick={() => setExercise(e)} className={`py-3 text-[10px] rounded-xl border-2 transition-all font-bold ${exercise === e ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-400 border-gray-50'}`}>{e}</button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 w-full p-6 bg-white border-t border-gray-100 safe-area-bottom">
        <button onClick={() => onSave({
          status: 'taken',
          treatments: { antiHistamine, nasalSpray, nasalWash },
          symptoms: { sneezing, runnyNose, congestion },
          exercise
        })} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg">
          确认并保存记录
        </button>
      </div>
    </div>
  );
};

export default LogForm;

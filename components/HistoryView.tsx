
import React from 'react';
import { MedicationLog, Season } from '../types';
import { Trash2, Wind } from 'lucide-react';

interface HistoryViewProps {
  logs: MedicationLog[];
  onClear: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ logs, onClear }) => {
  const seasons: Season[] = ['春', '夏', '秋', '冬'];

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-10 text-center">
        <Wind size={64} strokeWidth={1} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">暂无历史记录</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">病程时间轴</h3>
        <button onClick={() => { if(confirm('清除所有数据？')) onClear(); }} className="text-red-500 text-xs font-bold">清除</button>
      </div>

      {seasons.map(season => {
        const seasonLogs = logs.filter(l => l.season === season);
        if (seasonLogs.length === 0) return null;

        return (
          <section key={season} className="space-y-4">
            <h4 className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full w-fit">{season}季分析</h4>
            <div className="space-y-3">
              {seasonLogs.map(log => (
                <div key={log.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{new Date(log.timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })}</div>
                      <div className="text-[10px] text-gray-400 font-bold">运动: {log.exercise}</div>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                      {log.treatments.antiHistamine && <span className="text-[8px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md font-bold">抗阻药</span>}
                      {log.treatments.nasalSpray && <span className="text-[8px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-md font-bold">鼻喷</span>}
                      {log.treatments.nasalWash && <span className="text-[8px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-md font-bold">洗鼻</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 border-t pt-3 border-gray-50">
                    <div className="text-center">
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">打喷嚏</p>
                      <p className={`text-[10px] font-bold mt-1 ${log.symptoms.sneezing === '打到头晕' ? 'text-red-500' : 'text-gray-600'}`}>{log.symptoms.sneezing}</p>
                    </div>
                    <div className="text-center border-x border-gray-100">
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">流鼻涕</p>
                      <p className={`text-[10px] font-bold mt-1 ${log.symptoms.runnyNose === '干翻了两包' ? 'text-red-500' : 'text-gray-600'}`}>{log.symptoms.runnyNose}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">鼻塞</p>
                      <p className={`text-[10px] font-bold mt-1 ${log.symptoms.congestion === '憋死我了' ? 'text-red-500' : 'text-gray-600'}`}>{log.symptoms.congestion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default HistoryView;

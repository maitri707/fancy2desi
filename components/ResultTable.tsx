"use client";
import { Info, ArrowRight } from "lucide-react";

export default function ResultTable({ data }: any) {
  if (!data) return null;

  let items: any[] = [];
  try {
    const cleanData = typeof data === 'string' 
      ? data.replace(/```json|```/g, "").trim() 
      : data;
    items = typeof cleanData === 'string' ? JSON.parse(cleanData) : cleanData;
  } catch (e) {
    return (
      <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-sm font-medium">
        Failed to parse the kitchen's response. Please try again!
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-4 px-2">
        <Info size={16} className="text-[#6f913d]" />
        <h2 className="text-sm font-black text-[#34482a] uppercase tracking-wider">The Truth (Desi Version)</h2>
      </div>
      
      <div className="grid gap-3">
        {items.map((item: any, i: number) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#6f913d]/30 transition-all shadow-sm group"
          >
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Fancy</p>
              <p className="text-[#34482a] font-bold group-hover:text-[#6f913d] transition-colors">{item.original}</p>
            </div>
            
            <div className="px-4 text-gray-300">
              <ArrowRight size={20} />
            </div>

            <div className="flex-1 text-right">
              <p className="text-[10px] font-bold text-[#6f913d] uppercase tracking-widest mb-1">Desi</p>
              <p className="text-lg font-black text-[#34482a]">{item.desi} 🇮🇳</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
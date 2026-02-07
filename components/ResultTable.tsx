"use client";
import { RotateCcw, ChevronRight, Utensils } from "lucide-react";

export default function ResultTable({ data }: any) {
  if (!data) return null;

  let items: any[] = [];
  try {
    const cleanData = typeof data === "string" 
      ? data.replace(/```json|```/g, "").trim() 
      : data;
    items = typeof cleanData === "string" ? JSON.parse(cleanData) : cleanData;
  } catch (e) {
    return (
      <div className="w-full max-w-4xl mx-auto p-12 bg-white border-2 border-brand-dark rounded-3xl text-center">
        <p className="font-black text-brand-dark uppercase tracking-widest">Kitchen Error</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 mb-24 animate-in fade-in duration-700">
      {/* Partitioned Items Container */}
      <div className="space-y-6">
        {items.map((item: any, i: number) => (
          <div 
            key={i} 
            className="group flex flex-col md:flex-row items-stretch bg-white border-2 border-brand-dark rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(139,69,19,0.1)] hover:shadow-[6px_6px_0px_0px_#ffe8d6] transition-all duration-300"
          >
            {/* Left Partition: The Input */}
            <div className="md:w-1/3 p-8 bg-brand-offwhite/50 border-b md:border-b-0 md:border-r border-brand-light-peach/40 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-curry/40" />
                <span className="text-[9px] font-black text-brand-dark/40 uppercase tracking-widest">Fancy Dish</span>
              </div>
              <h3 className="text-sm font-medium text-brand-dark/60 italic uppercase tracking-[0.12em] leading-relaxed group-hover:text-brand-dark/60">
                {item.original}
              </h3>
            </div>

            {/* Right Partition: The Output */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative bg-white">
              {/* Subtle background icon for "Desi" vibes */}
              <Utensils className="absolute right-6 bottom-6 text-brand-curry/5 -rotate-12" size={80} />
              
              <div className="flex items-center gap-2 mb-4 md:justify-end">
                 <span className="text-[9px] font-black text-brand-curry uppercase tracking-[0.2em] px-2 py-0.5 bg-brand-light-peach rounded">Reality</span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-black text-brand-dark tracking-tighter leading-[0.95] md:text-right relative z-10">
                {item.desi}
              </h3>

              {item.insight && (
                <div className="mt-6 flex md:justify-end">
                   <p className="text-[11px] font-bold text-brand-dark/40 italic bg-brand-offwhite px-3 py-1 rounded-lg">
                    “{item.insight}”
                   </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Area */}
      <div className="mt-16 flex flex-col items-center gap-8">
        <button 
          onClick={() => window.location.reload()}
          className="group flex items-center gap-4 px-12 py-5 bg-brand-dark text-brand-offwhite rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand-dark/20 hover:bg-brand-curry active:scale-95 transition-all"
        >
          <RotateCcw size={18} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
          Desify Another Menu
        </button>
        
        <div className="flex items-center gap-6 opacity-20">
            <div className="h-[1px] w-12 bg-brand-dark" />
            <span className="text-[10px] font-black tracking-[0.5em] uppercase">Authorized</span>
            <div className="h-[1px] w-12 bg-brand-dark" />
        </div>
      </div>
    </div>
  );
}
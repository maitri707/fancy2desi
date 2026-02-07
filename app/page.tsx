"use client";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResultTable from "@/components/ResultTable";
import { UtensilsCrossed, Sparkles, ChefHat } from "lucide-react";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <main className="relative min-h-screen bg-[#fff8f0] font-sans pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <ChefHat className="absolute -top-10 -left-10 rotate-12" size={400} />
        <UtensilsCrossed className="absolute bottom-10 right-10 -rotate-12" size={300} />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-16 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ffe8d6] text-[#e67e22] mb-6 shadow-sm">
            <UtensilsCrossed size={32} />
          </div>
          <h1 className="text-4xl font-black text-[#8B4513] tracking-tight mb-3">
            Fancy Menu <span className="text-[#e67e22]">→</span> Desi Menu
          </h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            Translating "Artisanal Sourdough" to "Makkhan-Pav" because your mom wouldn't have it any other way.
          </p>
        </div>

        <div className="space-y-8">
          <ImageUploader onResult={setResult} />
          <ResultTable data={result} />
        </div>
      </div>
    </main>
  );
}
"use client";
import { useState, useRef } from "react";
import { Camera, Type, Loader2, Sparkles, UploadCloud, ChefHat } from "lucide-react";

export default function ImageUploader({ onResult }: any) {
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState<"image" | "text">("image");
  const [textInput, setTextInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const base64 = await toBase64(file);
      const res = await fetch("/api/desify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, text: null }),
      });
      const data = await res.json();
      if (data.success) onResult(data.data);
    } catch (error) {
      alert("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/desify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: null, text: textInput }),
      });
      const data = await res.json();
      if (data.success) {
        onResult(data.data);
        setTextInput("");
      }
    } catch (error) {
      alert("Failed to process text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-[#6f913d]/5">
      <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 w-fit mx-auto">
        {[
          { id: "image", label: "Scan Menu", icon: Camera },
          { id: "text", label: "Paste Text", icon: Type },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setInputMode(mode.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              inputMode === mode.id 
                ? "bg-white text-[#34482a] shadow-sm" 
                : "text-gray-500 hover:text-[#6f913d]"
            }`}
          >
            <mode.icon size={18} />
            {mode.label}
          </button>
        ))}
      </div>

      {inputMode === "image" ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="group border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-[#6f913d] hover:bg-[#f0f4e8]/30 transition-all cursor-pointer"
        >
          <input ref={fileInputRef} type="file" onChange={handleUpload} accept="image/*" className="hidden" />
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="text-gray-400 group-hover:text-[#6f913d]" size={32} />
          </div>
          <p className="text-[#34482a] font-bold">Click to upload menu photo</p>
          <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 10MB</p>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="e.g. Deconstructed Berry Parfait..."
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#6f913d] focus:ring-4 focus:ring-[#6f913d]/5 outline-none transition-all font-medium min-h-32 text-sm"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || loading}
            className="w-full bg-[#6f913d] hover:bg-[#5a7632] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#6f913d]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            Desify This Menu
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-6 flex items-center justify-center gap-3 text-[#6f913d] font-bold animate-pulse">
          <ChefHat size={20} />
          <span>Cooking desi magic...</span>
        </div>
      )}
    </div>
  );
}

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result!.toString().split(",")[1]);
    reader.onerror = error => reject(error);
  });
}
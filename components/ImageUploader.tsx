"use client";
import { useState, useRef } from "react";
import { Camera, Type, Loader2, Sparkles, UploadCloud, ChefHat, X, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ onResult }: any) {
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState<"image" | "text">("image");
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDesify = async () => {
    setLoading(true);
    try {
      let payload = { image: null as string | null, text: null as string | null };

      if (inputMode === "image" && selectedFile) {
        payload.image = await toBase64(selectedFile);
      } else if (inputMode === "text" && textInput.trim()) {
        payload.text = textInput;
      } else {
        alert("Please provide a menu photo or text first!");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/desify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API Response:", data);
      
      if (data.success) {
        onResult(data.data);
        if (inputMode === "text") setTextInput("");
        else setSelectedFile(null);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = loading || (inputMode === "image" ? !selectedFile : !textInput.trim());

  return (
    // Reduced padding from p-8 to p-5 for a tighter fit
    <div className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-8 shadow-xl shadow-[#e67e22]/5">
      
      {/* Tab Switcher - Reduced margin-bottom and padding */}
      <div className="flex p-1 bg-gray-100 rounded-2xl mb-5 w-fit mx-auto">
        {[
          { id: "image", label: "Scan", icon: Camera },
          { id: "text", label: "Text", icon: Type },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setInputMode(mode.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              inputMode === mode.id
                ? "bg-white text-[#8B4513] shadow-sm"
                : "text-gray-500 hover:text-[#e67e22]"
            }`}
          >
            <mode.icon size={16} />
            {mode.label}
          </button>
        ))}
      </div>

      {/* Input Section - Reduced height from h-64 to h-48 for mobile */}
      <div className="h-48 mb-5">
        {inputMode === "image" ? (
          <div
            onClick={() => !selectedFile && fileInputRef.current?.click()}
            className={`h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
              selectedFile 
                ? "border-[#e67e22] bg-[#ffe8d6]/10 cursor-default" 
                : "border-gray-200 hover:border-[#e67e22] hover:bg-[#ffe8d6]/30 cursor-pointer"
            }`}
          >
            <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
            
            {selectedFile ? (
              <div className="relative group w-full h-full p-4 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-[#ffe8d6] rounded-xl flex items-center justify-center text-[#e67e22] mb-2">
                  <ImageIcon size={24} />
                </div>
                <p className="text-[#8B4513] font-bold text-xs truncate max-w-[150px]">{selectedFile.name}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  className="mt-1 text-[10px] font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  <X size={12} /> Remove
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="text-gray-400" size={24} />
                </div>
                <p className="text-[#8B4513] font-bold text-sm">Upload menu photo</p>
                <p className="text-gray-400 text-[10px] mt-0.5">PNG, JPG or JPEG up to 10MB</p>
              </>
            )}
          </div>
        ) : (
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type menu here..."
            className="w-full h-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#e67e22] focus:ring-4 focus:ring-[#e67e22]/5 outline-none transition-all font-medium text-sm resize-none"
          />
        )}
      </div>

      {/* Common Action Button - Slightly reduced padding */}
      <button
        onClick={handleDesify}
        disabled={isButtonDisabled}
        className="w-full bg-[#e67e22] hover:bg-[#8B4513] text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-[#e67e22]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed text-sm"
      >
        {loading ? <Loader2 className="animate-spin size-4" /> : <Sparkles size={16} />}
        Desify This Menu
      </button>

      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-[#e67e22] font-bold animate-pulse text-xs">
          <ChefHat size={16} />
          <span>Translating</span>
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
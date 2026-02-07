"use client"
import { useState, useRef } from "react"

export default function ImageUploader({ onResult }: any) {
  const [loading, setLoading] = useState(false)
  const [inputMode, setInputMode] = useState<"image" | "text">("image")
  const [textInput, setTextInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)

    try {
      const base64 = await toBase64(file)

      const res = await fetch("/api/desify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64, text: null }),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()
      if (data.success) {
        onResult(data.data)
      } else {
        alert("Error: " + data.error)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to process image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return

    setLoading(true)

    try {
      const res = await fetch("/api/desify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: null, text: textInput }),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()
      if (data.success) {
        onResult(data.data)
        setTextInput("")
      } else {
        alert("Error: " + data.error)
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to process menu. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10 border rounded-xl">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setInputMode("image")}
          className={`px-4 py-2 rounded ${inputMode === "image" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Upload Image 📷
        </button>
        <button
          onClick={() => setInputMode("text")}
          className={`px-4 py-2 rounded ${inputMode === "text" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Paste Text 📝
        </button>
      </div>

      {inputMode === "image" ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleUpload}
            accept="image/*"
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          >
            Choose Image File 📁
          </button>
        </div>
      ) : (
        <div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste your fancy menu text here..."
            className="w-full p-2 border rounded mb-4 min-h-32"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || loading}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-400"
          >
            Desify Menu ✨
          </button>
        </div>
      )}

      {loading && <p className="mt-4">Cooking desi magic… 🍛</p>}
    </div>
  )
}

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>
      resolve(reader.result!.toString().split(",")[1])
    reader.onerror = error => reject(error)
  })
}

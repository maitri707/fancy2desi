"use client"
import { useState } from "react"

export default function ImageUploader({ onResult }: any) {
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)

    const base64 = await toBase64(file)

    const res = await fetch("/api/desify", {
      method: "POST",
      body: JSON.stringify({ image: base64 }),
    })

    const data = await res.json()
    onResult(data.data)

    setLoading(false)
  }

  return (
    <div className="p-10 border rounded-xl">
      <input type="file" onChange={handleUpload} />
      {loading && <p>Cooking desi magic… 🍛</p>}
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

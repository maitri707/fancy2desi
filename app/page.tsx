"use client"
import { useState } from "react"
import ImageUploader from "@/components/ImageUploader"
import ResultTable from "@/components/ResultTable"

export default function Home() {
  const [result, setResult] = useState(null)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Fancy Menu → Desi Menu 🇮🇳
      </h1>

      <ImageUploader onResult={setResult} />
      <ResultTable data={result} />
    </main>
  )
}

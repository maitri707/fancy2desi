export default function ResultTable({ data }: any) {
  if (!data) return null

  // Strip markdown code fences if present
  let cleanData = data.trim()
  if (cleanData.startsWith('```json')) {
    cleanData = cleanData.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (cleanData.startsWith('```')) {
    cleanData = cleanData.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }

  let items: any[] = []
  try {
    items = JSON.parse(cleanData)
  } catch (error) {
    console.error("Failed to parse JSON:", error)
    console.error("Raw data:", data)
    return (
      <div className="mt-10 p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-700 font-semibold">Error parsing response</p>
        <p className="text-red-600 text-sm mt-2">The API response was not in valid JSON format. Please try again.</p>
      </div>
    )
  }

  return (
    <table className="mt-10 w-full">
      <thead>
        <tr>
          <th>Fancy Dish</th>
          <th>Desi Name 🇮🇳</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item:any, i:number) => (
          <tr key={i}>
            <td>{item.original}</td>
            <td>{item.desi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function ResultTable({ data }: any) {
  if (!data) return null

  // Strip markdown code fences if present
  let cleanData = data.trim()
  if (cleanData.startsWith('```json')) {
    cleanData = cleanData.replace(/^```json\s*/, '').replace(/\s*```$/, '')
  } else if (cleanData.startsWith('```')) {
    cleanData = cleanData.replace(/^```\s*/, '').replace(/\s*```$/, '')
  }

  const items = JSON.parse(cleanData)

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

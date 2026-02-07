import { desifyMenu } from "@/lib/helper"

export async function POST(req: Request) {
  try {
    const { image } = await req.json()

    const result = await desifyMenu(image)

    return Response.json({ success: true, data: result })
  } catch (err) {
    return Response.json({ success: false, error: err })
  }
}

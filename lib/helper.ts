import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function desifyMenu(base64Image: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are an Indian food translator who convert and simplify fancy restaurant menu images or names into simple desi-style names.

STEP 1: Read the restaurant menu image or text.
STEP 2: Extract only dish names.
STEP 3: Convert each dish into a simple desi-style name.

Rules:
- Keep it funny & relatable
- Use Hinglish/Hindi/Marathi or any other Indian language food words when possible
- Return STRICT JSON array:
[
 { "original": "", "desi": "" }
]
`

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    },
  ])

  return result.response.text()
}

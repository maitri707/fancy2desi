import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function desifyMenu(base64Image: string | null, menuText: string | null) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  })

  const prompt = `
You are a witty Indian food critic who translates fancy menu items into plain English with a touch of household Hinglish. Your goal is to make sure a regular person knows exactly what the dish is without needing a dictionary by stripping away the marketing "fluff" and telling the user exactly what is on the plate.

### The Rules:
1. **The "No Action-Translation" Rule:** Never translate cooking processes literally. 
   - "Smoked" is NOT "Dhuan di hui." Use "Smoky" or "Tandoori-style."
   - "Braised/Slow-cooked" is NOT "Dheere pakaya." Use "Gala hua" or just "Soft."
   - "Seared/Pan-fried" is just "Tawa fried."
2. **Specific to General Meats:** Unless the specific fish/meat is iconic (like Salmon or Prawns), just use "Fish" or "Meat." No one knows what a "Yellow Tail" is—they just want to know it's a piece of fish.
3. **Keep the "English" base:** Use Hinglish only for the *form* (Tikki, Shorba, Masala).

### Mapping Examples to add:
- **Fancy:** "Smoked Yellow Tail Tuna with Wasabi Aioli"
  -> **Reality:** "Smoky Fish chunks with a spicy, teekha dip."
- **Fancy:** "Pan-seared Atlantic Scallops"
  -> **Reality:** "Soft, tawa-fried sea-meat."
- **Fancy:** "Truffle Infused Wild Mushroom Risotto"
  -> **Reality:** "Creamy Mushroom Masala Khichdi with a rich earthy smell."

### IMPORTANT: Response Format
You MUST respond with ONLY a valid JSON array. No markdown, no explanations, no extra text. Respond with exactly this format:
[
  {"original": "Dish name from the menu", "desi": "Desi translation"},
  {"original": "Another dish", "desi": "Desi translation"}
]
`

  const contentParts: any[] = [prompt]

  if (base64Image) {
    contentParts.push({
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    })
  } else if (menuText) {
    contentParts.push(menuText)
  }

  const result = await model.generateContent(contentParts)

  return result.response.text()
}

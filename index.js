const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Access your API key as an environment variable (see "Set up your API key" above)


let API_KEY = 'AIzaSyA0wLuydwFA1cvzbQ-S5NLuLRKRYpivAq0'
const genAI = new GoogleGenerativeAI(API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt ="one persoan should be ware ppe_kit .First you focus on the persoan and Can you detect if the persoan is wearing all the seafty kit or not?in reponse don't describe only give the kit name that not worned among from which i gave you . catagorize into available & non available in one line only"

  const imageParts = fileToGenerativePart("../../jpg878.1ef755ec.jpg", "image/jpeg")

  const result = await model.generateContent([prompt, imageParts]);
  const response = await result.response;
  const text = response.text();

  const split_variable = text.split("\n")
 
  let available=split_variable[0].split(':')
 let not_available=split_variable[1].split(':')
console.log(available)
console.log(not_available)
}

run();
/**
 * Gemini API Client-Side Integration Service
 * 
 * Supports real Gemini API calls using standard REST fetch endpoint
 * with fallback mock data when no API Key is provided.
 */

// Helper to make API calls to Gemini 2.5 Flash
async function callGeminiAPI(apiKey, prompt, responseSchema = null, systemInstruction = null, audioData = null) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const contents = [];
  
  if (audioData) {
    contents.push({
      role: 'user',
      parts: [
        {
          inlineData: {
            mimeType: audioData.mimeType,
            data: audioData.base64
          }
        },
        { text: prompt }
      ]
    });
  } else {
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });
  }

  const requestBody = {
    contents: contents,
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 8192
    }
  };

  if (systemInstruction) {
    requestBody.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  if (responseSchema) {
    requestBody.generationConfig.responseMimeType = "application/json";
    requestBody.generationConfig.responseSchema = responseSchema;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    
    if (responseSchema) {
      return JSON.parse(textResponse);
    }
    return textResponse;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
}

/// Mock Data Definitions
export const MOCK_LYRICS = `(Verse 1)
เช้าวันอาทิตย์ที่แสนสดใส แดดทอประกายอุ่นๆ
พ่อยีราฟกำลังรดน้ำต้นไม้ในสวนสวยข้างบ้านอย่างมีความสุข
แม่หมีหันมาส่งยิ้มหวาน ขณะเตรียมอาหารเช้าในห้องครัว
และโฮมมี่ลิงน้อยวิ่งเล่นรอบๆ สวนอย่างร่าเริง

(Chorus)
นี่คือบ้านของเรา บ้านที่เปี่ยมด้วยความสุข
เสียงหัวเราะอบอวลลอยฟุ้งไปในอากาศ
อบอุ่นหัวใจทุกครั้งเมื่อเราอยู่พร้อมหน้ากัน
ครอบครัวเล็กๆ ของเรา Homey Family

(Verse 2)
ยามบ่ายเรามารวมตัวกันใต้ร่มไม้ใหญ่ในสวนหลังบ้าน
คุณยายเต่าใจดีนั่งเล่านิทานและสอนแง่คิดดีๆ ให้เด็กๆ ฟัง
น้าเข้จระเข้สายลุยโบกมือทักทายพร้อมช่วยดูแลบ้าน
ช่วงเวลาสั้นๆ แต่ความทรงจำยาวนานแสนงดงาม`;

export const MOCK_CHARACTERS = [
  { name: "พ่อยีราฟ", role: "คุณพ่อผู้อบอุ่น จิตใจดี ตัวสูงใหญ่", description: "ยีราฟคุณพ่อตัวสูง สวมเสื้อโปโลสีเขียว กางเกงขายาวสีน้ำเงินเข้ม และรองเท้าผ้าใบสีขาว มีรอยยิ้มที่เป็นมิตร อบอุ่น แววตาเอ็นดูครอบครัว" },
  { name: "แม่หมี", role: "คุณแม่หมีผู้แสนอ่อนโยนและใจดี", description: "แม่หมีสีน้ำตาลอ่อน ขนฟูนุ่ม สวมเสื้อสีขาว คลุมทับด้วยเสื้อคาร์ดิแกนสีชมพู กางเกงขายาวสีกากี และรองเท้าสีขาว ยิ้มแย้มต้อนรับทุกคนอย่างอบอุ่น" },
  { name: "คุณยายเต่า", role: "คุณยายเต่าผู้ใจดีและรอบรู้", description: "คุณยายเต่าสูงวัย ใส่แว่นตากลม โพกผ้าคลุมศีรษะสีชมพูสลับลายดอกไม้ สวมเสื้อคาร์ดิแกนถักสีครีม กางเกงสีเขียวหม่น และรองเท้าสีน้ำตาล" },
  { name: "โฮมมี่", role: "ลูกลิงตัวน้อย แสนซน ร่าเริง", description: "ลูกลิงตัวจิ๋วตาโตกลม สวมเสื้อยืดลายขวางคู่กับเอี๊ยมยีนส์สีน้ำเงินเข้ม ในมือมักจะถือกล้วย มีความอยากรู้อยากเห็นและพลังเหลือล้น" },
  { name: "น้าเข้", role: "คุณน้าจระเข้สายลุยผู้ขยันขันแข็ง", description: "จระเข้คุณน้าตัวสีเขียวสดใส สวมเสื้อยืดสีขาวเรียบง่าย กางเกงขายาวสีกากีพร้อมเข็มขัดอุปกรณ์คาดเอว นิสัยดี ชอบช่วยเหลือคนอื่นเสมอ" }
];

export const MOCK_LOCATIONS = [
  { name: "Cozy Wooden Cottage (บ้านไม้ในชนบท)", description: "บ้านไม้สองชั้นสไตล์คอทเทจยุโรป รายล้อมด้วยป่าโปร่งและเทือกเขาจางๆ ในชนบท มีระเบียงไม้ยื่นออกมาพร้อมชุดโต๊ะเก้าอี้หวายสำหรับพักผ่อน" },
  { name: "Country Kitchen (ห้องครัวในบ้าน)", description: "ห้องครัวสไตล์คันทรี่ที่อบอุ่น ผนังปูกระเบื้องสีครีม เคาน์เตอร์ไม้ มีหน้าต่างบานใหญ่เปิดรับแสงแดดอุ่นๆ และเห็นวิวสวนหย่อมข้างนอก" },
  { name: "Sunny Backyard Garden (สวนหลังบ้าน)", description: "สวนหลังบ้านปูสนามหญ้าสีเขียวขจี มีต้นเมเปิ้ลขนาดใหญ่ให้ร่มเงา ปูผ้าปิกนิกสีลายตารางสีขาวแดง พร้อมตระกร้าปิกนิกผลไม้และแซนด์วิช" }
];

export const MOCK_SCENES = [
  { sceneNo: 1, startSec: 0, endSec: 6, description: "เปิดฉากด้วยภาพมุมกว้างของ Cozy Wooden Cottage ท่ามกลางหมอกจางๆ ในเช้าวันอาทิตย์ แดดสีทองส่องผ่านทิวไม้กระทบระเบียงบ้าน", cueText: "เช้าวันอาทิตย์ที่แสนสดใส แดดทอประกายอุ่นๆ" },
  { sceneNo: 2, startSec: 6, endSec: 12, description: "กล้องแพลนมาที่สวนข้างบ้าน เห็น พ่อยีราฟ ในเสื้อโปโลสีเขียว กำลังรดน้ำดอกไม้สีสันสดใสพลางส่งยิ้มกว้างอย่างมีความสุข", cueText: "พ่อยีราฟกำลังรดน้ำต้นไม้ในสวนไม้หลังเล็กๆ ในชนบทอย่างมีความสุข" },
  { sceneNo: 3, startSec: 12, endSec: 18, description: "ตัดภาพเข้ามาในห้องครัว เห็น แม่หมี ในเสื้อคาร์ดิแกนสีชมพู กำลังยิ้มอย่างอ่อนโยนขณะจัดจานอาหารเช้าและขนมปังอบร้อนๆ บนเคาน์เตอร์ไม้", cueText: "แม่หมีหันมาส่งยิ้มหวาน ขณะเตรียมอาหารเช้าในห้องครัว" },
  { sceneNo: 4, startSec: 18, endSec: 24, description: "ตัดไปที่สนามหญ้า โฮมมี่ ในชุดเอี๊ยมยีนส์กำลังกระโดดโลดเต้น หัวเราะร่าเริงในสวนพร้อมถือกล้วยครึ่งผลในมืออย่างสนุกสนาน", cueText: "และโฮมมี่ลิงน้อยวิ่งเล่นรอบๆ สวนอย่างร่าเริง" },
  { sceneNo: 5, startSec: 24, endSec: 32, description: "ภาพหมู่อบอุ่น พ่อยีราฟ แม่หมี คุณยายเต่า โฮมมี่ และน้าเข้ ยืนล้อมวงกอดกันหัวเราะสนุกสนานหน้าบ้านไม้ แสงแดดอุ่นสีทองสาดส่องอย่างสวยงามละมุนตา", cueText: "นี่คือบ้านของเรา บ้านที่เปี่ยมด้วยความสุข... ครอบครัวเล็กๆ ของเรา Homey Family" }
];

export const MOCK_CHARACTER_PROMPTS = [
  { name: "พ่อยีราฟ", prompt: "Character sheet of a tall giraffe father, green polo shirt, blue trousers, white sneakers, wristwatch, friendly smile, concept art, multiple angles, front, profile, back view, plain soft gray background, cute 3D claymation style, plasticine texture." },
  { name: "แม่หมี", prompt: "Character sheet of a kind brown bear mother, white shirt, pink knit cardigan, beige pants, white sneakers, gentle expression, concept art, multiple angles, front view, profile view, back view, soft clean backdrop, cute 3D claymation style, plasticine texture." },
  { name: "คุณยายเต่า", prompt: "Character sheet of a wise elder turtle grandmother wearing round glasses, a floral headscarf, a cream cable knit cardigan, green trousers, brown leather shoes, warm smiling expression, model sheet, front, side, back view, solid backdrop, cute 3D claymation style, plasticine texture." },
  { name: "โฮมมี่", prompt: "Character sheet of a playful little monkey named Homey, striped t-shirt, blue denim overalls, holding a yellow banana, cheerful face, concept art, multiple views, front, 3/4, side, back view, clean solid background, cute 3D claymation style, plasticine texture." },
  { name: "น้าเข้", prompt: "Character sheet of a friendly crocodile uncle, white t-shirt, khaki trousers with a utility belt, brown boots, tail visible, thumbs-up pose, concept art, multiple angles, front, side, back view, plain background, cute 3D claymation style, plasticine texture." }
];

export const MOCK_LOCATION_PROMPTS = [
  { name: "Cozy Wooden Cottage (บ้านไม้ในชนบท)", prompt: "Environment design sheet of a Cozy Wooden Cottage, two-story European cottage style surrounded by pine trees and distant misty mountains, rustic wooden terrace with wicker furniture, concept art, multiple perspective drawings, front elevation, 3/4 landscape view, cute 3D claymation style, plasticine render." },
  { name: "Country Kitchen (ห้องครัวในบ้าน)", prompt: "Interior environment sheet of a Country Kitchen, warm cozy design, cream tiled walls, rustic wooden counters, large window letting in soft sunrays, clean lines, floor plan view, perspective shot showing the oven and dining table, concept art, cute 3D claymation style, plasticine texture." },
  { name: "Sunny Backyard Garden (สวนหลังบ้าน)", prompt: "Environment sheet of a Sunny Backyard Garden, lush green grass lawn, large shady maple tree, picnic setup with a red and white checkered blanket, picnic basket, perspective landscape view, concept art, cute 3D claymation style, plasticine render." }
];

export const MOCK_PRODUCTION_PROMPTS = [
  { sceneNo: 1, photoPrompt: "Wide establishment shot of a Cozy Wooden Cottage in the countryside, morning sun rays filtering through pine trees, soft mist, warm golden hour lighting, peaceful atmosphere, cute 3D claymation style, plasticine texture, highly detailed.", motionPrompt: "Slow camera pan left to right, revealing the wooden cottage and forest in mist, light dust particles floating in air." },
  { sceneNo: 2, photoPrompt: "Medium shot of พ่อยีราฟ in a green polo shirt and blue pants, standing in the garden beside Cozy Wooden Cottage, happily watering beautiful colorful flowers with a smiling expression, morning sunlight, cute 3D claymation style, plasticine texture.", motionPrompt: "Camera slowly pushes in towards พ่อยีราฟ as he waters the flowers, water droplets splashing, subtle breeze moving the flower leaves." },
  { sceneNo: 3, photoPrompt: "Interior medium shot of แม่หมี in a pink knit cardigan over a white shirt, standing in the Country Kitchen, smiling warmly while setting fresh breakfast plates on the wooden table, soft sunbeams through the window, cute 3D claymation style, plasticine texture.", motionPrompt: "Camera focuses on the breakfast dishes, then pulls back to reveal แม่หมี smiling towards the camera, steam rising gently from warm food." },
  { sceneNo: 4, photoPrompt: "Dynamic medium-wide shot of โฮมมี่ in a striped shirt and blue denim overalls, running and jumping happily in Sunny Backyard Garden, holding a yellow banana, cheerful face, cute 3D claymation style, plasticine texture.", motionPrompt: "Tracking shot moving alongside โฮมมี่ as he happily skips across the green grass lawn, camera keeping pace with his joyful movement." },
  { sceneNo: 5, photoPrompt: "Heartwarming family portrait of พ่อยีราฟ, แม่หมี, คุณยายเต่า, โฮมมี่, and น้าเข้ standing together in front of Cozy Wooden Cottage, hugging and laughing happily, warm sunset lighting, cute 3D claymation style, plasticine texture.", motionPrompt: "Slow pull-back camera motion from a medium group shot to a wide landscape, sunset colors deepening in the sky, warm light glow." }
];

// 1. Service to transcribe audio file using Gemini API
export async function transcribeAudio(apiKey, fileData, lyricsLanguageHint = "ภาษาไทย") {
  if (!apiKey) {
    // Return mock transcription after a small delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return MOCK_LYRICS;
  }

  const prompt = `Please transcribe this audio file. If there are lyrics to a song, write down the lyrics exactly as they are sung. Include verse and chorus labels (e.g. (Verse 1), (Chorus), (Verse 2)) if applicable. The song language is likely ${lyricsLanguageHint}. Respond only with the lyrics text.`;
  
  return await callGeminiAPI(apiKey, prompt, null, "You are an expert audio transcriber. Transcribe all vocals, singing, or speech accurately.", fileData);
}

// 2. Service to extract Characters & Locations
export async function extractCharactersAndLocations(apiKey, lyrics) {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      characters: [...MOCK_CHARACTERS],
      locations: [...MOCK_LOCATIONS]
    };
  }

  const systemInstruction = "You are an expert creative director and story analyst. Analyze the lyrics/script provided and identify all main characters and physical locations mentioned or implied.";
  
  const prompt = `Analyze the following lyrics/story script:
"${lyrics}"

Identify:
1. Main characters: Include names, roles, and a short physical/outfit description based on the mood.
2. Locations: Include names and a brief visual description of the setting.

Respond ONLY with a JSON object matching this schema:
{
  "characters": [
    {
      "name": "Character Name",
      "role": "Their role in the story",
      "description": "Physical appearance, age, clothing, and expression details"
    }
  ],
  "locations": [
    {
      "name": "Location Name",
      "description": "Visual setting details, lighting, atmosphere, and key features"
    }
  ]
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      characters: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            role: { type: "STRING" },
            description: { type: "STRING" }
          },
          required: ["name", "role", "description"]
        }
      },
      locations: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            description: { type: "STRING" }
          },
          required: ["name", "description"]
        }
      }
    },
    required: ["characters", "locations"]
  };

  return await callGeminiAPI(apiKey, prompt, responseSchema, systemInstruction);
}

// 3. Service to generate Scene Breakdown (Max 8 seconds per scene)
export async function generateSceneBreakdown(apiKey, lyrics, characters, locations, style, ratio) {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { scenes: [...MOCK_SCENES] };
  }

  const charactersStr = characters.map(c => `- ${c.name} (${c.role}): ${c.description}`).join('\n');
  const locationsStr = locations.map(l => `- ${l.name}: ${l.description}`).join('\n');

  const systemInstruction = `You are a professional storyboard artist and music video director. Break down the lyrics into chronological scenes.
CRITICAL RULE:
- Each scene must have a duration of AT MOST 8 seconds (e.g. 0-6 seconds, 6-12 seconds, 12-20 seconds).
- Give exact start and end timestamps.
- Ensure the scene descriptions are highly visual and match the requested visual style: "${style}" and aspect ratio: "${ratio}".`;

  const prompt = `Here are the lyrics/script:
"${lyrics}"

Confirmed Characters:
${charactersStr}

Confirmed Locations:
${locationsStr}

Please break down the song chronologically into scenes. Each scene must not exceed 8 seconds. For each scene, specify:
1. Scene number (integer)
2. Start timestamp in seconds (integer)
3. End timestamp in seconds (integer)
4. Highly visual description of the action, camera shot, lighting, matching the style "${style}"
5. The specific line of lyric or audio cue that plays during this scene

Respond ONLY with a JSON object matching this schema:
{
  "scenes": [
    {
      "sceneNo": 1,
      "startSec": 0,
      "endSec": 8,
      "description": "Visual scene description...",
      "cueText": "Associated lyrics or cue..."
    }
  ]
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      scenes: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            sceneNo: { type: "INTEGER" },
            startSec: { type: "INTEGER" },
            endSec: { type: "INTEGER" },
            description: { type: "STRING" },
            cueText: { type: "STRING" }
          },
          required: ["sceneNo", "startSec", "endSec", "description", "cueText"]
        }
      }
    },
    required: ["scenes"]
  };

  return await callGeminiAPI(apiKey, prompt, responseSchema, systemInstruction);
}

// 4. Service to generate Character Sheets Prompts
export async function generateCharacterSheetPrompts(apiKey, characters, style) {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      characters: characters.map((c, i) => ({
        name: c.name,
        prompt: MOCK_CHARACTER_PROMPTS[i] ? MOCK_CHARACTER_PROMPTS[i].prompt : `Character sheet of ${c.name}, ${c.role}, ${c.description}, concept art, multiple angles (front, side, back view), model sheet, plain neutral background, ${style} style.`
      }))
    };
  }

  const systemInstruction = "You are a prompt engineer for AI image generators. Create highly detailed image prompts for generating 'Character Sheets' or 'Model Sheets'.";

  const prompt = `For each of these characters, write an image prompt to generate a Character Sheet.
The Character Sheet prompt should describe a multi-angle character design (e.g. front view, side profile, back view) on a clean solid/neutral background, showing the character model clearly in the style "${style}".

Characters list:
${characters.map(c => `- ${c.name} (${c.role}): ${c.description}`).join('\n')}

Respond ONLY with a JSON object matching this schema:
{
  "characters": [
    {
      "name": "Character Name",
      "prompt": "Detailed English image prompt for character sheet..."
    }
  ]
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      characters: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            prompt: { type: "STRING" }
          },
          required: ["name", "prompt"]
        }
      }
    },
    required: ["characters"]
  };

  return await callGeminiAPI(apiKey, prompt, responseSchema, systemInstruction);
}

// 5. Service to generate Location Sheets Prompts
export async function generateLocationSheetPrompts(apiKey, locations, style) {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      locations: locations.map((l, i) => ({
        name: l.name,
        prompt: MOCK_LOCATION_PROMPTS[i] ? MOCK_LOCATION_PROMPTS[i].prompt : `Environment concept sheet of ${l.name}, ${l.description}, showing multiple perspective shots or clean elevations, architectural and lighting detail, plain backdrop, ${style} style.`
      }))
    };
  }

  const systemInstruction = "You are a prompt engineer for AI image generators. Create highly detailed image prompts for generating 'Location Sheets' or 'Environment Concept Sheets'.";

  const prompt = `For each of these locations, write an image prompt to generate a Location environment sheet or concept sheet.
The prompt should request elevations, multiple perspective views, or detailed layout plans of the setting, with clean layout, architectural details, and specific lighting in the style "${style}".

Locations list:
${locations.map(l => `- ${l.name}: ${l.description}`).join('\n')}

Respond ONLY with a JSON object matching this schema:
{
  "locations": [
    {
      "name": "Location Name",
      "prompt": "Detailed English image prompt for location sheet..."
    }
  ]
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      locations: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            prompt: { type: "STRING" }
          },
          required: ["name", "prompt"]
        }
      }
    },
    required: ["locations"]
  };

  return await callGeminiAPI(apiKey, prompt, responseSchema, systemInstruction);
}

// 6. Service to generate Final Photo & Motion Prompts for each scene
export async function generateProductionPrompts(apiKey, scenes, characters, locations, style, ratio) {
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      scenes: scenes.map((s, i) => ({
        sceneNo: s.sceneNo,
        photoPrompt: MOCK_PRODUCTION_PROMPTS[i] ? MOCK_PRODUCTION_PROMPTS[i].photoPrompt : `Detailed visual scene in ${style} style, aspect ratio ${ratio}, showing the visual narrative.`,
        motionPrompt: MOCK_PRODUCTION_PROMPTS[i] ? MOCK_PRODUCTION_PROMPTS[i].motionPrompt : `Slow camera movement, cinematic camera panning, character motion.`
      }))
    };
  }

  const charactersStr = characters.map(c => `- ${c.name}: ${c.description}`).join('\n');
  const locationsStr = locations.map(l => `- ${l.name}: ${l.description}`).join('\n');
  const scenesStr = scenes.map(s => `- Scene ${s.sceneNo} (${s.startSec}s - ${s.endSec}s): ${s.description} (Cue: "${s.cueText}")`).join('\n');

  const systemInstruction = `You are a senior prompt engineer for AI video production.
CRITICAL PROMPT RULES:
1. Ensure the names of characters and locations in the prompts correspond EXACTLY to the confirmed names:
   Characters: [${characters.map(c => c.name).join(', ')}]
   Locations: [${locations.map(l => l.name).join(', ')}]
2. For each scene, create:
   - "photoPrompt": A descriptive prompt for static image generators (e.g. Midjourney/Flux) outlining composition, subjects, setting, lighting, and visual details in "${style}" style, with aspect ratio "${ratio}".
   - "motionPrompt": A motion description for video generators (e.g. Runway/Luma) specifying camera movements (e.g., pan, tilt, push in, tracking) and subject actions.`;

  const prompt = `Here are the details for generating scene-by-scene prompts:

Characters List:
${charactersStr}

Locations List:
${locationsStr}

Style: ${style}
Aspect Ratio: ${ratio}

Scenes List:
${scenesStr}

For each scene, write:
1. "photoPrompt" (English)
2. "motionPrompt" (English)

Respond ONLY with a JSON object matching this schema:
{
  "scenes": [
    {
      "sceneNo": 1,
      "photoPrompt": "Detailed English image prompt...",
      "motionPrompt": "Detailed camera movement and motion prompt..."
    }
  ]
}`;

  const responseSchema = {
    type: "OBJECT",
    properties: {
      scenes: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            sceneNo: { type: "INTEGER" },
            photoPrompt: { type: "STRING" },
            motionPrompt: { type: "STRING" }
          },
          required: ["sceneNo", "photoPrompt", "motionPrompt"]
        }
      }
    },
    required: ["scenes"]
  };

  return await callGeminiAPI(apiKey, prompt, responseSchema, systemInstruction);
}

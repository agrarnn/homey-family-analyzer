# วิดีโอ/MV บลูปริ้นท์บอร์ด - รุ่นสภาพแวดล้อมเสมือนจริง (Video/MV Blueprint Board - Virtual Environment Edition)
**เพลง:** คาถาป้องกันคนแปลกหน้า(Revise).wav
**ความยาวเพลง:** 2:59 นาที (ปัดเศษเวลาผลิตเป็น 3:00 นาที หรือ 180 วินาที)
**สไตล์งานภาพ:** Disney Pixar 3D Animation (สภาพแวดล้อมเสมือนจริง - Virtual Environment) - ปรับปรุงสำหรับ Google Flow / Imagen 3 Omni Flash
**สัดส่วนหน้าจอ:** แนวนอน 16:9

> [!NOTE]
> รายละเอียดเวลาได้รับการคำนวณและปรับเปลี่ยนเพื่อจำกัดความยาว (Duration) ของแต่ละซีนให้อยู่ในเกณฑ์ **6, 8, หรือ 10 วินาทีเท่านั้น** เพื่อความสอดคล้องลื่นไหลของเรื่องราวในฝ่ายผลิต 3 มิติ และปรับปรุง Prompt ทุกคอลัมน์ให้เหมาะสมกับโมเดล Google Flow / Omni Flash

---

## 1. เอกสารแบบตัวละคร (Character Sheets) - สำหรับ Omni Flash
ตัวละครหลักทั้งหมดได้รับการออกแบบในสไตล์ดิสนีย์-พิกซาร์ 3 มิติ และมีภาพต้นแบบบันทึกไว้ในโฟลเดอร์ `Characters` เรียบร้อยแล้ว:

1.  **น้องโฮมมี่ (Homey):** ลูกลิงตัวน้อย แสนซน ร่าเริง - ลูกลิงตัวจิ๋วตาโตกลม สวมเสื้อยืดลายขวางคู่กับเอี๊ยมยีนส์สีน้ำเงินเข้ม ในมือมักจะถือกล้วย มีความอยากรู้อยากเห็นและพลังเหลือล้น
    *   *ไฟล์อ้างอิง:* [Son_Character Sheet.png](file:///Users/agrarn/Documents/Antigravity/HOMEY%20FAMILY/Characters/Son_Character%20Sheet.png)
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `A 3D animated character design of น้องโฮมมี่ (Homey), a small, energetic monkey cub with big, expressive round eyes and a joyful smile. He is wearing a red and white striped t-shirt under dark blue denim overalls. The character is designed in a modern 3D animation style with clean plasticine clay textures, standing on a simple light gray studio background.`
2.  **พ่อยีราฟ (Dad):** คุณพ่อผู้อบอุ่น จิตใจดี ตัวสูงใหญ่ - ยีราฟคุณพ่อตัวสูงใหญ่ สวมเสื้อโปโลสีเขียว กางเกงขายาวสีน้ำเงินเข้ม และรองเท้าผ้าใบสีขาว มีรอยยิ้มที่เป็นมิตร อบอุ่น แววตาเอ็นดูครอบครัว
    *   *ไฟล์อ้างอิง:* [Dad_Character Sheet.png](file:///Users/agrarn/Documents/Antigravity/HOMEY%20FAMILY/Characters/Dad_Character%20Sheet.png)
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `A 3D animated character design of พ่อยีราฟ (Dad), a tall, warm-hearted giraffe father with a friendly smile and gentle, kind eyes. He is wearing a green polo shirt and dark blue trousers. The design features smooth claymation textures and clean curves in a modern 3D animated film style, standing on a simple studio backdrop.`
3.  **แม่หมี (Mom):** คุณแม่หมีผู้แสนอ่อนโยนและใจดี - แม่หมีสีน้ำตาลอ่อน ขนฟูนุ่ม สวมเสื้อสีขาว คลุมทับด้วยเสื้อคาร์ดิแกนสีชมพู กางเกงขายาวสีกากี และรองเท้าสีขาว ยิ้มแย้มต้อนรับทุกคนอย่างอบอุ่น
    *   *ไฟล์อ้างอิง:* [Mom_Character Sheet.png](file:///Users/agrarn/Documents/Antigravity/HOMEY%20FAMILY/Characters/Mom_Character%20Sheet.png)
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `A 3D animated character design of แม่หมี (Mom), a gentle and kind brown bear mother with soft brown fur and an affectionate smile. She is wearing a white shirt under a cozy pink knit cardigan and khaki trousers. The character model is shown in multiple views: front view, side view, and back view against a simple, solid light gray background. Styled like a modern 3D animated movie with clean clay textures.`
4.  **คุณยายเต่า (Granny):** คุณยายเต่าผู้ใจดีและรอบรู้ - คุณยายเต่าสูงวัย ใส่แว่นตากลม โพกผ้าคลุมศีรษะสีชมพูสลับลายดอกไม้ สวมเสื้อคาร์ดิแกนถักสีครีม กางเกงสีเขียวหม่น และรองเท้าสีน้ำตาล
    *   *ไฟล์อ้างอิง:* [Granny_Character Sheet.png](file:///Users/agrarn/Documents/Antigravity/HOMEY%20FAMILY/Characters/Granny_Character%20Sheet.png)
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `A 3D animated character design of คุณยายเต่า (Granny), a kind and wise elderly turtle grandmother wearing round glasses and a pink floral headscarf. She wears a cream cable-knit cardigan and muted green trousers. The model sheet shows front, side, and back profiles on a clean, solid light gray background. It features a modern 3D claymation style with clean fabric textures and soft lighting.`
5.  **คนแปลกหน้า (Stranger):** สุนัขจิ้งจอกเจ้าเล่ห์แต่ดูน่ารักแบบการ์ตูน ไม่น่ากลัวจนเกินไป สวมชุดฮู้ดสีม่วงเข้ม ใส่แว่นกันแดดสีดำ ถือของเล่นหรือขนมหวานสีสันสดใสพยายามยื่นให้เด็กๆ
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `A 3D animated character design of คนแปลกหน้า (Stranger), a cartoonish sly fox stranger with a friendly but slightly mischievous face. He wears a dark purple hoodie with the hood up, dark black sunglasses, and holds a colorful swirl lollipop in his hand. The character model sheet displays front view, side view, and back view on a clean, solid light gray background. Modern 3D animated film style with smooth clay-like textures.`

---

## 2. เอกสารแนวคิดสถานที่ (Location Sheets)
สถานที่ดำเนินเรื่องเป็นสภาพแวดล้อมเสมือนจริง (Virtual Environment) 3 มิติ เพื่อสร้างความรู้สึกมีส่วนร่วมและสมจริงตามเนื้อเรื่อง:

1.  **Neighborhood Playground (สนามเด็กเล่นในหมู่บ้าน):** สนามเด็กเล่นที่สดใสในตอนกลางวัน มีเครื่องเล่นสีสันสดใส เช่น ชิงช้า สไลเดอร์ พื้นปูหญ้าสีเขียว ล้อมรอบด้วยต้นไม้ร่มรื่น
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `An environment concept design of a colorful suburban playground with slide and swing sets. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with soft shadows.`
2.  **Homey's Front Yard (หน้าบ้านของโฮมมี่):** หน้าบ้านแสนอบอุ่นสไตล์โมเดิร์นคันทรี่ มีรั้วไม้สีขาวล้อมรอบ สวนดอกไม้เล็กๆ และสนามหญ้าหน้าบ้าน
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming two-story wooden cottage in the background under soft warm sunlight. Modern 3D animation style.`
3.  **Suburban Sidewalk (ทางเดินริมถนนในหมู่บ้าน):** ทางเดินเท้าข้างถนนในหมู่บ้านที่สะอาดตา ด้านข้างมีพุ่มไม้สีเขียวเรียงราย ท้องฟ้าสีครามสดใส
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges line the path under a bright blue sky. Clear daylight in a modern 3D animated film style.`
4.  **Cozy Living Room (ห้องนั่งเล่นในบ้าน):** ห้องนั่งเล่นแสนอบอุ่น ผนังเป็นไม้มีโซฟานุ่ม โต๊ะเตี้ย แสงไฟอบอุ่นส่องจากโคมไฟ
    *   *Prompt สำหรับ Imagen 3 / Omni Flash:*
        > `An interior design sheet of a cozy and warm family living room. It features a comfortable fabric sofa, a wooden coffee table, a warm rug on the floor, and soft lighting from a lamp. Cute 3D animated film style with smooth claymation textures.`

---

## 3. แผนงานการถ่ายทำรายซีน (Scene Production Board)

### ซีนที่ 1 (0:00 - 0:08) | ความยาว: 8 วินาที
*   **คิวเสียง:** "(ดนตรีอินโทรเริ่มต้น สดใส ดึงดูดความสนใจ)"
*   **ภาพเหตุการณ์:** เปิดฉากด้วยภาพมุมกว้าง (Wide Shot) ของสนามเด็กเล่น Neighborhood Playground ในยามเช้า แสงแดดสีทองอบอุ่นส่องสว่าง น้องโฮมมี่ (Homey) ลูกลิงน้อยแสนซนกระโดดโลดเต้นและวิ่งเล่นอย่างสนุกสนานบนสนามหญ้าสีเขียวขจีอย่างมีชีวิตชีวา
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A wide shot of a colorful suburban playground with slides, swings, and green grass lawns under a bright, sunny sky. A small, energetic monkey cub named น้องโฮมมี่ (Homey) with big round eyes, wearing a striped t-shirt and blue denim overalls, is jumping joyfully. The visual style is that of a modern 3D animated movie with smooth plasticine clay textures and warm, volumetric lighting.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A slow camera pan across the sunny playground, following the monkey cub น้องโฮมมี่ (Homey) as he runs and skips with excitement.`

### ซีนที่ 2 (0:08 - 0:14) | ความยาว: 6 วินาที
*   **คิวเสียง:** "(ดนตรีจังหวะสนุกสนาน โฮมมี่กระโดดเล่นโลดเต้น)"
*   **ภาพเหตุการณ์:** น้องโฮมมี่ (Homey) วิ่งเข้าไปทักทาย พ่อยีราฟ (Dad) และ แม่หมี (Mom) ที่ยืนยิ้มแย้มคอยเฝ้าดูแลอยู่บริเวณสนามเด็กเล่น บรรยากาศอบอุ่นและเปี่ยมด้วยความสุขของครอบครัว
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Soft warm light
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey) running happily to greet his parents in a sunny playground. Standing nearby are พ่อยีราฟ (Dad), a tall giraffe father in a green polo shirt, and แม่หมี (Mom), a gentle brown bear mother in a pink cardigan. The style is a modern 3D animation with clean claymation textures under soft, warm morning light.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera slowly pans in, capturing the warm family reunion as the parents smile and wave back to the monkey cub.`

### ซีนที่ 3 (0:14 - 0:20) | ความยาว: 6 วินาที
*   **คิวเสียง:** "มีคนแปลกหน้า เดินเข้ามาใกล้ / ในมือมีของเล่น สีสันสดใส"
*   **ภาพเหตุการณ์:** น้องโฮมมี่ (Homey) กำลังยืนอยู่บนทางเดินเท้า Suburban Sidewalk ทันใดนั้น คนแปลกหน้า (Stranger) สุนัขจิ้งจอกเจ้าเล่ห์สวมฮู้ดสีม่วงเข้มและแว่นกันแดดสีดำค่อยๆ เดินเยื้องย่างเข้ามาใกล้ ในมือถือหุ่นยนต์ของเล่นสีแดงสดใสพยายามเสนอให้
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot on a clean suburban sidewalk with green hedges in the background. น้องโฮมมี่ (Homey) looks surprised as คนแปลกหน้า (Stranger), a cartoonish sly fox stranger wearing a dark purple hoodie and black sunglasses, approaches and offers him a vibrant red toy robot. The style is a modern 3D animated film with smooth clay textures under clear daylight.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The stranger fox walks into the frame from the side, extending his hand to offer the toy robot as the camera tracks his movement.`

### ซีนที่ 4 (0:20 - 0:28) | ความยาว: 8 วินาที
*   **คิวเสียง:** "ยื่นมาตรงหน้า เอ๊ะ น่าสนุกจัง / แต่เดี๋ยวก่อนนะ โฮมมี่ขอหยุดฟัง"
*   **ภาพเหตุการณ์:** ภาพโคลสอัป (Close-up) ของเล่นหุ่นยนต์สีแดงยื่นเข้ามาใกล้หน้าน้องโฮมมี่ (Homey) น้องลิงน้อยทำตาโตด้วยความสนใจในตอนแรก แต่จากนั้นเขาก็หยุดชะงัก ชักมือกลับ และมีสีหน้าครุ่นคิด นึกถึงคำเตือน
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Close-up
    *   **มุมกล้อง (Camera Angle):** Slightly Low-angle
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A close-up shot of a colorful red toy robot being offered by a fox's hand on a suburban sidewalk. In the background, น้องโฮมมี่ (Homey) stands with a hesitant and thoughtful expression, pulling his hands back. The shot is taken from a slightly low-angle under natural daylight with a 3D animated claymation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A slow camera zoom onto the monkey cub's face, capturing the shift in his expression from curiosity to caution.`

### ซีนที่ 5 (0:28 - 0:34) | ความยาว: 6 วินาที
*   **คิวเสียง:** "นึกถึงคำสอน ของคุณพ่อคุณแม่"
*   **ภาพเหตุการณ์:** ภาพนึกย้อน (Flashback) ในความทรงจำของโฮมมี่ เห็น พ่อยีราฟ (Dad) ในเสื้อโปโลสีเขียว และ แม่หมี (Mom) ในเสื้อคาร์ดิแกนสีชมพู กำลังนั่งสั่งสอนน้องโฮมมี่อย่างอ่อนโยนและใจดีในห้องนั่งเล่นที่อบอุ่น
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Soft warm light
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom) (ในความทรงจำ)
*   **สถานที่ (Location):** Cozy Living Room
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of a warm, cozy living room. In a soft-focus flashback, พ่อยีราฟ (Dad), a tall giraffe father in a green polo shirt, and แม่หมี (Mom), a gentle brown bear mother in a pink cardigan, are sitting together and speaking kindly to น้องโฮมมี่ (Homey). The scene features a warm, cinematic glow with a modern 3D animated film aesthetic.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An interior design sheet of a cozy and warm family living room. It features a comfortable fabric sofa, a wooden coffee table, a warm rug on the floor, and soft lighting from a lamp, creating an inviting atmosphere. Cute 3D animated film style with smooth claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A gentle camera slow zoom onto the parents as they nod lovingly and gesture with advice towards the monkey cub.`

### ซีนที่ 6 (0:34 - 0:40) | ความยาว: 6 วินาที
*   **คิวเสียง:** "ถ้าคนที่ไม่รู้จัก เราต้องระวังให้แน่ / เตรียมทำท่าไม้ตาย คาถาป้องกันตัว"
*   **ภาพเหตุการณ์:** ภาพตัดกลับมาที่ปัจจุบัน น้องโฮมมี่ (Homey) หันกลับมาเผชิญหน้ากับคนแปลกหน้า (Stranger) บนทางเดินเท้าอย่างมั่นใจ ยืนตัวตรงทำท่าเตรียมพร้อมใช้คาถาป้องกันตัวอย่างกล้าหาญ
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Close-up
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium close-up of น้องโฮมมี่ (Homey) standing on the sidewalk. He has a determined, confident look on his face, with hands raised in a defensive ready stance to protect himself. The scene is bright and clean with a 3D animated clay texture style under natural daylight.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera moves in closer to the monkey cub as he shifts his weight into a firm, brave stance and prepares to speak.`

### ซีนที่ 7 (0:40 - 0:48) | ความยาว: 8 วินาที
*   **คิวเสียง:** "ไม่ ไม่ ไม่ ขอบคุณครับ / ไม่รับของจากคนแปลกหน้า"
*   **ภาพเหตุการณ์:** น้องโฮมมี่ (Homey) ยกมือทั้งสองข้างขึ้นมาโบกปฏิเสธ และส่ายหัวอย่างชัดเจน พูดปฏิเสธคนแปลกหน้า (Stranger) อย่างสุภาพแต่หนักแน่น หมาป่าจิ้งจอกดูหน้าถอดสีและอึ้งไป
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Close-up
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium close-up of น้องโฮมมี่ (Homey) making a polite stop gesture with both hands raised, shaking his head to say no. In the background, คนแปลกหน้า (Stranger), the sly fox, looks taken aback and surprised by the rejection. The style is a clean 3D clay animation under soft outdoor light.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The monkey cub shakes his head and pushes his hands forward in a polite 'no' gesture, while the fox stranger draws back his hand.`

### ซีนที่ 8 (0:48 - 0:58) | ความยาว: 10 วินาที
*   **คิวเสียง:** "หันไปถามคุณพ่อคุณแม่ / ปลอดภัยแน่ๆ สบายใจจัง (พูด: โฮมมี่ไม่รับของจากคนแปลกหน้าครับ!)"
*   **ภาพเหตุการณ์:** น้องโฮมมี่ (Homey) วิ่งจากทางเดินเท้ากลับเข้ามาหา พ่อยีราฟ (Dad) และ แม่หมี (Mom) ที่รออยู่บริเวณหน้าบ้านอย่างรวดเร็ว ปล่อยให้คนแปลกหน้าหมาป่าจิ้งจอกเดินถอยห่างหงอยๆ ออกไป
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Soft warm light
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom)
*   **สถานที่ (Location):** Homey's Front Yard
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A wide shot of a cozy home's front yard. น้องโฮมมี่ (Homey) runs happily toward his parents, พ่อยีราฟ (Dad) and แม่หมี (Mom), who are waiting with open arms on the green lawn. The fox stranger is walking away in the distant background. Warm, comforting golden light in a 3D animated style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming wooden cottage in the background under soft warm sunlight. Modern 3D animation style with clean claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera tracks the monkey cub as he runs into his mother bear's warm hug, showing a sense of safety and relief.`

### ซีนที่ 9 (0:58 - 1:04) | ความยาว: 6 วินาที
*   **คิวเสียง:** "พ่อฮีโร่ตัวสูง ยืนยิ้มแฉ่งรออยู่"
*   **ภาพเหตุการณ์:** ภาพช็อตมุมต่ำชี้ขึ้นหา พ่อยีราฟ (Dad) คุณพ่อยีราฟผู้สูงใหญ่ยืนยิ้มแฉ่งกว้างด้วยความภูมิใจที่โฮมมี่เชื่อฟังคำสั่งสอนและปลอดภัยจากคนแปลกหน้า
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Close-up
    *   **มุมกล้อง (Camera Angle):** Low-angle
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** พ่อยีราฟ (Dad)
*   **สถานที่ (Location):** Homey's Front Yard
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A low-angle medium close-up of พ่อยีราฟ (Dad), a tall, friendly giraffe father wearing a green polo shirt. He is smiling warmly and proudly down toward the viewer. The background shows a soft-focus sunny yard. The style is a modern 3D animated film with smooth textures.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming wooden cottage in the background under soft warm sunlight. Modern 3D animation style with clean claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A gentle camera tilt upwards, emphasizing the tall father's height as he smiles and gives a reassuring thumbs-up.`

### ซีนที่ 10 (1:04 - 1:12) | ความยาว: 8 วินาที
*   **คิวเสียง:** "แม่หมีกางแขนกอด แม่คอยเฝ้าดู / ถ้ามีคนแปลกหน้า วิ่งมาหาผู้ใหญ่ / จำไว้นะเด็กๆ ปลอดภัยตลอดไป"
*   **ภาพเหตุการณ์:** แม่หมี (Mom) กางแขนกอดน้องโฮมมี่ (Homey) ด้วยความอบอุ่น พ่อยีราฟยืนลูบหัวคอยเฝ้าดูอย่างทะนุถนอม สื่อความหมายถึงความปลอดภัยที่เด็กๆ จะได้รับเมื่ออยู่ใกล้ผู้ใหญ่
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Soft warm light
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom)
*   **สถานที่ (Location):** Homey's Front Yard
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of แม่หมี (Mom), a gentle brown bear mother in a pink knit cardigan, hugging น้องโฮมมี่ (Homey) protectively on the grass. Beside them, พ่อยีราฟ (Dad) smiles and gently pats the monkey cub's head. The setting is warm and cozy, with soft lighting and smooth 3D animation details.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming wooden cottage in the background under soft warm sunlight. Modern 3D animation style with clean claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera slowly pushes in, capturing the secure hug and the loving expressions of the parents and the child monkey.`

### ซีนที่ 11 (1:12 - 1:18) | ความยาว: 6 วินาที
*   **คิวเสียง:** "(ดนตรี Instrumental Break จังหวะสั้นๆ)"
*   **ภาพเหตุการณ์:** ภาพทัศนียภาพกว้างของสนามเด็กเล่น Neighborhood Playground แสงแดดสดใส ชิงช้าไกวเบาๆ อย่างสงบสุข ท้องฟ้าครามไร้เมฆหมอก ดนตรีดึงจังหวะเปลี่ยนผ่านสู่ท่อนถัดไป
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** High-angle
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** ไม่มีตัวละครหลัก (สนามเด็กเล่นว่างเปล่า)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A high-angle wide shot of a vibrant suburban playground with colorful swings and slides under a clear blue sky. Tall green trees surround the area, catching the bright morning sun. Modern 3D animated movie environment design with clean textures.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A swift camera sweep from right to left, showcasing the sunny playground with leaves blowing gently in the wind.`

### ซีนที่ 12 (1:18 - 1:24) | ความยาว: 6 วินาที
*   **คิวเสียง:** "ไม่ ไม่ ไม่ ขอบคุณครับ / ไม่รับของจากคนแปลกหน้า"
*   **ภาพเหตุการณ์:** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad) และ แม่หมี (Mom) ร่วมกันเต้นท่าปฏิเสธน่ารักๆ บนสนามเด็กเล่นอย่างร่าเริง เพื่อเน้นย้ำคาถาป้องกันตัวให้เด็กๆ จำได้แม่นยำ
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), and แม่หมี (Mom) performing a coordinated, playful dance on the playground. They are smiling and holding their hands out in a 'stop' gesture. The style is a cheerful 3D clay animation under bright daylight.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The family dances in synchronization, swaying side to side and pushing their hands forward in rhythm to the upbeat music.`

### ซีนที่ 13 (1:24 - 1:30) | ความยาว: 6 วินาที
*   **คิวเสียง:** "หันไปถามคุณพ่อคุณแม่ / ปลอดภัยแน่ๆ สบายใจจัง"
*   **ภาพเหตุการณ์:** พ่อแม่สวมกอดโฮมมี่อย่างมีความสุข โฮมมี่ยิ้มแย้มสดใส ท่าทางสบายใจ รู้สึกมั่นใจและปลอดภัยเมื่อปฏิบัติตามคำสอน
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey) standing happily in the center of the playground, looking up with a big smile at พ่อยีราฟ (Dad) and แม่หมี (Mom) who look down at him with approving, loving expressions. Bright daylight, modern 3D animation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A gentle camera tilt and roll, showing the family laughing together and celebrating the lesson learned.`

### ซีนที่ 14 (1:30 - 1:36) | ความยาว: 6 วินาที
*   **คิวเสียง:** "มีคนแปลกหน้า เดินเข้ามาใกล้ / ในมือมีของเล่น สีสันสดใส"
*   **ภาพเหตุการณ์:** เหตุการณ์สมมติใหม่: โฮมมี่นั่งอยู่บนชิงช้าที่สนามเด็กเล่น คนแปลกหน้า (Stranger) สุนัขจิ้งจอกเจ้าเก่าพยายามเดินเข้ามาใกล้ ในมือถืออมยิ้มขนาดยักษ์สีรุ้งล่อตาล่อใจยื่นมาตรงหน้า
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey) sitting on a swing. From the side, คนแปลกหน้า (Stranger), the sly fox in a purple hoodie and sunglasses, walks closer while holding a giant colorful swirl lollipop. Bright daylight, modern 3D claymation style with soft shadows.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The fox stranger approaches slowly, holding out the giant lollipop and waving it slightly to get the monkey cub's attention.`

### ซีนที่ 15 (1:36 - 1:42) | ความยาว: 6 วินาที
*   **คิวเสียง:** "ยื่นมาตรงหน้า เอ๊ะ น่าสนุกจัง / แต่เดี๋ยวก่อนนะ โฮมมี่ขอหยุดฟัง"
*   **ภาพเหตุการณ์:** โฮมมี่มองอมยิ้มตาเป็นประกาย เกือบจะยื่นมือออกไปรับ แต่ก็นึกเอะใจในคำสอน รีบดึงมือกลับมาและทำท่าคิดทบทวน
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Close-up
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A close-up shot of น้องโฮมมี่ (Homey) on the swing. He is looking at the colorful lollipop with curiosity but pauses, putting a finger to his chin in a thoughtful, cautious pose. Natural outdoor light in a 3D animated style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera zooms in on the monkey cub's face as he hesitates, pulls his hand back, and changes his expression to one of careful thought.`

### ซีนที่ 16 (1:42 - 1:48) | ความยาว: 6 วินาที
*   **คิวเสียง:** "นึกถึงคำสอน ของคุณพ่อคุณแม่"
*   **ภาพเหตุการณ์:** ภาพความทรงจำย้อนหลัง (Flashback) โฮมมี่นึกถึงคุณยายเต่า (Granny) ที่คอยนั่งกอดและบอกสอนวิธีรับมือคนแปลกหน้าอย่างใจดีใต้ร่มไม้หน้าบ้าน
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Soft warm light
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คุณยายเต่า (Granny) (ในความทรงจำ)
*   **สถานที่ (Location):** Homey's Front Yard
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of a garden park bench. In a warm-toned flashback, คุณยายเต่า (Granny), an elderly turtle grandmother in round glasses and floral headscarf, is talking gently and advising น้องโฮมมี่ (Homey) with a kind smile. Soft, warm light in a 3D animated film style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming wooden cottage in the background under soft warm sunlight. Modern 3D animation style with clean claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A slow camera slide to the right, showing the grandmother patting the monkey's arm lovingly during the memory.`

### ซีนที่ 17 (1:48 - 1:54) | ความยาว: 6 วินาที
*   **คิวเสียง:** "ถ้าคนที่ไม่รู้จัก เราต้องระวังให้แน่ / เตรียมทำท่าไม้ตาย คาถาป้องกันตัว"
*   **ภาพเหตุการณ์:** โฮมมี่ (Homey) ยืนตัวตรงเท้าสะเอวอย่างกล้าหาญบนสนามหญ้าในสนามเด็กเล่น มีความตั้งใจจริงจัง เตรียมจะปฏิเสธการหลอกล่ออย่างแน่นอน
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey) standing beside the swing set. He has a brave expression and holds his hands on his hips in a heroic posture, ready to face the stranger. Cheerful outdoor daylight, modern 3D clay animation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The monkey cub jumps down from the swing, landing firmly on the grass, and strikes a confident pose with his hands on his hips.`

### ซีนที่ 18 (1:54 - 2:02) | ความยาว: 8 วินาที
*   **คิวเสียง:** "ไม่ ไม่ ไม่ ขอบคุณครับ / ไม่รับของจากคนแปลกหน้า"
*   **ภาพเหตุการณ์:** โฮมมี่เอ่ยปากสั่นหัว และปฏิเสธไม่รับอมยิ้มขนาดยักษ์ คนแปลกหน้า (Stranger) หมาป่าจิ้งจอกเดินคอตกถอยหลังหนีไปด้วยความท้อแท้
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Close-up
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Cheerful daylight
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คนแปลกหน้า (Stranger)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium close-up of น้องโฮมมี่ (Homey) raising a hand to wave 'no' with a polite but firm expression. The fox stranger in the purple hoodie looks disappointed and pulls the giant lollipop back. Clear daylight, clean 3D animation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `น้องโฮมมี่ (Homey) shakes his head and makes a clear stop gesture. The stranger fox steps back, looking defeated.`

### ซีนที่ 19 (2:02 - 2:10) | ความยาว: 8 วินาที
*   **คิวเสียง:** "หันไปถามคุณพ่อคุณแม่ / ปลอดภัยแน่ๆ สบายใจจัง"
*   **ภาพเหตุการณ์:** พ่อยีราฟอุ้มโฮมมี่ขึ้นขี่คอ แม่หมีกางแขนหัวเราะร่าเริงอยู่เคียงข้างอย่างโล่งอกและสุขใจ บรรยากาศยามเย็นเปลี่ยนผ่านเป็นสีทองอบอุ่น
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Golden hour
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A wide shot of the playground during a beautiful golden sunset. พ่อยีราฟ (Dad), the tall giraffe father, has น้องโฮมมี่ (Homey) sitting happily on his shoulders, while แม่หมี (Mom), the brown bear, stands next to them laughing. Soft golden hour light in a 3D animated film style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera slowly pans up and pulls back, showing the happy family silhouetted against the warm orange sunset sky.`

### ซีนที่ 20 (2:10 - 2:16) | ความยาว: 6 วินาที
*   **คิวเสียง:** "พ่อฮีโร่ตัวสูง ยืนยิ้มแฉ่งรออยู่"
*   **ภาพเหตุการณ์:** ภาพพ่อยีราฟ (Dad) ก้มหัวลงมาส่งรอยยิ้มอุ่นๆ คอยอุ้มดูแลโฮมมี่อย่างปลอดภัยในอ้อมแขน พ่อคือฮีโร่ตัวจริงที่ช่วยปกป้องภัยร้าย
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Close-up
    *   **มุมกล้อง (Camera Angle):** Low-angle
    *   **การจัดแสง (Lighting):** Golden hour
*   **ตัวละครในฉาก (Characters):** พ่อยีราฟ (Dad), น้องโฮมมี่ (Homey)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A low-angle medium close-up of พ่อยีราฟ (Dad), the tall giraffe father, smiling kindly down. The warm, golden sunset light creates a gentle glow on his features. The background is a soft-focus residential playground. 3D animated clay style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera moves slowly backward and down, showing the giraffe father leaning down to gently reassure the monkey cub.`

### ซีนที่ 21 (2:16 - 2:22) | ความยาว: 6 วินาที
*   **คิวเสียง:** "แม่หมีกางแขนกอด แม่คอยเฝ้าดู / ถ้ามีคนแปลกหน้า วิ่งมาหาผู้ใหญ่ / จำไว้นะเด็กๆ ปลอดภัยตลอดไป"
*   **ภาพเหตุการณ์:** แม่หมีกอดประคองโฮมมี่ไว้พลางส่งยิ้มอ่อนโยนให้กล้อง สื่อสารกับผู้ชมเด็กๆ เพื่อย้ำเตือนกฎความปลอดภัยที่ต้องจำให้ขึ้นใจ
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Golden hour
*   **ตัวละครในฉาก (Characters):** แม่หมี (Mom), น้องโฮมมี่ (Homey)
*   **สถานที่ (Location):** Neighborhood Playground
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of แม่หมี (Mom), the bear mother, hugging น้องโฮมมี่ (Homey) tightly on the playground. She looks toward the camera with a friendly, advising expression. The scene is bathed in warm golden hour sunset light, with a clean 3D clay animation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a colorful suburban playground with slides, swing sets, and climbing structures. The ground is a vibrant green grass lawn under a bright sunny sky, surrounded by tall shady trees. Modern 3D animated film aesthetic with smooth plasticine clay textures and soft volumetric lighting, wide view.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera slides gently to the left as แม่หมี (Mom) points reassuringly towards the viewer to emphasize the lesson.`

### ซีนที่ 22 (2:22 - 2:28) | ความยาว: 6 วินาที
*   **คิวเสียง:** "(ดนตรี Instrumental Break จังหวะสั้นๆ)"
*   **ภาพเหตุการณ์:** ภาพทางเดินหมู่บ้าน Suburban Sidewalk ยามโพล้เพล้แสงทไวไลท์สีส้มสวยงาม คลื่นเสียงจังหวะดนตรีเร้าใจเปลี่ยนฉากอย่างลื่นไหล
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Golden hour
*   **ตัวละครในฉาก (Characters):** ไม่มีตัวละครหลัก (ฉากหมู่บ้านยามเย็น)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A wide shot of a peaceful suburban sidewalk with cozy houses and green fences under an orange and pink sunset sky. The atmosphere is warm and quiet. Modern 3D animated movie landscape design.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A quick cinematic camera pan from left to right across the sidewalk, capturing the warm colors of the sunset.`

### ซีนที่ 23 (2:28 - 2:34) | ความยาว: 6 วินาที
*   **คิวเสียง:** "ไม่ ไม่ ไม่ ขอบคุณครับ / ไม่รับของจากคนแปลกหน้า"
*   **ภาพเหตุการณ์:** น้องโฮมมี่ (Homey) เต้นรำน่ารักๆ ไปพร้อมกับคุณยายเต่า (Granny) บนทางเดินเท้าอย่างสนุกสนาน ออกลีลาท่าทางปฏิเสธตามเพลงอย่างร่าเริง
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Golden hour
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), คุณยายเต่า (Granny)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey) and คุณยายเต่า (Granny), the turtle grandmother, dancing side by side on the sidewalk. They are smiling and waving their hands in a stop gesture, laughing together. Warm sunset light, clean 3D claymation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The grandmother turtle and the monkey cub dance playfully, swinging their arms in a cute stop motion pattern.`

### ซีนที่ 24 (2:34 - 2:40) | ความยาว: 6 วินาที
*   **คิวเสียง:** "หันไปถามคุณพ่อคุณแม่ / ปลอดภัยแน่ๆ สบายใจจัง (พูด: เพื่อนๆ ก็ต้องระวังเหมือนโฮมมี่นะ!)"
*   **ภาพเหตุการณ์:** ทุกคนในครอบครัว โฮมมี่ พ่อยีราฟ แม่หมี ยายเต่า มารวมตัวกันกอดไหล่กัน โฮมมี่หันมาโบกมือชูสองนิ้วให้กล้องพูดแนะนำผู้ชมทางบ้าน
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Golden hour
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom), คุณยายเต่า (Granny)
*   **สถานที่ (Location):** Suburban Sidewalk
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of the entire family: น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom), and คุณยายเต่า (Granny) standing together. น้องโฮมมี่ (Homey) waves a peace sign and smiles directly at the viewer under the warm sunset light. Modern 3D animated style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a clean suburban sidewalk next to a quiet residential street. Lush green hedges and suburban houses are visible in the background under a bright blue sky. Clear daylight in a modern 3D animated film style with clean clay textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera zooms in slightly on the smiling monkey cub as he winks and waves his hand to the audience.`

### ซีนที่ 25 (2:40 - 2:48) | ความยาว: 8 วินาที
*   **คิวเสียง:** "คาถาวิเศษ ท่องไว้ให้ดี / ปฏิเสธทันที เมื่อเจอคนแปลกหน้า"
*   **ภาพเหตุการณ์:** ทุกคนทำท่าโพสเหมือนซูเปอร์ฮีโร่หน้าบ้าน มีแสงวิเศษประกายวิบวับรอบตัวอย่างอัศจรรย์ใจ สร้างความรู้สึกแข็งแกร่งและปลอดภัย
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Medium Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom), คุณยายเต่า (Granny)
*   **สถานที่ (Location):** Homey's Front Yard
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A medium shot of น้องโฮมมี่ (Homey) and his family standing in a heroic superhero pose, pointing one finger to the sky. Colorful cartoonish magic stars and sparkles float around them. Bright, cheerful lighting with a modern 3D clay animation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming wooden cottage in the background under soft warm sunlight. Modern 3D animation style with clean claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The camera revolves slowly around the family in a circular path as colorful magic particles swirl up around them.`

### ซีนที่ 26 (2:48 - 2:54) | ความยาว: 6 วินาที
*   **คิวเสียง:** "(ดนตรี Outro ครอบครัวโฮมมี่และเพื่อนๆ เต้นรำและโบกมือบ๊ายบายอย่างมีความสุข)"
*   **ภาพเหตุการณ์:** ภาพหมู่ครอบครัวโบกมือบ๊ายบายด้วยรอยยิ้มอย่างมีความสุขและอบอุ่นใจที่หน้าบ้าน สรุปจบเพลงอย่างมีความสุข
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Soft warm light
*   **ตัวละครในฉาก (Characters):** น้องโฮมมี่ (Homey), พ่อยีราฟ (Dad), แม่หมี (Mom), คุณยายเต่า (Granny)
*   **สถานที่ (Location):** Homey's Front Yard
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A wide shot of the whole family (น้องโฮมมี่, พ่อยีราฟ, แม่หมี, คุณยายเต่า) standing in front of their cozy house, smiling and waving goodbye to the camera. Warm, soft sunset lighting, modern 3D clay animated movie ending style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `An environment concept design of a cozy country-style house front yard. It features a neat white wooden fence, green grass lawn, small blooming flower beds, and a charming wooden cottage in the background under soft warm sunlight. Modern 3D animation style with clean claymation textures.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `A slow camera pull-back (dolly out) from the waving family, letting the scene slowly fade as they smile.`

### ซีนที่ 27 (2:54 - 3:00) | ความยาว: 6 วินาที
*   **คิวเสียง:** "(โลโก้ Homey Family ปรากฏขึ้นพร้อมข้อความแง่คิดความปลอดภัย)"
*   **ภาพเหตุการณ์:** ภาพเฟดมืดลงและเผยโลโก้หลัก 'Homey Family' สีสันสดใสตรงกลางจอ พร้อมคำเตือนแง่คิดในการดูแลเด็กๆ ให้ปลอดภัย ปิดท้ายอย่างพรีเมียม
*   **รายละเอียดกล้องและแสง (Camera & Lighting Specs):**
    *   **ประเภทช็อต (Shot Type):** Wide Shot
    *   **มุมกล้อง (Camera Angle):** Eye-level
    *   **การจัดแสง (Lighting):** Bright sunny day
*   **ตัวละครในฉาก (Characters):** ไม่มีตัวละครหลัก (โลโก้แบรนด์)
*   **สถานที่ (Location):** Neutral Studio Background
*   **Photo Prompt สำหรับเจนเหตุการณ์ในซีน:**
    > `A clean, warm-toned neutral background showing a beautiful 3D rendered logo of 'Homey Family' with cute, colorful typography. The rendering has smooth clay textures and soft studio lighting. Modern 3D animation style.`
*   **Photo Prompt สำหรับสร้างฉากหลังสถานที่:**
    > `A clean, warm-toned neutral studio backdrop with soft, even lighting, creating a perfect blank canvas for typography. 3D animated film style with a smooth clay-like surface texture.`
*   **Motion Prompt สำหรับเจนวิดีโอ:**
    > `The 3D logo slowly scales up towards the viewer, with subtle specular glints reflecting off its surface, followed by a gentle fade to black.`

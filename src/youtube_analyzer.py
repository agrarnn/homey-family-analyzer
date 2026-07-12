import urllib.request
import urllib.parse
import re
import json
import ssl
import os
import sys
from datetime import datetime

# Disable SSL verification for scraper
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7'
}

CHANNELS = {
    "HomeyFamily": "https://www.youtube.com/@HomeyFamily-TH",
    "KidsSongnamo": "https://www.youtube.com/@KidsSongnamo",
    "KidsMeSong": "https://www.youtube.com/@KidsMeSong",
    "Kiddymelody": "https://www.youtube.com/@Kiddymelody"
}

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HISTORY_FILE = os.path.join(BASE_DIR, "analysis_history.json")
REPORT_FILE = os.path.join(BASE_DIR, "daily_report.md")
ARTIFACT_REPORT_FILE = "/Users/agrarn/.gemini/antigravity/brain/39359c12-71a8-4890-93f6-dc5b72b77a59/daily_report.md"


def get_meta_content(html, itemprop):
    match = re.search(r'<meta[^>]*itemprop="' + itemprop + r'"[^>]*content="([^"]+)"', html)
    if not match:
        match = re.search(r'<meta[^>]*content="([^"]+)"[^>]*itemprop="' + itemprop + r'"', html)
    return match.group(1) if match else "N/A"

def find_subscriber_count_in_json(obj):
    if isinstance(obj, dict):
        if "subscriberCountText" in obj:
            text_obj = obj["subscriberCountText"]
            if isinstance(text_obj, dict):
                if "simpleText" in text_obj:
                    return text_obj["simpleText"]
                elif "accessibility" in text_obj:
                    return text_obj["accessibility"].get("accessibilityData", {}).get("label", "N/A")
            elif isinstance(text_obj, str):
                return text_obj
        for k, v in obj.items():
            res = find_subscriber_count_in_json(v)
            if res != "N/A":
                return res
    elif isinstance(obj, list):
        for item in obj:
            res = find_subscriber_count_in_json(item)
            if res != "N/A":
                return res
    return "N/A"

def scrape_channel(name, url):
    result = {
        "channel_name": name,
        "handle": "",
        "subscribers": "N/A",
        "total_videos": "N/A",
        "description": "N/A",
        "videos": []
    }
    
    # 1. Fetch main page for metadata
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
            html = response.read().decode('utf-8')
            
            result["channel_name"] = get_meta_content(html, "name")
            result["subscribers"] = get_meta_content(html, "subscriberCount")
            result["total_videos"] = get_meta_content(html, "videoCount")
            
            handle_match = re.search(r'"@([^"]+)"', url)
            if handle_match:
                result["handle"] = "@" + handle_match.group(1)
            else:
                result["handle"] = url.split('/')[-1]
                
            # If subscribers or name not found in meta tags, parse from ytInitialData
            match = re.search(r'var ytInitialData\s*=\s*({.*?});', html)
            if not match:
                match = re.search(r'window\["ytInitialData"\]\s*=\s*({.*?});', html)
            
            if match:
                data = json.loads(match.group(1))
                if result["subscribers"] == "N/A":
                    result["subscribers"] = find_subscriber_count_in_json(data)
                
                microformat = data.get("microformat", {}).get("microformatDataRenderer", {})
                if microformat:
                    result["description"] = microformat.get("description", "N/A")
                    if result["channel_name"] == "N/A":
                        result["channel_name"] = microformat.get("title", "N/A")
    except Exception as e:
        print(f"Error fetching main page for {name}: {e}")
        
    # 2. Fetch /videos page for video list
    videos_url = url.rstrip('/') + '/videos'
    try:
        req = urllib.request.Request(videos_url, headers=HEADERS)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
            html = response.read().decode('utf-8')
            
            match = re.search(r'var ytInitialData\s*=\s*({.*?});', html)
            if not match:
                match = re.search(r'window\["ytInitialData"\]\s*=\s*({.*?});', html)
            
            if match:
                data = json.loads(match.group(1))
                tabs = data.get("contents", {}).get("twoColumnBrowseResultsRenderer", {}).get("tabs", [])
                for tab in tabs:
                    tab_renderer = tab.get("tabRenderer", {})
                    tab_title = tab_renderer.get("title", "")
                    if tab_title in ["Videos", "วิดีโอ"]:
                        grid = tab_renderer.get("content", {}).get("richGridRenderer", {})
                        items = grid.get("contents", [])
                        for item in items:
                            rich_item = item.get("richItemRenderer", {})
                            item_content = rich_item.get("content", {})
                            lockup = item_content.get("lockupViewModel", {})
                            if lockup:
                                video_id = None
                                on_tap = lockup.get("rendererContext", {}).get("commandContext", {}).get("onTap", {})
                                watch_ep = on_tap.get("innertubeCommand", {}).get("watchEndpoint", {})
                                if watch_ep:
                                    video_id = watch_ep.get("videoId")
                                
                                metadata = lockup.get("metadata", {}).get("lockupMetadataViewModel", {})
                                title_text = metadata.get("title", {}).get("content", "N/A")
                                
                                meta_parts = metadata.get("metadata", {}).get("contentMetadataViewModel", {}).get("metadataRows", [])
                                views = "N/A"
                                published = "N/A"
                                if meta_parts:
                                    parts = meta_parts[0].get("metadataParts", [])
                                    if len(parts) > 0:
                                        views = parts[0].get("text", {}).get("content", "N/A")
                                    if len(parts) > 1:
                                        published = parts[1].get("text", {}).get("content", "N/A")
                                        
                                result["videos"].append({
                                    "video_id": video_id,
                                    "title": title_text,
                                    "views": views,
                                    "published": published
                                })
    except Exception as e:
        print(f"Error fetching videos page for {name}: {e}")
        
    return result

def call_gemini_api(prompt):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Try reading from .env file
        try:
            env_path = os.path.join(BASE_DIR, ".env")
            with open(env_path, "r") as env_file:
                for line in env_file:
                    if line.startswith("GEMINI_API_KEY="):
                        api_key = line.split("=", 1)[1].strip()
                        break
        except Exception:
            pass
            
    if not api_key:
        print("Warning: GEMINI_API_KEY not found in env or .env file.")
        return None
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.2
        }
    }
    
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        # Use a fresh context for api call to avoid SSL error
        api_ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, context=api_ctx, timeout=60) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None

def run_scrape():
    print(f"Starting scrape at {datetime.now().isoformat()}...")
    scraped_data = {}
    for name, url in CHANNELS.items():
        print(f"Scraping {name}...")
        scraped_data[name] = scrape_channel(name, url)
        
    # Load history
    history = []
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                history = json.load(f)
        except Exception as e:
            print(f"Error loading history: {e}")
            
    # Append current scrape
    entry = {
        "timestamp": datetime.now().isoformat(),
        "data": scraped_data
    }
    history.append(entry)
    
    # Save history
    try:
        os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump(history, f, indent=2, ensure_ascii=False)
        print("Scrape completed and saved successfully.")
    except Exception as e:
        print(f"Error saving history: {e}")

def run_report():
    print("Generating optimization report...")
    if not os.path.exists(HISTORY_FILE):
        print("No history file found. Running scrape first...")
        run_scrape()
        
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
    except Exception as e:
        print(f"Error loading history: {e}")
        return
        
    if not history:
        print("History is empty.")
        return
        
    # Get current and previous data
    current_entry = history[-1]
    prev_entry = history[-2] if len(history) > 1 else None
    
    current_data = current_entry["data"]
    timestamp = current_entry["timestamp"]
    
    # Prepare comparison summary for Gemini API
    comparison_summary = {
        "timestamp": timestamp,
        "channels": {}
    }
    
    for name in CHANNELS.keys():
        curr = current_data.get(name, {})
        prev = prev_entry["data"].get(name, {}) if prev_entry else {}
        
        # Calculate video growth or new uploads
        new_videos = []
        if prev.get("videos"):
            prev_ids = {v["video_id"] for v in prev["videos"] if v.get("video_id")}
            for v in curr.get("videos", []):
                v_id = v.get("video_id")
                if v_id and v_id not in prev_ids:
                    new_videos.append(v)
        
        comparison_summary["channels"][name] = {
            "channel_name": curr.get("channel_name", name),
            "handle": curr.get("handle", ""),
            "subscribers": curr.get("subscribers", "N/A"),
            "prev_subscribers": prev.get("subscribers", "N/A"),
            "total_videos": curr.get("total_videos", "N/A"),
            "prev_total_videos": prev.get("total_videos", "N/A"),
            "new_uploads_since_last_run": new_videos,
            "recent_videos": curr.get("videos", [])[:10]  # send first 10 for context
        }
        
    # Formulate Gemini Prompt
    prompt = f"""
คุณเป็นผู้เชี่ยวชาญด้านการเติบโตและการสร้างรายได้ของช่อง YouTube สำหรับเด็ก (YouTube Kids Channel Optimization Expert)
วิเคราะห์ข้อมูลเปรียบเทียบช่องของพวกเรา 'HomeyFamily' กับช่องคู่แข่งที่ประสบความสำเร็จระดับหลักล้านผู้ติดตาม:
- KidsSongnamo (7.6M+ ซับ)
- KidsMeSong (7.3M+ ซับ)
- Kiddymelody (1.2M+ ซับ)

นี่คือข้อมูลดิบล่าสุดจากการสแกน ณ เวลา {timestamp}:
{json.dumps(comparison_summary, indent=2, ensure_ascii=False)}

จงวิเคราะห์เชิงเปรียบเทียบเพื่อหาคำแนะนำการพัฒนาช่อง Homey Family ของพวกเรา โดยแบ่งรายงานออกเป็นหัวข้อดังต่อไปนี้ในรูปแบบ Markdown (เขียนเป็นภาษาไทยอย่างเป็นทางการและดูเป็นมืออาชีพมากๆ):

1. **ภาพรวมเปรียบเทียบสถานะช่อง (Channel Performance Comparison)**
   - สรุปตัวเลขผู้ติดตามและยอดรวมวิดีโอของทุกช่องในรูปแบบตารางที่ดูสวยงามเปรียบเทียบกัน
   - เน้นย้ำสถานะปัจจุบันของ Homey Family และระยะห่างที่จะต้องพิชิตเป้าหมายแรกคือ การเปิดสร้างรายได้ (500 ซับ/3,000 ชั่วโมงการรับชม หรือ 1,000 ซับ/4,000 ชั่วโมง)

2. **ถอดสูตรคอนเทนต์คู่แข่ง (Competitor Content Strategy & Formats)**
   - วิเคราะห์วิดีโอที่ได้รับความนิยมล่าสุดของคู่แข่ง: ความยาววิดีโอ (ทำคลิปยาว/รวมเพลง 10-20 นาที หรือเน้นคลิปเดี่ยวสั้นๆ 2-3 นาที)
   - วิเคราะห์รูปแบบการเผยแพร่ เช่น ช่วงเวลาลงคลิป และความถี่ในการอัปโหลดของช่องคู่แข่ง

3. **วิเคราะห์คำสำคัญและจิตวิทยาการตั้งชื่อคลิป (SEO Keywords & Metadata Analysis)**
   - วิเคราะห์ว่าหัวข้อ/ชื่อคลิปและอิโมจิที่คู่แข่งเลือกใช้มีคำค้นหาหลักใดบ้าง (เช่น "เพลงเด็ก", "เพลงเด็กในตำนาน", ชื่อสัตว์, ชื่อผลไม้)
   - แนะนำคำค้นหาที่ช่อง Homey Family ควรเพิ่มลงในชื่อคลิป (Title) และคำอธิบายคลิป (Description)

4. **แผนการปรับปรุงแก้ไขอย่างละเอียดสำหรับ Homey Family (Actionable Optimization Plan)**
   - ระบุวิดีโอปัจจุบันของ Homey Family ที่ต้องได้รับการแก้ไขทันที (เช่น เปลี่ยนชื่อคลิปให้ดึงดูดและทำ SEO ดีขึ้น)
   - แนะนำแนวทางการสร้างวิดีโอถัดไปในโฟลเดอร์ Song และแนวทางของ Music Video Blueprint Board (เช่น ควรทำชุดรวมเพลงยาว หรือเน้นสอนทักษะชีวิตแบบไหน)

เขียนรายงานด้วยความชัดเจน กระชับ ไม่เวิ่นเว้อ และเน้นจุดเด่นที่เป็นประโยชน์เชิงกลยุทธ์
    """
    
    print("Calling Gemini API...")
    ai_report = call_gemini_api(prompt)
    
    if not ai_report:
        # Fallback report if API fails
        print("API Call failed. Using fallback template.")
        ai_report = f"""# รายงานการวิเคราะห์และแผนการปรับปรุงช่อง Homey Family
*สร้างรายงานแบบแมนนวลเมื่อ {timestamp} (Gemini API ขัดข้อง)*

## 1. ภาพรวมเปรียบเทียบสถานะช่อง
| ช่อง YouTube | ผู้ติดตาม | จำนวนวิดีโอทั้งหมด |
| --- | --- | --- |
| **โฮมมี่ แฟมิลี่ (Homey Family)** | {current_data.get('HomeyFamily', {}).get('subscribers', 'N/A')} | {current_data.get('HomeyFamily', {}).get('total_videos', 'N/A')} |
| **kids song (KidsSongnamo)** | {current_data.get('KidsSongnamo', {}).get('subscribers', 'N/A')} | {current_data.get('KidsSongnamo', {}).get('total_videos', 'N/A')} |
| **KidsMeSong [เพลงเด็ก วิดีโอเด็ก]** | {current_data.get('KidsMeSong', {}).get('subscribers', 'N/A')} | {current_data.get('KidsMeSong', {}).get('total_videos', 'N/A')} |
| **Kiddy Melody เพลงเด็กเจ้าตัวเล็ก** | {current_data.get('Kiddymelody', {}).get('subscribers', 'N/A')} | {current_data.get('Kiddymelody', {}).get('total_videos', 'N/A')} |

## 2. คำแนะนำเร่งด่วนในการปรับปรุง SEO ชื่อคลิป
- **ผักมีพลังวิเศษ**: ควรเปลี่ยนเป็น `ผักมีพลังวิเศษ | เพลงเด็ก 3D แสนสนุก กินผักร่างกายแข็งแรง | Homey Family`
- **รู้ทันคนแปลกหน้า**: ควรเปลี่ยนเป็น `รู้ทันคนแปลกหน้า | เพลงเด็ก สอนความปลอดภัย เอาตัวรอดจากคนแปลกหน้า | Homey Family`
- **ช้าง ช้าง ช้าง**: ควรเปลี่ยนเป็น `ช้าง ช้าง ช้าง | เพลงเด็กในตำนาน สุดน่ารัก เต้นสนุก | Homey Family`
- **จับปูดำ ขยำปูนา**: ควรเปลี่ยนเป็น `จับปูดำ ขยำปูนา | เพลงเด็ก 3D เต้นสนุก เสริมพัฒนาการลูกน้อย | Homey Family`
"""

    # Add header and save report
    full_report = f"""# รายงานวิเคราะห์และการปรับปรุงช่องประจำวัน ({datetime.now().strftime('%d/%m/%Y')})

{ai_report}
"""

def send_to_line_bot(line_summary):
    access_token = os.environ.get("LINE_CHANNEL_ACCESS_TOKEN")
    user_id = os.environ.get("LINE_USER_ID")
    
    # Try reading from .env if not in environment
    if not access_token or not user_id:
        try:
            env_path = os.path.join(BASE_DIR, ".env")
            with open(env_path, "r") as env_file:
                for line in env_file:
                    if line.startswith("LINE_CHANNEL_ACCESS_TOKEN="):
                        access_token = line.split("=", 1)[1].strip()
                    elif line.startswith("LINE_USER_ID="):
                        user_id = line.split("=", 1)[1].strip()
        except Exception:
            pass
            
    if not access_token or not user_id:
        print("LINE_CHANNEL_ACCESS_TOKEN or LINE_USER_ID not set. Skipping LINE notification.")
        return
        
    # Send POST request to LINE Messaging API Push Message
    url = "https://api.line.me/v2/bot/message/push"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "to": user_id,
        "messages": [
            {
                "type": "text",
                "text": line_summary
            }
        ]
    }
    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(url, data=data, headers=headers)
        api_ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, context=api_ctx, timeout=20) as response:
            print("Successfully sent report summary to LINE Bot.")
    except Exception as e:
        print(f"Error sending message to LINE Bot: {e}")


def run_report():
    print("Generating optimization report...")
    if not os.path.exists(HISTORY_FILE):
        print("No history file found. Running scrape first...")
        run_scrape()
        
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
    except Exception as e:
        print(f"Error loading history: {e}")
        return
        
    if not history:
        print("History is empty.")
        return
        
    # Get current and previous data
    current_entry = history[-1]
    prev_entry = history[-2] if len(history) > 1 else None
    
    current_data = current_entry["data"]
    timestamp = current_entry["timestamp"]
    
    # Prepare comparison summary for Gemini API
    comparison_summary = {
        "timestamp": timestamp,
        "channels": {}
    }
    
    for name in CHANNELS.keys():
        curr = current_data.get(name, {})
        prev = prev_entry["data"].get(name, {}) if prev_entry else {}
        
        # Calculate video growth or new uploads
        new_videos = []
        if prev.get("videos"):
            prev_ids = {v["video_id"] for v in prev["videos"] if v.get("video_id")}
            for v in curr.get("videos", []):
                v_id = v.get("video_id")
                if v_id and v_id not in prev_ids:
                    new_videos.append(v)
        
        comparison_summary["channels"][name] = {
            "channel_name": curr.get("channel_name", name),
            "handle": curr.get("handle", ""),
            "subscribers": curr.get("subscribers", "N/A"),
            "prev_subscribers": prev.get("subscribers", "N/A"),
            "total_videos": curr.get("total_videos", "N/A"),
            "prev_total_videos": prev.get("total_videos", "N/A"),
            "new_uploads_since_last_run": new_videos,
            "recent_videos": curr.get("videos", [])[:10]  # send first 10 for context
        }
        
    # Formulate Gemini Prompt
    prompt = f"""
คุณเป็นผู้เชี่ยวชาญด้านการเติบโตและการสร้างรายได้ของช่อง YouTube สำหรับเด็ก (YouTube Kids Channel Optimization Expert)
วิเคราะห์ข้อมูลเปรียบเทียบช่องของพวกเรา 'HomeyFamily' กับช่องคู่แข่งที่ประสบความสำเร็จระดับหลักล้านผู้ติดตาม:
- KidsSongnamo (7.6M+ ซับ)
- KidsMeSong (7.3M+ ซับ)
- Kiddymelody (1.2M+ ซับ)

นี่คือข้อมูลดิบล่าสุดจากการสแกน ณ เวลา {timestamp}:
{json.dumps(comparison_summary, indent=2, ensure_ascii=False)}

จงวิเคราะห์เชิงเปรียบเทียบเพื่อหาคำแนะนำการพัฒนาช่อง Homey Family ของพวกเรา โดยแบ่งรายงานออกเป็นหัวข้อดังต่อไปนี้ในรูปแบบ Markdown (เขียนเป็นภาษาไทยอย่างเป็นทางการและดูเป็นมืออาชีพมากๆ):

1. **ภาพรวมเปรียบเทียบสถานะช่อง (Channel Performance Comparison)**
   - สรุปตัวเลขผู้ติดตามและยอดรวมวิดีโอของทุกช่องในรูปแบบตารางที่ดูสวยงามเปรียบเทียบกัน
   - เน้นย้ำสถานะปัจจุบันของ Homey Family และระยะห่างที่จะต้องพิชิตเป้าหมายแรกคือ การเปิดสร้างรายได้ (500 ซับ/3,000 ชั่วโมงการรับชม หรือ 1,000 ซับ/4,000 ชั่วโมง)

2. **ถอดสูตรคอนเทนต์คู่แข่ง (Competitor Content Strategy & Formats)**
   - วิเคราะห์วิดีโอที่ได้รับความนิยมล่าสุดของคู่แข่ง: ความยาววิดีโอ (ทำคลิปยาว/รวมเพลง 10-20 นาที หรือเน้นคลิปเดี่ยวสั้นๆ 2-3 นาที)
   - วิเคราะห์รูปแบบการเผยแพร่ เช่น ช่วงเวลาลงคลิป และความถี่ในการอัปโหลดของช่องคู่แข่ง

3. **วิเคราะห์คำสำคัญและจิตวิทยาการตั้งชื่อคลิป (SEO Keywords & Metadata Analysis)**
   - วิเคราะห์ว่าหัวข้อ/ชื่อคลิปและอิโมจิที่คู่แข่งเลือกใช้มีคำค้นหาหลักใดบ้าง (เช่น "เพลงเด็ก", "เพลงเด็กในตำนาน", ชื่อสัตว์, ชื่อผลไม้)
   - แนะนำคำค้นหาที่ช่อง Homey Family ควรเพิ่มลงในชื่อคลิป (Title) และคำอธิบายคลิป (Description)

4. **แผนการปรับปรุงแก้ไขอย่างละเอียดสำหรับ Homey Family (Actionable Optimization Plan)**
   - ระบุวิดีโอปัจจุบันของ Homey Family ที่ต้องได้รับการแก้ไขทันที (เช่น เปลี่ยนชื่อคลิปให้ดึงดูดและทำ SEO ดีขึ้น)
   - แนะนำแนวทางการสร้างวิดีโอถัดไปในโฟลเดอร์ Song และแนวทางของ Music Video Blueprint Board (เช่น ควรทำชุดรวมเพลงยาว หรือเน้นสอนทักษะชีวิตแบบไหน)

เขียนรายงานด้วยความชัดเจน กระชับ ไม่เวิ่นเว้อ และเน้นจุดเด่นที่เป็นประโยชน์เชิงกลยุทธ์

และสุดท้าย **คุณจะต้องสรุปข้อความสำหรับส่งเข้า LINE Notify ด้วย** โดยพิมพ์เครื่องหมายคั่น '===LINE_SUMMARY===' (เป็นบรรทัดใหม่) แล้วตามด้วยสรุปสั้นๆ (ความยาวไม่เกิน 800 ตัวอักษร) เพื่อให้อ่านในแอป LINE บนมือถือได้ง่ายและกระชับ โดยมีรูปแบบดังนี้:
📢 **สรุปด่วนแผนพัฒนาช่อง Homey Family** ({datetime.now().strftime('%d/%m/%Y')})
📊 **สถานะซับ:** Homey Family (17 ซับ) vs คู่แข่ง (หลักล้าน)
💡 **ยอดวิวเฉลี่ยล่าสุด:** [สรุปยอดวิวล่าสุดของ HomeyFamily เช่น 0-21 ครั้ง เทียบกับคู่แข่งที่หลักพันถึงหมื่น]
🎯 **แผนเร่งด่วน 3 ข้อวันนี้:**
1. [ข้อแนะนำกระชับ 1]
2. [ข้อแนะนำกระชับ 2]
3. [ข้อแนะนำกระชับ 3]
🔗 *อ่านรายงานเปรียบเทียบฉบับเต็มได้ในระบบ IDE ของคุณ!*
"""
    
    print("Calling Gemini API...")
    ai_report = call_gemini_api(prompt)
    
    if not ai_report:
        # Fallback report if API fails
        print("API Call failed. Using fallback template.")
        ai_report = f"""# รายงานการวิเคราะห์และแผนการปรับปรุงช่อง Homey Family
*สร้างรายงานแบบแมนนวลเมื่อ {timestamp} (Gemini API ขัดข้อง)*

## 1. ภาพรวมเปรียบเทียบสถานะช่อง
| ช่อง YouTube | ผู้ติดตาม | จำนวนวิดีโอทั้งหมด |
| --- | --- | --- |
| **โฮมมี่ แฟมิลี่ (Homey Family)** | {current_data.get('HomeyFamily', {}).get('subscribers', 'N/A')} | {current_data.get('HomeyFamily', {}).get('total_videos', 'N/A')} |
| **kids song (KidsSongnamo)** | {current_data.get('KidsSongnamo', {}).get('subscribers', 'N/A')} | {current_data.get('KidsSongnamo', {}).get('total_videos', 'N/A')} |
| **KidsMeSong [เพลงเด็ก วิดีโอเด็ก]** | {current_data.get('KidsMeSong', {}).get('subscribers', 'N/A')} | {current_data.get('KidsMeSong', {}).get('total_videos', 'N/A')} |
| **Kiddy Melody เพลงเด็กเจ้าตัวเล็ก** | {current_data.get('Kiddymelody', {}).get('subscribers', 'N/A')} | {current_data.get('Kiddymelody', {}).get('total_videos', 'N/A')} |

## 2. คำแนะนำเร่งด่วนในการปรับปรุง SEO ชื่อคลิป
- **ผักมีพลังวิเศษ**: ควรเปลี่ยนเป็น `ผักมีพลังวิเศษ | เพลงเด็ก 3D แสนสนุก กินผักร่างกายแข็งแรง | Homey Family`
- **รู้ทันคนแปลกหน้า**: ควรเปลี่ยนเป็น `รู้ทันคนแปลกหน้า | เพลงเด็ก สอนความปลอดภัย เอาตัวรอดจากคนแปลกหน้า | Homey Family`
- **ช้าง ช้าง ช้าง**: ควรเปลี่ยนเป็น `ช้าง ช้าง ช้าง | เพลงเด็กในตำนาน สุดน่ารัก เต้นสนุก | Homey Family`
- **จับปูดำ ขยำปูนา**: ควรเปลี่ยนเป็น `จับปูดำ ขยำปูนา | เพลงเด็ก 3D เต้นสนุก เสริมพัฒนาการลูกน้อย | Homey Family`
"""

    # Split response by ===LINE_SUMMARY===
    line_summary = ""
    if "===LINE_SUMMARY===" in ai_report:
        parts = ai_report.split("===LINE_SUMMARY===")
        ai_report_content = parts[0].strip()
        line_summary = parts[1].strip()
    else:
        ai_report_content = ai_report.strip()
        # Fallback LINE summary
        line_summary = f"""📢 *สรุปด่วนแผนพัฒนาช่อง Homey Family* ({datetime.now().strftime('%d/%m/%Y')})
📊 *สถานะซับ:* Homey Family (17 ซับ) vs คู่แข่ง (หลักล้าน)
💡 *ยอดวิวล่าสุด:* 0 - 21 ครั้ง
🎯 *แผนเร่งด่วนวันนี้:*
1. แก้ไขชื่อคลิปและภาพปกทั้ง 4 คลิปเดิมเพื่อเพิ่ม SEO Keywords เช่น "เพลงช้าง", "เพลงจับปูดำ"
2. วางแผนทำวิดีโอรวมเพลงยาว (Compilation) ขนาด 10-20 นาทีเพื่อเพิ่ม Watch Time
3. รักษาความถี่การอัปโหลดให้สม่ำเสมออย่างน้อยสัปดาห์ละ 3-4 คลิปตามคู่แข่ง
🔗 *อ่านรายงานฉบับเต็มใน IDE ของคุณ!*"""

    # Add header and save report
    full_report = f"""# รายงานวิเคราะห์และการปรับปรุงช่องประจำวัน ({datetime.now().strftime('%d/%m/%Y')})

{ai_report_content}
"""

    try:
        with open(REPORT_FILE, "w", encoding="utf-8") as f:
            f.write(full_report)
        print(f"Daily report generated successfully at {REPORT_FILE}!")
    except Exception as e:
        print(f"Error saving report: {e}")
        
    try:
        os.makedirs(os.path.dirname(ARTIFACT_REPORT_FILE), exist_ok=True)
        with open(ARTIFACT_REPORT_FILE, "w", encoding="utf-8") as f:
            f.write(full_report)
        print(f"Daily report saved to artifact at {ARTIFACT_REPORT_FILE}!")
    except Exception as e:
        print(f"Error saving artifact report: {e}")
        
    # Automatically send to LINE Bot
    send_to_line_bot(line_summary)




if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 youtube_analyzer.py --mode [scrape|report]")
        sys.exit(1)
        
    mode = sys.argv[1]
    if mode == "--mode":
        if len(sys.argv) < 3:
            print("Error: missing mode value.")
            sys.exit(1)
        mode = sys.argv[2]
        
    if mode == "scrape":
        run_scrape()
    elif mode == "report":
        run_report()
    else:
        print(f"Unknown mode: {mode}")
        sys.exit(1)

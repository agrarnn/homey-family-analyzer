import React from 'react'
import { ChevronRight, ChevronLeft, Image, Sparkles } from 'lucide-react'

function StepStyleRatio({ 
  visualStyle, 
  setVisualStyle, 
  aspectRatio, 
  setAspectRatio, 
  onNext, 
  onPrev 
}) {
  
  // Style list with descriptive cues
  const stylesList = [
    { 
      name: 'Cute 3D Claymation', 
      desc: 'สไตล์ดินน้ำมันปั้น 3 มิติโทนพาสเทลและอบอุ่น คล้ายงานดินปั้น 3D ของโลโก้ช่อง Homey Family เหมาะสำหรับเด็กและครอบครัว',
      color: 'from-pink-500/20 to-yellow-500/20'
    },
    { 
      name: 'Disney Pixar 3D Animation', 
      desc: 'แอนิเมชัน 3 มิติโทนอบอุ่น ตัวละครน่ารัก มีมิติ แสงเงานุ่มนวล สไตล์ดิสนีย์/พิกซาร์',
      color: 'from-orange-500/20 to-purple-500/20'
    },
    { 
      name: 'Japan Anime Style', 
      desc: 'สไตล์อนิเมะญี่ปุ่นลายเส้นสะอาด แสงฟุ้งกระจาย ท้องฟ้าสีฟ้าคราม สไตล์ภาพยนตร์อนิเมะ Ghibli หรือ Shinkai',
      color: 'from-sky-500/20 to-indigo-500/20'
    },
    { 
      name: 'Flat 2D illustration', 
      desc: 'ภาพเวกเตอร์ 2 มิติสีสันสดใส เรียบง่าย ทันสมัย ดีไซน์มินิมอล เน้นรูปทรงรูปสเตอริโอที่ลงตัว',
      color: 'from-emerald-500/20 to-teal-500/20'
    },
    { 
      name: 'Cinematic 3D Render', 
      desc: 'ภาพเรนเดอร์ 3 มิติเสมือนจริง อารมณ์ภาพยนตร์ ดราม่า แสงเงาจัดจ้าน สมจริงระดับ Unreal Engine 5',
      color: 'from-red-500/20 to-yellow-500/20'
    },
    { 
      name: 'Cyberpunk Retro-Futurism', 
      desc: 'โลกอนาคตผสมผสานกลิ่นอายเรโทร แสงไฟนีออนสลัว โทนสีม่วง น้ำเงิน ชมพู เรืองแสงขรึมๆ',
      color: 'from-pink-500/20 to-purple-500/20'
    },
    { 
      name: 'Watercolor Dreamy Style', 
      desc: 'ภาพสีน้ำฟุ้งฝัน ขอบฟุ้งๆ นุ่มนวล โทนสีพาสเทล ให้ความรู้สึกอบอุ่น สบายตาเหมือนภาพในหนังสือเด็ก',
      color: 'from-amber-500/20 to-rose-500/20'
    }
  ]

  // Aspect ratio options with visual frame sizing
  const ratiosList = [
    { 
      id: '16:9', 
      label: 'แนวนอน 16:9 (Landscape)', 
      desc: 'เหมาะสำหรับลง YouTube, โทรทัศน์, และหน้าจอคอมพิวเตอร์ทั่วไป',
      width: 80,
      height: 45
    },
    { 
      id: '9:16', 
      label: 'แนวตั้ง 9:16 (Vertical/TikTok)', 
      desc: 'เหมาะสำหรับลง YouTube Shorts, TikTok, Instagram Reels',
      width: 36,
      height: 64
    },
    { 
      id: '1:1', 
      label: 'จัตุรัส 1:1 (Square)', 
      desc: 'เหมาะสำหรับแสดงผลบน Feed ของแอปโซเชียลมีเดียทั่วไป',
      width: 50,
      height: 50
    },
    { 
      id: '21:9', 
      label: 'สัดส่วนภาพยนตร์ 21:9 (Cinematic)', 
      desc: 'ขอบภาพกว้างพิเศษ ให้อารมณ์เหมือนภาพยนตร์ฟอร์มยักษ์จอยักษ์',
      width: 90,
      height: 38
    }
  ]

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 2/7</div>
          <h2 className="wizard-title">กำหนดสไตล์ภาพและสัดส่วนวิดีโอ</h2>
        </div>
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
        {/* Style Selector Section */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>1. เลือกสไตล์งานภาพของ MV</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            เลือกสไตล์งานศิลป์ที่จะนำไปใช้สร้าง Prompt สำหรับภาพตัวละคร สถานที่ และแอนิเมชัน
          </p>

          <div className="style-grid">
            {stylesList.map((style) => {
              const isSelected = visualStyle === style.name
              return (
                <div 
                  key={style.name}
                  className={`style-card glass-panel-interactive ${isSelected ? 'glass-panel-active' : ''}`}
                  onClick={() => setVisualStyle(style.name)}
                >
                  <div className="style-card-image-placeholder">
                    <Image size={24} style={{ opacity: isSelected ? 0.9 : 0.4 }} />
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{style.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{style.desc}</p>
                  
                  {isSelected && (
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <Sparkles size={14} className="text-accent-purple" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex-col" style={{ gap: '0.5rem', marginTop: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>ระบุหรือพิมพ์ปรับแต่งสไตล์อื่นเพิ่มเติมได้:</label>
            <input 
              type="text" 
              value={visualStyle} 
              onChange={(e) => setVisualStyle(e.target.value)} 
              placeholder="เช่น Flat 2D illustration, vector art..."
            />
          </div>
        </div>

        {/* Aspect Ratio Selector Section */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>2. เลือกสัดส่วนของ MV (Aspect Ratio)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            เลือกสัดส่วนและขนาดของภาพที่ตรงกับการนำไปใช้เผยแพร่จริง
          </p>

          <div className="ratio-grid">
            {ratiosList.map((ratio) => {
              const isSelected = aspectRatio === ratio.id
              return (
                <div 
                  key={ratio.id}
                  className={`ratio-card glass-panel-interactive ${isSelected ? 'glass-panel-active' : ''}`}
                  onClick={() => setAspectRatio(ratio.id)}
                >
                  <div 
                    className="ratio-visual-box"
                    style={{ 
                      width: `${ratio.width}px`, 
                      height: `${ratio.height}px`,
                      maxHeight: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>{ratio.id}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', lineHeight: '1.3' }}>
                      {ratio.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Wizard Navigation */}
        <div className="wizard-navigation">
          <button className="btn-secondary" onClick={onPrev}>
            <ChevronLeft size={16} />
            ย้อนกลับ
          </button>
          <button className="btn-primary" onClick={onNext}>
            บันทึกและไปสเต็ปถัดไป
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepStyleRatio

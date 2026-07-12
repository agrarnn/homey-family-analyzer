import React, { useState, useEffect } from 'react'
import { 
  ChevronRight, ChevronLeft, Copy, Check, Sparkles, 
  RefreshCw, AlertCircle, Image as ImageIcon, Upload 
} from 'lucide-react'
import { generateCharacterSheetPrompts } from '../services/gemini'

function StepCharacterSheets({ 
  apiKey, 
  characters, 
  visualStyle, 
  characterPrompts, 
  setCharacterPrompts, 
  onNext, 
  onPrev 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  
  // Local state for associated character images (stores object URLs or base64)
  const [characterImages, setCharacterImages] = useState({})

  // Trigger prompt generation on mount if empty
  useEffect(() => {
    if (characterPrompts.length === 0 && characters.length > 0) {
      handleGenerate()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await generateCharacterSheetPrompts(apiKey, characters, visualStyle)
      setCharacterPrompts(result.characters || [])
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการสร้าง Prompt: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Copy helper
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Handle local image upload for preview
  const handleImageChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setCharacterImages(prev => ({
        ...prev,
        [index]: imageUrl
      }))
    }
  }

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 5/7</div>
          <h2 className="wizard-title">สร้างภาพโมเดลตัวละคร (Character Sheets)</h2>
        </div>
        <button 
          className="btn-secondary" 
          onClick={handleGenerate}
          disabled={loading}
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
        >
          {loading ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} className="text-accent-purple" />}
          สร้างพรอมต์ใหม่ด้วย AI
        </button>
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          สร้างข้อความคำสั่ง (Prompt) ภาษาอังกฤษ สำหรับนำไปเจนรูปโมเดลตัวละครรอบด้าน (Character Model Sheet) เพื่อให้ลายเส้นตัวละครสม่ำเสมอเมื่อนำไปสร้างซีนวิดีโอ
        </p>

        {error && (
          <div className="flex-row" style={{ color: '#f87171', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle size={18} />
            <span style={{ fontSize: '0.875rem' }}>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <RefreshCw className="animate-spin text-accent-purple" size={40} />
            <div>
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>กำลังคำนวณและปรับแต่งคำสั่ง Prompt...</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                AI กำลังเขียน Prompt ภาษาอังกฤษที่อธิบายโมเดลตัวละครรอบทิศทางในสไตล์ "{visualStyle}"
              </p>
            </div>
          </div>
        ) : (
          <div className="sheet-grid">
            {characterPrompts.map((charPrompt, index) => {
              const charInfo = characters.find(c => c.name === charPrompt.name) || {}
              const isCopied = copiedIndex === index
              const previewImage = characterImages[index]

              return (
                <div key={index} className="sheet-card glass-panel">
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{charPrompt.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)' }}>{charInfo.role || 'ตัวละครหลัก'}</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{charInfo.description}</p>

                  <div className="flex-col" style={{ gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Character Sheet Image Prompt:</span>
                    <div className="prompt-box">
                      {charPrompt.prompt}
                      <button 
                        className="btn-icon prompt-copy-btn"
                        onClick={() => handleCopy(charPrompt.prompt, index)}
                        title="คัดลอกพรอมต์"
                      >
                        {isCopied ? <Check size={14} className="text-accent-teal" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Local image drag / upload preview */}
                  <div className="flex-col" style={{ gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>พรีวิวรูปภาพตัวละคร (เมื่อนำพรอมต์ไปเจนมาแล้ว):</span>
                    
                    <label className="sheet-image-uploader">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(index, e)}
                        style={{ display: 'none' }}
                      />
                      {previewImage ? (
                        <img src={previewImage} alt={charPrompt.name} className="sheet-image-preview" />
                      ) : (
                        <div className="flex-col" style={{ alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                          <Upload size={18} />
                          <span style={{ fontSize: '0.75rem' }}>อัปโหลดภาพ (เช่น จากโฟลเดอร์ Characters)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Wizard Navigation */}
        <div className="wizard-navigation">
          <button className="btn-secondary" onClick={onPrev}>
            <ChevronLeft size={16} />
            ย้อนกลับ
          </button>
          <button 
            className="btn-primary" 
            onClick={onNext}
            disabled={characterPrompts.length === 0}
          >
            ยืนยันและไปสเต็ปถัดไป
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepCharacterSheets

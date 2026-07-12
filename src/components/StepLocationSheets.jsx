import React, { useState, useEffect } from 'react'
import { 
  ChevronRight, ChevronLeft, Copy, Check, Sparkles, 
  RefreshCw, AlertCircle, Upload 
} from 'lucide-react'
import { generateLocationSheetPrompts } from '../services/gemini'

function StepLocationSheets({ 
  apiKey, 
  locations, 
  visualStyle, 
  locationPrompts, 
  setLocationPrompts, 
  onNext, 
  onPrev 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null)
  
  // Local state for associated location images
  const [locationImages, setLocationImages] = useState({})

  // Trigger prompt generation on mount if empty
  useEffect(() => {
    if (locationPrompts.length === 0 && locations.length > 0) {
      handleGenerate()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await generateLocationSheetPrompts(apiKey, locations, visualStyle)
      setLocationPrompts(result.locations || [])
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการสร้าง Prompt สถานที่: ' + err.message)
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
      setLocationImages(prev => ({
        ...prev,
        [index]: imageUrl
      }))
    }
  }

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 6/7</div>
          <h2 className="wizard-title">สร้างภาพแนวคิดสถานที่ (Location Sheets)</h2>
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
          สร้างข้อความคำสั่ง (Prompt) ภาษาอังกฤษ สำหรับนำไปเจนภาพคอนเซ็ปต์สถานที่ (Environment Concept Sheet) เพื่อเป็นแนวทางโครงสร้าง สถาปัตยกรรม และการส่องแสงในแต่ละสถานที่
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
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>กำลังวิเคราะห์สถานที่และจัดทำ Prompt...</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                AI กำลังเขียน Prompt ภาษาอังกฤษที่อธิบายสิ่งแวดล้อมและทิศทางแสงในสไตล์ "{visualStyle}"
              </p>
            </div>
          </div>
        ) : (
          <div className="sheet-grid">
            {locationPrompts.map((locPrompt, index) => {
              const locInfo = locations.find(l => l.name === locPrompt.name) || {}
              const isCopied = copiedIndex === index
              const previewImage = locationImages[index]

              return (
                <div key={index} className="sheet-card glass-panel">
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{locPrompt.name}</h3>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{locInfo.description}</p>

                  <div className="flex-col" style={{ gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>Location Sheet Image Prompt:</span>
                    <div className="prompt-box">
                      {locPrompt.prompt}
                      <button 
                        className="btn-icon prompt-copy-btn"
                        onClick={() => handleCopy(locPrompt.prompt, index)}
                        title="คัดลอกพรอมต์"
                      >
                        {isCopied ? <Check size={14} className="text-accent-teal" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Local image drag / upload preview */}
                  <div className="flex-col" style={{ gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)' }}>พรีวิวรูปภาพสถานที่ (เมื่อนำพรอมต์ไปเจนมาแล้ว):</span>
                    
                    <label className="sheet-image-uploader">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(index, e)}
                        style={{ display: 'none' }}
                      />
                      {previewImage ? (
                        <img src={previewImage} alt={locPrompt.name} className="sheet-image-preview" />
                      ) : (
                        <div className="flex-col" style={{ alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                          <Upload size={18} />
                          <span style={{ fontSize: '0.75rem' }}>อัปโหลดภาพประกอบฉากสถานที่</span>
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
            disabled={locationPrompts.length === 0}
          >
            ยืนยันและไปสเต็ปถัดไป
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepLocationSheets

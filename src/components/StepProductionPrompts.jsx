import React, { useState, useEffect } from 'react'
import { 
  ChevronLeft, Copy, Check, Sparkles, RefreshCw, AlertCircle, 
  Download, FileText, Clapperboard, Video, Image as ImageIcon 
} from 'lucide-react'
import { generateProductionPrompts } from '../services/gemini'

function StepProductionPrompts({ 
  apiKey, 
  scenes, 
  characters, 
  locations, 
  visualStyle, 
  aspectRatio, 
  productionPrompts, 
  setProductionPrompts,
  characterPrompts,
  locationPrompts,
  lyricsText,
  onPrev 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copiedIndex, setCopiedIndex] = useState(null) // e.g. { index, type: 'photo' | 'motion' }

  // Trigger prompt generation on mount if empty
  useEffect(() => {
    if (productionPrompts.length === 0 && scenes.length > 0) {
      handleGenerate()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await generateProductionPrompts(
        apiKey, 
        scenes, 
        characters, 
        locations, 
        visualStyle, 
        aspectRatio
      )
      setProductionPrompts(result.scenes || [])
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการสร้างคำสั่งถ่ายทำ: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Copy helper
  const handleCopy = (text, index, type) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex({ index, type })
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Export full Blueprint as Markdown file
  const handleExportMarkdown = () => {
    let mdContent = `# วิดีโอ/MV บลูปริ้นท์บอร์ด (Video/MV Blueprint Board)
สร้างขึ้นเมื่อ: ${new Date().toLocaleDateString('th-TH')}

---

## 1. ข้อมูลภาพรวมและทิศทางสไตล์ (Style & Format)
- **สไตล์งานภาพ (Visual Style):** ${visualStyle}
- **สัดส่วนหน้าจอ (Aspect Ratio):** ${aspectRatio}

---

## 2. ข้อมูลการถอดความเสียง/เนื้อร้อง (Audio & Lyrics Script)
\`\`\`text
${lyricsText || 'ไม่มีเนื้อร้อง/สคริปต์ที่บันทึกไว้'}
\`\`\`

---

## 3. เอกสารโมเดลตัวละคร (Character Sheets)
${characters.map((char, idx) => {
  const promptObj = characterPrompts.find(p => p.name === char.name) || {}
  return `### ${char.name}
- **บทบาท:** ${char.role}
- **ลักษณะรายละเอียด:** ${char.description}
- **Character Prompt:** \`${promptObj.prompt || 'ไม่มีข้อมูลพรอมต์'}\`

`}).join('\n')}

---

## 4. เอกสารคอนเซ็ปต์สถานที่ (Location Sheets)
${locations.map((loc, idx) => {
  const promptObj = locationPrompts.find(p => p.name === loc.name) || {}
  return `### ${loc.name}
- **รายละเอียดสถานที่:** ${loc.description}
- **Location Prompt:** \`${promptObj.prompt || 'ไม่มีข้อมูลพรอมต์'}\`

`}).join('\n')}

---

## 5. ตารางแจกแจงฉากการถ่ายทำ (Scene Breakdown & Production Prompts)
${scenes.map((scene, idx) => {
  const prodObj = productionPrompts.find(p => p.sceneNo === scene.sceneNo) || {}
  const duration = scene.endSec - scene.startSec
  return `### ซีนที่ #${scene.sceneNo} (วินาทีที่ ${scene.startSec} - ${scene.endSec}) | ความยาว: ${duration} วินาที
- **เสียงร้องคิวที่เล่น:** "${scene.cueText || 'ไม่มีเสียงคำร้อง'}"
- **ภาพเหตุการณ์ในฉาก:** ${scene.description}
- **Photo Prompt (สำหรับเจนภาพนิ่ง):**
  > ${prodObj.photoPrompt || 'กำลังประมวลผล...'}
- **Motion Prompt (สำหรับเจนวิดีโอ):**
  > ${prodObj.motionPrompt || 'กำลังประมวลผล...'}

---
`}).join('\n')}
`

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `mv_blueprint_${Date.now()}.md`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 7/7</div>
          <h2 className="wizard-title">สร้าง Photo Prompt และ Motion Prompt รายฉาก</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn-secondary" 
            onClick={handleGenerate}
            disabled={loading}
            style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
          >
            {loading ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} className="text-accent-purple" />}
            เจนใหม่ด้วย AI
          </button>
          
          <button 
            className="btn-primary" 
            onClick={handleExportMarkdown}
            disabled={productionPrompts.length === 0}
            style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', background: 'linear-gradient(135deg, var(--accent-teal) 0%, #0d9488 100%)', boxShadow: '0 4px 15px rgba(13, 148, 136, 0.3)' }}
          >
            <Download size={14} />
            ดาวน์โหลดไฟล์ Blueprint (.md)
          </button>
        </div>
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          นี่คือชุดข้อความ Prompt ขั้นสุดท้าย **ชื่อของตัวละครและสถานที่สอดคล้องตรงตาม Character/Location Sheet 100%** สำหรับนำไปสร้างเป็นวิดีโออนิเมชันทีละซีน
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
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>กำลังสร้างชุดข้อมูลและ Prompt ถ่ายทำรายฉาก...</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                AI กำลังผสานรวมข้อมูลตัวละคร สถานที่ และแอนิเมชันมุมกล้องให้ตรงกัน
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-col" style={{ gap: '1.5rem' }}>
            {scenes.map((scene, index) => {
              const prodPrompt = productionPrompts.find(p => p.sceneNo === scene.sceneNo) || {}
              const duration = scene.endSec - scene.startSec
              
              const isPhotoCopied = copiedIndex?.index === index && copiedIndex?.type === 'photo'
              const isMotionCopied = copiedIndex?.index === index && copiedIndex?.type === 'motion'

              return (
                <div key={index} className="scene-summary-card glass-panel">
                  <div className="timeline-card-header" style={{ marginBottom: '1rem' }}>
                    <div className="flex-row">
                      <span style={{ fontWeight: '700', color: 'var(--accent-purple)' }}>ซีนที่ #{scene.sceneNo}</span>
                      <span className="timestamp-badge">{scene.startSec} - {scene.endSec} วินาที ({duration}s)</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      คิวเสียง: "{scene.cueText || 'ไม่มีเสียงคำร้อง'}"
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', marginBottom: '1.25rem', background: 'rgba(255,255,255,0.01)', padding: '0.75rem', borderRadius: '6px', borderLeft: '2.5px solid var(--text-muted)' }}>
                    <strong>เรื่องราวในฉาก:</strong> {scene.description}
                  </div>

                  <div className="prompt-group">
                    {/* Photo Prompt Box */}
                    <div className="flex-col" style={{ gap: '0.45rem' }}>
                      <span className="flex-row" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                        <ImageIcon size={12} className="text-accent-blue" />
                        Photo Prompt (เจนภาพหลัก):
                      </span>
                      <div className="prompt-box">
                        {prodPrompt.photoPrompt || 'กำลังวิเคราะห์...'}
                        {prodPrompt.photoPrompt && (
                          <button 
                            className="btn-icon prompt-copy-btn"
                            onClick={() => handleCopy(prodPrompt.photoPrompt, index, 'photo')}
                            title="คัดลอกพรอมต์ภาพ"
                          >
                            {isPhotoCopied ? <Check size={14} className="text-accent-teal" /> : <Copy size={14} />}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Motion Prompt Box */}
                    <div className="flex-col" style={{ gap: '0.45rem' }}>
                      <span className="flex-row" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                        <Video size={12} className="text-accent-purple" />
                        Motion Prompt (ขยับกล้อง/มุมภาพ):
                      </span>
                      <div className="prompt-box">
                        {prodPrompt.motionPrompt || 'กำลังวิเคราะห์...'}
                        {prodPrompt.motionPrompt && (
                          <button 
                            className="btn-icon prompt-copy-btn"
                            onClick={() => handleCopy(prodPrompt.motionPrompt, index, 'motion')}
                            title="คัดลอกพรอมต์วิดีโอ"
                          >
                            {isMotionCopied ? <Check size={14} className="text-accent-teal" /> : <Copy size={14} />}
                          </button>
                        )}
                      </div>
                    </div>
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
        </div>
      </div>
    </div>
  )
}

export default StepProductionPrompts

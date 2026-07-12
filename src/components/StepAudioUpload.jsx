import React, { useState, useRef } from 'react'
import { Upload, FileAudio, AlertCircle, Sparkles, ChevronRight, FileText, Languages } from 'lucide-react'
import { transcribeAudio } from '../services/gemini'

function StepAudioUpload({ 
  apiKey, 
  audioFile, 
  setAudioFile, 
  audioMetadata, 
  setAudioMetadata,
  lyricsOption, 
  setLyricsOption, 
  lyricsText, 
  setLyricsText,
  onComplete,
  onNext 
}) {
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [audioBase64, setAudioBase64] = useState('')
  const fileInputRef = useRef(null)

  // Waveform visualization helper (simulated)
  const renderWaveform = () => {
    const barsCount = 30
    return (
      <div className="waveform-container mt-2">
        {Array.from({ length: barsCount }).map((_, i) => {
          const heightPercent = 20 + Math.sin(i * 0.5) * 40 + Math.random() * 30
          return (
            <div 
              key={i} 
              className="waveform-bar active animate-pulse" 
              style={{ 
                height: `${heightPercent}%`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: '1s'
              }}
            />
          )
        })}
      </div>
    )
  }

  // Handle file select/drag
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const processFile = (file) => {
    if (!file) return
    
    if (file.type !== "audio/mpeg" && !file.name.endsWith('.mp3')) {
      setError("กรุณาเลือกไฟล์ MP3 เท่านั้น")
      return
    }

    setError("")
    setAudioFile(file)
    setAudioMetadata({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      type: file.type
    })

    // Convert file to base64 for Gemini API (if needed)
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target.result
      const bytes = new Uint8Array(arrayBuffer)
      let binary = ''
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      const base64 = btoa(binary)
      setAudioBase64(base64)
    }
    reader.readAsArrayBuffer(file)
    
    // Automatically select paste lyrics option as default
    if (!lyricsOption) {
      setLyricsOption('paste')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  // Run Transcription
  const handleTranscribe = async () => {
    setLoading(true)
    setError("")
    try {
      let fileObj = null
      if (apiKey && audioBase64) {
        fileObj = {
          base64: audioBase64,
          mimeType: audioFile.type || "audio/mp3"
        }
      }
      
      const transcript = await transcribeAudio(apiKey, fileObj)
      setLyricsText(transcript)
      onComplete()
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการถอดเสียง: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Save manually pasted lyrics
  const handleSavePastedLyrics = () => {
    if (!lyricsText.trim()) {
      setError("กรุณากรอกเนื้อเพลงหรือบทพูด")
      return
    }
    setError("")
    onComplete()
    onNext()
  }

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 1/7</div>
          <h2 className="wizard-title">อัปโหลดไฟล์เสียงและเตรียมเนื้อร้อง</h2>
        </div>
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
        {/* Upload Box */}
        <div 
          className={`upload-zone ${dragActive ? 'dragover' : ''} glass-panel`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".mp3,audio/mpeg"
            style={{ display: 'none' }}
          />
          
          <div className="upload-icon-wrapper">
            <Upload size={32} />
          </div>

          {audioFile ? (
            <div className="flex-col" style={{ alignItems: 'center' }}>
              <div className="flex-row text-accent-teal">
                <FileAudio size={18} />
                <span style={{ fontWeight: '600' }}>{audioMetadata.name}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ขนาดไฟล์: {audioMetadata.size}</span>
              {renderWaveform()}
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.35rem' }}>ลากไฟล์เสียง MP3 มาวางที่นี่</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>หรือคลิกที่ปุ่มด้านล่างเพื่อเลือกไฟล์จากคอมพิวเตอร์</p>
            </div>
          )}

          <button className="btn-secondary mt-2" onClick={triggerFileInput}>
            {audioFile ? 'เปลี่ยนไฟล์เสียง' : 'เลือกไฟล์เสียง .mp3'}
          </button>
        </div>

        {error && (
          <div className="flex-row" style={{ color: '#f87171', padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle size={18} />
            <span style={{ fontSize: '0.875rem' }}>{error}</span>
          </div>
        )}

        {/* Option Selection */}
        {audioFile && (
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>ข้อมูลเนื้อร้องและบทพูด</h3>
            
            <div className="lyrics-choice-group">
              <div 
                className={`glass-panel-interactive ${lyricsOption === 'paste' ? 'glass-panel-active' : ''}`}
                onClick={() => setLyricsOption('paste')}
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <div className="flex-row">
                  <FileText className={lyricsOption === 'paste' ? 'text-accent-purple' : ''} size={20} />
                  <span style={{ fontWeight: '600' }}>มีเนื้อเพลง/บทพูดอยู่แล้ว</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>วางเนื้อเพลงหรือสคริปต์ที่เตรียมไว้ได้ทันที</p>
              </div>

              <div 
                className={`glass-panel-interactive ${lyricsOption === 'transcribe' ? 'glass-panel-active' : ''}`}
                onClick={() => setLyricsOption('transcribe')}
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <div className="flex-row">
                  <Sparkles className={lyricsOption === 'transcribe' ? 'text-accent-purple' : ''} size={20} />
                  <span style={{ fontWeight: '600' }}>ถอดเสียงจากไฟล์ MP3</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>ใช้โมเดล AI ในการรับฟังและถอดเสียงร้อง/เสียงพูดออกมา</p>
              </div>
            </div>

            {/* Paste Area */}
            {lyricsOption === 'paste' && (
              <div className="flex-col mt-4" style={{ gap: '0.75rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>วางเนื้อเพลงหรือบทพูดที่นี่:</label>
                <textarea 
                  rows={8} 
                  placeholder="ตัวอย่าง:&#10;(Verse 1)&#10;เช้าวันอาทิตย์ที่สดใส..."
                  value={lyricsText}
                  onChange={(e) => setLyricsText(e.target.value)}
                />
                <button 
                  className="btn-primary mt-2" 
                  onClick={handleSavePastedLyrics}
                  style={{ alignSelf: 'flex-end' }}
                >
                  บันทึกข้อมูลและไปสเต็ปถัดไป
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Transcribe Area */}
            {lyricsOption === 'transcribe' && (
              <div className="flex-col mt-4" style={{ gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {apiKey 
                      ? "ระบบจะส่งข้อมูลไฟล์เสียงไปประมวลผลที่ Gemini API เพื่อถอดเสียงคำร้องออกมาเป็นข้อความ" 
                      : "ระบบอยู่ในโหมดจำลอง (Mock Mode) เนื่องจากไม่พบ API Key เมื่อกดถอดเสียงระบบจะดึงเนื้อเพลงตัวอย่างระดับพรีเมียมขึ้นมา"}
                  </span>
                </div>

                {lyricsText && (
                  <div className="flex-col" style={{ gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>ผลลัพธ์การถอดความเสียงด้วย AI:</label>
                    <textarea 
                      rows={6}
                      value={lyricsText}
                      onChange={(e) => setLyricsText(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex-row" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button 
                    className="btn-primary" 
                    onClick={handleTranscribe}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="animate-spin" size={16} />
                        กำลังถอดความ...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        {lyricsText ? 'รันถอดความใหม่อีกครั้ง' : 'เริ่มถอดเสียงร้องด้วย AI'}
                      </>
                    )}
                  </button>
                  
                  {lyricsText && (
                    <button className="btn-primary" onClick={onNext}>
                      ไปสเต็ปถัดไป
                      <ChevronRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StepAudioUpload

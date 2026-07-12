import React, { useState, useEffect } from 'react'
import { 
  Music, Film, Users, MapPin, Layers, Layout, Video, 
  Settings, Key, AlertTriangle, ChevronRight, CheckCircle2,
  Lock, RefreshCw
} from 'lucide-react'

// Import components
import StepAudioUpload from './components/StepAudioUpload'
import StepStyleRatio from './components/StepStyleRatio'
import StepCharLocConfirm from './components/StepCharLocConfirm'
import StepSceneBreakdown from './components/StepSceneBreakdown'
import StepCharacterSheets from './components/StepCharacterSheets'
import StepLocationSheets from './components/StepLocationSheets'
import StepProductionPrompts from './components/StepProductionPrompts'

function App() {
  // Wizard State
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  
  // App Config State
  const [apiKey, setApiKey] = useState('')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [apiInput, setApiInput] = useState('')
  
  // Data State
  const [audioFile, setAudioFile] = useState(null)
  const [audioMetadata, setAudioMetadata] = useState(null)
  const [lyricsOption, setLyricsOption] = useState('') // 'paste' or 'transcribe'
  const [lyricsText, setLyricsText] = useState('')
  
  const [visualStyle, setVisualStyle] = useState('Cute 3D Claymation')
  const [aspectRatio, setAspectRatio] = useState('16:9')
  
  const [characters, setCharacters] = useState([])
  const [locations, setLocations] = useState([])
  const [scenes, setScenes] = useState([])
  const [characterPrompts, setCharacterPrompts] = useState([])
  const [locationPrompts, setLocationPrompts] = useState([])
  const [productionPrompts, setProductionPrompts] = useState([])

  // Load API Key from local storage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key')
    if (savedKey) {
      setApiKey(savedKey)
      setApiInput(savedKey)
    }
  }, [])

  // Save API Key
  const handleSaveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiInput)
    setApiKey(apiInput)
    setIsSettingsOpen(false)
  }

  // Clear API Key
  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key')
    setApiKey('')
    setApiInput('')
  }

  // Navigation handlers
  const markStepComplete = (stepNum) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps(prev => [...prev, stepNum])
    }
  }

  const handleNext = () => {
    markStepComplete(currentStep)
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleStepClick = (stepNum) => {
    // Only allow clicking steps that are already completed or the very next step
    const maxAccessibleStep = Math.max(...completedSteps, 0) + 1
    if (stepNum <= maxAccessibleStep) {
      setCurrentStep(stepNum)
    }
  }

  // Sidebar list items
  const steps = [
    { id: 1, label: '1. เสียงและเนื้อร้อง', icon: Music },
    { id: 2, label: '2. สไตล์และสัดส่วน', icon: Film },
    { id: 3, label: '3. ตัวละครและสถานที่', icon: Users },
    { id: 4, label: '4. แจกแจงฉาก (Breakdown)', icon: Layers },
    { id: 5, label: '5. คอนเซ็ปต์ตัวละคร', icon: Layout },
    { id: 6, label: '6. คอนเซ็ปต์สถานที่', icon: MapPin },
    { id: 7, label: '7. พรอมต์สำหรับถ่ายทำ', icon: Video }
  ]

  // Render active step component
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepAudioUpload 
            apiKey={apiKey}
            audioFile={audioFile}
            setAudioFile={setAudioFile}
            audioMetadata={audioMetadata}
            setAudioMetadata={setAudioMetadata}
            lyricsOption={lyricsOption}
            setLyricsOption={setLyricsOption}
            lyricsText={lyricsText}
            setLyricsText={setLyricsText}
            onComplete={() => markStepComplete(1)}
            onNext={handleNext}
          />
        )
      case 2:
        return (
          <StepStyleRatio 
            visualStyle={visualStyle}
            setVisualStyle={setVisualStyle}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case 3:
        return (
          <StepCharLocConfirm 
            apiKey={apiKey}
            lyricsText={lyricsText}
            characters={characters}
            setCharacters={setCharacters}
            locations={locations}
            setLocations={setLocations}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case 4:
        return (
          <StepSceneBreakdown 
            apiKey={apiKey}
            lyricsText={lyricsText}
            characters={characters}
            locations={locations}
            visualStyle={visualStyle}
            aspectRatio={aspectRatio}
            scenes={scenes}
            setScenes={setScenes}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case 5:
        return (
          <StepCharacterSheets 
            apiKey={apiKey}
            characters={characters}
            visualStyle={visualStyle}
            characterPrompts={characterPrompts}
            setCharacterPrompts={setCharacterPrompts}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case 6:
        return (
          <StepLocationSheets 
            apiKey={apiKey}
            locations={locations}
            visualStyle={visualStyle}
            locationPrompts={locationPrompts}
            setLocationPrompts={setLocationPrompts}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )
      case 7:
        return (
          <StepProductionPrompts 
            apiKey={apiKey}
            scenes={scenes}
            characters={characters}
            locations={locations}
            visualStyle={visualStyle}
            aspectRatio={aspectRatio}
            productionPrompts={productionPrompts}
            setProductionPrompts={setProductionPrompts}
            characterPrompts={characterPrompts}
            locationPrompts={locationPrompts}
            lyricsText={lyricsText}
            onPrev={handlePrev}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">
              <Film size={22} />
            </div>
            <span className="brand-name">MV Blueprint AI</span>
          </div>

          <nav className="steps-list">
            {steps.map((step) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = completedSteps.includes(step.id)
              const maxAccessibleStep = Math.max(...completedSteps, 0) + 1
              const isSelectable = step.id <= maxAccessibleStep

              return (
                <div 
                  key={step.id} 
                  className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => isSelectable && handleStepClick(step.id)}
                  style={{ opacity: isSelectable ? 1 : 0.45, cursor: isSelectable ? 'pointer' : 'not-allowed' }}
                >
                  <div className="step-number">
                    {isCompleted ? <CheckCircle2 size={14} strokeWidth={3} /> : step.id}
                  </div>
                  <StepIcon size={18} />
                  <span>{step.label}</span>
                </div>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer with API settings */}
        <div className="sidebar-footer">
          <div className="api-key-badge">
            <div className="flex-row">
              <div className={`api-key-dot ${apiKey ? 'active' : ''}`} />
              <span>{apiKey ? 'เชื่อมต่อ Gemini API แล้ว' : 'ใช้งานโหมดจำลอง (Mock Mode)'}</span>
            </div>
            <button 
              className="btn-icon" 
              onClick={() => setIsSettingsOpen(true)}
              title="ตั้งค่า API Key"
            >
              <Settings size={15} />
            </button>
          </div>
          
          {!apiKey && (
            <div className="flex-row text-accent-purple animate-pulse" style={{ fontSize: '0.75rem', gap: '0.35rem' }}>
              <Lock size={12} />
              <span>ใส่ API Key เพื่อใช้งานฟีเจอร์ AI จริง</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="main-content">
        <div className="wizard-step-panel">
          {renderStepComponent()}
        </div>
      </main>

      {/* API Key Modal Settings */}
      {isSettingsOpen && (
        <div className="modal-overlay" onClick={() => setIsSettingsOpen(false)}>
          <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="flex-row mb-2">
              <Key className="text-accent-purple" size={20} />
              <h3 style={{ fontSize: '1.25rem' }}>ตั้งค่าการเชื่อมต่อ API</h3>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
              ระบุ Gemini API Key ของคุณเพื่อใช้ AI วิเคราะห์เสียง ถอดเนื้อเพลง แตกซีนสตอรี่บอร์ด และแต่ง Prompt จริง (แอปเก็บกุญแจนี้ไว้ที่ LocalStorage ในเครื่องคุณอย่างปลอดภัย)
            </p>

            <div className="flex-col">
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Gemini API Key</label>
              <input 
                type="text" 
                placeholder="AIzaSy..." 
                value={apiInput}
                onChange={(e) => setApiInput(e.target.value)}
              />
            </div>

            <div className="flex-space mt-2">
              {apiKey && (
                <button className="btn-secondary" onClick={handleClearApiKey} style={{ borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
                  ลบ Key
                </button>
              )}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
                <button className="btn-secondary" onClick={() => setIsSettingsOpen(false)}>ยกเลิก</button>
                <button className="btn-primary" onClick={handleSaveApiKey}>บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

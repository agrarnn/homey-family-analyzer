import React, { useState, useEffect } from 'react'
import { 
  ChevronRight, ChevronLeft, Sparkles, RefreshCw, AlertCircle, 
  Layers, Plus, Trash2, Edit2, Check, Clock, AlertTriangle 
} from 'lucide-react'
import { generateSceneBreakdown } from '../services/gemini'

function StepSceneBreakdown({ 
  apiKey, 
  lyricsText, 
  characters, 
  locations, 
  visualStyle, 
  aspectRatio, 
  scenes, 
  setScenes, 
  onNext, 
  onPrev 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Edit mode states
  const [editingIndex, setEditingIndex] = useState(null)
  const [editStart, setEditStart] = useState(0)
  const [editEnd, setEditEnd] = useState(0)
  const [editDesc, setEditDesc] = useState('')
  const [editCue, setEditCue] = useState('')

  // Trigger breakdown generation on mount if empty
  useEffect(() => {
    if (scenes.length === 0 && lyricsText) {
      handleGenerate()
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await generateSceneBreakdown(apiKey, lyricsText, characters, locations, visualStyle, aspectRatio)
      setScenes(result.scenes || [])
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการจัดแบ่งซีน: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Scene CRUD
  const addScene = () => {
    const lastScene = scenes[scenes.length - 1]
    const nextStart = lastScene ? lastScene.endSec : 0
    const nextEnd = nextStart + 6 // default 6s
    
    const newScene = {
      sceneNo: scenes.length + 1,
      startSec: nextStart,
      endSec: nextEnd,
      description: 'คำอธิบายมุมกล้องและภาพเหตุการณ์ในฉากนี้',
      cueText: 'เนื้อเพลง หรือเสียงพูดระบุซีน'
    }
    
    setScenes(prev => [...prev, newScene])
    startEditing(scenes.length, newScene)
  }

  const deleteScene = (index) => {
    const updated = scenes.filter((_, i) => i !== index).map((s, idx) => ({
      ...s,
      sceneNo: idx + 1
    }))
    setScenes(updated)
    if (editingIndex === index) {
      cancelEditing()
    }
  }

  // Inline editing
  const startEditing = (index, scene) => {
    setEditingIndex(index)
    setEditStart(scene.startSec)
    setEditEnd(scene.endSec)
    setEditDesc(scene.description)
    setEditCue(scene.cueText)
  }

  const saveEditing = () => {
    const duration = editEnd - editStart
    if (duration <= 0) {
      setError("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น")
      return
    }
    setError("")
    
    const updated = [...scenes]
    updated[editingIndex] = {
      ...updated[editingIndex],
      startSec: parseInt(editStart),
      endSec: parseInt(editEnd),
      description: editDesc,
      cueText: editCue
    }
    setScenes(updated)
    cancelEditing()
  }

  const cancelEditing = () => {
    setEditingIndex(null)
  }

  // Check scene durations (warn if > 8 seconds)
  const isDurationValid = (start, end) => {
    return (end - start) <= 8
  }

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 4/7</div>
          <h2 className="wizard-title">จัดทำ Scene Breakdown</h2>
        </div>
        <button 
          className="btn-secondary" 
          onClick={handleGenerate}
          disabled={loading}
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
        >
          {loading ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} className="text-accent-purple" />}
          {scenes.length > 0 ? 'จัดซีนใหม่ด้วย AI' : 'แจกแจงฉากด้วย AI'}
        </button>
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          วิเคราะห์ท่อนเพลงและสร้างกระบวนการดำเนินเรื่องเป็นฉากๆ **จำกัดเวลาไม่เกิน 8 วินาทีต่อฉาก** เพื่อให้นำไปทำวิดีโอแอนิเมชันได้ง่ายและรักษาจังหวะการตัดต่อ
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
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>กำลังดำเนินการจัดทำโครงเรื่องฉาก...</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                AI กำลังแบ่งซอยท่อนเนื้อร้องออกเป็นฉากสั้นๆ ความยาวไม่เกิน 8 วินาทีต่อฉาก
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-col" style={{ gap: '1.5rem' }}>
            <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={addScene} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                <Plus size={14} />
                เพิ่มซีนภาพใหม่
              </button>
            </div>

            <div className="timeline">
              {scenes.map((scene, index) => {
                const isEditing = editingIndex === index
                const duration = scene.endSec - scene.startSec
                const durationWarning = duration > 8
                const isItemActive = isEditing || editingIndex === null

                return (
                  <div key={index} className={`timeline-item ${isEditing ? 'active' : ''}`} style={{ opacity: isItemActive ? 1 : 0.6 }}>
                    <div className="timeline-node" />
                    
                    {isEditing ? (
                      <div className="timeline-card glass-panel glass-panel-active">
                        <div className="timeline-card-header">
                          <div className="flex-row">
                            <span style={{ fontWeight: '700', color: 'var(--accent-purple)' }}>ซีนที่ #{scene.sceneNo}</span>
                          </div>
                          
                          <div className="flex-row" style={{ gap: '0.5rem' }}>
                            <div className="flex-row" style={{ gap: '0.25rem', fontSize: '0.85rem' }}>
                              <Clock size={12} />
                              <input 
                                type="number" 
                                value={editStart} 
                                onChange={(e) => setEditStart(e.target.value)}
                                style={{ width: '60px', padding: '0.25rem 0.5rem', textAlign: 'center' }}
                              />
                              <span>ถึง</span>
                              <input 
                                type="number" 
                                value={editEnd} 
                                onChange={(e) => setEditEnd(e.target.value)}
                                style={{ width: '60px', padding: '0.25rem 0.5rem', textAlign: 'center' }}
                              />
                              <span>วินาที</span>
                            </div>
                            
                            {(editEnd - editStart) > 8 && (
                              <div className="flex-row text-accent-purple" style={{ fontSize: '0.75rem', gap: '0.25rem' }}>
                                <AlertTriangle size={14} />
                                <span>ยาวเกิน 8 วินาที</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-col" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
                          <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>เนื้อเพลง / เสียงพูดเสียงคิว:</label>
                            <input 
                              type="text" 
                              value={editCue} 
                              onChange={(e) => setEditCue(e.target.value)}
                              placeholder="เนื้อร้องประกอบฉาก"
                            />
                          </div>
                          
                          <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>คำอธิบายและทิศทางฉาก:</label>
                            <textarea 
                              rows={3} 
                              value={editDesc} 
                              onChange={(e) => setEditDesc(e.target.value)}
                              placeholder="บรรยายลักษณะภาพของฉากนี้..."
                            />
                          </div>

                          <div className="flex-row" style={{ justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button className="btn-secondary" onClick={cancelEditing} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>ยกเลิก</button>
                            <button className="btn-primary" onClick={saveEditing} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                              <Check size={12} />
                              ยืนยัน
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="timeline-card glass-panel">
                        <div className="timeline-card-header">
                          <div className="flex-row">
                            <span style={{ fontWeight: '700' }}>ซีนที่ #{scene.sceneNo}</span>
                            <span className="timestamp-badge">{scene.startSec} - {scene.endSec} วินาที</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({duration} วินาที)</span>
                          </div>

                          <div className="flex-row" style={{ gap: '0.5rem' }}>
                            {durationWarning && (
                              <div className="flex-row text-accent-purple" style={{ fontSize: '0.75rem', gap: '0.25rem', marginRight: '0.5rem' }} title="ซีนยาวเกิน 8 วินาทีตามที่กำหนดใน Blueprint">
                                <AlertTriangle size={14} />
                                <span>เกิน 8 วินาที</span>
                              </div>
                            )}
                            <button className="btn-icon" onClick={() => startEditing(index, scene)} title="แก้ไข">
                              <Edit2 size={13} />
                            </button>
                            <button className="btn-icon" onClick={() => deleteScene(index)} title="ลบ" style={{ color: '#f87171' }}>
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <div className="scene-layout mt-2">
                          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid var(--accent-purple)', fontSize: '0.85rem', height: 'fit-content' }}>
                            <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>เสียงประกอบ/คำร้อง:</strong>
                            "{scene.cueText || 'ไม่มีเสียงคำร้อง'}"
                          </div>
                          
                          <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                            <strong style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>ภาพเหตุการณ์:</strong>
                            {scene.description}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
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
            disabled={scenes.length === 0}
          >
            ยืนยันซีนและไปสเต็ปถัดไป
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepSceneBreakdown

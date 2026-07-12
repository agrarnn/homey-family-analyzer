import React, { useState, useEffect } from 'react'
import { 
  ChevronRight, ChevronLeft, UserPlus, MapPin, Trash2, Plus, 
  Sparkles, RefreshCw, AlertCircle, Edit2, Check 
} from 'lucide-react'
import { extractCharactersAndLocations } from '../services/gemini'

function StepCharLocConfirm({ 
  apiKey, 
  lyricsText, 
  characters, 
  setCharacters, 
  locations, 
  setLocations, 
  onNext, 
  onPrev 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Edit mode states
  const [editingIndex, setEditingIndex] = useState({ type: null, index: null })
  const [editName, setEditName] = useState('')
  const [editRole, setEditRole] = useState('')
  const [editDesc, setEditDesc] = useState('')

  // Trigger analysis on mount if lists are empty
  useEffect(() => {
    if (characters.length === 0 && locations.length === 0 && lyricsText) {
      handleAnalyze()
    }
  }, [])

  const handleAnalyze = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await extractCharactersAndLocations(apiKey, lyricsText)
      setCharacters(result.characters || [])
      setLocations(result.locations || [])
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการวิเคราะห์ตัวละครและสถานที่: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  // Character modifications
  const addCharacter = () => {
    const newChar = { name: 'ตัวละครใหม่', role: 'บทบาทใหม่', description: 'รายละเอียดเสื้อผ้า หน้าตา อารมณ์' }
    setCharacters(prev => [...prev, newChar])
    startEditing('character', characters.length, newChar)
  }

  const deleteCharacter = (index) => {
    setCharacters(prev => prev.filter((_, i) => i !== index))
    if (editingIndex.type === 'character' && editingIndex.index === index) {
      cancelEditing()
    }
  }

  // Location modifications
  const addLocation = () => {
    const newLoc = { name: 'สถานที่ใหม่', description: 'รายละเอียดสิ่งปลูกสร้าง แสง และบรรยากาศโดยรอบ' }
    setLocations(prev => [...prev, newLoc])
    startEditing('location', locations.length, newLoc)
  }

  const deleteLocation = (index) => {
    setLocations(prev => prev.filter((_, i) => i !== index))
    if (editingIndex.type === 'location' && editingIndex.index === index) {
      cancelEditing()
    }
  }

  // Inline editor functions
  const startEditing = (type, index, item) => {
    setEditingIndex({ type, index })
    setEditName(item.name)
    setEditRole(item.role || '')
    setEditDesc(item.description)
  }

  const saveEditing = () => {
    const { type, index } = editingIndex
    if (type === 'character') {
      const updated = [...characters]
      updated[index] = { name: editName, role: editRole, description: editDesc }
      setCharacters(updated)
    } else if (type === 'location') {
      const updated = [...locations]
      updated[index] = { name: editName, description: editDesc }
      setLocations(updated)
    }
    cancelEditing()
  }

  const cancelEditing = () => {
    setEditingIndex({ type: null, index: null })
    setEditName('')
    setEditRole('')
    setEditDesc('')
  }

  return (
    <div className="wizard-step-panel">
      <div className="wizard-header">
        <div>
          <div className="wizard-title-badge">สเต็ปที่ 3/7</div>
          <h2 className="wizard-title">ยืนยันตัวละครและสถานที่</h2>
        </div>
        <button 
          className="btn-secondary" 
          onClick={handleAnalyze}
          disabled={loading}
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
        >
          {loading ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} className="text-accent-purple" />}
          {characters.length > 0 ? 'วิเคราะห์วิเคราะห์ใหม่ด้วย AI' : 'เริ่มวิเคราะห์ด้วย AI'}
        </button>
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
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
              <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>กำลังวิเคราะห์ข้อมูลเนื้อร้อง...</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                AI กำลังคัดกรองข้อมูลตัวละครหลักและสถานที่ที่เหมาะกับอารมณ์เพลง
              </p>
            </div>
          </div>
        ) : (
          <div className="editor-layout">
            
            {/* Characters Section */}
            <div>
              <div className="card-section-header">
                <h3 className="flex-row" style={{ fontSize: '1.15rem' }}>
                  <Sparkles size={16} className="text-accent-purple" />
                  ตัวละครหลัก ({characters.length})
                </h3>
                <button className="btn-secondary" onClick={addCharacter} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                  <UserPlus size={12} />
                  เพิ่มตัวละคร
                </button>
              </div>

              <div className="char-loc-list">
                {characters.map((char, index) => {
                  const isEditing = editingIndex.type === 'character' && editingIndex.index === index
                  
                  if (isEditing) {
                    return (
                      <div key={index} className="char-loc-card glass-panel glass-panel-active">
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="ชื่อตัวละคร"
                          style={{ marginBottom: '0.5rem' }}
                        />
                        <input 
                          type="text" 
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          placeholder="บทบาทหน้าที่"
                          style={{ marginBottom: '0.5rem' }}
                        />
                        <textarea 
                          rows={3}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          placeholder="รายละเอียดเสื้อผ้า รูปร่าง หน้าตา"
                        />
                        <div className="flex-row" style={{ justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button className="btn-secondary" onClick={cancelEditing} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>ยกเลิก</button>
                          <button className="btn-primary" onClick={saveEditing} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                            <Check size={12} />
                            ตกลง
                          </button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={index} className="char-loc-card glass-panel">
                      <div className="char-loc-card-header">
                        <div>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{char.name}</h4>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-purple)' }}>{char.role}</span>
                        </div>
                        <div className="flex-row" style={{ gap: '0.35rem' }}>
                          <button className="btn-icon" onClick={() => startEditing('character', index, char)} title="แก้ไข">
                            <Edit2 size={13} />
                          </button>
                          <button className="btn-icon" onClick={() => deleteCharacter(index)} title="ลบ" style={{ color: '#f87171' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{char.description}</p>
                    </div>
                  )
                })}

                {characters.length === 0 && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>ไม่พบตัวละคร กดวิเคราะห์หรือเพิ่มตัวละครใหม่ได้ทันที</p>
                )}
              </div>
            </div>

            {/* Locations Section */}
            <div>
              <div className="card-section-header">
                <h3 className="flex-row" style={{ fontSize: '1.15rem' }}>
                  <MapPin size={16} className="text-accent-blue" />
                  สถานที่เกิดเหตุ ({locations.length})
                </h3>
                <button className="btn-secondary" onClick={addLocation} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                  <Plus size={12} />
                  เพิ่มสถานที่
                </button>
              </div>

              <div className="char-loc-list">
                {locations.map((loc, index) => {
                  const isEditing = editingIndex.type === 'location' && editingIndex.index === index
                  
                  if (isEditing) {
                    return (
                      <div key={index} className="char-loc-card glass-panel glass-panel-active">
                        <input 
                          type="text" 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="ชื่อสถานที่"
                          style={{ marginBottom: '0.5rem' }}
                        />
                        <textarea 
                          rows={3}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          placeholder="รายละเอียดของสถานที่ บรรยากาศ แสงเงา"
                        />
                        <div className="flex-row" style={{ justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button className="btn-secondary" onClick={cancelEditing} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>ยกเลิก</button>
                          <button className="btn-primary" onClick={saveEditing} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                            <Check size={12} />
                            ตกลง
                          </button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={index} className="char-loc-card glass-panel">
                      <div className="char-loc-card-header">
                        <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{loc.name}</h4>
                        <div className="flex-row" style={{ gap: '0.35rem' }}>
                          <button className="btn-icon" onClick={() => startEditing('location', index, loc)} title="แก้ไข">
                            <Edit2 size={13} />
                          </button>
                          <button className="btn-icon" onClick={() => deleteLocation(index)} title="ลบ" style={{ color: '#f87171' }}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{loc.description}</p>
                    </div>
                  )
                })}

                {locations.length === 0 && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>ไม่พบสถานที่หลัก กดวิเคราะห์หรือเพิ่มสถานที่ใหม่ได้ทันที</p>
                )}
              </div>
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
            disabled={characters.length === 0 && locations.length === 0}
          >
            ยืนยันและไปสเต็ปถัดไป
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StepCharLocConfirm

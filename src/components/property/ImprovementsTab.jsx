import { useState } from 'react';
import { Plus, Pencil, X } from 'lucide-react';
import Card from '../shared/Card';
import EmptyState from '../shared/EmptyState';

export default function ImprovementsTab({ property }) {
  const [improvements, setImprovements] = useState(property.home_improvements || []);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  const handleAdd = () => {
    if (!newNote.trim()) return;
    setImprovements((prev) => [...prev, newNote.trim()]);
    setNewNote('');
    setShowModal(false);
  };

  if (improvements.length === 0 && !showModal) {
    return (
      <div>
        <EmptyState
          icon={Pencil}
          title="No improvements logged"
          message="Record renovations, upgrades, and improvements to your property."
        />
        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-white text-sm font-semibold active:scale-[0.98] transition-transform cursor-pointer"
            style={{ background: '#8CC63F' }}
          >
            <Plus size={16} /> Add Improvement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs" style={{ color: '#9CA3AF' }}>{improvements.length} improvements</p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 text-xs font-semibold cursor-pointer"
          style={{ color: '#8CC63F' }}
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {improvements.map((note, i) => (
        <Card key={i}>
          <p className="text-sm" style={{ color: '#1F2937' }}>{note}</p>
          <p className="text-[10px] mt-1" style={{ color: '#9CA3AF' }}>Added by you</p>
        </Card>
      ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div
            className="bg-white rounded-[12px] p-6 w-full max-w-[400px]"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold" style={{ color: '#1F2937' }}>Add Improvement</h3>
              <button
                onClick={() => { setShowModal(false); setNewNote(''); }}
                className="p-1 rounded-lg hover:bg-hs-grey-100 cursor-pointer"
              >
                <X size={18} style={{ color: '#566573' }} />
              </button>
            </div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Description
            </label>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. New double-glazed windows — front and rear (2024)"
              rows={3}
              className="w-full rounded-[10px] px-4 py-3 text-sm outline-none resize-none"
              style={{ border: '2px solid #E5E8E8', color: '#1F2937' }}
              onFocus={(e) => (e.target.style.borderColor = '#8CC63F')}
              onBlur={(e) => (e.target.style.borderColor = '#E5E8E8')}
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { setShowModal(false); setNewNote(''); }}
                className="flex-1 py-3 rounded-[10px] text-sm font-medium active:scale-[0.98] transition-transform cursor-pointer"
                style={{ border: '2px solid #E5E8E8', color: '#566573' }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newNote.trim()}
                className="flex-1 py-3 rounded-[10px] text-white text-sm font-semibold active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
                style={{ background: '#8CC63F' }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

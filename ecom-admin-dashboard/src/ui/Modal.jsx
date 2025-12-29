import { useEffect } from 'react'

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="backdrop" role="dialog" aria-modal="true">
      <div className="modal panel">
        <div className="modalHeader">
          <div className="row" style={{ gap: 8 }}>
            <strong>{title}</strong>
            <span className="muted" style={{ fontSize: 12 }}>
              (Esc to close)
            </span>
          </div>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  )
}


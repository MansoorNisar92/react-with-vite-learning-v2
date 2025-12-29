import { Profiler, useMemo, useState } from 'react'

function ms(n) {
  return `${n.toFixed(1)}ms`
}

/**
 * Tiny wrapper to make React Profiler visible in UI.
 * Open React DevTools Profiler for deeper analysis.
 */
export function RenderProfiler({ id, children }) {
  const [last, setLast] = useState(null)

  const onRender = useMemo(
    () =>
      function onRenderCb(
        _id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
      ) {
        setLast({
          phase,
          actualDuration,
          baseDuration,
          startTime,
        })
      },
    [],
  )

  return (
    <div style={{ position: 'relative', minWidth: 0 }}>
      <Profiler id={id} onRender={onRender}>
        {children}
      </Profiler>
      <div
        className="pill"
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          pointerEvents: 'none',
          opacity: 0.92,
        }}
      >
        <span className="muted">Profiler</span>
        <strong>
          {last ? `${last.phase}: ${ms(last.actualDuration)}` : '—'}
        </strong>
      </div>
    </div>
  )
}


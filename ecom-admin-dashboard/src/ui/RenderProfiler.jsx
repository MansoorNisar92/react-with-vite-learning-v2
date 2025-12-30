import { Profiler, useMemo, useRef, useState } from 'react'

function ms(n) {
  return `${n.toFixed(1)}ms`
}

/**
 * Tiny wrapper to make React Profiler visible in UI.
 * Open React DevTools Profiler for deeper analysis.
 */
export function RenderProfiler({ id, children }) {
  const [last, setLast] = useState(null)
  const didUpdateFromProfilerRef = useRef(false)

  const onRender = useMemo(
    () =>
      function onRenderCb(
        _id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
      ) {
        // Important: calling setState inside the Profiler callback can cause an
        // infinite loop (Profiler -> setState -> render -> Profiler -> ...).
        // We guard against the "self update" render we trigger for the overlay.
        if (didUpdateFromProfilerRef.current) {
          didUpdateFromProfilerRef.current = false
          return
        }

        const next = { phase, actualDuration, baseDuration, startTime }

        // Only update when value meaningfully changes.
        // (Prevents re-render storms for tiny timing differences.)
        setLast((prev) => {
          const sameEnough =
            prev &&
            prev.phase === next.phase &&
            Math.abs(prev.actualDuration - next.actualDuration) < 0.2

          if (sameEnough) return prev
          didUpdateFromProfilerRef.current = true
          return next
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


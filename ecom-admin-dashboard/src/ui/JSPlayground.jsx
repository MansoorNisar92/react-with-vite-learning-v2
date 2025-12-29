import { useMemo, useState } from 'react'

const SNIPPETS = [
  {
    id: 'var-let-const-hoisting',
    title: 'var / let / const + hoisting',
    description:
      'See how var is hoisted as undefined, while let/const are in TDZ.',
    code: `// Hoisting
console.log('var before:', a) // undefined
var a = 1
console.log('var after:', a) // 1

try {
  console.log(b) // ReferenceError (TDZ)
} catch (e) {
  console.log('let before error:', e.name)
}
let b = 2
console.log('let after:', b)
`,
  },
  {
    id: 'sync-vs-async',
    title: 'Sync vs async',
    description:
      'Sync blocks immediately; async schedules work and continues execution.',
    code: `function syncWork() {
  console.log('sync: start heavy work')
  let sum = 0
  for (let i = 0; i < 500000; i++) sum += i
  console.log('sync: done', sum)
}

async function asyncWork() {
  console.log('async: start')
  await Promise.resolve()
  console.log('async: after await (microtask)')
}

console.log('script: start')
syncWork()
asyncWork()
console.log('script: end')
`,
  },
  {
    id: 'closure',
    title: 'Closure',
    description: 'Inner function keeps access to outer scope.',
    code: `function makeCounter() {
  let count = 0
  return function inc() {
    count += 1
    return count
  }
}

const c = makeCounter()
console.log(c()) // 1
console.log(c()) // 2
`,
  },
  {
    id: 'event-loop',
    title: 'Event loop: microtasks vs macrotasks',
    description:
      'Promise callbacks (microtasks) run before setTimeout (macrotasks).',
    code: `console.log('sync: start')

setTimeout(() => console.log('macro: timeout'), 0)

Promise.resolve().then(() => console.log('micro: promise'))

console.log('sync: end')
`,
  },
  {
    id: 'this-call-apply-bind',
    title: 'this + call / apply / bind',
    description: 'Control "this" explicitly.',
    code: `function greet(greeting, punctuation) {
  return greeting + ' ' + this.name + punctuation
}

const user = { name: 'Asha' }

console.log(greet.call(user, 'Hi', '!'))
console.log(greet.apply(user, ['Hello', '!!']))

const bound = greet.bind(user, 'Hey')
console.log(bound('?'))
`,
  },
  {
    id: 'hashmap',
    title: 'HashMap: Map for O(1) access',
    description: 'Use Map for fast lookups by id.',
    code: `const products = [
  { id: 'p1', name: 'Keyboard' },
  { id: 'p2', name: 'Mouse' },
]

const byId = new Map(products.map((p) => [p.id, p]))
console.log(byId.get('p2').name) // Mouse
`,
  },
]

function runSnippet(code) {
  const lines = []
  const sandboxConsole = {
    log: (...args) => lines.push(args.map(String).join(' ')),
    warn: (...args) => lines.push(['warn:', ...args].map(String).join(' ')),
    error: (...args) => lines.push(['error:', ...args].map(String).join(' ')),
  }

  try {
    const fn = new Function('console', code)
    fn(sandboxConsole)
  } catch (e) {
    lines.push(`error: ${e?.name || 'Error'}: ${e?.message || String(e)}`)
  }

  return lines.join('\n')
}

export function JSPlayground() {
  const [activeId, setActiveId] = useState(SNIPPETS[0].id)
  const active = useMemo(
    () => SNIPPETS.find((s) => s.id === activeId) || SNIPPETS[0],
    [activeId],
  )
  const [output, setOutput] = useState(runSnippet(active.code))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14 }}>
      <div className="panel" style={{ padding: 12, boxShadow: 'none' }}>
        <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
          Pick a topic
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {SNIPPETS.map((s) => (
            <button
              key={s.id}
              className={`btn ${s.id === activeId ? 'btnPrimary' : ''}`}
              onClick={() => {
                setActiveId(s.id)
                setOutput(runSnippet(s.code))
              }}
              style={{ justifyContent: 'flex-start' }}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        <div className="pageTitle" style={{ margin: 0 }}>
          <h1 style={{ fontSize: 16 }}>{active.title}</h1>
          <button className="btn" onClick={() => setOutput(runSnippet(active.code))}>
            Run
          </button>
        </div>
        <div className="muted" style={{ marginTop: -6, fontSize: 13 }}>
          {active.description}
        </div>

        <div className="panel" style={{ padding: 12, boxShadow: 'none' }}>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Code
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{active.code}</pre>
        </div>

        <div className="panel" style={{ padding: 12, boxShadow: 'none' }}>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
            Output
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {output || '(no output)'}
          </pre>
        </div>
      </div>
    </div>
  )
}


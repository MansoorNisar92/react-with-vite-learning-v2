function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms)
    function onAbort() {
      clearTimeout(id)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    if (signal) {
      if (signal.aborted) return onAbort()
      signal.addEventListener('abort', onAbort, { once: true })
    }
  })
}

function makeProduct(i) {
  const categories = ['Accessories', 'Audio', 'Computers', 'Gaming', 'Mobile']
  const category = categories[i % categories.length]
  const price = Math.round((9.99 + (i % 800) * 0.85) * 100) / 100
  const stock = (i * 17) % 240
  return {
    id: `p_${i.toString().padStart(5, '0')}`,
    name: `${category} Item ${i + 1}`,
    category,
    price,
    stock,
    rating: Math.round(((i % 50) / 10 + 1) * 10) / 10, // 1.0 - 6.0
  }
}

const PRODUCT_COUNT = 10_000
const PRODUCT_SEED = Array.from({ length: PRODUCT_COUNT }, (_, i) => makeProduct(i))

/**
 * Fake API that supports:
 * - async latency
 * - abort signal
 * - simple query filtering
 */
export async function mockFetchProducts({ query, signal }) {
  await sleep(350, signal)

  const q = String(query || '').trim().toLowerCase()
  if (!q) return PRODUCT_SEED

  return PRODUCT_SEED.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    )
  })
}


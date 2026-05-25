export function logAiEvent(event) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      ...event,
    }),
  )
}

export async function measure(name, fn) {
  const start = performance.now()

  try {
    const result = await fn()
    return {
      name,
      ok: true,
      ms: Math.round(performance.now() - start),
      result,
    }
  } catch (error) {
    return {
      name,
      ok: false,
      ms: Math.round(performance.now() - start),
      error,
    }
  }
}

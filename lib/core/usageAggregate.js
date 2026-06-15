export function aggregateUsageEntries(entries) {
  const totals = {
    requests: entries.length,
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    costUsd: 0,
    costInr: 0,
  }

  const byEndpoint = {}
  const byModel = {}
  const byDay = {}

  for (const entry of entries) {
    totals.inputTokens += entry.inputTokens
    totals.outputTokens += entry.outputTokens
    totals.totalTokens += entry.totalTokens
    totals.costUsd += entry.costUsd
    totals.costInr += entry.costInr

    byEndpoint[entry.endpoint] = byEndpoint[entry.endpoint] || {
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
    }
    byEndpoint[entry.endpoint].requests += 1
    byEndpoint[entry.endpoint].inputTokens += entry.inputTokens
    byEndpoint[entry.endpoint].outputTokens += entry.outputTokens
    byEndpoint[entry.endpoint].costUsd += entry.costUsd

    byModel[entry.model] = byModel[entry.model] || {
      requests: 0,
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
    }
    byModel[entry.model].requests += 1
    byModel[entry.model].inputTokens += entry.inputTokens
    byModel[entry.model].outputTokens += entry.outputTokens
    byModel[entry.model].costUsd += entry.costUsd

    const day = entry.timestamp.slice(0, 10)
    byDay[day] = byDay[day] || { inputTokens: 0, outputTokens: 0, costUsd: 0, requests: 0 }
    byDay[day].inputTokens += entry.inputTokens
    byDay[day].outputTokens += entry.outputTokens
    byDay[day].costUsd += entry.costUsd
    byDay[day].requests += 1
  }

  return { totals, byEndpoint, byModel, byDay }
}

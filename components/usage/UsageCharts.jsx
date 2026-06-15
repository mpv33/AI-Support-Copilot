const SLICE_COLORS = ['#10a37f', '#0d8f6f', '#6366f1', '#f59e0b', '#71717a', '#ec4899']

function polarToCartesian(cx, cy, r, angle) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

function describeSlice(cx, cy, r, startAngle, endAngle) {
  if (endAngle - startAngle >= Math.PI * 2 - 0.001) {
    return [
      `M ${cx - r} ${cy}`,
      `A ${r} ${r} 0 1 1 ${cx + r} ${cy}`,
      `A ${r} ${r} 0 1 1 ${cx - r} ${cy}`,
      'Z',
    ].join(' ')
  }

  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ')
}

export function DonutChart({ slices, size = 168, innerRatio = 0.62, centerLabel, centerSub }) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)
  if (total <= 0) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-400 dark:bg-zinc-800"
        style={{ width: size, height: size }}
      >
        No data
      </div>
    )
  }

  const cx = 50
  const cy = 50
  const outerR = 46
  const innerR = outerR * innerRatio
  let angle = -Math.PI / 2

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-0">
        {slices.map((slice, i) => {
          const sweep = (slice.value / total) * Math.PI * 2
          const start = angle
          const end = angle + sweep
          angle = end
          return (
            <path
              key={slice.label}
              d={describeSlice(cx, cy, outerR, start, end)}
              fill={slice.color || SLICE_COLORS[i % SLICE_COLORS.length]}
              className="transition-opacity hover:opacity-90"
            />
          )
        })}
        <circle cx={cx} cy={cy} r={innerR} className="fill-white dark:fill-zinc-950" />
      </svg>
      {(centerLabel || centerSub) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerLabel ? (
            <p className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{centerLabel}</p>
          ) : null}
          {centerSub ? <p className="text-[10px] text-zinc-500">{centerSub}</p> : null}
        </div>
      )}
    </div>
  )
}

export function ChartLegend({ items }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center justify-between gap-3 text-xs">
          <span className="flex min-w-0 items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            <span className="truncate text-zinc-700 dark:text-zinc-300">{item.label}</span>
          </span>
          <span className="shrink-0 font-mono tabular-nums text-zinc-600 dark:text-zinc-400">{item.display}</span>
        </li>
      ))}
    </ul>
  )
}

export function SpendAreaChart({ points, formatLabel, formatValue }) {
  if (!points.length) {
    return <p className="py-10 text-center text-xs text-zinc-400">No daily data yet</p>
  }

  const width = 640
  const height = 200
  const pad = { top: 16, right: 16, bottom: 32, left: 48 }
  const chartW = width - pad.left - pad.right
  const chartH = height - pad.top - pad.bottom
  const max = Math.max(...points.map((p) => p.value), 0.0001)
  const n = points.length

  const coords = points.map((point, i) => ({
    ...point,
    x: pad.left + (n <= 1 ? chartW / 2 : (i / (n - 1)) * chartW),
    y: pad.top + chartH - (point.value / max) * chartH,
  }))

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
  const baseY = pad.top + chartH
  const areaPath = `${linePath} L ${coords[n - 1].x.toFixed(1)} ${baseY} L ${coords[0].x.toFixed(1)} ${baseY} Z`

  const gridSteps = 4
  const labelStride = n <= 7 ? 1 : n <= 10 ? 2 : Math.ceil(n / 7)

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[200px] w-full"
        role="img"
        aria-label="Daily spend chart"
      >
        <defs>
          <linearGradient id="spendAreaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10a37f" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#10a37f" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {Array.from({ length: gridSteps + 1 }, (_, i) => {
          const y = pad.top + (chartH / gridSteps) * i
          const value = max - (max / gridSteps) * i
          return (
            <g key={i}>
              <line
                x1={pad.left}
                y1={y}
                x2={width - pad.right}
                y2={y}
                className="stroke-zinc-100 dark:stroke-zinc-800"
                strokeWidth="1"
              />
              <text
                x={pad.left - 8}
                y={y + 3}
                textAnchor="end"
                className="fill-zinc-400 text-[9px] font-mono"
              >
                {formatValue(value)}
              </text>
            </g>
          )
        })}

        <path d={areaPath} fill="url(#spendAreaGradient)" />
        <path
          d={linePath}
          fill="none"
          stroke="#10a37f"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {coords.map((point, i) => (
          <g key={point.key}>
            <circle cx={point.x} cy={point.y} r="4" className="fill-brand" />
            <circle cx={point.x} cy={point.y} r="7" className="fill-brand/15" />
            <title>{`${formatLabel(point.label)} · ${formatValue(point.value)}`}</title>
            {i % labelStride === 0 || i === n - 1 ? (
              <text
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                className="fill-zinc-500 text-[10px] font-medium"
              >
                {formatLabel(point.label)}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  )
}

/** @deprecated use SpendAreaChart */
export function BarChart(props) {
  return <SpendAreaChart {...props} />
}

export function buildChartSlices(items, valueKey, labelFn, formatValue) {
  return items
    .filter((item) => item[valueKey] > 0)
    .map((item, i) => ({
      label: labelFn(item),
      value: item[valueKey],
      color: SLICE_COLORS[i % SLICE_COLORS.length],
      display: formatValue(item[valueKey]),
    }))
}

export { SLICE_COLORS }

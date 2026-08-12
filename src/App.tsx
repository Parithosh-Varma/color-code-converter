import { useState, useEffect, useCallback } from 'react'

interface RGB {
  r: number
  g: number
  b: number
}

const NAMED: [string, string][] = [
  ['aliceblue', '#f0f8ff'], ['antiquewhite', '#faebd7'], ['aqua', '#00ffff'], ['aquamarine', '#7fffd4'],
  ['azure', '#f0ffff'], ['beige', '#f5f5dc'], ['bisque', '#ffe4c4'], ['black', '#000000'],
  ['blanchedalmond', '#ffebcd'], ['blue', '#0000ff'], ['blueviolet', '#8a2be2'], ['brown', '#a52a2a'],
  ['burlywood', '#deb887'], ['cadetblue', '#5f9ea0'], ['chartreuse', '#7fff00'], ['chocolate', '#d2691e'],
  ['coral', '#ff7f50'], ['cornflowerblue', '#6495ed'], ['crimson', '#dc143c'], ['cyan', '#00ffff'],
  ['darkblue', '#00008b'], ['darkcyan', '#008b8b'], ['darkgoldenrod', '#b8860b'], ['darkgray', '#a9a9a9'],
  ['darkgreen', '#006400'], ['darkgrey', '#a9a9a9'], ['darkkhaki', '#bdb76b'], ['darkmagenta', '#8b008b'],
  ['darkolivegreen', '#556b2f'], ['darkorange', '#ff8c00'], ['darkorchid', '#9932cc'], ['darkred', '#8b0000'],
  ['darksalmon', '#e9967a'], ['darkseagreen', '#8fbc8f'], ['darkslateblue', '#483d8b'], ['darkslategray', '#2f4f4f'],
  ['darkslategrey', '#2f4f4f'], ['darkturquoise', '#00ced1'], ['darkviolet', '#9400d3'], ['deeppink', '#ff1493'],
  ['deepskyblue', '#00bfff'], ['dimgray', '#696969'], ['dimgrey', '#696969'], ['dodgerblue', '#1e90ff'],
  ['firebrick', '#b22222'], ['floralwhite', '#fffaf0'], ['forestgreen', '#228b22'], ['fuchsia', '#ff00ff'],
  ['gainsboro', '#dcdcdc'], ['ghostwhite', '#f8f8ff'], ['gold', '#ffd700'], ['goldenrod', '#daa520'],
  ['gray', '#808080'], ['green', '#008000'], ['greenyellow', '#adff2f'], ['grey', '#808080'],
  ['honeydew', '#f0fff0'], ['hotpink', '#ff69b4'], ['indianred', '#cd5c5c'], ['indigo', '#4b0082'],
  ['ivory', '#fffff0'], ['khaki', '#f0e68c'], ['lavender', '#e6e6fa'], ['lavenderblush', '#fff0f5'],
  ['lawngreen', '#7cfc00'], ['lemonchiffon', '#fffacd'], ['lightblue', '#add8e6'], ['lightcoral', '#f08080'],
  ['lightcyan', '#e0ffff'], ['lightgoldenrodyellow', '#fafad2'], ['lightgray', '#d3d3d3'], ['lightgreen', '#90ee90'],
  ['lightgrey', '#d3d3d3'], ['lightpink', '#ffb6c1'], ['lightsalmon', '#ffa07a'], ['lightseagreen', '#20b2aa'],
  ['lightskyblue', '#87cefa'], ['lightslategray', '#778899'], ['lightslategrey', '#778899'], ['lightsteelblue', '#b0c4de'],
  ['lightyellow', '#ffffe0'], ['lime', '#00ff00'], ['limegreen', '#32cd32'], ['linen', '#faf0e6'],
  ['magenta', '#ff00ff'], ['maroon', '#800000'], ['mediumaquamarine', '#66cdaa'], ['mediumblue', '#0000cd'],
  ['mediumorchid', '#ba55d3'], ['mediumpurple', '#9370db'], ['mediumseagreen', '#3cb371'], ['mediumslateblue', '#7b68ee'],
  ['mediumspringgreen', '#00fa9a'], ['mediumturquoise', '#48d1cc'], ['mediumvioletred', '#c71585'], ['midnightblue', '#191970'],
  ['mintcream', '#f5fffa'], ['mistyrose', '#ffe4e1'], ['moccasin', '#ffe4b5'], ['navajowhite', '#ffdead'],
  ['navy', '#000080'], ['oldlace', '#fdf5e6'], ['olive', '#808000'], ['olivedrab', '#6b8e23'],
  ['orange', '#ffa500'], ['orangered', '#ff4500'], ['orchid', '#da70d6'], ['palegoldenrod', '#eee8aa'],
  ['palegreen', '#98fb98'], ['paleturquoise', '#afeeee'], ['palevioletred', '#db7093'], ['papayawhip', '#ffefd5'],
  ['peachpuff', '#ffdab9'], ['peru', '#cd853f'], ['pink', '#ffc0cb'], ['plum', '#dda0dd'],
  ['powderblue', '#b0e0e6'], ['purple', '#800080'], ['rebeccapurple', '#663399'], ['red', '#ff0000'],
  ['rosybrown', '#bc8f8f'], ['royalblue', '#4169e1'], ['saddlebrown', '#8b4513'], ['salmon', '#fa8072'],
  ['sandybrown', '#f4a460'], ['seagreen', '#2e8b57'], ['seashell', '#fff5ee'], ['sienna', '#a0522d'],
  ['silver', '#c0c0c0'], ['skyblue', '#87ceeb'], ['slateblue', '#6a5acd'], ['slategray', '#708090'],
  ['slategrey', '#708090'], ['snow', '#fffafa'], ['springgreen', '#00ff7f'], ['steelblue', '#4682b4'],
  ['tan', '#d2b48c'], ['teal', '#008080'], ['thistle', '#d8bfd8'], ['tomato', '#ff6347'],
  ['turquoise', '#40e0d0'], ['violet', '#ee82ee'], ['wheat', '#f5deb3'], ['white', '#ffffff'],
  ['whitesmoke', '#f5f5f5'], ['yellow', '#ffff00'], ['yellowgreen', '#9acd32'],
]

function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '')
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean
  const num = parseInt(full, 16)
  if (full.length !== 6 || Number.isNaN(num)) throw new Error('Invalid hex color')
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex({ r, g, b }: RGB): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function parseHex(input: string): RGB {
  const m = input.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!m) throw new Error('Invalid hex color')
  return hexToRgb(m[1])
}

function parseRgb(input: string): RGB {
  const m = input.trim().match(/^rgba?\(\s*([\d.]+)%?\s*[, ]\s*([\d.]+)%?\s*[, ]\s*([\d.]+)%?\s*(?:[,/]\s*[\d.]+%?\s*)?\)$/i)
  if (!m) throw new Error('Invalid rgb() color')
  const conv = (v: string) => {
    const num = parseFloat(v)
    return v.endsWith('%') ? clamp255((num / 100) * 255) : clamp255(num)
  }
  return { r: conv(m[1]), g: conv(m[2]), b: conv(m[3]) }
}

function parseHsl(input: string): RGB {
  const m = input.trim().match(/^hsla?\(\s*([\d.]+)(?:deg)?\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%\s*(?:[, ]\s*[\d.]+%?\s*)?\)$/i)
  if (!m) throw new Error('Invalid hsl() color')
  let h = parseFloat(m[1]) % 360
  if (h < 0) h += 360
  const s = parseFloat(m[2]) / 100
  const l = parseFloat(m[3]) / 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const mm = l - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) { r = c; g = x; b = 0 }
  else if (h < 120) { r = x; g = c; b = 0 }
  else if (h < 180) { r = 0; g = c; b = x }
  else if (h < 240) { r = 0; g = x; b = c }
  else if (h < 300) { r = x; g = 0; b = c }
  else { r = c; g = 0; b = x }
  return { r: clamp255((r + mm) * 255), g: clamp255((g + mm) * 255), b: clamp255((b + mm) * 255) }
}

function parseNamed(input: string): RGB {
  const hex = NAMED.find(([n]) => n === input.trim().toLowerCase())?.[1]
  if (!hex) throw new Error('Unknown color name')
  return hexToRgb(hex)
}

function parseColor(input: string): RGB {
  const t = input.trim()
  if (!t) throw new Error('Empty input')
  if (/^#?[0-9a-f]{3}$/i.test(t) || /^#?[0-9a-f]{6}$/i.test(t)) return parseHex(t)
  if (/^rgb/i.test(t)) return parseRgb(t)
  if (/^hsl/i.test(t)) return parseHsl(t)
  if (/^[a-z]+$/i.test(t)) return parseNamed(t)
  throw new Error('Unrecognized format — try "#6366f1", "rgb(99 102 241)", "hsl(239 84% 67%)" or "indigo"')
}

function rgbToHsl({ r, g, b }: RGB): { h: number; s: number; l: number } {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60
  else if (max === gn) h = ((bn - rn) / d + 2) * 60
  else h = ((rn - gn) / d + 4) * 60
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function nearestName({ r, g, b }: RGB): string {
  let best = 'unknown'
  let bestDist = Infinity
  for (const [name, hex] of NAMED) {
    const t = hexToRgb(hex)
    const d = (t.r - r) ** 2 + (t.g - g) ** 2 + (t.b - b) ** 2
    if (d < bestDist) {
      bestDist = d
      best = name
    }
  }
  return best
}

function mixWithWhite(hex: string, adjust: number): string {
  const { r, g, b } = hexToRgb(hex)
  const mix = (v: number) => Math.round(v + (255 - v) * adjust)
  return rgbToHex({ r: mix(r), g: mix(g), b: mix(b) })
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return 'dark'
    if (saved === 'light') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [input, setInput] = useState('#6366f1')
  const [copiedField, setCopiedField] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (!input.trim()) {
      setError('')
      return
    }
    try {
      parseColor(input)
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid color')
    }
  }, [input])

  let rgb: RGB | null = null
  try {
    rgb = input.trim() ? parseColor(input) : null
  } catch {
    rgb = null
  }

  const hsl = rgb ? rgbToHsl(rgb) : null
  const hex = rgb ? rgbToHex(rgb) : ''
  const name = rgb ? nearestName(rgb) : ''

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedField(label)
    setTimeout(() => setCopiedField(''), 1400)
  }

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      const input = document.querySelector('input')
      if (input) input.focus()
    }
    // Ctrl/Cmd + C to copy hex value
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !window.getSelection()?.toString()) {
      e.preventDefault()
      copy('hex', hex)
    }
  }, [hex, copy])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [handleKeyboard])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center transition-colors duration-300">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-border bg-card/60 backdrop-blur-md w-full">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-border shadow-sm" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">Color Code Converter</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/parithosh-varma/color-code-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all border border-border bg-background hover:bg-muted text-foreground rounded-lg shadow-sm hover:border-muted-foreground/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span className="hidden sm:inline">Repo</span>
          </a>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="inline-flex items-center justify-center w-9 h-9 border border-border bg-background hover:bg-muted text-foreground rounded-lg transition-all hover:border-muted-foreground/30 shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl px-6 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Convert any color format</h2>
            <p className="text-muted-foreground mt-1">Type a color — hex, rgb, hsl or CSS name — get every representation instantly.</p>
          </div>
          <button
            onClick={() => setInput(rgbToHex({ r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) }))}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-all shadow-sm"
          >
            Random color
          </button>
        </div>

        <div className="border border-border rounded-2xl bg-card shadow-sm overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-border bg-muted/40">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Enter a color</label>
          </div>
          <div className="p-4 flex flex-col sm:flex-row items-stretch gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="#6366f1 · rgb(99 102 241) · hsl(239 84% 67%) · indigo"
              className="flex-1 bg-transparent border border-input rounded-xl px-4 py-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground/50"
              spellCheck={false}
            />
            <input
              type="color"
              value={hex || '#6366f1'}
              onChange={(e) => setInput(e.target.value)}
              className="h-[46px] w-14 cursor-pointer rounded-xl border border-border bg-background p-1 shadow-sm"
              aria-label="Color picker"
            />
          </div>
          {error && (
            <div className="px-4 pb-4 flex items-center gap-2 text-sm text-destructive font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              {error}
            </div>
          )}
        </div>

        {rgb && hsl && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
                <div
                  className="h-40 transition-colors duration-300"
                  style={{ background: hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }}
                />
                <div className="px-4 py-3 bg-card text-sm flex items-center gap-2">
                  <span className="font-semibold capitalize">{name}</span>
                  <span className="ml-auto font-mono text-muted-foreground">{hex}</span>
                </div>
              </div>

              <div className="border border-border rounded-2xl bg-card shadow-sm p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">All formats</h3>
                <div className="space-y-2.5">
                  <CopyRow label="HEX" value={hex} copied={copiedField === 'hex'} onClick={() => copy('hex', hex)} />
                  <CopyRow label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} copied={copiedField === 'rgb'} onClick={() => copy('rgb', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} />
                  <CopyRow label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} copied={copiedField === 'hsl'} onClick={() => copy('hsl', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} />
                  <CopyRow label="NAME" value={name} copied={copiedField === 'name'} onClick={() => copy('name', name)} />
                </div>
              </div>
            </div>

            <div className="border border-border rounded-2xl bg-card shadow-sm p-5 mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Shades & tints</h3>
              <div className="grid grid-cols-5 gap-3">
                <Shade hex={mixWithWhite(hex, 0.7)} label="Tint" />
                <Shade hex={mixWithWhite(hex, 0.45)} label="Light" />
                <Shade hex={hex} label="Base" />
                <Shade hex={mixWithWhite(hex, -0.35)} label="Deep" />
                <Shade hex={mixWithWhite(hex, -0.6)} label="Dark" />
              </div>
            </div>

            <div className="border border-border rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-primary shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>Supports HEX (3 & 6 digit), rgb()/rgba() with percentages, hsl()/hsla() with degrees, and all 140 CSS color names.</span>
            </div>
          </>
        )}
      </main>

      <footer className="w-full text-center py-8 border-t border-border text-sm text-muted-foreground">
        <p>Built with ❤️ by <a href="https://github.com/parithosh-varma" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Parithosh Varma</a></p>
      </footer>
    </div>
  )
}

function CopyRow({ label, value, copied, onClick }: { label: string; value: string; copied: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-border bg-background/50 hover:bg-muted transition-all group">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground w-12 text-left">{label}</span>
      <span className="font-mono text-sm truncate">{value}</span>
      <span className={`shrink-0 transition-colors ${copied ? 'text-green-500' : 'text-muted-foreground opacity-40 group-hover:opacity-100'}`}>
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M20 6 9 17l-5-5"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        )}
      </span>
    </button>
  )
}

function Shade({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm">
      <div className="h-12 transition-colors duration-300" style={{ background: hex }} />
      <div className="px-1.5 py-1.5 bg-card text-[10px] font-mono text-muted-foreground text-center">{label}<br />{hex}</div>
    </div>
  )
}

export default App
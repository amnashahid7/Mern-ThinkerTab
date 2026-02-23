import { useEffect, useState } from 'react'

const THEMES = ['light', 'dark', 'forest'] as const

export default function ThemeToggle() {
  const [index, setIndex] = useState(() => {
    try {
      const t = localStorage.getItem('theme')
      if (!t) return 0
      const i = THEMES.findIndex(x => x === t)
      return i === -1 ? 0 : i
    } catch {
      return 0
    }
  })

  const theme = THEMES[index]

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme-thinkertab', theme)
    } catch(error) {
        console.error('Failed to set theme:', error)
    }
  }, [theme])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const v = e.target.value
      const i = THEMES.findIndex(x => x === v)
      setIndex(i === -1 ? 0 : i)
    }

    return (
      <div className="form-control">

        <select
          aria-label="Select theme"
          value={theme}
          onChange={handleChange}
          className="select select-bordered select-sm w-auto"
        >
          {THEMES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    )
}

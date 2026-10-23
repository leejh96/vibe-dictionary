import type { CSSProperties, ReactNode } from 'react';
import { useLocale } from '../../../i18n/LocaleContext';

export const palette = ['#c4b5fd', '#fb7185', '#67e8f9', '#bef264', '#fbbf24'];

export function Stage({ label, children, className = '', style }: { label: string; children: ReactNode; className?: string; style?: CSSProperties }) {
  return <div className="cx-demo"><div className={`cx-stage ${className}`} aria-label={label} role="group" style={style}>{children}</div></div>;
}

export function Art({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 280 160" className="cx-svg" aria-hidden="true">{children}</svg>;
}

export function Range({ value, onChange, min = 0, max = 100, label }: { value: number; onChange: (value: number) => void; min?: number; max?: number; label: string }) {
  return <label className="cx-range"><span>{label}</span><input type="range" min={min} max={max} value={value} onChange={event => onChange(Number(event.target.value))} /><output>{value}</output></label>;
}

export function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  const { t } = useLocale();
  return <button type="button" className="cx-action" aria-pressed={value} onClick={onChange}>{t(value ? 'demo.collection.reset' : 'demo.collection.try')}</button>;
}

export function Landscape({ variant = 0 }: { variant?: number }) {
  return <><rect width="280" height="160" fill={variant ? '#a5b4fc' : '#fbcba7'} /><circle cx={variant ? 65 : 210} cy="42" r="23" fill="#fff5ce" /><path d="M0 140 85 35 175 140Z" fill={variant ? '#5b5d92' : '#b26573'} /><path d="M85 160 210 65 280 130V160Z" fill={variant ? '#303859' : '#784957'} /><path d="M0 132Q80 112 150 143T280 130V160H0Z" fill={variant ? '#73bec5' : '#eaa879'} /></>;
}

export function Product({ color = '#c4b5fd' }: { color?: string }) {
  return <g><rect x="109" y="45" width="62" height="99" rx="15" fill={color} /><rect x="119" y="26" width="42" height="25" rx="5" fill="#f8fafc" /><rect x="119" y="77" width="42" height="36" rx="3" fill="#fff" opacity=".8" /><circle cx="140" cy="95" r="9" fill="#182139" /><path d="M119 56v15" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".6" /></g>;
}

import logoHorizontal from '../../assets/logo-horizontal.png'
import logoIcone from '../../assets/logo-icone.png'
import logoVertical from '../../assets/logo-vertical.png'

const sizeMap = {
  sm: { horizontal: 36, vertical: 80, icon: 32 },
  md: { horizontal: 44, vertical: 110, icon: 44 },
  lg: { horizontal: 56, vertical: 150, icon: 56 },
}

export function Logo({ variant = 'horizontal', size = 'md' }) {
  const s = sizeMap[size] || sizeMap.md

  if (variant === 'icon') {
    return (
      <img
        src={logoIcone}
        alt="UNI Gestão de Pessoas"
        width={s.icon}
        height={s.icon}
        style={{ objectFit: 'contain' }}
      />
    )
  }

  if (variant === 'vertical') {
    return (
      <img
        src={logoVertical}
        alt="UNI Gestão de Pessoas"
        height={s.vertical}
        style={{ objectFit: 'contain' }}
      />
    )
  }

  return (
    <img
      src={logoHorizontal}
      alt="UNI Gestão de Pessoas"
      style={{ height: s.horizontal, maxHeight: '100%', objectFit: 'contain' }}
    />
  )
}

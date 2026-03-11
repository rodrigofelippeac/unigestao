import { Link } from 'react-router-dom'

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  href,
  to,
  full = false,
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    full ? 'btn--full' : '',
    className,
  ].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

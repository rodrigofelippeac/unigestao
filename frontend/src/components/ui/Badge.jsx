export function Badge({ variant = 'primary', className = '', children }) {
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  )
}

export function Card({ className = '', children, ...props }) {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ className = '', children }) {
  return <div className={`card__body ${className}`}>{children}</div>
}

export function CardHeader({ className = '', children }) {
  return <div className={`card__header ${className}`}>{children}</div>
}

export function CardFooter({ className = '', children }) {
  return <div className={`card__footer ${className}`}>{children}</div>
}

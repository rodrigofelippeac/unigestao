export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  )
}

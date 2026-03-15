export interface WorkFrontmatter {
  title: string
  description?: string | null
  featuredImage?: string
  tags: string[]
}

export interface Props {
  href?: string
  frontmatter: WorkFrontmatter
}

export default function WorkCard({ href, frontmatter }: Props) {
  const { title, description, featuredImage, tags } = frontmatter
  const inner = (
    <>
      <img src={featuredImage} alt="" className="wide mb-5" />

      <h2 className="h2 hover:text-tx-accent-1 whitespace-nowrap">
        <span className="whitespace-normal">{title}</span>
      </h2>

      <div className="mb-2 flex flex-row flex-wrap gap-2">
        {tags.map((tags) => (
          <span className="border-ui-2 bg-bg-2 text-tx-3 rounded border px-1.5 text-sm">
            {tags}
          </span>
        ))}
      </div>

      <p className="text-tx-2 leading-normal">{description}</p>
    </>
  )

  return (
    <div className="not-prose mt-12 mb-16">
      {href ? (
        <a href={href} className="hover:text-tx-accent-1 flex flex-col no-underline!">{inner}</a>
      ) : (
        <div className="flex flex-col">{inner}</div>
      )}
    </div>
  )
}

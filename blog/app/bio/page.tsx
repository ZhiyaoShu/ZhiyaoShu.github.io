import { DocPosts } from 'app/components/bio'

export const metadata = {
  title: 'Doc',
  description: 'Read my bio.',
}

export default function Page() {
  return (
    <section>
      <div>
        My research intersts focus on the generative vision transformer especially in the context of urban/public sences. I am also interested in how natrual language processing can be used to generate and understand AI generated design and images. 
      </div>
      <DocPosts />
    </section>
  )
}

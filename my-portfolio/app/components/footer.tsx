
export default function Footer() {
  return (
    <div className="mb-16">
      <p className="mt-8 text-neutral-500 dark:text-neutral-300">
        © {new Date().getFullYear()} Content coprighted by Zhiyao Shu. All rights reserved. UI inspired by
        <a
          href="https://brittanychiang.com/"
        >
          <u>Vercel Templates</u>
        </a>.
      </p>
    </div>
  )
}

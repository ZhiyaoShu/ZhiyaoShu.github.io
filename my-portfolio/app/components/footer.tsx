export default function Footer() {
  return (
    <div className="text-center">
      <p className="mt-8 text-neutral-500 dark:text-neutral-300">
        © {new Date().getFullYear()} Content coprighted by Zhiyao Shu. Updated
        until {new Date().toLocaleDateString()} All rights reserved.
      </p>
      <p className="mt-2 text-neutral-500 dark:text-neutral-300">
        UI inspired by{" "}
        <a href="https://vercel.com/templates/next.js/portfolio-starter-kit">
          <u>Vercel Templates</u>
        </a>
      </p>
    </div>
  );
}

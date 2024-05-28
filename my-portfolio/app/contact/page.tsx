import CommentBox from './comments'

function ArrowIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default function Contact() {
    return (
        <div >
            <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
                Contact
            </h1>
            <ul className="font-sm mt-4 mb-4 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
                <li>
                    <a
                        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="/rss"
                    >
                        <ArrowIcon />
                        <p className="ml-2 h-7">twitter</p>
                    </a>
                </li>
                <li>
                    <a
                        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="mailto:yaoshu0326@berkeley.edu"
                    >
                        <ArrowIcon />
                        <p className="ml-2 h-7">email</p>
                    </a>
                </li>
                <li>
                    <a
                        className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
                        rel="noopener noreferrer"
                        target="_blank"
                        href="https://github.com/ZhiyaoShu"
                    >
                        <ArrowIcon />
                        <p className="ml-2 h-7">github</p>
                    </a>
                </li>
            </ul>
            <p>
                Thanks for your time to visit my website. If you have any questions or want to connect, feel free to reach out to me or leave me a message.
            </p>
            <CommentBox />
        </div>
    )
}
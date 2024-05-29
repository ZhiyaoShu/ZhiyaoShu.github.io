import CommentBox from './commentsBox'
import { ArrowIcon } from '../components/icons'

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
                        href="https://www.linkedin.com/in/zhiyao-shu-4b4b0016b/"
                    >
                        <ArrowIcon />
                        <p className="ml-2 h-7">LinkedIn</p>
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
                        <p className="ml-2 h-7">Email</p>
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
                        <p className="ml-2 h-7">Github</p>
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
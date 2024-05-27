import Link from 'next/link'

interface ProjectProps {
    id: number;
    title: string;
    description: string;
    tags: string[];
    date: string;
}


export default async function ProjectList(projects: ProjectProps){
    return (
        <div className="project-card">
            <h3>{projects.title}</h3>
            <p>{projects.description}</p>
            <div>{projects.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div>{projects.date}</div>
            <Link href={`/projects/${projects.id}`}>
                <a>Learn More</a>
            </Link>
        </div>
    )
}

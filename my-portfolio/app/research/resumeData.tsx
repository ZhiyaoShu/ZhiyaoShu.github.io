import { url } from "inspector";
import { describe } from "node:test";
import { title } from "process";

export const resumeData = {
  // Education_Certification: [
  //   {
  //     id: 1,
  //     institution: "MIT Professional Education",
  //     period: "Jul 2023 - Oct 2023",
  //     details: ["Applied data science certification, Remote."],
  //   },
  //   {
  //     institution: "University of California, Berkeley",
  //     period: "Aug 2018 - Jun 2020",
  //     degree: "Master degree of landscape architecture",
  //     location: "Berkeley, CA",
  //     details: [],
  //   },
  //   {
  //     institution: "Colorado State University",
  //     period: "Aug 2014 - Aug 2018",
  //     degree: "Bachelor degree of landscape architecture",
  //     location: "Fort Collins, CO",
  //     details: [],
  //   },
  // ],
  experience: [
    {
      id: 1,
      title: "Research Engineer",
      institution: "Mens, Manus, and Machina (M3S)",
      location: "Remote",
      period: "Jun 2024 - Present",
      description: [
        "Led the system implementation of MindCoder <strong>theory-driven AI system</strong> for <strong>deductive qualitative analysis</strong>. Architected a global, hierarchical data management system with <strong>Zustand</strong> to optimize data retrieval from user inputs and uploaded files, integrating structured prompt embeddings with LLM API interactions. Achieved a <strong>40%</strong> improvement in data fetching speed and reduced data loss by <strong>20%</strong>.",
        "Authored key sections of application-associated research paper, including <strong>system architecture</strong>, <strong>primary features</strong>, and <strong>related works</strong>. Created <strong>detailed diagrams</strong> for experiment result analysis. The paper has been submitted to CHI 2025 and is currently under review.",
        "Contributed to human-AI collaboration research, annotating Human-AI collaboration modes and analyzing taxonomies through cutting-edge studies. Reviewed over <strong>300 publications</strong> published from ACL 2021 - 2024 to classify and evaluate existed human-AI interaction frameworks.",
      ],
    },
    {
      id: 2,
      company: "Nexa AI",
      title: "Software Engineer Intern",
      location: "San Jose, CA",
      period: "Jan - Jun 2024",
      description: [
        "Developed a series of <strong>RESTful API</strong> endpoints using Java and Spring Boot to process requests from the frontend.",
        "Implemented <strong>Controller</strong>, <strong>DTOs</strong>, and <strong>Model layers</strong> with Spring MVC to manage HTTP requests and responses, optimizing data transfer between layers and improving performance.",
        "Constructed aggregation pipelines using Spring MongoDB and <strong>MongoTemplate</strong> to perform querying and manipulation in MongoDB databases.",
        "Implemented <strong>JWT Validation</strong> handling for session management and security. Utilized <strong>AWS Simple Email Service (SES)</strong> for automating email operations, enhancing user retention by 40%.",
        "Developed interactive features using <strong>React</strong>, and <strong>Context API</strong> for state management. Utilized components, hooks, and libraries to create responsive and scalable web interfaces. Collaborated with designers to improve UI with <strong>Ant Design</strong> and <strong>Tailwind CSS</strong>, and integrated Tableau dashboard for data visualization.",
        "Led the website <strong>SEO enhancement solutions</strong>, and applied effective image scaling and <strong>Google Cloud CDN</strong> optimization. Achieved a 30% reduction in search and loading time spent.",
        "Spearheaded the development of <strong>language model SDK</strong> with Python to host the language model online and locally.",
        "Utilized <strong>llama.cpp</strong> to quantize language models on Ollama (Long Chain) to convert models to <strong>Q2 - F16 GGUF</strong> formats.",
        "Applied <strong>LoRa (Keras)</strong> for fine-tuning the model to facilitate cross-application collaboration tasks.",
        "Developed an application with <strong>Gradios</strong> to host the model, enabling direct interaction with the updated models and facilitating real-time feedback. Resulted in a 33% improvement in content generation quality and a 1.5% decrease in memory usage. The quantized models acquired 1521 overall downloads.",
        "Developed a <strong>FastAPI platform</strong> using Python to facilitate integration between third-party LLMs and application APIs.",
        "Engineered the mobile version of the platform using Java in <strong>Android Studio</strong>, developing essential utility class modules to enable a function-driven language model supporting on-device actions.",
      ],
    },
  ],
  publication: [
    {
      id: 1,
      published: "Education Psychology and Public Media",
      year: 2023,
      month: 12,
      title:
        "Thumb up or head down? The impact of upvote on social media self-efficacy",
      authors: "Zhiyao Shu",
      url: "https://www.semanticscholar.org/paper/Thumb-up-or-Head-down-The-Impact-of-Upvote-on-Media-Shu/f66ec116f3cdb29722a853bea5e6d8c93ec6009d",
      pdf: "ZhiyaoShu - Thumb up or head down The impact of upvote on social media self-efficacy.pdf",
      abstract: "",
    },
    {
      id: 2,
      conference: "CIKM 2024",
      published: "arXiv preprint arXiv:2407.03568",
      year: 2024,
      title:
        "When LLM Meets Hypergraph: A Sociological Analysis on Personality via Online Social Networks",
      authors: "Zhiyao Shu, Xiangguo Sun, Hong Cheng",
      month: 5,
      url: "https://arxiv.org/abs/2407.03568",
      abstract: (
        <>
          Individual personalities significantly influence our perceptions,
          decisions, and social interactions, which is particularly crucial for
          gaining insights into human behavior patterns in online social network
          analysis.
          <br />
          Many psychological studies have observed that personalities are
          strongly reflected in their social behaviors and social environments.
          <br />
          <br />
          Unfortunately, psychological traits like one's personality are
          high-level and hidden in the innermost corner of data, which is
          intractable to be uncovered by traditional data mining approaches.
          <br />
          The data quality of online social networks is far from sufficient to
          support such profound psychological analysis, because user behavior
          records and their attributes are usually very fragmented, missing lots
          of key information to understand a person in depth.
          <br />
          In addition, the social environments in online networks are very
          complicated, making the interaction patterns between users and their
          environments underexplored.
          <br />
          <br />
          In light of these problems, this paper proposes a sociological
          analysis framework for one's personality in an environment-based view
          instead of individual-level data mining.
          <br />
          Specifically, to comprehensively understand an individual's behavior
          from low-quality records, we leverage the powerful associative ability
          of LLMs by designing an effective prompt.
          <br />
          In this way, LLMs can integrate various scattered information with
          their external knowledge to generate higher-quality profiles, which
          can significantly improve the personality analysis performance.
          <br />
          <br />
          To explore the interactive mechanism behind the users and their online
          environments, we design an effective hypergraph neural network where
          the hypergraph nodes are users and the hyperedges in the hypergraph
          are social environments.
          <br />
          We offer a useful dataset with user profile data, personality traits,
          and several detected environments from the real-world social platform.
          <br />
          To the best of our knowledge, this is the first network-based dataset
          containing both hypergraph structure and social information, which
          could push forward future research in this area further.
          <br />
          <br />
          By employing the framework on this dataset, we can effectively capture
          the nuances of individual personalities and their online behaviors,
          leading to a deeper understanding of human interactions in the digital
          world.
        </>
      ),
    },
    {
      id: 3,
      published: "arXiv",
      year: 2025,
      title:
        "MindCoder: An Ideation Tool for Inductive Qualitative Analysis with Large Language Models",
      authors: "Jie Gao, Zhiyao Shu, ShunYi Yeo",
      month: 1,
      url: "https://arxiv.org/pdf/2501.00775",
      abstract: `Traditional qualitative analysis requires significant effort and collaboration to achieve consensus through formal coding processes, including open coding, discussions, and codebook merging. However, in scenarios where such rigorous and time-intensive methods are unnecessary-such as summarizing meetings or personal ideation-quick yet structual insights are more practical. To address this need, we proposed MindCoder, a tool inspired by the "Codes-to-theory" model and developed through an iterative design process to support flexible and structural inductive qualitative analysis. With OpenAI's GPT-4o model, MindCoder supports data preprocessing, automatic open coding, automatic axial coding, and automatic concept development, ultimately presenting a report to support insights presentation. An evaluation with 12 participants highlights its effectiveness in enabling flexible yet structured analysis and its advantages over ChatGPT and Atlas.ti Web AI coding function.`,
    },
    // {
    //   id: 4,
    //   published: "",
    //   year: 2025,
    //   month: 1,
    //   title: "A Taxonomy of Human-LLM Interaction Modes",
    //   authors: "Jie Gao, Zhiyao Shu",
    //   url: "",
    //   abstract: "",
    // },
  ],
};

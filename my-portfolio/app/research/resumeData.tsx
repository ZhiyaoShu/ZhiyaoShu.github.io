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
      description: [],
    },
    {
      id: 2,
      company: "Nexa AI",
      title: "Software Engineer Intern",
      location: "San Jose, CA",
      period: "Jan - Jun 2024",
      description: [
        "Developed a series of RESTful API endpoints using Java and Spring Boot to process incoming requests from the frontend.",
        "Implemented Controller, DTOs and Model layers with Spring MVC to manage HTTP requests and responses, optimizing data transfer between layers and improving performance.",
        "Constructed aggregation pipelines using Spring MongoDB and MongoTemplate to perform querying and manipulation in MongoDB databases.",
        "Implemented JWT Validation handling for session management and security. Utilized AWS Simple Email Service (SES) for automating email operations, enhancing user retention by 40%.",
        "Developed interactive features using React, and Context API for state management. Utilized components, hooks, and libraries to create responsive and scalable web interfaces. Collaborated with designers to improve UI with Ant Design and Tailwind CSS, and integrated Tableau dashboard for data visualization.",
        "Led the website SEO enhancement solutions, and applied effective image scaling and Google Cloud CDN optimization. Achieved a 30% reduction in search and loading time spent.",
        "Spearheaded the development of language model SDK with Python to host the language model online and locally.",
        "Utilized llama.cpp to quantize language models on Ollama (Long Chain) to convert models to Q2 - F16 GGUF formats.",
        "Applied LoRa (Keras) for fine-tuning the model to facilitate cross-application collaboration tasks.",
        "Developed an application with Gradios to host the model, enabling direct interaction with the updated models and facilitating real-time feedback. Resulted in a 33% improvement in content generation quality and a 1.5% decrease in memory usage. The quantized models acquired 1521 overall downloads.",
        "Developed a FastAPI platform using Python to facilitate integration between third-party LLMs and application APIs.",
        "Configured HTTP middleware for API security, managing request authorization headers to ensure data security.",
        "Engineered the mobile version of the platform using Java in Android Studio, developing essential utility class modules to enable a function-driven language model supporting on-device actions.",
        "Produced demos to effectively communicate the platform’s features and business value to stakeholders.",
      ],
    },
  ],
  publication: [
    {
      id: 1,
      published: "Education Psychology and Public Media",
      title:
        "Thumb up or head down? The impact of upvote on social media self-efficacy",
      authors: "Zhiyao Shu",
      time: "Jan/2024",
      pdf: "ZhiyaoShu - Thumb up or head down The impact of upvote on social media self-efficacy.pdf",
      abstract: "",
    },
    {
      id: 2,
      published: "CIKM 2024",
      year: "2024",
      title:
        "When LLM Meets Hypergraph: A Sociological Analysis on Personality via Online Social Networks",
      authors: "Zhiyao Shu, Xiangguo Sun, Hong Cheng",
      month: "05",
      pdf: "ZhiyaoShu - When LLM Meets Hypergraph A Sociological Analysis on Personality via Online Social Networks.pdf",
      abstract: `Individual personalities significantly influence our perceptions, decisions, and social interactions, which is particularly crucial for gaining insights into human behavior patterns in online social network analysis. Many psychological studies have observed that personalities are strongly reflected in their social behaviors and social environments. Unfortunately, psychological traits like one's personality are high-level and hidden in the innermost corner of data, which is intractable to be uncovered by traditional data mining approaches; The data quality of online social networks is far from sufficient to support such profound psychological analysis, because user behavior records and their attributes are usually very fragmented, missing lots of key information to understand a person in depth; In addition, the social environments in online networks are very complicated, making the interaction patterns between users and their environments underexplored. 
      In light of these problems, this paper proposes a sociological analysis framework for one's personality in an environment-based view instead of individual-level data mining. Specifically, to comprehensively understand an individual's behavior from low-quality records, we leverage the powerful associative ability of LLMs by designing an effective prompt. In this way, LLMs can integrate various scattered information with their external knowledge to generate higher-quality profiles, which can significantly improve the personality analysis performance. To explore the interactive mechanism behind the users and their online environments, we design an effective hypergraph neural network where the hypergraph nodes are users and the hyperedges in the hypergraph are social environments. We offer a useful dataset with user profile data, personality traits, and several detected environments from the real-world social platform. To the best of our knowledge, this is the first network-based dataset containing both hypergraph structure and social information, which could push forward future research in this area further. By employing the framework on this dataset, we can effectively capture the nuances of individual personalities and their online behaviors, leading to a deeper understanding of human interactions in the digital world.
    `,
    },
    {
      id: 3,
      published: "CHI 2024",
      year: "2024",
      title:
        "MindCoder: An Ideation Tool for Inductive Qualitative Analysis with Large Language Models",
      authors: "Jie Gao, ShunYi Yeo, Zhiyao Shu",
      month: "09",
      pdf: "",
      url: "",
      abstract: "",
    },
    {
      id: 4,
      published: "",
      year: "2024",
      title: "HAI texmony",
      authors: "Jie Gao, Zhiyao Shu",
      time: "10",
      pdf: "",
      url: "",
      abstract: "",
    },
  ],
};

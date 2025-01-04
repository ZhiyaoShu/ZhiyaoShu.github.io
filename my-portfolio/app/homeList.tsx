type NewsItem = {
  id: number;
  date: string;
  text: React.ReactNode;
};

export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "2024-05-20",
    text: (
      <>
        Accepted by CIKM 2024! Check out our new paper{" "}
        <a
          href="https://dl.acm.org/doi/abs/10.1145/3627673.3679646"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-gray-600"
        >
          here
        </a>
      </>
    ),
  },
  {
    id: 2,
    date: "2024-09-12",
    text: (
      <>
        Released! MindCoder for inductive qualitative data analysis! Try our
        tool at{" "}
        <a
          href="https://mindcoder.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold text-gray-600"
        >
          mindcoder.ai
        </a>
      </>
    ),
  },
  {
    id: 3,
    date: "2024-10-22",
    text: `Very glad to make presentation and connect with awesome researchers at CIKM 2024!`,
  },
];

export const projects = [
  {
    id: 1,
    name: "Facial Emotion Recognition",
    date: "10/15/2023",
    url: "https://gist.github.com/ZhiyaoShu/c991e1e432656cec00f5bfce5b8ac5ea",
    image: ["/data/images/emotions.gif"],
    tags: ["image recognition"],
    layout: "horizontal",
    isdirect: true,
    description: (
      <>
        Visual expressions, particularly facial changes, serve as a prominent
        mode of self-expression alongside linguistic methods. Humans can
        effortlessly recognize facial images; however, machines face challenges
        in classifying a range of emotions across diverse age groups, genders,
        ethnicities, and other demographic factors . <br />
        The objective of this project is to generate a comprehensive
        understanding of facial emotion image processing by constructing and
        evaluating state-of-the-art convolutional models, as acknowledged by
        Bisogni et al (2024).
        {/* <d-cite key='bisogni2023emotion'></d-cite>. */}
        This endeavor aims to measure the accuracy and performance of these
        models on a consistent dataset, thereby providing a robust comparative
        analysis. <br />
        Furthermore, this project employs three prominent transfer learning
        models — VGG16, ResNet, and EfficientNet—leveraged their prevalence in
        existing research landscapes. Notably, the EfficientNet model has been
        utilized for video facial behavior analysis by Savchenko(2022)
        {/* <d-cite key='savchenko2022video'></d-cite>  */}
        and in real-time data analysis in the studies conducted by
        Castellano(2021).
        {/* <d-cite key='castellano2021real'></d-cite>.  */}
        The outcomes of this project endeavor to serve as a validation
        checkpoint for the conclusions delineated in these preceding studies.
      </>
    ),
  },
  {
    id: 2,
    name: "When LLM Meets Hypergraph: A Sociological Analysis on Personality via Online Social Networks",
    date: "5/20/2024",
    tags: [
      "data mining",
      "LLM",
      "hypergraph",
      "deep learning",
      "social network",
    ],
    isdirect: false,
    url: "https://github.com/ZhiyaoShu/LLM-HGNN-MBTI",
    image: ["/data/images/llm&hgn.jpg", "/data/images/llm_framework.jpg"],
    layout: "vertical",
    description:
      "Individual personality traits largely determine our cognitive processes, decision-making, and social interactions, and this influence is especially pronounced in the information society. Today, interactions between people are no longer limited to physical reality, with an increasing number of interactions taking place in virtual spaces. Behavioral patterns within online social networks have become key clues for understanding individual personality traits. However, despite extensive psychological research indicating that an individual's social behavior and the social environment they inhabit deeply reflect their inherent personality traits, traditional data mining methods still have limitations in revealing these higher-level, latent psychological characteristics. In particular, data from online social networks often exhibit fragmentation, missing information, and high levels of noise, making in-depth analysis of individuals challenging. At the same time, the complexity of the social network environment further exacerbates the difficulty of analyzing interaction patterns between users and their surroundings.",
  },
  {
    id: 3,
    name: "Using Large Language Model to Support Flexible and Structural Inductive Qualitative Analysis",
    isdirect: true,
    url: "https://arxiv.org/pdf/2501.00775",
    date: "1/2/2025",
    layout: "horizontal",
    tags: ["full-stack", "LLM", "qualitative data analysis", "HAI"],
    image: ["/mindcoderIcon.svg", "/data/images/mindcoder.svg"],
  },

  // {
  //   title: "Nexa AI Search Tools",
  //   short_description: "Find the best AI tools as demands",
  //   mediaUrl: [nexa1.src, nexavideo, nexa2.src, nexa3.src],
  //   tags: ["Full-stack", "SEO", "Data Analysis"],
  //   time: "1/28/2024",
  //   description: `Nexa AI Search Tools is a web application that provides a comprehensive list of AI tools and resources. The application is designed to assist users in finding the most suitable AI tools based on their specific requirements. The application features a user-friendly interface that allows users to easily search for tools through the feature chatbot, or by category, keyword, and other criteria. The application also provides detailed information about each tool, including its features, pricing, and user reviews. Users can also rate and review tools, helping other users make informed decisions. Nexa AI Search Tools is a valuable resource for anyone looking to explore the world of AI tools and find the best tools for their needs.

  //     Main responsibilities:
  //     - Developed the front-end UI of the application using React.js, HTML, and CSS
  //     - Developed RESTful API endpoints using Java and Spring Boot to process incoming requests
  //     - Implemented Controller, DTOs and Model layers with Spring MVC to manage HTTP requests and responses
  //     - Constructed aggregation pipelines using Spring MongoDB and MongoTemplate to perform querying and manipulation in MongoDB databases.
  //     `,
  //   project_url: "",
  // },
  // {
  //   title: "Facial Emotion Recognition",
  //   short_description:
  //     "A comparison series of several machine learning architectures",
  //   tags: ["machine learning", "research"],
  //   mediaUrl: [],
  //   time: "10/15/2023",
  //   description:
  //     "Visual expressions, particularly facial changes, serve as a prominent mode of self-expression alongside linguistic methods. Humans can effortlessly recognize facial images; however, machines face challenges in classifying a range of emotions across diverse age groups, genders, ethnicities, and other demographic factors <d-cite key='khan2022facial'></d-cite>. <br><br> The objective of this project is to generate a comprehensive understanding of facial emotion image processing by constructing and evaluating state-of-the-art convolutional models, as acknowledged by Bisogni et al <d-cite key='bisogni2023emotion'></d-cite>. This endeavor aims to measure the accuracy and performance of these models on a consistent dataset, thereby providing a robust comparative analysis. <br><br> Furthermore, this project employs three prominent transfer learning models — VGG16, ResNet, and EfficientNet—leveraged due to their prevalence in existing research landscapes. Notably, the EfficientNet model has been utilized for video facial behavior analysis by Savchenko <d-cite key='savchenko2022video'></d-cite> and in real-time data analysis in the studies conducted by Castellano<d-cite key='castellano2021real'></d-cite>. The outcomes of this project endeavor to serve as a validation checkpoint for the conclusions delineated in these preceding studies.",
  // },
];

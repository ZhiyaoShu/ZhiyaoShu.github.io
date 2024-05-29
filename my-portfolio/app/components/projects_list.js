import nexa1 from "../../public/data/images/Nexa/nexa1.png"
import nexa2 from "../../public/data/images/Nexa/nexa2.png"
import nexa3 from "../../public/data/images/Nexa/nexa3.png"
import nexavideo from "../../public/data/videos/nexa.mp4"

const Projects_list = {
  Projects: [
    {
      title: "Octoverse",
      project_url: "https://www.nexa4ai.com/octoverse",
      time: "5/20/2024",
      tags: ["Full-stack", "LLM", "API"],
    },
    {
      title: "Mendely Academic Data Assistant",
      time: "6/20/2024",
      tags: ["Function-calling", "Auth"],
      short_description: "Personlized academic assistant for Mendely researchers",
      description:`Mendely Academic Data Assistant is a web application that provides a personlized `
    },
    {
      title: "Nexa AI Search Tools",
      short_description: "Find the best AI tools as demands",
      mediaUrl: [nexa1.src, nexavideo, nexa2.src, nexa3.src],
      tags: ["Full-stack", "SEO", "Data Analysis"],
      time: "1/28/2024",
      description: `Nexa AI Search Tools is a web application that provides a comprehensive list of AI tools and resources. The application is designed to assist users in finding the most suitable AI tools based on their specific requirements. The application features a user-friendly interface that allows users to easily search for tools through the feature chatbot, or by category, keyword, and other criteria. The application also provides detailed information about each tool, including its features, pricing, and user reviews. Users can also rate and review tools, helping other users make informed decisions. Nexa AI Search Tools is a valuable resource for anyone looking to explore the world of AI tools and find the best tools for their needs.
      
      Main responsibilities:
      - Developed the front-end UI of the application using React.js, HTML, and CSS
      - Developed RESTful API endpoints using Java and Spring Boot to process incoming requests
      - Implemented Controller, DTOs and Model layers with Spring MVC to manage HTTP requests and responses
      - Constructed aggregation pipelines using Spring MongoDB and MongoTemplate to perform querying and manipulation in MongoDB databases.
      `,
      project_url: "",
    },
    {
      title: "Facial Emotion Recognition", short_description: "A comparison series of several machine learning architectures",
      tags: ["machine learning", "research"],
      mediaUrl: [],
      time: "10/15/2023",
      description: "Visual expressions, particularly facial changes, serve as a prominent mode of self-expression alongside linguistic methods. Humans can effortlessly recognize facial images; however, machines face challenges in classifying a range of emotions across diverse age groups, genders, ethnicities, and other demographic factors <d-cite key='khan2022facial'></d-cite>. <br><br> The objective of this project is to generate a comprehensive understanding of facial emotion image processing by constructing and evaluating state-of-the-art convolutional models, as acknowledged by Bisogni et al <d-cite key='bisogni2023emotion'></d-cite>. This endeavor aims to measure the accuracy and performance of these models on a consistent dataset, thereby providing a robust comparative analysis. <br><br> Furthermore, this project employs three prominent transfer learning models — VGG16, ResNet, and EfficientNet—leveraged due to their prevalence in existing research landscapes. Notably, the EfficientNet model has been utilized for video facial behavior analysis by Savchenko <d-cite key='savchenko2022video'></d-cite> and in real-time data analysis in the studies conducted by Castellano<d-cite key='castellano2021real'></d-cite>. The outcomes of this project endeavor to serve as a validation checkpoint for the conclusions delineated in these preceding studies."
    }
  ]
};

export default Projects_list
import React, { useState } from "react";
import { CohereClient, CohereError, CohereTimeoutError } from "cohere-ai";

// const cohere = new CohereClient({
//     token: process.env.REACT_APP_COHERE_API_KEY,
// });

// (async () => {
//     const chatStream = await cohere.chatStream({
//       message: 'Summarize the recent trends based on my recent read papers',
//       // perform web search before answering the question. You can also use your own custom connector.
//       connectors: [{ id: 'web-search' }],
//     });
    
//     for await (const message of chatStream) {
//       if (message.eventType === 'text-generation') {
//         console.log(message);
//       }
//     }
//   })();
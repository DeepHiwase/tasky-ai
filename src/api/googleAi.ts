/**
 * @copyright 2025 deephiwase
 * @license Apache-2.0
 * @description Google AI API
 */

// Node Modules
import { Type } from "@google/genai";
// Custom Modules
import models from "@/lib/googleAI";

const generateProjectTasks = async (prompt: string) => {
  try {
    const response = await models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate and return a list of tasks based on the provided prompt.
        
          Prompt: ${prompt}

          Requirements:
          1. Ensure tasks align with the provided prompt.
          2. Set the 'due_date' relative to today's date: ${new Date()}.
          3. Return ans array of tasks matching the schema.
        `,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: {
                type: Type.STRING,
                description: "Description of the task",
              },
              due_date: {
                type: Type.STRING,
                format: "date-time",
                description:
                  "due date in 'YYYY-MM-DD' format, due date of the task, or null if no specific due date is provided",
                nullable: true,
              },
            },
            propertyOrdering: ["content", "due_date"],
          },
        },
      },
    });

    return response.text;
  } catch (err) {
    console.log("Error generating tasks: ", err);
  }
};

export { generateProjectTasks };

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import type { ActionFunction } from "@remix-run/node";
import { z } from "zod";

const recipesSchema = z.object({
  recipes: z
    .array(
      z.object({
        cookName: z.string(),
        cookingTime: z.string(),
        ingredients: z.array(
          z.object({
            name: z.string(),
            amount: z.string(),
          })
        ),
        steps: z.array(z.string()),
      })
    )
    .max(3),
});

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const ingredientsJson = formData.get("ingredients") as string;
    const cookingTime = formData.get("cookingTime") as string;

    const ingredients = JSON.parse(ingredientsJson);

    const result = await generateObject({
      model: openai("gpt-4.1-mini"),
      schema: recipesSchema,
      maxTokens: 1024,
      system: `You are a professional chef. You return max 3 recipes in JSON format that match the schema. Do not include any extra text.

            `,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Based on the ingredients below give me 3 or less recipes. 
                It should be cooked within ${cookingTime} using these ingredients.
                
                ${ingredients.join("\n")}`,
            },
          ],
        },
      ],
    });
    return Response.json({
      success: true,
      recipes: result.object.recipes,
    });
  } catch (error) {
    console.error("Failed to generate recipe:", error);
    return Response.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    );
  }
};

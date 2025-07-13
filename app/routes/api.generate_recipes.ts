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
    .max(2),
});

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const ingredientsJson = formData.get("ingredients") as string;
    const ingredients = JSON.parse(ingredientsJson);
    const selectedCuisine = formData.get("selectedCuisine") as string;

    const result = await generateObject({
      model: openai("gpt-4.1-mini"),
      schema: recipesSchema,
      maxTokens: 1024,
      system: `You are a professional ${selectedCuisine} chef. You return a maximum of 2 ${selectedCuisine} recipes written in English, in JSON format matching the schema. Do not include any extra text.`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Based on the ingredients below give me 2 or less ${selectedCuisine} recipes.
                Remember the recipes have to be ${selectedCuisine}. you should not include any other cuisines.
                It should be cooked using these ingredients.
                
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

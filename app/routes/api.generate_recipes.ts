import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from 'zod';

const recipesSchema = z.object({
    recipes: z.array(z.object({
        cookName: z.string(),
        cookingTime: z.string(),
        ingredients: z.array(
            z.object({
                name: z.string(),
                amount: z.string(),
            }),
        ),
        steps: z.array(z.string()),
    })).max(5)
});

export const action: ActionFunction = async ({ request }) => {
    try {
        const formData = await request.formData();
        const ingredientsJson = formData.get("ingredients") as string;
        const cookingTime = formData.get("cookingTime") as string;

        const ingredients = JSON.parse(ingredientsJson);

        const result = await generateObject({
            model: openai('gpt-4-turbo'),
            schema: recipesSchema,
            maxTokens: 1024,
            system: 'You are a professional chef. You return max 5 recipes in JSON format that match the schema. Do not include any extra text.',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `Here are my ingredients: ${ingredients.join(", ")}. Give me recipes I can cook using them. Return 1 to 5 recipes that can be cooked within ${cookingTime} minutes using these ingredients.`,
                        }
                    ]
                }
            ]
        });
        return json({
            success: true,
            recipes: result.object.recipes
        });
    } catch (error) {
        console.error("Failed to generate recipe:", error);
        return json({ error: "Failed to generate recipe" }, { status: 500 });
    }
}

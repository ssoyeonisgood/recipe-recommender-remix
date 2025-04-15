import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import fs from 'fs';

const ingredientSchema = z.object({
    ingredients: z.array(
        z.object({
            name: z.string(),
        }),
    )
})
export const main = async () => {
    const result = await generateObject({
        model: openai('gpt-4-turbo'),
        schema: ingredientSchema,
        system: 'You are a professional chef. Analyze the given image and extract a list of food ingredients.',
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: 'name all food ingredients from the given image.' },
                    { type: 'image', image: fs.readFileSync('./public/food2.jpg') }
                ],
            },
        ],
    });

    return result;
}


const obj = await main();
console.log(JSON.stringify(obj.object.ingredients, null, 2));
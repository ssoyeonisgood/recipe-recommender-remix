import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { ActionFunction } from "@remix-run/node";
import { Readable } from "stream";
import { z } from 'zod';

const ingredientSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string(),
    }),
  )
})

const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
};

export const action: ActionFunction = async ({ request }) => {
  try {
    console.log("Received request to analyze image");
    const formData = await request.formData();
    const file = formData.get("file");

    console.log("Form data received:", file);

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const fileBuffer = await streamToBuffer(file.stream() as unknown as Readable);

    const result = await generateObject({
      model: openai('gpt-4.1-mini'),
      schema: ingredientSchema,
      system: 'You are a professional chef. Analyze the given image and extract a list of food ingredients.',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'name all food ingredients from the given image.' },
            { type: 'image', image: fileBuffer }
          ],
        },
      ],
    });
    return Response.json({
      success: true,
      ingredientLabels: result.object.ingredients
    });
  } catch (error) {
    console.error("fail to analyze ingredients:", error instanceof Error ? error.stack : error);
    return Response.json({ error: "Image analysis failed" }, { status: 500 });
  }
}

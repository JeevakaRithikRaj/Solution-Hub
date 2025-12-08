'use server';

/**
 * @fileOverview A flow that suggests technology-driven solutions to a user-submitted problem.
 *
 * - generateTechnologySolutions - A function that handles the generation of technology solutions.
 * - GenerateTechnologySolutionsInput - The input type for the generateTechnologySolutions function.
 * - GenerateTechnologySolutionsOutput - The return type for the generateTechnologySolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTechnologySolutionsInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('A description of the problem the user is facing.'),
});

export type GenerateTechnologySolutionsInput = z.infer<
  typeof GenerateTechnologySolutionsInputSchema
>;

const GenerateTechnologySolutionsOutputSchema = z.object({
  suggestedSolutions: z
    .string()
    .describe('Technology-driven solutions to the described problem.'),
});

export type GenerateTechnologySolutionsOutput = z.infer<
  typeof GenerateTechnologySolutionsOutputSchema
>;

export async function generateTechnologySolutions(
  input: GenerateTechnologySolutionsInput
): Promise<GenerateTechnologySolutionsOutput> {
  return generateTechnologySolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTechnologySolutionsPrompt',
  input: {schema: GenerateTechnologySolutionsInputSchema},
  output: {schema: GenerateTechnologySolutionsOutputSchema},
  prompt: `You are an AI assistant that suggests technology-driven solutions to real-world problems.

  Problem Description: {{{problemDescription}}}

  Based on the problem description, suggest technology-driven solutions that can address the problem.
  Your solutions should be clear, concise, and actionable.
  Provide a variety of solutions leveraging technologies such as automation, sensors, cloud storage, and data analytics, if applicable.
  Your response should provide the suggested solutions in a well-formatted string.
  `,
});

const generateTechnologySolutionsFlow = ai.defineFlow(
  {
    name: 'generateTechnologySolutionsFlow',
    inputSchema: GenerateTechnologySolutionsInputSchema,
    outputSchema: GenerateTechnologySolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

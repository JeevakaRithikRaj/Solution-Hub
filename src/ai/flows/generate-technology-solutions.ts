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

const SolutionSchema = z.object({
  title: z.string().describe('The title of the technology solution.'),
  description: z.string().describe('A detailed description of the solution.'),
  keyFeatures: z
    .array(z.string())
    .describe('A list of key features of the solution.'),
});

const GenerateTechnologySolutionsOutputSchema = z.object({
  suggestedSolutions: z
    .array(SolutionSchema)
    .describe('A list of technology-driven solutions to the described problem.'),
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

  Based on the problem description, suggest a list of technology-driven solutions that can address the problem.
  For each solution, provide a title, a detailed description, and a list of key features.
  Your solutions should be clear, concise, and actionable.
  Provide a variety of solutions leveraging technologies such as automation, sensors, cloud storage, and data analytics, if applicable.
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

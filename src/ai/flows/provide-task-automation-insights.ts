'use server';
/**
 * @fileOverview An AI agent that provides insights on how suggested solutions can automate user tasks.
 *
 * - provideTaskAutomationInsights - A function that handles the task automation insights generation process.
 * - ProvideTaskAutomationInsightsInput - The input type for the provideTaskAutomationInsights function.
 * - ProvideTaskAutomationInsightsOutput - The return type for the provideTaskAutomationInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideTaskAutomationInsightsInputSchema = z.object({
  suggestedSolution: z
    .string()
    .describe('The suggested solution for a user-submitted problem.'),
});
export type ProvideTaskAutomationInsightsInput = z.infer<
  typeof ProvideTaskAutomationInsightsInputSchema
>;

const ProvideTaskAutomationInsightsOutputSchema = z.object({
  automationInsights: z
    .string()
    .describe(
      'Insights on how the suggested solution can automate user tasks.'
    ),
});
export type ProvideTaskAutomationInsightsOutput = z.infer<
  typeof ProvideTaskAutomationInsightsOutputSchema
>;

export async function provideTaskAutomationInsights(
  input: ProvideTaskAutomationInsightsInput
): Promise<ProvideTaskAutomationInsightsOutput> {
  return provideTaskAutomationInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideTaskAutomationInsightsPrompt',
  input: {schema: ProvideTaskAutomationInsightsInputSchema},
  output: {schema: ProvideTaskAutomationInsightsOutputSchema},
  prompt: `You are an AI assistant that provides insights on how a suggested solution can automate user tasks.

  Suggested Solution: {{{suggestedSolution}}}

  Provide detailed insights on how this solution can automate the user's tasks, highlighting the potential impact and benefits of automation.
  Focus on practical steps and tangible outcomes.
  Return the automation insights in a clear and concise manner.
  `,
});

const provideTaskAutomationInsightsFlow = ai.defineFlow(
  {
    name: 'provideTaskAutomationInsightsFlow',
    inputSchema: ProvideTaskAutomationInsightsInputSchema,
    outputSchema: ProvideTaskAutomationInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

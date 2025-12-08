// @ts-nocheck
'use server';

import { z } from 'zod';
import { generateTechnologySolutions } from '@/ai/flows/generate-technology-solutions';
import { provideTaskAutomationInsights } from '@/ai/flows/provide-task-automation-insights';

const problemSchema = z.object({
  problem: z.string().min(20, 'Please describe your problem in at least 20 characters.'),
});

const solutionSchema = z.object({
    solution: z.string().min(1, 'Solution text is required.'),
});

export async function getSolutions(prevState: any, formData: FormData) {
  try {
    const validatedFields = problemSchema.safeParse({
      problem: formData.get('problem'),
    });

    if (!validatedFields.success) {
      return {
        message: 'Invalid input.',
        error: validatedFields.error.flatten().fieldErrors.problem?.[0],
        solution: null,
      };
    }

    const { problemDescription } = { problemDescription: validatedFields.data.problem };
    const result = await generateTechnologySolutions({ problemDescription });
    
    return {
      message: 'Success',
      error: null,
      solution: result.suggestedSolutions,
    };
  } catch (e) {
    return {
      message: 'An error occurred.',
      error: 'Failed to generate solutions. Please try again.',
      solution: null,
    };
  }
}

export async function getAutomationInsights(prevState: any, formData: FormData) {
    try {
        const validatedFields = solutionSchema.safeParse({
            solution: formData.get('solution'),
        });

        if (!validatedFields.success) {
            return {
                message: 'Invalid input for insights.',
                error: 'Solution text is missing.',
                insights: null,
            };
        }

        const { suggestedSolution } = { suggestedSolution: validatedFields.data.solution };
        const result = await provideTaskAutomationInsights({ suggestedSolution });

        return {
            message: 'Success',
            error: null,
            insights: result.automationInsights,
        };
    } catch (e) {
        return {
            message: 'An error occurred.',
            error: 'Failed to generate insights. Please try again.',
            insights: null,
        };
    }
}

'use server';

/**
 * @fileOverview Generates trip spark suggestions for new travel groups based on member profiles.
 *
 * - generateTripSparkSuggestions - A function that generates ice-breaker messages and activity ideas.
 * - TripSparkSuggestionsInput - The input type for the generateTripSparkSuggestions function.
 * - TripSparkSuggestionsOutput - The return type for the generateTripSparkSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TripSparkSuggestionsInputSchema = z.object({
  memberProfiles: z.array(
    z.object({
      interests: z.string().describe('The interests of the group member.'),
      travelHistory: z.string().describe('The travel history of the group member.'),
      preferences: z.string().describe('The preferences of the group member.'),
    })
  ).describe('An array of group member profiles.'),
});
export type TripSparkSuggestionsInput = z.infer<typeof TripSparkSuggestionsInputSchema>;

const TripSparkSuggestionsOutputSchema = z.object({
  iceBreakerMessages: z.array(z.string()).describe('A list of ice-breaker messages.'),
  activitySuggestions: z.array(z.string()).describe('A list of initial activity suggestions.'),
});
export type TripSparkSuggestionsOutput = z.infer<typeof TripSparkSuggestionsOutputSchema>;

export async function generateTripSparkSuggestions(input: TripSparkSuggestionsInput): Promise<TripSparkSuggestionsOutput> {
  return tripSparkSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tripSparkSuggestionsPrompt',
  input: {schema: TripSparkSuggestionsInputSchema},
  output: {schema: TripSparkSuggestionsOutputSchema},
  prompt: `You are a trip planning assistant that helps new travel groups start planning their trip quickly and easily. Based on the group members' profiles, suggest ice-breaker messages and initial activity ideas.

Here are the group member profiles:
{{#each memberProfiles}}
  Member {{@index}}:
  - Interests: {{this.interests}}
  - Travel History: {{this.travelHistory}}
  - Preferences: {{this.preferences}}
{{/each}}

Generate 3 ice-breaker messages and 3 activity suggestions.

Output in JSON format:
{
  "iceBreakerMessages": ["message1", "message2", "message3"],
  "activitySuggestions": ["activity1", "activity2", "activity3"]
}
`,
});

const tripSparkSuggestionsFlow = ai.defineFlow(
  {
    name: 'tripSparkSuggestionsFlow',
    inputSchema: TripSparkSuggestionsInputSchema,
    outputSchema: TripSparkSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

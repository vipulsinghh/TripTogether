"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, MessageSquare, ListChecks } from 'lucide-react';
import { generateTripSparkSuggestions, type TripSparkSuggestionsInput, type TripSparkSuggestionsOutput } from '@/ai/flows/trip-spark-suggestions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

interface AiSparkDisplayProps {
  memberProfiles: TripSparkSuggestionsInput['memberProfiles'];
}

export default function AiSparkDisplay({ memberProfiles }: AiSparkDisplayProps) {
  const [suggestions, setSuggestions] = useState<TripSparkSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await generateTripSparkSuggestions({ memberProfiles });
      setSuggestions(result);
      toast({
        title: "AI Suggestions Generated!",
        description: "Check out the icebreakers and activity ideas.",
      });
    } catch (err) {
      console.error("Error generating AI suggestions:", err);
      setError("Failed to generate suggestions. Please try again.");
       toast({
        title: "Error",
        description: "Failed to generate AI suggestions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleGetSuggestions} disabled={isLoading} className="w-full bg-gradient-to-r from-accent via-orange-500 to-red-500 text-accent-foreground">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Get AI Trip Spark Suggestions
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && (
        <div className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg"><MessageSquare className="mr-2 h-5 w-5 text-primary" />Icebreaker Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {suggestions.iceBreakerMessages.map((msg, index) => (
                  <li key={`icebreaker-${index}`}>{msg}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
              <CardTitle className="flex items-center text-lg"><ListChecks className="mr-2 h-5 w-5 text-primary" />Activity Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {suggestions.activitySuggestions.map((activity, index) => (
                  <li key={`activity-${index}`}>{activity}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

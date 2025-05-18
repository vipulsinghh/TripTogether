import ChatInterface from '@/components/core/chat-interface';
import AiSparkDisplay from '@/components/core/ai-spark-display';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock group data for the chat page
const mockGroupDetails = {
  id: 'group123',
  name: 'Bali Adventure Seekers',
  members: [
    { id: 'user1', name: 'Alice', interests: 'Surfing, Yoga', travelHistory: 'Thailand, Costa Rica', preferences: 'Budget, Adventure' },
    { id: 'user2', name: 'Bob', interests: 'Hiking, Photography', travelHistory: 'Nepal, Canada', preferences: 'Mountains, Culture' },
    { id: 'user3', name: 'Charlie', interests: 'Food, Scuba Diving', travelHistory: 'Mexico, Australia', preferences: 'Beach, Luxury' },
  ],
};

export default function GroupChatPage({ params }: { params: { groupId: string } }) {
  // In a real app, fetch group details based on params.groupId
  const groupDetails = mockGroupDetails; 

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)]">
      <div className="lg:w-2/3 h-full">
        <ChatInterface groupId={params.groupId} groupName={groupDetails.name} />
      </div>
      <aside className="lg:w-1/3 h-full overflow-y-auto">
        <Card className="shadow-lg h-full">
          <CardHeader>
            <CardTitle className="text-xl text-gradient">Trip Spark AI</CardTitle>
            <CardDescription>Get AI-powered suggestions for your group!</CardDescription>
          </CardHeader>
          <CardContent>
            <AiSparkDisplay memberProfiles={groupDetails.members} />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

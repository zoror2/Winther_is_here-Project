import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import ProfileSummary from '@/components/ProfileSummary';
import ProgressChart from '@/components/ProgressChart';
import SnowEffect from '@/components/SnowEffect';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Mock data - will be replaced with Firebase
  const userData = {
    '1': { 
      name: 'Winter Warrior', 
      points: 247,
      tasks: [
        { id: '1', title: 'Complete morning workout', date: new Date(), completed: true },
        { id: '2', title: 'Read 30 pages', date: new Date(), completed: true },
        { id: '3', title: 'Meditate for 10 minutes', date: new Date(Date.now() - 86400000), completed: true },
      ]
    },
    '2': { 
      name: 'Frost Champion', 
      points: 198,
      tasks: [
        { id: '4', title: 'Study for 2 hours', date: new Date(), completed: true },
        { id: '5', title: 'Go for a run', date: new Date(), completed: true },
      ]
    },
    '3': { 
      name: 'Ice Knight', 
      points: 156,
      tasks: [
        { id: '6', title: 'Complete project milestone', date: new Date(), completed: true },
      ]
    },
    '4': { 
      name: 'Snow Guardian', 
      points: 134,
      tasks: [
        { id: '7', title: 'Practice guitar', date: new Date(), completed: true },
      ]
    },
  };

  const user = userData[userId as keyof typeof userData] || userData['1'];

  // Mock chart data comparing all users
  const chartData = {
    dailyCompletion: [
      { date: 'Mon', warrior: 75, champion: 100, knight: 50, guardian: 75 },
      { date: 'Tue', warrior: 50, champion: 75, knight: 75, guardian: 50 },
      { date: 'Wed', warrior: 100, champion: 50, knight: 100, guardian: 75 },
      { date: 'Thu', warrior: 75, champion: 100, knight: 75, guardian: 100 },
      { date: 'Fri', warrior: 25, champion: 75, knight: 50, guardian: 75 },
      { date: 'Sat', warrior: 75, champion: 100, knight: 75, guardian: 50 },
      { date: 'Sun', warrior: 75, champion: 50, knight: 100, guardian: 100 },
    ],
    weeklyStatus: [
      { user: 'Winter Warrior', completed: 80 },
      { user: 'Frost Champion', completed: 90 },
      { user: 'Ice Knight', completed: 70 },
      { user: 'Snow Guardian', completed: 75 },
    ],
    overallGrowth: [
      { week: 'Week 1', warrior: 15, champion: 18, knight: 12, guardian: 14 },
      { week: 'Week 2', warrior: 22, champion: 20, knight: 18, guardian: 19 },
      { week: 'Week 3', warrior: 18, champion: 25, knight: 21, guardian: 17 },
      { week: 'Week 4', warrior: 27, champion: 24, knight: 22, guardian: 26 },
    ],
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <SnowEffect />
      
      <div className="container max-w-4xl mx-auto p-4 space-y-6 relative z-10">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="frost-card border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Profile Summary */}
        <div className="animate-slide-up">
          <ProfileSummary 
            userName={user.name}
            totalPoints={user.points}
            tasks={user.tasks}
          />
        </div>

        {/* Progress Charts */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <ProgressChart data={chartData} />
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Profile;

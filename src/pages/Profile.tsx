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

  // Mock chart data
  const chartData = {
    dailyCompletion: [
      { date: 'Mon', completion: 75 },
      { date: 'Tue', completion: 50 },
      { date: 'Wed', completion: 100 },
      { date: 'Thu', completion: 75 },
      { date: 'Fri', completion: 25 },
      { date: 'Sat', completion: 75 },
      { date: 'Sun', completion: 75 },
    ],
    weeklyStatus: [
      { task: 'Build Project', completed: 100 },
      { task: 'Workout 5x', completed: 60 },
    ],
    overallGrowth: [
      { week: 'Week 1', points: 15 },
      { week: 'Week 2', points: 22 },
      { week: 'Week 3', points: 18 },
      { week: 'Week 4', points: 27 },
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

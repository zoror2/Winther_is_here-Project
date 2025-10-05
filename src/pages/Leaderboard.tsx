import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import LeaderboardStage from '@/components/LeaderboardStage';
import SnowEffect from '@/components/SnowEffect';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const navigate = useNavigate();

  // Mock data - will be replaced with Firebase
  const users = [
    { id: '1', name: 'Winter Warrior', points: 247 },
    { id: '2', name: 'Frost Champion', points: 198 },
    { id: '3', name: 'Ice Knight', points: 156 },
    { id: '4', name: 'Snow Guardian', points: 134 },
  ];

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <SnowEffect />
      
      <div className="container max-w-4xl mx-auto p-4 space-y-6 relative z-10">
        {/* Header */}
        <header className="frost-card p-6 text-center animate-slide-up glow-ice-strong">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-10 h-10 text-primary animate-float" />
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Winter Arc Leaderboard
            </h1>
            <Trophy className="w-10 h-10 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-muted-foreground">Who will conquer the Winter Arc?</p>
        </header>

        {/* Leaderboard */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <LeaderboardStage users={users} onUserClick={handleUserClick} />
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Leaderboard;

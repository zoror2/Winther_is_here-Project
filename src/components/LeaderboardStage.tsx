import { Trophy, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

interface LeaderboardStageProps {
  users: User[];
  onUserClick: (userId: string) => void;
}

const LeaderboardStage = ({ users, onUserClick }: LeaderboardStageProps) => {
  // Sort users by points
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  
  // Podium arrangement: [2nd, 1st, 3rd, 4th]
  const podiumPositions = [
    sortedUsers[1], // 2nd place - left
    sortedUsers[0], // 1st place - center
    sortedUsers[2], // 3rd place - right
  ];

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 0: return 'h-40'; // 1st - tallest
      case 1: return 'h-32'; // 2nd
      case 2: return 'h-24'; // 3rd
      default: return 'h-16';
    }
  };

  const getIcon = (position: number) => {
    switch (position) {
      case 0: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 1: return <Medal className="w-7 h-7 text-gray-300" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <Trophy className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Podium Stage */}
      <div className="frost-card p-8">
        <div className="flex items-end justify-center gap-6 mb-8">
          {podiumPositions.map((user, index) => {
            if (!user) return null;
            const actualPosition = index === 1 ? 0 : index === 0 ? 1 : 2;
            
            return (
              <div
                key={user.id}
                className={cn(
                  "flex flex-col items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105",
                  actualPosition === 0 && "order-2",
                  actualPosition === 1 && "order-1",
                  actualPosition === 2 && "order-3"
                )}
                onClick={() => onUserClick(user.id)}
              >
                {/* User Avatar */}
                <div className={cn(
                  "relative animate-float",
                  actualPosition === 0 && "glow-ice-strong"
                )}>
                  <div className={cn(
                    "w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center border-2",
                    actualPosition === 0 ? "border-yellow-400 w-20 h-20" : "border-primary"
                  )}>
                    <span className="text-2xl font-heading font-bold text-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {/* Position Icon */}
                  <div className="absolute -top-2 -right-2">
                    {getIcon(actualPosition)}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center">
                  <p className={cn(
                    "font-heading font-semibold",
                    actualPosition === 0 ? "text-lg text-yellow-400" : "text-foreground"
                  )}>
                    {user.name}
                  </p>
                  <p className="text-primary font-bold">{user.points} pts</p>
                </div>

                {/* Podium */}
                <div className={cn(
                  "w-32 rounded-t-lg transition-all duration-300 group-hover:glow-ice",
                  getPodiumHeight(actualPosition),
                  actualPosition === 0 
                    ? "bg-gradient-to-t from-yellow-500/20 to-yellow-400/10 border-t-4 border-yellow-400" 
                    : "bg-gradient-to-t from-primary/20 to-primary/10 border-t-4 border-primary"
                )}>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold text-foreground/20">
                      {actualPosition + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4th Place */}
        {sortedUsers[3] && (
          <div 
            className="frost-card p-4 cursor-pointer hover:bg-primary/5 transition-all duration-300 group"
            onClick={() => onUserClick(sortedUsers[3].id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center border-2 border-primary/50">
                <span className="text-lg font-heading font-bold text-foreground">
                  {sortedUsers[3].name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-heading font-semibold text-foreground">{sortedUsers[3].name}</p>
                <p className="text-sm text-muted-foreground">4th Place</p>
              </div>
              <p className="text-primary font-bold text-lg">{sortedUsers[3].points} pts</p>
            </div>
          </div>
        )}
      </div>

      {/* Full Rankings List */}
      <div className="frost-card p-6 space-y-3">
        <h3 className="font-heading font-semibold text-lg text-primary mb-4">Full Rankings</h3>
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-3 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all duration-300"
            onClick={() => onUserClick(user.id)}
          >
            <span className="text-2xl font-heading font-bold text-muted-foreground w-8">
              {index + 1}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center border border-primary/50">
              <span className="font-heading font-bold text-foreground">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-heading font-semibold text-foreground">{user.name}</p>
            </div>
            <p className="text-primary font-bold">{user.points} pts</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardStage;

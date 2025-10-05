import { format } from 'date-fns';
import { Check, Trophy } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
}

interface ProfileSummaryProps {
  userName: string;
  totalPoints: number;
  tasks: Task[];
}

const ProfileSummary = ({ userName, totalPoints, tasks }: ProfileSummaryProps) => {
  // Only show completed tasks
  const completedTasks = tasks.filter(task => task.completed);

  // Group by date
  const tasksByDate = completedTasks.reduce((acc, task) => {
    const dateKey = format(task.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const sortedDates = Object.keys(tasksByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      {/* User Header */}
      <div className="frost-card p-8 text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center border-4 border-primary glow-ice-strong">
          <span className="text-4xl font-heading font-bold text-foreground">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            {userName}'s Progress ❄️
          </h1>
          <div className="flex items-center justify-center gap-2 text-primary">
            <Trophy className="w-6 h-6" />
            <span className="text-2xl font-bold">{totalPoints} Points</span>
          </div>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-primary">Completed Tasks</h2>
        
        {completedTasks.length === 0 ? (
          <div className="frost-card p-8 text-center">
            <p className="text-muted-foreground">No completed tasks yet</p>
          </div>
        ) : (
          sortedDates.map((dateKey) => (
            <div key={dateKey} className="frost-card p-5 space-y-3 animate-slide-up">
              <h3 className="font-heading font-semibold text-lg text-foreground border-b border-primary/20 pb-2">
                {format(new Date(dateKey), 'EEEE, MMMM d, yyyy')}
              </h3>
              
              <div className="space-y-2">
                {tasksByDate[dateKey].map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-primary/20"
                  >
                    <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="flex-1 text-foreground">{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileSummary;

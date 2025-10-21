import { useState } from 'react';
import { Trophy } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import TaskList from '@/components/TaskList';
import ProgressChart from '@/components/ProgressChart';
import SnowEffect from '@/components/SnowEffect';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  type: 'daily' | 'weekly';
  weekStart?: Date;
}

const Dashboard = () => {
  // Mock user data - will be replaced with Firebase
  const userName = "Winter Warrior";
  const [totalPoints, setTotalPoints] = useState(27);
  const [dailyPoints, setDailyPoints] = useState(3);
  const [weeklyPoints, setWeeklyPoints] = useState(1);
  
  // Fixed predetermined tasks
  const [tasks, setTasks] = useState<Task[]>([
    // Today's Daily Tasks
    {
      id: 'd1',
      title: 'Wake up before 7 am',
      date: new Date(),
      completed: true,
      type: 'daily',
    },
    {
      id: 'd2',
      title: 'No junk or sugary drinks',
      date: new Date(),
      completed: true,
      type: 'daily',
    },
    {
      id: 'd3',
      title: 'Workout (min 30 min)',
      date: new Date(),
      completed: true,
      type: 'daily',
    },
    {
      id: 'd4',
      title: '3 study sessions a day',
      date: new Date(),
      completed: false,
      type: 'daily',
    },
    // Yesterday's Daily Tasks
    {
      id: 'd5',
      title: 'Wake up before 7 am',
      date: new Date(Date.now() - 86400000),
      completed: false,
      type: 'daily',
    },
    {
      id: 'd6',
      title: 'No junk or sugary drinks',
      date: new Date(Date.now() - 86400000),
      completed: true,
      type: 'daily',
    },
    {
      id: 'd7',
      title: 'Workout (min 30 min)',
      date: new Date(Date.now() - 86400000),
      completed: false,
      type: 'daily',
    },
    {
      id: 'd8',
      title: '3 study sessions a day',
      date: new Date(Date.now() - 86400000),
      completed: false,
      type: 'daily',
    },
    // Weekly Tasks
    {
      id: 'w1',
      title: 'Build some project',
      date: new Date(),
      completed: true,
      type: 'weekly',
      weekStart: new Date(),
    },
    {
      id: 'w2',
      title: 'Workout at least 5 days a week',
      date: new Date(),
      completed: false,
      type: 'weekly',
      weekStart: new Date(),
    },
  ]);

  // Mock chart data - will be replaced with Firebase
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

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        // Update points (1 point per task)
        if (newCompleted) {
          setTotalPoints(prev => prev + 1);
          if (task.type === 'daily') {
            setDailyPoints(prev => prev + 1);
          } else {
            setWeeklyPoints(prev => prev + 1);
          }
        } else {
          setTotalPoints(prev => prev - 1);
          if (task.type === 'daily') {
            setDailyPoints(prev => prev - 1);
          } else {
            setWeeklyPoints(prev => prev - 1);
          }
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <SnowEffect />
      
      <div className="container max-w-4xl mx-auto p-4 space-y-6 relative z-10">
        {/* Header */}
        <header className="frost-card p-6 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                {userName}'s Dashboard
              </h1>
              <p className="text-muted-foreground">Track your Winter Arc progress</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 text-primary glow-ice">
                <Trophy className="w-6 h-6" />
                <span className="text-2xl font-heading font-bold">{totalPoints}</span>
              </div>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span>Daily: {dailyPoints}</span>
                <span>Weekly: {weeklyPoints}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Task List */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
        </div>

        {/* Progress Charts */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <ProgressChart data={chartData} />
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Dashboard;

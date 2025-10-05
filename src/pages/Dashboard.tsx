import { useState } from 'react';
import { Trophy } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import ProgressChart from '@/components/ProgressChart';
import SnowEffect from '@/components/SnowEffect';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
}

const Dashboard = () => {
  // Mock user data - will be replaced with Firebase
  const userName = "Winter Warrior";
  const [totalPoints, setTotalPoints] = useState(247);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete morning workout',
      date: new Date(),
      completed: true,
    },
    {
      id: '2',
      title: 'Read 30 pages',
      date: new Date(),
      completed: false,
    },
  ]);

  const handleAddTask = (title: string, date: Date) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      date,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        // Update points
        setTotalPoints(prev => newCompleted ? prev + 10 : prev - 10);
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
            <div className="flex items-center gap-2 text-primary glow-ice">
              <Trophy className="w-6 h-6" />
              <span className="text-2xl font-heading font-bold">{totalPoints}</span>
            </div>
          </div>
        </header>

        {/* Add Task */}
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <TaskInput onAddTask={handleAddTask} />
        </div>

        {/* Task List */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
        </div>

        {/* Progress Charts */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <ProgressChart />
        </div>
      </div>

      <NavigationBar />
    </div>
  );
};

export default Dashboard;

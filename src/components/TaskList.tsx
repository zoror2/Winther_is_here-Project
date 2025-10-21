import { format, isToday, isBefore, startOfDay } from 'date-fns';
import { Check, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  type: 'daily' | 'weekly';
  weekStart?: Date;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}

const TaskList = ({ tasks, onToggleTask }: TaskListProps) => {
  const isTaskFromPast = (taskDate: Date) => {
    return isBefore(startOfDay(taskDate), startOfDay(new Date()));
  };

  // Separate daily and weekly tasks
  const dailyTasks = tasks.filter(t => t.type === 'daily');
  const weeklyTasks = tasks.filter(t => t.type === 'weekly');

  // Group daily tasks by date
  const dailyTasksByDate = dailyTasks.reduce((acc, task) => {
    const dateKey = format(task.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const sortedDates = Object.keys(dailyTasksByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (tasks.length === 0) {
    return (
      <div className="frost-card p-8 text-center">
        <p className="text-muted-foreground">No tasks yet. Add your first task to begin your Winter Arc!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weekly Tasks Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-primary">Weekly Goals</h2>
        <div className="frost-card p-5 space-y-3">
          <h3 className="font-heading font-semibold text-lg text-foreground border-b border-primary/20 pb-2">
            This Week
          </h3>
          <div className="space-y-2">
            {weeklyTasks.map((task) => {
              const isDisabled = false; // Weekly tasks are always editable
              
              return (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300",
                    task.completed 
                      ? "bg-muted/30 border-primary/20 opacity-60" 
                      : "bg-input/30 border-primary/30 hover:border-primary/50"
                  )}
                >
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => onToggleTask(task.id)}
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor={task.id}
                    className={cn(
                      "flex-1 transition-all duration-300 cursor-pointer",
                      task.completed 
                        ? "line-through text-muted-foreground" 
                        : "text-foreground"
                    )}
                  >
                    {task.title}
                  </label>
                  {task.completed && (
                    <Check className="w-5 h-5 text-primary animate-slide-up" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Tasks Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-primary">Daily Tasks</h2>
        
        {sortedDates.map((dateKey) => (
        <div key={dateKey} className="frost-card p-5 space-y-3 animate-slide-up">
          <h3 className="font-heading font-semibold text-lg text-foreground border-b border-primary/20 pb-2">
            {format(new Date(dateKey), 'EEEE, MMMM d, yyyy')}
          </h3>
          
          <div className="space-y-2">
            {dailyTasksByDate[dateKey].map((task) => {
              const isPastTask = isTaskFromPast(task.date);
              const isDisabled = isPastTask && !task.completed;
              
              return (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300",
                    task.completed 
                      ? "bg-muted/30 border-primary/20 opacity-60" 
                      : isDisabled
                      ? "bg-destructive/5 border-destructive/30"
                      : "bg-input/30 border-primary/30 hover:border-primary/50"
                  )}
                >
                  {isDisabled ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                  ) : (
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => onToggleTask(task.id)}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  )}
                  <label
                    htmlFor={task.id}
                    className={cn(
                      "flex-1 transition-all duration-300",
                      task.completed 
                        ? "line-through text-muted-foreground" 
                        : isDisabled
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-foreground cursor-pointer"
                    )}
                  >
                    {task.title}
                  </label>
                  {task.completed && (
                    <Check className="w-5 h-5 text-primary animate-slide-up" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TaskList;

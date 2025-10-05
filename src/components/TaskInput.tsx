import { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskInputProps {
  onAddTask: (title: string, date: Date) => void;
}

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() && selectedDate) {
      onAddTask(taskTitle.trim(), selectedDate);
      setTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="frost-card p-6 space-y-4">
      <h2 className="text-xl font-heading font-semibold text-primary">Add New Task</h2>
      
      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Enter task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="bg-input border-primary/30 focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-primary/30 hover:border-primary hover:bg-primary/10",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 frost-card border-primary/30" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-ice transition-all duration-300 hover:scale-105"
          disabled={!taskTitle.trim()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TaskInput;

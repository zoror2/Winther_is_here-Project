import { BarChart3, TrendingUp, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  dailyCompletion: { date: string; completion: number }[];
  weeklyStatus: { task: string; completed: number }[];
  overallGrowth: { week: string; points: number }[];
}

interface ProgressChartProps {
  data: ChartData;
}

const ProgressChart = ({ data }: ProgressChartProps) => {
  const COLORS = ['hsl(199, 89%, 48%)', 'hsl(217, 33%, 17%)'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading font-semibold text-primary">Progress Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Completion Bar Chart */}
        <div className="frost-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Daily Completion %</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.dailyCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }} 
              />
              <Bar dataKey="completion" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Goals Pie Chart */}
        <div className="frost-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Weekly Progress</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data.weeklyStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ task, completed }) => `${task}: ${completed}%`}
                outerRadius={60}
                fill="hsl(var(--primary))"
                dataKey="completed"
              >
                {data.weeklyStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Growth Line Chart */}
        <div className="frost-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Overall Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.overallGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;

import { BarChart3, TrendingUp, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

interface ChartData {
  dailyCompletion: { date: string; warrior: number; champion: number; knight: number; guardian: number }[];
  weeklyStatus: { user: string; completed: number }[];
  overallGrowth: { week: string; warrior: number; champion: number; knight: number; guardian: number }[];
}

interface ProgressChartProps {
  data: ChartData;
}

const ProgressChart = ({ data }: ProgressChartProps) => {
  const navigate = useNavigate();
  const COLORS = ['hsl(199, 89%, 48%)', 'hsl(240, 100%, 70%)', 'hsl(160, 100%, 70%)', 'hsl(30, 100%, 70%)'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading font-semibold text-primary">Progress Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Completion Bar Chart */}
        <div 
          className="frost-card p-6 space-y-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          onClick={() => navigate('/chart/daily')}
        >
          <div className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Daily Completion %</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.dailyCompletion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }} 
              />
              <Bar dataKey="warrior" name="Warrior" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="champion" name="Champion" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="knight" name="Knight" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="guardian" name="Guardian" fill={COLORS[3]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-muted-foreground">Click to expand</p>
        </div>

        {/* Weekly Goals Pie Chart */}
        <div 
          className="frost-card p-6 space-y-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          onClick={() => navigate('/chart/weekly')}
        >
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
                label={false}
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
          <p className="text-xs text-center text-muted-foreground">Click to expand</p>
        </div>

        {/* Overall Growth Line Chart */}
        <div 
          className="frost-card p-6 space-y-4 cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          onClick={() => navigate('/chart/overall')}
        >
          <div className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Overall Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.overallGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }} 
              />
              <Line type="monotone" dataKey="warrior" stroke={COLORS[0]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="champion" stroke={COLORS[1]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="knight" stroke={COLORS[2]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="guardian" stroke={COLORS[3]} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-muted-foreground">Click to expand</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;

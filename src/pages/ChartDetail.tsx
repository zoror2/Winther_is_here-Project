import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import SnowEffect from '@/components/SnowEffect';

interface ChartData {
  dailyCompletion: { date: string; warrior: number; champion: number; knight: number; guardian: number }[];
  weeklyStatus: { user: string; completed: number }[];
  overallGrowth: { week: string; warrior: number; champion: number; knight: number; guardian: number }[];
}

interface ChartDetailProps {
  data: ChartData;
}

const ChartDetail = () => {
  const { chartType } = useParams();
  const navigate = useNavigate();

  // Mock data - will be replaced with Firebase
  const chartData: ChartData = {
    dailyCompletion: [
      { date: 'Mon', warrior: 75, champion: 100, knight: 50, guardian: 75 },
      { date: 'Tue', warrior: 50, champion: 75, knight: 75, guardian: 50 },
      { date: 'Wed', warrior: 100, champion: 50, knight: 100, guardian: 75 },
      { date: 'Thu', warrior: 75, champion: 100, knight: 75, guardian: 100 },
      { date: 'Fri', warrior: 25, champion: 75, knight: 50, guardian: 75 },
      { date: 'Sat', warrior: 75, champion: 100, knight: 75, guardian: 50 },
      { date: 'Sun', warrior: 75, champion: 50, knight: 100, guardian: 100 },
    ],
    weeklyStatus: [
      { user: 'Winter Warrior', completed: 80 },
      { user: 'Frost Champion', completed: 90 },
      { user: 'Ice Knight', completed: 70 },
      { user: 'Snow Guardian', completed: 75 },
    ],
    overallGrowth: [
      { week: 'Week 1', warrior: 15, champion: 18, knight: 12, guardian: 14 },
      { week: 'Week 2', warrior: 22, champion: 20, knight: 18, guardian: 19 },
      { week: 'Week 3', warrior: 18, champion: 25, knight: 21, guardian: 17 },
      { week: 'Week 4', warrior: 27, champion: 24, knight: 22, guardian: 26 },
    ],
  };

  const COLORS = ['hsl(199, 89%, 48%)', 'hsl(240, 100%, 70%)', 'hsl(160, 100%, 70%)', 'hsl(30, 100%, 70%)'];

  const renderChart = () => {
    switch (chartType) {
      case 'daily':
        return (
          <div className="frost-card p-8 space-y-6">
            <div className="flex items-center gap-3 text-foreground">
              <BarChart3 className="w-7 h-7 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">Daily Task Completion %</h2>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={chartData.dailyCompletion}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '14px' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '14px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--primary) / 0.3)',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Legend />
                <Bar dataKey="warrior" name="Winter Warrior" fill={COLORS[0]} radius={[8, 8, 0, 0]} />
                <Bar dataKey="champion" name="Frost Champion" fill={COLORS[1]} radius={[8, 8, 0, 0]} />
                <Bar dataKey="knight" name="Ice Knight" fill={COLORS[2]} radius={[8, 8, 0, 0]} />
                <Bar dataKey="guardian" name="Snow Guardian" fill={COLORS[3]} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'weekly':
        return (
          <div className="frost-card p-8 space-y-6">
            <div className="flex items-center gap-3 text-foreground">
              <Target className="w-7 h-7 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">Weekly Goals Progress</h2>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={chartData.weeklyStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ user, completed }) => `${user}: ${completed}%`}
                  outerRadius={150}
                  fill="hsl(var(--primary))"
                  dataKey="completed"
                >
                  {chartData.weeklyStatus.map((entry, index) => (
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'overall':
        return (
          <div className="frost-card p-8 space-y-6">
            <div className="flex items-center gap-3 text-foreground">
              <TrendingUp className="w-7 h-7 text-primary" />
              <h2 className="text-2xl font-heading font-semibold">Overall Growth Comparison</h2>
            </div>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={chartData.overallGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '14px' }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '14px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--primary) / 0.3)',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="warrior" 
                  name="Winter Warrior"
                  stroke={COLORS[0]}
                  strokeWidth={3}
                  dot={{ fill: COLORS[0], r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="champion" 
                  name="Frost Champion"
                  stroke={COLORS[1]}
                  strokeWidth={3}
                  dot={{ fill: COLORS[1], r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="knight" 
                  name="Ice Knight"
                  stroke={COLORS[2]}
                  strokeWidth={3}
                  dot={{ fill: COLORS[2], r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="guardian" 
                  name="Snow Guardian"
                  stroke={COLORS[3]}
                  strokeWidth={3}
                  dot={{ fill: COLORS[3], r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return (
          <div className="frost-card p-8 text-center">
            <p className="text-muted-foreground">Chart not found</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      <SnowEffect />
      
      <div className="container max-w-6xl mx-auto p-4 space-y-6 relative z-10">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="frost-card border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Chart */}
        <div className="animate-slide-up">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default ChartDetail;

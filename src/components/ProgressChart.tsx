import { BarChart3, TrendingUp } from 'lucide-react';

const ProgressChart = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading font-semibold text-primary">Progress Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart Placeholder */}
        <div className="frost-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Tasks Per Day</h3>
          </div>
          <div className="h-48 flex items-center justify-center border border-dashed border-primary/30 rounded-lg">
            <p className="text-muted-foreground text-sm">Chart placeholder - integrate Chart.js here</p>
          </div>
        </div>

        {/* Line Chart Placeholder */}
        <div className="frost-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold">Cumulative Growth</h3>
          </div>
          <div className="h-48 flex items-center justify-center border border-dashed border-primary/30 rounded-lg">
            <p className="text-muted-foreground text-sm">Chart placeholder - integrate Chart.js here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;

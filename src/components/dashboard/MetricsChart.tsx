
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SystemMetric } from "@/hooks/useWarehouseData";

interface MetricsChartProps {
  data: SystemMetric[];
}

const MetricsChart = ({ data }: MetricsChartProps) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const chartData = data.map(metric => ({
    ...metric,
    time: formatTime(metric.timestamp)
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="cpu" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="CPU %"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="memory" 
            stroke="#10B981" 
            strokeWidth={2}
            name="Memory %"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="disk" 
            stroke="#F59E0B" 
            strokeWidth={2}
            name="Disk %"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="network" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            name="Network %"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;

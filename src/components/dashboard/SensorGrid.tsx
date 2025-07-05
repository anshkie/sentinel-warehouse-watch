
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Activity, Gauge } from "lucide-react";
import { Sensor } from "@/hooks/useWarehouseData";

interface SensorGridProps {
  sensors: Sensor[];
}

const SensorGrid = ({ sensors }: SensorGridProps) => {
  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <Thermometer className="h-5 w-5 text-blue-400" />;
      case 'humidity': return <Droplets className="h-5 w-5 text-cyan-400" />;
      case 'motion': return <Activity className="h-5 w-5 text-green-400" />;
      case 'pressure': return <Gauge className="h-5 w-5 text-purple-400" />;
      default: return <Activity className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'secondary';
      case 'inactive': return 'outline';
      case 'error': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Environmental Sensors</h2>
          <p className="text-slate-400">Real-time monitoring of warehouse conditions</p>
        </div>
        <Badge variant="outline" className="border-green-500 text-green-400">
          {sensors.filter(s => s.status === 'active').length} Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <Card key={sensor.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                {getSensorIcon(sensor.type)}
                <CardTitle className="text-sm font-medium text-white">{sensor.name}</CardTitle>
              </div>
              <Badge variant={getStatusColor(sensor.status)} className="capitalize">
                {sensor.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {sensor.value} {sensor.unit}
              </div>
              <p className="text-xs text-slate-400 mb-2">{sensor.location}</p>
              <p className="text-xs text-slate-500">Last update: {sensor.lastUpdate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SensorGrid;

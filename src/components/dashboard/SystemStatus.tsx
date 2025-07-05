
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Database, Wifi, HardDrive, Cpu } from "lucide-react";

const SystemStatus = () => {
  const systemComponents = [
    { name: "Database", status: "online", icon: Database, uptime: "99.9%" },
    { name: "Network", status: "online", icon: Wifi, uptime: "99.8%" },
    { name: "Storage", status: "warning", icon: HardDrive, uptime: "98.5%" },
    { name: "Compute", status: "online", icon: Cpu, uptime: "99.7%" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-green-500 bg-green-950/20';
      case 'warning': return 'border-orange-500 bg-orange-950/20';
      case 'error': return 'border-red-500 bg-red-950/20';
      default: return 'border-slate-600 bg-slate-800/30';
    }
  };

  return (
    <div className="space-y-4">
      {systemComponents.map((component, index) => (
        <div 
          key={index} 
          className={`p-4 rounded-lg border ${getStatusColor(component.status)} transition-all duration-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <component.icon className="h-5 w-5 text-slate-300" />
              <div>
                <h3 className="font-semibold text-white">{component.name}</h3>
                <p className="text-sm text-slate-400">Uptime: {component.uptime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(component.status)}
              <Badge 
                variant={component.status === 'online' ? 'secondary' : 'outline'} 
                className="capitalize"
              >
                {component.status}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SystemStatus;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";
import { Alert } from "@/hooks/useWarehouseData";

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-950/20 border-red-500/50';
      case 'acknowledged': return 'bg-yellow-950/20 border-yellow-500/50';
      case 'resolved': return 'bg-green-950/20 border-green-500/50';
      default: return 'bg-slate-800/30 border-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Active Alerts</h2>
          <p className="text-slate-400">Warehouse anomaly detection and alert management</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive">{alerts.filter(a => a.severity === 'critical').length} Critical</Badge>
          <Badge variant="outline">{alerts.filter(a => a.severity === 'warning').length} Warning</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`${getStatusColor(alert.status)} transition-all duration-200`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div>
                    <CardTitle className="text-white text-lg">{alert.title}</CardTitle>
                    <CardDescription className="text-slate-400 flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </span>
                      {alert.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getSeverityColor(alert.severity)} className="capitalize">
                    {alert.severity}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {alert.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">{alert.message}</p>
              {alert.sku && (
                <div className="text-sm text-slate-400 mb-4">
                  <strong>SKU:</strong> {alert.sku}
                </div>
              )}
              <div className="flex gap-2">
                {alert.status === 'active' && (
                  <>
                    <Button size="sm" variant="outline" className="border-slate-600">
                      Acknowledge
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Take Action
                    </Button>
                  </>
                )}
                {alert.status === 'acknowledged' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Mark Resolved
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="text-slate-400">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;

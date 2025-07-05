
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, XCircle, Thermometer, Droplets, Zap, Activity, Database, MessageSquare, TrendingDown, Package, Clock } from "lucide-react";
import SensorGrid from "@/components/dashboard/SensorGrid";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import MetricsChart from "@/components/dashboard/MetricsChart";
import SystemStatus from "@/components/dashboard/SystemStatus";
import InventoryAnomalies from "@/components/dashboard/InventoryAnomalies";
import ChatInterface from "@/components/dashboard/ChatInterface";
import DatabaseSchema from "@/components/dashboard/DatabaseSchema";
import { useWarehouseData } from "@/hooks/useWarehouseData";

const Index = () => {
  const { sensors, alerts, systemMetrics, inventoryData, isLoading } = useWarehouseData();
  const [activeTab, setActiveTab] = useState("overview");

  const criticalAlerts = alerts.filter(alert => alert.severity === "critical").length;
  const warningAlerts = alerts.filter(alert => alert.severity === "warning").length;
  const activeSensors = sensors.filter(sensor => sensor.status === "active").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Initializing Warehouse Monitoring System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Sentinel Warehouse Intelligence</h1>
                <p className="text-sm text-slate-400">On-Premise Anomaly Detection & Alert System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={criticalAlerts > 0 ? "destructive" : "secondary"} className="animate-pulse">
                {criticalAlerts} Critical
              </Badge>
              <Badge variant={warningAlerts > 0 ? "outline" : "secondary"}>
                {warningAlerts} Warnings
              </Badge>
              <div className="flex items-center space-x-2 text-sm">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Critical Alerts Banner */}
      {criticalAlerts > 0 && (
        <div className="bg-red-950/50 border-b border-red-800">
          <div className="container mx-auto px-6 py-3">
            <Alert className="border-red-500 bg-red-950/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="text-red-400">Critical Inventory Issues Detected</AlertTitle>
              <AlertDescription className="text-red-300">
                {criticalAlerts} items require immediate attention. Check the Alerts tab for details.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-900/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat Interface
            </TabsTrigger>
            <TabsTrigger value="sensors" className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Sensors
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Database
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Active Sensors</CardTitle>
                  <Thermometer className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{activeSensors}</div>
                  <p className="text-xs text-slate-400">of {sensors.length} total</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Inventory Items</CardTitle>
                  <Package className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{inventoryData?.totalItems || 0}</div>
                  <p className="text-xs text-slate-400">tracked items</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">At Risk Items</CardTitle>
                  <TrendingDown className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">{inventoryData?.atRiskItems || 0}</div>
                  <p className="text-xs text-slate-400">need attention</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">System Uptime</CardTitle>
                  <Clock className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">99.8%</div>
                  <p className="text-xs text-slate-400">last 30 days</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">System Metrics</CardTitle>
                  <CardDescription className="text-slate-400">Real-time performance data</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricsChart data={systemMetrics} />
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                  <CardDescription className="text-slate-400">Component health monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <SystemStatus />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryAnomalies />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel alerts={alerts} />
          </TabsContent>

          <TabsContent value="chat">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="sensors">
            <SensorGrid sensors={sensors} />
          </TabsContent>

          <TabsContent value="database">
            <DatabaseSchema />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

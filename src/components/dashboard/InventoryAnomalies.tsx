
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, Clock, TrendingDown, Calendar } from "lucide-react";
import { useState } from "react";

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: "perishable" | "non-perishable";
  quantity: number;
  daysInStock: number;
  expiryDate?: string;
  salesVelocity: number;
  riskLevel: "critical" | "warning" | "normal";
  recommendedAction: string;
  location: string;
}

const InventoryAnomalies = () => {
  const [inventoryItems] = useState<InventoryItem[]>([
    {
      id: "1",
      sku: "USB-CHG-001",
      name: "USB Chargers",
      category: "non-perishable",
      quantity: 500,
      daysInStock: 40,
      salesVelocity: 2.1,
      riskLevel: "critical",
      recommendedAction: "Hold shipment - Overstock detected",
      location: "Aisle A-12"
    },
    {
      id: "2",
      sku: "MILK-ORG-2L",
      name: "Organic Milk 2L",
      category: "perishable",
      quantity: 24,
      daysInStock: 3,
      expiryDate: "2025-07-08",
      salesVelocity: 12.5,
      riskLevel: "warning",
      recommendedAction: "Apply 20% markdown",
      location: "Cooler B-5"
    },
    {
      id: "3",
      sku: "BREAD-WHT-001",
      name: "White Bread Loaves",
      category: "perishable",
      quantity: 15,
      daysInStock: 2,
      expiryDate: "2025-07-07",
      salesVelocity: 8.2,
      riskLevel: "critical",
      recommendedAction: "Emergency markdown - 50% off",
      location: "Bakery Section"
    },
    {
      id: "4",
      sku: "LAPTOP-STD-001",
      name: "Standard Laptops",
      category: "non-perishable",
      quantity: 75,
      daysInStock: 25,
      salesVelocity: 1.8,
      riskLevel: "warning",
      recommendedAction: "Monitor - Slow moving",
      location: "Electronics A-3"
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "destructive";
      case "warning": return "outline";
      default: return "secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === "perishable" ? <Calendar className="h-4 w-4" /> : <Package className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Inventory Anomaly Detection</h2>
          <p className="text-slate-400">MCP System - Model, Compute, Publish</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive">{inventoryItems.filter(i => i.riskLevel === "critical").length} Critical</Badge>
          <Badge variant="outline">{inventoryItems.filter(i => i.riskLevel === "warning").length} Warning</Badge>
        </div>
      </div>

      {/* System Architecture Overview */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-blue-400" />
            MCP System Architecture
          </CardTitle>
          <CardDescription className="text-slate-400">
            Model → Compute → Publish pipeline for anomaly detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <h3 className="font-semibold text-blue-400 mb-2">Model Layer (M)</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Freshness decay calculations</li>
                <li>• Sales velocity analysis</li>
                <li>• Overstock detection algorithms</li>
                <li>• Markdown timing models</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <h3 className="font-semibold text-green-400 mb-2">Compute Layer (C)</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Batch processing scripts</li>
                <li>• Real-time anomaly detection</li>
                <li>• Risk level calculations</li>
                <li>• Action recommendations</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-600">
              <h3 className="font-semibold text-purple-400 mb-2">Publish Layer (P)</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Slack/Teams/Telegram alerts</li>
                <li>• Interactive chat responses</li>
                <li>• Database updates</li>
                <li>• Action logging</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Items */}
      <div className="grid gap-4">
        {inventoryItems.map((item) => (
          <Card key={item.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(item.category)}
                  <div>
                    <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      SKU: {item.sku} | Location: {item.location}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getRiskColor(item.riskLevel)} className="capitalize">
                  {item.riskLevel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Quantity</p>
                  <p className="text-lg font-semibold text-white">{item.quantity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Days in Stock</p>
                  <p className="text-lg font-semibold text-white">{item.daysInStock}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">Sales Velocity</p>
                  <p className="text-lg font-semibold text-white">{item.salesVelocity}/day</p>
                </div>
                {item.expiryDate && (
                  <div className="space-y-1">
                    <p className="text-sm text-slate-400">Expires</p>
                    <p className="text-lg font-semibold text-orange-400">{item.expiryDate}</p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                  <span className="text-slate-300">{item.recommendedAction}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-slate-600">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Send Alert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryAnomalies;

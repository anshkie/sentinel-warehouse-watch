
import { useState, useEffect } from 'react';

export interface Sensor {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'motion' | 'pressure';
  value: number;
  unit: string;
  status: 'active' | 'inactive' | 'error';
  location: string;
  lastUpdate: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  sku?: string;
  location?: string;
}

export interface SystemMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface InventoryData {
  totalItems: number;
  atRiskItems: number;
  perishableItems: number;
  overstockItems: number;
}

export const useWarehouseData = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading warehouse data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock sensor data
      setSensors([
        {
          id: '1',
          name: 'Freezer Unit A',
          type: 'temperature',
          value: -18.5,
          unit: '°C',
          status: 'active',
          location: 'Zone A-1',
          lastUpdate: '2025-07-05 10:30:00'
        },
        {
          id: '2',
          name: 'Humidity Sensor B',
          type: 'humidity',
          value: 65,
          unit: '%',
          status: 'active',
          location: 'Zone B-2',
          lastUpdate: '2025-07-05 10:29:45'
        },
        {
          id: '3',
          name: 'Motion Detector C',
          type: 'motion',
          value: 1,
          unit: 'detected',
          status: 'active',
          location: 'Entrance C',
          lastUpdate: '2025-07-05 10:30:15'
        }
      ]);

      // Mock alert data
      setAlerts([
        {
          id: '1',
          title: 'Critical Overstock Alert',
          message: '500 USB Chargers sitting for 40 days - Hold shipment recommended',
          severity: 'critical',
          timestamp: '2025-07-05 09:15:23',
          status: 'active',
          sku: 'USB-CHG-001',
          location: 'Aisle A-12'
        },
        {
          id: '2',
          title: 'Spoilage Risk Warning',
          message: 'Organic Milk expires in 3 days - Markdown recommended',
          severity: 'warning',
          timestamp: '2025-07-05 09:30:12',
          status: 'active',
          sku: 'MILK-ORG-2L',
          location: 'Cooler B-5'
        },
        {
          id: '3',
          title: 'Temperature Anomaly',
          message: 'Freezer Unit A temperature fluctuation detected',
          severity: 'warning',
          timestamp: '2025-07-05 08:45:33',
          status: 'acknowledged',
          location: 'Zone A-1'
        }
      ]);

      // Mock system metrics
      const now = new Date();
      const metrics: SystemMetric[] = [];
      for (let i = 23; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        metrics.push({
          timestamp: timestamp.toISOString(),
          cpu: Math.floor(Math.random() * 30) + 20,
          memory: Math.floor(Math.random() * 20) + 40,
          disk: Math.floor(Math.random() * 10) + 15,
          network: Math.floor(Math.random() * 50) + 10
        });
      }
      setSystemMetrics(metrics);

      // Mock inventory data
      setInventoryData({
        totalItems: 247,
        atRiskItems: 12,
        perishableItems: 45,
        overstockItems: 8
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    sensors,
    alerts,
    systemMetrics,
    inventoryData,
    isLoading
  };
};


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Table, Key, Link } from "lucide-react";

const DatabaseSchema = () => {
  const tables = [
    {
      name: "sales_data",
      description: "POS sales transactions",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique transaction ID" },
        { name: "sku", type: "VARCHAR(50)", description: "Product SKU" },
        { name: "quantity_sold", type: "INTEGER", description: "Units sold" },
        { name: "sale_date", type: "TIMESTAMP", description: "Transaction timestamp" },
        { name: "unit_price", type: "DECIMAL(10,2)", description: "Price per unit" },
        { name: "total_amount", type: "DECIMAL(10,2)", description: "Total sale amount" },
        { name: "store_location", type: "VARCHAR(100)", description: "Store/warehouse location" }
      ]
    },
    {
      name: "warehouse_stock",
      description: "Current inventory levels",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique stock record ID" },
        { name: "sku", type: "VARCHAR(50)", description: "Product SKU" },
        { name: "product_name", type: "VARCHAR(200)", description: "Product name" },
        { name: "category", type: "VARCHAR(50)", description: "perishable/non-perishable" },
        { name: "current_quantity", type: "INTEGER", description: "Current stock level" },
        { name: "reorder_level", type: "INTEGER", description: "Minimum stock threshold" },
        { name: "last_updated", type: "TIMESTAMP", description: "Last inventory update" },
        { name: "location", type: "VARCHAR(100)", description: "Warehouse location" },
        { name: "hold_status", type: "BOOLEAN DEFAULT FALSE", description: "Shipment hold flag" }
      ]
    },
    {
      name: "freshness_data",
      description: "Perishable goods tracking",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique freshness record ID" },
        { name: "sku", type: "VARCHAR(50)", description: "Product SKU" },
        { name: "batch_id", type: "VARCHAR(100)", description: "Product batch identifier" },
        { name: "expiry_date", type: "DATE", description: "Product expiration date" },
        { name: "received_date", type: "DATE", description: "Date received in warehouse" },
        { name: "spoilage_risk", type: "VARCHAR(20)", description: "low/medium/high/critical" },
        { name: "temperature_log", type: "JSONB", description: "Temperature history" }
      ]
    },
    {
      name: "shipments",
      description: "Incoming shipment schedule",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique shipment ID" },
        { name: "sku", type: "VARCHAR(50)", description: "Product SKU" },
        { name: "supplier_id", type: "VARCHAR(50)", description: "Supplier identifier" },
        { name: "expected_quantity", type: "INTEGER", description: "Expected units" },
        { name: "expected_date", type: "DATE", description: "Expected arrival date" },
        { name: "status", type: "VARCHAR(20)", description: "pending/shipped/received/held" },
        { name: "hold_reason", type: "TEXT", description: "Reason for hold if applicable" }
      ]
    },
    {
      name: "alerts",
      description: "System generated alerts",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique alert ID" },
        { name: "alert_type", type: "VARCHAR(50)", description: "overstock/spoilage/markdown" },
        { name: "sku", type: "VARCHAR(50)", description: "Affected product SKU" },
        { name: "severity", type: "VARCHAR(20)", description: "low/medium/high/critical" },
        { name: "message", type: "TEXT", description: "Alert message" },
        { name: "created_at", type: "TIMESTAMP", description: "Alert creation time" },
        { name: "status", type: "VARCHAR(20)", description: "pending/acknowledged/resolved" },
        { name: "assigned_to", type: "VARCHAR(100)", description: "Supervisor assigned" }
      ]
    },
    {
      name: "alert_responses",
      description: "Supervisor responses to alerts",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique response ID" },
        { name: "alert_id", type: "INTEGER REFERENCES alerts(id)", description: "Related alert" },
        { name: "supervisor_id", type: "VARCHAR(100)", description: "Responding supervisor" },
        { name: "response_action", type: "VARCHAR(50)", description: "hold/markdown/reallocate/ignore" },
        { name: "response_time", type: "TIMESTAMP", description: "Response timestamp" },
        { name: "notes", type: "TEXT", description: "Additional notes" }
      ]
    },
    {
      name: "markdown_schedule",
      description: "Scheduled price markdowns",
      columns: [
        { name: "id", type: "SERIAL PRIMARY KEY", description: "Unique markdown ID" },
        { name: "sku", type: "VARCHAR(50)", description: "Product SKU" },
        { name: "original_price", type: "DECIMAL(10,2)", description: "Original unit price" },
        { name: "markdown_percent", type: "INTEGER", description: "Discount percentage" },
        { name: "new_price", type: "DECIMAL(10,2)", description: "Discounted price" },
        { name: "start_date", type: "DATE", description: "Markdown start date" },
        { name: "end_date", type: "DATE", description: "Markdown end date" },
        { name: "status", type: "VARCHAR(20)", description: "scheduled/active/expired" }
      ]
    }
  ];

  const sqlQueries = [
    {
      title: "Overstock Detection",
      description: "Identify items with excessive inventory",
      query: `-- Detect slow-moving inventory
SELECT 
    ws.sku, 
    ws.product_name,
    ws.current_quantity,
    AVG(sd.quantity_sold) as avg_daily_sales,
    ws.current_quantity / NULLIF(AVG(sd.quantity_sold), 0) as days_of_stock
FROM warehouse_stock ws
LEFT JOIN sales_data sd ON ws.sku = sd.sku 
    AND sd.sale_date >= NOW() - INTERVAL '30 days'
GROUP BY ws.sku, ws.product_name, ws.current_quantity
HAVING ws.current_quantity / NULLIF(AVG(sd.quantity_sold), 0) > 30
ORDER BY days_of_stock DESC;`
    },
    {
      title: "Spoilage Risk Analysis",
      description: "Calculate spoilage risk for perishables",
      query: `-- Perishable goods spoilage risk
SELECT 
    fd.sku,
    ws.product_name,
    fd.expiry_date,
    (fd.expiry_date - CURRENT_DATE) as days_to_expiry,
    ws.current_quantity,
    AVG(sd.quantity_sold) as daily_sales_rate,
    CASE 
        WHEN (fd.expiry_date - CURRENT_DATE) <= 2 THEN 'CRITICAL'
        WHEN (fd.expiry_date - CURRENT_DATE) <= 5 THEN 'HIGH'
        WHEN (fd.expiry_date - CURRENT_DATE) <= 10 THEN 'MEDIUM'
        ELSE 'LOW'
    END as spoilage_risk
FROM freshness_data fd
JOIN warehouse_stock ws ON fd.sku = ws.sku
LEFT JOIN sales_data sd ON fd.sku = sd.sku 
    AND sd.sale_date >= NOW() - INTERVAL '7 days'
WHERE fd.expiry_date > CURRENT_DATE
GROUP BY fd.sku, ws.product_name, fd.expiry_date, ws.current_quantity
ORDER BY days_to_expiry ASC;`
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Database Schema & SQL Queries</h2>
          <p className="text-slate-400">PostgreSQL/MySQL database structure for warehouse system</p>
        </div>
        <Badge variant="outline" className="border-blue-500 text-blue-400">
          <Database className="h-4 w-4 mr-2" />
          PostgreSQL Ready
        </Badge>
      </div>

      {/* Database Tables */}
      <div className="grid gap-4">
        {tables.map((table, index) => (
          <Card key={index} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Table className="h-5 w-5 text-blue-400" />
                <div>
                  <CardTitle className="text-white text-lg">{table.name}</CardTitle>
                  <CardDescription className="text-slate-400">{table.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 text-slate-300 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.columns.map((column, colIndex) => (
                      <tr key={colIndex} className="border-b border-slate-800">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {column.type.includes('PRIMARY KEY') && <Key className="h-3 w-3 text-yellow-400" />}
                            {column.type.includes('REFERENCES') && <Link className="h-3 w-3 text-green-400" />}
                            <span className="text-white font-mono text-sm">{column.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <code className="text-xs bg-slate-800 px-2 py-1 rounded text-blue-300">
                            {column.type}
                          </code>
                        </td>
                        <td className="py-2 px-3 text-slate-400 text-sm">{column.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SQL Queries */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Key SQL Queries</h3>
        {sqlQueries.map((query, index) => (
          <Card key={index} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">{query.title}</CardTitle>
              <CardDescription className="text-slate-400">{query.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code className="text-green-300">{query.query}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DatabaseSchema;

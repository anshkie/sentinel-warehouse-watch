
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, CheckCircle, XCircle, AlertTriangle, Bot, User } from "lucide-react";
import { useState } from "react";

interface ChatMessage {
  id: string;
  type: "bot" | "user" | "system";
  message: string;
  timestamp: string;
  actions?: {
    label: string;
    value: string;
    variant?: "default" | "destructive" | "outline";
  }[];
  severity?: "critical" | "warning" | "info";
}

const ChatInterface = () => {
  const [messages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "system",
      message: "Warehouse Alert System initialized. Monitoring 247 SKUs across 12 zones.",
      timestamp: "2025-07-05 09:00:00",
      severity: "info"
    },
    {
      id: "2",
      type: "bot",
      message: "⚠️ CRITICAL ALERT: 500 USB Chargers (SKU: USB-CHG-001) have been sitting in Aisle A-12 for 40 days. Current sales velocity: 2.1 units/day. Recommendation: Hold incoming shipment to prevent overstock. What action should I take?",
      timestamp: "2025-07-05 09:15:23",
      actions: [
        { label: "Hold Shipment", value: "hold", variant: "destructive" },
        { label: "Continue", value: "continue", variant: "outline" },
        { label: "Reallocate", value: "reallocate", variant: "default" }
      ],
      severity: "critical"
    },
    {
      id: "3",
      type: "user",
      message: "Hold Shipment",
      timestamp: "2025-07-05 09:16:45"
    },
    {
      id: "4",
      type: "bot",
      message: "✅ Action Confirmed: Shipment hold activated for USB-CHG-001. Database updated:\n• warehouse_stock.hold_status = TRUE\n• shipment_holds table updated\n• Supplier notification sent\n\nNext review scheduled for July 12, 2025.",
      timestamp: "2025-07-05 09:16:47",
      severity: "info"
    },
    {
      id: "5",
      type: "bot",
      message: "🟡 WARNING: 24 units of Organic Milk 2L (SKU: MILK-ORG-2L) expire in 3 days. Current sales velocity: 12.5 units/day. Recommendation: Apply 20% markdown to accelerate sales. Approve markdown?",
      timestamp: "2025-07-05 09:30:12",
      actions: [
        { label: "Apply 20% Markdown", value: "markdown_20", variant: "default" },
        { label: "Apply 30% Markdown", value: "markdown_30", variant: "outline" },
        { label: "No Action", value: "no_action", variant: "destructive" }
      ],
      severity: "warning"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleActionClick = (action: string, messageId: string) => {
    console.log(`Action ${action} clicked for message ${messageId}`);
  };

  const getMessageIcon = (type: string, severity?: string) => {
    if (type === "bot") {
      return <Bot className="h-4 w-4 text-blue-400" />;
    } else if (type === "user") {
      return <User className="h-4 w-4 text-green-400" />;
    } else {
      switch (severity) {
        case "critical":
          return <XCircle className="h-4 w-4 text-red-400" />;
        case "warning":
          return <AlertTriangle className="h-4 w-4 text-orange-400" />;
        default:
          return <CheckCircle className="h-4 w-4 text-green-400" />;
      }
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical": return "border-red-500 bg-red-950/20";
      case "warning": return "border-orange-500 bg-orange-950/20";
      default: return "border-slate-600 bg-slate-800/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Warehouse Chat Interface</h2>
          <p className="text-slate-400">Interactive alerts with Slack/Teams/Telegram integration</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-500 text-green-400">
            <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            Connected
          </Badge>
        </div>
      </div>

      {/* Integration Options */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Chat Platform Integration
          </CardTitle>
          <CardDescription className="text-slate-400">
            Connect to your preferred communication platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-green-500/50">
              <h3 className="font-semibold text-green-400 mb-2">Slack Integration</h3>
              <p className="text-sm text-slate-300 mb-3">Real-time alerts via Slack Bot</p>
              <code className="text-xs bg-slate-700 p-2 rounded block text-green-300">
                slack_sdk.WebClient(token="xoxb-...")
              </code>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-blue-500/50">
              <h3 className="font-semibold text-blue-400 mb-2">Teams Integration</h3>
              <p className="text-sm text-slate-300 mb-3">Microsoft Teams connector</p>
              <code className="text-xs bg-slate-700 p-2 rounded block text-blue-300">
                pymsteams.connectorcard(webhook_url)
              </code>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-purple-500/50">
              <h3 className="font-semibold text-purple-400 mb-2">Telegram Integration</h3>
              <p className="text-sm text-slate-300 mb-3">Telegram Bot API</p>
              <code className="text-xs bg-slate-700 p-2 rounded block text-purple-300">
                python-telegram-bot
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Live Alert Stream</CardTitle>
          <CardDescription className="text-slate-400">
            Real-time warehouse alerts and supervisor responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border ${getSeverityColor(message.severity)}`}
              >
                <div className="flex items-start gap-3">
                  {getMessageIcon(message.type, message.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-white capitalize">
                        {message.type === "bot" ? "Sentinel Bot" : message.type === "user" ? "Supervisor" : "System"}
                      </span>
                      <span className="text-xs text-slate-400">{message.timestamp}</span>
                      {message.severity && (
                        <Badge 
                          variant={message.severity === "critical" ? "destructive" : "outline"} 
                          className="text-xs"
                        >
                          {message.severity}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-300 whitespace-pre-line mb-3">{message.message}</p>
                    {message.actions && (
                      <div className="flex gap-2 flex-wrap">
                        {message.actions.map((action, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant={action.variant || "default"}
                            onClick={() => handleActionClick(action.value, message.id)}
                            className="text-xs"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
            <Input
              placeholder="Type a message or command..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-slate-800 border-slate-600 text-white"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;

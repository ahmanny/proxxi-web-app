"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface AdminSummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  color?: 'primary' | 'green' | 'yellow' | 'red' | 'purple' | 'blue';
  subtitle?: string;
  className?: string;
}

const colorClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary border border-primary/20",
  green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  yellow: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  red: "bg-red-500/10 text-red-400 border border-red-500/20",
  purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

export function AdminSummaryCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "primary",
  subtitle,
  className
}: AdminSummaryCardProps) {
  return (
    <Card className={`border-border bg-card shadow-sm hover:shadow-md transition-shadow ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.direction === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend.direction === 'up' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface AdminMetricCardProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: LucideIcon;
  subtitle?: string;
}

export function AdminMetricCard({ label, value, color = "text-foreground", icon: Icon, subtitle }: AdminMetricCardProps) {
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
          </div>
          {Icon && <Icon className={`h-8 w-8 ${color}`} />}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { TrendingDown, TrendingUp } from 'lucide-react';

const productivityData = [
  { month: 'January', increase: 12 },
  { month: 'February', increase: 19 },
  { month: 'March', increase: 25 },
  { month: 'April', increase: 32 },
  { month: 'May', increase: 42 },
  { month: 'June', increase: 55 },
];

const costData = [
  { month: 'July', savings: 300 },
  { month: 'August', savings: 450 },
  { month: 'September', savings: 600 },
  { month: 'October', savings: 800 },
  { month: 'November', savings: 1100 },
  { month: 'December', savings: 1500 },
];

const chartConfig = {
  increase: {
    label: 'Productivity Increase (%)',
    color: 'hsl(var(--primary))',
  },
  savings: {
    label: 'Cost Savings ($)',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;


export function DecisionSupportDashboard() {
  return (
    <>
    <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight font-headline">Decision-Making Support</h2>
        <p className="text-muted-foreground">Make better decisions based on data-driven insights from the implemented solution.</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <TrendingUp className='mr-2 h-5 w-5 text-green-500'/> Productivity Gains</CardTitle>
          <CardDescription>
            Monthly percentage increase in productivity post-implementation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={productivityData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="increase" fill="var(--color-increase)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <TrendingDown className='mr-2 h-5 w-5 text-blue-500'/> Cost Savings
          </CardTitle>
          <CardDescription>
            Projected monthly cost savings over the next 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart accessibilityLayer data={costData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
               <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="savings"
                type="natural"
                stroke="var(--color-savings)"
                strokeWidth={2}
                dot={{
                  fill: 'var(--color-savings)',
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
    </>
  );
}

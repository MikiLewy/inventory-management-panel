import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  caption?: string;
  loading?: boolean;
}

const OverviewCard = ({ title, icon, value, caption, loading }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="text-2xl font-bold">{loading ? <Skeleton className="h-4 w-1/4" /> : value}</div>
        {caption ? <p className="text-xs text-muted-foreground">{caption}</p> : null}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;

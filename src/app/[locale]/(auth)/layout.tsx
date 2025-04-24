import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full text-2xl max-w-sm md:max-w-3xl">
        <div className={cn('flex flex-col gap-6')}>
          <Card className="overflow-hidden p-0">{children}</Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}

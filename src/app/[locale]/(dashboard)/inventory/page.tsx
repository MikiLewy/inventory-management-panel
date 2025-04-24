'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/api/actions/auth';

export default function InventoryPage() {
  return (
    <div>
      Inventory
      <Button onClick={() => logout()}>Log out</Button>
    </div>
  );
}

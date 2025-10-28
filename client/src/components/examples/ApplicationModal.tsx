import { useState } from 'react';
import ApplicationModal from '../ApplicationModal';
import { Button } from '@/components/ui/button';

export default function ApplicationModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setIsOpen(true)}>Open Application Modal</Button>
      <ApplicationModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        jobTitle="Waiter at McDonald's"
      />
    </div>
  );
}

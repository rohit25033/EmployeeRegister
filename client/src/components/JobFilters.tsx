import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface JobFiltersProps {
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export interface FilterState {
  wageRange: [number, number];
  roles: string[];
  shifts: string[];
}

const ROLES = ["Baristas", "Helpers", "Waiters", "Cleaners", "Kitchen Staff", "Cashier"];
const SHIFTS = ["Morning", "Evening", "Night", "Flexible"];

export default function JobFilters({ onApplyFilters, onClearFilters }: JobFiltersProps) {
  const [wageRange, setWageRange] = useState<[number, number]>([8000, 20000]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleShiftToggle = (shift: string) => {
    setSelectedShifts(prev =>
      prev.includes(shift) ? prev.filter(s => s !== shift) : [...prev, shift]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      wageRange,
      roles: selectedRoles,
      shifts: selectedShifts,
    });
  };

  const handleClear = () => {
    setWageRange([8000, 20000]);
    setSelectedRoles([]);
    setSelectedShifts([]);
    onClearFilters();
  };

  return (
    <Card className="p-6 h-fit sticky top-4" data-testid="job-filters">
      <h2 className="text-xl font-semibold mb-6">Filter Jobs</h2>

      <div className="space-y-6">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate p-2 rounded-md">
            <span className="font-medium">Wages</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-4">
              <Slider
                value={wageRange}
                onValueChange={(value) => setWageRange(value as [number, number])}
                min={5000}
                max={30000}
                step={1000}
                className="w-full"
                data-testid="slider-wage"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{wageRange[0].toLocaleString()}</span>
                <span>₹{wageRange[1].toLocaleString()}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate p-2 rounded-md">
            <span className="font-medium">Role</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {ROLES.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role}`}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => handleRoleToggle(role)}
                    data-testid={`checkbox-role-${role.toLowerCase()}`}
                  />
                  <Label
                    htmlFor={`role-${role}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full hover-elevate p-2 rounded-md">
            <span className="font-medium">Shift Type</span>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              {SHIFTS.map((shift) => (
                <div key={shift} className="flex items-center space-x-2">
                  <Checkbox
                    id={`shift-${shift}`}
                    checked={selectedShifts.includes(shift)}
                    onCheckedChange={() => handleShiftToggle(shift)}
                    data-testid={`checkbox-shift-${shift.toLowerCase()}`}
                  />
                  <Label
                    htmlFor={`shift-${shift}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {shift}
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-6 space-y-3">
        <Button 
          className="w-full h-12" 
          onClick={handleApply}
          data-testid="button-apply-filters"
        >
          Apply Filters
        </Button>
        <button
          onClick={handleClear}
          className="w-full text-sm text-muted-foreground hover-elevate py-2 rounded-md"
          data-testid="button-clear-filters"
        >
          Clear All
        </button>
      </div>
    </Card>
  );
}

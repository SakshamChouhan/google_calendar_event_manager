"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export function DateRangePicker({ onChange }: { onChange: (date: { from: Date | null; to: Date | null }) => void }) {
  const [date, setDate] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

  // Convert null values to undefined for compatibility
  const transformedDate = {
    from: date.from || undefined,
    to: date.to || undefined,
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={transformedDate} // Pass the transformed date object
            onSelect={(range) => {
              // Ensure 'range' is handled properly when undefined
              const updatedDate = {
                from: range?.from || null,
                to: range?.to || null,
              };
              setDate(updatedDate);
              onChange(updatedDate); // Trigger the callback with the updated date
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

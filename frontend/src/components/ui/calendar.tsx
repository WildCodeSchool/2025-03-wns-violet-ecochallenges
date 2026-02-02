// calendar.tsx - shadcn/ui compatible Calendar wrapper

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { X } from "lucide-react";

export type CalendarProps = DayPickerProps

export function Calendar(props: CalendarProps) {
    return (
        <div className="p-3 bg-white rounded-lg border shadow-sm">
            <DayPicker {...props} />
        </div>
    )
}

export function CalendarPopover(props: CalendarProps & { triggerLabel?: string }) {
    const [open, setOpen] = React.useState(false);
    // Ferme le popover si une plage complète et différente est sélectionnée
    React.useEffect(() => {
        if (
            props.selected &&
            (props.selected as any).from &&
            (props.selected as any).to &&
            (props.selected as any).from.getTime() !== (props.selected as any).to.getTime()
        ) {
            setOpen(false);
        }
    }, [props.selected]);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button type="button" className="px-4 py-2 bg-white border rounded shadow" onClick={() => setOpen(true)}>
                    {props.triggerLabel || "Sélectionner une date"}
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 relative">
                <button
                    type="button"
                    aria-label="Fermer le calendrier"
                    className="absolute top-2 right-2 z-10 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    onClick={() => setOpen(false)}
                >
                    <X size={18} />
                </button>
                <Calendar {...props} />
            </PopoverContent>
        </Popover>
    );
}

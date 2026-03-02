// Utilisation pour les composants EcogesturesSelect.tsx et AddingParticipants.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export function Command({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "flex flex-col overflow-hidden rounded-md bg-white text-black shadow-md border border-border",
                className
            )}
            {...props}
        />
    )
}

export function CommandInput({ className, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            className={cn(
                "w-full border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground",
                className
            )}
            {...props}
        />
    )
}

export function CommandList({ className, ...props }: React.ComponentProps<"ul">) {
    return (
        <ul className={cn("max-h-60 overflow-y-auto", className)} {...props} />
    )
}

export function CommandEmpty({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("py-6 text-center text-sm text-muted-foreground", className)} {...props} />
    )
}

export function CommandGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("py-2 px-1", className)} {...props} />
    )
}

export function CommandItem({ className, onSelect, onClick, value, ...props }: Omit<React.ComponentProps<"div">, "onSelect" | "value"> & { onSelect?: (value: string | undefined) => void; value?: string }) {
    return (
        <div
            className={cn(
                "flex cursor-pointer select-none items-center px-3 py-2 text-sm text-black hover:bg-gray-100 aria-selected:bg-gray-200 aria-selected:text-black",
                className
            )}
            role="option"
            tabIndex={0}
            onMouseDown={(e) => {
                e.preventDefault();
                if (onSelect) {
                    onSelect(value);
                } else if (onClick) {
                    onClick(e);
                }
            }}
            {...props}
        />
    )
}

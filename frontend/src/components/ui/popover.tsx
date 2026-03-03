import * as React from "react";
import { cn } from "@/lib/utils";

type PopoverContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PopoverContext = React.createContext<PopoverContextType | undefined>(
  undefined,
);

type PopoverProps = React.ComponentProps<"div"> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Popover({
  className,
  open,
  onOpenChange,
  children,
  ...props
}: PopoverProps) {
  const [isOpen, setIsOpen] = React.useState(open ?? false);
  React.useEffect(() => {
    if (typeof open === "boolean") setIsOpen(open);
  }, [open]);
  const handleOpenChange = (next: boolean) => {
    setIsOpen(next);
    onOpenChange?.(next);
  };
  return (
    <PopoverContext.Provider
      value={{ open: isOpen, setOpen: handleOpenChange }}
    >
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ asChild, ...props }: { asChild?: boolean } & React.ComponentProps<"button">) {
    const context = React.useContext(PopoverContext);
    if (!context) throw new Error("PopoverTrigger must be used within a Popover");
    const { open, setOpen } = context;
    if (asChild && React.isValidElement(props.children)) {
        // Inject onClick to child
        const child = props.children as React.ReactElement<any>;
        return React.cloneElement(child, {
            onClick: (e: React.MouseEvent) => {
                child.props.onClick?.(e);
                setOpen(!open);
            },
            'aria-expanded': open,
        });
    }
    return (
        <button
            {...props}
            onClick={(e) => {
                props.onClick?.(e);
                setOpen(!open);
            }}
            aria-expanded={open}
        />
    );
}

export function PopoverContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const context = React.useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be used within a Popover");
  const { open } = context;
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-auto min-w-[8rem] max-w-[90vw] rounded-md border bg-white p-2 text-black shadow-md outline-none",
        className,
      )}
      {...props}
    />
  );
}

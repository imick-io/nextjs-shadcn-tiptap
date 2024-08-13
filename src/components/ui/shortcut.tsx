import { cn } from "@/lib/utils";

const Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
Shortcut.displayName = "Shortcut";

export { Shortcut };

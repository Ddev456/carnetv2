import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

type BadgeComponentProps = {
  color: string;
  checked: boolean;
  onClick: () => void;
  label: string;
};

export const BadgeFilter = ({
  color,
  checked,
  onClick,
  label,
}: BadgeComponentProps) => {
  return (
    <Badge
      variant={checked ? "default" : "outline"}
      className={clsx(
        "cursor-pointer",
        checked
          ? `bg-[${color}] hover:bg-[${color}]/20 text-foreground/80`
          : null
      )}
      onClick={onClick}
    >
      {label}
    </Badge>
  );
};

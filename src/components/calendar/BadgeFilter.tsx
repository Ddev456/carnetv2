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
        checked && label === "Semis sous abri"
          ? "border-[#D3E7A6] bg-[#D3E7A6]/40"
          : "",
        checked && label === "Semis en pleine terre"
          ? "border-[#BEE7F5] bg-[#BEE7F5]/40"
          : "",
        checked && label === "Plantation"
          ? "border-[#FFD19A] bg-[#FFD19A]/40"
          : "",
        checked && label === "Repiquage"
          ? "border-[#F5E7BE] bg-[#F5E7BE]/40"
          : "",
        "cursor-pointer",
        checked ? `border-2 text-foreground/80` : null
      )}
      onClick={onClick}
    >
      {label}
    </Badge>
  );
};

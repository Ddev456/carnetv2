import { addMonths, subMonths, startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { MustLoggedButton } from "../../../app/calendrier/mustLoggedButton";
import { useSession } from "next-auth/react";
import { CalendarFilters } from "./CalendarFilters";

type CalendarNavigationProps = {
  date: Date;
  dates: Date[];
  setDate: (date: Date) => void;
  setShowDynamicModal: (show: boolean) => void;
};

export const CalendarNavigation = ({
  date,
  dates,
  setDate,
  setShowDynamicModal,
}: CalendarNavigationProps) => {
  const { data } = useSession();
  const currentDate = new Date(Date.now());
  const currentYear = currentDate.getFullYear();

  const handleNextMonth = () => {
    const newDate = addMonths(date, 1);
    if (newDate.getFullYear() <= currentYear + 2) {
      setDate(newDate);
    }
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(date, 1);
    if (newDate.getFullYear() >= currentYear) {
      setDate(newDate);
    }
  };

  const handleToday = () => {
    setDate(startOfMonth(currentDate));
  };
  return (
    <div className="flex w-full items-center justify-evenly rounded-t-xl bg-secondary/80">
      <CalendarFilters />
      {/* <div className="flex items-center"> */}
      <Button
        className="hover:bg-secondary/70"
        variant={"ghost"}
        onClick={handleToday}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-calendar-event stroke-foreground/80"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M16 3l0 4" />
          <path d="M8 3l0 4" />
          <path d="M4 11l16 0" />
          <path d="M8 15h2v2h-2z" />
        </svg>
      </Button>
      <Button
        className="px-1 hover:bg-secondary/70 md:px-4"
        variant={"ghost"}
        onClick={handlePrevMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-left stroke-foreground/80"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </Button>
      <h2 className="flex flex-col items-center text-center text-lg font-bold uppercase tracking-wide text-foreground/80">
        <span>{date.toLocaleString("default", { month: "long" })}</span>{" "}
        <span>{date.getFullYear()}</span>
      </h2>
      <Button
        className="px-1 hover:bg-secondary/70 md:px-4"
        variant={"ghost"}
        onClick={handleNextMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-right stroke-foreground/80"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </Button>
      {!data?.user ? (
        <MustLoggedButton />
      ) : (
        <Button
          className="hover:bg-accent/60"
          variant="ghost"
          onClick={() => setShowDynamicModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-calendar-bolt stroke-foreground/80"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M13.5 21h-7.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <path d="M19 16l-2 3h4l-2 3" />
          </svg>
        </Button>
      )}
      {/* </div> */}
    </div>
  );
};

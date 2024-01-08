import clsx from "clsx";
import { filterEvents } from "../../../app/calendrier/calendarComponents/eventHelper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { GardenAction } from "./useFilter";
import Image from "next/image";

type EventCalendar = {
  title: string;
  icon: string;
  eventDate: Date;
  description: string;
  type: string;
};

type DayProps = {
  day: Date;
  groupedEvents: EventCalendar[];
  handleDayClick: (day: Date, Events: EventCalendar[]) => void;
  filters: GardenAction[];
  searchValue: string;
};

export const Day = ({
  day,
  groupedEvents,
  handleDayClick,
  filters,
  searchValue,
}: DayProps) => {
  const currentDate = new Date(Date.now());
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const dayKey = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;

  const filteredEvents = groupedEvents;

  // const filteredEvents = filterEvents(groupedEvents, searchValue, filters);
  // console.log(filteredEvents);

  return (
    <div
      className={clsx(
        "text-text group relative flex h-[3rem] cursor-pointer flex-col gap-1 border border-borders p-2 md:max-h-[8rem] md:min-h-[8rem] md:w-full md:p-4"
      )}
      onClick={() => handleDayClick(day, filteredEvents)}
    >
      <div
        className={clsx(
          "absolute left-1 top-1 mx-auto flex h-[1.3rem] w-[1.3rem] items-center rounded-full px-4 py-2 group-hover:bg-accent/60 md:left-auto md:right-0 md:top-0 md:p-2",
          day.getDate() === currentDay && day.getMonth() === currentMonth
            ? "text-text bg-accent font-semibold"
            : ""
        )}
      >
        {day.getDate()}
      </div>
      {filteredEvents.length > 0 && (
        <div className="bottom-0 ml-3 mt-4 h-2 w-2 rounded-full bg-orange-500 md:hidden"></div>
      )}
      {filteredEvents.slice(0, 2).map((event, eventIndex) => (
        <div
          key={eventIndex}
          className={clsx(
            event.type === "SOWING" ? "border-[#D3E7A6] bg-[#D3E7A6]/40" : "",
            event.type === "COVERSOWING"
              ? "border-[#BEE7F5] bg-[#BEE7F5]/40"
              : "",
            event.type === "PLANTING" ? "border-[#FFD19A] bg-[#FFD19A]/40" : "",
            event.type === "TRANSPLANTING"
              ? "border-[#F5E7BE] bg-[#F5E7BE]/40"
              : "",
            // `bg-[${event.colorCode}]` ,
            "hidden rounded-lg border-2 md:block"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={clsx(
                    "max-w-[6rem] overflow-hidden truncate md:flex md:items-center md:justify-center"
                  )}
                >
                  <Image src={event.icon} alt="icon" width={20} height={20} />
                  {event.title}
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-0">
                <div className="flex min-h-[18rem] min-w-[28rem] flex-col bg-background/60">
                  <div
                    className={clsx(
                      // event.colorCode,
                      "w-full py-3 font-bold text-foreground"
                    )}
                    key={eventIndex}
                  >
                    <p>{event.description}</p>
                    <p>
                      {event.eventDate.toLocaleDateString("fr-FR", {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex"></div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
      {filteredEvents.length > 2 && (
        <AlertDialog>
          <AlertDialogTrigger
            className={clsx(
              buttonVariants({ variant: "ghost" }),
              "hidden md:block"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-dots stroke-foreground/80"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
          </AlertDialogTrigger>
          <AlertDialogContent className="">
            <AlertDialogCancel className="absolute right-0 top-0 border-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x stroke-foreground/80"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </AlertDialogCancel>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Evénements du{" "}
                {day.toLocaleDateString("fr-FR", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-1">
                {filteredEvents.map((event, eventIndex) => (
                  <span
                    key={eventIndex}
                    className={clsx(
                      // event.colorCode,
                      "p-2"
                    )}
                  >
                    <span>{event.description}</span>
                  </span>
                ))}
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

import { Plant } from "@/db/query/plant.query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

type CalendarViewProps = {
  plant: Plant;
  plants: Plant[];
};

function getDateStringFromWeek(weekNumber: number) {
  const date = new Date();
  date.setFullYear(new Date().getFullYear(), 0, 1 + weekNumber * 7);
  return date.toLocaleDateString("fr-FR", { month: "long", day: "numeric" });
}

export const CalendarView = ({ plant, plants }: CalendarViewProps) => {
  const weeksInYear = 52;
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const periodTypeTranslations = {
    COVERSOWING: "semis sous abri",
    SOWING: "semis en pleine terre",
    PLANTING: "plantation",
    FLOWERING: "floraison",
    TRANSPLANTING: "repiquage",
    HARVESTING: "récolte",
  };

  const periodTypeColors = {
    COVERSOWING: "accent",
    SOWING: "foreground",
    PLANTING: "primary",
    FLOWERING: "secondary",
    TRANSPLANTING: "muted",
    HARVESTING: "borders",
  };

  const renderPeriod = (periodName: string, period: any) => {
    return (
      <div className="relative mb-4 h-6">
        <TooltipProvider delayDuration={300}>
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger>
                <div
                  className={`hover:bg-${
                    periodTypeColors[
                      period.periodType[0] as keyof typeof periodTypeColors
                    ]
                  }/60 bg-${
                    periodTypeColors[
                      period.periodType[0] as keyof typeof periodTypeColors
                    ]
                  } absolute h-4 rounded-full `}
                  style={{
                    left: `${(period[periodName][0] / weeksInYear) * 100}%`,
                    width: `${
                      ((period[periodName][1] - period[periodName][0]) /
                        weeksInYear) *
                      100
                    }%`,
                  }}
                ></div>
              </TooltipTrigger>
              <TooltipContent
                style={{
                  transform: `translateX(${
                    (period[periodName][0] / weeksInYear) * 500
                  }%)`,
                }}
                className={clsx(
                  `bg-${
                    periodTypeColors[
                      period.periodType[0] as keyof typeof periodTypeColors
                    ]
                  }`
                )}
              >
                {`Du ${getDateStringFromWeek(
                  period[periodName][0]
                )} au ${getDateStringFromWeek(period[periodName][1])}`}
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className="rounded-xl bg-secondary/40 p-4">
      <div className="flex flex-col">
        <div className="flex grow">
          <div className="w-20">
            {plant.cultivationPeriods.map((period, index) => (
              <div
                key={index}
                className={clsx("mb-4 flex items-center text-sm")}
              >
                {period &&
                periodTypeTranslations &&
                period.periodType[0] in periodTypeTranslations
                  ? periodTypeTranslations[
                      period
                        .periodType[0] as keyof typeof periodTypeTranslations
                    ]
                  : ""}
              </div>
            ))}
          </div>
          <div className="flex grow flex-col justify-between border-b-2 border-l-2 border-borders">
            <div className="flex grow flex-col justify-between border-b-2 border-l-2 border-borders">
              {plant.cultivationPeriods.map((period, index) => (
                <>
                  {renderPeriod("coversowingPeriod", period)}
                  {renderPeriod("sowingPeriod", period)}
                  {renderPeriod("plantingPeriod", period)}
                  {renderPeriod("transplantingPeriod", period)}
                  {renderPeriod("floweringPeriod", period)}
                  {renderPeriod("harvestingPeriod", period)}
                </>
              ))}
            </div>
            {/* {plant.cultivationPeriods.map((period, index) => (
              <div key={index} className="relative mb-4 h-6">
                <TooltipProvider delayDuration={300}>
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className={`hover:bg-${
                            periodTypeColors[
                              period
                                .periodType[0] as keyof typeof periodTypeColors
                            ]
                          }/60 bg-${
                            periodTypeColors[
                              period
                                .periodType[0] as keyof typeof periodTypeColors
                            ]
                          } absolute h-4 rounded-full `}
                          style={{
                            left: `${
                              (period.sowingPeriod[0] / weeksInYear) * 100
                            }%`,
                            width: `${
                              ((period.sowingPeriod[1] -
                                period.sowingPeriod[0]) /
                                weeksInYear) *
                              100
                            }%`,
                          }}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent
                        style={{
                          transform: `translateX(${
                            (period.sowingPeriod[0] / weeksInYear) * 500
                          }%)`,
                        }}
                        className={clsx(
                          `bg-${
                            periodTypeColors[
                              period
                                .periodType[0] as keyof typeof periodTypeColors
                            ]
                          }`
                        )}
                      >
                        {`Du ${getDateStringFromWeek(
                          period.sowingPeriod[0]
                        )} au ${getDateStringFromWeek(period.sowingPeriod[1])}`}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            ))} */}
          </div>
        </div>
        <div className="mb-2 ml-20 flex justify-between text-sm">
          {months.map((month, index) => (
            <div key={index} style={{ width: `${100 / months.length}%` }}>
              <span>{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { Map } from "./Map";
import { useRouter } from "next/navigation";
import { DaySelector } from "../../../app/calendrier/calendarComponents/DaySelector";
import { Button } from "@/components/ui/button";
import { handlePreferences } from "../../../app/calendrier/userPreferences.action";
import { toast } from "sonner";

type CalendarModalContentProps = {
  closeModal: () => void;
  handleDynamicCalendar: (
    department: string,
    userGardeningDays: number[]
  ) => void;
};

export const CalendarModalContent = ({
  closeModal,
  handleDynamicCalendar,
}: CalendarModalContentProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const daysLabel = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const handleDepartmentSelect = (
    department: string,
    departmentName: string
  ) => {
    setSelectedDepartment(department);
    setSelectedDepartmentName(departmentName);
    setStep(2);
  };

  const handleDaysSelect = (days: number[]) => {
    setSelectedDays(days);
    setStep(3);
  };

  // const handleCloseDynamicModal = () => {
  //   handleDynamicCalendar(selectedDepartment, selectedDays);
  //   closeModal();
  // };
  const handlePrefSubmit = async () => {
    handleDynamicCalendar(selectedDepartment, selectedDays);
    const response = await handlePreferences({
      gardeningDays: selectedDays,
      department: selectedDepartment,
    });
    if (response?.data?.success) {
      toast.success("Plante ajoutée avec succès");
      closeModal();
    }
  };
  return (
    <>
      <div onClick={closeModal} className="fixed inset-0 bg-slate-800/75"></div>
      <div className="fixed z-50 flex h-full w-full translate-y-[-90%] items-center justify-center">
        {/* <Arrow1 />
          <Arrow3 /> */}
        <div className="fixed w-[40%] rounded bg-white p-8">
          <button
            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            onClick={closeModal}
          >
            X
          </button>
          <h2 className="mb-4 text-2xl">Guide d utilisation rapide</h2>
          <p className="mb-4">
            Générez dynamiquement les dates de votre calendrier
          </p>
          <div>
            {step === 1 && <Map onSelect={handleDepartmentSelect} />}
            {step === 2 && <DaySelector onSelect={handleDaysSelect} />}
            {step === 3 && (
              <div className="flex">
                <h3>Résumé</h3>
                <div className="flex flex-col">
                  <p>
                    Vous avez choisi le département : {selectedDepartmentName}
                  </p>
                  <p>
                    Vos jours préférés pour jardiner :{" "}
                    {selectedDays.map((day) => daysLabel[day]).join(", ")}
                  </p>
                  <form action={handlePrefSubmit}>
                    <Button onClick={handlePrefSubmit}>Valider</Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <Arrow2 /> */}
      </div>
    </>
  );
};

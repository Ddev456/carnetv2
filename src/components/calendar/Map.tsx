"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const franceMap = "/france.geojson";

type MapProps = {
  onSelect: (department: string, departmentName: string) => void;
};

export const Map = ({ onSelect }: MapProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState("02");

  return (
    <>
      <ComposableMap
        width={800}
        height={600}
        projectionConfig={{ scale: 3000, center: [2.3522, 46.6034] }} // Centre approximatif de la France
      >
        <Geographies geography={franceMap}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const department = geo.properties;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  className="fill-[#C2E5FF] stroke-[#F9F9F9] hover:fill-[#8EC8F6] focus:outline-none dark:fill-[#0D2847] dark:stroke-[#191919] dark:hover:fill-[#205D9E]"
                  stroke="#FFFFFF"
                  onClick={() => {
                    setSelectedDepartment(department.code);
                    onSelect(department.code, department.name);
                  }}
                  id={geo.rsmKey}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

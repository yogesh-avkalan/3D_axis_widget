"use client";

import { useState } from "react";
import { Axis3D } from "./axis-3d";
import { Slider } from "@/vendors/ui/slider";

export default function AxisWidget() {
  const [angle, setAngle] = useState(0);

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="h-100 w-full border rounded-lg">
        <Axis3D angle={angle} />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">
          Axis Rotation: {angle}°
        </p>

        <Slider
          defaultValue={[0]}
          step={1}
          min={0}
          max={180}
          onValueChange={(value) => setAngle(value[0])}
        />
      </div>
    </div>
  );
}
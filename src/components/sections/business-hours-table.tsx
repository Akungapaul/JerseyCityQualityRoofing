import { Siren } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

const HOURS = [
  { day: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const;

export function BusinessHoursTable() {
  return (
    <div>
      <h3 className="font-heading font-bold text-lg text-text-primary mb-3">
        Business Hours
      </h3>
      <div className="space-y-0">
        {HOURS.map(({ day, hours }) => (
          <div
            key={day}
            className="flex justify-between py-2 border-b border-[#4a5040] last:border-b-0"
          >
            <span className="text-text-primary text-lg">{day}</span>
            <span className="text-text-secondary text-lg">{hours}</span>
          </div>
        ))}
      </div>

      {/* Emergency callout */}
      <div className="mt-4 bg-dominant rounded-lg p-4 flex items-center gap-3">
        <Siren size={20} className="text-accent shrink-0" aria-hidden="true" />
        <p className="text-lg">
          <span className="font-bold text-accent">
            24/7 Emergency Service Available
          </span>
          <br />
          <a
            href={PHONE_HREF}
            className="text-accent hover:underline underline-offset-4"
          >
            {PHONE_NUMBER}
          </a>
        </p>
      </div>
    </div>
  );
}

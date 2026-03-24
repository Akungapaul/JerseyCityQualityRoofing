import { MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business-info";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { BusinessHoursTable } from "./business-hours-table";

export function ContactInfoColumn() {
  const { address, email, licenseNumber } = BUSINESS_INFO;

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
        Contact Information
      </h2>

      {/* NAP data */}
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin
            size={20}
            className="text-accent shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-text-primary text-lg">
            {address.street}
            <br />
            {address.city}, {address.state} {address.zip}
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone
            size={20}
            className="text-accent shrink-0"
            aria-hidden="true"
          />
          <a
            href={PHONE_HREF}
            className="text-accent text-lg font-bold hover:underline underline-offset-4"
          >
            {PHONE_NUMBER}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail
            size={20}
            className="text-accent shrink-0"
            aria-hidden="true"
          />
          <a
            href={`mailto:${email}`}
            className="text-accent text-lg hover:underline underline-offset-4"
          >
            {email}
          </a>
        </div>
      </div>

      {/* License */}
      <p className="text-text-secondary text-lg mt-4">
        NJ HIC License: {licenseNumber}
      </p>

      {/* Divider */}
      <hr className="border-[#4a5040] my-6" />

      {/* Business Hours */}
      <BusinessHoursTable />
    </div>
  );
}

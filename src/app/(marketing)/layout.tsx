import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { ExitIntentPopup } from "@/components/sections/exit-intent-popup";
import { UrgencyBanner } from "@/components/sections/urgency-banner";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <UrgencyBanner variant="storm-season" />
      <Breadcrumbs />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingCTA />
      <ExitIntentPopup />
    </>
  );
}

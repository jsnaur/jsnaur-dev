import { DossierRail } from "@/components/layout/DossierRail";
import { CaseHeader } from "@/components/layout/CaseHeader";
import { StatementHero } from "@/components/sections/StatementHero";
import { ExhibitTaraCSE } from "@/components/sections/ExhibitTaraCSE";
import { ExhibitDiptych } from "@/components/sections/ExhibitDiptych";
import { ArchiveSection } from "@/components/sections/ArchiveSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  return (
    <main className="relative">
      <DossierRail />
      <CaseHeader />
      <StatementHero />
      <ExhibitTaraCSE />
      <ExhibitDiptych />
      <ArchiveSection />
      <MethodologySection />
      <ClosingSection />
    </main>
  );
}

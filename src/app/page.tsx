import { DossierRail } from "@/components/layout/DossierRail";
import { TopNav } from "@/components/layout/TopNav";
import { StatementHero } from "@/components/sections/StatementHero";
import { ExhibitTaraCSE } from "@/components/sections/ExhibitTaraCSE";
import { ExhibitDiptych } from "@/components/sections/ExhibitDiptych";
import { ArchiveSection } from "@/components/sections/ArchiveSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  return (
    <main className="relative pb-16 lg:pb-0">
      <TopNav />
      <DossierRail />
      <StatementHero />
      <ExhibitTaraCSE />
      <ExhibitDiptych />
      <ArchiveSection />
      <MethodologySection />
      <ClosingSection />
    </main>
  );
}

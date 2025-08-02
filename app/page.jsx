import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import DebugInfo from "@/components/DebugInfo";

// Force dynamic rendering to avoid build-time database connection issues
export const dynamic = "force-dynamic";

function page() {
  return (
    <>
      <DebugInfo />
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}

export default page;

import CompanyProfile from "@/components/interior-design/CompanyProfile";
import DesignProcess from "@/components/interior-design/DesignProcess";
import ServicePackages from "@/components/interior-design/ServicePackages";
import ClientKits from "@/components/interior-design/ClientKits";

export default function InteriorDesignPage() {
  return (
    <>
      <CompanyProfile />

      <DesignProcess />

      <ServicePackages />

      <ClientKits />
    </>
  );
}
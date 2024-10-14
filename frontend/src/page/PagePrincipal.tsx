import { Dashboard } from "../components/Dashboard";
import SideBarMenu from "../components/SideBarMenu";

export const PagePrincipal = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu con ancho fijo */}
        <SideBarMenu />

      {/* Dashboard que ocupa el resto del espacio */}
        <Dashboard />
    </div>
  );
};

export default PagePrincipal;

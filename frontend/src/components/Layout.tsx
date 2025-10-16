import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { HouseFill, Globe, Map, MapFill, ImageFill, CircleHalf, Search, ListOl, FileEarmarkArrowDownFill, CheckSquareFill, MenuButtonWideFill } from "react-bootstrap-icons";

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  const navItemClass = (path: string) => `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded fs-6 ${ location.pathname === path ? "active fw-semibold shadow-sm" : "text-dark" }`;

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header className="bg-dark text-white px-4 py-3 sticky-top shadow-sm d-flex align-items-center">
        <h1 className="fs-5 fw-bold m-0">SS Intern</h1>
      </header>

      <div className="d-flex flex-grow-1">
        <aside className="bg-white border-end d-flex flex-column p-3 shadow-sm" style={{ width: "240px" }}>
          <h6 className="text-uppercase text-muted mb-3 ps-2 small">Navigation
          </h6>
          <nav className="nav nav-pills flex-column gap-1">
            <Link to="/" className={navItemClass("/")}><HouseFill size={16} />Language</Link>
            <Link to="/country" className={navItemClass("/country")}><Globe size={16} />Country</Link>
            <Link to="/state" className={navItemClass("/state")}><Map size={16} />State</Link>
            <Link to="/district" className={navItemClass("/district")}><MapFill size={16} />District</Link>
            <Link to="/imageupload" className={navItemClass("/imageupload")}><ImageFill size={16} />Image Upload</Link>
            <Link to="/radiobutton" className={navItemClass("/radiobutton")}><CircleHalf size={16} />Radio Button</Link>
            <Link to="/searching" className={navItemClass("/searching")}><Search size={16} />Searching</Link>
            <Link to="/pagination" className={navItemClass("/pagination")}><ListOl size={16} />Pagination</Link>
            <Link to="/exportcsv" className={navItemClass("/exportcsv")}><FileEarmarkArrowDownFill size={16} />Export CSV</Link>
            <Link to="/checkbox" className={navItemClass("/checkbox")}><CheckSquareFill size={16} />Check Box</Link>
            <Link to="/multiselectdropdown" className={navItemClass("/multiselectdropdown")}><MenuButtonWideFill size={16} />Multi Select DDL</Link>
          </nav>
        </aside>

        <main className="flex-grow-1 p-4 bg-light">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
import Link from "next/link";
import Title from "./title";
import Icon from "./icon";

type NavBarProps = {
  currentPage: string;
}

const NavBar = ({ currentPage }: NavBarProps) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" href="/"><Icon size={25} /><span className="m-1"></span><Title /></Link>
        {/* Toggle button for mobile interface */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Right-alighed items */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${currentPage == "home" ? "active" : ""}`} href="/">Home <i className="bi bi-house-fill"></i></Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${currentPage == "edit" ? "active" : ""}`} href="/edit">Edit <i className="bi bi-pencil-fill"></i></Link>
            </li>
          </ul>
          {/* Left-aligned items */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${currentPage == "favorites" ? "active" : ""}`} href="/favorites"><i className="h5 bi bi-heart-fill"></i></Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${currentPage == "settings" ? "active" : ""}`} href="/settings"><i className="h5 bi bi-gear-fill"></i></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
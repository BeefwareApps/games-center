import Link from "next/link";
import "./header-bar.css";

export default function HeaderBar() {
  return (
    <div className="nav-bar">
      <div className="nav-item">
        <Link href="/">Home</Link>
      </div>
      <div className="nav-item">
        <Link href="/games">Games</Link>
      </div>
    </div>
  );
}

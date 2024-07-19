import styles from "./page.module.css";
import Link from "next/link";

export default function Games() {
  return (
    <main className={styles.main}>
      <div>Pick from these games.</div>
      <div>
        <div className="nav-item">
          <Link href="/games/memory">Memory</Link>
        </div>
        <div className="nav-item">
          <Link href="/games/war">War</Link>
        </div>
      </div>
    </main>
  );
}

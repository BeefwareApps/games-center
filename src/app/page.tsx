import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div>
          <Link href="/games/memory">Memory</Link>
        </div>
        <div>
          <Link href="/games/war">War</Link>
        </div>
      </div>
    </main>
  );
}

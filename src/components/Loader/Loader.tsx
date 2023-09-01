import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
}

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./MyLoading.module.css";
import { CSSProperties } from "react";

export default function MyLoading(data?: { size?: string; color?:string; center?:boolean }) {
  const style: CSSProperties = {
    fontSize: data?.size,
    color: data?.color,
    justifySelf: data?.center ? 'center': undefined,
    alignSelf: data?.center ? 'center': undefined,
  }
  return (
    <div
      className={styles.loading}
      style={style}
    >
      <AiOutlineLoading3Quarters />
    </div>
  );
}

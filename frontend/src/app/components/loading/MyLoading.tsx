import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./MyLoading.module.css";

export default function MyLoading(data?: { size?: string }) {
  return (
    <div
      className={styles.loading}
      style={data?.size ? { fontSize: data.size } : {}}
    >
      <AiOutlineLoading3Quarters />
    </div>
  );
}

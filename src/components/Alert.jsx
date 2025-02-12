import { useAlertContext } from "../contexts/AlertContext";

export default function Alert() {
  const { alertData, setAlertData } = useAlertContext();
  const { type, message } = alertData;

  const classes = {
    info: "alert-info",
    added: "alert-added",
    deleted: "alert-deleted",
  };

  const handleAlertClose = () => {
    setAlertData({ type: "info", message: "" });
  };

  if (!alertData.message) return null;

  return (
    <div className="alert">
      <div className={classes[type]}>
        {message}
        <button className="closeBtn" onClick={handleAlertClose}>
          ❌
        </button>
      </div>
    </div>
  );
}

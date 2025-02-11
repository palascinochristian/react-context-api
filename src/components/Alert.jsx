export default function Alert({ type = "info", message = "" }) {
  const classes = {
    info: "alert-info",
    added: "alert-added",
    deleted: "alert-deleted",
  };

  if (!message) return null;

  return <div className={classes[type]}>{message}</div>;
}

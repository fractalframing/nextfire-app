export default function Loader({ show }) {
  if (show) {
    return <div className="loader"></div>;
  }
  return null;
}

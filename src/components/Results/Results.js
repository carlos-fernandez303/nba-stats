import { useParams } from "react-router-dom";

export default function Results(props) {
  const { id } = useParams();
  return <div>{id}</div>;
}

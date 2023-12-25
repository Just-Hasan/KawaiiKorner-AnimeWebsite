import { useParams } from "react-router-dom";

export default function SelectedAnimePrototype() {
  const { id } = useParams();

  return <div>You selected anime with the id of {id}</div>;
}

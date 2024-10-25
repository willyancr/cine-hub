import DetailsMovie from "./details-movie";

export default function PageDetailsMovie({
  params,
}: {
  params: { id: string };
}) {
  return <DetailsMovie params={params} />;
}

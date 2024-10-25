import DetailsSerie from "./details-serie";

export default function PageDetailsSerie({
  params,
}: {
  params: { id: string };
}) {
  return <DetailsSerie params={params} />;
}

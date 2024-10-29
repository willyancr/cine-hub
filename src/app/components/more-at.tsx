import RedirectLink from "./redirect-link";

type MoreAtProps = {
  title: string;
};

export default function MoreAt({ title }: MoreAtProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-zinc-400">
      <p className="whitespace-nowrap text-sm">Mais em:</p>

      <RedirectLink
        href={`https://www.imdb.com/find/?q=${title}&s=tt`}
        className="whitespace-nowrap"
      >
        IMDB
      </RedirectLink>
      <RedirectLink
        href={`https://filmow.com/buscar/?year_start=&year_end=&other_seen_user=&other_want_see_user=&q=${title}&redo_search=&order=date-dec`}
        className="whitespace-nowrap"
      >
        FILMOW
      </RedirectLink>
      <RedirectLink
        href={`https://letterboxd.com/search/${title}/`}
        className="whitespace-nowrap"
      >
        letterboxd
      </RedirectLink>
      <RedirectLink
        href={`https://bj-share.info/torrents.php?searchstr=${title}&tags_type=0&order_by=time&order_way=desc&action=basic&searchsubmit=1`}
        className="whitespace-nowrap"
      >
        BJ-SHARE
      </RedirectLink>
    </div>
  );
}

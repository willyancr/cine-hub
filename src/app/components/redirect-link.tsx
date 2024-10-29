interface RedirectLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
}

export default function RedirectLink({
  children,
  href,
  ...props
}: RedirectLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="border-2 px-1 py-0.5 text-xs uppercase transition-all hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}

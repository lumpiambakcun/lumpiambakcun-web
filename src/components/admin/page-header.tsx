type PageHeaderProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="font-heading text-2xl leading-[1.1] font-bold text-ink">{title}</h1>
        <p className="text-sm leading-[1.4] text-ink-muted">{description}</p>
      </div>
      {actions}
    </div>
  );
}

type PageHeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <h1 className="font-heading text-2xl leading-[1.1] font-bold text-ink">{title}</h1>
      {actions}
    </div>
  );
}

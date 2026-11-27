type AccountRowProps = {
  label: string;
  action: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
};

export function AccountRow({ label, action, footer, children }: AccountRowProps) {
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs font-medium text-ink-muted">{label}</span>
          <span className="truncate text-sm text-ink">{children}</span>
        </div>
        {action}
      </div>
      {footer}
    </div>
  );
}

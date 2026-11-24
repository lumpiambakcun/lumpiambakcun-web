type CheckoutCardProps = {
  number: number;
  title: string;
  children: React.ReactNode;
};

export function CheckoutCard({ number, title, children }: CheckoutCardProps) {
  return (
    <section className="flex flex-col gap-3.5 rounded-[20px] border border-border bg-white p-4 md:p-6">
      <h2 className="flex items-center gap-2.5 font-heading text-[22px] leading-[1.08] font-bold text-ink">
        <span
          aria-hidden="true"
          className="grid size-[30px] shrink-0 place-items-center rounded-full border-2 border-brand bg-highlight text-sm leading-none text-brand"
        >
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

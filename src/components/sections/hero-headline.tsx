type HeroHeadlineProps = {
  top: string;
  accent: string;
  ribbonPrice: string;
  ribbonNote: string;
};

export function HeroHeadline({ top, accent, ribbonPrice, ribbonNote }: HeroHeadlineProps) {
  return (
    <div className="relative h-32 w-full md:h-[122px] lg:h-[196px]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[104px] bg-ink [clip-path:polygon(0_10.5%,100%_0,95.5%_100%,3.4%_100%)] md:h-[94px] lg:h-[152px]"
      />
      <h1 className="relative flex h-[104px] flex-col justify-center gap-0.5 pr-4 pb-1.5 pl-5 font-bold text-[27px] leading-[0.98] text-white md:h-[94px] md:pl-[22px] lg:h-[152px] lg:pb-2 lg:pl-10 lg:text-[44px]">
        <span>{top}</span>
        <span className="text-highlight">{accent}</span>
      </h1>
      <div className="absolute inset-x-2.5 top-[86px] h-[42px] md:inset-x-auto md:top-20 md:left-3.5 md:h-[34px] md:w-[calc(100%-28px)] lg:top-[134px] lg:left-[22px] lg:h-[52px] lg:w-[calc(100%-80px)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand [--notch:14.5px] [clip-path:polygon(0_0,100%_0,calc(100%-var(--notch))_50%,100%_100%,0_100%,var(--notch)_50%)] md:[--notch:12px] lg:[--notch:18px]"
        />
        <p className="relative flex h-full items-center justify-center gap-2.5 px-6">
          <span className="font-heading text-lg leading-[1.08] font-bold text-highlight lg:text-2xl">{ribbonPrice}</span>
          <span className="text-xs leading-[1.3] font-extrabold text-white md:text-[11px] lg:text-sm">{ribbonNote}</span>
        </p>
      </div>
    </div>
  );
}

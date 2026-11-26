export async function ResetLinkNotice({ searchParams }: { searchParams: Promise<{ galat?: string }> }) {
  const { galat } = await searchParams;
  if (!galat) return null;
  return (
    <p role="alert" className="rounded-lg bg-muted px-4 py-3 text-[13px] leading-[1.28] font-semibold text-brand">
      Tautan sudah tidak berlaku atau sudah dipakai. Minta tautan baru di bawah.
    </p>
  );
}

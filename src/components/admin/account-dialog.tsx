"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DialogForm, FormMessage } from "@/components/admin/dialog-form";
import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
import { Button } from "@/components/ui/button";
import type { CmsState } from "@/lib/cms";

type AccountDialogProps = {
  title: string;
  trigger: React.ReactNode;
  action: (formData: FormData) => Promise<CmsState>;
  submitLabel: string;
  successMessage: string;
  submitDisabled?: boolean;
  onClose?: () => void;
  children: (errors: Record<string, string>) => React.ReactNode;
};

export function AccountDialog({ title, trigger, action, submitLabel, successMessage, submitDisabled, onClose, children }: AccountDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setState({});
      onClose?.();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await action(data);
      if (!result.ok) return setState(result);
      changeOpen(false);
      toast.success(successMessage);
      router.refresh();
    });
  };

  return (
    <ResponsiveDialog open={open} onOpenChange={changeOpen} title={title} trigger={trigger} className="sm:max-w-md">
      <DialogForm
        onSubmit={handleSubmit}
        className="sm:grid-cols-1"
        footer={
          <>
            <FormMessage>{state.message}</FormMessage>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={() => changeOpen(false)} disabled={pending} className="h-10 px-4">
                Batal
              </Button>
              <Button type="submit" loading={pending} disabled={submitDisabled} className="h-10 px-5">
                {submitLabel}
              </Button>
            </div>
          </>
        }
      >
        {children(state.errors ?? {})}
      </DialogForm>
    </ResponsiveDialog>
  );
}

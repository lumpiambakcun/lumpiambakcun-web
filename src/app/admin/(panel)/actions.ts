"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createManualOrder, setManualOrderStatus, type ManualOrderState } from "@/lib/admin-orders";

export async function addManualOrder(formData: FormData): Promise<ManualOrderState> {
  await requireAdmin();
  const result = await createManualOrder(formData);
  if (result.code) redirect("/admin?rentang=semua");
  return result;
}

export async function markPaid(formData: FormData) {
  await requireAdmin();
  await setManualOrderStatus(String(formData.get("kode")), "paid");
  revalidatePath("/admin");
}

export async function cancelOrder(formData: FormData) {
  await requireAdmin();
  await setManualOrderStatus(String(formData.get("kode")), "cancelled");
  revalidatePath("/admin");
}

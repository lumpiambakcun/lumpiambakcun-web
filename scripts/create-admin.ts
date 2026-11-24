import { createClient } from "@supabase/supabase-js";

const MIN_PASSWORD = 10;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) fail("NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi di .env");

const [emailArg, ...nameParts] = process.argv.slice(2);
const email = emailArg?.trim().toLowerCase();
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail("Pakai: bun run admin:create <email> [nama lengkap]");
const fullName = nameParts.join(" ").trim();

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function askHidden(question: string): Promise<string> {
  if (!process.stdin.isTTY) fail("Terminal tidak interaktif. Isi kata sandi lewat env ADMIN_PASSWORD.");
  return new Promise((resolve) => {
    process.stdout.write(question);
    let value = "";
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const onData = (chunk: string) => {
      for (const char of chunk) {
        if (char === "\u0003") process.exit(130);
        if (char === "\r" || char === "\n") {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdin.off("data", onData);
          process.stdout.write("\n");
          return resolve(value);
        }
        value = char === "\u007f" || char === "\b" ? value.slice(0, -1) : value + char;
      }
    };
    process.stdin.on("data", onData);
  });
}

async function readPassword(required: boolean) {
  const fromEnv = process.env.ADMIN_PASSWORD;
  const password = fromEnv ?? (await askHidden(required ? "Kata sandi: " : "Kata sandi baru (kosongkan untuk tidak mengubah): "));
  if (!password && !required) return undefined;
  if (password.length < MIN_PASSWORD) fail(`Kata sandi minimal ${MIN_PASSWORD} karakter.`);
  if (password.length > 72) fail("Kata sandi maksimal 72 karakter.");
  if (!fromEnv && password !== (await askHidden("Ulangi kata sandi: "))) fail("Kedua isian kata sandi tidak sama.");
  return password;
}

const supabase = createClient(url!, serviceKey!, { auth: { persistSession: false, autoRefreshToken: false } });

const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
if (listError) fail(`Gagal membaca daftar akun: ${listError.message}`);
const existing = list.users.find((user) => user.email?.toLowerCase() === email);

if (existing) {
  const password = await readPassword(false);
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    app_metadata: { ...existing.app_metadata, role: "admin" },
    ...(password && { password }),
    ...(fullName && { user_metadata: { ...existing.user_metadata, full_name: fullName } }),
  });
  if (error) fail(`Gagal memperbarui akun: ${error.message}`);
  console.log(`Akun ${email} sudah ada: sekarang admin${password ? " dan kata sandi diganti" : ""}.`);
} else {
  const password = (await readPassword(true))!;
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "admin" },
    ...(fullName && { user_metadata: { full_name: fullName } }),
  });
  if (error) fail(`Gagal membuat akun: ${error.message}`);
  console.log(`Admin ${email} dibuat. Masuk di /admin/login.`);
}

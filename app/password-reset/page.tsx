import { createClient } from "../../supabase/clients/server";
import { navButton } from "../components/admin/classNames";
import Messages from "../login/messages";

export const dynamic = "force-dynamic";

export default async function ResetPassword() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-purple_lightest_bg flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <form
          className="flex w-full flex-1 flex-col justify-center gap-2 text-black_bg"
          action="/auth/reset-password"
          method="post"
        >
          {user?.email && (
            <>
              <label className="text-md" htmlFor="user_email">
                Email
              </label>
              <input
                className="mb-6 rounded-md border bg-inherit px-4 py-2"
                type="email"
                name="email"
                value={user.email}
                disabled
              />
            </>
          )}
          <label className="text-md" htmlFor="new_password">
            New password
          </label>
          <input
            className="mb-6 rounded-md border bg-white px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className={`mb-2 rounded px-4 py-2 ${navButton}`}>
            Update Password
          </button>
          <Messages />
        </form>
      </div>
    </div>
  );
}

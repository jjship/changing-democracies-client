import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  noUser: boolean;
  setNoUser: (noUser: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [noUser, setNoUser] = useState(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        noUser,
        setNoUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}

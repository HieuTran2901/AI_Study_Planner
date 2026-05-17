import { useEffect, useState } from "react";
import { type User } from "@/types/Entity/User";
import { userService } from "@/services/UserService";

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    userService
      .getCurrentUser()
      .then(setUser)
      .then(() => setIsLoading(false));
  }, []);

  return { user, isLoading };
}

export default useUser;

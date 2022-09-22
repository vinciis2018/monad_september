/* eslint-disable no-console */
import React, { useEffect } from "react";
// hooks
import { useWallet } from "./WalletContextContainer";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "hooks";
import { AUTH_ROUTES } from "utils/constants";

import { WithChildren } from "types/utils";
import { mnemonicSavePeriodicSyncTag } from "utils/serviceWorkerMessages";
import {
  isSeedPhraseSaved,
  setSeedPhraseSaved as _setSeedPhraseSaved,
} from "services";
import { MNENONIC_SAVE_REMINDER_INTERVAL } from "../../config/notification";

interface User {
  expired: number;
}

interface Context {
  user: User | undefined;
  // TODO: better helper func types.
  login: (expired: number) => void;
  register: (expired: number) => void;
  lock: () => void;
  logout: () => void;

  // TODO: Move it to separate context or something
  setSeedPhraseSaved(): Promise<void>;
}

const Ctx = React.createContext<Context | undefined>(undefined);

const ContextProvider = ({ children }: WithChildren) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [user, setUser, clearUser] = useLocalStorage<User>("user", undefined);

  // TODO: Context in a context is not a good pattern I guess
  const { isUnlocked, isPinSetup } = useWallet();

  const askForPermissions = () => {
    Notification.requestPermission();

    navigator.permissions
      .query({
        name: "periodic-background-sync" as PermissionName,
      })
      .then(async (status) =>
        isSeedPhraseSaved().then((isSaved) => {
          // console.log("status", status);
          if (status.state === "granted" && !isSaved) {
            registerSeedPhraseSaveReminder(MNENONIC_SAVE_REMINDER_INTERVAL);
          }
        })
      );
  };

  const registerSeedPhraseSaveReminder = (interval: number): Promise<void> => {
    return navigator.serviceWorker.ready.then((registration) => {
      if ("periodicSync" in registration) {
        return (registration as any).periodicSync.register(
          mnemonicSavePeriodicSyncTag,
          {
            minInterval: interval,
          }
        );
      }
      // TODO: Make better error handling
      return Promise.resolve();
    });
  };

  const unregisterSeedPhraseSaveReminder = (): Promise<void> => {
    return navigator.serviceWorker.ready.then((registration) => {
      if ("periodicSync" in registration) {
        return (registration as any).periodicSync.unregister(
          mnemonicSavePeriodicSyncTag
        );
      }
      // TODO: Make better error handling
      return Promise.resolve();
    });
  };

  const setSeedPhraseSaved = (): Promise<void> => {
    return Promise.all([
      _setSeedPhraseSaved(),
      unregisterSeedPhraseSaveReminder(),
    ]).then();
  };

  useEffect(() => {
    // console.log(user);
    if (user) {
      // console.log(user);
      const expired = user.expired;
      // console.log(expired);
      const current = Math.floor(Date.now() / 1000);
      // console.log(current);
      if (current - Number(expired) < 0 && isUnlocked()) {
        if (AUTH_ROUTES.includes(pathname)) {
          const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
          setUser({
            expired,
          });
          // navigate(pathname);
        } else {
          if (pathname === "/login") {
            const target = searchParams.get("target");
            // console.log(target);
            if (target) return;
          }
          navigate("/upload");
        }
      } else {
        if (AUTH_ROUTES.includes(pathname)) {
          navigate("/login");
        }
      }
    } else {
      if (AUTH_ROUTES.includes(pathname)) {
        navigate(pathname);
      }
    }
    /* eslint-disable-next-line */
  }, [pathname]);

  useEffect(() => {
    // console.log(user);
    if (user) {
      const expired = user.expired;
      const current = Math.floor(Date.now() / 1000);
      if (current - Number(expired) > 0) {
        if (AUTH_ROUTES.includes(pathname)) {
          navigate("/login");
        }
      }
    }
    /* eslint-disable-next-line */
  }, [user]);

  useEffect(() => {
    isPinSetup().then((hasData) => {
      // console.log(hasData);
      if (!hasData) {
        navigate("/welcome");
      }
    });

    askForPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (expired: number) => {
    // check user verification and send message to service worker
    // console.log({ ...user });
    return setUser({ ...user, expired });
  };

  const register = async (expired: number) => {
    return setUser({ expired });
  };

  const logout = () => {
    clearUser();
  };

  const lock = () => {
    setUser({
      ...user,
      expired: Math.floor((Date.now() - 2000) / 1000),
    });
  };

  return (
    <Ctx.Provider
      value={{
        user,
        login,
        register,
        logout,
        lock,
        setSeedPhraseSaved,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useLogin must be used inside LoginProvider`);
  }
  return context;
}

export { ContextProvider as LoginProvider, useContext as useLogin };

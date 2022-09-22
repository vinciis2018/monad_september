import React, { useMemo, useState } from "react";
import { JWKInterface } from "arweave/web/lib/wallet";
import Arweave from "arweave";
import { Web } from "@_koi/sdk/web";
import {
  WalletHelper,
  clearSecureContent,
  hasEncryptedData as _hasEncryptedData,
  retrieveAndDecryptContent,
  retrieveSelfDestructPin,
  saveSelfDestructPin,
  temporarySavePin,
  wipeTemporarySavedPin,
  getTemporarySavedPin,
  setPinSet,
  isPinSet,
  encryptContentAndSave,
} from "services";
import { ERROR_IDS } from "utils/constants";
import { WithChildren } from "types/utils";

interface Context {
  mnemonics: string | undefined;
  isLoading: boolean;
  getCommon: any;

  hasEncryptedData(): Promise<boolean>;
  generateAndSave(pin: string): Promise<void>;
  importAndSave(pin: string, mnemonics: string): Promise<void>;
  tempSavePin(pin: string): Promise<string>;
  getTempSavedPin(): Promise<string | null>;
  wipeTempSavedPin(): Promise<void>;
  setupPin(pin: string): Promise<void>;
  isPinSetup(): Promise<boolean>;
  changePin(oldPin: string, newPin: string): Promise<void>;
  isUnlocked(): Promise<boolean>;
  unlock(pin: string): Promise<void>;
  lock(): void;
  setSelfDestructPin(destructPin: string): Promise<void>;
  checkAndTriggerSelfDestruct(pin: string): Promise<boolean>;
  getArweavePublicAddress(): string;
  signMessage(message: string): Promise<string>;
}

const Ctx = React.createContext<Context | undefined>(undefined);

export const ContextProvider = ({ children }: WithChildren) => {
  const wallet = useMemo<Web>(() => new Web(), []);
  const [$jwk, set$jwk] = useState<Promise<JWKInterface> | undefined>(
    undefined
  );
  const [mnemonics, setMnemonics] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Func Helpers
   */

  const hasEncryptedData = (): Promise<boolean> => {
    return _hasEncryptedData();
  };

  const generateAndSave = async (pin: string): Promise<void> => {
    setIsLoading(true);
    const $walletGenerate = WalletHelper.generateAndSave(pin, wallet);
    const $newJwk = $walletGenerate.then(({ jwk }) => jwk);
    set$jwk($newJwk);

    $walletGenerate.then(({ mnemonics }) => setMnemonics(mnemonics));
    try {
      await $newJwk;
    } finally {
      setIsLoading(false);
    }
  };

  const importAndSave = async (
    pin: string,
    mnemonics: string
  ): Promise<void> => {
    setIsLoading(true);
    const $walletImport = WalletHelper.importAndSave(pin, mnemonics, wallet);
    set$jwk($walletImport);
    // console.log($walletImport);
    setMnemonics(mnemonics);

    try {
      await $walletImport;
      // console.log($walletImport);
    } finally {
      setIsLoading(false);
    }
  };

  const tempSavePin = (pin: string): Promise<string> => {
    return temporarySavePin(pin);
  };

  const wipeTempSavedPin = (): Promise<void> => {
    return wipeTemporarySavedPin();
  };

  const getTempSavedPin = (): Promise<string | null> => {
    return getTemporarySavedPin();
  };

  const setupPin = (): Promise<void> => {
    return setPinSet();
  };

  const isPinSetup = (): Promise<boolean> => {
    return isPinSet();
  };

  const changePin = (oldPin: string, newPin: string): Promise<void> => {
    return WalletHelper.changePin(oldPin, newPin);
  };

  const isUnlocked = async (): Promise<boolean> => {
    const data = Boolean((await hasEncryptedData()) || $jwk);
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    return isLoading;
  };

  const getCommon = () => {
    return $jwk?.then((jwk) => jwk);
  };

  const unlock = async (pin: string): Promise<void> => {
    setIsLoading(true);

    const $walletLoad = retrieveAndDecryptContent(pin).then((dataModel) =>
      WalletHelper.importWallet(dataModel.jwk, wallet).then(() => dataModel)
    );
    set$jwk($walletLoad.then(({ jwk }) => jwk));
    $walletLoad.then(({ mnemonics }) => setMnemonics(mnemonics));
    try {
      try {
        const res = await $walletLoad;
        encryptContentAndSave({ jwk: res?.jwk, mnemonics }, pin).then(() => {});
      } finally {
        setIsLoading(false);
      }
    } catch (e: any) {
      return e;
    }
  };

  const lock = (): void => {
    set$jwk(undefined);
    setMnemonics(undefined);
    return;
  };

  const setSelfDestructPin = (destructPin: string): Promise<void> => {
    return saveSelfDestructPin(destructPin);
  };

  const getArweavePublicAddress = (): string => {
    // console.log(wallet);
    // console.log(wallet.address!);

    return wallet.address!;
  };

  const signMessage = async (message: string): Promise<string> => {
    const strBuffer = new TextEncoder().encode(message);
    if (!$jwk) {
      throw new Error(ERROR_IDS.WALLET_LOCKED);
    }
    return $jwk.then((jwk) =>
      Arweave.crypto
        .sign(jwk, strBuffer, {
          saltLength: 32,
        })
        .then((signedBuffer) => new TextDecoder().decode(signedBuffer))
    );
  };

  const checkAndTriggerSelfDestruct = async (pin: string): Promise<boolean> => {
    const destructPin = await retrieveSelfDestructPin();
    const shouldTrigger = destructPin === pin;
    if (shouldTrigger) {
      await clearSecureContent();
    }
    return shouldTrigger;
  };

  return (
    <Ctx.Provider
      value={{
        mnemonics,
        isLoading,
        getCommon,
        hasEncryptedData,
        generateAndSave,
        importAndSave,
        tempSavePin,
        getTempSavedPin,
        wipeTempSavedPin,
        setupPin,
        isPinSetup,
        changePin,
        isUnlocked,
        unlock,
        lock,
        setSelfDestructPin,
        checkAndTriggerSelfDestruct,
        getArweavePublicAddress,
        signMessage,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useWallet must be used inside WalletProvider`);
  }
  return context;
}

export { ContextProvider as WalletProvider, useContext as useWallet };

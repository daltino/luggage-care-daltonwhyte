
import { useEffect, useState } from 'react';
import { Magic } from 'magic-sdk';

import { usePromise } from './use-promise.js';
import { configureLocalStorage } from './use-local-storage.js';
import { createUser, noop, changed } from './magic-link-tools.js';

const useLocalStorage = configureLocalStorage('magicLinkUser');

const useMagicLink = (apiKey, signInStatusChanged = noop) => {
  const [magicReady, setMagicReady] = usePromise();
  const [isMagicInitialized, setMagicInitialized] = useState(false);
  const [user, setUser] = useLocalStorage(createUser());

  const updateUser = async magicUser => {
    if (!magicUser && user.isSignedIn) {
      const newUser = createUser();
      setUser(newUser);
      signInStatusChanged(newUser);
      return;
    }

    const userData = await Promise.all([
      magicUser.getMetadata(),
      magicUser.getIdToken(),
    ]);
    const { publicAddress, email } = userData[0];
    const sessionToken = userData[1];

    const oldUser = user;
    const newUser = {
      publicAddress,
      email,
      isSignedIn: true,
      sessionToken,
    };

    const checkProps = ['publicAddress', 'email', 'isSignedIn'];
    if (changed(oldUser, newUser, checkProps)) {
      signInStatusChanged(newUser);
    }

    setUser(newUser);
  }

  const signIn = async email => {
    
    const magic = await magicReady;

    if (await magic.user.isLoggedIn()) {
      await updateUser(magic.user);
      return signInStatusChanged(user);
    }

    await magic.auth.loginWithMagicLink({ email });
    return updateUser(magic.user);
  };

  const signOut = async () => {
    const magic = await magicReady;

    if (await magic.user.isLoggedIn()) {
      await magic.user.logout();
      return updateUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      const magic = new Magic(apiKey);

      if (await magic.user.isLoggedIn()) await updateUser(magic.user);

      setMagicReady(magic);
      setMagicInitialized(true);
    })();
  }, []);

  return { signIn, signOut, user, magicReady, isMagicInitialized };
};

export default useMagicLink;
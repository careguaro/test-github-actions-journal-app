import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('Debe invocar el checkingCredentials', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    await signInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword({})(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword({})(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLoginWithEmailPassword debe llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword({})(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailPassword debe llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Un error en Google' };
    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword({})(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());

    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});

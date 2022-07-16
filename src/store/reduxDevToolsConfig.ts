import { useUsers, useLayout } from 'store';

export const connectZustandStateToReduxDevtools = () => {
  let isUpdateFromDevtools = false;

  function returnKeyOfChangedValue(prevState: object, newState: object) {
    if (!prevState || !newState) {
      return null;
    }
    const keys = Object.keys(prevState);
    const changedKey = keys.find(
      (key) => prevState[key as keyof object] !== newState[key as keyof object]
    );
    return changedKey;
  }

  // connect to redux dev tools
  if (typeof window !== 'undefined') {
    // Client-side-only code'
    // @ts-ignore next-line

    // User State
    const connection = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect({
      name: 'User State',
    });
    connection?.init(useUsers.getState());
    // @ts-ignore
    connection?.subscribe((evt) => {
      if (evt.type === 'DISPATCH') {
        const newState = JSON.parse(evt.state);
        isUpdateFromDevtools = true;
        useUsers.setState(newState);
        isUpdateFromDevtools = false;
      }
    });
    useUsers.subscribe((newState, prevState) => {
      if (!isUpdateFromDevtools) {
        const changedKey = returnKeyOfChangedValue(prevState, newState);
        if (changedKey) {
          connection?.send(`${changedKey}`, newState);
        } else {
          connection?.send('Initial State', newState);
        }
      }
    });
    // @ts-ignore next-line
    const connection2 = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect({
      name: 'Layout State',
    });
    connection2?.init(useLayout.getState());
    // @ts-ignore
    connection2?.subscribe((evt) => {
      if (evt.type === 'DISPATCH') {
        const newState = JSON.parse(evt.state);
        isUpdateFromDevtools = true;
        useLayout.setState(newState);
        isUpdateFromDevtools = false;
      }
    });
    useLayout.subscribe((newState, prevState) => {
      if (!isUpdateFromDevtools) {
        const changedKey = returnKeyOfChangedValue(prevState, newState);
        if (changedKey) {
          connection?.send(`${changedKey}`, newState);
        } else {
          connection?.send('Initial State', newState);
        }
      }
    });
  }
};

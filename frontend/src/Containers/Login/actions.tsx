export const ActionEnum = {
    setLoginState: "[login]clearLoginState",
    logout: "[login]Logout",
};
export const setLoginState = (state: boolean) => ({
    type: ActionEnum.setLoginState,
    state
});

export const logout = () => ({
    type: ActionEnum.logout,
});

export type ActionType = ReturnType<typeof setLoginState>
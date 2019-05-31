export interface UpdatePasswordParameter {
    idUser: number;
    token: string;
    newPassword: string;
    newPasswordConfirmation: string;
}
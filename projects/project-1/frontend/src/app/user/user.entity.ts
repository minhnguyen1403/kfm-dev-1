export default class UserEntity {
    token?: string;
    info?: {
        id?: number,
        username: string,
        password: string,
        full_name: string,
    }
}

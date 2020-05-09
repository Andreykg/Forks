export interface ForkInterface {
    id: string;
    full_name: string;
    owner: {
        login: string,
    };
    stargazers_count: number;
    url: string;
    isFavorite: boolean;
}

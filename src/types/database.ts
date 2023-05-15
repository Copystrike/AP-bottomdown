interface User {
    id: string,
    username: string,
    email: string,
    password: string,
}

interface Favorite {
    id: string,
    user_id: string,
    item_id: string,
}

interface BlackList {
    id: string,
    user_id: string,
    item_id: string,
    reason: string,
}

interface Stats {
    id: string,
    user_id: string,
    item_id: string,
    wins: number,
    losses: number,
}

interface Notes {
    id: string,
    user_id: string,
    item_id: string,
    note: string,
}
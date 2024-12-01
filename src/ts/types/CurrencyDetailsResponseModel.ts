export type CurrencyDetailsResponseModel<T extends string | number = string> = {
    id: string;
    symbol: string;
    name: string;
    image: {
        large: string;
        small: string;
        thumb: string;
    },
    total_supply: number;
    market_data: {
        current_price: Record<T, number>;
        market_cap: Record<T, number>;
        low_24h: Record<T, number>;
        high_24h: Record<T, number>;
        market_cap_rank: number;
        price_change_percentage_24h_in_currency: Record<string, number>;
        price_change_percentage_7d_in_currency?: Record<string, number>;
        price_change_percentage_14d_in_currency?: Record<string, number>;
        price_change_percentage_30d_in_currency?: Record<string, number>;
        price_change_percentage_60d_in_currency?: Record<string, number>;
        price_change_percentage_200d_in_currency?: Record<string, number>;
    }
}
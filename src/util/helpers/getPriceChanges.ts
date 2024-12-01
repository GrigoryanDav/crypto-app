import { CurrencyCode } from "../../ts/enums/CurrencyCode";
import { CurrencyDetailsResponseModel } from "../../ts/types/CurrencyDetailsResponseModel";

export const getPriceChanges = (data: CurrencyDetailsResponseModel | null, currency: CurrencyCode): number[] => [
    data?.market_data.price_change_percentage_24h_in_currency?.[currency] || 0,
    data?.market_data.price_change_percentage_7d_in_currency?.[currency] || 0,
    data?.market_data.price_change_percentage_14d_in_currency?.[currency] || 0,
    data?.market_data.price_change_percentage_30d_in_currency?.[currency] || 0,
    data?.market_data.price_change_percentage_60d_in_currency?.[currency] || 0,
    data?.market_data.price_change_percentage_200d_in_currency?.[currency] || 0,
]
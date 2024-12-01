import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { requestUrls } from "../../util/constants/requestUrls";
import { CurrencyDetailsResponseModel } from "../../ts/types/CurrencyDetailsResponseModel";
import { Card, Descriptions, Button, Spin } from "antd";
import { useQueryParam } from "../../hooks/useQueryParam";
import { CurrencyCode } from "../../ts/enums/CurrencyCode";
import { getPriceChanges } from "../../util/helpers/getPriceChanges";
import { CurrencySymbols } from "../../util/constants/currencySymbols";
import { ROUTE_PATHS } from "../../util/constants/routes";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, plugins } from "chart.js";
import { Line } from "react-chartjs-2";
import { PRICE_CHANGE_PERIODS } from "../../util/constants/priceChangePeriods";
import './index.css'

const { Meta } = Card
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const CryptoDetail = () => {
    const { id } = useParams<{ id: string }>()
    const { getQueryParam } = useQueryParam()
    const currency = (getQueryParam('currency') as CurrencyCode) || CurrencyCode.USD
    const { data, loading, error } = useFetch<CurrencyDetailsResponseModel>({
        url: `${requestUrls.coinsMarkets}/coins/${id}`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY,
        },
    })

    const { market_data } = data || {}
    const currentPrice = market_data?.current_price?.[currency] || 'N/A'
    const marketCap = market_data?.market_cap?.[currency] || 'N/A'
    const low24h = market_data?.low_24h?.[currency] || 'N/A'
    const high24h = market_data?.high_24h?.[currency] || 'N/A'
    const marketCapRank = market_data?.market_cap_rank || 'N/A'

    const chartData = {
        labels: PRICE_CHANGE_PERIODS,
        datasets: [
            {
                label: "Price Change (%)",
                data: getPriceChanges(data, currency),
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Period",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Change (%)",
                },
            },
        },
    }

    if (loading) return (<div>Error: {error}</div>)

    return (
        <div className="cryptoDetail_container">
            {
                loading ? <Spin /> : (
                    <>
                        <Card
                            cover={<img alt="coin" src={data?.image.large} style={{ width: '200px' }} />}
                        >
                            <Meta title={data?.name} description={data?.symbol} />
                            <Line data={chartData} options={chartOptions} style={{ backgroundColor: 'white', margin: '10px 0' }} />
                            <Descriptions bordered column={1} style={{ marginTop: "20px" }}>
                                <Descriptions.Item label='Current Price'>
                                    {CurrencySymbols[currency]} {currentPrice.toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label='Market Capitalization'>
                                    {CurrencySymbols[currency]} {marketCap.toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label='Crypto Market Rank'>
                                    {marketCapRank}
                                </Descriptions.Item>
                                <Descriptions.Item label='24 Hour High'>
                                    {CurrencySymbols[currency]} {high24h.toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label='24 Hour Low'>
                                    {CurrencySymbols[currency]} {low24h.toLocaleString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Link to={ROUTE_PATHS.HOME}><Button>Crypto List</Button></Link>
                    </>
                )
            }
        </div>
    )
}

export default CryptoDetail
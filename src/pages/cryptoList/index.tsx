import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import { useQueryParam } from "../../hooks/useQueryParam";
import { Table } from "antd";
import type { TableProps } from "antd";
import { CurrencyListResponseModel } from "../../ts/types/CurrencyListResponseModel";
import { ROUTE_PATHS } from "../../util/constants/routes";
import { useNavigate } from "react-router-dom";
import { DEFAULT_PAGINATION } from "../../util/constants/pagination";
import { CurrencyCode } from "../../ts/enums/CurrencyCode";
import { useMemo } from "react";
import { CurrencySymbols } from "../../util/constants/currencySymbols";
import './index.css'


const CryptoList = () => {
    const navigate = useNavigate()
    const { getQueryParam, setQueryParam } = useQueryParam()
    const page = getQueryParam('page') || DEFAULT_PAGINATION.page
    const pageSize = getQueryParam('pageSize') || DEFAULT_PAGINATION.pageSize
    const currency = (getQueryParam('currency') as CurrencyCode) || CurrencyCode.USD

    const { data, loading, error } = useFetch<CurrencyListResponseModel[]>({
        url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`
    })


    const columns: TableProps<CurrencyListResponseModel>['columns'] = useMemo(() => {
        return [
            {
                title: '#ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                render: (value) => {
                    return (
                        <img src={value} width={50} height={50} alt='crypto-logo'/>
                    )
                }
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Price Change 24',
                dataIndex: 'price_change_24h',
                key: 'price_change_24h,'
            },
            {
                title: 'Price',
                dataIndex: 'current_price',
                key: 'current_price',
                render: (price) => {
                    return `${CurrencySymbols[currency]} ${price.toFixed(2)}`
                }
            }
        ]

    }, [currency])

    const handleNavigateDetailPage = (rowData: CurrencyListResponseModel) => {
        navigate(`${ROUTE_PATHS.CRYPTO_DETAIL}/${rowData.id}`)
    }

    return (
        <div className="cryptoList_container">
            <Table
                columns={columns}
                loading={loading}
                dataSource={data || []}
                pagination={{
                    total: 100,
                    current: +page,
                    pageSize: +pageSize,
                    onChange(page, pageSize) {
                     setQueryParam({
                        page,
                        pageSize
                     })
                    }
                }}
                onRow={(row) => {
                    return {
                        onClick: () => handleNavigateDetailPage(row)
                    }
                }}
            />
        </div>
    )
}


export default CryptoList
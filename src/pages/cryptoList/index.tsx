import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import { Table } from "antd";
import type { TableProps } from "antd";
import { CurrencyResponseModel } from "../../ts/types/CurrencyResponseModel";


const CryptoList = () => {
    const { data, loading, error } = useFetch<CurrencyResponseModel[]>({
        url: `${requestUrls.coinsMarkets}?vs_currency=usd`
    })


    const columns: TableProps<CurrencyResponseModel>['columns'] = [
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
                    <img src={value} width={50} height={50} />
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
        }
    ]

    const handleNavigateDetailPage = (row: CurrencyResponseModel) => {
        console.log(row.id, '>>>>')
    }

    return (
        <div>
            <Table 
                columns={columns}
                loading={loading}
                dataSource={data || []}
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
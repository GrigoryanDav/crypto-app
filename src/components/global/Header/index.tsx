import { Select } from "antd";
import { useQueryParam } from "../../../hooks/useQueryParam";
import { CurrencyCode } from "../../../ts/enums/CurrencyCode";
import './index.css'

const { Option } = Select

const Header = () => {
    const { getQueryParam, setQueryParam } = useQueryParam()
    const currentCurrency = getQueryParam('currency') || CurrencyCode.USD

    const handleCurrencyChange = (value: string) => {
        setQueryParam({ currency: value })
    }

    return (
        <div className="header_container">
            <h1>CryptoPlace</h1>
            <Select
                placeholder='Select a currency'
                value={currentCurrency}
                onChange={handleCurrencyChange}
            >
                {
                    Object.values(CurrencyCode).map((code) => {
                        return (
                            <Option key={code} value={code}>
                                {code.toUpperCase()}
                            </Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default Header
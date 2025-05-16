import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Badge from "../atoms/Badge";
import "./Wallet.css";
import { fetchWalletData } from "../utils/api";

// Mock data structure (updated dynamically with real prices)
const mockAssets = [
  { id: 1, name: "Bitcoin", symbol: "BTC", balance: 0.5, coinId: "bitcoin" },
  { id: 2, name: "Ethereum", symbol: "ETH", balance: 4.2, coinId: "ethereum" },
  { id: 3, name: "Solana", symbol: "SOL", balance: 25, coinId: "solana" },
  { id: 4, name: "Binance Coin", symbol: "BNB", balance: 10, coinId: "binancecoin" },
  { id: 5, name: "Cardano", symbol: "ADA", balance: 1000, coinId: "cardano" },
  { id: 6, name: "XRP", symbol: "XRP", balance: 1500, coinId: "ripple" },
];

const mockTransactions = [
  {
    id: 1,
    type: "deposit",
    asset: "BTC",
    amount: 0.1,
    status: "completed",
    date: "2023-05-15T10:30:00Z",
    txid: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: 2,
    type: "withdrawal",
    asset: "ETH",
    amount: 1.5,
    status: "completed",
    date: "2023-05-14T14:20:00Z",
    txid: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: 3,
    type: "deposit",
    asset: "SOL",
    amount: 10,
    status: "pending",
    date: "2023-05-16T09:15:00Z",
    txid: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
  },
];

const Wallet = () => {
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("assets");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    const fetchWalletDataAsync = async () => {
      setLoading(true);
      try {
        const coinIds = mockAssets.map((asset) => asset.coinId);
        const priceData = await fetchWalletData(coinIds);
        const updatedAssets = mockAssets.map((asset) => {
          const price = priceData[asset.coinId]?.usd || 0;
          const value = asset.balance * price;
          const change = Math.random() * 6 - 3; // Random change for demo
          return { ...asset, value, change };
        });
        setAssets(updatedAssets);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error("Failed to fetch wallet data:", error);
        setAssets(mockAssets.map((asset) => ({ ...asset, value: 0, change: 0 })));
        setTransactions(mockTransactions);
      } finally {
        setLoading(false);
      }
    };

    fetchWalletDataAsync();
  }, []);

  const totalValue = assets.reduce((sum, asset) => sum + (asset.value || 0), 0);

  const handleDeposit = (asset) => {
    setSelectedAsset(asset);
    setShowDepositModal(true);
  };

  const handleWithdraw = (asset) => {
    setSelectedAsset(asset);
    setShowWithdrawModal(true);
  };

  const submitDeposit = () => {
    console.log(`Depositing ${depositAmount} ${selectedAsset.symbol}`);
    setShowDepositModal(false);
    setDepositAmount("");
  };

  const submitWithdraw = () => {
    console.log(`Withdrawing ${withdrawAmount} ${selectedAsset.symbol}`);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div className="wallet">
      <div className="wallet__container">
        <div className="wallet__header">
          <h1 className="wallet__title">Wallet</h1>
          <div className="wallet__balance">
            <div className="wallet__balance-label">Total Balance</div>
            <div className="wallet__balance-value">${totalValue.toLocaleString()}</div>
          </div>
        </div>

        <div className="wallet__tabs">
          <button
            className={`wallet__tab ${activeTab === "assets" ? "wallet__tab--active" : ""}`}
            onClick={() => setActiveTab("assets")}
          >
            Assets
          </button>
          <button
            className={`wallet__tab ${activeTab === "transactions" ? "wallet__tab--active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
        </div>

        {activeTab === "assets" && (
          <div className="wallet__assets">
            {loading ? (
              <div className="wallet__loading">Loading assets...</div>
            ) : (
              <div className="wallet__table-container">
                <table className="wallet__table">
                  <thead className="wallet__table-head">
                    <tr>
                      <th className="wallet__header-cell wallet__header-cell--left">Asset</th>
                      <th className="wallet__header-cell wallet__header-cell--right">Balance</th>
                      <th className="wallet__header-cell wallet__header-cell--right">Value</th>
                      <th className="wallet__header-cell wallet__header-cell--right">24h Change</th>
                      <th className="wallet__header-cell wallet__header-cell--right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="wallet__table-body">
                    {assets.map((asset) => (
                      <tr key={asset.id} className="wallet__row">
                        <td className="wallet__cell wallet__cell--asset">
                          <div className="wallet__asset-info">
                            <div className="wallet__asset-icon">{asset.symbol.charAt(0)}</div>
                            <div className="wallet__asset-details">
                              <div className="wallet__asset-name">{asset.name}</div>
                              <div className="wallet__asset-symbol">{asset.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="wallet__cell wallet__cell--right">
                          {asset.balance} {asset.symbol}
                        </td>
                        <td className="wallet__cell wallet__cell--right">${asset.value.toLocaleString()}</td>
                        <td className="wallet__cell wallet__cell--right">
                          <Badge variant={asset.change >= 0 ? "success" : "danger"}>
                            {asset.change >= 0 ? "+" : ""}
                            {asset.change.toFixed(2)}%
                          </Badge>
                        </td>
                        <td className="wallet__cell wallet__cell--right wallet__cell--actions">
                          <Button variant="primary" size="sm" onClick={() => handleDeposit(asset)}>
                            Deposit
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => handleWithdraw(asset)}>
                            Withdraw
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="wallet__transactions">
            {loading ? (
              <div className="wallet__loading">Loading transactions...</div>
            ) : (
              <div className="wallet__table-container">
                <table className="wallet__table">
                  <thead className="wallet__table-head">
                    <tr>
                      <th className="wallet__header-cell wallet__header-cell--left">Type</th>
                      <th className="wallet__header-cell wallet__header-cell--left">Asset</th>
                      <th className="wallet__header-cell wallet__header-cell--right">Amount</th>
                      <th className="wallet__header-cell wallet__header-cell--left">Status</th>
                      <th className="wallet__header-cell wallet__header-cell--left">Date</th>
                      <th className="wallet__header-cell wallet__header-cell--left">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody className="wallet__table-body">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="wallet__row">
                        <td className="wallet__cell wallet__cell--type">
                          <span
                            className={`wallet__tx-type ${tx.type === "deposit" ? "wallet__tx-type--deposit" : "wallet__tx-type--withdrawal"}`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="wallet__cell">{tx.asset}</td>
                        <td className="wallet__cell wallet__cell--right">
                          {tx.amount} {tx.asset}
                        </td>
                        <td className="wallet__cell">
                          <span
                            className={`wallet__tx-status ${tx.status === "completed" ? "wallet__tx-status--completed" : "wallet__tx-status--pending"}`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="wallet__cell">
                          {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString()}
                        </td>
                        <td className="wallet__cell wallet__cell--txid">
                          <div className="wallet__txid">
                            {tx.txid.substring(0, 8)}...{tx.txid.substring(tx.txid.length - 8)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Deposit Modal */}
        {showDepositModal && selectedAsset && (
          <div className="wallet__modal-overlay">
            <div className="wallet__modal">
              <div className="wallet__modal-header">
                <h3 className="wallet__modal-title">Deposit {selectedAsset.name}</h3>
                <button className="wallet__modal-close" onClick={() => setShowDepositModal(false)}>
                  ×
                </button>
              </div>
              <div className="wallet__modal-body">
                <div className="wallet__modal-info">
                  <p>Please send your {selectedAsset.symbol} to the following address:</p>
                  <div className="wallet__address">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    <button className="wallet__copy-button">Copy</button>
                  </div>
                  <div className="wallet__qr-code">
                    <div className="wallet__qr-placeholder">QR Code Placeholder</div>
                  </div>
                </div>
                <div className="wallet__modal-form">
                  <Input
                    label="Amount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder={`Enter ${selectedAsset.symbol} amount`}
                  />
                  <div className="wallet__modal-actions">
                    <Button variant="secondary" onClick={() => setShowDepositModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={submitDeposit}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {showWithdrawModal && selectedAsset && (
          <div className="wallet__modal-overlay">
            <div className="wallet__modal">
              <div className="wallet__modal-header">
                <h3 className="wallet__modal-title">Withdraw {selectedAsset.name}</h3>
                <button className="wallet__modal-close" onClick={() => setShowWithdrawModal(false)}>
                  ×
                </button>
              </div>
              <div className="wallet__modal-body">
                <div className="wallet__modal-form">
                  <Input label="Recipient Address" type="text" placeholder={`Enter ${selectedAsset.symbol} address`} />
                  <Input
                    label="Amount"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder={`Enter ${selectedAsset.symbol} amount`}
                  />
                  <div className="wallet__available">
                    Available: {selectedAsset.balance} {selectedAsset.symbol}
                  </div>
                  <div className="wallet__modal-actions">
                    <Button variant="secondary" onClick={() => setShowWithdrawModal(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={submitWithdraw}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
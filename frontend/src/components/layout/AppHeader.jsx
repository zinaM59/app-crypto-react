import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useState, useEffect } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  padding: "1rem",
  height: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    // console.log("Effect", crypto);
    const keypress = (event) => {
      //  console.log("Event", event);

      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    try {
      console.log(
        "coin=",
        crypto.find((c) => c.id === value)
      );
      setCoin(crypto.find((c) => c.id === value));

      setModal(true);
    } catch (err) {
      console.log(err);
    }
    console.log(value);
  }

  return (
    <Layout.Header style={headerStyle}>
      {crypto && Array.isArray(crypto) && crypto.length > 0 ? (
        <Select
          style={{ width: "250px" }}
          open={select}
          onSelect={handleSelect}
          onClick={() => setSelect((prev) => !prev)}
          value="press / to open"
          options={crypto.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space>
              <img
                style={{ width: 20 }}
                src={option.data.icon}
                alt={option.data.label}
              />{" "}
              {option.data.label}
            </Space>
          )}
        />
      ) : (
        <div>Loading...</div>
      )}
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

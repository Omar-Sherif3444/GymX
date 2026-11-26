import { createContext, useContext, useState } from "react";
import { FULFILLMENT, PAYMENT, ordersSeed, productsSeed } from "./storeData";

const StoreDataContext = createContext(null);

const StoreContext = ({ children }) => {
  const [products, setProducts] = useState(productsSeed);
  const [orders, setOrders] = useState(ordersSeed);

  const adjustStock = (id, delta) => {
    setProducts((list) =>
      list.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)),
    );
  };

  const updateOrder = (id, patch) => {
    setOrders((list) =>
      list.map((o) => {
        if (o.id !== id) return o;
        const next = { ...o, ...patch };
        if (patch.fulfillment === FULFILLMENT.COLLECTED && !next.collectedAt) {
          next.collectedAt = new Date().toISOString();
        }
        if (patch.payment === PAYMENT.REFUNDED) {
          next.fulfillment = FULFILLMENT.CANCELLED;
        }
        return next;
      }),
    );
  };

  return (
    <StoreDataContext.Provider value={{ products, orders, adjustStock, updateOrder }}>
      {children}
    </StoreDataContext.Provider>
  );
};

export const useStoreData = () => useContext(StoreDataContext);
export default StoreContext;

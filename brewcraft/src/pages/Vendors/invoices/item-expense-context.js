import React from 'react';
const ItemExpenseContext = React.createContext(true);
export const ItemExpenseProvider = ItemExpenseContext.Provider;
export const ItemExpenseConsumer = ItemExpenseContext.Consumer;

export default ItemExpenseContext
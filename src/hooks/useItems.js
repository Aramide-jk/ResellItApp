import { useState, useEffect } from "react";

export function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("resell-it-items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("resell-it-items", JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newItems = [...items, newItem];
    saveItems(newItems);
    return newItem;
  };

  const updateItem = (id, updates) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
    );
    saveItems(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    saveItems(newItems);
  };

  const markAsSold = (id) => {
    updateItem(id, { isSold: true });
  };

  const getUserItems = (userId) => {
    return items.filter((item) => item.sellerId === userId);
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    markAsSold,
    getUserItems,
  };
}
// import { useEffect, useState } from "react";

// export function useItems() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const storedItems = localStorage.getItem("resell-it-items");
//     if (storedItems) {
//       setItems(JSON.parse(storedItems));
//     } else {
//       setItems([]); // fallback to empty array if nothing is saved
//     }
//   }, []);

//   const addItem = (item) => {
//     const newItem = {
//       ...item,
//       id: Date.now().toString(),
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     const newItems = [...items, newItem];
//     setItems(newItems);
//     return newItem;
//   };

//   const updateItem = (id, updates) => {
//     const newItems = items.map((item) =>
//       item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
//     );
//     setItems(newItems);
//   };

//   const deleteItem = (id) => {
//     const newItems = items.filter((item) => item.id !== id);
//     setItems(newItems);
//   };

//   const markAsSold = (id) => {
//     updateItem(id, { isSold: true });
//   };

//   const getUserItems = (userId) => {
//     return items.filter((item) => item.sellerId === userId);
//   };

//   return {
//     items,
//     addItem,
//     updateItem,
//     deleteItem,
//     markAsSold,
//     getUserItems,
//   };
// }

import React, { useState } from 'react';
import { useItemStore } from '../state/useItemStore';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const addItem = useItemStore((state) => state.addItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), itemName, quantity };
    addItem(newItem);
    setItemName('');
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Item Name</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="input input-bordered"
          placeholder="Enter item name"
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input input-bordered"
          placeholder="Enter quantity"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Add Item</button>
    </form>
  );
};

export default AddItemForm;

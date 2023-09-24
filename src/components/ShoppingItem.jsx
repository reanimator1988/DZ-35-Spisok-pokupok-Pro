import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ShoppingItem = ({ item, onEdit, onDelete, index }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCaption, setEditedCaption] = useState(item.caption);
    const [editedAmount, setEditedAmount] = useState(item.amount);

    const handleEdit = () => {
        if (isEditing) {
            onEdit(item.id, editedCaption, editedAmount);
            setIsEditing(false);
        } else {
            setIsEditing(true);
            setEditedCaption(item.caption);
            setEditedAmount(item.amount);
        }
    };

    const handleEditedCaptionChange = (e) => {
        if (!/\d/.test(e.target.value)) {
            setEditedCaption(e.target.value);
        }
    };

    const handleEditedAmountChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, '');
        setEditedAmount(newValue);
    };

    const handleDelete = () => {
        onDelete(item.id);
    };

    return (
        <div className="shopping-item-container">
            <div>
                <span className="item-number">Замовлення № {index + 1}.</span>
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={editedCaption}
                            onChange={handleEditedCaptionChange}
                            placeholder="Назва"
                            className="edit-input"
                        />
                        <input
                            type="text"
                            value={editedAmount}
                            onChange={handleEditedAmountChange}
                            placeholder="Кількість"
                            className="edit-input"
                        />
                    </div>
                ) : (
                    <div>
                        <span className="item-caption">Назва товару: {item.caption},</span>
                        <span className="item-amount">Кількість: {item.amount}</span>
                    </div>
                )}
            </div>
            <div>
                <button onClick={handleEdit} className="edit-button">
                    {isEditing ? (
                        <FontAwesomeIcon icon={faEdit} />
                    ) : (
                        <FontAwesomeIcon icon={faEdit} />
                    )}
                </button>
                <button onClick={handleDelete} className="delete-button">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default ShoppingItem;

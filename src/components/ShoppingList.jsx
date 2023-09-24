import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addItem, editItem, deleteItem } from '../Reducers/ShoppingReducer.jsx';
import ShoppingItem from './ShoppingItem.jsx';
import './ShoppingList.scss';

const ShoppingList = () => {
    const shoppingList = useSelector(state => state.shopping.shoppingList);
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleCaptionChange = (e) => {
        const inputValue = e.target.value;
        const lettersOnlyValue = inputValue.replace(/\d/g, '');
        setCaption(lettersOnlyValue);
    };

    const handleAddItem = () => {
        if (caption && !isNaN(amount) && parseInt(amount) >= 0) {
            dispatch(addItem({ caption, amount: parseInt(amount) }));
            setCaption('');
            setAmount('');
            setError('');
        } else {
            setError('Некорректная название или количество товара');
        }
    };

    const handleAmountChange = (e) => {
        const inputValue = e.target.value;
        if ((/^[0-9]*$/.test(inputValue) || inputValue === '') && parseInt(inputValue) <= 1000) {
            setAmount(inputValue);
        }
    };

    const handleEditItem = (id, caption, amount) => {
        dispatch(editItem({ id, caption, amount }));
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteItem({ id }));
    };

    return (
        <div>
            <div className="input-container">
                <input
                    type="text"
                    value={caption}
                    onChange={handleCaptionChange}
                    placeholder="Название товара"
                    autoComplete="off"
                />

                <div className='input-container-team'>
                    <input
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Количество"
                    />
                    <p className="info">(макс. 1000 ед.)</p>
                </div>

                <button onClick={handleAddItem}>Добавить</button>
                {error && <p className="error-message">{error}</p>}
            </div>
            <div>
                {shoppingList.map((item, index) => (
                    <ShoppingItem
                        key={item.id}
                        item={item}
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    shoppingList: state.shopping.shoppingList,
});

const mapDispatchToProps = (dispatch) => ({
    addItem: (item) => dispatch(addItem(item)),
    editItem: (id, caption, amount) => dispatch(editItem({ id, caption, amount })),
    deleteItem: (id) => dispatch(deleteItem({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);





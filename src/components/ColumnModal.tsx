import React, { useState } from "react"
import '../css/ColumnModal.css'
import Button from "./Button"
import Modal from "./Modal"

interface ModalProps {
    isOpen: boolean
    title: string
    bgColor: string
    onClose: () => void
    onSave: (newTitle: string, newBgColor: string) => void
    onDelete: () => void
}

const ColumnModal: React.FC<ModalProps> = ({ isOpen, onClose, title, bgColor, onSave, onDelete }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newBgColor, setNewBgColor] = useState(bgColor);

    const handleSave = () => {
        onSave(newTitle, newBgColor);
        onClose()
    }

    const handleDeleteColumn = () => {
        const confirmDelete = window.confirm("Are you sure that you want to delete this column?");
        if (confirmDelete) {
            onDelete();
        }
    };
    if (!isOpen) return null


    return (
        <Modal isOpen={isOpen} onClose={onClose} onSave={handleSave} title={'Edit Column'}>
            <div className=''>
                <label className='block mb-2 font-medium'>Rename:  </label>
                <input type="text" className='bg-gray-200 w-full rounded p-2' value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div className='flex items-center space-x-2'>
                <label className='block mb-2 font-medium'> Status Color:</label>
                <input type="color" className="circleInput size-10 border" value={newBgColor} onChange={e => setNewBgColor(e.target.value)} />
            </div>
            <button className="text-red-500" onClick={handleDeleteColumn}>Delete Column?</button>
        </Modal>
    )
}

export default ColumnModal
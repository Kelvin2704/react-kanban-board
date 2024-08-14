import React from 'react'
import Button from './Button'
interface ModalProps {
    isOpen: boolean
    title: string
    onClose: () => void
    onSave: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, onSave, children }) => {
    if (!isOpen) return null
    return (
        <div className='fixed inset-0 top-0 flex items-center justify-center bg-opacity-10 bg-gray-500 backdrop-blur-sm bg-clip-padding z-[99]'>
            <div className=" bg-gray-50 max-w-lg w-full p-5 space-y-2 rounded shadow animate-zoomIn">
                <h2 className='text-3xl font-bold py-2'>{title}</h2>
                <div className='space-y-2'>{children}</div>
                <div className='flex justify-end space-x-2'>
                    <Button onClick={onClose} className="border-gray-300 hover:border-yellow-500 border" >
                        Cancel
                    </Button>
                    <Button className='bg-blue-500 hover:bg-blue-400 text-white' onClick={onSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal
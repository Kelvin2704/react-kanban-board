import React, { useState } from 'react'
import Modal from './Modal'
interface AddTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (task: { title: string, description: string, image: string | null, tags: string[] }) => void
}
const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState("")

    const handleSave = () => {
        onSave({ title, description, image, tags });
        onClose();
        setTitle('');
        setDescription('');
        setImage('');
        setTags([]);
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputTags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        setTags(inputTags);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} onSave={handleSave} title={'Add new task'}>
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <div className=''>
                        <label className='block mb-2 font-medium'>Task Title</label>
                        <input className='bg-gray-200 w-full rounded p-2' value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className=''>
                        <label className='block mb-2 font-medium'>Description</label>
                        <textarea className='bg-gray-200 w-full rounded' value={description} onChange={e => setDescription(e.target.value)} rows={4} />
                    </div>
                </div>
                <div>
                    <div className=''>
                        <label className='block mb-2 font-medium'>Upload Image</label>
                        <input type="file" onChange={handleImageChange} className='rounded' />
                        {image && <img src={image} alt="Task" className="mt-2 max-w-full h-auto rounded" />}
                    </div>
                    <div>
                        <label className='block mb-2 font-medium'>Tags:</label>
                        <input className='bg-gray-200 w-full rounded p-2' type="text" onChange={handleTagInput} />

                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AddTaskModal
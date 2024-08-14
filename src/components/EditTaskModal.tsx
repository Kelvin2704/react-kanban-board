import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
}

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskProps) => void;
  task: TaskProps; // Pass the existing task to be edited
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [image, setImage] = useState<string | null>(task.image);
  const [tags, setTags] = useState<string[]>(task.tags);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setImage(task.image);
    setTags(task.tags);
  }, [task]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputTags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setTags(inputTags);
  };

  const handleSave = () => {
    onSave({ ...task, title, description, image, tags });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task" onSave={handleSave}>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-200 p-2 border rounded"
              placeholder="Enter task title..."
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-200 p-2 border rounded"
              rows={4}
              placeholder="Enter task description..."
            />
          </div>
        </div>
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Upload Image:</label>
            <input type="file" onChange={handleImageChange} />
            {image && <img src={image} alt="Task" className="mt-2 max-w-full h-auto rounded" />}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Tags:</label>
            <input
              type="text"
              onChange={handleTagInput}// Display the tags as a comma-separated string
              className="w-full bg-gray-200 p-2 border rounded"
              placeholder="Enter tags separated by commas"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTaskModal;

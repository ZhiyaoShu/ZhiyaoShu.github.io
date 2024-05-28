'use client'
import React, { useState } from 'react';

interface Comment {
    id: number;
    email: string;
    text: string;
}

const CommentBox: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (comment.trim() && email.trim()) {
            const newComment: Comment = {
                id: Date.now(),
                email: comment.trim(),
                text: comment.trim(),
            };
            setComments([...comments, newComment]);
            setComment('');
        }
    };

    const response = await fetch('/api/comments', { });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={handleInputChange}
                    placeholder="Enter your comment"
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                {comments.map((c) => (
                    <div key={c.id}>{c.text}</div>
                ))}
            </div>
        </div>
    );
};

export default CommentBox;
'use client'
import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';
const { TextArea } = Input;

interface Comment {
    id: number;
    email: string;
    text: string;
}

const CommentBox: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event?: React.FormEvent) => {
        if (event) event.preventDefault();
        if (comment.trim() && email.trim()) {
            const newComment: Comment = {
                id: Date.now(),
                email: email.trim(),
                text: comment.trim(),
            };

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });
            console.log("newComment", newComment);
            console.log("response", response);
            if (response.ok) {
                setComments([...comments, newComment]);
                setComment('');
                setEmail('');
                setIsSuccessful(true);
            } else {
                setIsSuccessful(false);
                console.error('Error to submit comment');
            }
        }
    };

    const handleCloseModal = () => {
        setIsSuccessful(null);
    }

    const handleRetry = async () => {
        setIsSuccessful(null);
        await handleSubmit();
    }

    return (
        <div>
            <Input
                value={email}
                placeholder="Enter your email"
                onChange={handleEmailChange}
            />

            <TextArea
                value={comment}
                placeholder="Enter your comment"
                onChange={handleInputChange}
            />
            <Button
                onClick={handleSubmit}>Submit
            </Button>
            {isSuccessful === true && (
                <Modal
                    centered
                    title="Success"
                    open={true}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    <div>Thanks for your comment!</div>
                </Modal>
            )}

            {isSuccessful === false && (
                <Modal
                    title="Error"
                    open={true}
                    footer={[
                        <Button key="retry" onClick={handleRetry}>
                            Try Again
                        </Button>,
                        <Button key="cancel" onClick={handleCloseModal}>
                            Cancel
                        </Button>,
                    ]}
                    onCancel={handleCloseModal}
                >
                    <div>Oops..Something went wrong</div>
                </Modal>
            )}
        </div>
    );
};

export default CommentBox;
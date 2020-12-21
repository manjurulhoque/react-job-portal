/* eslint-disable */
import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap";

const AcceptRejectModal = ({show, onHide, type, applicant}) => {
    const [comment, setComment] = useState('');
    let title = '';
    let variant = '';
    if (type === 'accept') {
        title = 'Accept the applicant';
        variant = 'success';
    } else if (type === 'reject') {
        title = 'Reject the applicant';
        variant = 'danger';
    }

    const onSubmit = e => {
        e.preventDefault();

        console.log(applicant);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>

            <form onSubmit={onSubmit}>
                <Modal.Body>

                    <div className="form-group">
                        <label htmlFor="comment">Comment(Optional)</label>
                        <textarea id="comment" name="comment" rows="5" className="form-control" onChange={(event) => setComment(event.target.value)}/>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                    <Button type={'submit'} variant={variant}>Submit</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
};

export default AcceptRejectModal;
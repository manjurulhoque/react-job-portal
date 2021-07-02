/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import { IApplicant } from "../../interfaces";

interface Props {
    show: boolean
    onHide: () => any
    type: string
    applicant: IApplicant
}

const AcceptRejectModal: FC<Props> = ({show, onHide, type, applicant}) => {
    const authContext = useContext(AuthContext);
    const {token, isAuthenticated} = authContext.state;
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

    useEffect(() => {
        setComment(applicant.comment);
    }, []);

    const onSubmit: React.MouseEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        console.log(applicant);
        let status_id = type === 'accept' ? 2 : 3;

        const updateApplicantStatus = async () => {
            try {
                const res = await AxiosConfig.post(`/employer/applicants/${applicant.id}/${status_id}/update/`, {comment}, config);
                if (res.status === 200) {
                    applicant.status = type === 'accept' ? 'Accepted' : 'Rejected';
                }
                show = false;
            } catch (e) {
                console.log(e);
            }
        };

        updateApplicantStatus();
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
                        <textarea
                            id="comment"
                            name="comment"
                            rows={5}
                            className="form-control"
                            onChange={(event) => setComment(event.target.value)}/>
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
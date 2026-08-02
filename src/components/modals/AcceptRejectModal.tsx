/* eslint-disable */
import React, { FC, useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import AxiosConfig from "../../AxiosConfig";
import { IApplicant } from "../../interfaces";

interface Props {
	show: boolean;
	onHide: () => void;
	type: string;
	applicant: IApplicant;
	onUpdated?: (id: number, status: string) => void;
}

const AcceptRejectModal: FC<Props> = ({
	show,
	onHide,
	type,
	applicant,
	onUpdated,
}) => {
	const authContext = useContext(AuthContext);
	const { token } = authContext.state;
	const [comment, setComment] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const isAccept = type === "accept";
	const title = isAccept ? "Accept applicant" : "Reject applicant";
	const variant = isAccept ? "success" : "danger";

	useEffect(() => {
		if (show) {
			setComment(applicant?.comment || "");
			setSubmitting(false);
		}
	}, [show, applicant]);

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (submitting) return;

		setSubmitting(true);
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};
		const status_id = isAccept ? 2 : 3;
		const nextStatus = isAccept ? "Accepted" : "Rejected";

		try {
			const res = await AxiosConfig.post(
				`/employer/applicants/${applicant.id}/${status_id}/update/`,
				{ comment },
				config,
			);
			if (res.status === 200) {
				onUpdated?.(applicant.id, nextStatus);
				toast.success(
					isAccept
						? "Applicant accepted"
						: "Applicant rejected",
				);
				onHide();
			}
		} catch {
			toast.error("Failed to update applicant");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="employer-modal-title"
			centered
			className="employer-modal"
		>
			<Modal.Header closeButton>
				<Modal.Title id="employer-modal-title">{title}</Modal.Title>
			</Modal.Header>

			<form onSubmit={onSubmit}>
				<Modal.Body>
					<div className="form-group mb-0">
						<label htmlFor="comment">
							Comment{" "}
							<span style={{ color: "#5a6b78", fontWeight: 500 }}>
								(optional)
							</span>
						</label>
						<textarea
							id="comment"
							name="comment"
							rows={5}
							className="form-control"
							value={comment}
							onChange={(event) =>
								setComment(event.target.value)
							}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide} disabled={submitting}>
						Cancel
					</Button>
					<Button type="submit" variant={variant} disabled={submitting}>
						{submitting ? "Saving..." : "Confirm"}
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default AcceptRejectModal;

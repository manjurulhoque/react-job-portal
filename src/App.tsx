/* eslint-disable */
import React, { FC } from "react";
import { unstable_HistoryRouter as Router } from "react-router";
import history from "./history";
import BaseRouter from "./routes";

const App: FC = () => {
	return (
		<React.Fragment>
			<Router history={history}>
				<div
					id="page-container"
					className="enable-page-overlay side-scroll page-header-fixed page-header-dark main-content-narrow side-trans-enabled"
				>
					<BaseRouter />
				</div>
			</Router>
		</React.Fragment>
	);
};

export default App;

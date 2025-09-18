import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ROUTE_RESULTS } from "~/lib/constants";

export default function AdminResultsRoute() {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(ROUTE_RESULTS, { replace: true });
	}, [navigate]);

	return null;
}

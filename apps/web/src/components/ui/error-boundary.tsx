import { Component } from "react";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

type ErrorBoundaryProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
	error?: Error;
	hasError: boolean;
};

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(error: Error) {
		return {
			error,
			hasError: true,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	handleRetry = () => {
		this.setState({
			error: undefined,
			hasError: false,
		});
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<Card className="mx-auto max-w-md">
					<CardHeader>
						<CardTitle className="text-destructive">
							Something went wrong
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground text-sm">
							An unexpected error occurred. Please try again.
						</p>
						{this.state.error && (
							<details className="text-muted-foreground text-xs">
								<summary className="cursor-pointer">Error details</summary>
								<pre className="mt-2 whitespace-pre-wrap">
									{this.state.error.message}
								</pre>
							</details>
						)}
						<Button className="w-full" onClick={this.handleRetry}>
							Try Again
						</Button>
					</CardContent>
				</Card>
			);
		}

		return this.props.children;
	}
}

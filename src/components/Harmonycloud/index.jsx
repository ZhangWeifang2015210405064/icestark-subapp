import React from 'react';
import './harmonycloud.scss';

export default function HarmonyCloud() {
	const title = 'HARMONYCLOUD';
	return (
		<div className="loading">
			<div className="loading-text">
				{title.split('').map((str, index) => (
					<span key={index} className="loading-text-words">
						{str}
					</span>
				))}
			</div>
		</div>
	);
}

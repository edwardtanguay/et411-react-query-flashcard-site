import { useState, useEffect } from "react";
import { IFlashcard } from "../interfaces";
import { getFlashcards } from "../dataModel/flashcardModel";

export const PageFlashcards = () => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	useEffect(() => {
		(async () => {
			const _flashcards = await getFlashcards();
			setFlashcards(_flashcards);
		})();
	}, []);

	return (
		<>
			<h2 className="text-xl mb-4">
				There are {flashcards.length} flashcards:
			</h2>
			{flashcards.map((flashcard) => {
				return (
					<div
						key={flashcard.id}
						className="bg-gray-300 p-4 rounded w-60 mb-4"
					>
						<p className="font-bold">{flashcard.front}</p>
						<p className="italic">{flashcard.back}</p>
					</div>
				);
			})}
		</>
	);
};

import axios from "axios";
import { useState, useEffect } from "react";
import { IFlashcard } from "./interfaces";

export const PageFlashcards = () => {
	const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);

	const flashcardUrl = "http://localhost:4995/flashcards";

	const loadFlashcards = async () => {
		const response = await axios.get(flashcardUrl);
		const _flashcards = response.data;
		setFlashcards(_flashcards);
	};

	useEffect(() => {
		loadFlashcards();
	}, []);

	return (
		<>
			<h2 className="text-xl mb-4">
				There are {flashcards.length} flashcards:
			</h2>
			{flashcards.map((flashcard) => {
				return <div key={flashcard.id} className="bg-gray-300 p-4 rounded w-60 mb-4">
					<p className="font-bold">{flashcard.front}</p>
					<p className="italic">{flashcard.back}</p>
				</div>
			})}
		</>
	);
};

import axios from "axios";
import { IFlashcard, INewFlashcard } from "../interfaces";

const flashcardUrl = "http://localhost:4995/flashcards";

export const getFlashcards = async () => {
	return new Promise<IFlashcard[]>((resolve, reject) => {
		(async () => {
			try {
				const _flashcards = (await axios.get(flashcardUrl))
					.data as IFlashcard[];
				resolve(_flashcards);
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};

export const addFlashcard = async (flashcard: INewFlashcard) => {
	return new Promise<string>((resolve, reject) => {
		(async () => {
			try {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				};

				const response = await axios.post(flashcardUrl, flashcard, {
					headers,
				});

				if (response.status === 201) {
					resolve("ok");
				} else {
					reject("Error status " + response.status);
				}
			} catch (e) {
				reject("Unknown error.");
			}
		})();
	});
};

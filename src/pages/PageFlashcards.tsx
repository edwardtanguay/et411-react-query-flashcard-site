import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IFlashcard, INewFlashcard } from "../interfaces";
import { addFlashcard, getFlashcards } from "../dataModel/flashcardModel";
import { wait } from "../tools";

export const PageFlashcards = () => {
	const queryClient = useQueryClient();

	const flashcardsQuery = useQuery<IFlashcard[]>({
		queryKey: ["flashcards"],
		queryFn: () => wait(0).then(() => getFlashcards()),
	});

	const newFlashcardMutation = useMutation({
		mutationFn: async (newFlashcard: INewFlashcard) => {
			addFlashcard(newFlashcard);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["flashcards"] });
			await queryClient.invalidateQueries({ queryKey: ["flashcards"] });
		},
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = Object.fromEntries(
			new FormData(event.target as HTMLFormElement)
		);

		const _newFlashcard: INewFlashcard = {
			front: String(data.front),
			back: String(data.back),
		};

		newFlashcardMutation.mutate(_newFlashcard);
		form.reset();
	};

	if (flashcardsQuery.isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			{flashcardsQuery.data && flashcardsQuery.data.length > 0 && (
				<>
					<h2 className="text-xl mb-4">
						There are {flashcardsQuery.data.length} flashcards:
					</h2>
					<form
						onSubmit={handleSubmit}
						className="mt border p-4 rounded w-80 mb-4 pb-0"
					>
						<div className="mb-4 flex gap-2 items-center">
							<label htmlFor="front" className="text-xl pb-1">
								Front:
							</label>
							<input name="front" id="front" type="text" />
						</div>
						<div className="mb-4 flex gap-2 items-center">
							<label htmlFor="back" className="text-xl pb-1">
								Back:
							</label>
							<input name="back" id="back" type="text" />
						</div>
						<button className="mb-4">Add new flashcard</button>
					</form>
					{flashcardsQuery.data.map((flashcard) => {
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
			)}
		</>
	);
};

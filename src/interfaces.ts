export interface INewFlashcard {
	front: string;
	back: string;
}

export interface IFlashcard extends INewFlashcard {
	id: number;
}
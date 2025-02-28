export interface IProduct {
	id: string;
	title: string;
	price: string;
	description: string;
	imageUrl: string;
	colors: string[];
	category: {
		name: string;
		imageUrl: string;
	};
}

export interface IFormInput {
	id: string;
	name: 'title' | 'price' | 'description' | 'imageUrl';
	label: string;
	type: string;
}

export interface ICategory {
	id: string;
	name: string;
	imageUrl: string;
}

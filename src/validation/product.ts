import { IProduct } from '../interfaces';

export const productValidator = (product: IProduct) => {
	const errors = {
		id: '',
		title: '',
		price: '',
		description: '',
		imageUrl: '',
		colors: '',
	};

	if (product.title !== undefined && !product.title.trim()) {
		errors.title = 'Product title is required';
	}

	if (product.description !== undefined && !product.description.trim()) {
		errors.description = 'Product description is required';
	}

	if ((product.price !== undefined && !product.price.trim()) || isNaN(Number(product.price)) || Number(product.price) <= 0) {
		errors.price = 'Product price is invalid';
	}

	if (product.imageUrl !== undefined && !product.imageUrl.trim()) {
		errors.imageUrl = 'Product image URL is required';
	}
	if (product.colors.length == 0) {
		errors.colors = 'Product must have at least one color';
	}

	return errors;
};

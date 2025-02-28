import { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
// Types
import { IProduct } from './interfaces/index.ts';

// UI
import ProductCard from './components/ProductCard.tsx';
import MyModal from './components/ui/Modal.tsx';
import Button from './components/ui/Button.tsx';
import Error from './components/ErrorMessage.tsx';
import CircleColor from './components/CircleColor';
import Select from './components/ui/Select.tsx';

// Data
import { productList, formInputsList, colors } from './data/';
import Input from './components/ui/Input.tsx';
import { productValidator } from './validation/product.ts';
import { categories } from './data';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
	const defaultProductObj = {
		id: '',
		title: '',
		price: '',
		description: '',
		imageUrl: '',
		colors: [],
		category: {
			name: '',
			imageUrl: '',
		},
	};
	const defaultErrorProductObj = {
		id: '',
		title: '',
		price: '',
		description: '',
		imageUrl: '',
		colors: '',
	};

	// States
	const [products, setProducts] = useState<IProduct[]>(productList);
	const [IsNewProductOpen, setIsNewProductOpen] = useState(false);
	const [isEditProductOpen, setisEditProductOpen] = useState(false);
	const [product, setProduct] = useState<IProduct>(defaultProductObj);
	const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj);
	const [errors, setErrors] = useState({
		id: '',
		title: '',
		price: '',
		description: '',
		imageUrl: '',
		colors: '',
	});
	const [tempColors, setTempColors] = useState<string[]>([]);

	//** Modal State **/
	const resetModal = () => {
		setProduct(defaultProductObj);
		setProductToEdit(defaultProductObj);
		setTempColors([]);
		setErrors(defaultErrorProductObj);
	};

	// New Product
	const openNewProduct = () => {
		setIsNewProductOpen(true);
		resetModal();
	};
	const closeNewProduct = () => setIsNewProductOpen(false);
	// Edit Product
	const openEditModal = (productToEdit: IProduct) => {
		setProductToEdit(productToEdit);
		setTempColors(productToEdit.colors);
		setisEditProductOpen(true);
	};
	const closeEditModal = () => {
		setisEditProductOpen(false);
		resetModal();
	};

	const onColorClickHandler = (color: string) => {
		if (tempColors.includes(color)) {
			setTempColors(tempColors.filter((c) => c !== color));
		} else {
			setTempColors([...tempColors, color]);
		}
	};

	//** Select State **/
	const [selected, setSelected] = useState(categories[0]);
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: value,
		});

		// Remove error message
		setErrors({
			...errors,
			[name]: '',
		});
	};

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const tempProduct = { ...product, colors: tempColors, selected, id: uuid() };

		const errorsFound = productValidator(tempProduct);

		const hasError = Object.values(errorsFound).some((error) => error != '');

		if (hasError) {
			setErrors(errorsFound);
			return;
		}

		setProducts((prev) => {
			return [tempProduct, ...prev];
		});
		closeNewProduct();
		toast.success('Successfully Added');
	};

	// Edit Product
	const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProductToEdit({
			...productToEdit,
			[name]: value,
		});

		// Remove error message
		setErrors({
			...errors,
			[name]: '',
		});
	};

	// Remove product
	const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
	const closeRemoveModal = () => {
		setIsConfirmRemoveOpen(false);
	};
	const openRemoveModal = (product: IProduct) => {
		setProductToEdit(product);
		setIsConfirmRemoveOpen(true);
	};

	const getProductIndexById = (id: string) => {
		return products.findIndex((product) => product.id === id);
	};

	// Update the onSubmitEditHandler
	const onSubmitEditHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const index = getProductIndexById(productToEdit.id);
		if (index === -1) {
			toast.error('Product not found');
			return;
		}

		const updatedProduct = { ...productToEdit, colors: tempColors };
		const errorsFound = productValidator(updatedProduct);

		if (Object.values(errorsFound).some((error) => error !== '')) {
			setErrors(errorsFound);
			return;
		}

		const updatedProducts = [...products];
		updatedProducts[index] = updatedProduct;
		setProducts(updatedProducts);

		closeEditModal();
		toast.success('Successfully Updated');
	};

	// Update the onSubmitRemoveHandler
	const onSubmitRemoveHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const index = getProductIndexById(productToEdit.id);
		if (index === -1) return;

		const updatedProducts = products.filter((_, i) => i !== index);
		setProducts(updatedProducts);
		closeRemoveModal();
		toast.success('Successfully Removed');
	};

	return (
		<main className="container">
			<Toaster />
			<div className="flex justify-center p-7">
				<Button
					onClick={openNewProduct}
					className="rounded-md bg-indigo-700 py- px-5 text-md font-medium  focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white text-white"
					width="w-fit"
				>
					Build a Product
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} openEditModal={openEditModal} openRemoveModal={openRemoveModal} />
				))}
			</div>
			{/* Add Product */}
			<MyModal isOpen={IsNewProductOpen} close={closeNewProduct} title="Add Product">
				<form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
					{formInputsList.map((input) => (
						<div className="input-wrapper flex flex-col">
							<label htmlFor={input.id}>{input.label}</label>
							<Input id={input.id} type={input.type} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
							<Error message={errors[input.name]} />
						</div>
					))}
					<div className="colors-wrapper flex flex-col gap-1">
						<div className="colors flex gap-1">
							{colors.map((color) => {
								return <CircleColor key={color} color={color} onClick={() => onColorClickHandler(color)} />;
							})}
						</div>
						<Error message={errors.colors} />
					</div>
					<div className="category">
						<Select title="Category" options={categories} selected={selected} setSelected={setSelected} />
					</div>
					<div className="seleceted-colors flex flex-wrap gap-1">
						{tempColors.map((colorCode) => (
							<div key={colorCode} className="seleceted-color p-1 rounded-sm" style={{ backgroundColor: colorCode }}>
								{colorCode}
							</div>
						))}
					</div>
					<div className="buttons-wrapper flex gap-4">
						<Button className="bg-indigo-600 hover:bg-indigo-800 text-white">Submit</Button>
						<Button type="button" className="bg-gray-400 hover:bg-gray-600 text-white" onClick={closeNewProduct}>
							Cancel
						</Button>
					</div>
				</form>
			</MyModal>

			{/* Edit Product */}
			<MyModal isOpen={isEditProductOpen} close={closeEditModal} title="Edit This Product">
				<form className="flex flex-col gap-4" onSubmit={onSubmitEditHandler}>
					{formInputsList.map((input) => (
						<div className="input-wrapper flex flex-col">
							<label htmlFor={input.id}>{input.label}</label>
							<Input id={input.id} type={input.type} name={input.name} value={productToEdit[input.name]} onChange={onChangeEditHandler} />
							<Error message={errors[input.name]} />
						</div>
					))}
					<div className="colors-wrapper flex flex-col gap-1">
						<div className="colors flex gap-1">
							{colors.map((color) => {
								return <CircleColor key={color} color={color} onClick={() => onColorClickHandler(color)} />;
							})}
						</div>
						<Error message={errors.colors} />
					</div>
					<div className="category">
						<Select
							title="Category"
							options={categories}
							selected={productToEdit.category}
							setSelected={(value) => setProductToEdit({ ...productToEdit, category: value })}
						/>
					</div>
					<div className="seleceted-colors flex flex-wrap gap-1">
						{tempColors.map((colorCode) => (
							<div key={colorCode} className="seleceted-color p-1 rounded-sm" style={{ backgroundColor: colorCode }}>
								{colorCode}
							</div>
						))}
					</div>
					<div className="buttons-wrapper flex gap-4">
						<Button className="bg-indigo-600 hover:bg-indigo-800 text-white">Edit</Button>
						<Button type="button" className="bg-gray-400 hover:bg-gray-600 text-white" onClick={closeEditModal}>
							Cancel
						</Button>
					</div>
				</form>
			</MyModal>
			{/* Confirm Delete Product */}
			<MyModal isOpen={isConfirmRemoveOpen} close={closeRemoveModal} title="Are you sure you want to delete this product?">
				<form className="flex flex-col gap-4" onSubmit={onSubmitRemoveHandler}>
					<div>
						<span className="font-bold">Title: </span>
						{productToEdit.title}
					</div>
					<div className="buttons-wrapper flex gap-4">
						<Button className="bg-red-700 hover:bg-red-800 text-white">Yes, Remove</Button>
						<Button type="button" className="bg-gray-200 hover:bg-gray-400 text-black" onClick={closeRemoveModal}>
							Cancel
						</Button>
					</div>
				</form>
			</MyModal>
		</main>
	);
};

export default App;

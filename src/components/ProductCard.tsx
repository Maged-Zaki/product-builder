import Button from './ui/Button';
import { IProduct } from '../interfaces';

// Utils
import { productDescriptionEllipsis } from '../utils/strings';
import CircleColor from './CircleColor';

interface IProps {
	product: IProduct;
	openEditModal: (product: IProduct) => void;
	openRemoveModal: (product: IProduct) => void;
}

const ProductCard = ({ product, openEditModal, openRemoveModal }: IProps) => {
	const renderedColors = product.colors.map((color) => <CircleColor key={color} color={color} />);

	const onEdit = () => {
		openEditModal(product);
	};

	const onRemove = () => {
		openRemoveModal(product);
	};

	return (
		<div className="p-2 border rounded-md flex flex-col justify-between gap-2">
			<img className="rounded-md" src={product.imageUrl} alt={product.title} />
			<h3 className="font-semibold text-lg">{product.title}</h3>
			<p className="opacity-60">{productDescriptionEllipsis(product.description, 100)}</p>
			<div className="colors flex flex-wrap gap-1">{renderedColors.length > 0 ? renderedColors : 'No colors'}</div>
			<div className="price flex items-center justify-between ">
				<div className="price text-indigo-700 text-lg font-bold">${Number(product.price).toLocaleString('en-US')}</div>
				<img className="category w-10 h-10 rounded-full object-" src={product.category.imageUrl} alt={product.category.name} />
			</div>

			<div className="buttons flex items-center justify-between gap-3">
				<Button className="bg-indigo-700 text-white" onClick={onEdit}>
					Edit
				</Button>
				<Button type="button" className="bg-red-700 text-white" onClick={onRemove}>
					Remove
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;

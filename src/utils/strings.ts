/**
 * Trims a product description to a specified maximum length and appends ellipsis if trimmed.
 *
 * @param str - The product description to be sliced.
 * @param max - The maximum length of the returned string.
 * @returns The sliced product description with ellipsis if it exceeds the maximum length.
 */

export const productDescriptionEllipsis = (str: string, max: number) => {
	return str.length > max ? `${str.slice(0, max)}...` : str;
};

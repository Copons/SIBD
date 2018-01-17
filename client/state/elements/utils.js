export const parseElement = element => ({
	...element,
	id: parseInt(element.id, 10),
	rating: parseInt(element.rating, 10),
});

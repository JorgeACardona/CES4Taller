export const formatDate = isoString => {
	const date = new Date(isoString);
	const formattedDate = date.toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const formattedTime = date.toLocaleTimeString('es-ES', {
		hour: '2-digit',
		minute: '2-digit',
	});
	return `${formattedDate} ${formattedTime}`;
};

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = async function searchProduct(product = 'avena') {
    try {
        const apiUrl = `https://superfuds-odoo.odoo.com/api/products?hint=${product}&page=1&perPage=20&platform=SF`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('No se pudo obtener información sobre el producto.');
        }

        // Extraer los datos JSON de la respuesta
        const { data } = await response.json();
        // Construir una cadena con la información del producto
        const informacionProducto = data.map(producto => ({
            nombre: producto?.shortTitle,
            precio: producto?.priceWithDiscount,
            descripcion: producto?.shortDescription,
            marca: producto?.mark,
            cantidadDisponible: producto?.totalInventory,
            url: `https://catalogo.superfuds.co/buscar/${product}`
        }));

        return informacionProducto;
    } catch (error) {
        console.error('Error al consultar información sobre el producto:', error.message);
        return 'Lo siento, no se pudo obtener información sobre el producto en este momento.';
    }
}

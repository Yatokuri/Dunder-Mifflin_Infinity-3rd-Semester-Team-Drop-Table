import { Api } from "../../../../Api.ts";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import DeleteProduct from "../DeleteProduct/DeleteProduct.tsx";
import './ProductTable.css';

interface Product {
    id: string;
    name: string;
    stock: number;
    price: number;
    discontinued: boolean; // Add the discontinued property
}

export const MyApi = new Api();
export const productsAtom = atom<Product[]>([]);

function ProductTable() {
    const [products, setProducts] = useAtom(productsAtom);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MyApi.api.paperGetAllPapers(); // Fetch data
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, [setProducts]);

    return (
        <table className="text-black text-4xl text-left">
            <thead>
            <tr>
                <th className="table-cell-padding"></th>
                <th className="table-cell-padding">Name</th>
                <th className="table-cell-padding">Stock</th>
                <th className="table-cell-padding">Price</th>
            </tr>
            </thead>
            <tbody>
            {products.filter(product => !product.discontinued).map((product, index) => (
                <tr key={index}>
                    <td className="table-cell-padding">
                        <DeleteProduct productId={product.id} />
                    </td>
                    <td className="table-cell-padding">{product.name}</td>
                    <td className="table-cell-padding">{product.stock}</td>
                    <td className="table-cell-padding">{product.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ProductTable;
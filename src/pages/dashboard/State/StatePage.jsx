import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { StateService } from "../../../services/state.service";

export const StatePage = () => {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { estados } = await StateService.getAllStates();
                setData(estados);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        
        fetchData();
    }, [refreshData]);

    const handleDeleteProduct = async(id) => {
        Swal.fire({
            title: "Estás Seguro?",
            text: "Está acción no se podrá revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "Cancelar"
        }).then(async(result) => {
            if (result.isConfirmed) {

                const response = await StateService.deleteState(id)

                if (response.ok) {
                    Swal.fire({
                        title: "Borrado!",
                        text: response.msg,
                        icon: "success"
                    });

                    setRefreshData(!refreshData);
                } else {
                    Swal.fire({
                        title: "Fallo!",
                        text: response.msg,
                        icon: "error"
                    });
                }
            }
        });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const renderTableData = currentItems.map((item, index) => (
        <tr key={item._id}>
            <td className="px-4 py-2 border bg-white text-center">{index + 1}</td>
            <td className="px-4 py-2 border bg-white text-center">{item.nombre}</td>
            <td className="px-4 py-2 border bg-white text-center">{item.idPais.nombre}</td>
            <td className="px-4 py-2 border bg-white text-center">
                <div className="flex gap-x-2">
                    <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteProduct(item._id)}>
                        Eliminar
                    </button>
                    <Link to={`/dashboard/state/detail/${item._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Ver Detalles
                    </Link>
                </div>
            </td>
        </tr>
    ));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
            <button key={i} className={currentPage === i ? "text-rose-500 font-bold mx-2" : "mx-2 hover:text-rose-500"} onClick={() => paginate(i)}>
                {i}
            </button>
            );
        }

        return pageNumbers;
    };

    return (
        <>
            <h1>Departamentos</h1>
            <p>Información de Departamentos</p>
            <hr/>

            <Link
                className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
                to="/dashboard/state/new"
            >
                Crear Departamento
            </Link>

            <div className="overflow-x-auto mt-5">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-white border-2 bg-rose-200">ID</th>
                            <th className="px-4 py-2 border-white border-2 bg-rose-200">Nombre</th>
                            <th className="px-4 py-2 border-white border-2 bg-rose-200">País</th>
                            <th className="px-4 py-2 border-white border-2 bg-rose-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableData}
                    </tbody>
                </table>
                <div className="font-semibold text-lg">
                    Mostrando Página {currentPage} de {totalPages}
                </div>
                <div className="font-semibold text-lg">
                    Ir a página {renderPageNumbers()}
                </div>
            </div>
        </>
    );
};
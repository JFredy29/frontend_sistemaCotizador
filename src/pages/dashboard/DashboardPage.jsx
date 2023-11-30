import { useEffect, useState } from 'react';
import { WhiteCard } from '../../components/shared/cards/WhiteCard';

import { useAuthStore } from '../../stores';
import { useQuotationStore } from '../../stores/quotation/quotation.store';
import { QuotationService } from '../../services/quotation.service';

export const DashboardPage = () => {
  const user = useAuthStore(state => state.user);
    const [refreshData, setRefreshData] = useState(false);

    const setCotizaciones = useQuotationStore(state => state.setCotizaciones);
    const getCotizacionesByEstado = useQuotationStore(state => state.getCotizacionesByEstado);

    useEffect(() => {
      const fetchData = async () => {
          try {
              if (user.rol === 'ADMINISTRADOR') {
                  const { cotizaciones } = await QuotationService.getAllQuotations();
                  setCotizaciones(cotizaciones);
              } else {
                  const { cotizaciones } = await QuotationService.getQuotationByUser(user.uid);
                  setCotizaciones(cotizaciones);
              }
          } catch (error) {
              console.error('Error al obtener datos:', error);
          }
      };
      
      fetchData();
  }, [refreshData]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información general de cotizaciones</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <WhiteCard centered>
          <i className="fa fa-exclamation text-2xl"></i>
          <h2>Pendientes</h2>
          <p className='font-semibold'>{getCotizacionesByEstado("PENDIENTE").length}</p>
        </WhiteCard>

        <WhiteCard centered>
          <i className="fa fa-check text-2xl"></i>
          <h2>Aprobadas</h2>
          <p className='font-semibold'>{getCotizacionesByEstado("APROBADO").length}</p>
        </WhiteCard>

        <WhiteCard centered>
          <i className="fas fa-times text-2xl"></i>
          <h2>Rechazadas</h2>
          <p className='font-semibold'>{getCotizacionesByEstado("RECHAZADO").length}</p>
        </WhiteCard>
      </div>
    </>
  );
};
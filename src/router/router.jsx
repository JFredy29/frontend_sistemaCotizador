import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../Root';

import { AboutPage, ContactPage, HomePage, ServicesPage, LoginPage, RegisterPage, DashboardPage, QuotationPage, NewQuotationPage, ProductPage, NewProductPage, DetailProductPage, ServicePage, NewServicePage, DetailServicePage, CountryPage, NewCountryPage, DetailCountryPage, StatePage, NewStatePage, DetailStatePage, CityPage, NewCityPage, DetailCityPage, PhonePage, NewPhonePage, DetailPhonePage, AddressPage, NewAddressPage, DetailAddressPage, DetailQuotationPage } from '../pages';

import { AuthLayout, DashboardLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      /// Landing
      {
        path: "home",
        element: <HomePage/>
      },
      {
        path: "about",
        element: <AboutPage/>
      },
      {
        path: "services",
        element: <ServicesPage/>
      },
      {
        path: "contact",
        element: <ContactPage/>
      },

      // Dashboard Routes
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <DashboardPage />
          },
          {
            path: 'quotation',
            element: <QuotationPage />,
          },
          {
            path: 'quotation/new',
            element: <NewQuotationPage />
          },
          {
            path: 'quotation/detail/:id',
            element: <DetailQuotationPage />
          },
          {
            path: 'product',
            element: <ProductPage />,
          },
          {
            path: 'product/new',
            element: <NewProductPage />
          },
          {
            path: 'product/detail/:id',
            element: <DetailProductPage />
          },
          {
            path: 'service',
            element: <ServicePage />,
          },
          {
            path: 'service/new',
            element: <NewServicePage />
          },
          {
            path: 'service/detail/:id',
            element: <DetailServicePage />
          },
          {
            path: 'country',
            element: <CountryPage />,
          },
          {
            path: 'country/new',
            element: <NewCountryPage />
          },
          {
            path: 'country/detail/:id',
            element: <DetailCountryPage />
          },
          {
            path: 'state',
            element: <StatePage />,
          },
          {
            path: 'state/new',
            element: <NewStatePage />
          },
          {
            path: 'state/detail/:id',
            element: <DetailStatePage />
          },
          {
            path: 'city',
            element: <CityPage />,
          },
          {
            path: 'city/new',
            element: <NewCityPage />
          },
          {
            path: 'city/detail/:id',
            element: <DetailCityPage />
          },
          {
            path: 'phone',
            element: <PhonePage />,
          },
          {
            path: 'phone/new',
            element: <NewPhonePage />
          },
          {
            path: 'phone/detail/:id',
            element: <DetailPhonePage />
          },
          {
            path: 'address',
            element: <AddressPage />,
          },
          {
            path: 'address/new',
            element: <NewAddressPage />
          },
          {
            path: 'address/detail/:id',
            element: <DetailAddressPage />
          },
        ]
      },

      // Auth Routes
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      },
    ],
  },
]);
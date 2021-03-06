import React, { useEffect } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { MiniHeader, Footer } from '../../layouts/components';
import { StatsCard, Spinner } from '../../common/components';
import assets from '../../../assets/images/assets.png';
import property from '../../../assets/images/properties.png';
import returns from '../../../assets/images/returns.png';
import transaction from '../../../assets/images/transaction.png';
import file from '../../../assets/images/file.png';
import { getUserOrders, getUserInvoices } from '../actions';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { properties } = useSelector(state => state.home);
    const { orders, invoices } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(getUserOrders(token));
    }, [dispatch, token]);

    useEffect(() => {
        dispatch(getUserInvoices(token));
    }, [dispatch, token]);

    if (!orders || !invoices) {
        return <Spinner />;
    }

    const stats = [
        {
            color: 'bg-alt-green',
            image: assets,
            key: 1,
            name: 'My Portfolio',
            number: orders.length,
            route: '/assets',
            text: 'Assets',
        },
        {
            color: 'bg-orange-600',
            image: property,
            key: 2,
            name: 'Properties',
            number: properties.length,
            route: '/properties',
            text: 'Properties Listed',
        },
        {
            color: 'bg-alt-blue',
            image: returns,
            key: 3,
            name: 'My Returns',
            number: 0,
            route: '/returns',
            text: 'Returns',
        },
        {
            color: 'bg-pink-600',
            image: transaction,
            key: 4,
            name: 'My Transactions',
            number: orders.length,
            route: '/transactions',
            text: 'Transactions',
        },
        {
            color: 'bg-blue-600',
            image: file,
            key: 5,
            name: 'My Invoices',
            number: invoices.length,
            route: '/invoices',
            text: 'Invoices',
        },
    ];

    return (
        <>
            <main>
                <section className="pt-16">
                    <MiniHeader name="My Dashboard" icon={faUser} />
                </section>
                <section className="container px-2 my-32">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 g-justify-items-center">
                        {stats.map(({
                            key, color, name, number, route, text, image,
                        }) => (
                            <StatsCard key={key} color={color} name={name} number={number} route={route} text={text} image={image} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

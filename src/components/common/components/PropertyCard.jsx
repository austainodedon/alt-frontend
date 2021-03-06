/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatMoney } from '../helpers';
import { Spinner } from './Spinner';
import { ButtonLink } from './ButtonLink';

const { Paragraph } = Typography;

export const PropertyCard = ({ properties }) => {
    if (!properties) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-wrap justify-center -mt-4">
            { properties.map(({
                category, investment_population, name, about, min_fraction_price, net_rental_yield, price,
                min_yield, max_yield, image, id, order_id, fractions_qty, slug, yield_period, end_date,
            }) => (
                <div key={order_id || id} className="max-w-xs rounded-lg overflow-hidden shadow-lg border-t-4 border-alt-green mt-4 mr-4">
                    <img className="w-full bg-gray-200 object-cover" src={image} alt={name} loading="lazy" width="320" />
                    <div className="px-2 py-4">
                        <div className="flex flex-row items-center justify-between my-2">
                            <span className="block px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded">{category.name}</span>
                            <p className="font-semibold text-sm text-black">
                                {fractions_qty || investment_population}
                                <span className="text-xs text-gray-600 font-normal"> alts</span>
                            </p>
                        </div>
                        <Link to={`/properties/${slug}`}>
                            <h3 className="uppercase font-semibold text-base my-3 text-alt-blue hover:underline">{name}</h3>
                        </Link>
                        <Paragraph ellipsis={{ rows: 3 }} className="text-gray-600 text-xs">
                            {about}
                        </Paragraph>
                        <div className="my-5">
                            {end_date
                                ? (
                                    <p className="text-gray-700 text-xs">
                                        <span className="text-xs font-bold text-gray-700">
                                            Maturity date:&nbsp;
                                        </span>
                                        {moment(end_date).format('ddd, MMM Do YYYY')}
                                    </p>
                                )
                                : <ButtonLink name="Buy Now" route={`/properties/${slug}`} />}
                        </div>
                        <div className="border mb-2 opacity-50" />
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row">
                                <p className="font-bold text-xs text-gray-600">₦</p>
                                {price ? (
                                    <p className="font-bold text-black text-xl">
                                        {formatMoney(price)}
                                    </p>
                                ) : (
                                    <p className="font-bold text-black text-xl">
                                        { formatMoney(Number(min_fraction_price)) }
                                        <span className="text-xs text-gray-600 font-normal"> /alt</span>
                                    </p>
                                ) }

                            </div>
                            <div className="flex flex-col">
                                {yield_period
                                    ? <p className="font-semibold text-center text-sm text-gray-800">{`${net_rental_yield[yield_period]} %`}</p>
                                    : <p className="font-semibold text-sm text-gray-800">{`${min_yield} - ${max_yield}%`}</p> }
                                <p className="text-xs text-gray-600">Rental Yield</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

PropertyCard.propTypes = {
    properties: PropTypes.arrayOf(PropTypes.shape({
        about: PropTypes.string.isRequired,
        category: PropTypes.shape().isRequired,
        end_date: PropTypes.string,
        fractions_qty: PropTypes.number,
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        investment_population: PropTypes.number.isRequired,
        max_yield: PropTypes.number.isRequired,
        min_fraction_price: PropTypes.number.isRequired,
        min_yield: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        net_rental_yield: PropTypes.shape().isRequired,
        order_id: PropTypes.number,
        yield_period: PropTypes.number,
    })),
};

PropertyCard.defaultProps = {
    properties: null,
};

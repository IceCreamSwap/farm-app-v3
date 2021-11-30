import React, { useEffect, useState } from 'react';
import formatTimePeriod from 'utils/formatTimePeriod';
import getTimePeriod from 'utils/getTimePeriods';

export interface CountdownTimerProps {
    timestamp: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ( props ) => {
    const { timestamp } = props;

    const calculateTimeLeft = () => {
        if ( timestamp <= 0 ) return '';

        const nowDate = new Date();

        const nowEpoch = Math.floor( nowDate.getTime() / 1000 );
        const expireEpoch = timestamp;

        const diff = expireEpoch - nowEpoch;

        if ( nowEpoch >= expireEpoch ) return '';

        return formatTimePeriod( getTimePeriod( diff ) );
    };

    const [ timeLeft, setTimeLeft ] = useState( calculateTimeLeft() );

    useEffect( () => {
        setTimeout( () => {
            setTimeLeft( calculateTimeLeft() );
        }, (1000 * 1) );
    } );

    return (
        <>
            { timeLeft }
        </>
    );
};

export default CountdownTimer;

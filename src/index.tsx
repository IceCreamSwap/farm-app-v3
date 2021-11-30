// import React, { ReactNode, useMemo } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
// import useActiveWeb3React from './hooks/useActiveWeb3React';
// import { BLOCKED_ADDRESSES } from './config/constants';
// import ListsUpdater from './state/lists/updater';
// import MulticallUpdater from './state/multicall/updater';
// import TransactionUpdater from './state/transactions/updater';
import Countdown from './views/Countdown';

// function Updaters() {
//     return (
//         <>
//             <ListsUpdater/>
//             <TransactionUpdater/>
//             <MulticallUpdater/>
//         </>
//     );
// }
//
// function Blocklist( { children }: { children: ReactNode } ) {
//     const { account } = useActiveWeb3React();
//     const blocked: boolean = useMemo( () => Boolean( account && BLOCKED_ADDRESSES.indexOf( account ) !== -1 ), [ account ] );
//     if ( blocked ) {
//         return <div>Blocked address</div>;
//     }
//     return <>{ children }</>;
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Blocklist>
//       <Providers>
//         <Updaters/>
//         <App/>
//       </Providers>
//     </Blocklist>
//   </React.StrictMode>,
//   document.getElementById( 'root' ),
// )

ReactDOM.render(
    <React.StrictMode>
        <Countdown/>
    </React.StrictMode>,
    document.getElementById( 'root' ),
);

/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

interface Props {
    mode: number,
    address: string,
    amount: string,
    updatedAt: string, 
    id: string,
}

const ForestList: React.FC<Props> = ({address, mode, amount, updatedAt, id}) => {

    const ref = mode === 1 ? '/planter/'+address: '/tree/'+id;
    const imgs = mode === 1 ? '/assets/icons/planter.png':'/assets/icons/tree.png'

    return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center'}}>
                <img src= {imgs} style={{width:'20px', marginRight:'15px'}} alt=""/>
                <a href={ref}>
                    <span style={{color: '#333333', fontWeight:'600'}}>{address}</span>
                </a> 
            </div>
            <div style={{textAlign:'right', minWidth:'230px'}}>
                <div style={{fontSize:'14px', fontWeight:'600', color:'#333333'}}><span style={{color:'#007BFF'}}> {amount} CC </span>Contributed</div>
                <div style={{fontSize:'14px',  }}><span>{updatedAt}</span></div>
            </div> 
        </div>
    )

}

export default ForestList
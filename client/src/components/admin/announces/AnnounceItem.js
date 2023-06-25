import React, { useCallback } from 'react'
import { useClass } from '../../../contexts/ClassContext'
import { toast } from 'react-hot-toast'

export default function AnnounceItem({ data }) {


    const { deleteAnnounces } = useClass()

    const handleDelete = useCallback(() => {
        deleteAnnounces(data._id)
        toast.error("Anons Silindi")
    }, [data?._id])

    
    return (
        <div className='d-flex p-3 m-2' style={{
            backgroundColor: "#ddd",
            justifyContent: 'space-between',
            alignItems: "center",
            boxShadow: "revert"
        }}>
            <p className='w-50'>{data.message}</p>
            <p>{data.localDate}</p>
            <button className='btn btn-danger' onClick={handleDelete}>Sil</button>

        </div>
    )
}

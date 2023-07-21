import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function PublicRoutes() {
    return (
        <>
            <Routes>
                <Route path='/*' />
            </Routes>
        </>
    )
}

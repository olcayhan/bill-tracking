import React from 'react'
import { Container } from 'react-bootstrap'

import AdminClasses from '../components/admin/courses/CoursesFeed';
import AdminTopMenu from '../components/admin/AdminTopMenu'
import AdminStudentList from '../components/admin/AdminStudentList'
import Header from './Header';

export default function AdminStudents() {
    return (
        <>
            <Header />

            <Container style={{ marginTop: "125px" }}>
                <AdminTopMenu />
                <AdminStudentList />
            </Container >

            <AdminClasses />
        </>
    )
}
